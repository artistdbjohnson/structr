import type { BulkUi, Prefs, WorkoutSession } from "./types";

export const STORAGE_KEYS = {
  active: "structr.activeSession",
  history: "structr.history",
  prefs: "structr.prefs",
  soonWatch: "structr.soonWatch",
} as const;

const DEFAULT_PREFS: Prefs = { unit: "lb" };

function canStore(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function readJson<T>(key: string): T | null {
  if (!canStore()) return null;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function writeJson(key: string, value: unknown) {
  if (!canStore()) return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function loadPrefs(): Prefs {
  const parsed = readJson<Prefs>(STORAGE_KEYS.prefs);
  if (!parsed || (parsed.unit !== "lb" && parsed.unit !== "kg")) {
    return { ...DEFAULT_PREFS };
  }
  return {
    unit: parsed.unit,
    lastTemplateId: typeof parsed.lastTemplateId === "string" ? parsed.lastTemplateId : undefined,
  };
}

export function savePrefs(prefs: Prefs) {
  writeJson(STORAGE_KEYS.prefs, prefs);
}

function isBulkUi(value: unknown): value is BulkUi {
  return value === "idle" || value === "active" || value === "rest";
}

export function loadActive(): WorkoutSession | null {
  const parsed = readJson<WorkoutSession>(STORAGE_KEYS.active);
  if (!parsed || parsed.status !== "active" || !parsed.id || !Array.isArray(parsed.phases)) {
    return null;
  }
  if (!parsed.phases.length) return null;
  parsed.phaseIndex = Math.min(
    parsed.phases.length - 1,
    Math.max(0, Number(parsed.phaseIndex) || 0),
  );
  for (const phase of parsed.phases) {
    if (!Array.isArray(phase.blocks)) phase.blocks = [];
    if (!phase.bulk) continue;
    if (!isBulkUi(phase.bulk.ui)) phase.bulk.ui = "idle";
    if (!Array.isArray(phase.bulk.sets)) phase.bulk.sets = [];
    if (phase.bulk.ui === "active" && !phase.bulk.activeStartedAt) phase.bulk.ui = "idle";
    if (phase.bulk.ui === "rest" && !phase.bulk.restEndsAt) phase.bulk.ui = "idle";
    phase.bulk.reps = Math.max(1, Number(phase.bulk.reps) || 1);
    phase.bulk.weight = Math.max(0, Number(phase.bulk.weight) || 0);
  }
  return parsed;
}

export function saveActive(session: WorkoutSession) {
  writeJson(STORAGE_KEYS.active, session);
}

export function clearActive() {
  if (!canStore()) return;
  window.localStorage.removeItem(STORAGE_KEYS.active);
}

export function loadHistory(): WorkoutSession[] {
  const parsed = readJson<WorkoutSession[]>(STORAGE_KEYS.history);
  if (!Array.isArray(parsed)) return [];
  return parsed.filter((session) => session && session.status === "complete" && session.id);
}

export function saveHistory(sessions: WorkoutSession[]) {
  writeJson(STORAGE_KEYS.history, sessions.slice(0, 40));
}

export function clearAllData() {
  if (!canStore()) return;
  window.localStorage.removeItem(STORAGE_KEYS.active);
  window.localStorage.removeItem(STORAGE_KEYS.history);
  window.localStorage.removeItem(STORAGE_KEYS.prefs);
  window.localStorage.removeItem(STORAGE_KEYS.soonWatch);
}
