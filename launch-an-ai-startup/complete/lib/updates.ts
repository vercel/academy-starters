import { z } from "zod";
import { db } from "@/lib/db";
import type { MonthlyMetrics } from "@/lib/sample-data";

export const NewUpdate = z.object({
  month: z.string().regex(/^\d{4}-\d{2}$/, "Use YYYY-MM"),
  notes: z.string().trim().min(10, "Give the model something to work with").max(4000),
});

export type Update = {
  id: string;
  month: string;
  notes: string;
  status: "saved" | "crunching" | "ready";
  highlights: Highlights | null;
  createdAt: Date;
};

export type Highlights = {
  mrrGrowthPercent: number | null;
  newCustomers: number | null;
  burnMultiple: number | null;
};

export async function createUpdate(founderId: string, input: z.infer<typeof NewUpdate>) {
  const { rows } = await db.query<{ id: string }>(
    "insert into updates (founder_id, month, notes, status) values ($1, $2, $3, 'crunching') returning id",
    [founderId, input.month, input.notes],
  );
  return rows[0].id;
}

export async function listUpdates(founderId: string): Promise<Update[]> {
  const { rows } = await db.query(
    `select id, month, notes, status, highlights, created_at as "createdAt"
     from updates where founder_id = $1 order by created_at desc limit 20`,
    [founderId],
  );
  return rows;
}

export async function getUpdate(founderId: string, id: string): Promise<Update | null> {
  // Reject anything that isn't a UUID before Postgres sees it.
  if (!z.uuid().safeParse(id).success) return null;
  const { rows } = await db.query(
    `select id, month, notes, status, highlights, created_at as "createdAt"
     from updates where id = $1 and founder_id = $2`,
    [id, founderId],
  );
  return rows[0] ?? null;
}

export async function getMetrics(founderId: string): Promise<MonthlyMetrics[]> {
  const { rows } = await db.query(
    `select month, mrr, customers, burn, runway_months as "runwayMonths"
     from metrics where founder_id = $1 order by month`,
    [founderId],
  );
  return rows;
}
