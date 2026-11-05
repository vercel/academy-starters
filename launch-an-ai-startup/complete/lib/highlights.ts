import type { MonthlyMetrics } from "@/lib/sample-data";
import type { Highlights } from "@/lib/updates";

// The numbers investors look for first. Pure function: same metrics in,
// same highlights out, so a retried job can't change the answer.
export function computeHighlights(metrics: MonthlyMetrics[], month: string): Highlights {
  const i = metrics.findIndex((m) => m.month === month);
  const current = metrics[i];
  const previous = metrics[i - 1];
  if (!current || !previous) {
    return { mrrGrowthPercent: null, newCustomers: null, burnMultiple: null };
  }

  const netNewMrr = current.mrr - previous.mrr;
  return {
    mrrGrowthPercent: round((netNewMrr / previous.mrr) * 100),
    newCustomers: current.customers - previous.customers,
    // Net burn divided by net new ARR for the month. Lower is better.
    burnMultiple: netNewMrr > 0 ? round(current.burn / (netNewMrr * 12)) : null,
  };
}

const round = (n: number) => Math.round(n * 10) / 10;
