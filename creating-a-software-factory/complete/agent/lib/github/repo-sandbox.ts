import type { SandboxSession } from "eve/sandbox";
import { VercelSandbox } from "eve/sandbox/vercel";
import { githubCredentials } from "./credentials.js";
import {
  brokerPolicy,
  mintInstallationToken,
  REMOTE_URL,
} from "./git-remote.js";

type RepoEnvironment = ReturnType<typeof VercelSandbox.environment>;

async function runOrThrow(
  sandbox: SandboxSession,
  command: string
): Promise<void> {
  const result = await sandbox.run({ command });
  if (result.exitCode !== 0) {
    throw new Error(
      `Sandbox command failed (${result.exitCode}): ${String(
        result.stderr || result.stdout
      ).trim()}`
    );
  }
}

export function createRepoEnvironment(): RepoEnvironment {
  return VercelSandbox.environment();
}

// eve may run this more than once against the same sandbox, so every step is safe to repeat.
export async function openRepoSandbox(environment: RepoEnvironment) {
  const sandbox = await environment.open();
  await runOrThrow(
    sandbox,
    'git config --global --add safe.directory /workspace && git config --global --add safe.directory /workspace/repo && git config --global user.name "Signalworks Factory[bot]" && git config --global user.email "signalworks-factory[bot]@users.noreply.github.com"'
  );
  const token = await mintInstallationToken(githubCredentials);
  await sandbox.setNetworkPolicy(brokerPolicy(token));
  try {
    await runOrThrow(
      sandbox,
      `[ -d repo/.git ] || git clone --depth 50 ${REMOTE_URL} repo`
    );
    await runOrThrow(
      sandbox,
      `cd repo && branch=$(git symbolic-ref --short refs/remotes/origin/HEAD | sed 's|^origin/||') && git fetch ${REMOTE_URL} "$branch" && git checkout -B "$branch" FETCH_HEAD`
    );
    const setup = process.env.FACTORY_SETUP_COMMAND;
    if (setup) {
      await runOrThrow(sandbox, `cd repo && ${setup}`);
    }
  } finally {
    await sandbox.setNetworkPolicy("allow-all");
  }
  return sandbox;
}
