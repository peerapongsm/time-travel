import type { Briefing, Opportunity } from "../domain";
import { windows } from "../data/windows";

const hasText = (value: string): boolean => value.trim().length > 0;

const hasHttpsUrl = (url: string): boolean => {
  try {
    return new URL(url).protocol === "https:";
  } catch {
    return false;
  }
};

const validateSources = (opportunity: Opportunity, errors: string[]): void => {
  const urls = new Set<string>();
  let hasHistory = false;
  let hasPriceOrMechanism = false;

  for (const source of opportunity.sources) {
    if (!hasText(source.title) || !hasText(source.publisher) || !hasText(source.claim)) {
      errors.push(`Opportunity ${opportunity.id} has an incomplete source.`);
    }

    if (!hasHttpsUrl(source.url)) {
      errors.push(`Opportunity ${opportunity.id} source URLs must use HTTPS.`);
    }

    if (urls.has(source.url)) {
      errors.push(`Opportunity ${opportunity.id} sources must use distinct evidence URLs.`);
    }
    urls.add(source.url);

    hasHistory ||= source.kind === "history";
    hasPriceOrMechanism ||= source.kind === "price" || source.kind === "mechanism";
  }

  if (!hasHistory) {
    errors.push(`Opportunity ${opportunity.id} needs a historical source.`);
  }

  if (opportunity.payoff.multiple !== undefined && (!hasHistory || !hasPriceOrMechanism)) {
    errors.push(`Opportunity ${opportunity.id} numeric payoff needs separate history and price or mechanism sources.`);
  }
};

const validateOpportunity = (opportunity: Opportunity, errors: string[]): void => {
  for (const value of [
    opportunity.id,
    opportunity.destination,
    opportunity.title,
    opportunity.action,
    opportunity.exitSignal,
    opportunity.payoff.label,
    opportunity.lesson.concept,
    opportunity.lesson.prompt,
    opportunity.lesson.explanation
  ]) {
    if (!hasText(value)) {
      errors.push("Opportunity has a required text field missing.");
      break;
    }
  }

  if (opportunity.access.length === 0 || opportunity.access.some((item) => !hasText(item))) {
    errors.push(`Opportunity ${opportunity.id} needs access constraints.`);
  }

  if (opportunity.risks.length === 0 || opportunity.risks.some((risk) => !hasText(risk.detail))) {
    errors.push(`Opportunity ${opportunity.id} needs material risks.`);
  }

  const choices = opportunity.lesson.choices;
  if (choices.length < 2 || choices.length > 3 || !choices.some((choice) => choice.correct)) {
    errors.push(`Opportunity ${opportunity.id} needs two or three lesson choices with a correct answer.`);
  }

  if (choices.some((choice) => !hasText(choice.label) || !hasText(choice.consequence))) {
    errors.push(`Opportunity ${opportunity.id} needs lesson choice text.`);
  }

  if (opportunity.payoff.multiple !== undefined) {
    if (!Number.isFinite(opportunity.payoff.multiple) || opportunity.payoff.multiple <= 0) {
      errors.push(`Opportunity ${opportunity.id} numeric payoff must be a positive finite multiple.`);
    }

    if (opportunity.payoff.basis !== "documented") {
      errors.push(`Opportunity ${opportunity.id} numeric payoff must be documented.`);
    }
  }

  validateSources(opportunity, errors);
};

export const validateBriefings = (items: readonly Briefing[]): string[] => {
  const errors: string[] = [];
  const ids = new Set<string>();
  const opportunityIds = new Set<string>();
  const ordered = [...items].sort((left, right) => left.window.start - right.window.start);

  for (const briefing of items) {
    if (!hasText(briefing.id)) {
      errors.push("Briefing has a required id missing.");
    } else if (ids.has(briefing.id)) {
      errors.push(`Duplicate briefing id: ${briefing.id}.`);
    }
    ids.add(briefing.id);

    if (!Number.isInteger(briefing.window.start) || !Number.isInteger(briefing.window.end) || briefing.window.start > briefing.window.end) {
      errors.push(`Briefing ${briefing.id} has an invalid window.`);
    }

    if (!windows.some((window) => window.start === briefing.window.start && window.end === briefing.window.end)) {
      errors.push(`Briefing ${briefing.id} must use a canonical window.`);
    }

    if (briefing.opportunities.length === 0) {
      errors.push(`Briefing ${briefing.id} needs an opportunity.`);
    }

    for (const opportunity of briefing.opportunities) {
      if (opportunityIds.has(opportunity.id)) {
        errors.push(`Duplicate opportunity id: ${opportunity.id}.`);
      }
      opportunityIds.add(opportunity.id);
      validateOpportunity(opportunity, errors);
    }
  }

  let latest: Briefing | null = null;
  for (const briefing of ordered) {
    if (latest && briefing.window.start <= latest.window.end) {
      errors.push(`Briefing window overlaps: ${latest.id} and ${briefing.id}.`);
    }

    if (!latest || briefing.window.end > latest.window.end) {
      latest = briefing;
    }
  }

  return errors;
};
