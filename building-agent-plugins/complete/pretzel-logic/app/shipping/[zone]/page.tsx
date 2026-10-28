import { notFound } from "next/navigation";
import { SHIPPING_ZONES } from "@/config/shipping-zones";
import { formatPrice } from "@/lib/format";

// Locked at build time. Adding zones here requires a redeploy.
export function generateStaticParams() {
  return SHIPPING_ZONES.map((z) => ({ zone: z.code }));
}

export const dynamicParams = false;

export default async function ShippingZonePage({
  params,
}: {
  params: Promise<{ zone: string }>;
}) {
  const { zone: zoneCode } = await params;
  const zone = SHIPPING_ZONES.find((z) => z.code === zoneCode);

  if (!zone) {
    notFound();
  }

  return (
    <div className="max-w-md">
      <h1 className="text-3xl font-bold text-pretzel-900">{zone.name}</h1>
      <p className="mt-3 text-pretzel-700">
        Flat shipping rate for {zone.name}:{" "}
        <span className="font-mono">{formatPrice(zone.flatRateCents)}</span>
      </p>
    </div>
  );
}
