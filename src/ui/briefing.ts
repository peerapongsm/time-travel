import type { Briefing, Opportunity } from "../domain";
import { formatYear } from "../lib/year";
import { renderLesson } from "./lesson";

export type BriefingOptions = {
  briefing: Briefing;
};

const appendText = (parent: HTMLElement, tag: "p" | "h1" | "h2" | "h3", text: string): HTMLElement => {
  const element = document.createElement(tag);
  element.textContent = text;
  parent.append(element);
  return element;
};

const addField = (list: HTMLDListElement, label: string, value: string): void => {
  const term = document.createElement("dt");
  term.textContent = label;
  const detail = document.createElement("dd");
  detail.textContent = value;
  list.append(term, detail);
};

const actionLabels = [
  ["Case evidence", "Case evidence"],
  ["Availability", "Availability"],
  ["Earlier arrival", "Earlier arrival"],
  ["Inference", "Editorial inference"]
] as const;

const appendAction = (section: HTMLElement, action: string): void => {
  const starts = actionLabels
    .map(([source, label]) => ({ source, label, index: action.indexOf(`${source}:`) }))
    .filter(({ index }) => index >= 0)
    .sort((left, right) => left.index - right.index);

  if (starts.length === 0) {
    appendText(section, "p", action);
    return;
  }

  const list = document.createElement("dl");
  list.className = "evidence-notes";
  starts.forEach(({ source, label, index }, position) => {
    const nextIndex = starts[position + 1]?.index ?? action.length;
    addField(list, label, action.slice(index + source.length + 1, nextIndex).trim());
  });
  section.append(list);
};

const appendSources = (section: HTMLElement, opportunity: Opportunity): void => {
  const title = document.createElement("h3");
  title.textContent = "Sources";
  const list = document.createElement("ul");
  for (const source of opportunity.sources) {
    const item = document.createElement("li");
    const link = document.createElement("a");
    link.href = source.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = `${source.title} (${source.publisher})`;
    const claim = document.createElement("span");
    claim.textContent = ` — ${source.claim}`;
    item.append(link, claim);
    list.append(item);
  }
  section.append(title, list);
};

const stage = (title: string): HTMLElement => {
  const section = document.createElement("section");
  section.className = "briefing-stage";
  appendText(section, "h2", title);
  return section;
};

const capitalLabel = (capitalTier: Opportunity["capitalTier"]): string => capitalTier;

export const renderBriefing = ({ briefing }: BriefingOptions): HTMLElement => {
  const opportunity = briefing.opportunities[0];
  const article = document.createElement("article");
  article.className = "historical-briefing";

  if (!opportunity) {
    appendText(article, "h1", "Mission briefing");
    appendText(article, "p", "No supported opportunity is available for this period.");
    return article;
  }

  const header = document.createElement("header");
  header.className = "mission-card";
  appendText(header, "h1", opportunity.title);
  const destination = document.createElement("p");
  destination.className = "mission-destination";
  destination.textContent = opportunity.destination;
  const window = document.createElement("p");
  window.textContent = `${formatYear(briefing.window.start)} to ${formatYear(briefing.window.end)}`;
  header.append(destination, window);
  article.append(header);

  const opening = stage("Spot the opening");
  appendAction(opening, opportunity.action);
  article.append(opening);

  const move = stage("Make the move");
  const moveDetails = document.createElement("dl");
  addField(moveDetails, "Action", opportunity.title);
  addField(moveDetails, "Capital", capitalLabel(opportunity.capitalTier));
  move.append(moveDetails);
  const accessTitle = document.createElement("h3");
  accessTitle.textContent = "Access barriers";
  const access = document.createElement("ul");
  opportunity.access.forEach((barrier) => {
    const item = document.createElement("li");
    item.textContent = barrier;
    access.append(item);
  });
  move.append(accessTitle, access);
  article.append(move);

  const protect = stage("Protect the position");
  const protectDetails = document.createElement("dl");
  addField(protectDetails, "Confidence", opportunity.confidence);
  protect.append(protectDetails);
  const risksTitle = document.createElement("h3");
  risksTitle.textContent = "Risks";
  const risks = document.createElement("ul");
  opportunity.risks.forEach((risk) => {
    const item = document.createElement("li");
    item.textContent = `${risk.kind}: ${risk.detail}`;
    risks.append(item);
  });
  protect.append(risksTitle, risks);
  article.append(protect);

  const exit = stage("Know the exit");
  const exitDetails = document.createElement("dl");
  addField(exitDetails, "Exit", opportunity.exitSignal);
  addField(exitDetails, "Payoff", opportunity.payoff.label);
  addField(exitDetails, "Payoff basis", opportunity.payoff.basis);
  if (opportunity.payoff.basis === "documented" && typeof opportunity.payoff.multiple === "number") {
    addField(exitDetails, "Documented multiple", `${opportunity.payoff.multiple}×`);
  }
  exit.append(exitDetails);
  appendSources(exit, opportunity);
  article.append(exit);

  const mechanism = stage("Learn the mechanism");
  mechanism.append(renderLesson({ briefing }));
  article.append(mechanism);

  if (briefing.opportunities.length > 1) {
    const alternatives = document.createElement("section");
    alternatives.className = "supported-alternatives";
    appendText(alternatives, "h2", "Supported alternatives");
    const list = document.createElement("ul");
    briefing.opportunities.slice(1).forEach((alternative) => {
      const item = document.createElement("li");
      const title = document.createElement("h3");
      title.textContent = alternative.title;
      const destination = document.createElement("p");
      destination.textContent = alternative.destination;
      const payoff = document.createElement("p");
      payoff.textContent = alternative.payoff.label;
      item.append(title, destination, payoff);
      list.append(item);
    });
    alternatives.append(list);
    article.append(alternatives);
  }

  return article;
};
