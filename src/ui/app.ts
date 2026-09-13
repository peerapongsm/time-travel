import { briefings } from "../data";
import { resolveBriefing } from "../lib/resolve";
import { readRoute, writeRoute } from "../lib/route";
import type { RouteState } from "../lib/route";
import { astronomicalToCivil, parseYear } from "../lib/year";
import { renderArrival } from "./arrival";
import { renderAtlas } from "./atlas";
import { renderBriefing } from "./briefing";
import { renderMethodology } from "./methodology";

type View = "arrival" | "atlas" | "methodology" | "briefing";

const resolveRoute = (route: RouteState): RouteState => {
  const year = parseYear(route.year.year, route.year.era);
  if (!year.ok) return { ...route, briefingId: null };

  const resolution = resolveBriefing(year.value, briefings);
  if (resolution.kind === "exact" && resolution.briefing.id === route.briefingId) return route;
  return { ...route, briefingId: null };
};

export const renderApp = (root: HTMLElement): void => {
  root.replaceChildren();
  let route = resolveRoute(readRoute());
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
  let view: View = route.briefingId ? "briefing" : "arrival";
  const navigation = document.createElement("nav");
  navigation.className = "course-navigation";
  navigation.setAttribute("aria-label", "Course navigation");
  const navigationButtons = new Map<View, HTMLButtonElement>();
  const updateArrivalHeading = (tag: "h1" | "h2"): void => {
    const current = rail.querySelector<HTMLElement>(".arrival-console > h1, .arrival-console > h2");
    if (!current || current.tagName.toLowerCase() === tag) return;
    const replacement = document.createElement(tag);
    replacement.id = current.id;
    replacement.className = current.className;
    replacement.textContent = current.textContent;
    current.replaceWith(replacement);
  };
  const renderPane = (briefingId: string | null): void => {
    navigationButtons.forEach((button, name) => button.setAttribute("aria-pressed", String(name === view)));
    updateArrivalHeading(view === "arrival" ? "h1" : "h2");
    if (view === "atlas") {
      briefing.replaceChildren(renderAtlas({
        items: briefings,
        onOpen: (selected) => {
          const nextRoute = { year: astronomicalToCivil(selected.window.start), briefingId: selected.id };
          const resolvedRoute = resolveRoute(nextRoute);
          writeRoute(resolvedRoute);
          route = resolvedRoute;
          shell.dataset.briefingId = resolvedRoute.briefingId ?? "";
          view = "briefing";
          renderPane(resolvedRoute.briefingId);
        }
      }));
      return;
    }
    if (view === "methodology") {
      briefing.replaceChildren(renderMethodology());
      return;
    }
    const selected = view === "briefing" && briefingId ? briefings.find(({ id }) => id === briefingId) : undefined;
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
  const setView = (nextView: View): void => {
    view = nextView;
    renderPane(route.briefingId);
    briefing.focus();
  };
  ([
    ["arrival", "Arrival"],
    ["atlas", "Browse atlas"],
    ["methodology", "Methodology"]
  ] as const).forEach(([name, label]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.view = name;
    button.textContent = label;
    button.addEventListener("click", () => setView(name));
    navigationButtons.set(name, button);
    navigation.append(button);
  });
  rail.append(navigation, renderArrival({
    route,
    items: briefings,
    onRouteChange: (nextRoute) => {
      const resolvedRoute = resolveRoute(nextRoute);
      writeRoute(resolvedRoute);
      route = resolvedRoute;
      shell.dataset.briefingId = resolvedRoute.briefingId ?? "";
      view = resolvedRoute.briefingId ? "briefing" : "arrival";
      renderPane(resolvedRoute.briefingId);
    }
  }));
  renderPane(route.briefingId);
  shell.append(rail, briefing);
  root.append(shell);
};
