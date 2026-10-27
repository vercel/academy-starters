import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(request: Request) {
  const secret = request.headers.get("x-webhook-secret");

  if (!process.env.DROP_WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: "Webhook secret is not configured" },
      { status: 500 }
    );
  }

  if (secret !== process.env.DROP_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as { dropId?: string };
  if (!body.dropId) {
    return NextResponse.json(
      { error: "dropId is required" },
      { status: 400 }
    );
  }

  revalidateTag("drops", "max");

  return NextResponse.json({
    revalidated: true,
    dropId: body.dropId,
    revalidatedAt: new Date().toISOString(),
  });
}
