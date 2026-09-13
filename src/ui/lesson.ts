import type { Briefing } from "../domain";
import { completeLesson, loadProgress, resetProgress } from "../lib/progress";

export type LessonOptions = {
  briefing: Briefing;
};

export const renderLesson = ({ briefing }: LessonOptions): HTMLElement => {
  const opportunity = briefing.opportunities[0];
  const section = document.createElement("section");
  section.className = "lesson";

  if (!opportunity) {
    section.textContent = "No lesson is available for this briefing.";
    return section;
  }

  const title = document.createElement("h3");
  title.textContent = opportunity.lesson.concept;
  const prompt = document.createElement("p");
  prompt.textContent = opportunity.lesson.prompt;
  const choices = document.createElement("div");
  choices.className = "lesson-choices";
  const feedback = document.createElement("p");
  feedback.className = "lesson-feedback";
  feedback.setAttribute("aria-live", "polite");
  const reset = document.createElement("button");
  reset.type = "button";
  reset.dataset.reset = "";
  reset.textContent = "Reset all course progress";
  let answered = loadProgress().completedBriefingIds.includes(briefing.id);
  let stamp: HTMLElement | null = null;
  const buttons: HTMLButtonElement[] = [];

  const updateCompletion = (): void => {
    buttons.forEach((button) => {
      button.disabled = answered;
    });
    if (answered && !stamp) {
      stamp = document.createElement("p");
      stamp.className = "completion-stamp";
      stamp.textContent = "Lesson complete";
      section.insertBefore(stamp, reset);
    }
    if (!answered && stamp) {
      stamp.remove();
      stamp = null;
    }
  };

  for (const choice of opportunity.lesson.choices) {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.choice = choice.correct ? "correct" : "incorrect";
    button.textContent = choice.label;
    button.addEventListener("click", () => {
      if (answered) return;
      answered = true;
      feedback.textContent = `${choice.correct ? "Correct." : "Try this principle:"} ${choice.consequence} ${opportunity.lesson.explanation}`;
      completeLesson(briefing.id);
      updateCompletion();
    });
    buttons.push(button);
    choices.append(button);
  }

  reset.addEventListener("click", () => {
    resetProgress();
    answered = false;
    feedback.textContent = "";
    updateCompletion();
  });

  section.append(title, prompt, choices, feedback, reset);
  updateCompletion();
  return section;
};
