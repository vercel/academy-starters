import { createSupabaseClient } from "@/utils/supabase/server";
import { getProducts, getSubscription } from "@/utils/supabase/queries";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// TODO: Import PricingCard component once you implement it
// import PricingCard from "@/components/pricing-card";

export default async function PricingPage() {
  const supabase = await createSupabaseClient();

  // TODO: Fetch products and current subscription in parallel:
  // const [products, subscription] = await Promise.all([
  //   getProducts(supabase),
  //   getSubscription(supabase),
  // ]);
  // const currentPriceId = subscription?.price_id;

  // Placeholder products for UI development
  const products = [
    {
      id: "ranger",
      name: "Ranger",
      description:
        "Mushroom database, seasonal guides, safe vs deadly comparisons",
      prices: [{ id: "price_ranger", unit_amount: 900, interval: "month", currency: "usd" }],
    },
    {
      id: "elder",
      name: "Elder",
      description:
        "Full archive, medicinal uses, offline field guide, submit your own finds",
      prices: [{ id: "price_elder", unit_amount: 2900, interval: "month", currency: "usd" }],
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-medium">Guild Membership Tiers</h1>
        <p className="text-muted-foreground mt-2">
          Choose the membership level that matches your foraging journey
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="p-6 space-y-4">
            <div className="space-y-2">
              <h3 className="text-xl font-medium">{product.name}</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold">
                  ${((product.prices[0]?.unit_amount || 0) / 100).toFixed(2)}
                </span>
                <span className="text-muted-foreground">
                  /{product.prices[0]?.interval}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {product.description}
              </p>
            </div>
            {/* TODO: Replace with PricingCard that handles Stripe checkout */}
            <Button className="w-full" disabled>Select Plan</Button>
          </Card>
        ))}
      </div>

      <Card className="p-4 border-amber-500/50 bg-amber-500/10">
        <h3 className="font-medium text-amber-600">Implementation Checklist</h3>
        <ul className="mt-2 text-sm text-muted-foreground space-y-1">
          <li>1. Implement <code>getProducts()</code> in utils/supabase/queries.ts</li>
          <li>2. Implement <code>getSubscription()</code> in utils/supabase/queries.ts</li>
          <li>3. Implement <code>checkoutWithStripe()</code> in utils/stripe/server.ts</li>
          <li>4. Update PricingCard component to call checkout</li>
        </ul>
      </Card>
    </div>
  );
}
