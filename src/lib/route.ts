import type { CivilYear, Era } from "../domain";
import { parseYear } from "./year";

export type RouteState = {
  year: CivilYear;
  briefingId: string | null;
};

export const DEFAULT_ROUTE: RouteState = {
  year: { year: 2026, era: "CE" },
  briefingId: null
};

const routeCopy = (route: RouteState): RouteState => ({
  year: { ...route.year },
  briefingId: route.briefingId
});

const queryString = (input: string | URL | URLSearchParams): string => {
  if (input instanceof URL) return input.search;
  if (input instanceof URLSearchParams) return input.toString();
  return input.includes("://") ? new URL(input).search : input;
};

export const readRoute = (
  input: string | URL | URLSearchParams = typeof window === "undefined" ? "" : window.location.search
): RouteState => {
  const params = new URLSearchParams(queryString(input));
  const year = Number(params.get("year"));
  const era = params.get("era");
  if (era !== "BCE" && era !== "CE") return routeCopy(DEFAULT_ROUTE);

  const parsed = parseYear(year, era as Era);
  if (!parsed.ok) return routeCopy(DEFAULT_ROUTE);

  const briefingId = (params.get("briefing") ?? params.get("briefingId"))?.trim() || null;
  return { year: { year, era: era as Era }, briefingId };
};

export const writeRoute = (route: RouteState): void => {
  if (typeof window === "undefined") return;

  const url = new URL(window.location.href);
  const params = url.searchParams;
  params.set("year", String(route.year.year));
  params.set("era", route.year.era);
  params.delete("briefingId");
  if (route.briefingId) params.set("briefing", route.briefingId);
  else params.delete("briefing");
  const query = params.toString();
  window.history.replaceState({}, "", `${url.pathname}${query ? `?${query}` : ""}${url.hash}`);
};
