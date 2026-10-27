import { stripe } from "@/utils/stripe/config";
import {
  manageSubscriptionStatusChange,
  upsertPriceRecord,
  upsertProductRecord,
  deletePriceRecord,
  deleteProductRecord,
} from "@/utils/supabase/admin";
import Stripe from "stripe";

// Stripe events we care about for subscription management
const relevantEvents = new Set([
  "product.created",
  "product.updated",
  "product.deleted",
  "price.created",
  "price.updated",
  "price.deleted",
  "checkout.session.completed",
  "customer.subscription.created",
  "customer.subscription.updated",
  "customer.subscription.deleted",
]);

export async function POST(req: Request) {
  // TODO: Implement webhook handler
  // 1. Get raw body with req.text() (important: don't parse JSON first)
  // 2. Get stripe-signature header
  // 3. Verify webhook signature with stripe.webhooks.constructEvent()
  // 4. Check if event.type is in relevantEvents
  // 5. Handle each event type:
  //    - product.created/updated: upsertProductRecord
  //    - product.deleted: deleteProductRecord
  //    - price.created/updated: upsertPriceRecord
  //    - price.deleted: deletePriceRecord
  //    - customer.subscription.*: manageSubscriptionStatusChange
  //    - checkout.session.completed: manageSubscriptionStatusChange (if mode === 'subscription')
  // 6. Return Response with { received: true }

  return new Response("Webhook handler not implemented", { status: 501 });
}
