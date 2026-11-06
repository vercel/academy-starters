import { createOrder } from "@/lib/store";

export async function POST(request: Request) {
  // TODO (4.3, Advanced): Call checkBotId() and reject bots with a 403.
  // TODO (4.3, Advanced): Let verified bots on an allowlist through.

  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const rolls = Number(body?.rolls);
  const pickup = typeof body?.pickup === "string" ? body.pickup : "";

  if (!name || !email.includes("@") || !Number.isInteger(rolls) || rolls < 5 || rolls > 40 || !pickup) {
    return Response.json({ error: "Name, email, 5 to 40 rolls, and a pickup time, please." }, { status: 400 });
  }

  const order = createOrder({ name, email, rolls, pickup, placedBy: "customer" });
  return Response.json({ id: order.id, status: order.status }, { status: 201 });
}
