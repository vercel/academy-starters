import { generateText } from "ai";
import { MENU } from "../lib/menu";

const result = await generateText({
  model: "anthropic/claude-sonnet-4.6",
  prompt:
    "Confirm this order back with a total: two Birria Eclipse and one " +
    `Elote Clásico.\n\n${MENU}`,
  providerOptions: {
    gateway: {
      order: ["anthropic", "bedrock"],
      models: ["openai/gpt-5.4-mini"],
    },
  },
});

const routing = result.finalStep.providerMetadata?.gateway?.routing as any;
const modelAttempts = routing?.modelAttempts ?? [];
let attempts = 0;

for (const m of modelAttempts) {
  for (const p of m.providerAttempts ?? []) {
    attempts++;
    const outcome = p.success ? "ok" : `failed: ${p.error}`;
    console.log(`${m.canonicalSlug} via ${p.provider} — ${outcome}`);
  }
}

console.log(
  `Survived. ${modelAttempts.length} model${modelAttempts.length === 1 ? "" : "s"} tried, ` +
  `${attempts} provider attempt${attempts === 1 ? "" : "s"}.`
);
