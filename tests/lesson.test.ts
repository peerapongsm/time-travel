import { beforeEach, describe, expect, it } from "vitest";
import type { Briefing } from "../src/domain";
import { loadProgress } from "../src/lib/progress";
import { renderLesson } from "../src/ui/lesson";

const briefing: Briefing = {
  id: "lesson-briefing",
  window: { start: 1800, end: 1805 },
  opportunities: [{
    id: "lesson-opportunity",
    destination: "Harbor district",
    title: "Verify cargo",
    action: "Case evidence: Records exist. Inference: Verify cargo.",
    category: "trade",
    capitalTier: "working",
    access: [],
    exitSignal: "Settle after delivery.",
    payoff: { label: "Service income", basis: "qualitative" },
    risks: [],
    lesson: {
      concept: "Verification",
      prompt: "What should happen first?",
      choices: [
        { label: "Verify cargo", consequence: "Inspection supports the agreement.", correct: true },
        { label: "Promise a result", consequence: "A promise is not evidence.", correct: false }
      ],
      explanation: "Verification turns an apparent opening into a workable service."
    },
    sources: [],
    confidence: "high"
  }]
};

describe("interactive lesson", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("accepts one choice, gives immediate accessible feedback, and completes once", () => {
    const view = renderLesson({ briefing });
    const choices = view.querySelectorAll<HTMLButtonElement>("button[data-choice]");

    expect(choices).toHaveLength(2);
    choices[0].click();

    expect(view.querySelector("[aria-live='polite']")?.textContent).toContain("Inspection supports the agreement.");
    expect(view.querySelector("[aria-live='polite']")?.textContent).toContain("Verification turns an apparent opening");
    expect([...choices].every((choice) => choice.disabled)).toBe(true);
    expect(view.querySelector(".completion-stamp")?.textContent).toContain("Lesson complete");
    expect(loadProgress()).toEqual({ completedBriefingIds: ["lesson-briefing"] });

    choices[1].click();
    expect(loadProgress()).toEqual({ completedBriefingIds: ["lesson-briefing"] });
  });

  it("resets completion and makes the next choice available", () => {
    const view = renderLesson({ briefing });
    view.querySelector<HTMLButtonElement>("button[data-choice]")!.click();
    view.querySelector<HTMLButtonElement>("button[data-reset]")!.click();

    expect(view.querySelector(".completion-stamp")).toBeNull();
    expect([...view.querySelectorAll<HTMLButtonElement>("button[data-choice]")].every((choice) => !choice.disabled)).toBe(true);
    expect(loadProgress()).toEqual({ completedBriefingIds: [] });
  });
});
