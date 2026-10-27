import { generateText } from "ai";
import { MENU } from "../lib/menu";

const result = await generateText({
  model: "anthropic/claude-sonnet-4.6",
  prompt:
    "Confirm this order back with a total: three Hongos Humildes, no " +
    `queso.\n\n${MENU}`,
  providerOptions: {
    gateway: {
      only: ["anthropic"], // this provider or an error — no silent detours
    },
  },
});

const routing = result.finalStep.providerMetadata?.gateway?.routing as any;

console.log(result.text.trim());
console.log("---");
console.log(`Served by: ${routing?.finalProvider}`);
console.log(`Fallbacks considered: ${routing?.fallbacksAvailable?.join(", ") || "none — pinned"}`);
