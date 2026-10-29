// Lesson 4.3 — Your first useful AI script.
//
// Run: pnpm script scripts/10-daily-debrief.ts
// What happens: a synthesis. We combine structured output (from 2.1) with a
// thoughtful prompt to turn a messy paste-in reflection into a structured
// debrief. This is the smallest possible "AI is useful for me" tool. Roughly
// 50 lines, runs in your terminal, and you understand every piece of it.

import { generateText, Output } from "ai";
import { z } from "zod";

const DailyDebrief = z.object({
  oneSentenceSummary: z
    .string()
    .describe("A single sentence summarizing the day. Honest, not corporate."),
  shipped: z
    .array(z.string())
    .describe("Concrete things the user completed or delivered today."),
  learned: z
    .array(z.string())
    .describe("Insights, surprises, or new knowledge from today."),
  blocked: z
    .array(z.string())
    .describe("Things stuck, unresolved, or in the way."),
  next: z
    .array(z.string())
    .describe("What the user plans to do tomorrow."),
  energyRating: z
    .number()
    .min(1)
    .max(10)
    .describe("The user's self-reported energy level today, 1 (drained) to 10 (great)."),
});

const reflection = `
Today was kind of a slog. I shipped the new pricing page after fighting with the layout for
two days, which felt good, but I also spent four hours debugging a CORS error that turned
out to be a typo. Learned that I should re-read my own code before assuming it's a framework
bug. I'm blocked on the Stripe webhook stuff because I can't reproduce the error in test mode.
Tomorrow I want to actually finish the webhook investigation and start on the dashboard
redesign. Energy was maybe a 4 today. I really need to get to bed earlier.
`.trim();

const { output } = await generateText({
  model: "openai/gpt-5.4-mini",
  output: Output.object({ schema: DailyDebrief }),
  prompt: `Convert this messy daily reflection into a structured debrief.
Be honest and concrete. Don't soften the language. Match the user's voice.

Reflection:
${reflection}`,
});

console.log("Daily Debrief");
console.log("=============\n");
console.log(`Summary: ${output.oneSentenceSummary}`);
console.log(`Energy:  ${output.energyRating}/10`);

const printSection = (label: string, items: string[]) => {
  console.log(`\n${label}`);
  if (items.length === 0) {
    console.log("  (nothing)");
  } else {
    items.forEach((item) => console.log(`  - ${item}`));
  }
};

printSection("Shipped", output.shipped);
printSection("Learned", output.learned);
printSection("Blocked", output.blocked);
printSection("Next", output.next);

console.log("\n--- What you just built ---");
console.log("A working AI tool. Paste in any reflection, get back a usable debrief.");
console.log("This is the same shape as a status reporter, a meeting notes structurer,");
console.log("a customer feedback triager, or a hundred other internal tools. The pattern");
console.log("scales. The hard parts (prompt + schema + AI Gateway) you've already done.");
