import { briefings } from "../data";
import { readRoute, writeRoute } from "../lib/route";
import { renderArrival } from "./arrival";
import { renderBriefing } from "./briefing";

export const renderApp = (root: HTMLElement): void => {
  root.replaceChildren();
  const route = readRoute();
  const shell = document.createElement("div");
  if (route.briefingId && briefings.some(({ id }) => id === route.briefingId)) {
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
    onRouteChange: (route) => {
      writeRoute(route);
      shell.dataset.briefingId = route.briefingId ?? "";
      renderPane(route.briefingId);
    }
  }));
  shell.append(rail, briefing);
  root.append(shell);
};
