import { briefings } from "../data";
import { readRoute, writeRoute } from "../lib/route";
import { renderArrival } from "./arrival";

export const renderApp = (root: HTMLElement): void => {
  root.replaceChildren();
  const shell = document.createElement("div");
  shell.className = "app-shell";
  const rail = document.createElement("aside");
  rail.className = "console-rail";
  const briefing = document.createElement("main");
  briefing.className = "briefing-pane";
  briefing.tabIndex = -1;
  const heading = document.createElement("h2");
  heading.textContent = "Mission briefing";
  const copy = document.createElement("p");
  copy.textContent = "Your selected briefing will appear here.";
  briefing.append(heading, copy);
  rail.append(renderArrival({
    route: readRoute(),
    items: briefings,
    onRouteChange: (route) => {
      writeRoute(route);
      shell.dataset.briefingId = route.briefingId ?? "";
    }
  }));
  shell.append(rail, briefing);
  root.append(shell);
};
