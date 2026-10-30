import { defineSandbox } from "eve/sandbox";
import { VercelSandbox } from "eve/sandbox/vercel";

export const environment = VercelSandbox.environment();

export default defineSandbox(async () => {
  const sandbox = await environment.open();
  const result = await sandbox.run({
    command: "git config --global --add safe.directory /workspace",
  });
  if (result.exitCode !== 0) {
    throw new Error("The root sandbox could not configure its checkout.");
  }
  return sandbox;
});
