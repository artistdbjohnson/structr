export type Unit = "lb" | "kg";

export type PhaseId = "warmup" | "skill" | "form" | "bulk" | "cooldown";

export type SessionStatus = "active" | "complete" | "abandoned";

export type RpeMode = "optional" | "recommended" | "required";

export type LoadHint = "bodyweight" | "empty" | "light" | "working";

export type BulkUi = "idle" | "active" | "rest";

export type TrackMode = "required" | "optional" | "off";

export type TemplateBlock = {
  id: string;
  name: string;
  detail: string;
  sets?: number;
  reps?: number;
  perSide?: boolean;
  timeSec?: number;
  restSec?: number;
  load?: LoadHint;
};

export type TemplatePhase = {
  id: PhaseId;
  name: string;
  intent: string;
  rpe: RpeMode;
  rpeTarget?: string;
  blocks: TemplateBlock[];
};

export type Template = {
  id: string;
  name: string;
  focus: string;
  minutes: string;
  /** Name on the bulk weight pill. Bodyweight bulks hide the number. */
  implement?: string;
  phases: TemplatePhase[];
};

export type LoggedBlock = {
  blockId: string;
  reps?: number;
  sets?: number;
  weight?: number;
  timeSec?: number;
};

export type BulkSetLog = {
  reps: number;
  weight: number;
  elapsedSec: number;
  note?: string;
};

export type BulkState = {
  ui: BulkUi;
  setIndex: number;
  reps: number;
  weight: number;
  sets: BulkSetLog[];
  activeStartedAt?: number;
  restEndsAt?: number;
  restTotalSec?: number;
  note?: string;
};

export type PhaseState = {
  id: PhaseId;
  rpe?: number;
  blocks: LoggedBlock[];
  bulk?: BulkState;
};

export type WorkoutSession = {
  id: string;
  templateId: string;
  templateName: string;
  startedAt: string;
  endedAt?: string;
  unit: Unit;
  status: SessionStatus;
  phaseIndex: number;
  phases: PhaseState[];
  /**
   * Kept on the phone when this session was built from a name
   * that is not in the catalog. Catalog plans leave this empty.
   */
  templateSnapshot?: Template;
};

export type Prefs = {
  unit: Unit;
  lastTemplateId?: string;
};

export type SessionSummary = {
  id: string;
  templateId: string;
  templateName: string;
  startedAt: string;
  endedAt: string;
  unit: Unit;
  durationSec: number;
  totalReps: number;
  topWeight: number;
  bulkRpe: number | null;
  bulkVolume: number;
  bulkSets: number;
  bulkLastWeight: number;
};

export type AdvanceCheck =
  | { type: "ok" }
  | { type: "block"; message: string }
  | { type: "confirm"; message: string };
