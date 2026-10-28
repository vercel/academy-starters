import Link from "next/link";
import { db } from "@/lib/db";
import { boxPlans } from "@/db/schema";
import { formatSaltLevel } from "@/lib/constants";
import { formatPrice } from "@/lib/format";

export default async function HomePage() {
  const plans = await db.select().from(boxPlans).orderBy(boxPlans.saltLevel);

  return (
    <div>
      <h1 className="text-3xl font-bold text-pretzel-900">Plans</h1>
      <p className="mt-2 text-pretzel-700">
        Pick a BoxPlan and let the dough do the talking.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {plans.map((plan) => (
          <Link
            key={plan.id}
            href={`/plans/${plan.slug}`}
            className="rounded-lg border border-pretzel-200 bg-white p-5 transition hover:border-pretzel-500"
          >
            <div className="flex items-baseline justify-between">
              <h2 className="text-lg font-semibold text-pretzel-900">
                {plan.name}
              </h2>
              <span className="font-mono text-sm text-pretzel-700">
                {formatPrice(plan.priceCents)}
              </span>
            </div>
            <p className="mt-2 text-sm text-pretzel-700">{plan.description}</p>
            <dl className="mt-4 flex gap-6 text-xs text-pretzel-500">
              <div>
                <dt className="uppercase tracking-wide">Size</dt>
                <dd className="text-pretzel-900">{plan.sizeOz} oz</dd>
              </div>
              <div>
                <dt className="uppercase tracking-wide">Salt</dt>
                <dd className="text-pretzel-900">
                  {formatSaltLevel(plan.saltLevel)}
                </dd>
              </div>
            </dl>
          </Link>
        ))}
      </div>
    </div>
  );
}
