import { defineTool } from "eve/tools";
import { z } from "zod";
import { getMetrics } from "@/lib/updates";
import { requireFounder } from "../lib/founder";

export default defineTool({
  description:
    "Chart the signed-in founder's MRR by month. You write the chart code; it runs in an isolated sandbox.",
  inputSchema: z.object({
    code: z
      .string()
      .max(6000)
      .describe(
        "A Node.js ES module that uses only Node built-ins such as node:fs, no npm packages. Read ./metrics.json (an array of { month, mrr }) and write an SVG line chart of MRR to ./chart.svg.",
      ),
  }),
  async execute({ code }, ctx) {
    const metrics = await getMetrics(requireFounder(ctx));
    const sandbox = await ctx.getSandbox();

    // The sandbox gets the numbers it needs and nothing else.
    await sandbox.writeTextFile({
      path: "metrics.json",
      content: JSON.stringify(metrics.map(({ month, mrr }) => ({ month, mrr }))),
    });
    await sandbox.writeTextFile({ path: "chart.mjs", content: code });

    // Generated code can loop forever. Stop it after ten seconds.
    const result = await sandbox.run({ command: "node chart.mjs", signal: AbortSignal.timeout(10_000) });
    if (result.exitCode !== 0) {
      return { error: `The chart code failed: ${result.stderr.slice(0, 500)}` };
    }

    const svg = await sandbox.readTextFile({ path: "chart.svg" });
    // An <?xml ?> prolog before <svg is valid, so look for the tag anywhere.
    if (!svg || !svg.includes("<svg")) {
      return { error: "The chart code didn't write an SVG to chart.svg." };
    }
    return { svg };
  },
  // The browser gets the SVG; the model only needs to know it worked.
  toModelOutput(output) {
    return output.svg
      ? { type: "text", value: `Chart created (${output.svg.length} bytes of SVG).` }
      : { type: "text", value: output.error ?? "The chart failed." };
  },
});
