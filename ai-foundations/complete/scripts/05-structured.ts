// Lesson 2.1 — Structured output.
//
// Run: pnpm script scripts/05-structured.ts
// What happens: instead of a string of vibes, the model returns a typed object
// that matches a Zod schema we defined. This is the single biggest unlock for
// building real AI features. You stop trying to parse free text and start
// getting data you can actually use.

import { generateText, Output } from "ai";
import { z } from "zod";

const Debrief = z.object({
  highlight: z.string().describe("The single biggest moment of the day."),
  wins: z.array(z.string()).describe("Specific things that went well."),
  blockers: z.array(z.string()).describe("Things that got in the way."),
  energyLevel: z
    .number()
    .min(1)
    .max(10)
    .describe("Self-rated energy, 1 (wiped) to 10 (great)."),
});

const rawText = `
Today I finally got the deployment working after fighting it for three days.
The CSS bug from Tuesday is still there because I can't figure out the Safari issue.
Honestly running on fumes. Feels like a 4 out of 10 day energy-wise.
The wins: shipped the cron job, got the new logging in place, and Maria approved my PR.
`.trim();

const { output } = await generateText({
  model: "openai/gpt-5.4-mini",
  output: Output.object({ schema: Debrief }),
  prompt: `Extract a structured debrief from this raw text:\n\n${rawText}`,
});

console.log("--- Structured output ---");
console.log(JSON.stringify(output, null, 2));

console.log("\n--- Why this matters ---");
console.log("output.energyLevel is a number. output.wins is an array of strings.");
console.log("You can now render this in a UI, save it to a database, or pipe it into");
console.log("another system. Notice the .describe() strings on the schema. Those are");
console.log("hints to the model about what each field should contain. Treat them as");
console.log("part of your prompt, because the model does.");
