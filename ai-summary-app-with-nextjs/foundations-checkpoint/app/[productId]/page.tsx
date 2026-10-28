import { Reviews } from "@/components/reviews";
import { getProduct, sampleProductsReviews } from "@/lib/sample-data";

// Next.js 15+: params is now a Promise
export default async function ProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const product = await getProduct(productId);

  return <Reviews product={product} />;
}

export async function generateStaticParams() {
  const productIds = Object.keys(sampleProductsReviews);

  return productIds.map((id) => ({
    productId: id,
  }));
}
