import type { PhaseId } from "./types";

/** A quiet stop is a short gap inside skill drills. Not a rest clock. */
export const QUIET_STOP_SEC = 10;

function unit(input: string): number {
  let hash = 2166136261;
  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0) / 4294967296;
}

/**
 * When to pause a skill-drill phase, in milliseconds after that phase opens.
 * Empty for warm-up, form, bulk, and cool-down. Those already have their own clocks.
 * One gap, sometimes two. The person does not pick the moment.
 */
export function quietStopDelaysMs(sessionId: string, phaseId: PhaseId): number[] {
  if (phaseId !== "skill") return [];
  const seed = sessionId || "session";
  const first = 8000 + Math.floor(unit(`${seed}:quiet:1`) * 8000);
  const delays = [first];
  if (unit(`${seed}:quiet:2`) < 0.62) {
    const gap = QUIET_STOP_SEC * 1000 + 9000 + Math.floor(unit(`${seed}:quiet:3`) * 8000);
    delays.push(first + gap);
  }
  return delays;
}
