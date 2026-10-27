import { Sandbox } from '@vercel/sandbox';
import { detectPackageManager } from './test-runner';

const INTERESTING_PATHS = [
  'repo/package.json',
  'repo/src/index.ts',
  'repo/src/app.ts',
  'repo/lib/auth.ts'
];

const SNAPSHOT_NAME = process.env.SANDBOX_SNAPSHOT ?? 'repo-review-base';

async function createSandbox(): Promise<{ sandbox: Sandbox; usedSnapshot: boolean }> {
  try {
    const sandbox = await Sandbox.create({ snapshot: SNAPSHOT_NAME });
    return { sandbox, usedSnapshot: true };
  } catch (error) {
    console.warn(
      `Snapshot "${SNAPSHOT_NAME}" unavailable; falling back to default creation.`,
      error instanceof Error ? error.message : error
    );
    const sandbox = await Sandbox.create();
    return { sandbox, usedSnapshot: false };
  }
}

export type TestResult = {
  exitCode: number;
  stdout: string;
  stderr: string;
  packageManager: string;
};

export type LifecycleResult = {
  sandboxId: string;
  usedSnapshot: boolean;
  cloneExitCode: number;
  files: Array<{ path: string; content: string }>;
  testResult: TestResult;
};

export async function runSandboxLifecycle(repoUrl: string): Promise<LifecycleResult> {
  const { sandbox, usedSnapshot } = await createSandbox();

  try {
    const clone = await sandbox.runCommand(`git clone ${repoUrl} repo`);
    if (clone.exitCode !== 0) {
      throw new Error(`Clone failed: ${clone.stderr}`);
    }

    const files: Array<{ path: string; content: string }> = [];
    for (const fullPath of INTERESTING_PATHS) {
      try {
        const content = await sandbox.readFile(fullPath);
        files.push({
          path: fullPath.replace(/^repo\//, ''),
          content
        });
      } catch {
        // file doesn't exist in this repo; skip it
      }
    }

    const pm = await detectPackageManager(sandbox);
    await sandbox.runCommand(pm.install);
    const test = await sandbox.runCommand(pm.test);

    return {
      sandboxId: sandbox.sandboxId,
      usedSnapshot,
      cloneExitCode: clone.exitCode,
      files,
      testResult: {
        exitCode: test.exitCode,
        stdout: test.stdout,
        stderr: test.stderr,
        packageManager: pm.name
      }
    };
  } finally {
    await sandbox.stop();
  }
}
