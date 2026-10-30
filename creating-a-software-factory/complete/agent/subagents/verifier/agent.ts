import { defineAgent } from "eve";
import { MODELS } from "../../lib/models.js";

export default defineAgent({
  description:
    "Independently verify a pushed branch against its approved specification and acceptance criteria. Inspect the real diff and run checks. Never edit files.",
  model: MODELS.verifier,
});
