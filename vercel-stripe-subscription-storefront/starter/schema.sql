-- Foragers Guild Database Schema
-- Run this in your Supabase SQL Editor to set up the required tables

-- Maps Supabase auth.users to Stripe customers
create table if not exists customers (
  id uuid references auth.users not null primary key,
  stripe_customer_id text unique
);
alter table customers enable row level security;

-- Stripe products synced via webhooks
create table if not exists products (
  id text primary key,
  active boolean,
  name text,
  description text,
  image text,
  metadata jsonb
);
alter table products enable row level security;
create policy "Allow public read-only access." on products for select using (true);

-- Stripe prices synced via webhooks
create type pricing_type as enum ('one_time', 'recurring');
create type pricing_plan_interval as enum ('day', 'week', 'month', 'year');

create table if not exists prices (
  id text primary key,
  product_id text references products,
  active boolean,
  description text,
  unit_amount bigint,
  currency text check (char_length(currency) = 3),
  type pricing_type,
  interval pricing_plan_interval,
  interval_count integer,
  trial_period_days integer,
  metadata jsonb
);
alter table prices enable row level security;
create policy "Allow public read-only access." on prices for select using (true);

-- User subscriptions synced via Stripe webhooks
create type subscription_status as enum (
  'trialing',
  'active',
  'canceled',
  'incomplete',
  'incomplete_expired',
  'past_due',
  'unpaid',
  'paused'
);

create table if not exists subscriptions (
  id text primary key,
  user_id uuid references auth.users not null,
  status subscription_status,
  metadata jsonb,
  price_id text references prices,
  quantity integer,
  cancel_at_period_end boolean,
  created timestamp with time zone default timezone('utc'::text, now()) not null,
  current_period_start timestamp with time zone default timezone('utc'::text, now()) not null,
  current_period_end timestamp with time zone default timezone('utc'::text, now()) not null,
  ended_at timestamp with time zone,
  cancel_at timestamp with time zone,
  canceled_at timestamp with time zone,
  trial_start timestamp with time zone,
  trial_end timestamp with time zone
);
alter table subscriptions enable row level security;
create policy "Can only view own subscription data." on subscriptions
  for select using (auth.uid() = user_id);

-- Function to check if a user has an active subscription
create or replace function has_active_subscription(user_uuid uuid)
returns boolean as $$
begin
  return exists (
    select 1 from subscriptions
    where user_id = user_uuid
    and status in ('trialing', 'active')
  );
end;
$$ language plpgsql security definer;
