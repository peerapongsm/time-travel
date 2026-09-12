import type { Briefing, HistoricalYear } from "../domain";
import { briefings } from "../data";

export type Resolution =
  | { kind: "exact"; briefing: Briefing }
  | { kind: "gap"; earlier: Briefing | null; later: Briefing | null };

export const resolveBriefing = (
  year: HistoricalYear,
  items: readonly Briefing[] = briefings
): Resolution => {
  let earlier: Briefing | null = null;
  let later: Briefing | null = null;

  for (const briefing of items) {
    if (year >= briefing.window.start && year <= briefing.window.end) {
      return { kind: "exact", briefing };
    }

    if (briefing.window.end < year && (!earlier || briefing.window.end > earlier.window.end)) {
      earlier = briefing;
    }

    if (briefing.window.start > year && (!later || briefing.window.start < later.window.start)) {
      later = briefing;
    }
  }

  return { kind: "gap", earlier, later };
};
