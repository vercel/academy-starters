import { checkRateLimit } from "@vercel/firewall";
import { createTextStreamResponse, toTextStream } from "ai";
import { checkBotId } from "botid/server";
import { z } from "zod";
import { draftStyle } from "@/flags";
import { streamDraft } from "@/lib/draft";
import { requestId as getRequestId } from "@/lib/request-id";
import { getFounder } from "@/lib/session";
import { getUpdate } from "@/lib/updates";

export const maxDuration = 60;

const DraftRequest = z.object({ updateId: z.uuid() });

export async function POST(request: Request) {
  const requestId = getRequestId(request);
  try {
    return await draft(request, requestId);
  } catch (error) {
    // Anything unexpected: log the real error with the request ID, and give
    // the founder the same ID instead of a stack trace.
    console.error(JSON.stringify({ event: "draft.failed", requestId, error: String(error) }));
    return Response.json({ error: "We couldn't draft this update.", requestId }, { status: 500 });
  }
}

async function draft(request: Request, requestId: string) {
  // Scripts that replay a founder's cookie still fail here: BotID checks that
  // a real browser running this app made the request. Local dev always passes.
  const verification = await checkBotId();
  if (verification.isBot) {
    console.log(JSON.stringify({ event: "draft.bot_blocked", requestId }));
    return Response.json({ error: "Access denied", requestId }, { status: 403 });
  }

  const founder = await getFounder(request.headers);
  if (!founder) return Response.json({ error: "Sign in first" }, { status: 401 });

  const parsed = DraftRequest.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: "Unknown update" }, { status: 400 });

  const update = await getUpdate(founder.id, parsed.data.updateId);
  if (!update) return Response.json({ error: "Not found" }, { status: 404 });

  // One bucket per founder, so one enthusiastic founder can't spend everyone's
  // budget. The limit itself lives in the "draft" Firewall rule.
  let rateLimited: boolean;
  try {
    ({ rateLimited } = await checkRateLimit("draft", {
      request,
      rateLimitKey: founder.id,
      timeout: 1000,
    }));
  } catch (error) {
    // A slow check fails closed: no unchecked calls to an expensive model.
    if (error instanceof Error && error.name === "TimeoutError") {
      return Response.json({ error: "Drafting is busy right now. Try again in a minute." }, { status: 503 });
    }
    throw error;
  }
  if (rateLimited) {
    return Response.json(
      { error: "That's a lot of drafts in a row. Take a breath and try again in a minute." },
      { status: 429 },
    );
  }

  const result = streamDraft({
    // Off for everyone unless the draft-style flag says otherwise. Turning the
    // flag off in the dashboard reverts every founder with no redeploy.
    style: await draftStyle(),
    founderId: founder.id,
    founderName: founder.name,
    updateId: update.id,
    requestId,
    month: update.month,
    notes: update.notes,
    highlights: update.highlights,
  });

  return createTextStreamResponse({ stream: toTextStream({ stream: result.stream }) });
}
