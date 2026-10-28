import { defineAgent } from "eve";
import { MODELS } from "../../lib/models.js";

export default defineAgent({
  description:
    "Investigate a bug or risky API request against the real repository. Reproduce the claim, inspect relevant code, and return an evidence-backed specification. Never modify files.",
  model: MODELS.investigator,
  outputSchema: {
    additionalProperties: false,
    properties: {
      acceptanceCriteria: {
        items: { type: "string" },
        minItems: 1,
        type: "array",
      },
      affectedFiles: { items: { type: "string" }, type: "array" },
      approach: { type: "string" },
      claimSupported: { type: "boolean" },
      disposition: {
        enum: ["proceed", "needs-clarification", "unsupported"],
        type: "string",
      },
      evidence: {
        items: {
          additionalProperties: false,
          properties: {
            command: { type: ["string", "null"] },
            result: { type: "string" },
            summary: { type: "string" },
          },
          required: ["summary", "command", "result"],
          type: "object",
        },
        minItems: 1,
        type: "array",
      },
      openQuestions: { items: { type: "string" }, type: "array" },
      problemStatement: { type: "string" },
      risks: { items: { type: "string" }, type: "array" },
      testStrategy: { type: "string" },
    },
    required: [
      "claimSupported",
      "disposition",
      "problemStatement",
      "approach",
      "affectedFiles",
      "risks",
      "acceptanceCriteria",
      "testStrategy",
      "evidence",
      "openQuestions"
    ],
    type: "object",
  },
});
