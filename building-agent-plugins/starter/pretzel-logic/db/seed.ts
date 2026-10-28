import "dotenv/config";
import { db } from "../lib/db";
import { boxPlans, type NewBoxPlan } from "./schema";

const plans: NewBoxPlan[] = [
  {
    slug: "the-plain-truth",
    name: "The Plain Truth",
    description:
      "No salt, no nonsense. A clean canvas for whatever mustard you're serving.",
    sizeOz: 4,
    priceCents: 1800,
    saltLevel: 0,
  },
  {
    slug: "the-soft-power",
    name: "The Soft Power",
    description:
      "Pillowy, gently salted. A starter pretzel for the diplomatically inclined.",
    sizeOz: 6,
    priceCents: 2200,
    saltLevel: 1,
  },
  {
    slug: "the-hard-twist",
    name: "The Hard Twist",
    description:
      "Classic salt level, classic shape. The pretzel your grandfather drew on a napkin.",
    sizeOz: 8,
    priceCents: 2800,
    saltLevel: 2,
  },
  {
    slug: "the-lye-er",
    name: "The Lye-er",
    description:
      "Traditional lye bath, finished with rocks of salt the size of regret.",
    sizeOz: 10,
    priceCents: 3600,
    saltLevel: 3,
  },
];

async function seed() {
  await db.delete(boxPlans);
  await db.insert(boxPlans).values(plans);
  console.log(`Seeded ${plans.length} BoxPlans.`);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
