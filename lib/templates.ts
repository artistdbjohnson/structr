import type {
  PhaseId,
  Template,
  TemplateBlock,
  TemplatePhase,
  TrackMode,
  Unit,
} from "./types";

const INTENTS: Record<PhaseId, string> = {
  warmup: "Raise temp, joints, light hinge/pattern",
  skill: "Technique at light load — groove the pattern",
  form: "Cued working sets — quality over volume",
  bulk: "Main stimulus — densest logging",
  cooldown: "Downshift, breathe, mobility",
};

function block(
  id: string,
  name: string,
  detail: string,
  extra: Partial<TemplateBlock> = {},
): TemplateBlock {
  return { id, name, detail, ...extra };
}

function phase(
  id: PhaseId,
  rpe: TemplatePhase["rpe"],
  blocks: TemplateBlock[],
  rpeTarget?: string,
): TemplatePhase {
  const names: Record<PhaseId, string> = {
    warmup: "Warm-up",
    skill: "Skill drills",
    form: "Form",
    bulk: "THE BULK",
    cooldown: "Cool-down",
  };
  return {
    id,
    name: names[id],
    intent: INTENTS[id],
    rpe,
    rpeTarget,
    blocks,
  };
}

export const TEMPLATES: Template[] = [
  {
    id: "swing-foundation",
    name: "Swing Foundation",
    focus: "Hardstyle hinge",
    minutes: "~35–45 min",
    phases: [
      phase("warmup", "optional", [
        block("swing-wu-hips", "Hip circles", "1:00", { timeSec: 60 }),
        block("swing-wu-stretch", "World's greatest stretch", "4/side", {
          reps: 4,
          perSide: true,
        }),
        block("swing-wu-hinge", "Empty-hand hinge", "10", { reps: 10, load: "empty" }),
        block("swing-wu-goblet", "Light goblet squat", "8", { reps: 8, load: "light" }),
      ]),
      phase("skill", "optional", [
        block("swing-sk-dead", "Dead-stop swing practice", "3×5 light", {
          sets: 3,
          reps: 5,
          load: "light",
        }),
        block("swing-sk-hike", "Hike pass", "2×5", { sets: 2, reps: 5 }),
      ]),
      phase("form", "recommended", [
        block("swing-form", "Two-hand swing", "4×8 @ working load · rest ~60s", {
          sets: 4,
          reps: 8,
          restSec: 60,
          load: "working",
        }),
      ]),
      phase(
        "bulk",
        "required",
        [
          block("swing-bulk", "Two-hand swing", "8×10 @ same load · rest 45–60s", {
            sets: 8,
            reps: 10,
            restSec: 60,
            load: "working",
          }),
        ],
        "7–8",
      ),
      phase("cooldown", "optional", [
        block("swing-cd-fold", "Forward fold", "1:00", { timeSec: 60 }),
        block("swing-cd-hip", "90/90 hip", "1:00/side", { timeSec: 60, perSide: true }),
        block("swing-cd-breathe", "Box breathe", "2:00", { timeSec: 120 }),
      ]),
    ],
  },
  {
    id: "clean-path",
    name: "Clean Path",
    focus: "Clean rack position",
    minutes: "~40–50 min",
    phases: [
      phase("warmup", "optional", [
        block("clean-wu-arm", "Arm bars (light)", "0:45/side", {
          timeSec: 45,
          perSide: true,
          load: "light",
        }),
        block("clean-wu-t", "Thoracic openers", "1:00", { timeSec: 60 }),
        block("clean-wu-goblet", "Goblet squat", "8", { reps: 8, load: "light" }),
      ]),
      phase("skill", "optional", [
        block("clean-sk-dl", "Hand-to-hand deadlift", "3×5", { sets: 3, reps: 5 }),
        block("clean-sk-rack", "Clean to rack hold", "3×3/side light", {
          sets: 3,
          reps: 3,
          perSide: true,
          load: "light",
        }),
        block("clean-sk-breath", "Breath in rack", "3×0:20", {
          sets: 3,
          reps: 1,
          timeSec: 20,
        }),
      ]),
      phase("form", "recommended", [
        block("clean-form", "Single clean", "4×4/side @ working · rest ~75s", {
          sets: 4,
          reps: 4,
          perSide: true,
          restSec: 75,
          load: "working",
        }),
      ]),
      phase(
        "bulk",
        "required",
        [
          block("clean-bulk", "Clean + push press", "6×3/side @ working · rest 90s", {
            sets: 6,
            reps: 3,
            perSide: true,
            restSec: 90,
            load: "working",
          }),
        ],
        "7–8",
      ),
      phase("cooldown", "optional", [
        block("clean-cd-car", "Shoulder CARs", "0:45/side", { timeSec: 45, perSide: true }),
        block("clean-cd-child", "Child's pose", "1:30", { timeSec: 90 }),
        block("clean-cd-breathe", "Box breathe", "2:00", { timeSec: 120 }),
      ]),
    ],
  },
  {
    id: "get-up-primer",
    name: "Get-Up Primer",
    focus: "Turkish get-up segments",
    minutes: "~40–50 min",
    phases: [
      phase("warmup", "optional", [
        block("tgu-wu-breath", "Supine breathing", "1:00", { timeSec: 60 }),
        block("tgu-wu-bridge", "Glute bridge", "8", { reps: 8 }),
        block("tgu-wu-kneel", "Open half-kneeling", "0:45/side", {
          timeSec: 45,
          perSide: true,
        }),
      ]),
      phase("skill", "optional", [
        block("tgu-sk-seg", "Naked get-up segments", "2×/side", {
          sets: 2,
          reps: 1,
          perSide: true,
          load: "bodyweight",
        }),
        block("tgu-sk-press", "Packed-shoulder floor press", "3×5/side light", {
          sets: 3,
          reps: 5,
          perSide: true,
          load: "light",
        }),
      ]),
      phase("form", "recommended", [
        block("tgu-form-partial", "Partial get-up to hand", "3×2/side @ light–moderate", {
          sets: 3,
          reps: 2,
          perSide: true,
          load: "light",
        }),
        block("tgu-form-naked", "Full naked TGU", "2×1/side", {
          sets: 2,
          reps: 1,
          perSide: true,
          load: "bodyweight",
        }),
      ]),
      phase(
        "bulk",
        "required",
        [
          block("tgu-bulk", "Full TGU", "5×1/side @ working · rest as needed", {
            sets: 5,
            reps: 1,
            perSide: true,
            restSec: 60,
            load: "working",
          }),
        ],
        "6–7",
      ),
      phase("cooldown", "optional", [
        block("tgu-cd-twist", "Supine twist", "0:45/side", { timeSec: 45, perSide: true }),
        block("tgu-cd-floss", "Hamstring floss", "1:00/side", { timeSec: 60, perSide: true }),
        block("tgu-cd-breathe", "Box breathe", "2:00", { timeSec: 120 }),
      ]),
    ],
  },
];

const BELLS: Record<string, Record<Unit, number>> = {
  "swing-foundation": { lb: 35, kg: 16 },
  "clean-path": { lb: 35, kg: 16 },
  "get-up-primer": { lb: 25, kg: 12 },
};

export function getTemplate(id: string): Template | undefined {
  return TEMPLATES.find((template) => template.id === id);
}

export function defaultBell(templateId: string, unit: Unit): number {
  return (BELLS[templateId] ?? BELLS["swing-foundation"])[unit];
}

export function findBlock(template: Template, blockId: string): TemplateBlock | undefined {
  for (const step of template.phases) {
    const found = step.blocks.find((item) => item.id === blockId);
    if (found) return found;
  }
  return undefined;
}

export function bulkBlock(template: Template): TemplateBlock | undefined {
  return template.phases.find((step) => step.id === "bulk")?.blocks[0];
}

export function phaseTrack(id: PhaseId): Record<"time" | "reps" | "weight" | "sets", TrackMode> {
  switch (id) {
    case "warmup":
      return { time: "required", reps: "optional", weight: "off", sets: "off" };
    case "skill":
      return { time: "optional", reps: "required", weight: "optional", sets: "optional" };
    case "form":
      return { time: "optional", reps: "required", weight: "required", sets: "optional" };
    case "cooldown":
      return { time: "required", reps: "optional", weight: "off", sets: "off" };
    default:
      return { time: "optional", reps: "required", weight: "required", sets: "required" };
  }
}

export const PHASE_SHORT = ["Warm-up", "Skill", "Form", "BULK", "Cool-down"] as const;
