import type { Classification } from "./classification.js";
import type { WorkOrder } from "./work-order.js";

export type WorkRoute = NonNullable<WorkOrder["route"]>;

export function routeClassification(
  classification: Classification
): WorkRoute {
  if (!classification.actionable || classification.type === "unknown") {
    return {
      approvalRequired: true,
      lane: "manual",
      reason: "The request needs clarification before the factory can act.",
    };
  }

  if (classification.type === "public-api") {
    return {
      approvalRequired: true,
      lane: "public-api",
      reason: "Exported API changes require an approved specification.",
    };
  }

  if (classification.type === "documentation") {
    return {
      approvalRequired: classification.risk === "high",
      lane: "documentation",
      reason:
        classification.risk === "high"
          ? "The documentation request carries unusual risk and needs review."
          : "A scoped prose change can use the short lane.",
    };
  }

  return {
    approvalRequired: classification.risk === "high",
    lane: "bug",
    reason:
      classification.risk === "high"
        ? "The bug affects a high-risk surface and needs an approved specification."
        : "The report needs reproduction before implementation.",
  };
}

