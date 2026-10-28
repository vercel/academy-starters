import { defineTool } from "eve/tools";
import { z } from "zod";
import {
  addEvidence,
  evidenceSchema,
  workOrderSchema,
} from "../lib/work-order.js";

export default defineTool({
  description:
    "Append one observation, command, test, decision, or diff to a work order's evidence trail.",
  execute(input) {
    return addEvidence(input.workOrder, input.evidence);
  },
  inputSchema: z.object({
    evidence: evidenceSchema.omit({ recordedAt: true }),
    workOrder: workOrderSchema,
  }),
});
