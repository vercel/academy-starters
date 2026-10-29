import { defineAgent } from "eve";
import { MODELS } from "../../lib/models.js";

export default defineAgent({
  description:
    "Implement an approved work order in an isolated repository checkout. Create a feature branch, make only the specified change, run checks, commit, and push the branch.",
  model: MODELS.builder,
});
