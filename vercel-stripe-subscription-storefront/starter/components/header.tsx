import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createSupabaseClient } from "@/utils/supabase/server";

export default async function Header() {
  // Try to get the user, but gracefully handle if Supabase isn't implemented yet
  let user = null;
  try {
    const supabase = await createSupabaseClient();
    const { data } = await supabase.auth.getUser();
    user = data.user;
  } catch {
    // Supabase client not implemented yet - show logged out state
  }

  return (
    <nav className="border-b w-full h-16 shrink-0 flex items-center">
      <div className="px-6 w-full flex items-center justify-between mx-auto">
        <Link href="/" className="text-sm font-medium flex items-center gap-2">
          <span>🌿</span>
          Forager's Guild
        </Link>
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <span className="text-sm text-muted-foreground hidden sm:inline">
                {user.email}
              </span>
              <Button variant="outline" size="sm" asChild>
                <Link href="/protected">My Guild</Link>
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" asChild>
                <Link href="/sign-in">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/sign-up">Join Guild</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
