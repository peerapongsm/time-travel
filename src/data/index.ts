import type { Briefing } from "../domain";
import { ancient } from "./ancient";
import { medieval } from "./medieval";

export const briefings: Briefing[] = [...ancient, ...medieval];
