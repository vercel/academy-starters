import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { founders } from "@/lib/sample-data";

export type SignedInFounder = { id: string; name: string };

// Every authorization decision starts here. Pass request headers from a route
// handler, or `await headers()` from a server component.
export async function getFounder(headers: Headers): Promise<SignedInFounder | null> {
  const session = await auth.api.getSession({ headers });
  if (!session) return null;
  return { id: session.user.id, name: session.user.name };
}

// New founders get Starter Pack's numbers to practice with.
export async function ensureDemoMetrics(founderId: string) {
  const demo = founders[0];
  for (const m of demo.metrics) {
    await db.query(
      `insert into metrics (founder_id, month, mrr, customers, burn, runway_months)
       values ($1, $2, $3, $4, $5, $6)
       on conflict (founder_id, month) do nothing`,
      [founderId, m.month, m.mrr, m.customers, m.burn, m.runwayMonths],
    );
  }
}
