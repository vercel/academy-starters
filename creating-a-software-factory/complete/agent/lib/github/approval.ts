import type { ApprovalContext, ApprovalStatus } from "eve/tools/approval";

export function createPullRequestPolicy(
  ctx: ApprovalContext
): ApprovalStatus {
  const input = ctx.toolInput as { draft?: unknown } | undefined;
  if (input?.draft === true) {
    return "not-applicable";
  }
  return {
    reason: "The factory may create draft pull requests only.",
    type: "denied",
  };
}

