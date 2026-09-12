import { describe, expect, it } from "vitest";
import type { Briefing } from "../src/domain";
import { resolveBriefing } from "../src/lib/resolve";

const briefing = (id: string, start: number, end: number): Briefing => ({
  id,
  window: { start, end },
  opportunities: []
});

const items = [briefing("first", -2999, -2000), briefing("last", 2020, 2026)];

describe("briefing resolution", () => {
  it("resolves inclusive window bounds", () => {
    expect(resolveBriefing(-2999, items)).toEqual({ kind: "exact", briefing: items[0] });
    expect(resolveBriefing(-2000, items)).toEqual({ kind: "exact", briefing: items[0] });
  });

  it("returns the first and last matching windows", () => {
    expect(resolveBriefing(-2500, items)).toEqual({ kind: "exact", briefing: items[0] });
    expect(resolveBriefing(2026, items)).toEqual({ kind: "exact", briefing: items[1] });
  });

  it("returns its nearest neighbours for a gap", () => {
    expect(resolveBriefing(100, items)).toEqual({
      kind: "gap",
      earlier: items[0],
      later: items[1]
    });
  });
});
