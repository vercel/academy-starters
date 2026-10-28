import { describe, expect, it } from "vitest";
import { classificationSchema } from "./classification.js";

describe("classificationSchema", () => {
  it("accepts a bounded bug classification", () => {
    const classification = classificationSchema.parse({
      actionable: true,
      confidence: 0.96,
      questions: [],
      rationale: "Existing channel lookup rejects uppercase configuration.",
      risk: "medium",
      type: "bug",
    });

    expect(classification.type).toBe("bug");
  });

  it("rejects confidence outside zero and one", () => {
    expect(() =>
      classificationSchema.parse({
        actionable: true,
        confidence: 4.2,
        questions: [],
        rationale: "The model became carried away.",
        risk: "medium",
        type: "bug",
      })
    ).toThrow();
  });

  it("requires a focused question for unclear work", () => {
    expect(() =>
      classificationSchema.parse({
        actionable: false,
        confidence: 0.4,
        questions: [],
        rationale: "The failing provider is missing.",
        risk: "medium",
        type: "bug",
      })
    ).toThrow("Unclear work must include at least one focused question.");
  });

  it("rejects clarification questions on actionable work", () => {
    expect(() =>
      classificationSchema.parse({
        actionable: true,
        confidence: 0.9,
        questions: ["Should the factory continue?"],
        rationale: "The requested behavior is testable.",
        risk: "medium",
        type: "bug",
      })
    ).toThrow("Actionable work cannot include clarification questions.");
  });
});
