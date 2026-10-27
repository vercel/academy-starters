import { SupabaseClient } from "@supabase/supabase-js";
import { cache } from "react";

// Type definitions for database queries
export type ProductWithPrices = {
  id: string;
  active: boolean;
  name: string;
  description: string | null;
  image: string | null;
  metadata: Record<string, string>;
  prices: Price[];
};

export type Price = {
  id: string;
  product_id: string;
  active: boolean;
  description: string | null;
  unit_amount: number | null;
  currency: string;
  type: "one_time" | "recurring";
  interval: "day" | "week" | "month" | "year" | null;
  interval_count: number | null;
  trial_period_days: number | null;
  metadata: Record<string, string>;
};

export type SubscriptionWithPrice = {
  id: string;
  user_id: string;
  status: string;
  metadata: Record<string, string>;
  price_id: string;
  quantity: number;
  cancel_at_period_end: boolean;
  created: string;
  current_period_start: string;
  current_period_end: string;
  ended_at: string | null;
  cancel_at: string | null;
  canceled_at: string | null;
  trial_start: string | null;
  trial_end: string | null;
  prices: Price & {
    products: ProductWithPrices;
  };
};

// TODO: Implement getSubscription
// Query the subscriptions table for the current user's active subscription
// Join with prices and products tables
// Filter for status IN ('trialing', 'active')
// Use cache() for request deduplication
export const getSubscription = cache(async (supabase: SupabaseClient) => {
  // TODO: Implement this query
  // Return type: SubscriptionWithPrice | null
  return null;
});

// TODO: Implement getProducts
// Query active products with their active prices
// Order by metadata->index and unit_amount
// Use cache() for request deduplication
export const getProducts = cache(async (supabase: SupabaseClient) => {
  // TODO: Implement this query
  // Return type: ProductWithPrices[]
  return [];
});

// TODO: Implement hasActiveSubscription
// Check if the current user has an active or trialing subscription
// Returns boolean
export const hasActiveSubscription = cache(async (supabase: SupabaseClient) => {
  // TODO: Implement this check
  return false;
});
