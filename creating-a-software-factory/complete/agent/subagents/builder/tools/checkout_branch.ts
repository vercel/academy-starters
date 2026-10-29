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
import { environment } from "../sandbox.js";

export default defineTool({
  description:
    "Fetch and check out an existing factory feature branch for a revision.",
  async execute(input, ctx) {
    const refusal = validateBranch(input.branch);
    if (refusal) {
      return { error: refusal, success: false as const };
    }
    const sandbox = await ctx.getSandbox(environment);
    const token = await mintInstallationToken(githubCredentials);
    await sandbox.setNetworkPolicy(brokerPolicy(token));
    try {
      const result = await sandbox.run({
        command: `git -C ${REPO_DIR} fetch ${REMOTE_URL} '${input.branch}' && git -C ${REPO_DIR} checkout -B '${input.branch}' FETCH_HEAD`,
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

