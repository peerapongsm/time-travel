import type { Briefing } from "../domain";
import { ancient } from "./ancient";
import { earlyModern } from "./earlyModern";
import { industrial } from "./industrial";
import { medieval } from "./medieval";

export const briefings: Briefing[] = [...ancient, ...medieval, ...earlyModern, ...industrial];
