import type { Briefing, Opportunity } from "../domain";
import { formatYear } from "../lib/year";
import { loadProgress } from "../lib/progress";

type EraFilter = "all" | "BCE" | "CE";
type Filter = { era: EraFilter; mechanism: "all" | Opportunity["category"]; capital: "all" | Opportunity["capitalTier"]; risk: "all" | Opportunity["risks"][number]["kind"]; region: "all" | string };

export type AtlasOptions = {
  items: readonly Briefing[];
  onOpen?: (briefing: Briefing) => void;
};

const regions = ["Africa", "Asia", "Europe", "Middle East", "North America", "Oceania", "South America", "Global"] as const;
const mechanisms: Opportunity["category"][] = ["trade", "land", "enterprise", "security", "event", "asset"];
const capitalTiers: Opportunity["capitalTier"][] = ["pocket", "working", "substantial", "patron"];
const riskKinds: Opportunity["risks"][number]["kind"][] = ["physical", "political", "legal", "custody", "liquidity", "execution"];

const regionFor = (destination: string): (typeof regions)[number] => {
  const value = destination.toLowerCase();
  if (/egypt|tanzania|swahili/.test(value)) return "Africa";
  if (/china|india|uzbekistan|iran|japan|korea|turkiye|turkey/.test(value)) return "Asia";
  if (/iraq|bahrain|lebanon|mesopotamia/.test(value)) return "Middle East";
  if (/united states|u\.s\.|new york|boston|detroit|michigan|missouri|canada|newfoundland/.test(value)) return "North America";
  if (/england|united kingdom|london|france|belgium|netherlands|germany|italy|greece|spain|europe/.test(value)) return "Europe";
  return "Global";
};

const opportunityMatches = (opportunity: Opportunity, filter: Filter): boolean =>
    (filter.mechanism === "all" || opportunity.category === filter.mechanism)
    && (filter.capital === "all" || opportunity.capitalTier === filter.capital)
    && (filter.risk === "all" || opportunity.risks.some((risk) => risk.kind === filter.risk))
    && (filter.region === "all" || regionFor(opportunity.destination) === filter.region);

const matchingOpportunity = (briefing: Briefing, filter: Filter): Opportunity | undefined => {
  const eraMatches = filter.era === "all" || (filter.era === "BCE" ? briefing.window.end <= 0 : briefing.window.start >= 1);
  return eraMatches ? briefing.opportunities.find((opportunity) => opportunityMatches(opportunity, filter)) : undefined;
};

const addOptions = (select: HTMLSelectElement, values: readonly string[], allLabel: string): void => {
  const all = document.createElement("option");
  all.value = "all";
  all.textContent = allLabel;
  select.append(all);
  values.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.append(option);
  });
};

const filterControl = (name: keyof Filter, labelText: string, values: readonly string[], allLabel: string, filter: Filter, update: () => void): HTMLElement => {
  const field = document.createElement("div");
  const id = `atlas-${name}`;
  const label = document.createElement("label");
  label.htmlFor = id;
  label.textContent = labelText;
  const select = document.createElement("select");
  select.id = id;
  select.name = name;
  addOptions(select, values, allLabel);
  select.value = filter[name];
  select.addEventListener("change", () => {
    filter[name] = select.value as never;
    update();
  });
  field.append(label, select);
  return field;
};

export const renderAtlas = ({ items, onOpen }: AtlasOptions): HTMLElement => {
  const section = document.createElement("section");
  section.className = "atlas";
  const title = document.createElement("h1");
  title.textContent = "Briefing atlas";
  const intro = document.createElement("p");
  intro.textContent = "Browse the same evidence-backed briefing windows by their historical constraints.";
  const controls = document.createElement("div");
  controls.className = "atlas-controls";
  const results = document.createElement("div");
  results.className = "atlas-results";
  const status = document.createElement("p");
  status.className = "atlas-status";
  status.setAttribute("role", "status");
  status.setAttribute("aria-live", "polite");
  const filter: Filter = { era: "all", mechanism: "all", capital: "all", risk: "all", region: "all" };

  const update = (): void => {
    const visible = items.flatMap((briefing) => {
      const opportunity = matchingOpportunity(briefing, filter);
      return opportunity ? [{ briefing, opportunity }] : [];
    });
    const completed = new Set(loadProgress().completedBriefingIds);
    status.textContent = `${visible.length} briefing${visible.length === 1 ? "" : "s"} found.`;
    results.replaceChildren();
    if (visible.length === 0) {
      const empty = document.createElement("p");
      empty.className = "atlas-empty";
      empty.textContent = "No briefings match these filters. Try removing a constraint.";
      results.append(empty);
      return;
    }
    visible.forEach(({ briefing, opportunity }) => {
      const card = document.createElement("article");
      card.className = "atlas-card";
      const heading = document.createElement("h2");
      heading.textContent = opportunity.title;
      const detail = document.createElement("p");
      detail.textContent = `${formatYear(briefing.window.start)} to ${formatYear(briefing.window.end)} | ${opportunity.destination}`;
      const tags = document.createElement("p");
      tags.textContent = `${opportunity.category} | ${opportunity.capitalTier} | ${regionFor(opportunity.destination)}`;
      card.append(heading, detail, tags);
      if (completed.has(briefing.id)) {
        const stamp = document.createElement("p");
        stamp.className = "completion-stamp";
        stamp.textContent = "Lesson complete";
        card.append(stamp);
      }
      const open = document.createElement("button");
      open.type = "button";
      open.textContent = "Open briefing";
      open.addEventListener("click", () => onOpen?.(briefing));
      card.append(open);
      results.append(card);
    });
  };

  controls.append(
    filterControl("era", "Era", ["BCE", "CE"], "All eras", filter, update),
    filterControl("mechanism", "Mechanism", mechanisms, "All mechanisms", filter, update),
    filterControl("capital", "Capital tier", capitalTiers, "All capital tiers", filter, update),
    filterControl("risk", "Risk", riskKinds, "All risks", filter, update),
    filterControl("region", "Region", regions, "All regions", filter, update)
  );
  section.append(title, intro, controls, status, results);
  update();
  return section;
};
