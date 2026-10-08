import { learnedPlan } from "./storage";
import type {
  AdvanceCheck,
  LoggedBlock,
  SessionSummary,
  Template,
  TemplateBlock,
  Unit,
  WorkoutSession,
} from "./types";
import { bulkBlock, defaultBell, findBlock, getTemplate } from "./templates";

export function createSession(template: Template, unit: Unit): WorkoutSession {
  const main = bulkBlock(template);
  return {
    id: crypto.randomUUID(),
    templateId: template.id,
    templateName: template.name,
    startedAt: new Date().toISOString(),
    unit,
    status: "active",
    phaseIndex: 0,
    templateSnapshot: getTemplate(template.id) ? undefined : template,
    phases: template.phases.map((step) => ({
      id: step.id,
      blocks: [],
      bulk:
        step.id === "bulk"
          ? {
              ui: "idle",
              setIndex: 0,
              reps: main?.reps && main.reps > 0 ? main.reps : 1,
              weight: defaultBell(template.id, unit),
              sets: [],
            }
          : undefined,
    })),
  };
}

function sidesFor(spec: TemplateBlock | undefined): number {
  return spec?.perSide ? 2 : 1;
}

export function blockReps(logged: LoggedBlock, spec: TemplateBlock | undefined): number {
  if (!logged.reps) return 0;
  const sets = logged.sets && logged.sets > 0 ? logged.sets : 1;
  return logged.reps * sets * sidesFor(spec);
}

/** Catalog plan, or the copy saved with a session that was named on the spot. */
export function templateForSession(
  session: Pick<WorkoutSession, "templateId" | "templateSnapshot">,
): Template | undefined {
  return getTemplate(session.templateId) ?? session.templateSnapshot ?? learnedPlan(session.templateId);
}

export function summarize(session: WorkoutSession): SessionSummary {
  const template = templateForSession(session);
  let totalReps = 0;
  let topWeight = 0;
  let bulkVolume = 0;
  let bulkSets = 0;
  let bulkLastWeight = 0;
  let bulkRpe: number | null = null;

  for (const phase of session.phases) {
    const spec = template?.phases.find((step) => step.id === phase.id);
    if (phase.id === "bulk" && phase.rpe && phase.rpe >= 1 && phase.rpe <= 10) {
      bulkRpe = phase.rpe;
    }
    for (const logged of phase.blocks) {
      const resolved =
        spec?.blocks.find((item) => item.id === logged.blockId) ??
        (template ? findBlock(template, logged.blockId) : undefined);
      totalReps += blockReps(logged, resolved);
      if (logged.weight && logged.weight > topWeight) topWeight = logged.weight;
    }
    if (phase.bulk) {
      const perSide = spec?.blocks[0]?.perSide ?? false;
      const multiplier = perSide ? 2 : 1;
      bulkSets = phase.bulk.sets.length;
      for (const set of phase.bulk.sets) {
        totalReps += set.reps * multiplier;
        bulkVolume += set.reps * set.weight * multiplier;
        if (set.weight > topWeight) topWeight = set.weight;
        bulkLastWeight = set.weight;
      }
    }
  }

  const start = Date.parse(session.startedAt);
  const end = Date.parse(session.endedAt ?? new Date().toISOString());
  const durationSec =
    Number.isFinite(start) && Number.isFinite(end) ? Math.max(0, Math.round((end - start) / 1000)) : 0;

  return {
    id: session.id,
    templateId: session.templateId,
    templateName: template?.name ?? session.templateName,
    startedAt: session.startedAt,
    endedAt: session.endedAt ?? new Date(Number.isFinite(end) ? end : Date.now()).toISOString(),
    unit: session.unit,
    durationSec,
    totalReps,
    topWeight,
    bulkRpe,
    bulkVolume,
    bulkSets,
    bulkLastWeight,
  };
}

export function phaseProgress(session: WorkoutSession, template: Template): number {
  const phase = session.phases[session.phaseIndex];
  const spec = template.phases[session.phaseIndex];
  if (!phase || !spec) return 0;
  if (phase.id === "bulk") {
    const total = spec.blocks[0]?.sets ?? 1;
    return Math.min(1, (phase.bulk?.sets.length ?? 0) / Math.max(1, total));
  }
  if (!spec.blocks.length) return 0;
  return Math.min(1, phase.blocks.length / spec.blocks.length);
}

function formBlockOk(logged: LoggedBlock, template: Template): boolean {
  if ((logged.reps ?? 0) <= 0) return false;
  const spec = findBlock(template, logged.blockId);
  if (spec?.load === "bodyweight" || spec?.load === "empty") return true;
  return (logged.weight ?? 0) > 0;
}

export function checkAdvance(session: WorkoutSession, template: Template): AdvanceCheck {
  const phase = session.phases[session.phaseIndex];
  if (!phase) return { type: "block", message: "This part of the session didn't load." };

  if (phase.id === "bulk") {
    if (!phase.bulk) {
      return { type: "block", message: "The main work didn't load. End this and start again." };
    }
    if (phase.bulk.ui === "active") {
      return { type: "block", message: "Finish this set, or stop it, before you move on." };
    }
    if (!phase.rpe || phase.rpe < 1 || phase.rpe > 10) {
      return { type: "block", message: "Mark how hard The Bulk felt, from 1 to 10, before you move on." };
    }
    if (phase.bulk.sets.length === 0) {
      return { type: "confirm", message: "You haven't logged a set in The Bulk. Move on anyway?" };
    }
    return { type: "ok" };
  }

  if (phase.id === "warmup" || phase.id === "cooldown") {
    const hasTime = phase.blocks.some((logged) => (logged.timeSec ?? 0) > 0);
    if (!hasTime) {
      return {
        type: "confirm",
        message:
          phase.id === "cooldown"
            ? "No cool-down time yet. Finish anyway?"
            : "No warm-up time yet. Move on anyway?",
      };
    }
    return { type: "ok" };
  }

  if (phase.id === "skill") {
    if (phase.blocks.length === 0) {
      return { type: "confirm", message: "No practice reps yet. Move on anyway?" };
    }
    if (phase.blocks.some((logged) => (logged.reps ?? 0) <= 0)) {
      return { type: "block", message: "Add the reps on every block you logged." };
    }
    return { type: "ok" };
  }

  if (phase.id === "form") {
    if (phase.blocks.length === 0) {
      return { type: "confirm", message: "No working sets yet. Move on anyway?" };
    }
    if (phase.blocks.some((logged) => !formBlockOk(logged, template))) {
      return { type: "block", message: "Those sets need reps and a weight." };
    }
    return { type: "ok" };
  }

  return { type: "ok" };
}

export function percentDelta(current: number, previous: number): number | null {
  if (previous <= 0 || current <= 0) return null;
  return Math.round(((current - previous) / previous) * 100);
}
