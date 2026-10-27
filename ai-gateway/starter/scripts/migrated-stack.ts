import { generateText } from "ai";

const order =
  "Take this order and confirm it back with a total: two Al Pastor Meteors " +
  "($4.50 each) and one agua fresca ($3.00).";

for (const model of ["openai/gpt-5.4-mini", "anthropic/claude-sonnet-4.6"]) {
  const result = await generateText({ model, prompt: order });
  const cost = result.finalStep.providerMetadata?.gateway?.cost;

  console.log(`[${model} via AI SDK]`);
  console.log(result.text.trim());
  console.log(`Cost: $${cost}`);
  console.log();
}
