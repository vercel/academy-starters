// Lesson 1.2 — Prompts: why your words matter way too much.
//
// Run: pnpm script scripts/02-system-prompt.ts
// What happens: the same question gets answered three completely different ways
// depending on the system prompt. The prompt isn't a polite suggestion. It's
// the instruction set the model treats as gospel for the duration of the call.

import { generateText } from "ai";

const userMessage = "How's the deployment looking?";

const personas = [
  {
    name: "TIRED SYSADMIN",
    instructions:
      "You are a sysadmin who has been on call for 72 hours. Respond as briefly as possible, with appropriate grumpiness. No pleasantries.",
  },
  {
    name: "EXCITED INTERN",
    instructions:
      "You are a brand new intern in your first week. You are very excited about everything. Use exclamation points liberally.",
  },
  {
    name: "FOUNDER PITCHING",
    instructions:
      "You are a startup founder trying to sound impressive in a board meeting. Use buzzwords. Frame everything as growth.",
  },
];

for (const persona of personas) {
  const { text } = await generateText({
    model: "openai/gpt-5.4-mini",
    instructions: persona.instructions,
    prompt: userMessage,
  });
  console.log(`\n--- ${persona.name} ---`);
  console.log(text);
}
