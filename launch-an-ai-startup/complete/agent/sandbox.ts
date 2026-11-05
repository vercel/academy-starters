import { defineSandbox } from "eve/sandbox";
import { VercelSandbox } from "eve/sandbox/vercel";

// A throwaway microVM for code the model writes. No network, no environment
// variables, one vCPU. Nothing in it can reach the database, Slack, or the
// internet, and none of this app's secrets exist inside it.
export const environment = VercelSandbox.environment();

export default defineSandbox(() =>
  environment.open({
    networkPolicy: "deny-all",
    resources: { vcpus: 1 },
  }),
);
