import { generateText } from "ai";
import { MENU } from "../lib/menu";

// The truck's second AI feature: a daily-special announcement for the
// sidewalk sign. Runs occasionally on a pricier, more creative model —
// the contrast feature for spend-per-feature tracking (lesson 3.5)
// and cheapest-provider routing (lesson 1.2).

const result = await generateText({
  model: "anthropic/claude-sonnet-4.6",
  prompt:
    "You write the sidewalk sign for the Taco Tuesday truck. Today's special " +
    "is the Birria Eclipse. Write a three-sentence announcement that makes " +
    "people cross the street. Reference the menu for tone, and do not invent prices.\n\n" +
    MENU,
});

const { inputTokens = 0, outputTokens = 0 } = result.usage;

console.log(result.text);
console.log("---");
console.log(`Feature:       describe-special`);
console.log(`Model:         anthropic/claude-sonnet-4.6`);
console.log(`Input tokens:  ${inputTokens}`);
console.log(`Output tokens: ${outputTokens}`);
