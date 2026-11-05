import { db } from "@/lib/db";

export type Claim =
  | { kind: "claimed" }
  | { kind: "already-posted"; ts: string | null }
  | { kind: "in-doubt" };

// Record the post before it happens. Only the first caller for a founder and
// month gets "claimed"; everyone after that learns what already happened.
export async function claimPost(founderId: string, month: string): Promise<Claim> {
  const inserted = await db.query(
    "insert into slack_posts (founder_id, month) values ($1, $2) on conflict do nothing",
    [founderId, month],
  );
  if (inserted.rowCount === 1) return { kind: "claimed" };

  const { rows } = await db.query<{ status: string; slack_ts: string | null }>(
    "select status, slack_ts from slack_posts where founder_id = $1 and month = $2",
    [founderId, month],
  );
  // "posting" with no result means an earlier attempt stopped mid-post. It may
  // or may not have reached Slack, so a person checks before anyone retries.
  return rows[0]?.status === "posted"
    ? { kind: "already-posted", ts: rows[0].slack_ts }
    : { kind: "in-doubt" };
}

export async function markPosted(founderId: string, month: string, ts: string) {
  await db.query(
    "update slack_posts set status = 'posted', slack_ts = $3 where founder_id = $1 and month = $2",
    [founderId, month, ts],
  );
}

// Slack said no, so nothing was posted. Free the month for another try.
export async function releaseClaim(founderId: string, month: string) {
  await db.query("delete from slack_posts where founder_id = $1 and month = $2 and status = 'posting'", [
    founderId,
    month,
  ]);
}
