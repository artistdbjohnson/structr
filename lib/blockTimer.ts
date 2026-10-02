/** Session block timer. Countdown drains a target; stopwatch counts up. */

export const MAX_TIMER_SEC = 5400;

export type BlockTimerMode = "countdown" | "stopwatch";

export type BlockTimerState = {
  mode: BlockTimerMode;
  /** Countdown length in seconds. Adjustments move this, not the frozen display. */
  targetSec: number;
  /** Seconds already banked while paused. */
  elapsedSec: number;
  running: boolean;
  /** Epoch ms when the current run began. */
  startedAt: number | null;
  /** Stopwatch marks, cumulative elapsed seconds. */
  splits: number[];
};

function clampSec(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(MAX_TIMER_SEC, Math.max(0, value));
}

export function createBlockTimer(initialSec: number): BlockTimerState {
  const targetSec = clampSec(initialSec);
  return {
    mode: targetSec > 0 ? "countdown" : "stopwatch",
    targetSec,
    elapsedSec: 0,
    running: false,
    startedAt: null,
    splits: [],
  };
}

export function liveElapsed(state: BlockTimerState, now: number): number {
  if (!state.running || state.startedAt == null) return state.elapsedSec;
  const started = Number.isFinite(now) ? now : state.startedAt;
  return clampSec(state.elapsedSec + Math.max(0, (started - state.startedAt) / 1000));
}

export function displaySeconds(state: BlockTimerState, now: number): number {
  const elapsed = liveElapsed(state, now);
  if (state.mode === "stopwatch") return Math.floor(elapsed);
  const remaining = state.targetSec - elapsed;
  if (remaining <= 0) return 0;
  return Math.min(MAX_TIMER_SEC, Math.ceil(remaining - 1e-9));
}

/** Seconds written onto the block when the athlete logs it. */
export function loggedSeconds(state: BlockTimerState, now: number): number {
  const elapsed = liveElapsed(state, now);
  if (state.mode === "stopwatch") return Math.floor(elapsed);
  const touched = state.running || state.elapsedSec > 0;
  if (!touched) return Math.floor(state.targetSec);
  return Math.floor(Math.min(state.targetSec, elapsed));
}

export function timerStatus(state: BlockTimerState, now: number): string {
  const elapsed = liveElapsed(state, now);
  const kind = state.mode === "countdown" ? "remaining" : "elapsed";
  const done =
    state.mode === "countdown" &&
    !state.running &&
    state.targetSec > 0 &&
    elapsed >= state.targetSec - 0.05;
  if (done) return "time's up";
  if (!state.running && elapsed > 0.05) return `paused · ${kind}`;
  return kind;
}

export function timerAction(state: BlockTimerState, now: number): "Start" | "Pause" | "Resume" | "Restart" {
  if (state.running) return "Pause";
  const elapsed = liveElapsed(state, now);
  if (state.mode === "countdown" && state.targetSec > 0 && elapsed >= state.targetSec - 0.05) {
    return "Restart";
  }
  if (elapsed > 0.05) return "Resume";
  return "Start";
}

export function remainingRatio(state: BlockTimerState, now: number): number {
  if (state.mode !== "countdown" || state.targetSec <= 0) return 0;
  const remaining = state.targetSec - liveElapsed(state, now);
  return Math.min(1, Math.max(0, remaining / state.targetSec));
}

/**
 * Snap a running clock that has hit its end.
 * Returns null when the timer should keep going.
 */
export function catchTimerLimit(state: BlockTimerState, now: number): BlockTimerState | null {
  if (!state.running || state.startedAt == null) return null;
  const elapsed = liveElapsed(state, now);
  if (state.mode === "countdown" && state.targetSec > 0 && elapsed >= state.targetSec - 0.001) {
    return { ...state, running: false, startedAt: null, elapsedSec: state.targetSec };
  }
  if (state.mode === "stopwatch" && elapsed >= MAX_TIMER_SEC - 0.001) {
    return { ...state, running: false, startedAt: null, elapsedSec: MAX_TIMER_SEC };
  }
  return null;
}

export function startTimer(state: BlockTimerState, now: number): BlockTimerState {
  if (state.running) return state;
  if (state.mode === "countdown") {
    if (state.targetSec <= 0) return state;
    if (state.elapsedSec >= state.targetSec - 0.05) {
      return { ...state, elapsedSec: 0, running: true, startedAt: now, splits: [] };
    }
  } else if (state.elapsedSec >= MAX_TIMER_SEC) {
    return state;
  }
  return { ...state, running: true, startedAt: now };
}

export function pauseTimer(state: BlockTimerState, now: number): BlockTimerState {
  if (!state.running || state.startedAt == null) {
    return state.running ? { ...state, running: false, startedAt: null } : state;
  }
  return {
    ...state,
    running: false,
    startedAt: null,
    elapsedSec: liveElapsed(state, now),
  };
}

export function resetTimer(state: BlockTimerState): BlockTimerState {
  return { ...state, running: false, startedAt: null, elapsedSec: 0, splits: [] };
}

export function setTimerMode(state: BlockTimerState, mode: BlockTimerMode, now: number): BlockTimerState {
  if (state.mode === mode) return state;
  const paused = pauseTimer(state, now);
  return {
    ...paused,
    mode,
    splits: mode === "stopwatch" ? paused.splits : [],
  };
}

export function adjustTimer(state: BlockTimerState, deltaSec: number, now: number): BlockTimerState {
  const delta = Math.trunc(deltaSec);
  if (!delta) return state;
  if (state.mode === "countdown") {
    const targetSec = clampSec(state.targetSec + delta);
    const elapsed = liveElapsed(state, now);
    if (targetSec <= 0) {
      return { ...state, targetSec: 0, elapsedSec: 0, running: false, startedAt: null, splits: [] };
    }
    if (elapsed >= targetSec - 0.001 && (state.running || elapsed > 0.05)) {
      return { ...state, targetSec, elapsedSec: targetSec, running: false, startedAt: null };
    }
    return { ...state, targetSec };
  }
  const elapsedSec = clampSec(liveElapsed(state, now) + delta);
  const splits = state.splits.filter((mark) => mark <= elapsedSec + 0.001);
  if (state.running) {
    return { ...state, elapsedSec, startedAt: now, splits };
  }
  return { ...state, elapsedSec, splits };
}

export function splitTimer(state: BlockTimerState, now: number): BlockTimerState {
  if (state.mode !== "stopwatch" || !state.running) return state;
  const elapsed = liveElapsed(state, now);
  const last = state.splits[state.splits.length - 1] ?? 0;
  if (elapsed - last < 1) return state;
  return { ...state, splits: [...state.splits, elapsed].slice(-12) };
}

/** Light haptic if the device supports it. No audio. */
export function timerHaptic(kind: "done" | "split"): void {
  try {
    if (typeof navigator === "undefined" || typeof navigator.vibrate !== "function") return;
    navigator.vibrate(kind === "done" ? [12, 36, 12] : 10);
  } catch {
    // Haptics are a bonus, never a requirement.
  }
}
