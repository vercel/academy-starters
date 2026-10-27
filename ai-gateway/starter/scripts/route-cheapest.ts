import { generateText } from "ai";
import { MENU } from "../lib/menu";

const result = await generateText({
  model: "anthropic/claude-sonnet-4.6",
  prompt:
    "You write the sidewalk sign for the Taco Tuesday truck. Today's special " +
    "is the Birria Eclipse. Write a three-sentence announcement that makes " +
    "people cross the street. Reference the menu for tone, and do not invent prices.\n\n" +
    MENU,
  providerOptions: {
    gateway: {
      sort: "cost",
    },
  },
});

const gateway = result.finalStep.providerMetadata?.gateway;
const routing = gateway?.routing as any;

console.log(result.text);
console.log("---");
console.log(`Served by:  ${routing?.finalProvider}`);
console.log(`Cost:       $${gateway?.cost}`);
console.log(JSON.stringify(routing?.sort, null, 2));
