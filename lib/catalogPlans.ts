import type { Template } from "./types";
import { block, phase } from "./planBuild";

/**
 * Startable plans beyond the original three kettlebell sessions.
 * Every block name has a how-to. Pictures only where the free RepDB set has a still.
 */
export const CATALOG_TEMPLATES: Template[] = [
  {
    id: "goblet-squat-path",
    name: "Goblet Squat Path",
    focus: "An upright squat, bell at the chest. A dumbbell held the same way is fine.",
    minutes: "~35–45 min",
    implement: "Kettlebell",
    phases: [
      phase("warmup", "optional", [
        block("gob-wu-hip", "Hip circles", "1:00", { timeSec: 60 }),
        block("gob-wu-squat", "Bodyweight squat", "8", { reps: 8, load: "bodyweight" }),
        block("gob-wu-light", "Light goblet squat", "8", { reps: 8, load: "light" }),
      ]),
      phase("skill", "optional", [
        block("gob-sk-sit", "Sit-back, no bell", "8", { reps: 8, load: "empty" }),
        block("gob-sk-pause", "Goblet squat", "3 sets of 5, pause at the bottom, light", {
          sets: 3,
          reps: 5,
          load: "light",
        }),
      ]),
      phase("form", "recommended", [
        block("gob-form", "Goblet squat", "4 sets of 6, a bell you can own, rest about a minute", {
          sets: 4,
          reps: 6,
          restSec: 60,
          load: "working",
        }),
      ]),
      phase(
        "bulk",
        "required",
        [
          block("gob-bulk", "Goblet squat", "6 sets of 8, same bell, rest about a minute", {
            sets: 6,
            reps: 8,
            restSec: 60,
            load: "working",
          }),
        ],
        "7–8",
      ),
      phase("cooldown", "optional", [
        block("gob-cd-fold", "Forward fold", "1:00", { timeSec: 60 }),
        block("gob-cd-pigeon", "Pigeon", "45 seconds a side", { timeSec: 45, perSide: true }),
        block("gob-cd-breathe", "Box breathe", "2:00", { timeSec: 120 }),
      ]),
    ],
  },
  {
    id: "press-path",
    name: "Press Path",
    focus: "A quiet press. Floor first, then the bench if your shoulders like it.",
    minutes: "~35–45 min",
    implement: "Dumbbell",
    phases: [
      phase("warmup", "optional", [
        block("pr-wu-shoulder", "Slow shoulder circles", "45 seconds a side", { timeSec: 45, perSide: true }),
        block("pr-wu-wrist", "Kneeling wrist stretch", "30 seconds", { timeSec: 30 }),
        block("pr-wu-floor", "Dumbbell floor press", "8, light", { reps: 8, load: "light" }),
      ]),
      phase("skill", "optional", [
        block("pr-sk-floor", "Dumbbell floor press", "3 sets of 5, pause on the floor, light", {
          sets: 3,
          reps: 5,
          load: "light",
        }),
      ]),
      phase("form", "recommended", [
        block("pr-form", "Dumbbell bench press", "4 sets of 6, bells you can own, rest about a minute", {
          sets: 4,
          reps: 6,
          restSec: 60,
          load: "working",
        }),
      ]),
      phase(
        "bulk",
        "required",
        [
          block("pr-bulk", "Dumbbell bench press", "6 sets of 8, same bells, rest about 75 seconds", {
            sets: 6,
            reps: 8,
            restSec: 75,
            load: "working",
          }),
        ],
        "7–8",
      ),
      phase("cooldown", "optional", [
        block("pr-cd-cross", "Cross-body shoulder stretch", "30 seconds a side", { timeSec: 30, perSide: true }),
        block("pr-cd-child", "Child's pose", "1:00", { timeSec: 60 }),
        block("pr-cd-breathe", "Box breathe", "2:00", { timeSec: 120 }),
      ]),
    ],
  },
  {
    id: "row-path",
    name: "Row Path",
    focus: "Pull the elbow to the hip. The chest stays pointed the same way.",
    minutes: "~35–45 min",
    implement: "Dumbbell",
    phases: [
      phase("warmup", "optional", [
        block("row-wu-sit", "Sit-back, no bell", "8", { reps: 8, load: "empty" }),
        block("row-wu-cat", "Cat-cow", "6", { reps: 6, load: "bodyweight" }),
        block("row-wu-one", "Single-arm dumbbell row", "6 a side, light", { reps: 6, perSide: true, load: "light" }),
      ]),
      phase("skill", "optional", [
        block("row-sk", "Single-arm dumbbell row", "3 sets of 6 a side, light", {
          sets: 3,
          reps: 6,
          perSide: true,
          load: "light",
        }),
      ]),
      phase("form", "recommended", [
        block("row-form", "Bent-over dumbbell row", "4 sets of 8, bells you can own, rest about a minute", {
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
          block("row-bulk", "Bent-over dumbbell row", "6 sets of 8, same bells, rest about a minute", {
            sets: 6,
            reps: 8,
            restSec: 60,
            load: "working",
          }),
        ],
        "7–8",
      ),
      phase("cooldown", "optional", [
        block("row-cd-child", "Child's pose", "1:00", { timeSec: 60 }),
        block("row-cd-fold", "Forward fold", "1:00", { timeSec: 60 }),
        block("row-cd-breathe", "Box breathe", "2:00", { timeSec: 120 }),
      ]),
    ],
  },
  {
    id: "squat-basics",
    name: "Squat Basics",
    focus: "The bar on your back. Sit down, stand up, same path both ways.",
    minutes: "~40–50 min",
    implement: "Barbell",
    phases: [
      phase("warmup", "optional", [
        block("sq-wu-hip", "Hip circles", "1:00", { timeSec: 60 }),
        block("sq-wu-bw", "Bodyweight squat", "8", { reps: 8, load: "bodyweight" }),
        block("sq-wu-gob", "Light goblet squat", "6", { reps: 6, load: "light" }),
      ]),
      phase("skill", "optional", [
        block("sq-sk-pause", "Pause squat", "3 sets of 3, empty or light bar", {
          sets: 3,
          reps: 3,
          load: "light",
        }),
      ]),
      phase("form", "recommended", [
        block("sq-form", "Barbell back squat", "4 sets of 5, a bar you can own, rest about 90 seconds", {
          sets: 4,
          reps: 5,
          restSec: 90,
          load: "working",
        }),
      ]),
      phase(
        "bulk",
        "required",
        [
          block("sq-bulk", "Barbell back squat", "5 sets of 5, same bar, rest about 2 minutes", {
            sets: 5,
            reps: 5,
            restSec: 120,
            load: "working",
          }),
        ],
        "7–8",
      ),
      phase("cooldown", "optional", [
        block("sq-cd-fold", "Forward fold", "1:00", { timeSec: 60 }),
        block("sq-cd-pigeon", "Pigeon", "45 seconds a side", { timeSec: 45, perSide: true }),
        block("sq-cd-breathe", "Box breathe", "2:00", { timeSec: 120 }),
      ]),
    ],
  },
  {
    id: "bench-basics",
    name: "Bench Basics",
    focus: "Bar to the chest, press it up. Shoulders stay on the bench.",
    minutes: "~40–50 min",
    implement: "Barbell",
    phases: [
      phase("warmup", "optional", [
        block("bn-wu-shoulder", "Slow shoulder circles", "45 seconds a side", { timeSec: 45, perSide: true }),
        block("bn-wu-wrist", "Kneeling wrist stretch", "30 seconds", { timeSec: 30 }),
        block("bn-wu-floor", "Barbell floor press", "8, empty bar", { reps: 8, load: "light" }),
      ]),
      phase("skill", "optional", [
        block("bn-sk", "Barbell floor press", "3 sets of 5, pause on the floor, light", {
          sets: 3,
          reps: 5,
          load: "light",
        }),
      ]),
      phase("form", "recommended", [
        block("bn-form", "Bench press", "4 sets of 5, a bar you can own, rest about 90 seconds", {
          sets: 4,
          reps: 5,
          restSec: 90,
          load: "working",
        }),
      ]),
      phase(
        "bulk",
        "required",
        [
          block("bn-bulk", "Bench press", "5 sets of 5, same bar, rest about 2 minutes", {
            sets: 5,
            reps: 5,
            restSec: 120,
            load: "working",
          }),
        ],
        "7–8",
      ),
      phase("cooldown", "optional", [
        block("bn-cd-door", "Doorway chest stretch", "30 seconds a side", { timeSec: 30, perSide: true }),
        block("bn-cd-child", "Child's pose", "1:00", { timeSec: 60 }),
        block("bn-cd-breathe", "Box breathe", "2:00", { timeSec: 120 }),
      ]),
    ],
  },
  {
    id: "deadlift-basics",
    name: "Deadlift Basics",
    focus: "Hips back, bar close, stand up. Set it down the same way.",
    minutes: "~40–50 min",
    implement: "Barbell",
    phases: [
      phase("warmup", "optional", [
        block("dl-wu-sit", "Sit-back, no bell", "8", { reps: 8, load: "empty" }),
        block("dl-wu-cat", "Cat-cow", "6", { reps: 6, load: "bodyweight" }),
        block("dl-wu-rdl", "Romanian deadlift", "6, empty or light bar", { reps: 6, load: "light" }),
      ]),
      phase("skill", "optional", [
        block("dl-sk", "Romanian deadlift", "3 sets of 5, light", { sets: 3, reps: 5, load: "light" }),
      ]),
      phase("form", "recommended", [
        block("dl-form", "Barbell deadlift", "4 sets of 3, a bar you can own, rest about 2 minutes", {
          sets: 4,
          reps: 3,
          restSec: 120,
          load: "working",
        }),
      ]),
      phase(
        "bulk",
        "required",
        [
          block("dl-bulk", "Barbell deadlift", "5 sets of 3, same bar, rest about 2 minutes", {
            sets: 5,
            reps: 3,
            restSec: 120,
            load: "working",
          }),
        ],
        "7–8",
      ),
      phase("cooldown", "optional", [
        block("dl-cd-fold", "Forward fold", "1:00", { timeSec: 60 }),
        block("dl-cd-ham", "Easy hamstrings", "1:00 a side", { timeSec: 60, perSide: true }),
        block("dl-cd-breathe", "Box breathe", "2:00", { timeSec: 120 }),
      ]),
    ],
  },
  {
    id: "pull-ladder",
    name: "Pull Ladder",
    focus: "Hang first. Then the shoulder blades. Then a pull you can own.",
    minutes: "~35–45 min",
    implement: "Body weight",
    phases: [
      phase("warmup", "optional", [
        block("pu-wu-shoulder", "Slow shoulder circles", "45 seconds a side", { timeSec: 45, perSide: true }),
        block("pu-wu-hang", "Dead hang", "20 seconds", { timeSec: 20, load: "bodyweight" }),
        block("pu-wu-wrist", "Kneeling wrist stretch", "30 seconds", { timeSec: 30 }),
      ]),
      phase("skill", "optional", [
        block("pu-sk-scap", "Scapular pull-ups", "3 sets of 5", { sets: 3, reps: 5, load: "bodyweight" }),
        block("pu-sk-row", "Inverted row", "3 sets of 6", { sets: 3, reps: 6, load: "bodyweight" }),
      ]),
      phase("form", "recommended", [
        block("pu-form", "Negative pull-ups", "4 sets of 3, slow on the way down", {
          sets: 4,
          reps: 3,
          load: "bodyweight",
        }),
      ]),
      phase(
        "bulk",
        "required",
        [
          block("pu-bulk", "Pull-up", "5 sets of 3. Use the negative if the chin won't clear.", {
            sets: 5,
            reps: 3,
            restSec: 90,
            load: "bodyweight",
          }),
        ],
        "7–8",
      ),
      phase("cooldown", "optional", [
        block("pu-cd-hang", "Dead hang", "20 seconds", { timeSec: 20, load: "bodyweight" }),
        block("pu-cd-child", "Child's pose", "1:00", { timeSec: 60 }),
        block("pu-cd-breathe", "Box breathe", "2:00", { timeSec: 120 }),
      ]),
    ],
  },
  {
    id: "push-ladder",
    name: "Push Ladder",
    focus: "A clean push-up before the fancy angles. Wrists get a say.",
    minutes: "~35–45 min",
    implement: "Body weight",
    phases: [
      phase("warmup", "optional", [
        block("ps-wu-wrist", "Kneeling wrist stretch", "30 seconds", { timeSec: 30 }),
        block("ps-wu-cat", "Cat-cow", "6", { reps: 6, load: "bodyweight" }),
        block("ps-wu-plank", "High plank", "20 seconds", { timeSec: 20, load: "bodyweight" }),
      ]),
      phase("skill", "optional", [
        block("ps-sk-knee", "Knee push-ups", "2 sets of 6", { sets: 2, reps: 6, load: "bodyweight" }),
        block("ps-sk-inc", "Incline push-up", "2 sets of 6", { sets: 2, reps: 6, load: "bodyweight" }),
      ]),
      phase("form", "recommended", [
        block("ps-form", "Push-up", "4 sets of 5. Hands higher if the chest never gets close.", {
          sets: 4,
          reps: 5,
          load: "bodyweight",
        }),
      ]),
      phase(
        "bulk",
        "required",
        [
          block("ps-bulk", "Push-up", "5 sets of 6, rest about a minute. Same rung you can keep clean.", {
            sets: 5,
            reps: 6,
            restSec: 60,
            load: "bodyweight",
          }),
        ],
        "7–8",
      ),
      phase("cooldown", "optional", [
        block("ps-cd-door", "Doorway chest stretch", "30 seconds a side", { timeSec: 30, perSide: true }),
        block("ps-cd-child", "Child's pose", "1:00", { timeSec: 60 }),
        block("ps-cd-breathe", "Box breathe", "2:00", { timeSec: 120 }),
      ]),
    ],
  },
  {
    id: "squat-ladder",
    name: "Squat Ladder",
    focus: "Two legs first. Then a split. Then a step you can stand back up from.",
    minutes: "~35–45 min",
    implement: "Body weight",
    phases: [
      phase("warmup", "optional", [
        block("sl-wu-hip", "Hip circles", "1:00", { timeSec: 60 }),
        block("sl-wu-squat", "Bodyweight squat", "8", { reps: 8, load: "bodyweight" }),
        block("sl-wu-calf", "Standing calf stretch", "30 seconds a side", { timeSec: 30, perSide: true }),
      ]),
      phase("skill", "optional", [
        block("sl-sk-split", "Split squat", "3 sets of 5 a side", {
          sets: 3,
          reps: 5,
          perSide: true,
          load: "bodyweight",
        }),
        block("sl-sk-rev", "Bodyweight reverse lunge", "6 a side", { reps: 6, perSide: true, load: "bodyweight" }),
      ]),
      phase("form", "recommended", [
        block("sl-form", "Step-ups", "3 sets of 6 a side, a low step", {
          sets: 3,
          reps: 6,
          perSide: true,
          load: "bodyweight",
        }),
      ]),
      phase(
        "bulk",
        "required",
        [
          block("sl-bulk", "Walking lunge", "5 sets of 8 a side, rest about a minute", {
            sets: 5,
            reps: 8,
            perSide: true,
            restSec: 60,
            load: "bodyweight",
          }),
        ],
        "7–8",
      ),
      phase("cooldown", "optional", [
        block("sl-cd-pigeon", "Pigeon", "45 seconds a side", { timeSec: 45, perSide: true }),
        block("sl-cd-fold", "Forward fold", "1:00", { timeSec: 60 }),
        block("sl-cd-breathe", "Box breathe", "2:00", { timeSec: 120 }),
      ]),
    ],
  },
  {
    id: "handstand-wall-path",
    name: "Handstand Wall Path",
    focus: "Wrists, a pike, and the wall. No freestanding handstand today.",
    minutes: "~30–40 min",
    implement: "Body weight",
    phases: [
      phase("warmup", "optional", [
        block("hs-wu-wrist", "Kneeling wrist stretch", "30 seconds", { timeSec: 30 }),
        block("hs-wu-dog", "Downward-facing dog", "5 breaths", { reps: 5, load: "bodyweight" }),
        block("hs-wu-plank", "High plank", "20 seconds", { timeSec: 20, load: "bodyweight" }),
      ]),
      phase("skill", "optional", [
        block("hs-sk-wall", "Wall push-ups", "2 sets of 8", { sets: 2, reps: 8, load: "bodyweight" }),
        block("hs-sk-dolph", "Dolphin pose", "3 holds, easy", { sets: 3, reps: 1, load: "bodyweight" }),
      ]),
      phase("form", "recommended", [
        block("hs-form", "Pike push-ups", "4 sets of 4. Hips high. Head toward the floor.", {
          sets: 4,
          reps: 4,
          load: "bodyweight",
        }),
      ]),
      phase(
        "bulk",
        "required",
        [
          block("hs-bulk", "Pike push-ups", "5 sets of 5, rest about a minute. Stop if the shoulders pinch.", {
            sets: 5,
            reps: 5,
            restSec: 60,
            load: "bodyweight",
          }),
        ],
        "6–7",
      ),
      phase("cooldown", "optional", [
        block("hs-cd-wrist", "Kneeling wrist stretch", "30 seconds", { timeSec: 30 }),
        block("hs-cd-child", "Child's pose", "1:30", { timeSec: 90 }),
        block("hs-cd-breathe", "Box breathe", "2:00", { timeSec: 120 }),
      ]),
    ],
  },
  {
    id: "dip-support",
    name: "Dip & Support Strength",
    focus: "Hold yourself up first. Then bend the elbows only as far as the shoulders like.",
    minutes: "~30–40 min",
    implement: "Body weight",
    phases: [
      phase("warmup", "optional", [
        block("dp-wu-shoulder", "Slow shoulder circles", "45 seconds a side", { timeSec: 45, perSide: true }),
        block("dp-wu-plank", "High plank", "20 seconds", { timeSec: 20, load: "bodyweight" }),
        block("dp-wu-wrist", "Kneeling wrist stretch", "30 seconds", { timeSec: 30 }),
      ]),
      phase("skill", "optional", [
        block("dp-sk-plank", "High plank", "3 holds", { sets: 3, reps: 1, load: "bodyweight" }),
        block("dp-sk-bench", "Bench dips", "3 sets of 6", { sets: 3, reps: 6, load: "bodyweight" }),
      ]),
      phase("form", "recommended", [
        block("dp-form", "Bench dips", "4 sets of 8. Bend the knees if the shoulders complain.", {
          sets: 4,
          reps: 8,
          load: "bodyweight",
        }),
      ]),
      phase(
        "bulk",
        "required",
        [
          block("dp-bulk", "Straight bar dips", "5 sets of 3. Stay on the bench dip if the bar isn't yours yet.", {
            sets: 5,
            reps: 3,
            restSec: 75,
            load: "bodyweight",
          }),
        ],
        "7–8",
      ),
      phase("cooldown", "optional", [
        block("dp-cd-door", "Doorway chest stretch", "30 seconds a side", { timeSec: 30, perSide: true }),
        block("dp-cd-child", "Child's pose", "1:00", { timeSec: 60 }),
        block("dp-cd-breathe", "Box breathe", "2:00", { timeSec: 120 }),
      ]),
    ],
  },
  {
    id: "core-holds",
    name: "Core Holds Studio",
    focus: "Holds you can breathe in. Smaller shape beats a bigger one that shakes apart.",
    minutes: "~30–40 min",
    implement: "Body weight",
    phases: [
      phase("warmup", "optional", [
        block("co-wu-cat", "Cat-cow", "6", { reps: 6, load: "bodyweight" }),
        block("co-wu-bug", "Dead bug", "4 a side", { reps: 4, perSide: true, load: "bodyweight" }),
        block("co-wu-bridge", "Glute bridge", "8", { reps: 8, load: "bodyweight" }),
      ]),
      phase("skill", "optional", [
        block("co-sk-bug", "Dead bug", "3 sets of 4 a side", {
          sets: 3,
          reps: 4,
          perSide: true,
          load: "bodyweight",
        }),
        block("co-sk-bird", "Bird-dog", "3 sets of 4 a side", {
          sets: 3,
          reps: 4,
          perSide: true,
          load: "bodyweight",
        }),
      ]),
      phase("form", "recommended", [
        block("co-form-plank", "High plank", "3 holds", { sets: 3, reps: 1, load: "bodyweight" }),
        block("co-form-side", "Side plank", "2 a side", { sets: 2, reps: 1, perSide: true, load: "bodyweight" }),
      ]),
      phase(
        "bulk",
        "required",
        [
          block("co-bulk", "Hollow body hold", "5 holds. Make the shape smaller if the back peels up.", {
            sets: 5,
            reps: 1,
            restSec: 45,
            load: "bodyweight",
          }),
        ],
        "6–7",
      ),
      phase("cooldown", "optional", [
        block("co-cd-child", "Child's pose", "1:00", { timeSec: 60 }),
        block("co-cd-back", "Breathing on your back", "1:00", { timeSec: 60 }),
        block("co-cd-breathe", "Box breathe", "2:00", { timeSec: 120 }),
      ]),
    ],
  },
  {
    id: "muscle-up-approach",
    name: "Muscle-Up Approach",
    focus: "The pull and the dip, owned. The muscle-up itself only if the pull-up is already easy.",
    minutes: "~35–45 min",
    implement: "Body weight",
    phases: [
      phase("warmup", "optional", [
        block("mu-wu-hang", "Dead hang", "20 seconds", { timeSec: 20, load: "bodyweight" }),
        block("mu-wu-scap", "Scapular pull-ups", "8", { reps: 8, load: "bodyweight" }),
        block("mu-wu-wrist", "Kneeling wrist stretch", "30 seconds", { timeSec: 30 }),
      ]),
      phase("skill", "optional", [
        block("mu-sk-pull", "Pull-up", "3 sets of 3", { sets: 3, reps: 3, load: "bodyweight" }),
        block("mu-sk-dip", "Straight bar dips", "3 sets of 3", { sets: 3, reps: 3, load: "bodyweight" }),
        block("mu-sk-mu", "Muscle-up practice", "Only if the pull-up is easy. Otherwise skip.", {
          sets: 2,
          reps: 1,
          load: "bodyweight",
        }),
      ]),
      phase("form", "recommended", [
        block("mu-form", "Negative pull-ups", "4 sets of 3, slow", { sets: 4, reps: 3, load: "bodyweight" }),
      ]),
      phase(
        "bulk",
        "required",
        [
          block("mu-bulk", "Pull-up", "6 sets of 3, rest about 90 seconds. The muscle-up can wait.", {
            sets: 6,
            reps: 3,
            restSec: 90,
            load: "bodyweight",
          }),
        ],
        "7–8",
      ),
      phase("cooldown", "optional", [
        block("mu-cd-hang", "Dead hang", "20 seconds", { timeSec: 20, load: "bodyweight" }),
        block("mu-cd-child", "Child's pose", "1:00", { timeSec: 60 }),
        block("mu-cd-breathe", "Box breathe", "2:00", { timeSec: 120 }),
      ]),
    ],
  },
  {
    id: "full-body-circles",
    name: "Full-body joint circles",
    focus: "A slow pass, joint by joint. The free pictures cover the openers, not every circle.",
    minutes: "~20–30 min",
    implement: "Body weight",
    phases: [
      phase("warmup", "optional", [
        block("jc-wu-neck", "Neck side stretch", "20 seconds a side", { timeSec: 20, perSide: true }),
        block("jc-wu-side", "Standing side bend", "4 a side", { reps: 4, perSide: true, load: "bodyweight" }),
      ]),
      phase("skill", "optional", [
        block("jc-sk-hip", "Hip circles", "30 seconds a side", { timeSec: 30, perSide: true }),
        block("jc-sk-shoulder", "Slow shoulder circles", "30 seconds a side", { timeSec: 30, perSide: true }),
        block("jc-sk-cat", "Cat-cow", "6", { reps: 6, load: "bodyweight" }),
      ]),
      phase("form", "recommended", [
        block("jc-form-wgs", "World's greatest stretch", "3 a side", { reps: 3, perSide: true, load: "bodyweight" }),
        block("jc-form-dog", "Downward-facing dog", "5 breaths", { reps: 5, load: "bodyweight" }),
      ]),
      phase(
        "bulk",
        "required",
        [
          block("jc-bulk", "Cat-cow", "5 slow sets. One set is a full easy pass.", {
            sets: 5,
            reps: 4,
            restSec: 20,
            load: "bodyweight",
          }),
        ],
        "5–6",
      ),
      phase("cooldown", "optional", [
        block("jc-cd-fold", "Forward fold", "1:00", { timeSec: 60 }),
        block("jc-cd-child", "Child's pose", "1:00", { timeSec: 60 }),
        block("jc-cd-breathe", "Box breathe", "2:00", { timeSec: 120 }),
      ]),
    ],
  },
  {
    id: "hips-upper-back",
    name: "Hips and upper back",
    focus: "Hips and the middle of the back, for squat days and swing days.",
    minutes: "~25–35 min",
    implement: "Body weight",
    phases: [
      phase("warmup", "optional", [
        block("hu-wu-cat", "Cat-cow", "6", { reps: 6, load: "bodyweight" }),
        block("hu-wu-hip", "Hip circles", "30 seconds a side", { timeSec: 30, perSide: true }),
      ]),
      phase("skill", "optional", [
        block("hu-sk-90", "90/90 hip", "45 seconds a side", { timeSec: 45, perSide: true }),
        block("hu-sk-upper", "Upper-back openers", "4 a side", { reps: 4, perSide: true, load: "bodyweight" }),
      ]),
      phase("form", "recommended", [
        block("hu-form-p", "Pigeon", "45 seconds a side", { timeSec: 45, perSide: true, reps: 1, load: "bodyweight" }),
        block("hu-form-w", "World's greatest stretch", "3 a side", { reps: 3, perSide: true, load: "bodyweight" }),
      ]),
      phase(
        "bulk",
        "required",
        [
          block("hu-bulk", "Pigeon", "4 holds a side. Sit tall before you fold.", {
            sets: 4,
            reps: 1,
            perSide: true,
            restSec: 20,
            load: "bodyweight",
          }),
        ],
        "5–6",
      ),
      phase("cooldown", "optional", [
        block("hu-cd-twist", "Twist on your back", "45 seconds a side", { timeSec: 45, perSide: true }),
        block("hu-cd-child", "Child's pose", "1:00", { timeSec: 60 }),
        block("hu-cd-breathe", "Box breathe", "2:00", { timeSec: 120 }),
      ]),
    ],
  },
  {
    id: "shoulders-wrists",
    name: "Shoulders and wrists",
    focus: "Shoulders and wrists, before you press, hang, or go upside down.",
    minutes: "~20–30 min",
    implement: "Body weight",
    phases: [
      phase("warmup", "optional", [
        block("sw-wu-circle", "Slow shoulder circles", "45 seconds a side", { timeSec: 45, perSide: true }),
        block("sw-wu-wrist", "Kneeling wrist stretch", "30 seconds", { timeSec: 30 }),
      ]),
      phase("skill", "optional", [
        block("sw-sk-cross", "Cross-body shoulder stretch", "30 seconds a side", { timeSec: 30, perSide: true }),
        block("sw-sk-thread", "Upper-back openers", "4 a side", { reps: 4, perSide: true, load: "bodyweight" }),
      ]),
      phase("form", "recommended", [
        block("sw-form-door", "Doorway chest stretch", "30 seconds a side", {
          timeSec: 30,
          perSide: true,
          reps: 1,
          load: "bodyweight",
        }),
        block("sw-form-wrist", "Kneeling wrist stretch", "30 seconds", { timeSec: 30, reps: 1, load: "bodyweight" }),
      ]),
      phase(
        "bulk",
        "required",
        [
          block("sw-bulk", "Cross-body shoulder stretch", "5 easy holds a side.", {
            sets: 5,
            reps: 1,
            perSide: true,
            restSec: 15,
            load: "bodyweight",
          }),
        ],
        "4–5",
      ),
      phase("cooldown", "optional", [
        block("sw-cd-child", "Child's pose", "1:00", { timeSec: 60 }),
        block("sw-cd-neck", "Neck side stretch", "20 seconds a side", { timeSec: 20, perSide: true }),
        block("sw-cd-breathe", "Box breathe", "2:00", { timeSec: 120 }),
      ]),
    ],
  },
  {
    id: "steady-stance",
    name: "Steady Stance",
    focus: "One foot, then a slow line. A counter nearby is part of the plan.",
    minutes: "~20–30 min",
    implement: "Body weight",
    phases: [
      phase("warmup", "optional", [
        block("st-wu-calf", "Calf raise", "8", { reps: 8, load: "bodyweight" }),
        block("st-wu-stretch", "Standing calf stretch", "30 seconds a side", { timeSec: 30, perSide: true }),
      ]),
      phase("skill", "optional", [
        block("st-sk-tree", "Tree pose", "3 a side, hand on a counter if you want", {
          sets: 3,
          reps: 1,
          perSide: true,
          load: "bodyweight",
        }),
        block("st-sk-single", "Single-leg calf raise", "6 a side", { reps: 6, perSide: true, load: "bodyweight" }),
      ]),
      phase("form", "recommended", [
        block("st-form", "Tree pose", "3 holds a side. Take the hand away only when you feel steady.", {
          sets: 3,
          reps: 1,
          perSide: true,
          load: "bodyweight",
        }),
      ]),
      phase(
        "bulk",
        "required",
        [
          block("st-bulk", "Heel-to-toe walk", "5 passes. One pass is a rep. A wall can stay close.", {
            sets: 5,
            reps: 1,
            restSec: 20,
            load: "bodyweight",
          }),
        ],
        "5–6",
      ),
      phase("cooldown", "optional", [
        block("st-cd-calf", "Standing calf stretch", "30 seconds a side", { timeSec: 30, perSide: true }),
        block("st-cd-child", "Child's pose", "1:00", { timeSec: 60 }),
        block("st-cd-breathe", "Box breathe", "2:00", { timeSec: 120 }),
      ]),
    ],
  },
  {
    id: "floor-to-stand",
    name: "Floor-to-Stand Path",
    focus: "Down to the floor and back up, in pieces. No bell required.",
    minutes: "~25–35 min",
    implement: "Body weight",
    phases: [
      phase("warmup", "optional", [
        block("fs-wu-breath", "Breathing on your back", "1:00", { timeSec: 60 }),
        block("fs-wu-bridge", "Glute bridge", "8", { reps: 8, load: "bodyweight" }),
        block("fs-wu-hip", "Half-kneel hip open", "30 seconds a side", { timeSec: 30, perSide: true }),
      ]),
      phase("skill", "optional", [
        block("fs-sk-pieces", "Get-up pieces, no bell", "2 a side", {
          sets: 2,
          reps: 1,
          perSide: true,
          load: "bodyweight",
        }),
        block("fs-sk-bridge", "Glute bridge", "2 sets of 6", { sets: 2, reps: 6, load: "bodyweight" }),
      ]),
      phase("form", "recommended", [
        block("fs-form", "Partial get-up to hand", "3 a side, no bell", {
          sets: 3,
          reps: 1,
          perSide: true,
          load: "bodyweight",
        }),
      ]),
      phase(
        "bulk",
        "required",
        [
          block("fs-bulk", "Full get-up, no bell", "5 a side. Rest when you need it. One rep, then the other side.", {
            sets: 5,
            reps: 1,
            perSide: true,
            restSec: 30,
            load: "bodyweight",
          }),
        ],
        "6–7",
      ),
      phase("cooldown", "optional", [
        block("fs-cd-twist", "Twist on your back", "45 seconds a side", { timeSec: 45, perSide: true }),
        block("fs-cd-ham", "Easy hamstrings", "45 seconds a side", { timeSec: 45, perSide: true }),
        block("fs-cd-breathe", "Box breathe", "2:00", { timeSec: 120 }),
      ]),
    ],
  },
  {
    id: "get-up-bridge",
    name: "Get-Up Bridge",
    focus: "The pieces, then a light bell. Heavier get-ups still live in Get-Up Primer.",
    minutes: "~30–40 min",
    implement: "Kettlebell",
    phases: [
      phase("warmup", "optional", [
        block("gb-wu-breath", "Breathing on your back", "1:00", { timeSec: 60 }),
        block("gb-wu-bridge", "Glute bridge", "8", { reps: 8, load: "bodyweight" }),
        block("gb-wu-hip", "Half-kneel hip open", "30 seconds a side", { timeSec: 30, perSide: true }),
      ]),
      phase("skill", "optional", [
        block("gb-sk-naked", "Get-up pieces, no bell", "2 a side", {
          sets: 2,
          reps: 1,
          perSide: true,
          load: "bodyweight",
        }),
        block("gb-sk-press", "Floor press", "2 sets of 5 a side, light", {
          sets: 2,
          reps: 5,
          perSide: true,
          load: "light",
        }),
      ]),
      phase("form", "recommended", [
        block("gb-form", "Partial get-up to hand", "3 a side, light bell if you want one", {
          sets: 3,
          reps: 1,
          perSide: true,
          load: "light",
        }),
      ]),
      phase(
        "bulk",
        "required",
        [
          block("gb-bulk", "Full get-up", "4 singles a side, light bell, rest when you need it", {
            sets: 4,
            reps: 1,
            perSide: true,
            restSec: 45,
            load: "working",
          }),
        ],
        "6–7",
      ),
      phase("cooldown", "optional", [
        block("gb-cd-twist", "Twist on your back", "45 seconds a side", { timeSec: 45, perSide: true }),
        block("gb-cd-child", "Child's pose", "1:00", { timeSec: 60 }),
        block("gb-cd-breathe", "Box breathe", "2:00", { timeSec: 120 }),
      ]),
    ],
  },
  {
    id: "morning-mat-flow",
    name: "Morning Mat Flow",
    focus: "A short flow you can do before the day starts. Breath counts.",
    minutes: "~25–35 min",
    implement: "Body weight",
    phases: [
      phase("warmup", "optional", [
        block("mf-wu-easy", "Easy pose", "1:00", { timeSec: 60 }),
        block("mf-wu-cat", "Cat-cow", "6", { reps: 6, load: "bodyweight" }),
        block("mf-wu-child", "Child's pose", "30 seconds", { timeSec: 30 }),
      ]),
      phase("skill", "optional", [
        block("mf-sk-dog", "Downward-facing dog", "5 breaths", { reps: 5, load: "bodyweight" }),
        block("mf-sk-lunge", "Low lunge", "3 a side", { reps: 3, perSide: true, load: "bodyweight" }),
      ]),
      phase("form", "recommended", [
        block("mf-form-1", "Warrior I", "3 breaths a side", { reps: 3, perSide: true, load: "bodyweight" }),
        block("mf-form-2", "Warrior II", "3 breaths a side", { reps: 3, perSide: true, load: "bodyweight" }),
      ]),
      phase(
        "bulk",
        "required",
        [
          block("mf-bulk", "Down dog to low lunge", "5 slow passes a side", {
            sets: 5,
            reps: 1,
            perSide: true,
            restSec: 20,
            load: "bodyweight",
          }),
        ],
        "5–6",
      ),
      phase("cooldown", "optional", [
        block("mf-cd-child", "Child's pose", "1:00", { timeSec: 60 }),
        block("mf-cd-back", "Breathing on your back", "1:00", { timeSec: 60 }),
        block("mf-cd-breathe", "Box breathe", "2:00", { timeSec: 120 }),
      ]),
    ],
  },
  {
    id: "pilates-mat",
    name: "Pilates Mat Fundamentals",
    focus: "Roll, reach, and a bridge. A mat is enough. No reformer.",
    minutes: "~30–40 min",
    implement: "Body weight",
    phases: [
      phase("warmup", "optional", [
        block("pi-wu-roll", "Pilates roll down", "4", { reps: 4, load: "bodyweight" }),
        block("pi-wu-cat", "Cat-cow", "6", { reps: 6, load: "bodyweight" }),
      ]),
      phase("skill", "optional", [
        block("pi-sk-bug", "Dead bug", "4 a side", { reps: 4, perSide: true, load: "bodyweight" }),
        block("pi-sk-bridge", "Glute bridge", "8", { reps: 8, load: "bodyweight" }),
      ]),
      phase("form", "recommended", [
        block("pi-form-spine", "Pilates spine stretch", "4", { reps: 4, load: "bodyweight" }),
        block("pi-form-saw", "Pilates saw", "4 a side", { reps: 4, perSide: true, load: "bodyweight" }),
      ]),
      phase(
        "bulk",
        "required",
        [
          block("pi-bulk", "Pilates roll down", "6 slow sets", {
            sets: 6,
            reps: 3,
            restSec: 20,
            load: "bodyweight",
          }),
        ],
        "5–6",
      ),
      phase("cooldown", "optional", [
        block("pi-cd-child", "Child's pose", "1:00", { timeSec: 60 }),
        block("pi-cd-back", "Breathing on your back", "1:00", { timeSec: 60 }),
        block("pi-cd-breathe", "Box breathe", "2:00", { timeSec: 120 }),
      ]),
    ],
  },
  {
    id: "easy-hip-strength",
    name: "Easy hip strength",
    focus: "Glutes and the side of the hip. Quiet reps. Nothing sharp.",
    minutes: "~25–35 min",
    implement: "Body weight",
    phases: [
      phase("warmup", "optional", [
        block("eh-wu-cat", "Cat-cow", "6", { reps: 6, load: "bodyweight" }),
        block("eh-wu-bridge", "Glute bridge", "8", { reps: 8, load: "bodyweight" }),
        block("eh-wu-clam", "Clamshells", "8 a side", { reps: 8, perSide: true, load: "bodyweight" }),
      ]),
      phase("skill", "optional", [
        block("eh-sk-bridge", "Glute bridge", "2 sets of 8", { sets: 2, reps: 8, load: "bodyweight" }),
        block("eh-sk-clam", "Clamshells", "2 sets of 8 a side", {
          sets: 2,
          reps: 8,
          perSide: true,
          load: "bodyweight",
        }),
      ]),
      phase("form", "recommended", [
        block("eh-form", "Single-leg glute bridge", "3 sets of 6 a side", {
          sets: 3,
          reps: 6,
          perSide: true,
          load: "bodyweight",
        }),
      ]),
      phase(
        "bulk",
        "required",
        [
          block("eh-bulk", "Glute bridge", "5 sets of 10, rest about 30 seconds", {
            sets: 5,
            reps: 10,
            restSec: 30,
            load: "bodyweight",
          }),
        ],
        "6–7",
      ),
      phase("cooldown", "optional", [
        block("eh-cd-pigeon", "Pigeon", "45 seconds a side", { timeSec: 45, perSide: true }),
        block("eh-cd-child", "Child's pose", "1:00", { timeSec: 60 }),
        block("eh-cd-breathe", "Box breathe", "2:00", { timeSec: 120 }),
      ]),
    ],
  },
  {
    id: "breath-and-settle",
    name: "Breath and settle",
    focus: "Downshift. Long breaths, easy folds, nothing to beat.",
    minutes: "~20–30 min",
    implement: "Body weight",
    phases: [
      phase("warmup", "optional", [
        block("br-wu-back", "Breathing on your back", "1:00", { timeSec: 60 }),
        block("br-wu-neck", "Neck side stretch", "20 seconds a side", { timeSec: 20, perSide: true }),
      ]),
      phase("skill", "optional", [
        block("br-sk-box", "Box breathe", "1:00", { timeSec: 60, reps: 1, load: "bodyweight" }),
        block("br-sk-child", "Child's pose", "45 seconds", { timeSec: 45, reps: 1, load: "bodyweight" }),
      ]),
      phase("form", "recommended", [
        block("br-form-fold", "Seated forward fold", "1:00", { timeSec: 60, reps: 1, load: "bodyweight" }),
        block("br-form-easy", "Easy pose", "1:00", { timeSec: 60, reps: 1, load: "bodyweight" }),
      ]),
      phase(
        "bulk",
        "required",
        [
          block("br-bulk", "Box breathe", "5 rounds. One round is a rep. In, hold, out, hold.", {
            sets: 5,
            reps: 1,
            restSec: 15,
            load: "bodyweight",
          }),
        ],
        "3–4",
      ),
      phase("cooldown", "optional", [
        block("br-cd-wall", "Legs up the wall", "2:00", { timeSec: 120 }),
        block("br-cd-back", "Breathing on your back", "1:00", { timeSec: 60 }),
        block("br-cd-child", "Child's pose", "1:00", { timeSec: 60 }),
      ]),
    ],
  },
  {
    id: "core-control-mat",
    name: "Core Control on the Mat",
    focus: "Dead bug, a plank, a hollow. The back stays down.",
    minutes: "~30–40 min",
    implement: "Body weight",
    phases: [
      phase("warmup", "optional", [
        block("cm-wu-cat", "Cat-cow", "6", { reps: 6, load: "bodyweight" }),
        block("cm-wu-bug", "Dead bug", "4 a side", { reps: 4, perSide: true, load: "bodyweight" }),
      ]),
      phase("skill", "optional", [
        block("cm-sk-bug", "Dead bug", "3 sets of 4 a side", {
          sets: 3,
          reps: 4,
          perSide: true,
          load: "bodyweight",
        }),
        block("cm-sk-bird", "Bird-dog", "3 sets of 4 a side", {
          sets: 3,
          reps: 4,
          perSide: true,
          load: "bodyweight",
        }),
      ]),
      phase("form", "recommended", [
        block("cm-form-leg", "Pilates leg pull", "3 sets of 4 a side", {
          sets: 3,
          reps: 4,
          perSide: true,
          load: "bodyweight",
        }),
        block("cm-form-side", "Side plank", "2 a side", { sets: 2, reps: 1, perSide: true, load: "bodyweight" }),
      ]),
      phase(
        "bulk",
        "required",
        [
          block("cm-bulk", "Hollow body hold", "5 holds. Smaller if the back lifts.", {
            sets: 5,
            reps: 1,
            restSec: 40,
            load: "bodyweight",
          }),
        ],
        "6–7",
      ),
      phase("cooldown", "optional", [
        block("cm-cd-child", "Child's pose", "1:00", { timeSec: 60 }),
        block("cm-cd-back", "Breathing on your back", "1:00", { timeSec: 60 }),
        block("cm-cd-breathe", "Box breathe", "2:00", { timeSec: 120 }),
      ]),
    ],
  },
  {
    id: "station-skills",
    name: "Station Skills Primer",
    focus: "A few stations, practiced clean. Not a race and not a leaderboard.",
    minutes: "~30–40 min",
    implement: "Body weight",
    phases: [
      phase("warmup", "optional", [
        block("ss-wu-jack", "Jumping jacks", "30 seconds", { timeSec: 30, load: "bodyweight" }),
        block("ss-wu-wgs", "World's greatest stretch", "3 a side", { reps: 3, perSide: true, load: "bodyweight" }),
        block("ss-wu-hip", "Hip circles", "30 seconds a side", { timeSec: 30, perSide: true }),
      ]),
      phase("skill", "optional", [
        block("ss-sk-swing", "Two-hand swing", "2 sets of 8, light", { sets: 2, reps: 8, load: "light" }),
        block("ss-sk-gob", "Goblet squat", "8, light", { reps: 8, load: "light" }),
        block("ss-sk-push", "Push-up", "6", { reps: 6, load: "bodyweight" }),
      ]),
      phase("form", "recommended", [
        block("ss-form", "Burpees", "3 sets of 5, step back if you want. No prize for sloppy.", {
          sets: 3,
          reps: 5,
          load: "bodyweight",
        }),
      ]),
      phase(
        "bulk",
        "required",
        [
          block("ss-bulk", "Burpees", "6 sets of 6, rest about a minute. Step, don't dive.", {
            sets: 6,
            reps: 6,
            restSec: 60,
            load: "bodyweight",
          }),
        ],
        "7–8",
      ),
      phase("cooldown", "optional", [
        block("ss-cd-fold", "Forward fold", "1:00", { timeSec: 60 }),
        block("ss-cd-child", "Child's pose", "1:00", { timeSec: 60 }),
        block("ss-cd-breathe", "Box breathe", "2:00", { timeSec: 120 }),
      ]),
    ],
  },
  {
    id: "erg-intervals",
    name: "Erg intervals",
    focus: "The rower, then a short bike. Legs push first. You should still know your name.",
    minutes: "~30–40 min",
    implement: "Rower",
    phases: [
      phase("warmup", "optional", [
        block("er-wu-row", "Rowing machine", "2 easy minutes", { timeSec: 120, load: "bodyweight" }),
        block("er-wu-cat", "Cat-cow", "6", { reps: 6, load: "bodyweight" }),
      ]),
      phase("skill", "optional", [
        block("er-sk-row", "Rowing machine", "3 sets of 10 easy strokes", {
          sets: 3,
          reps: 10,
          load: "bodyweight",
        }),
      ]),
      phase("form", "recommended", [
        block("er-form", "Air bike", "3 easy minutes. Sit tall.", { sets: 1, reps: 1, timeSec: 180, load: "bodyweight" }),
      ]),
      phase(
        "bulk",
        "required",
        [
          block("er-bulk", "Rowing machine", "6 sets of 20 strokes. Hard, but a stroke you can repeat.", {
            sets: 6,
            reps: 20,
            restSec: 60,
            load: "bodyweight",
          }),
        ],
        "7–8",
      ),
      phase("cooldown", "optional", [
        block("er-cd-fold", "Forward fold", "1:00", { timeSec: 60 }),
        block("er-cd-child", "Child's pose", "1:00", { timeSec: 60 }),
        block("er-cd-breathe", "Box breathe", "2:00", { timeSec: 120 }),
      ]),
    ],
  },
  {
    id: "mixed-stations",
    name: "Mixed station practice",
    focus: "Swing, squat, climbers, burpees. One station at a time.",
    minutes: "~35–45 min",
    implement: "Body weight",
    phases: [
      phase("warmup", "optional", [
        block("mx-wu-jack", "Jumping jacks", "30 seconds", { timeSec: 30 }),
        block("mx-wu-knees", "High knees", "20 seconds", { timeSec: 20, load: "bodyweight" }),
      ]),
      phase("skill", "optional", [
        block("mx-sk-swing", "Two-hand swing", "2 sets of 8, light", { sets: 2, reps: 8, load: "light" }),
        block("mx-sk-gob", "Goblet squat", "8, light", { reps: 8, load: "light" }),
      ]),
      phase("form", "recommended", [
        block("mx-form", "Mountain climbers", "3 sets of 10 a side", {
          sets: 3,
          reps: 10,
          perSide: true,
          load: "bodyweight",
        }),
      ]),
      phase(
        "bulk",
        "required",
        [
          block("mx-bulk", "Burpees", "6 sets of 5, rest about a minute", {
            sets: 6,
            reps: 5,
            restSec: 60,
            load: "bodyweight",
          }),
        ],
        "7–8",
      ),
      phase("cooldown", "optional", [
        block("mx-cd-child", "Child's pose", "1:00", { timeSec: 60 }),
        block("mx-cd-fold", "Forward fold", "1:00", { timeSec: 60 }),
        block("mx-cd-breathe", "Box breathe", "2:00", { timeSec: 120 }),
      ]),
    ],
  },
  {
    id: "race-week-easy",
    name: "Race week easy",
    focus: "Move, don't mash. A walk, an easy bike, then down.",
    minutes: "~25–35 min",
    implement: "Body weight",
    phases: [
      phase("warmup", "optional", [
        block("rw-wu-walk", "Walking", "3 easy minutes", { timeSec: 180, load: "bodyweight" }),
        block("rw-wu-neck", "Neck side stretch", "20 seconds a side", { timeSec: 20, perSide: true }),
      ]),
      phase("skill", "optional", [
        block("rw-sk-easy", "Easy pose", "1:00", { timeSec: 60, reps: 1, load: "bodyweight" }),
        block("rw-sk-cat", "Cat-cow", "6", { reps: 6, load: "bodyweight" }),
      ]),
      phase("form", "recommended", [
        block("rw-form", "Stationary bike", "5 easy minutes", { timeSec: 300, reps: 1, load: "bodyweight" }),
      ]),
      phase(
        "bulk",
        "required",
        [
          block("rw-bulk", "Incline walk", "5 short easy bouts. You can talk the whole time.", {
            sets: 5,
            reps: 1,
            restSec: 30,
            load: "bodyweight",
          }),
        ],
        "4–5",
      ),
      phase("cooldown", "optional", [
        block("rw-cd-child", "Child's pose", "1:00", { timeSec: 60 }),
        block("rw-cd-wall", "Legs up the wall", "2:00", { timeSec: 120 }),
        block("rw-cd-breathe", "Box breathe", "2:00", { timeSec: 120 }),
      ]),
    ],
  },
  {
    id: "carry-lunges",
    name: "Carry & Lunges Path",
    focus: "Walk with a bell, then lunge with it. Tall the whole time.",
    minutes: "~30–40 min",
    implement: "Kettlebell",
    phases: [
      phase("warmup", "optional", [
        block("cl-wu-rev", "Bodyweight reverse lunge", "6 a side", { reps: 6, perSide: true, load: "bodyweight" }),
        block("cl-wu-hip", "Hip circles", "30 seconds a side", { timeSec: 30, perSide: true }),
        block("cl-wu-gob", "Goblet squat", "6, light", { reps: 6, load: "light" }),
      ]),
      phase("skill", "optional", [
        block("cl-sk-lunge", "Kettlebell reverse lunge", "3 sets of 4 a side, light", {
          sets: 3,
          reps: 4,
          perSide: true,
          load: "light",
        }),
        block("cl-sk-suit", "Suitcase carry", "2 passes a side", { sets: 2, reps: 1, perSide: true, load: "light" }),
      ]),
      phase("form", "recommended", [
        block("cl-form", "Farmer's walk", "4 passes, bells you can own", {
          sets: 4,
          reps: 1,
          load: "working",
        }),
      ]),
      phase(
        "bulk",
        "required",
        [
          block("cl-bulk", "Goblet lunge", "5 sets of 6 a side, rest about a minute", {
            sets: 5,
            reps: 6,
            perSide: true,
            restSec: 60,
            load: "working",
          }),
        ],
        "7–8",
      ),
      phase("cooldown", "optional", [
        block("cl-cd-pigeon", "Pigeon", "45 seconds a side", { timeSec: 45, perSide: true }),
        block("cl-cd-fold", "Forward fold", "1:00", { timeSec: 60 }),
        block("cl-cd-breathe", "Box breathe", "2:00", { timeSec: 120 }),
      ]),
    ],
  },
  {
    id: "golf-gym-prep",
    name: "Golf Gym Prep",
    focus: "Hips and a turn you can do in a gym. No swing to copy. No video.",
    minutes: "~30–40 min",
    implement: "Kettlebell",
    phases: [
      phase("warmup", "optional", [
        block("gf-wu-hip", "Hip circles", "30 seconds a side", { timeSec: 30, perSide: true }),
        block("gf-wu-cat", "Cat-cow", "6", { reps: 6, load: "bodyweight" }),
        block("gf-wu-wgs", "World's greatest stretch", "3 a side", { reps: 3, perSide: true, load: "bodyweight" }),
      ]),
      phase("skill", "optional", [
        block("gf-sk-halo", "Kettlebell halo", "5 each way, light", { sets: 2, reps: 5, load: "light" }),
        block("gf-sk-rot", "Rotational lunge", "4 a side, light", { reps: 4, perSide: true, load: "light" }),
      ]),
      phase("form", "recommended", [
        block("gf-form", "Rotational lunge", "4 sets of 4 a side, a bell you can own", {
          sets: 4,
          reps: 4,
          perSide: true,
          load: "working",
        }),
      ]),
      phase(
        "bulk",
        "required",
        [
          block("gf-bulk", "Kettlebell halo", "6 sets of 6 each way, rest about 45 seconds", {
            sets: 6,
            reps: 6,
            restSec: 45,
            load: "working",
          }),
        ],
        "6–7",
      ),
      phase("cooldown", "optional", [
        block("gf-cd-twist", "Twist on your back", "45 seconds a side", { timeSec: 45, perSide: true }),
        block("gf-cd-pigeon", "Pigeon", "45 seconds a side", { timeSec: 45, perSide: true }),
        block("gf-cd-breathe", "Box breathe", "2:00", { timeSec: 120 }),
      ]),
    ],
  },
  {
    id: "hangboard-practice",
    name: "Hangboard Practice Block",
    focus: "A bar hang you can breathe in. Fingerboard work is words only — the free set has no fingerboard picture.",
    minutes: "~25–35 min",
    implement: "Body weight",
    phases: [
      phase("warmup", "optional", [
        block("hb-wu-wrist", "Kneeling wrist stretch", "30 seconds", { timeSec: 30 }),
        block("hb-wu-shoulder", "Slow shoulder circles", "30 seconds a side", { timeSec: 30, perSide: true }),
        block("hb-wu-hang", "Dead hang", "15 seconds", { timeSec: 15, load: "bodyweight" }),
      ]),
      phase("skill", "optional", [
        block("hb-sk-scap", "Scapular pull-ups", "3 sets of 5", { sets: 3, reps: 5, load: "bodyweight" }),
        block("hb-sk-finger", "Fingerboard hang", "Skip if you don't have a board. Short hangs only.", {
          sets: 3,
          reps: 1,
          load: "bodyweight",
        }),
      ]),
      phase("form", "recommended", [
        block("hb-form", "Dead hang", "4 hangs. Step off while the breath is still easy.", {
          sets: 4,
          reps: 1,
          load: "bodyweight",
        }),
      ]),
      phase(
        "bulk",
        "required",
        [
          block("hb-bulk", "Dead hang", "5 hangs. One hang is a rep. Shoulders down.", {
            sets: 5,
            reps: 1,
            restSec: 60,
            load: "bodyweight",
          }),
        ],
        "6–7",
      ),
      phase("cooldown", "optional", [
        block("hb-cd-wrist", "Kneeling wrist stretch", "30 seconds", { timeSec: 30 }),
        block("hb-cd-child", "Child's pose", "1:00", { timeSec: 60 }),
        block("hb-cd-breathe", "Box breathe", "2:00", { timeSec: 120 }),
      ]),
    ],
  },
  {
    id: "shadow-boxing",
    name: "Shadow Boxing Rounds",
    focus: "Hands up, light feet, punch the air. No picture in the free set — the words carry it.",
    minutes: "~25–35 min",
    implement: "Body weight",
    phases: [
      phase("warmup", "optional", [
        block("sb-wu-jack", "Jumping jacks", "30 seconds", { timeSec: 30 }),
        block("sb-wu-neck", "Neck side stretch", "20 seconds a side", { timeSec: 20, perSide: true }),
        block("sb-wu-shoulder", "Slow shoulder circles", "30 seconds a side", { timeSec: 30, perSide: true }),
      ]),
      phase("skill", "optional", [
        block("sb-sk", "Shadow boxing", "2 easy rounds. Hands come back to the cheeks.", {
          sets: 2,
          reps: 1,
          load: "bodyweight",
        }),
      ]),
      phase("form", "recommended", [
        block("sb-form", "Shadow boxing", "3 rounds. Snap the hand back. Don't load up.", {
          sets: 3,
          reps: 1,
          load: "bodyweight",
        }),
      ]),
      phase(
        "bulk",
        "required",
        [
          block("sb-bulk", "Shadow boxing", "5 rounds. Rest about a minute. Shoulders stay down.", {
            sets: 5,
            reps: 1,
            restSec: 60,
            load: "bodyweight",
          }),
        ],
        "6–7",
      ),
      phase("cooldown", "optional", [
        block("sb-cd-cross", "Cross-body shoulder stretch", "30 seconds a side", { timeSec: 30, perSide: true }),
        block("sb-cd-child", "Child's pose", "1:00", { timeSec: 60 }),
        block("sb-cd-breathe", "Box breathe", "2:00", { timeSec: 120 }),
      ]),
    ],
  },
  {
    id: "power-in-the-turn",
    name: "Power in the turn",
    focus: "Turn from the hips and ribs. A light bell. Nothing that wrenches the low back.",
    minutes: "~30–40 min",
    implement: "Kettlebell",
    phases: [
      phase("warmup", "optional", [
        block("tn-wu-hip", "Hip circles", "30 seconds a side", { timeSec: 30, perSide: true }),
        block("tn-wu-cat", "Cat-cow", "6", { reps: 6, load: "bodyweight" }),
        block("tn-wu-wgs", "World's greatest stretch", "3 a side", { reps: 3, perSide: true, load: "bodyweight" }),
      ]),
      phase("skill", "optional", [
        block("tn-sk-halo", "Kettlebell halo", "5 each way, light", { sets: 2, reps: 5, load: "light" }),
        block("tn-sk-twist", "Kettlebell russian twist", "8 a side, light", {
          reps: 8,
          perSide: true,
          load: "light",
        }),
      ]),
      phase("form", "recommended", [
        block("tn-form", "Rotational lunge", "4 sets of 4 a side", {
          sets: 4,
          reps: 4,
          perSide: true,
          load: "working",
        }),
      ]),
      phase(
        "bulk",
        "required",
        [
          block("tn-bulk", "Rotational lunge", "5 sets of 5 a side, rest about a minute", {
            sets: 5,
            reps: 5,
            perSide: true,
            restSec: 60,
            load: "working",
          }),
        ],
        "7–8",
      ),
      phase("cooldown", "optional", [
        block("tn-cd-twist", "Twist on your back", "45 seconds a side", { timeSec: 45, perSide: true }),
        block("tn-cd-pigeon", "Pigeon", "45 seconds a side", { timeSec: 45, perSide: true }),
        block("tn-cd-breathe", "Box breathe", "2:00", { timeSec: 120 }),
      ]),
    ],
  },
  {
    id: "day-before-easy",
    name: "Day-before easy",
    focus: "The day before you play. A walk and a few easy openers. Leave the hard stuff.",
    minutes: "~20–30 min",
    implement: "Body weight",
    phases: [
      phase("warmup", "optional", [
        block("db-wu-walk", "Walking", "3 easy minutes", { timeSec: 180, load: "bodyweight" }),
        block("db-wu-neck", "Neck side stretch", "20 seconds a side", { timeSec: 20, perSide: true }),
      ]),
      phase("skill", "optional", [
        block("db-sk-cat", "Cat-cow", "6", { reps: 6, load: "bodyweight" }),
        block("db-sk-wgs", "World's greatest stretch", "2 a side", { reps: 2, perSide: true, load: "bodyweight" }),
      ]),
      phase("form", "recommended", [
        block("db-form-child", "Child's pose", "1:00", { timeSec: 60, reps: 1, load: "bodyweight" }),
        block("db-form-fold", "Forward fold", "1:00", { timeSec: 60, reps: 1, load: "bodyweight" }),
      ]),
      phase(
        "bulk",
        "required",
        [
          block("db-bulk", "Walking", "5 easy bouts. Full sentences. That's the effort.", {
            sets: 5,
            reps: 1,
            restSec: 20,
            load: "bodyweight",
          }),
        ],
        "3–4",
      ),
      phase("cooldown", "optional", [
        block("db-cd-back", "Breathing on your back", "1:00", { timeSec: 60 }),
        block("db-cd-wall", "Legs up the wall", "2:00", { timeSec: 120 }),
        block("db-cd-breathe", "Box breathe", "2:00", { timeSec: 120 }),
      ]),
    ],
  },
  {
    id: "capable-strength",
    name: "Capable Strength",
    focus: "A squat you can stand up from, and a carry. Kinder loads. Same shapes.",
    minutes: "~30–40 min",
    implement: "Kettlebell",
    phases: [
      phase("warmup", "optional", [
        block("cp-wu-bridge", "Glute bridge", "8", { reps: 8, load: "bodyweight" }),
        block("cp-wu-sit", "Sit-back, no bell", "6", { reps: 6, load: "empty" }),
        block("cp-wu-squat", "Bodyweight squat", "6", { reps: 6, load: "bodyweight" }),
      ]),
      phase("skill", "optional", [
        block("cp-sk-gob", "Goblet squat", "3 sets of 5, light", { sets: 3, reps: 5, load: "light" }),
        block("cp-sk-suit", "Suitcase carry", "2 passes a side, light", {
          sets: 2,
          reps: 1,
          perSide: true,
          load: "light",
        }),
      ]),
      phase("form", "recommended", [
        block("cp-form", "Goblet squat", "4 sets of 6, a bell you can own", {
          sets: 4,
          reps: 6,
          restSec: 60,
          load: "working",
        }),
      ]),
      phase(
        "bulk",
        "required",
        [
          block("cp-bulk", "Goblet squat", "5 sets of 6, rest about a minute. Leave a rep in the tank.", {
            sets: 5,
            reps: 6,
            restSec: 60,
            load: "working",
          }),
        ],
        "6–7",
      ),
      phase("cooldown", "optional", [
        block("cp-cd-fold", "Forward fold", "1:00", { timeSec: 60 }),
        block("cp-cd-child", "Child's pose", "1:00", { timeSec: 60 }),
        block("cp-cd-breathe", "Box breathe", "2:00", { timeSec: 120 }),
      ]),
    ],
  },
  {
    id: "carry-everyday",
    name: "Carry Everyday",
    focus: "The groceries, practiced. One bell, then two. Tall. Short steps.",
    minutes: "~25–35 min",
    implement: "Kettlebell",
    phases: [
      phase("warmup", "optional", [
        block("ce-wu-squat", "Bodyweight squat", "6", { reps: 6, load: "bodyweight" }),
        block("ce-wu-hip", "Hip circles", "30 seconds a side", { timeSec: 30, perSide: true }),
        block("ce-wu-suit", "Suitcase carry", "1 easy pass a side", { reps: 1, perSide: true, load: "light" }),
      ]),
      phase("skill", "optional", [
        block("ce-sk-suit", "Suitcase carry", "3 passes a side, light", {
          sets: 3,
          reps: 1,
          perSide: true,
          load: "light",
        }),
      ]),
      phase("form", "recommended", [
        block("ce-form", "Farmer's walk", "4 passes. If you lean, lighten up.", {
          sets: 4,
          reps: 1,
          load: "working",
        }),
      ]),
      phase(
        "bulk",
        "required",
        [
          block("ce-bulk", "Farmer's walk", "6 passes, rest about 45 seconds. Set the bells down. Don't drop them.", {
            sets: 6,
            reps: 1,
            restSec: 45,
            load: "working",
          }),
        ],
        "6–7",
      ),
      phase("cooldown", "optional", [
        block("ce-cd-fold", "Forward fold", "1:00", { timeSec: 60 }),
        block("ce-cd-child", "Child's pose", "1:00", { timeSec: 60 }),
        block("ce-cd-breathe", "Box breathe", "2:00", { timeSec: 120 }),
      ]),
    ],
  },
  {
    id: "move-freer-easy",
    name: "Move Freer Easy Day",
    focus: "An easy day. A few openers, nothing to prove.",
    minutes: "~20–30 min",
    implement: "Body weight",
    phases: [
      phase("warmup", "optional", [
        block("me-wu-cat", "Cat-cow", "6", { reps: 6, load: "bodyweight" }),
        block("me-wu-neck", "Neck side stretch", "20 seconds a side", { timeSec: 20, perSide: true }),
      ]),
      phase("skill", "optional", [
        block("me-sk-wgs", "World's greatest stretch", "3 a side", { reps: 3, perSide: true, load: "bodyweight" }),
        block("me-sk-hip", "Hip circles", "30 seconds a side", { timeSec: 30, perSide: true }),
      ]),
      phase("form", "recommended", [
        block("me-form-p", "Pigeon", "45 seconds a side", { timeSec: 45, perSide: true, reps: 1, load: "bodyweight" }),
        block("me-form-fold", "Forward fold", "1:00", { timeSec: 60, reps: 1, load: "bodyweight" }),
      ]),
      phase(
        "bulk",
        "required",
        [
          block("me-bulk", "Cat-cow", "5 slow sets. Stay in the sticky spots.", {
            sets: 5,
            reps: 4,
            restSec: 15,
            load: "bodyweight",
          }),
        ],
        "4–5",
      ),
      phase("cooldown", "optional", [
        block("me-cd-child", "Child's pose", "1:00", { timeSec: 60 }),
        block("me-cd-back", "Breathing on your back", "1:00", { timeSec: 60 }),
        block("me-cd-breathe", "Box breathe", "2:00", { timeSec: 120 }),
      ]),
    ],
  },
];
