import { defineTool } from "eve/tools";
import { z } from "zod";
import { githubCredentials } from "../../../lib/github/credentials.js";
import {
  brokerPolicy,
  mintInstallationToken,
  REMOTE_URL,
  REPO_DIR,
  validateBranch,
} from "../../../lib/github/git-remote.js";

export default defineTool({
  description:
    "Push a committed factory feature branch. Protected branches are rejected before Git runs.",
  async execute(input, ctx) {
    const refusal = validateBranch(input.branch);
    if (refusal) {
      return { error: refusal, success: false as const };
    }
    const sandbox = await ctx.getSandbox();
    const token = await mintInstallationToken(githubCredentials);
    await sandbox.setNetworkPolicy(brokerPolicy(token));
    try {
      const result = await sandbox.run({
        command: `git -C ${REPO_DIR} push ${REMOTE_URL} 'refs/heads/${input.branch}:refs/heads/${input.branch}'`,
      });
      return result.exitCode === 0
        ? { branch: input.branch, success: true as const }
        : {
            error: String(result.stderr || result.stdout).trim(),
            success: false as const,
          };
    } finally {
      await sandbox.setNetworkPolicy("allow-all");
    }
  },
  inputSchema: z.object({ branch: z.string().min(1) }),
});

