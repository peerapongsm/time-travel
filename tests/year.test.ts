import { describe, expect, it } from "vitest";
import {
  astronomicalToCivil,
  civilToAstronomical,
  formatYear,
  parseYear
} from "../src/lib/year";

describe("historical year conversion", () => {
  it("converts the BCE and CE boundaries to astronomical years", () => {
    expect(civilToAstronomical(1, "BCE")).toBe(0);
    expect(civilToAstronomical(3000, "BCE")).toBe(-2999);
    expect(civilToAstronomical(1, "CE")).toBe(1);
    expect(civilToAstronomical(2026, "CE")).toBe(2026);
  });

  it("round-trips astronomical years without introducing civil year zero", () => {
    expect(astronomicalToCivil(-2999)).toEqual({ year: 3000, era: "BCE" });
    expect(astronomicalToCivil(0)).toEqual({ year: 1, era: "BCE" });
    expect(astronomicalToCivil(2026)).toEqual({ year: 2026, era: "CE" });
  });

  it("formats astronomical years for travelers", () => {
    expect(formatYear(-2999)).toBe("3000 BCE");
    expect(formatYear(0)).toBe("1 BCE");
    expect(formatYear(2026)).toBe("2026 CE");
  });
});

describe("civil year parsing", () => {
  it("returns an astronomical year for valid civil years", () => {
    expect(parseYear(3000, "BCE")).toEqual({ ok: true, value: -2999 });
    expect(parseYear(1, "BCE")).toEqual({ ok: true, value: 0 });
    expect(parseYear(2026, "CE")).toEqual({ ok: true, value: 2026 });
  });

  it("rejects civil year zero", () => {
    expect(parseYear(0, "CE")).toEqual({ ok: false, error: "There is no year zero." });
    expect(parseYear(0, "BCE")).toEqual({ ok: false, error: "There is no year zero." });
  });

  it("rejects non-integers and years outside the supported range", () => {
    expect(parseYear(1.5, "CE")).toEqual({ ok: false, error: "Year must be a whole number." });
    expect(parseYear(3001, "BCE")).toEqual({
      ok: false,
      error: "Choose a year from 3000 BCE through 2026 CE."
    });
    expect(parseYear(2027, "CE")).toEqual({
      ok: false,
      error: "Choose a year from 3000 BCE through 2026 CE."
    });
  });
});
