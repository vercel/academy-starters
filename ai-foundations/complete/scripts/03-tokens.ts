// Lesson 1.3 — Tokens, context, and what this costs.
//
// Run: pnpm script scripts/03-tokens.ts
// What happens: we make a call and look at the token usage. Tokens are the
// units the model thinks in. Roughly 4 characters of English text per token.
// You pay per token (input + output), so understanding this is understanding
// the cost of every AI feature you'll ever build.

import { generateText } from "ai";

const { text, usage } = await generateText({
  model: "openai/gpt-5.4-mini",
  prompt:
    "Write a one-paragraph defense of eating leftover pizza for breakfast. Be persuasive.",
});

console.log("--- Response ---");
console.log(text);

console.log("\n--- Token usage ---");
console.log(`  Input tokens:  ${usage?.inputTokens ?? "n/a"}`);
console.log(`  Output tokens: ${usage?.outputTokens ?? "n/a"}`);
console.log(`  Total tokens:  ${usage?.totalTokens ?? "n/a"}`);

console.log("\n--- What this means ---");
console.log("Input tokens = how much we sent (the prompt).");
console.log("Output tokens = how much the model wrote back.");
console.log("Bigger models charge more per token. Longer prompts cost more.");
console.log("This number is also the only thing standing between you and a runaway bill.");
