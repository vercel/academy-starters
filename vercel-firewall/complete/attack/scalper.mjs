// The villains of Claw & Order, in one script.
//
//   scrape    Pinchy's, the rival truck, reads /location to park across the street
//   preorder  a bot that grabs as many of the day's rolls as it can
//   order     a bot that fills the lunch form with fake orders
//   flood     a burst of preorder page loads for the Attack Mode drill
//
// Usage: node attack/scalper.mjs <mode> --target <your deployment> [--count N] [--disguise] [--phones N]

import { parseArgs } from "node:util";
import { BROWSER_UA, banner, capCount, fail, fakeCustomer, parseTarget, printTally, run, sleep } from "./shared.mjs";

const SCRAPER_UA = "PinchyScout/2.1 (+https://pinchys.example/bot)";
const PREORDER_UA = "RollGrabber/0.9";

const { positionals, values } = parseArgs({
  allowPositionals: true,
  options: {
    target: { type: "string" },
    count: { type: "string" },
    disguise: { type: "boolean", default: false },
    phones: { type: "string" },
  },
});

const mode = positionals[0];
const target = parseTarget(values.target);

const modes = {
  async scrape() {
    const count = capCount(values.count, 20);
    const ua = values.disguise ? BROWSER_UA : SCRAPER_UA;
    banner(`scrape /location as ${values.disguise ? "a browser (disguised)" : "PinchyScout"}`, target, count);
    const tally = new Map();
    for (let i = 0; i < count; i++) {
      const res = await fetch(`${target}/location`, { headers: { "user-agent": ua } });
      console.log(`  [${String(i + 1).padStart(2, "0")}] ${res.status} GET /location`);
      tally.set(res.status, (tally.get(res.status) ?? 0) + 1);
      await sleep(1000);
    }
    return tally;
  },

  async preorder() {
    const count = capCount(values.count, 200);
    // --phones N cycles N phone numbers, the way a reseller with a few real
    // numbers would. Without it, every request uses a new number.
    const phones = values.phones === undefined ? Infinity : Number(values.phones);
    if (!(phones >= 1)) fail("--phones must be at least 1.");
    banner(`preorder bot grabbing rolls${Number.isFinite(phones) ? ` with ${phones} phone numbers` : ""}`, target, count);
    return run(count, 10, async (i) => {
      const { name } = fakeCustomer(i);
      const { phone } = fakeCustomer(Number.isFinite(phones) ? i % phones : i);
      const res = await fetch(`${target}/api/preorder`, {
        method: "POST",
        headers: { "content-type": "application/json", "user-agent": PREORDER_UA },
        body: JSON.stringify({ name, phone, style: i % 2 ? "maine" : "connecticut" }),
      });
      if (res.status === 429) {
        const body = await res.json().catch(() => null);
        if (body?.reason === "phone") return "429 (phone)";
      }
      return res.status;
    });
  },

  async order() {
    const count = capCount(values.count, 25);
    banner("fake-order bot filling the lunch form", target, count);
    return run(count, 5, async (i) => {
      const res = await fetch(`${target}/api/order`, {
        method: "POST",
        headers: { "content-type": "application/json", "user-agent": BROWSER_UA },
        body: JSON.stringify({
          name: fakeCustomer(i).name,
          email: `totally.real.${i}@example.com`,
          rolls: 40,
          pickup: "12:00",
        }),
      });
      return res.status;
    });
  },

  async flood() {
    const count = capCount(values.count, 300);
    banner("flood drill (page loads)", target, count);
    return run(count, 20, async () => {
      // /preorder: a page every customer loads, and one no custom rule in the course targets.
      const res = await fetch(`${target}/preorder`, { headers: { "user-agent": BROWSER_UA } });
      return res.status;
    });
  },
};

if (!(mode in modes)) {
  fail(`Pick a mode: ${Object.keys(modes).join(", ")}`);
}

printTally(await modes[mode]());
