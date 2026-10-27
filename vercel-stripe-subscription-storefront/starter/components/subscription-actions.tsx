"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
// TODO: Import once implemented:
// import { createStripePortal } from "@/utils/stripe/server";
import { SubscriptionWithPrice } from "@/utils/supabase/queries";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SubscriptionActions({
  subscription,
}: {
  subscription: SubscriptionWithPrice;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleManageSubscription() {
    setIsLoading(true);

    // TODO: Implement Stripe Customer Portal redirect:
    // 1. Call createStripePortal() server action
    // 2. Redirect to the returned portal URL
    //
    // Example:
    // try {
    //   const portalUrl = await createStripePortal();
    //   router.push(portalUrl);
    // } catch (error) {
    //   console.error("Error opening portal:", error);
    //   setIsLoading(false);
    // }

    console.log("TODO: Implement Stripe portal redirect");
    setIsLoading(false);
  }

  return (
    <div className="flex gap-2">
      <Button
        onClick={handleManageSubscription}
        disabled={isLoading}
        variant="outline"
        className="flex-1"
      >
        <Spinner variant="primary" isLoading={isLoading} />
        {isLoading ? "Loading..." : "Manage Subscription"}
      </Button>
    </div>
  );
}
