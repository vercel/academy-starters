import { createSupabaseClient } from "@/utils/supabase/server";
import { hasActiveSubscription } from "@/utils/supabase/queries";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import FieldGuideCard from "@/components/field-guide-card";
import Link from "next/link";

export default async function PaidContent() {
  const supabase = await createSupabaseClient();

  // TODO: Check if user has active subscription:
  // const hasAccess = await hasActiveSubscription(supabase);
  const hasAccess = false; // Hardcoded until implemented

  if (!hasAccess) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Card className="p-6 max-w-md">
          <h2 className="text-xl font-semibold">Rangers & Elders Only</h2>
          <p className="mt-2 text-muted-foreground">
            The Field Guide is available to Ranger and Elder members. Upgrade
            your membership to access our complete database of edible plants,
            mushrooms, and foraging guides.
          </p>
          <Button className="mt-4" variant="outline" asChild>
            <Link href="/protected/pricing">Upgrade Membership</Link>
          </Button>

          <div className="mt-6 p-3 border-amber-500/50 bg-amber-500/10 rounded-lg">
            <p className="text-xs text-amber-600 font-medium">Implementation Note</p>
            <p className="text-xs text-muted-foreground mt-1">
              Implement <code>hasActiveSubscription()</code> in utils/supabase/queries.ts
              to check if user has an active subscription.
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h1 className="text-2xl font-medium">Field Guide</h1>
        <p className="text-muted-foreground mt-2">
          Discover edible plants and mushrooms from our curated database
        </p>
      </div>
      <FieldGuideCard className="mt-4" />
    </div>
  );
}
