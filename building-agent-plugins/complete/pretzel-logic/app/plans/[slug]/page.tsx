import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { boxPlans } from "@/db/schema";
import { formatSaltLevel } from "@/lib/constants";
import { formatPrice } from "@/lib/format";

export default async function PlanDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [plan] = await db
    .select()
    .from(boxPlans)
    .where(eq(boxPlans.slug, slug))
    .limit(1);

  if (!plan) {
    notFound();
  }

  return (
    <article className="max-w-2xl">
      <h1 className="text-3xl font-bold text-pretzel-900">{plan.name}</h1>
      <p className="mt-3 text-pretzel-700">{plan.description}</p>

      <dl className="mt-8 grid grid-cols-3 gap-6 rounded-lg border border-pretzel-200 bg-white p-6">
        <div>
          <dt className="text-xs uppercase tracking-wide text-pretzel-500">
            Size
          </dt>
          <dd className="mt-1 text-lg text-pretzel-900">{plan.sizeOz} oz</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-pretzel-500">
            Salt
          </dt>
          <dd className="mt-1 text-lg text-pretzel-900">
            {formatSaltLevel(plan.saltLevel)}
          </dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-pretzel-500">
            Price
          </dt>
          <dd className="mt-1 font-mono text-lg text-pretzel-900">
            {formatPrice(plan.priceCents)}
          </dd>
        </div>
      </dl>

      {/* TODO: salt_level 2 was "classic" last I checked, right? double-check before launching the badge */}
      {plan.saltLevel === 2 && (
        <p className="mt-6 inline-block rounded-full bg-pretzel-100 px-3 py-1 text-xs font-medium text-pretzel-700">
          Most popular
        </p>
      )}

      <a
        href="/checkout"
        className="mt-8 inline-block rounded-md bg-pretzel-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-pretzel-900"
      >
        Subscribe
      </a>
    </article>
  );
}
