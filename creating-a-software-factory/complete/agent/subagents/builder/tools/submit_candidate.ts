import { defineTool } from "eve/tools";
import { z } from "zod";

export default defineTool({
  description:
    "Submit the finished candidate branch. Call it once, as your last action, then reply with exactly the JSON it returns.",
  execute(input) {
    return input;
  },
  inputSchema: z.object({
    base: z.string(),
    branch: z.string(),
    changes: z.array(z.object({ path: z.string(), summary: z.string() })),
    deviations: z.array(z.string()),
    pushed: z.boolean(),
    verification: z.array(
      z.object({
        command: z.string(),
        exitCode: z.number(),
        output: z.string(),
      })
    ),
  }),
});
