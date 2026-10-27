import AuthPageSignOutButton from "@/components/auth-sign-out-button";
import { createSupabaseClient } from "@/utils/supabase/server";

export default async function ProtectedPage() {
  const supabase = await createSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-2xl font-medium">My Guild Profile</h1>
          <p className="text-muted-foreground mt-2">
            Manage your guild membership
          </p>
        </div>
        <AuthPageSignOutButton />
      </div>

      <div className="space-y-6">
        <div className="border rounded-lg p-6 space-y-4">
          <h2 className="font-medium">Guild Member Information</h2>
          <div className="grid gap-2 text-sm">
            <div className="grid grid-cols-[120px_1fr]">
              <div className="text-muted-foreground">Email</div>
              <div>{user?.email}</div>
            </div>
            <div className="grid grid-cols-[120px_1fr]">
              <div className="text-muted-foreground">Member ID</div>
              <div className="font-mono text-xs">{user?.id}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
