import { defineAgent } from "eve";
import { MODELS } from "../../lib/models.js";

export default defineAgent({
  description:
    "Investigate a bug or risky API request against the real repository. Reproduce the claim, inspect relevant code, and return an evidence-backed specification. Never modify files.",
  model: MODELS.investigator,
});
