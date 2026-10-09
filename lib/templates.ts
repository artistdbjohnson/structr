import { CATALOG_TEMPLATES } from "./catalogPlans";
import { block, phase } from "./planBuild";
import type { PhaseId, Template, TemplateBlock, TrackMode, Unit } from "./types";
import { vitalMove } from "./vital";

const swing = vitalMove("kettlebell-swing");
const kbPress = vitalMove("kettlebell-overhead-press");
const lift = vitalMove("kettlebell-lift-up");
const march = vitalMove("kettlebell-hold-march");
const goblet = vitalMove("dumbbell-goblet-squat");
const walk = vitalMove("walk-on-treadmill");
const bike = vitalMove("cycling");
const thrust = vitalMove("barbell-hip-thrust");

const KETTLEBELL_TEMPLATES: Template[] = [
  {
    id: "swing-foundation",
    name: "Swing Foundation",
    focus: "The kettlebell swing",
    minutes: "~35–45 min",
    implement: "Kettlebell",
    phases: [
      phase("warmup", "optional", [
        block("swing-wu-hips", march, "1:00", { timeSec: 60, load: "light" }),
        block("swing-wu-hinge", lift, "8, light", { reps: 8, load: "light" }),
        block("swing-wu-goblet", goblet, "8, light", { reps: 8, load: "light" }),
      ]),
      phase("skill", "optional", [
        block("swing-sk-dead", swing, "3 sets of 5, light", {
          sets: 3,
          reps: 5,
          load: "light",
        }),
      ], undefined, "Light bell. Learn the move before you rush it."),
      phase("form", "recommended", [
        block("swing-form", swing, "4 sets of 8, a bell you can own, rest about a minute", {
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
          block("swing-bulk", swing, "8 sets of 10, same bell, rest 45–60 seconds", {
            sets: 8,
            reps: 10,
            restSec: 60,
            load: "working",
          }),
        ],
        "7–8",
      ),
      phase("cooldown", "optional", [
        block("swing-cd-fold", walk, "3:00, easy", { timeSec: 180 }),
        block("swing-cd-breathe", bike, "2:00, easy", { timeSec: 120 }),
      ]),
    ],
  },
  {
    id: "clean-path",
    name: "Clean Path",
    focus: "A kettlebell overhead press",
    minutes: "~35–45 min",
    implement: "Kettlebell",
    phases: [
      phase("warmup", "optional", [
        block("clean-wu-arm", march, "1:00", { timeSec: 60, load: "light" }),
        block("clean-wu-goblet", goblet, "8, light", { reps: 8, load: "light" }),
        block("clean-wu-t", lift, "6, light", { reps: 6, load: "light" }),
      ]),
      phase("skill", "optional", [
        block("clean-sk-rack", kbPress, "3 sets of 5 a side, light", {
          sets: 3,
          reps: 5,
          perSide: true,
          load: "light",
        }),
      ], undefined, "Light bell. Learn the move before you rush it."),
      phase("form", "recommended", [
        block("clean-form", kbPress, "4 sets of 5 a side, a bell you can own, rest about 75 seconds", {
          sets: 4,
          reps: 5,
          perSide: true,
          restSec: 75,
          load: "working",
        }),
      ]),
      phase(
        "bulk",
        "required",
        [
          block("clean-bulk", kbPress, "6 sets of 5 a side, rest 90 seconds", {
            sets: 6,
            reps: 5,
            perSide: true,
            restSec: 90,
            load: "working",
          }),
        ],
        "7–8",
      ),
      phase("cooldown", "optional", [
        block("clean-cd-child", walk, "3:00, easy", { timeSec: 180 }),
        block("clean-cd-breathe", bike, "2:00, easy", { timeSec: 120 }),
      ]),
    ],
  },
  {
    id: "get-up-primer",
    name: "Get-Up Primer",
    focus: "Kettlebell lift up, off the floor",
    minutes: "~35–45 min",
    implement: "Kettlebell",
    phases: [
      phase("warmup", "optional", [
        block("tgu-wu-bridge", thrust, "8, light", { reps: 8, load: "light" }),
        block("tgu-wu-kneel", goblet, "6, light", { reps: 6, load: "light" }),
        block("tgu-wu-breath", march, "1:00", { timeSec: 60, load: "light" }),
      ]),
      phase("skill", "optional", [
        block("tgu-sk-seg", lift, "3 sets of 5, light", {
          sets: 3,
          reps: 5,
          load: "light",
        }),
      ], undefined, "Light bell. Learn the move before you rush it."),
      phase("form", "recommended", [
        block("tgu-form-partial", lift, "4 sets of 5, a bell you can own, rest about a minute", {
          sets: 4,
          reps: 5,
          restSec: 60,
          load: "working",
        }),
      ]),
      phase(
        "bulk",
        "required",
        [
          block("tgu-bulk", lift, "5 sets of 5, rest when you need it", {
            sets: 5,
            reps: 5,
            restSec: 60,
            load: "working",
          }),
        ],
        "6–7",
      ),
      phase("cooldown", "optional", [
        block("tgu-cd-twist", walk, "3:00, easy", { timeSec: 180 }),
        block("tgu-cd-breathe", bike, "2:00, easy", { timeSec: 120 }),
      ]),
    ],
  },
];

export const TEMPLATES: Template[] = [...KETTLEBELL_TEMPLATES, ...CATALOG_TEMPLATES];

const BELLS: Record<string, Record<Unit, number>> = {
  "swing-foundation": { lb: 35, kg: 16 },
  "clean-path": { lb: 16, kg: 8 },
  "get-up-primer": { lb: 25, kg: 12 },
  "goblet-squat-path": { lb: 25, kg: 12 },
  "press-path": { lb: 20, kg: 8 },
  "chest-machines": { lb: 20, kg: 10 },
  "squat-basics": { lb: 45, kg: 20 },
  "deadlift-basics": { lb: 65, kg: 30 },
  "carry-lunges": { lb: 25, kg: 12 },
  "capable-strength": { lb: 20, kg: 8 },
  "carry-everyday": { lb: 20, kg: 8 },
  "steady-stance": { lb: 16, kg: 8 },
  "floor-to-stand": { lb: 25, kg: 12 },
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
