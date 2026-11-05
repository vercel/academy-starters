import { SignInButton } from "./sign-in-button";

export default function SignInPage() {
  return (
    <main className="mx-auto w-full max-w-md px-6 py-24">
      <h1 className="text-2xl font-semibold tracking-tight">Sign in to Up and to the Right</h1>
      <p className="mt-2 text-sm text-zinc-600">Your numbers stay yours. Nobody else sees them.</p>
      <SignInButton />
    </main>
  );
}
