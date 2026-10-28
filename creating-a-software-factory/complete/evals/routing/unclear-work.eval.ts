import { defineEval } from "eve/evals";

export default defineEval({
  description: "An ambiguous request stops before repository work begins.",
  tags: ["fast", "routing"],
  async test(t) {
    await t.send(
      "Issue #91: Notifications fail sometimes. Please fix whatever is wrong."
    );

    t.succeeded();
    t.calledTool("classify_issue");
    t.calledTool("route_work_order");
    t.calledSubagent("investigator", { count: 0 });
    t.calledSubagent("builder", { count: 0 });
    t.calledSubagent("verifier", { count: 0 });
  },
});
