import { isValidPhone, normalizePhone } from "@/lib/phone";
import { getRollsLeft, takeRoll } from "@/lib/store";
import { MENU, type RollStyle } from "@/lib/truck";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const phone = typeof body?.phone === "string" ? body.phone : "";
  const style = body?.style as RollStyle;

  if (!name || !isValidPhone(phone) || !(style in MENU)) {
    return Response.json({ error: "Name, a phone number, and a roll style, please." }, { status: 400 });
  }

  // TODO (3.2, Advanced, Pro and Enterprise): One roll per phone number. Call checkRateLimit from
  // @vercel/firewall with the normalized phone as the rateLimitKey.

  const preorder = takeRoll({ name, phone: normalizePhone(phone), style });
  if (!preorder) {
    return Response.json({ error: "Sold out. See you tomorrow." }, { status: 409 });
  }

  return Response.json({ confirmation: preorder.confirmation, rollsLeft: getRollsLeft() }, { status: 201 });
}
