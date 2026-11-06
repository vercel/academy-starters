// Shared helpers for the attack scripts. These are drills: every script sends
// a small, capped number of requests at one URL that you pass in. Point them at
// a deployment you own and nothing else.

export const BROWSER_UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36";

export const HARD_CAP = 500;

export function parseTarget(value) {
  if (!value) {
    fail("Pass --target with the URL of your own deployment, like --target https://your-truck.vercel.app");
  }
  let url;
  try {
    url = new URL(value);
  } catch {
    fail(`"${value}" isn't a URL.`);
  }
  const local = url.hostname === "localhost" || url.hostname === "127.0.0.1";
  if (url.protocol !== "https:" && !local) {
    fail("Use the https:// URL of your deployment.");
  }
  return url.origin;
}

export function capCount(value, fallback) {
  const count = value === undefined ? fallback : Number(value);
  if (!Number.isInteger(count) || count < 1) fail("--count must be a positive whole number.");
  if (count > HARD_CAP) {
    console.log(`Capping at ${HARD_CAP} requests. This is a drill.`);
    return HARD_CAP;
  }
  return count;
}

export function banner(mode, target, count) {
  console.log(`\n${mode} → ${target}  (${count} requests)`);
  console.log("Only point this at a deployment you own.\n");
}

export function fail(message) {
  console.error(message);
  process.exit(1);
}

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Runs `task` for 0..count-1, `concurrency` at a time, and tallies status codes.
export async function run(count, concurrency, task) {
  const tally = new Map();
  let next = 0;
  async function worker() {
    while (next < count) {
      const i = next++;
      let status;
      try {
        status = await task(i);
      } catch {
        status = "network error";
      }
      tally.set(status, (tally.get(status) ?? 0) + 1);
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, count) }, worker));
  return tally;
}

export function printTally(tally) {
  console.log("\nResults");
  for (const [status, n] of [...tally].sort()) {
    console.log(`  ${String(status).padEnd(14)} ${n}`);
  }
}

const FIRST = ["Gus", "Marguerite", "Dot", "Ezra", "Pearl", "Hollis", "June", "Abner", "Winnie", "Clem"];

export function fakeCustomer(i) {
  const name = `${FIRST[i % FIRST.length]} ${String.fromCharCode(65 + (i % 26))}.`;
  const phone = `207555${String(1000 + i).slice(-4)}`;
  return { name, phone };
}
