// Lesson 1.1 — Models don't think.
//
// Run: pnpm script scripts/01-first-call.ts
// What happens: the model generates a response one chunk at a time.
// You're watching probability, not thinking. Each word is the most likely next word
// given everything that came before. Keep an eye on the streaming and you can almost
// see the pattern.

import { streamText } from "ai";

const { textStream } = streamText({
  model: "openai/gpt-5.4-mini",
  prompt:
    "Explain what you actually are in three sentences. Pretend you're talking to someone who's never used an AI model before. No jargon.",
});

for await (const chunk of textStream) {
  process.stdout.write(chunk);
}
process.stdout.write("\n");
