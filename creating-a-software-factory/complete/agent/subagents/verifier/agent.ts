import { defineAgent } from "eve";
import { MODELS } from "../../lib/models.js";

export default defineAgent({
  description:
    "Independently verify a pushed branch against its approved specification and acceptance criteria. Inspect the real diff and run checks. Never edit files.",
  model: MODELS.verifier,
  outputSchema: {
    additionalProperties: false,
    properties: {
      blockingFindings: { items: { type: "string" }, type: "array" },
      criteria: {
        items: {
          additionalProperties: false,
          properties: {
            criterion: { type: "string" },
            evidence: { type: "string" },
            passed: { type: "boolean" },
          },
          required: ["criterion", "passed", "evidence"],
          type: "object",
        },
        type: "array",
      },
      riskAssessment: {
        additionalProperties: false,
        properties: {
          compatibility: { enum: ["none", "low", "medium", "high"], type: "string" },
          performance: { enum: ["none", "low", "medium", "high"], type: "string" },
          security: { enum: ["none", "low", "medium", "high"], type: "string" },
          sideEffects: { enum: ["none", "low", "medium", "high"], type: "string" },
        },
        required: ["compatibility", "performance", "security", "sideEffects"],
        type: "object",
      },
      summary: { type: "string" },
      verdict: {
        enum: ["approve", "request-changes", "reject"],
        type: "string",
      },
      verification: {
        items: {
          additionalProperties: false,
          properties: {
            command: { type: "string" },
            result: { type: "string" },
          },
          required: ["command", "result"],
          type: "object",
        },
        type: "array",
      },
    },
    required: [
      "verdict",
      "criteria",
      "blockingFindings",
      "riskAssessment",
      "verification",
      "summary"
    ],
    type: "object",
  },
});
