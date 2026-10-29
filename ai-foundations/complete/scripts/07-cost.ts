// Lesson 2.3 — Cost and choice.
//
// Run: pnpm script scripts/07-cost.ts
// What happens: we send the same prompt to two models (mini and full) and
// compare latency and token usage. Bigger models are smarter for hard problems
// but slower and more expensive. Mini is usually the right call. Use the full
// model when mini's output isn't good enough, not as a default.

import { generateText } from "ai";

const prompt =
  "Write a one-paragraph explanation of how DNS works that an 8-year-old could follow.";

const models = ["openai/gpt-5.4-mini", "openai/gpt-5.4"];

for (const model of models) {
  const start = Date.now();
  const { text, usage } = await generateText({ model, prompt });
  const elapsed = Date.now() - start;

  console.log(`\n=== ${model} ===`);
  console.log(`Latency: ${elapsed}ms`);
  console.log(`Input tokens:  ${usage?.inputTokens ?? "n/a"}`);
  console.log(`Output tokens: ${usage?.outputTokens ?? "n/a"}`);
  console.log(`\nResponse:`);
  console.log(text);
}

console.log("\n--- The rule of thumb ---");
console.log("Default to mini. Reach for full when mini's quality isn't good enough.");
console.log("The cost difference at scale is real. The latency difference users notice.");
