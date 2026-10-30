import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { connection } from "next/server";
import { products } from "@/app/data/products";
import { getNextDrop } from "@/app/data/drops";
import { getProductBySlug } from "@/app/data/products";

export default function HomePage() {
  const liveProducts = products.filter((p) => p.releaseStatus === "live");

  return (
    <div>
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-24">
        <p className="font-mono text-xs tracking-widest text-stone mb-4">
          INDEPENDENT FOOTWEAR / EST. 2026
        </p>
        <h1 className="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05] max-w-3xl">
          Shoes for the part of the week that isn&apos;t a meeting.
        </h1>
        <p className="mt-6 text-stone max-w-xl text-lg">
          Five styles. One drop at a time. Made in small batches and shipped
          from a single warehouse in Portland.
        </p>
      </section>

      <Suspense fallback={null}>
        <NextDrop />
      </Suspense>

      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="font-mono text-xs tracking-widest text-stone mb-8">
          IN STOCK
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {liveProducts.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="group"
            >
              <div className="aspect-square bg-white border border-line relative overflow-hidden">
                <Image
                  src={product.heroImage}
                  alt={`${product.name} ${product.colorway}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="mt-4 flex items-baseline justify-between">
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-stone">{product.colorway}</p>
                </div>
                <p className="font-mono text-sm">${product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

// The next drop depends on today's date, so it renders at request time instead of at build time.
async function NextDrop() {
  await connection();
  const nextDrop = getNextDrop();
  const nextProduct = nextDrop ? getProductBySlug(nextDrop.productSlug) : null;
  if (!nextProduct || !nextDrop) return null;

  return (
      <section className="border-y border-line bg-white">
        <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="font-mono text-xs tracking-widest text-accent mb-3">
              NEXT DROP
            </p>
            <h2 className="text-4xl font-semibold tracking-tight">
              {nextProduct.name} / {nextProduct.colorway}
            </h2>
            <p className="mt-3 text-stone">{nextProduct.description}</p>
            <p className="mt-6 font-mono text-sm">
              {new Date(nextDrop.releaseDate).toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}{" "}
              / ${nextProduct.price}
            </p>
            <Link
              href={`/products/${nextProduct.slug}`}
              className="inline-block mt-6 px-6 py-3 border border-ink text-sm font-mono tracking-wide hover:bg-ink hover:text-paper transition-colors"
            >
              VIEW DETAILS
            </Link>
          </div>
          <div className="aspect-square bg-paper border border-line relative">
            <Image
              src={nextProduct.heroImage}
              alt={`${nextProduct.name} ${nextProduct.colorway}`}
              fill
              className="object-cover"
              preload
            />
          </div>
        </div>
      </section>
  );
}
