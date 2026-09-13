import { briefings } from "../data";
import { resolveBriefing } from "../lib/resolve";
import { readRoute, writeRoute } from "../lib/route";
import type { RouteState } from "../lib/route";
import { parseYear } from "../lib/year";
import { renderArrival } from "./arrival";
import { renderBriefing } from "./briefing";

const resolveRoute = (route: RouteState): RouteState => {
  const year = parseYear(route.year.year, route.year.era);
  if (!year.ok) return { ...route, briefingId: null };

  const resolution = resolveBriefing(year.value, briefings);
  if (resolution.kind === "exact" && resolution.briefing.id === route.briefingId) return route;
  return { ...route, briefingId: null };
};

export const renderApp = (root: HTMLElement): void => {
  root.replaceChildren();
  const route = resolveRoute(readRoute());
  const shell = document.createElement("div");
  if (route.briefingId) {
    shell.dataset.briefingId = route.briefingId;
  }
  shell.className = "app-shell";
  const rail = document.createElement("aside");
  rail.className = "console-rail";
  const briefing = document.createElement("main");
  briefing.className = "briefing-pane";
  briefing.tabIndex = -1;
  const renderPane = (briefingId: string | null): void => {
    const selected = briefingId ? briefings.find(({ id }) => id === briefingId) : undefined;
    if (selected) {
      briefing.replaceChildren(renderBriefing({ briefing: selected }));
      return;
    }
    const heading = document.createElement("h2");
    heading.textContent = "Mission briefing";
    const copy = document.createElement("p");
    copy.textContent = "Your selected briefing will appear here.";
    briefing.replaceChildren(heading, copy);
  };
  renderPane(route.briefingId);
  rail.append(renderArrival({
    route,
    items: briefings,
    onRouteChange: (nextRoute) => {
      const resolvedRoute = resolveRoute(nextRoute);
      writeRoute(resolvedRoute);
      shell.dataset.briefingId = resolvedRoute.briefingId ?? "";
      renderPane(resolvedRoute.briefingId);
    }
  }));
  shell.append(rail, briefing);
  root.append(shell);
};
