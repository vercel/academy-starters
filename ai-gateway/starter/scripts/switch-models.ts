import { generateText } from "ai";
import { MENU } from "../lib/menu";

const candidates = [
  "openai/gpt-5.4-mini", // the incumbent
  "anthropic/claude-sonnet-4.6",
  "google/gemini-3.1-pro-preview",
];

const prompt =
  "Confirm this order back to the customer with a total: two Birria Eclipse " +
  `and one Elote Clásico.\n\n${MENU}`;

for (const model of candidates) {
  const result = await generateText({ model, prompt });
  const cost = result.finalStep.providerMetadata?.gateway?.cost;

  console.log(`=== ${model} ===`);
  console.log(`"${result.text.trim()}"`);
  console.log(`Cost: $${cost}`);
  console.log();
}
