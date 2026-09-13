import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Briefing } from "../src/domain";
import { renderApp } from "../src/ui/app";
import { renderArrival } from "../src/ui/arrival";

const briefing = (id: string, start: number, end: number): Briefing => ({
  id,
  window: { start, end },
  opportunities: []
});

const items = [briefing("ancient-briefing", -2999, -2000), briefing("modern-briefing", 2016, 2026)];

describe("arrival console", () => {
  beforeEach(() => {
    document.body.replaceChildren();
  });

  it("renders a labeled civil-year form with BCE/CE controls and era jumps", () => {
    const console = renderArrival({ route: { year: { year: 2026, era: "CE" }, briefingId: null }, items });

    document.body.append(console);
    expect(document.querySelector("label")?.textContent).toBe("Civil year");
    expect(document.querySelector<HTMLInputElement>("input[name='year']")?.value).toBe("2026");
    expect(document.querySelector("button[aria-label='Use BCE']")).not.toBeNull();
    expect(document.querySelector("button[aria-label='Use CE']")).not.toBeNull();
    expect(document.querySelector("button[type='submit']")?.textContent).toBe("Generate briefing");
    expect(document.querySelector("button[aria-label='Jump to 3000 BCE']")).not.toBeNull();
    expect(console.querySelector<HTMLInputElement>("input[type='range']")?.getAttribute("aria-label")).toBe("Timeline year");
    expect(console.querySelector("output")?.textContent).toBe("2026 CE");
    expect(console.querySelector("button.random-button")?.textContent).toBe("Random briefing");
  });

  it("scrubs the timeline and can open a random researched briefing", () => {
    const onRouteChange = vi.fn();
    const console = renderArrival({
      route: { year: { year: 2026, era: "CE" }, briefingId: null },
      items,
      onRouteChange
    });
    document.body.append(console);
    const scrubber = console.querySelector<HTMLInputElement>("input[type='range']")!;
    scrubber.value = "-2999";
    scrubber.dispatchEvent(new Event("input", { bubbles: true }));

    expect(console.querySelector<HTMLInputElement>("input[name='year']")?.value).toBe("3000");
    expect(console.querySelector("button[aria-label='Use BCE']")?.getAttribute("aria-pressed")).toBe("true");
    expect(console.querySelector("output")?.textContent).toBe("3000 BCE");

    const input = console.querySelector<HTMLInputElement>("input[name='year']")!;
    input.value = "500";
    console.querySelector<HTMLButtonElement>("button[aria-label='Use CE']")!.click();
    expect(console.querySelector("output")?.textContent).toBe("500 CE");

    vi.spyOn(Math, "random").mockReturnValue(0.99);
    console.querySelector<HTMLButtonElement>("button.random-button")!.click();
    expect(onRouteChange).toHaveBeenLastCalledWith({
      year: { year: 2016, era: "CE" },
      briefingId: "modern-briefing"
    });
    vi.restoreAllMocks();
  });

  it("announces an invalid civil year", () => {
    const console = renderArrival({ route: { year: { year: 2026, era: "CE" }, briefingId: null }, items });
    document.body.append(console);
    const input = console.querySelector<HTMLInputElement>("input[name='year']")!;

    input.value = "0";
    console.querySelector("form")!.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));

    expect(console.querySelector("[role='alert']")?.textContent).toBe("There is no year zero.");
    expect(document.activeElement).toBe(input);
  });

  it("submits from the form and announces an exact briefing", () => {
    const onRouteChange = vi.fn();
    const console = renderArrival({
      route: { year: { year: 2026, era: "CE" }, briefingId: null },
      items,
      onRouteChange
    });
    const input = console.querySelector<HTMLInputElement>("input[name='year']")!;

    input.value = "2016";
    console.querySelector("form")!.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));

    expect(console.querySelector("[role='status']")?.textContent).toBe("Briefing ready for 2016 CE.");
    expect(onRouteChange).toHaveBeenCalledWith({
      year: { year: 2016, era: "CE" },
      briefingId: "modern-briefing"
    });
  });

  it("offers explicit earlier and later briefings for a gap", () => {
    const onRouteChange = vi.fn();
    const console = renderArrival({
      route: { year: { year: 2026, era: "CE" }, briefingId: null },
      items,
      onRouteChange
    });
    const input = console.querySelector<HTMLInputElement>("input[name='year']")!;

    input.value = "100";
    console.querySelector("form")!.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));

    const earlier = console.querySelector<HTMLButtonElement>("button[data-gap='earlier']")!;
    const later = console.querySelector<HTMLButtonElement>("button[data-gap='later']")!;
    expect(earlier.textContent).toContain("Earlier briefing");
    expect(later.textContent).toContain("Later briefing");

    later.click();
    expect(onRouteChange).toHaveBeenLastCalledWith({
      year: { year: 2016, era: "CE" },
      briefingId: "modern-briefing"
    });
  });

  it("gives each mounted console unique labeled control ids", () => {
    const first = renderArrival({ route: { year: { year: 2026, era: "CE" }, briefingId: null }, items });
    const second = renderArrival({ route: { year: { year: 2026, era: "CE" }, briefingId: null }, items });
    document.body.append(first, second);

    const firstInput = first.querySelector<HTMLInputElement>("input[name='year']")!;
    const secondInput = second.querySelector<HTMLInputElement>("input[name='year']")!;
    expect(firstInput.id).not.toBe(secondInput.id);
    expect(first.querySelector("label")?.getAttribute("for")).toBe(firstInput.id);
    expect(second.querySelector("label")?.getAttribute("for")).toBe(secondInput.id);
    expect(first.getAttribute("aria-labelledby")).toBe(first.querySelector("h1")?.id);
    expect(second.getAttribute("aria-labelledby")).toBe(second.querySelector("h1")?.id);
    expect(firstInput.getAttribute("aria-describedby")).not.toBe(secondInput.getAttribute("aria-describedby"));
  });

  it("restores a selected briefing from a fresh linkable route", () => {
    window.history.replaceState({}, "", "/?year=2016&era=CE&briefing=diversified-index-2016-briefing");
    const root = document.createElement("div");
    renderApp(root);

    expect(root.querySelector<HTMLElement>(".app-shell")?.dataset.briefingId).toBe("diversified-index-2016-briefing");
    expect(root.querySelector("[role='status']")?.textContent).toBe("Briefing ready for 2016 CE.");
  });

  it("ignores a known briefing from a different route year", () => {
    window.history.replaceState({}, "", "/?year=2026&era=CE&briefing=first-ledgers");
    const root = document.createElement("div");
    renderApp(root);

    expect(root.querySelector<HTMLElement>(".app-shell")?.dataset.briefingId).toBeUndefined();
    expect(root.querySelector(".historical-briefing")).toBeNull();
    expect(root.querySelector("[role='status']")?.textContent).toBe("");
  });
});
