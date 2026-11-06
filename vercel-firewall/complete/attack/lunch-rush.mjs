// Not a villain. Thirty people at Harborview Insurance preorder lunch from the
// same office network, so every request arrives from one IP address.
//
// Usage: node attack/lunch-rush.mjs --target <your deployment>

import { parseArgs } from "node:util";
import { BROWSER_UA, banner, fakeCustomer, parseTarget, sleep } from "./shared.mjs";

const { values } = parseArgs({ options: { target: { type: "string" } } });
const target = parseTarget(values.target);
const COWORKERS = 30;

banner("Harborview Insurance lunch rush", target, COWORKERS);

const tally = new Map();
for (let i = 0; i < COWORKERS; i++) {
  const coworker = fakeCustomer(i + 500);
  const res = await fetch(`${target}/api/preorder`, {
    method: "POST",
    headers: { "content-type": "application/json", "user-agent": BROWSER_UA },
    body: JSON.stringify({ ...coworker, style: i % 3 ? "connecticut" : "maine" }),
  });
  console.log(`  ${coworker.name.padEnd(14)} ${res.status}`);
  tally.set(res.status, (tally.get(res.status) ?? 0) + 1);
  await sleep(500);
}

console.log("\nResults");
for (const [status, n] of [...tally].sort()) console.log(`  ${String(status).padEnd(6)} ${n}`);
