import { generateText } from "ai";

const models = ["openai/gpt-5.4-mini", "anthropic/claude-sonnet-4.6"];

for (const model of models) {
  const result = await generateText({
    model,
    prompt:
      "In one sentence, describe the Birria taco: slow-braised beef birria " +
      "tacos with consommé for dipping. Make it sound delicious.",
  });

  const gateway = result.finalStep.providerMetadata?.gateway;
  const routing = gateway?.routing as any;
  const fallbacks = routing?.fallbacksAvailable ?? [];

  console.log(`=== ${model} ===`);
  console.log(`"${result.text.trim()}"`);
  console.log(`Cost:      $${gateway?.cost}`);
  console.log(
    fallbacks.length
      ? `Fallbacks: ${fallbacks.join(", ")} standing by`
      : `Fallbacks: none needed — served by ${routing?.finalProvider}`
  );
  console.log();
}
