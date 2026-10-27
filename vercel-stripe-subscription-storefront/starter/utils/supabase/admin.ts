import { createClient } from "@supabase/supabase-js";
import { stripe } from "@/utils/stripe/config";
import Stripe from "stripe";

// Admin client with service role key for webhook operations
// This bypasses Row Level Security for admin operations
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
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

// TODO: Implement upsertProductRecord
// Insert or update a product record from Stripe webhook data
export const upsertProductRecord = async (product: Stripe.Product) => {
  // TODO: Map Stripe product fields to database schema
  // TODO: Upsert to products table
  throw new Error("upsertProductRecord not implemented");
};

// TODO: Implement upsertPriceRecord
// Insert or update a price record from Stripe webhook data
// Note: May need retry logic for foreign key constraint (product must exist first)
export const upsertPriceRecord = async (price: Stripe.Price) => {
  // TODO: Map Stripe price fields to database schema
  // TODO: Upsert to prices table
  throw new Error("upsertPriceRecord not implemented");
};

// TODO: Implement deleteProductRecord
export const deleteProductRecord = async (product: Stripe.Product) => {
  throw new Error("deleteProductRecord not implemented");
};

// TODO: Implement deletePriceRecord
export const deletePriceRecord = async (price: Stripe.Price) => {
  throw new Error("deletePriceRecord not implemented");
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

// TODO: Implement manageSubscriptionStatusChange
// This function should:
// 1. Look up user by Stripe customer ID in customers table
// 2. Fetch full subscription details from Stripe
// 3. Map subscription data to database schema
// 4. Upsert subscription record to subscriptions table
export const manageSubscriptionStatusChange = async (
  subscriptionId: string,
  customerId: string,
  createAction = false
) => {
  // TODO: Implement this function
  throw new Error("manageSubscriptionStatusChange not implemented");
};
