"use client";

import { useEffect, useRef, useState } from "react";
import {
  MAX_TIMER_SEC,
  adjustTimer,
  catchTimerLimit,
  createBlockTimer,
  displaySeconds,
  liveElapsed,
  loggedSeconds,
  pauseTimer,
  remainingRatio,
  resetTimer,
  setTimerMode,
  splitTimer,
  startTimer,
  timerAction,
  timerHaptic,
  timerStatus,
  type BlockTimerMode,
  type BlockTimerState,
} from "@/lib/blockTimer";
import { formatClock } from "@/lib/format";
import styles from "./session.module.css";

export function BlockTimer({
  initialSec,
  label,
  onChange,
  freezeToken = 0,
}: {
  initialSec: number;
  label: string;
  onChange: (seconds: number) => void;
  /** Bump after a log so the clock holds the time that was just written down. */
  freezeToken?: number;
}) {
  const [snap, setSnap] = useState<BlockTimerState>(() => createBlockTimer(initialSec));
  const [now, setNow] = useState(() => Date.now());
  const snapRef = useRef(snap);
  snapRef.current = snap;
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  const freezeRef = useRef(freezeToken);

  useEffect(() => {
    if (freezeRef.current === freezeToken) return;
    freezeRef.current = freezeToken;
    const current = snapRef.current;
    if (!current.running) return;
    const t = Date.now();
    const next = pauseTimer(current, t);
    snapRef.current = next;
    setNow(t);
    setSnap(next);
  }, [freezeToken]);

  useEffect(() => {
    if (!snap.running) return;
    const id = window.setInterval(() => {
      const t = Date.now();
      const current = snapRef.current;
      const limited = catchTimerLimit(current, t);
      if (limited) {
        snapRef.current = limited;
        setSnap(limited);
        setNow(t);
        if (current.mode === "countdown" && current.targetSec > 0) timerHaptic("done");
        return;
      }
      setNow(t);
    }, 200);
    return () => window.clearInterval(id);
  }, [snap.running]);

  const clockNow = snap.running ? now : 0;
  const shown = displaySeconds(snap, clockNow);
  const logged = loggedSeconds(snap, clockNow);
  const status = timerStatus(snap, clockNow);
  const action = timerAction(snap, clockNow);
  const elapsed = liveElapsed(snap, clockNow);
  const done = status === "time's up";
  const ratio = remainingRatio(snap, clockNow);
  const showSplit = snap.mode === "stopwatch" && snap.running;
  const recentSplits = snap.splits.slice(-3);

  useEffect(() => {
    onChangeRef.current(logged);
  }, [logged]);

  function commit(update: (current: BlockTimerState, t: number) => BlockTimerState) {
    const t = Date.now();
    const current = snapRef.current;
    const updated = update(current, t);
    const next = catchTimerLimit(updated, t) ?? updated;
    const finishedCountdown =
      current.running &&
      !next.running &&
      current.mode === "countdown" &&
      next.targetSec > 0 &&
      next.elapsedSec >= next.targetSec - 0.05;
    if (finishedCountdown) timerHaptic("done");
    else if (next.splits.length > current.splits.length) timerHaptic("split");
    snapRef.current = next;
    setNow(t);
    setSnap(next);
  }

  function toggleRun() {
    commit((current, t) => (current.running ? pauseTimer(current, t) : startTimer(current, t)));
  }

  const canPrimary =
    snap.running ||
    (snap.mode === "stopwatch" ? elapsed < MAX_TIMER_SEC : snap.targetSec > 0);
  const canReset = snap.running || snap.elapsedSec > 0.05 || snap.splits.length > 0;
  const canSubtract = snap.mode === "countdown" ? snap.targetSec > 0 : elapsed > 0.05;
  const canAdd = snap.mode === "countdown" ? snap.targetSec < MAX_TIMER_SEC : elapsed < MAX_TIMER_SEC;

  return (
    <section
      className={styles.timer}
      data-block-timer="true"
      data-mode={snap.mode}
      data-running={snap.running ? "true" : "false"}
      data-done={done ? "true" : "false"}
      aria-label={`${label} timer`}
    >
      <div className={styles.modeToggle} role="group" aria-label="Timer mode">
        {(["countdown", "stopwatch"] as const).map((mode) => (
          <button
            key={mode}
            type="button"
            aria-pressed={snap.mode === mode}
            onClick={() => commit((current, t) => setTimerMode(current, mode as BlockTimerMode, t))}
          >
            {mode === "countdown" ? "Countdown" : "Stopwatch"}
          </button>
        ))}
      </div>
      <div className={styles.timerClock}>
        <span className={styles.timerKicker}>{label}</span>
        <p className={styles.timerDigits} data-seconds={shown}>
          {formatClock(shown)}
        </p>
        <p className={styles.timerStatus} aria-live="polite">
          {snap.running ? <i className={styles.liveDot} aria-hidden="true" /> : null}
          {status}
        </p>
      </div>
      {snap.mode === "countdown" && snap.targetSec > 0 ? (
        <div className={styles.timerTrack} aria-hidden="true">
          <span style={{ width: `${Math.round(ratio * 1000) / 10}%` }} />
        </div>
      ) : null}
      <div className={styles.timerActions} data-split={showSplit ? "true" : "false"}>
        <button
          className={styles.timerPrimary}
          type="button"
          disabled={!canPrimary}
          onClick={toggleRun}
        >
          {action}
        </button>
        {showSplit ? (
          <button
            className={styles.timerGhost}
            type="button"
            onClick={() => commit((current, t) => splitTimer(current, t))}
          >
            Split
          </button>
        ) : null}
        <button className={styles.timerGhost} type="button" disabled={!canReset} onClick={() => commit((current) => resetTimer(current))}>
          Reset
        </button>
      </div>
      <div className={styles.timerBumps}>
        <button type="button" disabled={!canSubtract} onClick={() => commit((current, t) => adjustTimer(current, -15, t))}>
          −0:15
        </button>
        <button type="button" disabled={!canAdd} onClick={() => commit((current, t) => adjustTimer(current, 15, t))}>
          +0:15
        </button>
        <button type="button" disabled={!canAdd} onClick={() => commit((current, t) => adjustTimer(current, 60, t))}>
          +1:00
        </button>
      </div>
      {snap.mode === "stopwatch" && recentSplits.length > 0 ? (
        <div className={styles.splitRow}>
          <span className={styles.splitLabel}>
            {snap.splits.length > recentSplits.length ? "Last splits" : "Splits"}
          </span>
          <ol className={styles.splitList}>
            {recentSplits.map((mark, index) => (
              <li key={`${mark}-${index}`}>{formatClock(mark)}</li>
            ))}
          </ol>
        </div>
      ) : null}
    </section>
  );
}
