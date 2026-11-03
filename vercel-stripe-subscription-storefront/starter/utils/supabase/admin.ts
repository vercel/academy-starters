import { createClient } from "@supabase/supabase-js";
import { stripe } from "@/utils/stripe/config";
import Stripe from "stripe";

// Admin client with the secret key for webhook operations
// This bypasses Row Level Security for admin operations
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

// Helper to convert Unix timestamp to ISO string
const toDateTime = (secs: number): Date => {
  return new Date(secs * 1000);
};

// ── Webhook sync ──────────────────────────────────────────────────────────
// These copy Stripe objects into Supabase. The webhook route you write in
// lesson 2.1 calls them; you don't need to change them.

export const upsertProductRecord = async (product: Stripe.Product) => {
  const { error } = await supabaseAdmin.from("products").upsert([
    {
      id: product.id,
      active: product.active,
      name: product.name,
      description: product.description ?? null,
      image: product.images?.[0] ?? null,
      metadata: product.metadata,
    },
  ]);
  if (error) throw new Error(`Product insert/update failed: ${error.message}`);
  console.log(`Product inserted/updated: ${product.id}`);
};

// Stripe doesn't promise event order, so price.created can arrive before the
// product it belongs to. Wait and retry when the product row isn't there yet.
const FOREIGN_KEY_VIOLATION = "23503";

export const upsertPriceRecord = async (
  price: Stripe.Price,
  retryCount = 0,
  maxRetries = 3
): Promise<void> => {
  const { error } = await supabaseAdmin.from("prices").upsert([
    {
      id: price.id,
      product_id: typeof price.product === "string" ? price.product : price.product.id,
      active: price.active,
      currency: price.currency,
      description: price.nickname ?? null,
      type: price.type,
      unit_amount: price.unit_amount ?? null,
      interval: price.recurring?.interval ?? null,
      interval_count: price.recurring?.interval_count ?? null,
      trial_period_days: price.recurring?.trial_period_days ?? null,
      metadata: price.metadata,
    },
  ]);

  if (error?.code === FOREIGN_KEY_VIOLATION && retryCount < maxRetries) {
    console.log(`Product for price ${price.id} not synced yet, retrying...`);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return upsertPriceRecord(price, retryCount + 1, maxRetries);
  }
  if (error) throw new Error(`Price insert/update failed: ${error.message}`);
  console.log(`Price inserted/updated: ${price.id}`);
};

export const deleteProductRecord = async (product: Stripe.Product) => {
  const { error } = await supabaseAdmin
    .from("products")
    .delete()
    .eq("id", product.id);
  if (error) throw new Error(`Product deletion failed: ${error.message}`);
  console.log(`Product deleted: ${product.id}`);
};

export const deletePriceRecord = async (price: Stripe.Price) => {
  const { error } = await supabaseAdmin
    .from("prices")
    .delete()
    .eq("id", price.id);
  if (error) throw new Error(`Price deletion failed: ${error.message}`);
  console.log(`Price deleted: ${price.id}`);
};

// TODO: Implement createOrRetrieveCustomer
// This function should:
// 1. Check if customer exists in Supabase customers table
// 2. If exists, retrieve from Stripe to verify
// 3. If not, check Stripe by email
// 4. If still not found, create new customer in Stripe
// 5. Sync customer ID to Supabase
// 6. Return the Stripe customer ID
export const createOrRetrieveCustomer = async ({
  email,
  uuid,
}: {
  email: string;
  uuid: string;
}): Promise<string> => {
  // TODO: Implement this function
  throw new Error("createOrRetrieveCustomer not implemented");
};

// Copies a subscription from Stripe into Supabase. Called for checkout and
// every customer.subscription.* event.
export const manageSubscriptionStatusChange = async (
  subscriptionId: string,
  customerId: string
) => {
  // createOrRetrieveCustomer (lesson 2.3) stores which user owns this customer.
  const { data: customer, error: customerError } = await supabaseAdmin
    .from("customers")
    .select("id")
    .eq("stripe_customer_id", customerId)
    .single();
  if (customerError) {
    throw new Error(`Customer lookup failed: ${customerError.message}`);
  }

  const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
    expand: ["default_payment_method"],
  });
  // Since API version 2025-03-31.basil, the billing period lives on each
  // subscription item, not on the subscription.
  const item = subscription.items.data[0];

  const { error } = await supabaseAdmin.from("subscriptions").upsert([
    {
      id: subscription.id,
      user_id: customer.id,
      metadata: subscription.metadata,
      status: subscription.status,
      price_id: item.price.id,
      quantity: item.quantity ?? 1,
      cancel_at_period_end: subscription.cancel_at_period_end,
      cancel_at: subscription.cancel_at ? toDateTime(subscription.cancel_at).toISOString() : null,
      canceled_at: subscription.canceled_at ? toDateTime(subscription.canceled_at).toISOString() : null,
      current_period_start: toDateTime(item.current_period_start).toISOString(),
      current_period_end: toDateTime(item.current_period_end).toISOString(),
      created: toDateTime(subscription.created).toISOString(),
      ended_at: subscription.ended_at ? toDateTime(subscription.ended_at).toISOString() : null,
      trial_start: subscription.trial_start ? toDateTime(subscription.trial_start).toISOString() : null,
      trial_end: subscription.trial_end ? toDateTime(subscription.trial_end).toISOString() : null,
    },
  ]);
  if (error) {
    throw new Error(`Subscription insert/update failed: ${error.message}`);
  }
  console.log(`Subscription ${subscription.id} for user ${customer.id}: ${subscription.status}`);
};
