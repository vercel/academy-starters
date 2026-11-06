import { checkRateLimit } from "@vercel/firewall";
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

  // One roll per phone number, counted by the "preorder-phone" rule in the
  // Firewall. The WAF can't read a JSON body, so the key comes from code.
  const digits = normalizePhone(phone);
  try {
    const { rateLimited } = await checkRateLimit("preorder-phone", {
      request,
      rateLimitKey: `phone:${digits}`,
      timeout: 1000,
    });
    if (rateLimited) {
      return Response.json(
        { error: "That phone number already has a roll. Try again after the rush.", reason: "phone" },
        { status: 429 },
      );
    }
  } catch (error) {
    // If the check is slow, keep selling. The IP rate limit still sits in front.
    if (!(error instanceof Error && error.name === "TimeoutError")) throw error;
  }

  const preorder = takeRoll({ name, phone: digits, style });
  if (!preorder) {
    return Response.json({ error: "Sold out. See you tomorrow." }, { status: 409 });
  }

  return Response.json({ confirmation: preorder.confirmation, rollsLeft: getRollsLeft() }, { status: 201 });
}
