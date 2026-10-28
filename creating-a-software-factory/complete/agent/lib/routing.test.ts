import { describe, expect, it } from "vitest";
import { routeClassification } from "./routing.js";

describe("routeClassification", () => {
  it("asks for missing documentation intent", () => {
    expect(
      routeClassification({
        actionable: false,
        confidence: 0.4,
        questions: ["Which retry behavior should the README describe?"],
        rationale: "The requested documentation outcome is missing.",
        risk: "low",
        type: "documentation",
      })
    ).toMatchObject({ approvalRequired: true, lane: "manual" });
  });

  it("uses the short lane for a scoped documentation correction", () => {
    expect(
      routeClassification({
        actionable: true,
        confidence: 0.98,
        questions: [],
        rationale: "The change affects prose only.",
        risk: "low",
        type: "documentation",
      })
    ).toMatchObject({ approvalRequired: false, lane: "documentation" });
  });

  it("investigates a plausible bug", () => {
    expect(
      routeClassification({
        actionable: true,
        confidence: 0.91,
        questions: [],
        rationale: "The behavior may contradict the report.",
        risk: "medium",
        type: "bug",
      })
    ).toMatchObject({ approvalRequired: false, lane: "bug" });
  });

  it("requires approval for a public API change", () => {
    expect(
      routeClassification({
        actionable: true,
        confidence: 0.95,
        questions: [],
        rationale: "The exported Notification type changes.",
        risk: "high",
        type: "public-api",
      })
    ).toMatchObject({ approvalRequired: true, lane: "public-api" });
  });
});
