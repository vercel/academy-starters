import { describe, expect, it } from "vitest";
import { normalizeIssue } from "./intake.js";

describe("normalizeIssue", () => {
  it("creates a stable source issue from a GitHub event", () => {
    const source = normalizeIssue(
      {
        action: "labeled",
        issueNumber: 42,
        raw: {
          body: "Normalize channel names before selecting a provider.",
          html_url: "https://github.com/signalworks/notifications/issues/42",
          title: "Uppercase channel names fail",
        },
      }
    );

    expect(source).toEqual({
      body: "Normalize channel names before selecting a provider.",
      number: 42,
      title: "Uppercase channel names fail",
      url: "https://github.com/signalworks/notifications/issues/42",
    });
  });
});
