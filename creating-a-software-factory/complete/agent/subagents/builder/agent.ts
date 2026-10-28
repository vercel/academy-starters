import { defineAgent } from "eve";
import { MODELS } from "../../lib/models.js";

export default defineAgent({
  description:
    "Implement an approved work order in an isolated repository checkout. Create a feature branch, make only the specified change, run checks, commit, and push the branch.",
  model: MODELS.builder,
  outputSchema: {
    additionalProperties: false,
    properties: {
      base: { type: "string" },
      branch: { type: "string" },
      changes: {
        items: {
          additionalProperties: false,
          properties: {
            path: { type: "string" },
            summary: { type: "string" },
          },
          required: ["path", "summary"],
          type: "object",
        },
        type: "array",
      },
      deviations: { items: { type: "string" }, type: "array" },
      pushed: { type: "boolean" },
      verification: {
        items: {
          additionalProperties: false,
          properties: {
            command: { type: "string" },
            exitCode: { type: "number" },
            output: { type: "string" },
          },
          required: ["command", "exitCode", "output"],
          type: "object",
        },
        type: "array",
      },
    },
    required: [
      "branch",
      "base",
      "pushed",
      "changes",
      "verification",
      "deviations"
    ],
    type: "object",
  },
});
