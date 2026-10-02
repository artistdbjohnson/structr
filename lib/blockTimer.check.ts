import assert from "node:assert/strict";
import {
  MAX_TIMER_SEC,
  adjustTimer,
  catchTimerLimit,
  createBlockTimer,
  displaySeconds,
  loggedSeconds,
  pauseTimer,
  resetTimer,
  setTimerMode,
  splitTimer,
  startTimer,
  timerAction,
  timerStatus,
} from "./blockTimer.ts";

const t0 = 1_000_000;

const fresh = createBlockTimer(60);
assert.equal(fresh.mode, "countdown");
assert.equal(displaySeconds(fresh, t0), 60);
assert.equal(loggedSeconds(fresh, t0), 60);
assert.equal(timerStatus(fresh, t0), "remaining");
assert.equal(timerAction(fresh, t0), "Start");

assert.equal(createBlockTimer(0).mode, "stopwatch");
assert.equal(createBlockTimer(Number.NaN).mode, "stopwatch");
assert.equal(loggedSeconds(createBlockTimer(0), t0), 0);

let running = startTimer(fresh, t0);
assert.equal(running.running, true);
assert.equal(displaySeconds(running, t0 + 1000), 59);
assert.equal(displaySeconds(running, t0 + 1500), 59);
assert.equal(loggedSeconds(running, t0 + 1500), 1);

const paused = pauseTimer(running, t0 + 1500);
assert.equal(paused.running, false);
assert.ok(Math.abs(paused.elapsedSec - 1.5) < 1e-6);
assert.equal(timerStatus(paused, t0), "paused · remaining");
assert.equal(timerAction(paused, t0), "Resume");
assert.equal(loggedSeconds(paused, t0 + 99999), 1);

const resumed = startTimer(paused, t0 + 5000);
assert.equal(resumed.running, true);
assert.equal(resumed.elapsedSec, paused.elapsedSec);
assert.equal(displaySeconds(resumed, t0 + 5000), 59);

const reset = resetTimer(paused);
assert.equal(reset.elapsedSec, 0);
assert.equal(reset.splits.length, 0);
assert.equal(loggedSeconds(reset, t0), 60);
assert.equal(timerAction(reset, t0), "Start");

let bumped = adjustTimer(fresh, 15, t0);
assert.equal(bumped.targetSec, 75);
assert.equal(displaySeconds(bumped, t0), 75);
assert.equal(loggedSeconds(bumped, t0), 75);
bumped = adjustTimer(bumped, -15, t0);
bumped = adjustTimer(bumped, -15, t0);
assert.equal(bumped.targetSec, 45);
assert.equal(displaySeconds(bumped, t0), 45);

let extended = startTimer(createBlockTimer(60), t0);
extended = adjustTimer(extended, 15, t0 + 2000);
assert.equal(extended.running, true);
assert.equal(extended.targetSec, 75);
assert.equal(displaySeconds(extended, t0 + 2000), 73);

const finished = catchTimerLimit(startTimer(createBlockTimer(2), t0), t0 + 2500);
assert.ok(finished);
assert.equal(finished.running, false);
assert.equal(finished.elapsedSec, 2);
assert.equal(displaySeconds(finished, t0 + 2500), 0);
assert.equal(timerStatus(finished, t0), "time's up");
assert.equal(timerAction(finished, t0), "Restart");
assert.equal(loggedSeconds(finished, t0), 2);
assert.equal(catchTimerLimit(finished, t0 + 9999), null);

const restarted = startTimer(finished, t0 + 3000);
assert.equal(restarted.running, true);
assert.equal(restarted.elapsedSec, 0);
assert.equal(displaySeconds(restarted, t0 + 3000), 2);

let watch = setTimerMode(startTimer(createBlockTimer(60), t0), "stopwatch", t0 + 5000);
assert.equal(watch.mode, "stopwatch");
assert.equal(watch.running, false);
assert.ok(Math.abs(watch.elapsedSec - 5) < 1e-6);
assert.equal(displaySeconds(watch, t0), 5);
assert.equal(timerStatus(watch, t0), "paused · elapsed");

watch = adjustTimer(watch, 15, t0);
assert.equal(Math.floor(watch.elapsedSec), 20);
watch = adjustTimer(watch, -999, t0);
assert.equal(watch.elapsedSec, 0);
assert.equal(displaySeconds(watch, t0), 0);

let laps = startTimer(createBlockTimer(0), t0);
assert.equal(laps.mode, "stopwatch");
laps = splitTimer(laps, t0 + 400);
assert.equal(laps.splits.length, 0);
laps = splitTimer(laps, t0 + 2200);
laps = splitTimer(laps, t0 + 4000);
assert.equal(laps.splits.length, 2);
assert.equal(displaySeconds(laps, t0 + 4500), 4);
assert.equal(loggedSeconds(laps, t0 + 4500), 4);

const noLap = splitTimer(startTimer(createBlockTimer(30), t0), t0 + 5000);
assert.equal(noLap.splits.length, 0);

const capped = catchTimerLimit(
  startTimer({ ...createBlockTimer(0), elapsedSec: MAX_TIMER_SEC - 1 }, t0),
  t0 + 1500,
);
assert.ok(capped);
assert.equal(capped.running, false);
assert.equal(capped.elapsedSec, MAX_TIMER_SEC);
assert.equal(startTimer(capped, t0 + 2000), capped);

const cleared = adjustTimer(startTimer(createBlockTimer(10), t0), -60, t0 + 1000);
assert.equal(cleared.targetSec, 0);
assert.equal(cleared.running, false);
assert.equal(loggedSeconds(cleared, t0), 0);

console.log("block timer checks passed");
