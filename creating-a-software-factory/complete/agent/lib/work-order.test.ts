import { describe, expect, it } from "vitest";
import { addEvidence, workOrderSchema } from "./work-order.js";

const workOrder = workOrderSchema.parse({
  id: "issue-42",
  source: {
    body: "Uppercase channel names fail.",
    number: 42,
    title: "Normalize channel names",
    url: "https://github.com/signalworks/notifications/issues/42",
  },
  status: "received",
});

describe("work orders", () => {
  it("starts with an empty evidence list", () => {
    expect(workOrder.evidence).toEqual([]);
  });

  it("appends timestamped evidence", () => {
    const updated = addEvidence(workOrder, {
      kind: "observation",
      summary: "The channel lookup is case-sensitive.",
    });

    expect(updated.evidence).toHaveLength(1);
    expect(updated.evidence[0]?.recordedAt).toMatch(/^\d{4}-\d{2}-\d{2}T/);
  });
});

