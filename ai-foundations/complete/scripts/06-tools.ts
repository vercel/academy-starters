// Lesson 2.2 — Tools: when the model calls out for help.
//
// Run: pnpm script scripts/06-tools.ts
// What happens: we give the model a function it can choose to call. When the
// model decides it needs information it doesn't have (like the weather), it
// invokes the tool, the tool returns data, and the model uses the result to
// answer. This is the building block of agents. Every "AI agent" you'll ever
// hear about is, roughly, a model in a loop with a set of tools.

import { generateText, tool, isStepCount } from "ai";
import { z } from "zod";

const result = await generateText({
  model: "openai/gpt-5.4-mini",
  tools: {
    getWeather: tool({
      description: "Get the current weather for a city.",
      inputSchema: z.object({
        city: z.string().describe("The city to check."),
      }),
      execute: async ({ city }) => ({
        city,
        temperatureF: 72,
        conditions: "partly cloudy",
        windMph: 8,
      }),
    }),
  },
  stopWhen: isStepCount(5),
  prompt: "What's the weather like in Portland, Oregon right now? Should I bring a jacket?",
});

console.log("--- Tool calls the model decided to make ---");
for (const step of result.steps) {
  for (const call of step.toolCalls ?? []) {
    console.log(`  ${call.toolName}(${JSON.stringify(call.input)})`);
  }
}

console.log("\n--- Final answer ---");
console.log(result.text);

console.log("\n--- What just happened ---");
console.log("1. We sent the model a prompt and a tool it could choose to call.");
console.log("2. The model decided to call getWeather with { city: 'Portland, Oregon' }.");
console.log("3. Our execute function returned fake weather data.");
console.log("4. The model used the data to write a final answer about the jacket.");
console.log("This loop (call tool, use result, repeat) is the agent pattern.");
