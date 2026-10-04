"use client";

import { useRef, useState } from "react";
import { formatClock } from "@/lib/format";
import type { LoggedBlock, Template, TemplateBlock, WorkoutSession } from "@/lib/types";
import { defaultBell, phaseTrack } from "@/lib/templates";
import { MetricPill } from "@/structr-glass/components/MetricPill";
import { BlockTimer } from "./BlockTimer";
import { MovementTitle } from "./MovementHowTo";
import { RpePicker } from "./RpePicker";
import { Stepper } from "./Stepper";
import styles from "./session.module.css";

function weightNeeded(block: TemplateBlock, mode: "required" | "optional" | "off"): boolean {
  if (mode === "off") return false;
  if (block.load === "bodyweight" || block.load === "empty") return false;
  return mode === "required";
}

function BlockEditor({
  block,
  phaseId,
  unit,
  existing,
  defaultWeight,
  onSave,
  held = false,
}: {
  block: TemplateBlock;
  phaseId: WorkoutSession["phases"][number]["id"];
  unit: WorkoutSession["unit"];
  existing?: LoggedBlock;
  defaultWeight: number;
  onSave: (logged: LoggedBlock) => void;
  held?: boolean;
}) {
  const track = phaseTrack(phaseId);
  const [sets, setSets] = useState(existing?.sets ?? block.sets ?? 1);
  const [reps, setReps] = useState(existing?.reps ?? block.reps ?? 0);
  const [weight, setWeight] = useState(
    existing?.weight ?? (weightNeeded(block, track.weight) ? defaultWeight : 0),
  );
  const [timeSec, setTimeSec] = useState(existing?.timeSec ?? block.timeSec ?? block.restSec ?? 0);
  const [freezeToken, setFreezeToken] = useState(0);
  const prescribedSec = existing?.timeSec ?? block.timeSec ?? block.restSec ?? 0;

  const timeInvalid = track.time === "required" && timeSec <= 0;
  const repsInvalid = track.reps === "required" && reps <= 0;
  const loadInvalid = weightNeeded(block, track.weight) && weight <= 0;
  const invalid = timeInvalid || repsInvalid || loadInvalid;
  const timeLabel = phaseId === "form" ? "Rest" : "Time";

  function save() {
    if (invalid) return;
    const logged: LoggedBlock = { blockId: block.id };
    if (track.sets !== "off" && sets > 0) logged.sets = sets;
    if (reps > 0) logged.reps = reps;
    if (weight > 0) logged.weight = weight;
    if (timeSec > 0) logged.timeSec = timeSec;
    setFreezeToken((value) => value + 1);
    onSave(logged);
  }

  const parts = ["Logged"];
  if (existing?.sets && existing.reps) parts.push(`${existing.sets}×${existing.reps}`);
  else if (existing?.reps) parts.push(`${existing.reps} reps`);
  if (existing?.weight) parts.push(`${existing.weight} ${unit}`);
  if (existing?.timeSec) parts.push(formatClock(existing.timeSec));

  return (
    <article className={styles.block}>
      <div className={styles.blockHead}>
        <MovementTitle name={block.name} className={styles.blockName} />
        <p className={styles.detail}>{block.detail}</p>
      </div>
      {track.sets !== "off" ? (
        <Stepper label="Sets" value={sets} min={1} max={30} onChange={setSets} />
      ) : null}
      {track.reps !== "off" ? (
        <Stepper
          label={track.reps === "optional" ? "Reps, if you want" : "Reps"}
          value={reps}
          min={0}
          max={200}
          onChange={setReps}
        />
      ) : null}
      {track.weight !== "off" && block.load !== "bodyweight" && block.load !== "empty" ? (
        <Stepper
          label={track.weight === "optional" ? `Weight, if you want (${unit})` : `Weight (${unit})`}
          value={weight}
          min={0}
          max={300}
          onChange={setWeight}
        />
      ) : null}
      {track.time !== "off" ? (
        <BlockTimer
          initialSec={prescribedSec}
          label={timeLabel}
          freezeToken={freezeToken}
          suspended={held}
          onChange={setTimeSec}
        />
      ) : null}
      {invalid ? (
        <p className={styles.hint}>
          {timeInvalid ? "Add a time before you log this." : null}
          {repsInvalid ? " Add the reps." : null}
          {loadInvalid ? " Add the weight." : null}
        </p>
      ) : null}
      <button className={styles.logBtn} type="button" disabled={invalid} onClick={save}>
        {existing ? "Update" : "Log this"}
      </button>
      {existing ? <p className={styles.logged}>{parts.join(" · ")}</p> : null}
    </article>
  );
}

export function PrepPhase({
  session,
  template,
  onChange,
  held = false,
}: {
  session: WorkoutSession;
  template: Template;
  onChange: (next: WorkoutSession) => void;
  held?: boolean;
}) {
  const spec = template.phases[session.phaseIndex];
  const phase = session.phases[session.phaseIndex];
  const ref = useRef(session);
  ref.current = session;
  if (!spec || !phase) return null;

  const bell = defaultBell(template.id, session.unit);
  let totalTime = 0;
  let totalReps = 0;
  let topWeight = 0;
  for (const logged of phase.blocks) {
    totalTime += logged.timeSec ?? 0;
    const sets = logged.sets && logged.sets > 0 ? logged.sets : 1;
    const block = spec.blocks.find((item) => item.id === logged.blockId);
    if (logged.reps) totalReps += logged.reps * sets * (block?.perSide ? 2 : 1);
    if (logged.weight && logged.weight > topWeight) topWeight = logged.weight;
  }

  function saveBlock(logged: LoggedBlock) {
    const current = ref.current;
    const index = current.phaseIndex;
    const currentPhase = current.phases[index];
    if (!currentPhase) return;
    const blocks = currentPhase.blocks.some((item) => item.blockId === logged.blockId)
      ? currentPhase.blocks.map((item) => (item.blockId === logged.blockId ? logged : item))
      : [...currentPhase.blocks, logged];
    const next: WorkoutSession = {
      ...current,
      phases: current.phases.map((item, itemIndex) =>
        itemIndex === index ? { ...currentPhase, blocks } : item,
      ),
    };
    ref.current = next;
    onChange(next);
  }

  function setRpe(rpe: number) {
    const current = ref.current;
    const index = current.phaseIndex;
    const next: WorkoutSession = {
      ...current,
      phases: current.phases.map((item, itemIndex) =>
        itemIndex === index ? { ...item, rpe } : item,
      ),
    };
    ref.current = next;
    onChange(next);
  }

  const hint =
    spec.rpe === "required"
      ? `Mark this before you move on${spec.rpeTarget ? ` · aim for ${spec.rpeTarget}` : ""}`
      : spec.rpe === "recommended"
        ? "Worth a number, if you want one"
        : "Skip it if you want";

  return (
    <>
      <h1 className={styles.title}>{spec.name}</h1>
      <p className={styles.lead}>{spec.intent}</p>
      <div className={styles.pills}>
        <MetricPill className={styles.pillFit} label="Time" value={formatClock(totalTime)} tint="cyan" />
        <MetricPill className={styles.pillFit} label="Reps" value={totalReps} tint="magenta" />
        <MetricPill
          className={styles.pillFit}
          label="Weight"
          value={topWeight > 0 ? topWeight : "—"}
          tint="orange"
        />
        {phase.rpe ? (
          <MetricPill className={styles.pillFit} label="How hard" value={phase.rpe} tint="magenta" />
        ) : null}
      </div>
      {spec.blocks.map((block) => (
        <BlockEditor
          key={block.id}
          block={block}
          phaseId={spec.id}
          unit={session.unit}
          existing={phase.blocks.find((item) => item.blockId === block.id)}
          defaultWeight={bell}
          held={held}
          onSave={saveBlock}
        />
      ))}
      <RpePicker value={phase.rpe} onChange={setRpe} required={spec.rpe === "required"} hint={hint} />
    </>
  );
}
