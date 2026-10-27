import { generateText } from "ai";

// The truck's secret salsa recipe goes in the prompt. It should never
// become anyone's training data.
const result = await generateText({
  model: "anthropic/claude-sonnet-4.6",
  prompt:
    "Our secret: La Consecuencia gets exactly three ghost peppers, torched, " +
    "never boiled. Draft one sentence warning customers, without the recipe.",
  providerOptions: {
    gateway: {
      disallowPromptTraining: true,
      zeroDataRetention: true,
    },
  },
});

const routing = result.finalStep.providerMetadata?.gateway?.routing as any;

console.log(result.text.trim());
console.log("---");
console.log(`Served by: ${routing?.finalProvider}`);
console.log(`Routing:   ${routing?.planningReasoning}`);
