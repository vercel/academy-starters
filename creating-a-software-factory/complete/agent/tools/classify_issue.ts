import { generateText, Output } from "ai";
import { defineTool } from "eve/tools";
import { z } from "zod";
import { classificationSchema } from "../lib/classification.js";
import { MODELS } from "../lib/models.js";

export default defineTool({
  description:
    "Classify one GitHub issue by work type, actionability, confidence, and risk using AI SDK structured generation.",
  async execute(input) {
    const result = await generateText({
      model: MODELS.router,
      output: Output.object({ schema: classificationSchema }),
      prompt: `Title: ${input.title}\n\n${input.body}`,
      system: [
        "Classify work for a TypeScript notification SDK.",
        "Use documentation for prose-only changes, bug for incorrect existing behavior, and public-api for changes to exported types or functions.",
        "Mark a request actionable only when an engineer can define a testable outcome without inventing requirements.",
        "Use high risk for exported API changes, security-sensitive work, or possible breaking changes.",
        "Questions must be empty when the request is actionable.",
      ].join(" "),
    });

    return result.output;
  },
  inputSchema: z.object({
    body: z.string(),
    title: z.string().min(1),
  }),
});
