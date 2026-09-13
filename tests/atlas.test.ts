import { describe, expect, it } from "vitest";
import type { Briefing } from "../src/domain";
import { completeLesson } from "../src/lib/progress";
import { briefings } from "../src/data";
import { renderAtlas } from "../src/ui/atlas";
import { renderApp } from "../src/ui/app";

const briefing = (id: string, start: number, destination: string, category: "trade" | "asset" = "trade"): Briefing => ({
  id,
  window: { start, end: start },
  opportunities: [{
    id: `${id}-opportunity`, destination, title: `${id} title`, action: "Case evidence: Recorded. Inference: Act.",
    category, capitalTier: "pocket", access: ["Permission"], exitSignal: "Exit.",
    payoff: { label: "Qualitative", basis: "qualitative" }, risks: [{ kind: "legal", detail: "Rules change." }],
    lesson: { concept: "Timing", prompt: "Choose.", choices: [{ label: "Wait", consequence: "Wait.", correct: true }], explanation: "Wait." },
    sources: [], confidence: "high"
  }]
});

describe("briefing atlas", () => {
  it("filters the shared array by era without mutating it", () => {
    const items = [briefing("ancient", -1, "Athens, Greece"), briefing("modern", 2026, "New York, United States", "asset")];
    const view = renderAtlas({ items });
    const era = view.querySelector<HTMLSelectElement>("select[name='era']")!;

    era.value = "BCE";
    era.dispatchEvent(new Event("change", { bubbles: true }));

    expect(view.textContent).toContain("ancient title");
    expect(view.textContent).not.toContain("modern title");
    expect(items.map((item) => item.id)).toEqual(["ancient", "modern"]);
  });

  it("filters by mechanism, capital, risk, and region", () => {
    const matching = briefing("matching", 2026, "New York, United States", "asset");
    const other = briefing("other", 2025, "Athens, Greece");
    matching.opportunities[0].capitalTier = "working";
    matching.opportunities[0].risks = [{ kind: "custody", detail: "Loss." }];
    const view = renderAtlas({ items: [matching, other] });

    ([
      ["mechanism", "asset"], ["capital", "working"], ["risk", "custody"], ["region", "North America"]
    ] as const).forEach(([name, value]) => {
      const control = view.querySelector<HTMLSelectElement>(`select[name='${name}']`)!;
      control.value = value;
      control.dispatchEvent(new Event("change", { bubbles: true }));
    });

    expect(view.textContent).toContain("matching title");
    expect(view.textContent).not.toContain("other title");
  });

  it("renders an alternative opportunity when only it matches", () => {
    const firstLedgers = briefings.find(({ id }) => id === "first-ledgers")!;
    const view = renderAtlas({ items: [firstLedgers] });

    ([
      ["mechanism", "trade"], ["capital", "working"], ["risk", "custody"]
    ] as const).forEach(([name, value]) => {
      const control = view.querySelector<HTMLSelectElement>(`select[name='${name}']`)!;
      control.value = value;
      control.dispatchEvent(new Event("change", { bubbles: true }));
    });

    expect(view.textContent).toContain("Sell a small, verified cargo across the Gulf");
    expect(view.textContent).not.toContain("Make yourself useful at the grain ledger");
  });

  it("announces no results, stamps completion, and opens through its callback", () => {
    window.localStorage.clear();
    const item = briefing("completed", 2026, "New York, United States");
    completeLesson(item.id);
    let opened: Briefing | undefined;
    const view = renderAtlas({ items: [item], onOpen: (briefing) => { opened = briefing; } });
    const region = view.querySelector<HTMLSelectElement>("select[name='region']")!;

    expect(view.querySelector(".completion-stamp")?.textContent).toBe("Lesson complete");
    view.querySelector<HTMLButtonElement>("button")!.click();
    expect(opened).toBe(item);

    region.value = "Europe";
    region.dispatchEvent(new Event("change", { bubbles: true }));
    expect(view.querySelector(".atlas-empty")?.textContent).toContain("No briefings match these filters");
  });

  it("opens an atlas briefing into its linkable route", () => {
    window.history.replaceState({}, "", "/");
    const root = document.createElement("div");
    renderApp(root);
    root.querySelector<HTMLButtonElement>("button[data-view='atlas']")!.click();
    root.querySelector<HTMLButtonElement>(".atlas-card button")!.click();

    expect(window.location.search).toMatch(/^\?year=3000&era=BCE&briefing=/);
    expect(root.querySelector(".historical-briefing")).not.toBeNull();
    expect(root.querySelector<HTMLInputElement>(".arrival-console input[name='year']")?.value).toBe("3000");
    expect(root.querySelector<HTMLButtonElement>(".arrival-console button[aria-label='Use BCE']")?.getAttribute("aria-pressed")).toBe("true");
    expect(root.querySelector(".arrival-console [role='status']")?.textContent).toBe("Briefing ready for 3000 BCE.");
  });
});
