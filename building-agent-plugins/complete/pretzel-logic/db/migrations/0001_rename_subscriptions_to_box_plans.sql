-- Renamed in Q3 2024 after marketing kept confusing this with Stripe subscriptions.
-- The "subscriptions" name lived for two years. It still leaks into PR descriptions
-- and code comments. If you see "subscription" in this codebase and the context
-- is our plan tiers, that's a BoxPlan, please update the reference.
ALTER TABLE "subscriptions" RENAME TO "box_plans";
