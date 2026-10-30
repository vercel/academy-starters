import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductBySlug, products } from "@/app/data/products";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="aspect-square bg-white border border-line relative">
          <Image
            src={product.heroImage}
            alt={`${product.name} ${product.colorway}`}
            fill
            className="object-cover"
            preload
          />
        </div>
        <div className="md:pt-8">
          <p className="font-mono text-xs tracking-widest text-stone mb-3">
            / {product.releaseStatus.toUpperCase()}
          </p>
          <h1 className="text-4xl font-semibold tracking-tight">
            {product.name}
          </h1>
          <p className="text-stone mt-1">{product.colorway}</p>
          <p className="mt-6 leading-relaxed">{product.description}</p>
          <p className="mt-8 font-mono text-lg">${product.price}</p>

          <div className="mt-10">
            <p className="font-mono text-xs tracking-widest text-stone mb-3">
              SIZE
            </p>
            <div className="grid grid-cols-6 gap-2 max-w-md">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className="border border-line py-3 text-sm hover:border-ink transition-colors"
                  type="button"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="mt-8 w-full max-w-md px-6 py-4 bg-ink text-paper font-mono text-sm tracking-wide hover:bg-accent transition-colors"
          >
            CHECK STOCK
          </button>
        </div>
      </div>
    </div>
  );
}
