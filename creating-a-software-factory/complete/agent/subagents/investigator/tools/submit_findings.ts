import { defineTool } from "eve/tools";
import { z } from "zod";

export default defineTool({
  description:
    "Submit the finished investigation. Call it once, as your last action, then reply with exactly the JSON it returns.",
  execute(input) {
    return input;
  },
  inputSchema: z.object({
    acceptanceCriteria: z.array(z.string()).min(1),
    affectedFiles: z.array(z.string()),
    approach: z.string(),
    claimSupported: z.boolean(),
    disposition: z.enum(["proceed", "needs-clarification", "unsupported"]),
    evidence: z
      .array(
        z.object({
          command: z.string().nullable(),
          result: z.string(),
          summary: z.string(),
        })
      )
      .min(1),
    openQuestions: z.array(z.string()),
    problemStatement: z.string(),
    risks: z.array(z.string()),
    testStrategy: z.string(),
  }),
});
