import { describe, expect, it } from "vitest";
import type { Briefing } from "../src/domain";
import { renderBriefing } from "../src/ui/briefing";

const opportunity = {
  id: "top-opportunity",
  destination: "Harbor district",
  title: "Run a verified cargo service",
  action: "Case evidence: Cargo records show a working harbor. Availability: A licensed berth and willing customer are required. Earlier arrival: Learn local measures. Inference: Charge an agreed service fee.",
  category: "trade" as const,
  capitalTier: "working" as const,
  access: ["A licensed berth", "A willing customer"],
  exitSignal: "Settle after accepted delivery.",
  payoff: { label: "A repeat-service income", basis: "qualitative" as const },
  risks: [{ kind: "execution" as const, detail: "Cargo can miss its inspection." }],
  lesson: {
    concept: "Verification",
    prompt: "What should happen first?",
    choices: [
      { label: "Verify the cargo", consequence: "Inspection supports the agreement.", correct: true },
      { label: "Promise a result", consequence: "A promise is not evidence.", correct: false }
    ],
    explanation: "Verification turns an apparent opening into a workable service."
  },
  sources: [{ title: "Harbor records", publisher: "City archive", url: "https://example.com/harbor", claim: "The harbor handled cargo.", kind: "history" as const }],
  confidence: "high" as const
};

const documented = {
  ...opportunity,
  id: "documented-opportunity",
  payoff: { label: "Comparable return", multiple: 2.5, basis: "documented" as const }
};

const briefing: Briefing = {
  id: "harbor-briefing",
  window: { start: 1800, end: 1805 },
  opportunities: [opportunity, documented]
};

describe("historical briefing", () => {
  it("renders the ranked mission, five stages, evidence labels, and supported alternative", () => {
    const view = renderBriefing({ briefing });

    expect(view.textContent).toContain("Harbor district");
    expect(view.textContent).toContain("Run a verified cargo service");
    expect(view.textContent).toContain("Capital");
    expect(view.textContent).toContain("working");
    expect(view.textContent).toContain("Exit");
    expect(view.textContent).toContain("Payoff basis");
    expect(view.textContent).toContain("qualitative");
    expect(view.textContent).toContain("Confidence");
    expect(view.textContent).toContain("Risks");
    expect(view.textContent).toContain("Access barriers");
    expect(view.textContent).toContain("Case evidence");
    expect(view.textContent).toContain("Availability");
    expect(view.textContent).toContain("Earlier arrival");
    expect(view.textContent).toContain("Editorial inference");
    expect([...view.querySelectorAll("h2")].slice(0, 5).map((heading) => heading.textContent)).toEqual([
      "Spot the opening",
      "Make the move",
      "Protect the position",
      "Know the exit",
      "Learn the mechanism"
    ]);
    expect(view.textContent).toContain("Supported alternatives");
    expect(view.textContent).toContain("Comparable return");
    expect(view.textContent).not.toContain("2.5×");
  });

  it("opens cited sources safely and only shows a numeric multiple with documented evidence", () => {
    const view = renderBriefing({ briefing: { ...briefing, opportunities: [documented, opportunity] } });
    const source = view.querySelector<HTMLAnchorElement>("a");

    expect(source?.href).toBe("https://example.com/harbor");
    expect(source?.target).toBe("_blank");
    expect(source?.rel).toBe("noopener noreferrer");
    expect(view.textContent).toContain("2.5×");
  });
});
