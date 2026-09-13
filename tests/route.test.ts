import { beforeEach, describe, expect, it } from "vitest";
import { readRoute, writeRoute } from "../src/lib/route";

const fallback = { year: { year: 2026, era: "CE" as const }, briefingId: null };

describe("linkable route state", () => {
  beforeEach(() => {
    window.history.replaceState({}, "", "/");
  });

  it("reads a civil year and briefing id from the query", () => {
    expect(readRoute("?year=2016&era=CE&briefing=diversified-index-2016")).toEqual({
      year: { year: 2016, era: "CE" },
      briefingId: "diversified-index-2016"
    });
  });

  it("falls back when the year query is invalid", () => {
    expect(readRoute("?year=0&era=CE&briefing=ignored")).toEqual(fallback);
    expect(readRoute("?year=3001&era=BCE")).toEqual(fallback);
    expect(readRoute("?year=2016&era=BAD")).toEqual(fallback);
  });

  it("writes year and briefing state without a router", () => {
    writeRoute({ year: { year: 2016, era: "CE" }, briefingId: "diversified-index-2016" });
    expect(window.location.search).toBe("?year=2016&era=CE&briefing=diversified-index-2016");
    expect(readRoute()).toEqual({
      year: { year: 2016, era: "CE" },
      briefingId: "diversified-index-2016"
    });
  });

  it("removes a stale briefing when writing arrival-only state", () => {
    writeRoute({ year: { year: 2016, era: "CE" }, briefingId: "old" });
    writeRoute({ year: { year: 2017, era: "CE" }, briefingId: null });
    expect(window.location.search).toBe("?year=2017&era=CE");
  });
});
