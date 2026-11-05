-- Up and to the Right: app tables. Better Auth creates its own tables in 2.2.

create table if not exists metrics (
  founder_id text not null,
  month text not null,            -- YYYY-MM
  mrr integer not null,
  customers integer not null,
  burn integer not null,
  runway_months integer not null,
  primary key (founder_id, month)
);

create table if not exists updates (
  id uuid primary key default gen_random_uuid(),
  founder_id text not null,
  month text not null,
  notes text not null,
  status text not null default 'saved',   -- saved | crunching | ready
  highlights jsonb,                       -- filled by the background job in 2.3
  created_at timestamptz not null default now()
);

-- Which Slack channel each founder may post to. Only the operator writes this
-- table (npm run channel:set), never the agent or the app's UI. Added in 4.2.
create table if not exists founder_channels (
  founder_id text primary key,
  slack_channel_id text not null,
  updated_at timestamptz not null default now()
);

-- One Slack post per founder per month. The agent claims the row before it
-- posts, so a retried or resumed call can't post twice. Added in 4.3.
create table if not exists slack_posts (
  founder_id text not null,
  month text not null,
  status text not null default 'posting',  -- posting | posted
  slack_ts text,
  created_at timestamptz not null default now(),
  primary key (founder_id, month)
);

create index if not exists updates_founder_idx on updates (founder_id, created_at desc);
