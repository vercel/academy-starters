import { defineAgent } from "eve";
import { MODELS } from "./lib/models.js";

export default defineAgent({
  limits: {
    sessionUsage: ({ window }) => window.outputTokens >= 80_000,
    sessionTimeoutMs: 7 * 24 * 60 * 60 * 1_000,
  },
  model: MODELS.orchestrator,
});
