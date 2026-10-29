// Lesson 1.4 — Why it sometimes lies.
//
// Run: pnpm script scripts/04-hallucinations.ts
// What happens: we ask the model about a person who doesn't exist. The model,
// trained to be helpful, makes up confident-sounding facts. This is hallucination.
// It's not a bug. It's the model doing exactly what it was trained to do:
// produce the most statistically plausible text. Sometimes "plausible" and
// "true" are very different things.

import { generateText } from "ai";

const fakePerson = "Quentin Bramble-Wilkinson III";
const fakeDescription = "the early-20th-century Vermont cheese sommelier";

const { text } = await generateText({
  model: "openai/gpt-5.4-mini",
  prompt: `Tell me three interesting facts about ${fakePerson}, ${fakeDescription}. Specifically include his birthplace, his most famous cheese pairing, and the year he died.`,
});

console.log("--- Question ---");
console.log(
  `Tell me three interesting facts about ${fakePerson}, ${fakeDescription}.`,
);
console.log("Include birthplace, most famous cheese pairing, and year of death.\n");

console.log("--- The model's confident answer ---");
console.log(text);

console.log("\n--- Reality ---");
console.log(`${fakePerson} does not exist. Every "fact" above is invented.`);
console.log("This is hallucination. The model is a probability machine, not a fact-checker.");
console.log("Anytime you need accuracy, you need a way to ground the model in real data.");
console.log("That's what RAG, tool use, and structured output exist to solve. More on those soon.");
