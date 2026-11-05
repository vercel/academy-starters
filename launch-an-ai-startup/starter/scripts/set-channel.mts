// Assigns a founder's investor channel. Operator-only: run it yourself, after
// confirming the channel belongs to that founder's company.
//
//   npm run channel:set -- pearl@starterpack.example C0123456789
import { Pool } from "pg";

const [email, channelId] = process.argv.slice(2);
if (!email || !/^[CG][A-Z0-9]{8,}$/.test(channelId ?? "")) {
  console.error("Usage: npm run channel:set -- <founder-email> <slack-channel-id>");
  process.exit(1);
}

const db = new Pool({ connectionString: process.env.DATABASE_URL });
const { rows } = await db.query<{ id: string }>('select id from "user" where email = $1', [email]);
if (!rows[0]) {
  console.error(`No founder has signed in with ${email} yet.`);
  await db.end();
  process.exit(1);
}

await db.query(
  `insert into founder_channels (founder_id, slack_channel_id) values ($1, $2)
   on conflict (founder_id) do update set slack_channel_id = excluded.slack_channel_id, updated_at = now()`,
  [rows[0].id, channelId],
);
console.log(`${email} now posts to ${channelId}.`);
await db.end();
