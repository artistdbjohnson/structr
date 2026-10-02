import { CATALOG_TEMPLATES } from "./catalogPlans";
import { block, phase } from "./planBuild";
import type { PhaseId, Template, TemplateBlock, TrackMode, Unit } from "./types";

const KETTLEBELL_TEMPLATES: Template[] = [
  {
    id: "swing-foundation",
    name: "Swing Foundation",
    focus: "The two-hand swing",
    minutes: "~35–45 min",
    phases: [
      phase("warmup", "optional", [
        block("swing-wu-hips", "Hip circles", "1:00", { timeSec: 60 }),
        block("swing-wu-stretch", "World's greatest stretch", "4 a side", {
          reps: 4,
          perSide: true,
        }),
        block("swing-wu-hinge", "Sit-back, no bell", "10", { reps: 10, load: "empty" }),
        block("swing-wu-goblet", "Light goblet squat", "8", { reps: 8, load: "light" }),
      ]),
      phase("skill", "optional", [
        block("swing-sk-dead", "Set-down swings", "3 sets of 5, light", {
          sets: 3,
          reps: 5,
          load: "light",
        }),
        block("swing-sk-hike", "Hike pass", "2 sets of 5", { sets: 2, reps: 5 }),
      ], undefined, "Light bell. Learn the move before you rush it."),
      phase("form", "recommended", [
        block("swing-form", "Two-hand swing", "4 sets of 8, a bell you can own, rest about a minute", {
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
          block("swing-bulk", "Two-hand swing", "8 sets of 10, same bell, rest 45–60 seconds", {
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
        block("swing-cd-hip", "90/90 hip", "1:00 a side", { timeSec: 60, perSide: true }),
        block("swing-cd-breathe", "Box breathe", "2:00", { timeSec: 120 }),
      ]),
    ],
  },
  {
    id: "clean-path",
    name: "Clean Path",
    focus: "A quiet clean",
    minutes: "~40–50 min",
    phases: [
      phase("warmup", "optional", [
        block("clean-wu-arm", "Arm bars (light)", "45 seconds a side", {
          timeSec: 45,
          perSide: true,
          load: "light",
        }),
        block("clean-wu-t", "Upper-back openers", "1:00", { timeSec: 60 }),
        block("clean-wu-goblet", "Goblet squat", "8", { reps: 8, load: "light" }),
      ]),
      phase("skill", "optional", [
        block("clean-sk-dl", "Hand-to-hand deadlift", "3 sets of 5", { sets: 3, reps: 5 }),
        block("clean-sk-rack", "Clean to rack hold", "3 sets of 3 a side, light", {
          sets: 3,
          reps: 3,
          perSide: true,
          load: "light",
        }),
        block("clean-sk-breath", "Breathe in the rack", "3 holds, 20 seconds", {
          sets: 3,
          reps: 1,
          timeSec: 20,
        }),
      ], undefined, "Light bell. Learn the move before you rush it."),
      phase("form", "recommended", [
        block("clean-form", "Single clean", "4 sets of 4 a side, a bell you can own, rest about 75 seconds", {
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
          block("clean-bulk", "Clean + push press", "6 sets of 3 a side, rest 90 seconds", {
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
        block("clean-cd-car", "Slow shoulder circles", "45 seconds a side", { timeSec: 45, perSide: true }),
        block("clean-cd-child", "Child's pose", "1:30", { timeSec: 90 }),
        block("clean-cd-breathe", "Box breathe", "2:00", { timeSec: 120 }),
      ]),
    ],
  },
  {
    id: "get-up-primer",
    name: "Get-Up Primer",
    focus: "The get-up, in pieces",
    minutes: "~40–50 min",
    phases: [
      phase("warmup", "optional", [
        block("tgu-wu-breath", "Breathing on your back", "1:00", { timeSec: 60 }),
        block("tgu-wu-bridge", "Glute bridge", "8", { reps: 8 }),
        block("tgu-wu-kneel", "Half-kneel hip open", "45 seconds a side", {
          timeSec: 45,
          perSide: true,
        }),
      ]),
      phase("skill", "optional", [
        block("tgu-sk-seg", "Get-up pieces, no bell", "2 a side, no bell", {
          sets: 2,
          reps: 1,
          perSide: true,
          load: "bodyweight",
        }),
        block("tgu-sk-press", "Floor press", "3 sets of 5 a side, light", {
          sets: 3,
          reps: 5,
          perSide: true,
          load: "light",
        }),
      ], undefined, "Light bell. Learn the move before you rush it."),
      phase("form", "recommended", [
        block("tgu-form-partial", "Partial get-up to hand", "3 sets of 2 a side, light", {
          sets: 3,
          reps: 2,
          perSide: true,
          load: "light",
        }),
        block("tgu-form-naked", "Full get-up, no bell", "2 singles a side", {
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
          block("tgu-bulk", "Full get-up", "5 singles a side, rest when you need it", {
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
        block("tgu-cd-twist", "Twist on your back", "45 seconds a side", { timeSec: 45, perSide: true }),
        block("tgu-cd-floss", "Easy hamstrings", "1:00 a side", { timeSec: 60, perSide: true }),
        block("tgu-cd-breathe", "Box breathe", "2:00", { timeSec: 120 }),
      ]),
    ],
  },
];

export const TEMPLATES: Template[] = [...KETTLEBELL_TEMPLATES, ...CATALOG_TEMPLATES];

const BELLS: Record<string, Record<Unit, number>> = {
  "swing-foundation": { lb: 35, kg: 16 },
  "clean-path": { lb: 35, kg: 16 },
  "get-up-primer": { lb: 25, kg: 12 },
  "goblet-squat-path": { lb: 25, kg: 12 },
  "press-path": { lb: 20, kg: 8 },
  "row-path": { lb: 20, kg: 8 },
  "squat-basics": { lb: 45, kg: 20 },
  "bench-basics": { lb: 45, kg: 20 },
  "deadlift-basics": { lb: 65, kg: 30 },
  "get-up-bridge": { lb: 15, kg: 8 },
  "carry-lunges": { lb: 25, kg: 12 },
  "golf-gym-prep": { lb: 16, kg: 8 },
  "power-in-the-turn": { lb: 16, kg: 8 },
  "capable-strength": { lb: 20, kg: 8 },
  "carry-everyday": { lb: 20, kg: 8 },
};

export function getTemplate(id: string): Template | undefined {
  return TEMPLATES.find((template) => template.id === id);
}

export function defaultBell(templateId: string, unit: Unit): number {
  const template = getTemplate(templateId);
  const main = template ? bulkBlock(template) : undefined;
  if (!main || main.load === "bodyweight" || main.load === "empty") return 0;
  const table = BELLS[templateId];
  if (table) return table[unit];
  return unit === "lb" ? 20 : 8;
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
