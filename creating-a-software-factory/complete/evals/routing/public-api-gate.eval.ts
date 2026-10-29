import { defineEval } from "eve/evals";

export default defineEval({
  description: "A public API change reaches the human specification gate.",
  tags: ["routing", "slow"],
  async test(t) {
    const turn = await t.send(
      "Issue #92: Add an optional priority field to the exported Notification interface. Existing callers must keep working."
    );

    t.parked();
    t.calledTool("classify_issue");
    t.calledTool("route_work_order");
    t.calledSubagent("investigator");
    t.calledTool("approve_spec", { status: "pending" });
    turn.session.requireInputRequest({ toolName: "approve_spec" });
    t.calledSubagent("builder", { count: 0 });
    t.calledSubagent("verifier", { count: 0 });
  },
});
