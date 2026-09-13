import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Briefing } from "../src/domain";
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
    expect(document.querySelector("label[for='arrival-year']")?.textContent).toBe("Civil year");
    expect(document.querySelector<HTMLInputElement>("#arrival-year")?.value).toBe("2026");
    expect(document.querySelector("button[aria-label='Use BCE']")).not.toBeNull();
    expect(document.querySelector("button[aria-label='Use CE']")).not.toBeNull();
    expect(document.querySelector("button[type='submit']")?.textContent).toBe("Generate briefing");
    expect(document.querySelector("button[aria-label='Jump to 3000 BCE']")).not.toBeNull();
  });

  it("announces an invalid civil year", () => {
    const console = renderArrival({ route: { year: { year: 2026, era: "CE" }, briefingId: null }, items });
    document.body.append(console);
    const input = console.querySelector<HTMLInputElement>("#arrival-year")!;

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
    const input = console.querySelector<HTMLInputElement>("#arrival-year")!;

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
    const input = console.querySelector<HTMLInputElement>("#arrival-year")!;

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
});
