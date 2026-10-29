"use server";

import { stripe } from "./config";
import { createSupabaseClient } from "@/utils/supabase/server";
import { createOrRetrieveCustomer } from "@/utils/supabase/admin";

// Helper to build URLs for redirects
function getURL(path: string = "") {
  let url =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    "http://localhost:3000";

  url = url.startsWith("http") ? url : `https://${url}`;
  url = url.endsWith("/") ? url.slice(0, -1) : url;

  return path ? `${url}${path}` : url;
}

export type CheckoutResponse = {
  sessionId?: string;
  errorRedirect?: string;
};

// TODO: Implement checkoutWithStripe
// This function should:
// 1. Get the authenticated user from Supabase
// 2. Get or create a Stripe customer using createOrRetrieveCustomer
// 3. Create a Stripe checkout session with:
//    - payment_method_types: ["card"]
//    - billing_address_collection: "required"
//    - customer (from step 2)
//    - line_items with the priceId and quantity: 1
//    - mode: "subscription"
//    - success_url and cancel_url using getURL()
// 4. Return { sessionId: session.id } or { errorRedirect } on error

export async function checkoutWithStripe(
  priceId: string,
  redirectPath: string = "/protected/subscription"
): Promise<CheckoutResponse> {
  // TODO: Implement this function
  throw new Error("checkoutWithStripe not implemented");
}

// TODO: Implement createStripePortal
// This function should:
// 1. Get the authenticated user from Supabase
// 2. Get or create a Stripe customer
// 3. Create a billing portal session with stripe.billingPortal.sessions.create
// 4. Return the portal URL

export async function createStripePortal(
  currentPath: string = "/protected/subscription"
): Promise<string> {
  // TODO: Implement this function
  throw new Error("createStripePortal not implemented");
}
