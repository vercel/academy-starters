import { send } from "@vercel/queue";
import type { HighlightsMessage } from "@/app/api/queues/highlights/route";
import { getFounder } from "@/lib/session";
import { createUpdate, listUpdates, NewUpdate } from "@/lib/updates";

export async function GET(request: Request) {
  const founder = await getFounder(request.headers);
  if (!founder) return Response.json({ error: "Sign in first" }, { status: 401 });

  return Response.json(await listUpdates(founder.id));
}

export async function POST(request: Request) {
  const founder = await getFounder(request.headers);
  if (!founder) return Response.json({ error: "Sign in first" }, { status: 401 });

  const parsed = NewUpdate.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return Response.json({ error: parsed.error.issues[0].message }, { status: 400 });
  }

  const id = await createUpdate(founder.id, parsed.data);

  // Hand the number crunching to a queue and answer right away. The update
  // ID doubles as the idempotency key, so a retried send can't queue twice.
  const message: HighlightsMessage = { updateId: id };
  await send("highlights", message, { idempotencyKey: id });

  console.log(JSON.stringify({ event: "update.created", updateId: id, founderId: founder.id }));
  return Response.json({ id, status: "crunching" }, { status: 202 });
}
