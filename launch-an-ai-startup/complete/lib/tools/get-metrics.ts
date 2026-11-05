import { tool } from "ai";
import { z } from "zod";
import { getMetrics } from "@/lib/updates";

// The model picks the months. The application picks the founder: founderId
// arrives through tool context from the session, never from the model, so no
// prompt can point this tool at someone else's numbers.
export const getMetricsTool = tool({
  description:
    "Get the signed-in founder's monthly metrics: MRR, customers, net burn, and runway in months.",
  inputSchema: z.object({
    months: z
      .array(z.string().regex(/^\d{4}-\d{2}$/))
      .min(1)
      .max(6)
      .describe("Months to fetch, as YYYY-MM. Include the previous month for comparisons."),
  }),
  contextSchema: z.object({ founderId: z.string() }),
  execute: async ({ months }, { context }) => {
    const all = await getMetrics(context.founderId);
    const found = all.filter((m) => months.includes(m.month));
    return found.length ? found : { error: "No metrics recorded for those months." };
  },
});
