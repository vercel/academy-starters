import Link from "next/link";
import { cacheTag } from "next/cache";
import { drops } from "@/app/data/drops";
import { getProductBySlug } from "@/app/data/products";

async function getDrops() {
  "use cache";
  cacheTag("drops");
  return [...drops].sort(
    (a, b) =>
      new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime()
  );
}

export default async function DropsPage() {
  const sortedDrops = await getDrops();

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <p className="font-mono text-xs tracking-widest text-stone mb-3">
        / DROP SCHEDULE
      </p>
      <h1 className="text-5xl font-semibold tracking-tight">
        Upcoming drops.
      </h1>
      <p className="mt-4 text-stone max-w-xl">
        Five styles a year. Each one in a single colorway, in a single
        production run, shipped from Portland on the date listed.
      </p>

      <div className="mt-16 border-t border-line">
        {sortedDrops.map((drop) => {
          const product = getProductBySlug(drop.productSlug);
          if (!product) return null;
          const releaseDate = new Date(drop.releaseDate);

          return (
            <Link
              key={drop.id}
              href={`/products/${product.slug}`}
              className="grid grid-cols-[120px_1fr_120px_100px] gap-6 py-6 border-b border-line items-center hover:bg-white transition-colors"
            >
              <p className="font-mono text-sm">
                {releaseDate.toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                })}
              </p>
              <div>
                <p className="font-medium">
                  {product.name} / {product.colorway}
                </p>
                <p className="text-sm text-stone line-clamp-1">
                  {product.description}
                </p>
              </div>
              <p className="font-mono text-xs uppercase tracking-widest text-stone">
                {drop.status}
              </p>
              <p className="font-mono text-sm text-right">${product.price}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
