// Creates the app tables and loads Pearl's sample metrics.
// Run with: npm run db:setup
import { readFile } from "node:fs/promises";
import { Pool } from "pg";
import { founders } from "../lib/sample-data.ts";

const db = new Pool({ connectionString: process.env.DATABASE_URL });

const schema = await readFile(new URL("../db/schema.sql", import.meta.url), "utf8");
await db.query(schema);

const pearl = founders[0];
for (const m of pearl.metrics) {
  await db.query(
    `insert into metrics (founder_id, month, mrr, customers, burn, runway_months)
     values ($1, $2, $3, $4, $5, $6)
     on conflict (founder_id, month) do nothing`,
    [pearl.id, m.month, m.mrr, m.customers, m.burn, m.runwayMonths],
  );
}

console.log(`Tables ready. Loaded ${pearl.metrics.length} months of metrics for ${pearl.startup}.`);
await db.end();
