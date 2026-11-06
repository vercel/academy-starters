import { createHmac, timingSafeEqual } from "node:crypto";
import { markOrderPaid } from "@/lib/store";

// TidePay is a made-up payment provider. attack/payment-webhook.mjs plays its
// part, signing each event with the same test secret.
const SECRET = process.env.TIDEPAY_WEBHOOK_SECRET ?? "tidepay_test_secret";

function isSigned(body: string, signature: string | null) {
  if (!signature) return false;
  const expected = createHmac("sha256", SECRET).update(body).digest("hex");
  return expected.length === signature.length && timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
}

export async function POST(request: Request) {
  const body = await request.text();
  if (!isSigned(body, request.headers.get("x-tidepay-signature"))) {
    return Response.json({ error: "Bad signature" }, { status: 401 });
  }

  const event = JSON.parse(body);
  if (event.type !== "payment.succeeded") {
    return Response.json({ received: true });
  }

  const order = markOrderPaid(event.orderId);
  if (!order) {
    return Response.json({ error: "Unknown order" }, { status: 404 });
  }

  return Response.json({ received: true, id: order.id, status: order.status });
}
