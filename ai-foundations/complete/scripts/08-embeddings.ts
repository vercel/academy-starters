// Lesson 3.1 — Embeddings and RAG.
//
// Run: pnpm script scripts/08-embeddings.ts
// What happens: we turn three phrases into "embeddings" (long lists of numbers)
// and compare them. Phrases with similar meaning produce similar numbers, even
// when the words are completely different. This is the foundation of RAG:
// "find documents related to my question" works by comparing embeddings, not
// matching keywords.

import { embed, cosineSimilarity } from "ai";

const phrases = [
  "the cat sat on the mat",
  "a feline rested on the rug",
  "blockchain enables decentralized finance",
];

const embeddings = await Promise.all(
  phrases.map((value) =>
    embed({ model: "openai/text-embedding-3-small", value }),
  ),
);

console.log("--- What an embedding looks like ---");
console.log(`Each phrase becomes a vector of ${embeddings[0].embedding.length} numbers.`);
console.log("First five values of each vector:");
embeddings.forEach((e, i) => {
  const preview = e.embedding
    .slice(0, 5)
    .map((n) => n.toFixed(4))
    .join(", ");
  console.log(`  "${phrases[i]}"`);
  console.log(`    [${preview}, ...]`);
});

console.log("\n--- Similarity scores ---");
console.log("(Closer to 1 = more similar in meaning. Different words, same idea = high score.)");
console.log(
  `  "cat sat on mat" vs "feline rested on rug": ${cosineSimilarity(
    embeddings[0].embedding,
    embeddings[1].embedding,
  ).toFixed(3)}`,
);
console.log(
  `  "cat sat on mat" vs "blockchain":            ${cosineSimilarity(
    embeddings[0].embedding,
    embeddings[2].embedding,
  ).toFixed(3)}`,
);

console.log("\n--- What RAG is, plainly ---");
console.log("RAG = Retrieval-Augmented Generation.");
console.log("1. You embed all your documents into vectors and store them.");
console.log("2. When a user asks a question, you embed the question too.");
console.log("3. You find the documents whose vectors are most similar to the question.");
console.log("4. You stuff those documents into the model's prompt before asking it to answer.");
console.log("The model now answers based on YOUR data, not its training data. No more hallucination on facts you control.");
