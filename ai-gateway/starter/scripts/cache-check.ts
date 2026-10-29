import { generateText } from "ai";
import { TRUCK_HANDBOOK, TRUCK_INSTRUCTIONS } from "../lib/menu";

async function order(label: string) {
  const result = await generateText({
    model: "anthropic/claude-sonnet-4.6",
    instructions: `${TRUCK_INSTRUCTIONS}\n${TRUCK_HANDBOOK}`,
    prompt: "Which taco should I get if I can't handle spice? Be honest.",
    providerOptions: {
      gateway: { caching: "auto" },
    },
  });

  const { inputTokens = 0, inputTokenDetails } = result.usage;
  const cost = result.finalStep.providerMetadata?.gateway?.cost;

  console.log(`--- ${label} ---`);
  console.log(`Input tokens:      ${inputTokens}`);
  console.log(`Cache read tokens: ${inputTokenDetails?.cacheReadTokens ?? 0}`);
  console.log(`Cost:              $${cost}`);
}

await order("Request 1");
await order("Request 2");
