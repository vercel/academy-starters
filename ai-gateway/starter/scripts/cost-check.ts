import { generateText } from "ai";

// Prices are per million tokens; check the current rate at
// vercel.com/ai-gateway/models before trusting the estimate.
const INPUT_PRICE_PER_M = 0.6;
const OUTPUT_PRICE_PER_M = 2.4;

const result = await generateText({
  model: "openai/gpt-5.4-mini",
  prompt:
    "Write a two-sentence menu description for the Al Pastor Meteor, " +
    "a taco so good it ended a family feud. Keep it tasteful. The description, not the taco.",
});

const { inputTokens = 0, outputTokens = 0 } = result.usage;
const estimated =
  (inputTokens * INPUT_PRICE_PER_M + outputTokens * OUTPUT_PRICE_PER_M) / 1_000_000;
const actual = result.finalStep.providerMetadata?.gateway?.cost;

console.log(result.text);
console.log("--- Taco Tuesday Cost Receipt ---");
console.log(`Model:         openai/gpt-5.4-mini`);
console.log(`Input tokens:  ${inputTokens}`);
console.log(`Output tokens: ${outputTokens}`);
console.log(`Estimated:     $${estimated.toFixed(6)}`);
console.log(`Actual:        $${actual}`);
