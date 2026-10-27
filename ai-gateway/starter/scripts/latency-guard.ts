import { generateText } from "ai";
import { MENU } from "../lib/menu";

const result = await generateText({
  model: "anthropic/claude-sonnet-4.6",
  prompt:
    "Confirm this order back with a total: one Camarón Cañón and one " +
    `agua fresca.\n\n${MENU}`,
  providerOptions: {
    gateway: {
      sort: "ttft", // works with system credentials and BYOK
      // Hard first-token deadlines apply only to BYOK credentials.
      // Replace the provider and value to match your own key and latency budget.
      providerTimeouts: {
        byok: { anthropic: 10_000 },
      },
    },
  },
});

const routing = result.finalStep.providerMetadata?.gateway?.routing as any;
const attempt = routing?.modelAttempts?.[0]?.providerAttempts?.find(
  (a: any) => a.success
);

console.log(result.text.trim());
console.log("---");
console.log(`Served by:     ${routing?.finalProvider}`);
console.log(`Response time: ${Math.round(attempt?.responseTimeMs ?? 0)}ms`);
console.log(JSON.stringify(routing?.sort, null, 2));
