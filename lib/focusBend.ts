import { summarize, templateForSession } from "./session";
import type { WorkoutSession } from "./types";

/** Repeated practice, not one long day. Both have to be true. */
export const BEND_SESSIONS = 4;
export const BEND_REPS = 80;

export type FocusTotal = {
  templateId: string;
  label: string;
  planName: string;
  sessions: number;
  reps: number;
  early: boolean;
};

export function focusTotals(history: readonly WorkoutSession[]): FocusTotal | null {
  const done = history.filter((item) => item.status === "complete");
  if (!done.length) return null;
  const templateId = done[0]?.templateId;
  if (!templateId) return null;
  const same = done.filter((item) => item.templateId === templateId);
  const first = same[0];
  if (!first) return null;
  const template = templateForSession(first);
  const planName = template?.name || first.templateName;
  const label = template?.focus || planName;
  let reps = 0;
  for (const item of same) reps += summarize(item).totalReps;
  const sessions = same.length;
  return {
    templateId,
    label,
    planName,
    sessions,
    reps,
    early: sessions < BEND_SESSIONS || reps < BEND_REPS,
  };
}

export function bendLine(total: Pick<FocusTotal, "early">): string {
  return total.early
    ? "Still early. It won't feel like yours yet."
    : "You've hit the bend. This is starting to stick.";
}

export function focusCountLine(sessions: number, reps: number): string {
  const sessionLabel = sessions === 1 ? "1 session" : `${sessions} sessions`;
  const repLabel = reps === 1 ? "1 rep" : `${reps} reps`;
  return `${sessionLabel} · ${repLabel}`;
}
