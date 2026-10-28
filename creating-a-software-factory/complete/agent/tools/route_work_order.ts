import { defineTool } from "eve/tools";
import { classificationSchema } from "../lib/classification.js";
import { routeClassification } from "../lib/routing.js";

export default defineTool({
  description:
    "Choose the documentation, bug, public API, or manual lane from a validated issue classification.",
  execute(classification) {
    return routeClassification(classification);
  },
  inputSchema: classificationSchema,
});

