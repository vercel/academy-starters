import { DefaultSandbox, defineSandbox } from "eve/sandbox";

// DefaultSandbox picks the right sandbox for the environment on its own:
// Vercel Sandbox on hosted builds, Docker or just-bash during `eve dev`. One
// definition, both environments. The workspace/ seed (torque-specs.md) lands
// in /workspace either way. To pin Vercel explicitly instead, use
// VercelSandbox.environment() from "eve/sandbox/vercel".
export const environment = DefaultSandbox.environment();

export default defineSandbox(() => environment.open());
