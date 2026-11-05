import { defineAgent } from "eve";

export default defineAgent({
  model: "openai/gpt-5.4-mini",
  // No bash, file, or web tools. This agent reads private metrics, so it gets
  // only the tools in agent/tools/ and nothing that can reach the internet.
  defaultTools: false,
});
