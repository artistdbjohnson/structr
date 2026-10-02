"use client";

import { useEffect, useRef } from "react";
import { IDLE_CLOCK, formatClock } from "@/lib/format";
import { percentDelta, summarize } from "@/lib/session";
import { loadHistory } from "@/lib/storage";
import { bulkBlock } from "@/lib/templates";
import type { BulkState, Template, WorkoutSession } from "@/lib/types";
import { MetricPill } from "@/structr-glass/components/MetricPill";
import { TrendChip } from "@/structr-glass/components/TrendChip";
import { MovementTitle } from "./MovementHowTo";
import { RpePicker } from "./RpePicker";
import { Stepper } from "./Stepper";
import styles from "./session.module.css";

function HeroSpark({ progress }: { progress: number }) {
  const clamped = Math.min(1, Math.max(0, progress));
  const x = 12 + clamped * 300;
  return (
    <svg className={styles.spark} viewBox="0 0 328 36" aria-hidden="true">
      <path d="M12 18 H316" stroke="rgba(255,255,255,0.28)" strokeWidth="1.5" strokeLinecap="round" />
      <path
        d={`M12 18 H ${x.toFixed(1)}`}
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        style={{ filter: "drop-shadow(0 0 6px rgba(255,255,255,0.85))" }}
      />
      <circle cx={x} cy="18" r="4" fill="white" />
      <circle cx={x} cy="18" r="8" fill="none" stroke="white" strokeOpacity="0.45" />
    </svg>
  );
}

export function BulkPhase({
  session,
  template,
  now,
  onChange,
}: {
  session: WorkoutSession;
  template: Template;
  now: number;
  onChange: (next: WorkoutSession) => void;
}) {
  const spec = bulkBlock(template);
  const phase = session.phases.find((item) => item.id === "bulk");
  const bulk = phase?.bulk;
  const ref = useRef(session);
  ref.current = session;

  function commit(next: WorkoutSession) {
    ref.current = next;
    onChange(next);
  }

  function patch(mutate: (bulk: BulkState) => BulkState) {
    const current = ref.current;
    const currentPhase = current.phases.find((item) => item.id === "bulk");
    if (!currentPhase?.bulk) return;
    const nextBulk = mutate(currentPhase.bulk);
    if (nextBulk === currentPhase.bulk) return;
    commit({
      ...current,
      phases: current.phases.map((item) =>
        item.id === "bulk" ? { ...currentPhase, bulk: nextBulk } : item,
      ),
    });
  }

  const patchRef = useRef(patch);
  patchRef.current = patch;

  useEffect(() => {
    if (!bulk || bulk.ui !== "rest" || !bulk.restEndsAt || now < bulk.restEndsAt) return;
    patchRef.current((current) =>
      current.ui === "rest"
        ? { ...current, ui: "idle", restEndsAt: undefined, activeStartedAt: undefined }
        : current,
    );
  }, [bulk, now]);

  if (!spec || !phase || !bulk) return <p>The main work didn't load.</p>;

  const totalSets = spec.sets && spec.sets > 0 ? spec.sets : 1;
  const restSec = spec.restSec && spec.restSec > 0 ? spec.restSec : 60;
  const perSide = Boolean(spec.perSide);
  const finished = bulk.sets.length >= totalSets;
  const remainingSets = Math.max(0, totalSets - bulk.sets.length);
  const elapsed =
    bulk.ui === "active" && bulk.activeStartedAt
      ? Math.max(0, Math.floor((now - bulk.activeStartedAt) / 1000))
      : 0;
  const remaining =
    bulk.ui === "rest" && bulk.restEndsAt
      ? Math.max(0, Math.ceil((bulk.restEndsAt - now) / 1000))
      : 0;
  const warn = bulk.ui === "rest" && remaining <= 10;
  const displaySet = Math.min(totalSets, bulk.sets.length + (finished ? 0 : 1));

  let clock = IDLE_CLOCK;
  let sublabel = "when you're ready";
  let heroLabel = "READY";
  let sparkProgress = 0.04;
  if (bulk.ui === "active") {
    clock = formatClock(elapsed);
    sublabel = "so far";
    heroLabel = "GOING";
    sparkProgress = Math.min(1, elapsed / 45);
  } else if (bulk.ui === "rest") {
    clock = formatClock(remaining);
    sublabel = "breathe";
    heroLabel = warn ? `REST · ${formatClock(remaining)}` : "REST";
    sparkProgress = bulk.restTotalSec ? 1 - remaining / bulk.restTotalSec : 1;
  }

  const previous = loadHistory().find(
    (item) => item.templateId === session.templateId && item.unit === session.unit,
  );
  const previousSummary = previous ? summarize(previous) : null;
  const volume = bulk.sets.reduce(
    (sum, set) => sum + set.reps * set.weight * (perSide ? 2 : 1),
    0,
  );
  const volumeDelta =
    previousSummary && previousSummary.bulkVolume > 0
      ? percentDelta(volume, previousSummary.bulkVolume)
      : null;
  const weightDelta =
    previousSummary && previousSummary.bulkLastWeight > 0
      ? bulk.weight - previousSummary.bulkLastWeight
      : null;

  const prevSet = bulk.sets[bulk.sets.length - 1];
  let status = finished ? "done" : `set ${displaySet}`;
  let statusDirection: "up" | "down" | "flat" = "flat";
  if (bulk.ui === "active") {
    if (prevSet && elapsed > 5) {
      const quicker = elapsed <= prevSet.elapsedSec;
      status = quicker ? "quicker" : "slower";
      statusDirection = quicker ? "up" : "down";
    } else {
      status = "going";
    }
  } else if (bulk.ui === "rest") {
    status = finished ? "last one" : `next, set ${Math.min(totalSets, bulk.sets.length + 1)}`;
  }

  const shownReps = bulk.ui === "rest" ? (bulk.sets.at(-1)?.reps ?? bulk.reps) : bulk.reps;
  const repsChip =
    bulk.ui === "active" ? "going" : remainingSets === 0 && bulk.sets.length > 0 ? "done" : `${remainingSets} left`;
  const volumes = bulk.sets.map((set) => set.reps * set.weight);
  const scheme = finished
    ? `All ${totalSets} sets are in`
    : bulk.ui === "rest"
      ? `Rest. Next is set ${Math.min(totalSets, bulk.sets.length + 1)} of ${totalSets}`
      : `Set ${displaySet} of ${totalSets} · ${bulk.reps}${perSide ? " a side" : " reps"}`;

  function startSet() {
    patch((current) => {
      if (current.ui !== "idle" || current.sets.length >= totalSets) return current;
      return { ...current, ui: "active", activeStartedAt: Date.now(), restEndsAt: undefined };
    });
  }

  function completeSet() {
    patch((current) => {
      if (current.ui !== "active" || !current.activeStartedAt) return current;
      const elapsedSec = Math.max(1, Math.round((Date.now() - current.activeStartedAt) / 1000));
      const sets = [
        ...current.sets,
        {
          reps: current.reps,
          weight: current.weight,
          elapsedSec,
          note: current.note?.trim() || undefined,
        },
      ];
      return {
        ...current,
        sets,
        ui: "rest",
        setIndex: sets.length,
        activeStartedAt: undefined,
        restEndsAt: Date.now() + restSec * 1000,
        restTotalSec: restSec,
        note: "",
      };
    });
  }

  function skipRest() {
    patch((current) =>
      current.ui === "rest"
        ? { ...current, ui: "idle", restEndsAt: undefined, activeStartedAt: undefined }
        : current,
    );
  }

  function setRpe(rpe: number) {
    const current = ref.current;
    commit({
      ...current,
      phases: current.phases.map((item) => (item.id === "bulk" ? { ...item, rpe } : item)),
    });
  }

  const rpeTarget = template.phases.find((item) => item.id === "bulk")?.rpeTarget;
  const hint = `Mark this before you move on${rpeTarget ? ` · aim for ${rpeTarget}` : ""}`;

  return (
    <section className={styles.stack} data-bulk-state={bulk.ui} data-exercise={spec.name}>
      <MovementTitle name={spec.name} className={styles.exercise} as="h1" />
      <p className={styles.detail}>{scheme}</p>
      <p className={styles.detail}>{spec.detail}</p>
      <article
        className={styles.hero}
        data-state={bulk.ui}
        data-warn={warn ? "true" : "false"}
        aria-live="polite"
      >
        <div className={styles.heroTop}>
          <span className={styles.heroLabel}>{heroLabel}</span>
        </div>
        <div className={styles.heroClock}>
          <div className={styles.matrix}>{clock}</div>
          <div className={styles.sublabel}>{sublabel}</div>
        </div>
        <div className={styles.heroFoot}>
          <HeroSpark progress={sparkProgress} />
          <TrendChip value={status} direction={statusDirection} tint={bulk.ui === "rest" ? "cyan" : "magenta"} />
        </div>
      </article>
      <div className={styles.pills}>
        <MetricPill
          className={styles.pillFit}
          label={bulk.ui === "rest" ? "Done" : "Target"}
          value={shownReps}
          tint="magenta"
          footer={<TrendChip value={repsChip} direction="flat" tint="magenta" />}
        />
        <MetricPill
          className={styles.pillFit}
          label={`Kettlebell · ${session.unit}`}
          value={bulk.weight}
          tint="orange"
          footer={
            weightDelta === null ? (
              <TrendChip value="first time" direction="flat" tint="orange" />
            ) : (
              <TrendChip
                value={`${weightDelta > 0 ? "+" : ""}${weightDelta}`}
                direction={weightDelta > 0 ? "up" : weightDelta < 0 ? "down" : "flat"}
                tint="orange"
              />
            )
          }
        />
        <MetricPill
          className={styles.pillFit}
          label={`Volume · ${session.unit}`}
          value={volume}
          tint="cyan"
          spark={volumes.length >= 2 ? volumes : undefined}
          footer={
            volumeDelta === null ? (
              <TrendChip value={volume > 0 ? "today" : "—"} direction="flat" tint="cyan" />
            ) : (
              <TrendChip
                value={`${volumeDelta > 0 ? "+" : ""}${volumeDelta}%`}
                direction={volumeDelta > 0 ? "up" : volumeDelta < 0 ? "down" : "flat"}
                tint="cyan"
              />
            )
          }
        />
      </div>
      <div className={styles.rail} aria-label="Set progress">
        {Array.from({ length: totalSets }, (_, index) => {
          const state = index < bulk.sets.length ? "done" : index === bulk.sets.length && !finished ? "current" : "todo";
          return <span key={index} className={styles.dot} data-state={state} />;
        })}
      </div>
      {bulk.ui === "idle" && !finished ? (
        <div className={styles.editRow}>
          <Stepper
            label={perSide ? "Reps a side" : "Reps"}
            value={bulk.reps}
            min={1}
            max={100}
            onChange={(reps) => patch((current) => ({ ...current, reps }))}
          />
          <Stepper
            label={`Weight (${session.unit})`}
            value={bulk.weight}
            min={1}
            max={300}
            onChange={(weight) => patch((current) => ({ ...current, weight }))}
          />
        </div>
      ) : null}
      {bulk.ui !== "active" ? (
        <RpePicker value={phase.rpe} onChange={setRpe} required hint={hint} />
      ) : null}
      {bulk.ui === "rest" ? (
        <input
          className={styles.note}
          aria-label="Note for this set"
          placeholder="How'd that set feel?"
          maxLength={140}
          value={bulk.note ?? ""}
          onChange={(event) => {
            const note = event.target.value.slice(0, 140);
            patch((current) => {
              const sets = current.sets.slice();
              if (sets.length) {
                sets[sets.length - 1] = { ...sets[sets.length - 1], note: note.trim() || undefined };
              }
              return { ...current, note, sets };
            });
          }}
        />
      ) : null}
      {bulk.ui === "active" ? (
        <button className={styles.cta} data-kind="complete" type="button" onClick={completeSet}>
          Finish set
        </button>
      ) : null}
      {bulk.ui === "rest" ? (
        <button className={styles.cta} data-kind="rest" type="button" onClick={skipRest}>
          Skip rest
        </button>
      ) : null}
      {bulk.ui === "idle" && !finished ? (
        <button className={styles.cta} data-kind="start" type="button" onClick={startSet}>
          Start set
        </button>
      ) : null}
    </section>
  );
}
