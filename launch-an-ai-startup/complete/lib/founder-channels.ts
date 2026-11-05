import { db } from "@/lib/db";

// The one place that decides where a founder's update may go. The channel
// comes from this table, set by the operator, never from the model, the
// request, or a project-wide environment variable.
export async function getFounderChannel(founderId: string): Promise<string | null> {
  const { rows } = await db.query<{ slack_channel_id: string }>(
    "select slack_channel_id from founder_channels where founder_id = $1",
    [founderId],
  );
  return rows[0]?.slack_channel_id ?? null;
}
