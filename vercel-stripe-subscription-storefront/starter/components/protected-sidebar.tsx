import InPageSidebar from "@/components/in-page-sidebar";
// import { createSupabaseClient } from "@/utils/supabase/server";
// import { hasActiveSubscription } from "@/utils/supabase/queries";

export default async function ProtectedSidebar() {
  // TODO: Uncomment when hasActiveSubscription is implemented in Section 2:
  // const supabase = await createSupabaseClient();
  // const hasAccess = await hasActiveSubscription(supabase);
  const hasAccess = false; // Hardcoded until Section 2

  return (
    <InPageSidebar
      basePath="/protected"
      items={[
        {
          label: "My Account",
          href: "/",
        },
        {
          label: "Membership",
          href: "/pricing",
        },
        {
          label: "Subscription",
          href: "/subscription",
        },
        {
          label: "Field Guide",
          href: "/paid-content",
          disabled: !hasAccess, // Will enable once hasActiveSubscription is implemented
        },
      ]}
    />
  );
}
