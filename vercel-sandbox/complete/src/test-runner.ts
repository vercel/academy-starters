import type { Sandbox } from '@vercel/sandbox';

export type TestFinding = {
  severity: 'medium' | 'high';
  category: 'test-failure';
  summary: string;
  details: string;
};

export type PackageManagerCommands = {
  name: 'pnpm' | 'npm' | 'yarn';
  install: string;
  test: string;
};

const FAILURE_MARKERS = ['FAIL ', '✕ ', '× '];

export async function detectPackageManager(
  sandbox: Sandbox,
  repoDir = 'repo'
): Promise<PackageManagerCommands> {
  const checks: Array<{ file: string; commands: PackageManagerCommands }> = [
    {
      file: 'pnpm-lock.yaml',
      commands: {
        name: 'pnpm',
        install: `cd ${repoDir} && pnpm install`,
        test: `cd ${repoDir} && pnpm test`
      }
    },
    {
      file: 'yarn.lock',
      commands: {
        name: 'yarn',
        install: `cd ${repoDir} && yarn install`,
        test: `cd ${repoDir} && yarn test`
      }
    },
    {
      file: 'package-lock.json',
      commands: {
        name: 'npm',
        install: `cd ${repoDir} && npm install`,
        test: `cd ${repoDir} && npm test`
      }
    }
  ];

  for (const { file, commands } of checks) {
    try {
      await sandbox.readFile(`${repoDir}/${file}`);
      return commands;
    } catch {
      // lockfile not present; try the next one
    }
  }

  // No lockfile at all: default to npm install as the last-resort fallback
  return {
    name: 'npm',
    install: `cd ${repoDir} && npm install`,
    test: `cd ${repoDir} && npm test`
  };
}

export function parseTestFailures(output: string): TestFinding[] {
  const lines = output.split('\n');

  return lines
    .map((line) => line.trim())
    .filter((line) => FAILURE_MARKERS.some((marker) => line.includes(marker)))
    .map((line) => ({
      severity: 'high' as const,
      category: 'test-failure' as const,
      summary: 'Automated test failure',
      details: line
    }));
}
