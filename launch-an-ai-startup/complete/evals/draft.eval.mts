// Ten fixed cases for the investor update draft. Run after every prompt,
// schema, or model change: npm run eval
//
// Each case gets its own founder ID and metrics in your dev database, then
// runs through the same streamDraft() the route uses.
import { db } from "@/lib/db";
import { type DraftStyle, streamDraft } from "@/lib/draft";
import type { Draft } from "@/lib/draft-schema";
import { computeHighlights } from "@/lib/highlights";
import { cases } from "./cases.mts";

let passed = 0;
let total = 0;

for (const [i, c] of cases.entries()) {
  const founderId = `eval-${i + 1}`;
  await db.query("delete from metrics where founder_id = $1", [founderId]);
  for (const row of c.metrics) {
    await db.query(
      "insert into metrics (founder_id, month, mrr, customers, burn, runway_months) values ($1, $2, $3, $4, $5, $6)",
      [founderId, row.month, row.mrr, row.customers, row.burn, row.runwayMonths],
    );
  }
  const month = c.metrics.at(-1)!.month;

  let draft: Draft;
  try {
    const result = streamDraft({
      // Score a flagged variant before it reaches a founder: DRAFT_STYLE=short npm run eval
      style: (process.env.DRAFT_STYLE as DraftStyle | undefined) ?? "classic",
      founderId,
      founderName: "Eval Founder",
      updateId: founderId,
      month,
      notes: c.notes,
      highlights: computeHighlights(c.metrics, month),
      tags: ["feature:draft", "env:eval"],
    });
    draft = await result.output;
  } catch (error) {
    total += c.checks.length;
    console.log(`FAIL  ${c.name}: no valid draft (${(error as Error).name})`);
    continue;
  }

  for (const check of c.checks) {
    total++;
    const ok = check.pass(draft);
    if (ok) passed++;
    console.log(`${ok ? "PASS" : "FAIL"}  ${c.name}: ${check.name}`);
  }
}

console.log(`\n${passed}/${total} checks passed`);
await db.end();
process.exitCode = passed === total ? 0 : 1;
