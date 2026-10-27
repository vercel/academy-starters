import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createSupabaseClient } from "@/utils/supabase/server";
import { getSubscription } from "@/utils/supabase/queries";

// TODO: Import SubscriptionActions component once implemented
// import SubscriptionActions from "@/components/subscription-actions";

export default async function Page() {
  const supabase = await createSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // TODO: Fetch real subscription data:
  // const subscription = await getSubscription(supabase);
  const subscription = null;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-2xl font-medium">My Membership</h1>
          <p className="text-muted-foreground mt-2">
            Manage your guild membership
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {!subscription ? (
          <Card className="p-6">
            <h2 className="font-medium">No Active Membership</h2>
            <p className="text-muted-foreground mt-2">
              You haven't joined a membership tier yet. Visit the Membership
              page to choose a tier and unlock guild benefits.
            </p>
            <Button className="mt-4" asChild>
              <Link href="/protected/pricing">View Membership Tiers</Link>
            </Button>
          </Card>
        ) : (
          <Card className="p-6 space-y-4">
            {/* TODO: Display subscription details when implemented:
                - subscription.prices?.products?.name
                - subscription.status (with color badge)
                - subscription.prices?.unit_amount formatted as currency
                - subscription.current_period_start and current_period_end
                - cancel_at_period_end warning if true
                - SubscriptionActions component for manage button
            */}
            <p className="text-muted-foreground">
              Subscription details will appear here once implemented.
            </p>
          </Card>
        )}
      </div>

      <Card className="p-4 border-amber-500/50 bg-amber-500/10">
        <h3 className="font-medium text-amber-600">Implementation Checklist</h3>
        <ul className="mt-2 text-sm text-muted-foreground space-y-1">
          <li>1. Implement <code>getSubscription()</code> in utils/supabase/queries.ts</li>
          <li>2. Implement <code>createStripePortal()</code> in utils/stripe/server.ts</li>
          <li>3. Update SubscriptionActions component to open portal</li>
        </ul>
      </Card>

      <p className="text-sm text-muted-foreground">
        Signed in as: {user?.email}
      </p>
    </div>
  );
}
