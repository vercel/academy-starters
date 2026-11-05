import { handleCallback } from "@vercel/queue";
import { db } from "@/lib/db";
import { computeHighlights } from "@/lib/highlights";
import { getMetrics } from "@/lib/updates";

export type HighlightsMessage = { updateId: string };

// Queues delivers at least once, so this handler can run twice for the same
// message. Computing is pure and the write only moves "crunching" to "ready",
// so a second run changes nothing.
export const POST = handleCallback<HighlightsMessage>(async ({ updateId }, metadata) => {
  const { rows } = await db.query<{ founder_id: string; month: string; status: string }>(
    "select founder_id, month, status from updates where id = $1",
    [updateId],
  );
  const update = rows[0];
  if (!update || update.status === "ready") return;

  const highlights = computeHighlights(await getMetrics(update.founder_id), update.month);
  await db.query(
    "update updates set highlights = $2, status = 'ready' where id = $1 and status = 'crunching'",
    [updateId, highlights],
  );

  console.log(
    JSON.stringify({ event: "highlights.ready", updateId, deliveryCount: metadata.deliveryCount }),
  );
});
