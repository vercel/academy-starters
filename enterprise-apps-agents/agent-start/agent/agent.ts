import { defineAgent } from "eve";

export default defineAgent({
  model: "openai/gpt-5.4",
  reasoning: "low",
  limits: {
    sessionUsage: ({ window }) =>
      window.inputTokens - window.cacheReadTokens >= 20_000 ||
      window.outputTokens >= 4_000,
    sessionTimeoutMs: 24 * 60 * 60 * 1_000,
  },
});
