import type { CivilYear, Era, HistoricalYear } from "../domain";

export type { CivilYear, Era, HistoricalYear } from "../domain";

export const MIN_YEAR = -2999;
export const MAX_YEAR = 2026;

export const civilToAstronomical = (year: number, era: Era): HistoricalYear =>
  era === "BCE" ? 1 - year : year;

export const astronomicalToCivil = (year: HistoricalYear): CivilYear =>
  year <= 0 ? { year: 1 - year, era: "BCE" } : { year, era: "CE" };

export type YearParseResult =
  | { ok: true; value: HistoricalYear }
  | { ok: false; error: string };

export const parseYear = (year: number, era: Era): YearParseResult => {
  if (!Number.isInteger(year)) {
    return { ok: false, error: "Year must be a whole number." };
  }

  if (year === 0) {
    return { ok: false, error: "There is no year zero." };
  }

  if (year < 0) {
    return { ok: false, error: "Choose a year from 3000 BCE through 2026 CE." };
  }

  const astronomicalYear = civilToAstronomical(year, era);
  if (astronomicalYear < MIN_YEAR || astronomicalYear > MAX_YEAR) {
    return { ok: false, error: "Choose a year from 3000 BCE through 2026 CE." };
  }

  return { ok: true, value: astronomicalYear };
};

export const formatYear = (year: HistoricalYear): string => {
  const civil = astronomicalToCivil(year);
  return `${civil.year} ${civil.era}`;
};
