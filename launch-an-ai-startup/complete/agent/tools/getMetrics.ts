import { defineTool } from "eve/tools";
import { z } from "zod";
import { getMetrics } from "@/lib/updates";
import { requireFounder } from "../lib/founder";

// The filename is the tool name the model sees.
export default defineTool({
  description:
    "Get the signed-in founder's monthly metrics: MRR, customers, net burn, and runway in months.",
  inputSchema: z.object({
    months: z
      .array(z.string().regex(/^\d{4}-\d{2}$/))
      .min(1)
      .max(6)
      .describe("Months to fetch, as YYYY-MM. Include the previous month for comparisons."),
  }),
  async execute({ months }, ctx) {
    const all = await getMetrics(requireFounder(ctx));
    const found = all.filter((m) => months.includes(m.month));
    return found.length ? found : { error: "No metrics recorded for those months." };
  },
});
