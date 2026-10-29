import { defineTool } from "eve/tools";
import { z } from "zod";

const level = z.enum(["none", "low", "medium", "high"]);

export default defineTool({
  description:
    "Submit the finished verification. Call it once, as your last action, then reply with exactly the JSON it returns.",
  execute(input) {
    return input;
  },
  inputSchema: z.object({
    blockingFindings: z.array(z.string()),
    criteria: z.array(
      z.object({
        criterion: z.string(),
        evidence: z.string(),
        passed: z.boolean(),
      })
    ),
    riskAssessment: z.object({
      compatibility: level,
      performance: level,
      security: level,
      sideEffects: level,
    }),
    summary: z.string(),
    verdict: z.enum(["approve", "request-changes", "reject"]),
    verification: z.array(z.object({ command: z.string(), result: z.string() })),
  }),
});
