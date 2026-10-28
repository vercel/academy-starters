import { defineTool } from "eve/tools";
import { always } from "eve/tools/approval";
import { z } from "zod";

export default defineTool({
  approval: always(),
  description:
    "Pause a high-risk work order and ask a person to approve its specification before implementation begins.",
  execute(input) {
    return {
      approved: true,
      criteriaCount: input.acceptanceCriteria.length,
      workOrderId: input.workOrderId,
    };
  },
  inputSchema: z.object({
    acceptanceCriteria: z.array(z.string()).min(1),
    approach: z.string().min(1),
    risks: z.array(z.string()),
    workOrderId: z.string().min(1),
  }),
});

