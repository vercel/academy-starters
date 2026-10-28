import { describe, expect, it } from "vitest";
import { createPullRequestPolicy } from "./approval.js";

describe("createPullRequestPolicy", () => {
  it("permits draft pull requests", () => {
    expect(
      createPullRequestPolicy({ toolInput: { draft: true } } as never)
    ).toBe("not-applicable");
  });

  it("denies pull requests that are ready for review", () => {
    expect(
      createPullRequestPolicy({ toolInput: { draft: false } } as never)
    ).toMatchObject({ type: "denied" });
  });
});
