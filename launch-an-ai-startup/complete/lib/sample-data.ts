// Sample founders for Up and to the Right. Section 2 moves these into Postgres.
export type MonthlyMetrics = {
  month: string; // YYYY-MM
  mrr: number; // monthly recurring revenue, in dollars
  customers: number;
  burn: number; // monthly net burn, in dollars
  runwayMonths: number;
};

export type Founder = {
  id: string;
  name: string;
  startup: string;
  pitch: string;
  metrics: MonthlyMetrics[];
  notes: string;
};

export const founders: Founder[] = [
  {
    id: "pearl",
    name: "Pearl Nakamura",
    startup: "Starter Pack",
    pitch: "A sourdough starter subscription. We ship the starter, an app reminds you to feed it.",
    metrics: [
      { month: "2026-08", mrr: 3120, customers: 208, burn: 18400, runwayMonths: 14 },
      { month: "2026-09", mrr: 3655, customers: 241, burn: 17900, runwayMonths: 13 },
      { month: "2026-10", mrr: 4180, customers: 276, burn: 19250, runwayMonths: 12 },
    ],
    notes:
      "Best month yet. Fall baking season is real. Lost the bakery in Tulsa (they started making their own starter, which is fair). Shipping times are slow in the Midwest. Hiring a part-time ops person in December.",
  },
  {
    id: "hollis",
    name: "Hollis Varga",
    startup: "Corner Pocket Robotics",
    pitch: "A robot that folds fitted sheets. Yes, all four corners.",
    metrics: [
      { month: "2026-08", mrr: 900, customers: 3, burn: 61000, runwayMonths: 9 },
      { month: "2026-09", mrr: 900, customers: 3, burn: 64500, runwayMonths: 8 },
      { month: "2026-10", mrr: 2400, customers: 8, burn: 66000, runwayMonths: 8 },
    ],
    notes:
      "Five new hotel pilots. Corner three still jams on deep-pocket sheets. Raising a bridge in Q1. Need intros to hospitality investors.",
  },
];

export function latestMetrics(founder: Founder): MonthlyMetrics {
  return founder.metrics[founder.metrics.length - 1];
}
