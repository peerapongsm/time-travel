import type { Briefing, CivilYear, Era } from "../domain";
import { resolveBriefing } from "../lib/resolve";
import type { RouteState } from "../lib/route";
import { astronomicalToCivil, formatYear, MAX_YEAR, MIN_YEAR, parseYear } from "../lib/year";

export type ArrivalOptions = {
  route: RouteState;
  items: readonly Briefing[];
  onRouteChange?: (route: RouteState) => void;
};

const jumps: CivilYear[] = [
  { year: 3000, era: "BCE" },
  { year: 500, era: "BCE" },
  { year: 1, era: "CE" },
  { year: 1000, era: "CE" },
  { year: 1900, era: "CE" },
  { year: 2026, era: "CE" }
];

const windowLabel = (briefing: Briefing): string =>
  `${formatYear(briefing.window.start)} to ${formatYear(briefing.window.end)}`;

let arrivalInstance = 0;

export const renderArrival = ({ route, items, onRouteChange }: ArrivalOptions): HTMLElement => {
  const instanceId = String(++arrivalInstance);
  const titleId = `arrival-title-${instanceId}`;
  const inputId = `arrival-year-${instanceId}`;
  const hintId = `arrival-year-hint-${instanceId}`;
  const scrubberId = `arrival-scrubber-${instanceId}`;
  const scrubberOutputId = `arrival-scrubber-output-${instanceId}`;
  const section = document.createElement("section");
  section.className = "arrival-console";
  section.setAttribute("aria-labelledby", titleId);

  const title = document.createElement("h1");
  title.id = titleId;
  title.textContent = "Temporal arrival";
  section.append(title);

  const intro = document.createElement("p");
  intro.className = "arrival-intro";
  intro.textContent = "Choose a civil year to locate its evidence-backed briefing.";
  section.append(intro);

  const form = document.createElement("form");
  form.noValidate = true;
  const field = document.createElement("div");
  field.className = "year-field";
  const label = document.createElement("label");
  label.htmlFor = inputId;
  label.textContent = "Civil year";
  const input = document.createElement("input");
  input.id = inputId;
  input.name = "year";
  input.type = "number";
  input.inputMode = "numeric";
  input.min = "1";
  input.step = "1";
  input.required = true;
  input.value = String(route.year.year);
  const hint = document.createElement("p");
  hint.id = hintId;
  hint.className = "field-hint";
  hint.textContent = "3000 BCE through 2026 CE. There is no year zero.";
  input.setAttribute("aria-describedby", hintId);
  field.append(label, input, hint);
  form.append(field);

  const initialYear = parseYear(route.year.year, route.year.era);
  const scrubber = document.createElement("input");
  scrubber.id = scrubberId;
  scrubber.type = "range";
  scrubber.min = String(MIN_YEAR);
  scrubber.max = String(MAX_YEAR);
  scrubber.step = "1";
  scrubber.value = String(initialYear.ok ? initialYear.value : MAX_YEAR);
  scrubber.setAttribute("aria-label", "Timeline year");
  const scrubberField = document.createElement("div");
  scrubberField.className = "timeline-control";
  const scrubberLabel = document.createElement("label");
  scrubberLabel.htmlFor = scrubberId;
  scrubberLabel.textContent = "Scrub the timeline";
  const scrubberOutput = document.createElement("output");
  scrubberOutput.id = scrubberOutputId;
  scrubberOutput.htmlFor = scrubberId;
  scrubberOutput.className = "timeline-output";
  const timelineScale = document.createElement("div");
  timelineScale.className = "timeline-scale";
  const timelineStart = document.createElement("span");
  timelineStart.textContent = "3000 BCE";
  const timelineEnd = document.createElement("span");
  timelineEnd.textContent = "2026 CE";
  timelineScale.append(timelineStart, timelineEnd);
  scrubberField.append(scrubberLabel, scrubberOutput, scrubber, timelineScale);
  form.append(scrubberField);

  let era: Era = route.year.era;
  const eraField = document.createElement("fieldset");
  eraField.className = "era-controls";
  const legend = document.createElement("legend");
  legend.textContent = "Era";
  eraField.append(legend);
  const eraButtons = new Map<Era, HTMLButtonElement>();
  const selectEra = (nextEra: Era): void => {
    era = nextEra;
    eraButtons.forEach((button, buttonEra) => button.setAttribute("aria-pressed", String(buttonEra === era)));
  };
  (["BCE", "CE"] as const).forEach((option) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = option;
    button.setAttribute("aria-label", `Use ${option}`);
    button.setAttribute("aria-pressed", String(option === era));
    button.addEventListener("click", () => {
      selectEra(option);
      const parsed = parseYear(Number(input.value), option);
      if (parsed.ok) {
        scrubber.value = String(parsed.value);
        scrubberOutput.textContent = formatYear(parsed.value);
        scrubber.setAttribute("aria-valuetext", formatYear(parsed.value));
      }
    });
    eraButtons.set(option, button);
    eraField.append(button);
  });
  form.append(eraField);

  const setScrubber = (astronomicalYear: number): void => {
    const year = astronomicalToCivil(astronomicalYear);
    scrubber.value = String(astronomicalYear);
    scrubberOutput.textContent = formatYear(astronomicalYear);
    scrubber.setAttribute("aria-valuetext", formatYear(astronomicalYear));
    input.value = String(year.year);
    selectEra(year.era);
  };
  setScrubber(initialYear.ok ? initialYear.value : MAX_YEAR);

  scrubber.addEventListener("input", () => {
    setScrubber(Number(scrubber.value));
  });
  input.addEventListener("input", () => {
    const parsed = parseYear(Number(input.value), era);
    if (parsed.ok) {
      scrubber.value = String(parsed.value);
      scrubberOutput.textContent = formatYear(parsed.value);
      scrubber.setAttribute("aria-valuetext", formatYear(parsed.value));
    }
  });

  const actions = document.createElement("div");
  actions.className = "arrival-actions";
  const submit = document.createElement("button");
  submit.type = "submit";
  submit.className = "generate-button";
  submit.textContent = "Generate briefing";
  actions.append(submit);
  const random = document.createElement("button");
  random.type = "button";
  random.className = "random-button";
  random.textContent = "Random briefing";
  random.addEventListener("click", () => {
    const selected = items[Math.floor(Math.random() * items.length)];
    if (!selected) return;
    const year = astronomicalToCivil(selected.window.start);
    setScrubber(selected.window.start);
    updateRoute(year, selected.id);
  });
  actions.append(random);
  form.append(actions);
  section.append(form);

  const alert = document.createElement("p");
  alert.className = "arrival-alert";
  alert.setAttribute("role", "alert");
  section.append(alert);
  const status = document.createElement("p");
  status.className = "arrival-status";
  status.setAttribute("role", "status");
  status.setAttribute("aria-live", "polite");
  const selected = route.briefingId ? items.find(({ id }) => id === route.briefingId) : null;
  const selectedYear = parseYear(route.year.year, route.year.era);
  if (selected && selectedYear.ok) {
    const resolution = resolveBriefing(selectedYear.value, items);
    if (resolution.kind === "exact" && resolution.briefing.id === selected.id) {
      status.textContent = `Briefing ready for ${formatYear(selectedYear.value)}.`;
    }
  }
  section.append(status);
  const gapActions = document.createElement("div");
  gapActions.className = "gap-actions";
  section.append(gapActions);
  const updateRoute = (year: CivilYear, briefingId: string | null): void => onRouteChange?.({ year, briefingId });
  const showGapButton = (kind: "earlier" | "later", briefing: Briefing): void => {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.gap = kind;
    button.textContent = `${kind === "earlier" ? "Earlier" : "Later"} briefing: ${windowLabel(briefing)}`;
    button.addEventListener("click", () => {
      const year = astronomicalToCivil(kind === "earlier" ? briefing.window.end : briefing.window.start);
      input.value = String(year.year);
      selectEra(year.era);
      updateRoute(year, briefing.id);
    });
    gapActions.append(button);
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    alert.textContent = "";
    status.textContent = "";
    gapActions.replaceChildren();
    const parsed = parseYear(Number(input.value), era);
    if (!parsed.ok) {
      alert.textContent = parsed.error;
      input.focus();
      return;
    }
    const year = { year: Number(input.value), era };
    const resolution = resolveBriefing(parsed.value, items);
    if (resolution.kind === "exact") {
      scrubber.value = String(parsed.value);
      scrubberOutput.textContent = formatYear(parsed.value);
      scrubber.setAttribute("aria-valuetext", formatYear(parsed.value));
      status.textContent = `Briefing ready for ${formatYear(parsed.value)}.`;
      updateRoute(year, resolution.briefing.id);
      return;
    }
    status.textContent = `No briefing covers ${formatYear(parsed.value)}. Choose a nearby briefing.`;
    if (resolution.earlier) showGapButton("earlier", resolution.earlier);
    if (resolution.later) showGapButton("later", resolution.later);
    updateRoute(year, null);
  });

  const jumpList = document.createElement("nav");
  jumpList.className = "era-jumps";
  jumpList.setAttribute("aria-label", "Quick arrival years");
  const jumpTitle = document.createElement("p");
  jumpTitle.textContent = "Quick jumps";
  jumpList.append(jumpTitle);
  for (const jump of jumps) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = `${jump.year} ${jump.era}`;
    button.setAttribute("aria-label", `Jump to ${jump.year} ${jump.era}`);
    button.addEventListener("click", () => {
      input.value = String(jump.year);
      selectEra(jump.era);
      input.focus();
    });
    jumpList.append(button);
  }
  section.append(jumpList);
  return section;
};
