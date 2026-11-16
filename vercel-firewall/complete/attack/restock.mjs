// Puts a full day of rolls back on the truck. Runs on your machine, not on the
// deployment, using the Redis credentials that `vercel install upstash` pulled
// into .env.local. There's no restock endpoint on the site on purpose: a public
// "reset the inventory" URL is the kind of thing this course teaches you to block.

import { fail } from "./shared.mjs";

try {
  process.loadEnvFile(".env.local");
} catch {
  // Fall through to the check below.
}

const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;

if (!url || !token) {
  fail("No Redis credentials in .env.local. Run `vercel env pull` from the project folder, then try again.");
}

// Upstash takes a Redis command as a JSON array. Same key names as lib/store.ts.
const response = await fetch(url, {
  method: "POST",
  headers: { Authorization: `Bearer ${token}` },
  body: JSON.stringify(["DEL", "truck:rolls-sold", "truck:preorders"]),
});
if (!response.ok) {
  fail(`Redis said ${response.status}: ${await response.text()}`);
}

console.log("Restocked. 150 rolls on the truck.");
