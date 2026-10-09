import type { Template } from "./types";
import { block, phase } from "./planBuild";
import { vitalMove } from "./vital";

/**
 * Startable plans beyond the day-one kettlebell sessions.
 * Every block name is a Vital clip. Moves the pack cannot show are not listed.
 */

const swing = vitalMove("kettlebell-swing");
const kbPress = vitalMove("kettlebell-overhead-press");
const lift = vitalMove("kettlebell-lift-up");
const march = vitalMove("kettlebell-hold-march");
const goblet = vitalMove("dumbbell-goblet-squat");
const hinge = vitalMove("dumbbell-hip-hinge");
const dbSplit = vitalMove("dumbbell-bulgarian-split-squat");
const jumpSquat = vitalMove("dumbbell-jump-squat");
const dbPress = vitalMove("dumbbell-overhead-standard");
const arnold = vitalMove("arnold-press-dumbbell");
const frontRaise = vitalMove("front-raise-dumbbell");
const laterals = vitalMove("lateral-raises-dumbbell");
const backSquat = vitalMove("barbell-back-squat");
const frontSquat = vitalMove("barbell-front-squat");
const barMarch = vitalMove("barbell-march");
const reverseLunge = vitalMove("barbell-reverse-lunges");
const rdl = vitalMove("barbell-romanian-deadlift");
const barSplit = vitalMove("barbell-bulgarian-split-squat");
const thrust = vitalMove("barbell-hip-thrust");
const walk = vitalMove("walk-on-treadmill");
const bike = vitalMove("cycling");
const airBike = vitalMove("air-bike-sprint");
const rope = vitalMove("rope-wave");
const rower = vitalMove("rowing-machine");
const elliptical = vitalMove("elliptical-hiit-machine");
const stepmill = vitalMove("stepmill-machine");
const run = vitalMove("run-on-treadmill");
const legPress = vitalMove("leg-press-machine");
const stepUps = vitalMove("step-ups-weighted");
const abduction = vitalMove("hip-abduction-machine");
const kickback = vitalMove("cable-leg-kickback");
const legCurl = vitalMove("lying-leg-curl-machine");
const stiff = vitalMove("stiff-legged-deadlift-machine");
const pushdown = vitalMove("triceps-pushdown-cable-rope");
const rearDelt = vitalMove("rear-delt-fly-reverse-pec-deck");
const pecDeck = vitalMove("pec-deck-machine-fly");
const svend = vitalMove("svend-press-chest");
const hack = vitalMove("hack-squat-machine");

export const CATALOG_TEMPLATES: Template[] = [
  {
    id: "goblet-squat-path",
    name: "Goblet Squat Path",
    focus: "An upright squat, dumbbell at the chest.",
    minutes: "~35–45 min",
    implement: "Dumbbell",
    phases: [
      phase("warmup", "optional", [
        block("gob-wu-hinge", hinge, "8, light", { reps: 8, load: "light" }),
        block("gob-wu-march", march, "1:00", { timeSec: 60, load: "light" }),
        block("gob-wu-light", goblet, "8, light", { reps: 8, load: "light" }),
      ]),
      phase("skill", "optional", [
        block("gob-sk-split", dbSplit, "3 sets of 5 a side, light", {
          sets: 3,
          reps: 5,
          perSide: true,
          load: "light",
        }),
      ]),
      phase("form", "recommended", [
        block("gob-form", goblet, "4 sets of 6, a bell you can own, rest about a minute", {
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
          block("gob-bulk", goblet, "6 sets of 8, same bell, rest about a minute", {
            sets: 6,
            reps: 8,
            restSec: 60,
            load: "working",
          }),
        ],
        "7–8",
      ),
      phase("cooldown", "optional", [
        block("gob-cd-walk", walk, "3:00, easy", { timeSec: 180 }),
        block("gob-cd-bike", bike, "2:00, easy", { timeSec: 120 }),
      ]),
    ],
  },
  {
    id: "press-path",
    name: "Press Path",
    focus: "A dumbbell overhead press. No bench in this pack.",
    minutes: "~35–45 min",
    implement: "Dumbbell",
    phases: [
      phase("warmup", "optional", [
        block("pr-wu-front", frontRaise, "8, light", { reps: 8, load: "light" }),
        block("pr-wu-lat", laterals, "8, light", { reps: 8, load: "light" }),
      ]),
      phase("skill", "optional", [
        block("pr-sk-arnold", arnold, "3 sets of 5, light", { sets: 3, reps: 5, load: "light" }),
      ]),
      phase("form", "recommended", [
        block("pr-form", dbPress, "4 sets of 6, bells you can own, rest about a minute", {
          sets: 4,
          reps: 6,
          restSec: 60,
          load: "working",
        }),
        block("pr-form-tri", pushdown, "3 sets of 8, light", { sets: 3, reps: 8, load: "light" }),
      ]),
      phase(
        "bulk",
        "required",
        [
          block("pr-bulk", dbPress, "6 sets of 8, same bells, rest about 75 seconds", {
            sets: 6,
            reps: 8,
            restSec: 75,
            load: "working",
          }),
        ],
        "7–8",
      ),
      phase("cooldown", "optional", [
        block("pr-cd-rear", rearDelt, "12, light", { reps: 12, load: "light" }),
        block("pr-cd-walk", walk, "3:00, easy", { timeSec: 180 }),
      ]),
    ],
  },
  {
    id: "chest-machines",
    name: "Chest Machines",
    focus: "Pec deck and a plate press. This pack has no bench.",
    minutes: "~30–40 min",
    implement: "Machine",
    phases: [
      phase("warmup", "optional", [
        block("ch-wu-svend", svend, "8, light", { reps: 8, load: "light" }),
        block("ch-wu-front", frontRaise, "8, light", { reps: 8, load: "light" }),
      ]),
      phase("skill", "optional", [
        block("ch-sk", pecDeck, "3 sets of 8, light", { sets: 3, reps: 8, load: "light" }),
      ]),
      phase("form", "recommended", [
        block("ch-form", pecDeck, "4 sets of 8, a weight you can own, rest about a minute", {
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
          block("ch-bulk", pecDeck, "5 sets of 10, same weight, rest about a minute", {
            sets: 5,
            reps: 10,
            restSec: 60,
            load: "working",
          }),
        ],
        "7–8",
      ),
      phase("cooldown", "optional", [
        block("ch-cd-rear", rearDelt, "12, light", { reps: 12, load: "light" }),
        block("ch-cd-walk", walk, "3:00, easy", { timeSec: 180 }),
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
        block("sq-wu-march", march, "1:00", { timeSec: 60, load: "light" }),
        block("sq-wu-gob", goblet, "6, light", { reps: 6, load: "light" }),
        block("sq-wu-bar", barMarch, "8, empty or light bar", { reps: 8, load: "light" }),
      ]),
      phase("skill", "optional", [
        block("sq-sk-front", frontSquat, "3 sets of 5, light bar", { sets: 3, reps: 5, load: "light" }),
      ]),
      phase("form", "recommended", [
        block("sq-form", backSquat, "4 sets of 5, a bar you can own, rest about 90 seconds", {
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
          block("sq-bulk", backSquat, "5 sets of 5, same bar, rest about 2 minutes", {
            sets: 5,
            reps: 5,
            restSec: 120,
            load: "working",
          }),
        ],
        "7–8",
      ),
      phase("cooldown", "optional", [
        block("sq-cd-lunge", reverseLunge, "6 a side, light", { reps: 6, perSide: true, load: "light" }),
        block("sq-cd-abd", abduction, "12, light", { reps: 12, load: "light" }),
        block("sq-cd-walk", walk, "3:00, easy", { timeSec: 180 }),
      ]),
    ],
  },
  {
    id: "deadlift-basics",
    name: "Romanian Deadlift",
    focus: "A barbell hinge. This pack has no conventional deadlift.",
    minutes: "~35–45 min",
    implement: "Barbell",
    phases: [
      phase("warmup", "optional", [
        block("dl-wu-hinge", hinge, "8, light", { reps: 8, load: "light" }),
        block("dl-wu-lift", lift, "6, light", { reps: 6, load: "light" }),
      ]),
      phase("skill", "optional", [
        block("dl-sk", stiff, "3 sets of 6, light", { sets: 3, reps: 6, load: "light" }),
      ]),
      phase("form", "recommended", [
        block("dl-form", rdl, "4 sets of 6, a bar you can own, rest about 90 seconds", {
          sets: 4,
          reps: 6,
          restSec: 90,
          load: "working",
        }),
      ]),
      phase(
        "bulk",
        "required",
        [
          block("dl-bulk", rdl, "5 sets of 6, same bar, rest about 90 seconds", {
            sets: 5,
            reps: 6,
            restSec: 90,
            load: "working",
          }),
        ],
        "7–8",
      ),
      phase("cooldown", "optional", [
        block("dl-cd-curl", legCurl, "10, light", { reps: 10, load: "light" }),
        block("dl-cd-walk", walk, "3:00, easy", { timeSec: 180 }),
      ]),
    ],
  },
  {
    id: "steady-stance",
    name: "Steady Stance",
    focus: "A loaded march and a step-up, so the feet stay honest.",
    minutes: "~25–35 min",
    implement: "Kettlebell",
    phases: [
      phase("warmup", "optional", [
        block("st-wu-walk", walk, "2:00, easy", { timeSec: 120 }),
        block("st-wu-march", march, "1:00", { timeSec: 60, load: "light" }),
      ]),
      phase("skill", "optional", [
        block("st-sk", barMarch, "3 sets of 8, light bar", { sets: 3, reps: 8, load: "light" }),
      ]),
      phase("form", "recommended", [
        block("st-form", march, "4 sets of 10, a light bell, rest about a minute", {
          sets: 4,
          reps: 10,
          restSec: 60,
          load: "light",
        }),
      ]),
      phase(
        "bulk",
        "required",
        [
          block("st-bulk", stepUps, "5 sets of 6 a side, rest about a minute", {
            sets: 5,
            reps: 6,
            perSide: true,
            restSec: 60,
            load: "working",
          }),
        ],
        "6–7",
      ),
      phase("cooldown", "optional", [
        block("st-cd-split", dbSplit, "6 a side, light", { reps: 6, perSide: true, load: "light" }),
        block("st-cd-bike", bike, "2:00, easy", { timeSec: 120 }),
      ]),
    ],
  },
  {
    id: "floor-to-stand",
    name: "Floor-to-Stand Path",
    focus: "The kettlebell lift up, from the floor to standing.",
    minutes: "~30–40 min",
    implement: "Kettlebell",
    phases: [
      phase("warmup", "optional", [
        block("fl-wu-thrust", thrust, "8, light", { reps: 8, load: "light" }),
        block("fl-wu-gob", goblet, "6, light", { reps: 6, load: "light" }),
      ]),
      phase("skill", "optional", [
        block("fl-sk", lift, "3 sets of 5, light", { sets: 3, reps: 5, load: "light" }),
      ]),
      phase("form", "recommended", [
        block("fl-form", lift, "4 sets of 5, a bell you can own, rest about a minute", {
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
          block("fl-bulk", lift, "5 sets of 6, same bell, rest about a minute", {
            sets: 5,
            reps: 6,
            restSec: 60,
            load: "working",
          }),
        ],
        "6–7",
      ),
      phase("cooldown", "optional", [
        block("fl-cd-march", march, "1:00", { timeSec: 60, load: "light" }),
        block("fl-cd-walk", walk, "3:00, easy", { timeSec: 180 }),
      ]),
    ],
  },
  {
    id: "station-skills",
    name: "Station Skills Primer",
    focus: "Rower, air bike, and rope. Learn the machine before you sprint it.",
    minutes: "~30–40 min",
    implement: "Machine",
    phases: [
      phase("warmup", "optional", [
        block("ss-wu-walk", walk, "2:00, easy", { timeSec: 120 }),
        block("ss-wu-row", rower, "2:00, easy", { timeSec: 120 }),
      ]),
      phase("skill", "optional", [
        block("ss-sk-bike", airBike, "3 efforts, 20 seconds, then rest", { sets: 3, reps: 1, timeSec: 20, restSec: 40, load: "bodyweight" }),
        block("ss-sk-rope", rope, "3 efforts, 20 seconds", { sets: 3, reps: 1, timeSec: 20, restSec: 40, load: "bodyweight" }),
      ]),
      phase("form", "recommended", [
        block("ss-form", rower, "4 rounds, 1:00 on, about a minute off", {
          sets: 4,
          reps: 1,
          timeSec: 60,
          restSec: 60,
          load: "bodyweight",
        }),
      ]),
      phase(
        "bulk",
        "required",
        [
          block("ss-bulk", airBike, "6 efforts, 30 seconds, rest about a minute", {
            sets: 6,
            reps: 1,
            timeSec: 30,
            restSec: 60,
            load: "bodyweight",
          }),
        ],
        "7–8",
      ),
      phase("cooldown", "optional", [
        block("ss-cd-walk", walk, "3:00, easy", { timeSec: 180 }),
        block("ss-cd-bike", bike, "2:00, easy", { timeSec: 120 }),
      ]),
    ],
  },
  {
    id: "erg-intervals",
    name: "Erg intervals",
    focus: "The rower, then a short bike. Legs push first.",
    minutes: "~30–40 min",
    implement: "Rower",
    phases: [
      phase("warmup", "optional", [
        block("erg-wu-bike", bike, "2:00, easy", { timeSec: 120 }),
        block("erg-wu-row", rower, "2:00, easy", { timeSec: 120 }),
      ]),
      phase("skill", "optional", [
        block("erg-sk", rower, "3 rounds, 45 seconds, smooth", { sets: 3, reps: 1, timeSec: 45, restSec: 45, load: "bodyweight" }),
      ]),
      phase("form", "recommended", [
        block("erg-form", rower, "4 rounds, 1:00, rest about a minute", {
          sets: 4,
          reps: 1,
          timeSec: 60,
          restSec: 60,
          load: "bodyweight",
        }),
      ]),
      phase(
        "bulk",
        "required",
        [
          block("erg-bulk", elliptical, "6 efforts, 40 seconds, rest about a minute", {
            sets: 6,
            reps: 1,
            timeSec: 40,
            restSec: 60,
            load: "bodyweight",
          }),
        ],
        "7–8",
      ),
      phase("cooldown", "optional", [
        block("erg-cd-walk", walk, "3:00, easy", { timeSec: 180 }),
        block("erg-cd-bike", bike, "2:00, easy", { timeSec: 120 }),
      ]),
    ],
  },
  {
    id: "mixed-stations",
    name: "Mixed station practice",
    focus: "A few machines and a jump squat. Still a normal session.",
    minutes: "~35–45 min",
    implement: "Machine",
    phases: [
      phase("warmup", "optional", [
        block("mx-wu-walk", walk, "2:00, easy", { timeSec: 120 }),
        block("mx-wu-swing", swing, "10, light", { reps: 10, load: "light" }),
      ]),
      phase("skill", "optional", [
        block("mx-sk-rope", rope, "3 efforts, 20 seconds", { sets: 3, reps: 1, timeSec: 20, restSec: 40, load: "bodyweight" }),
        block("mx-sk-jump", jumpSquat, "3 sets of 5, light", { sets: 3, reps: 5, load: "light" }),
      ]),
      phase("form", "recommended", [
        block("mx-form-row", rower, "4 rounds, 45 seconds", { sets: 4, reps: 1, timeSec: 45, restSec: 45, load: "bodyweight" }),
        block("mx-form-bike", airBike, "4 efforts, 20 seconds", { sets: 4, reps: 1, timeSec: 20, restSec: 40, load: "bodyweight" }),
      ]),
      phase(
        "bulk",
        "required",
        [
          block("mx-bulk", run, "6 efforts, 30 seconds, rest about a minute", {
            sets: 6,
            reps: 1,
            timeSec: 30,
            restSec: 60,
            load: "bodyweight",
          }),
        ],
        "7–8",
      ),
      phase("cooldown", "optional", [
        block("mx-cd-step", stepmill, "3:00, easy", { timeSec: 180 }),
        block("mx-cd-walk", walk, "2:00, easy", { timeSec: 120 }),
      ]),
    ],
  },
  {
    id: "race-week-easy",
    name: "Race week easy",
    focus: "Walk, bike, and a stepmill. Nothing sharp.",
    minutes: "~25–35 min",
    implement: "Machine",
    phases: [
      phase("warmup", "optional", [
        block("rw-wu-walk", walk, "3:00, easy", { timeSec: 180 }),
      ]),
      phase("skill", "optional", [
        block("rw-sk-bike", bike, "3:00, easy", { reps: 1, timeSec: 180, load: "bodyweight" }),
      ]),
      phase("form", "recommended", [
        block("rw-form", stepmill, "4:00, easy", { reps: 1, timeSec: 240, load: "bodyweight" }),
      ]),
      phase(
        "bulk",
        "required",
        [
          block("rw-bulk", walk, "8:00, easy. You should be able to talk.", { sets: 1, reps: 1, timeSec: 480, load: "bodyweight" }),
        ],
        "4–5",
      ),
      phase("cooldown", "optional", [
        block("rw-cd-bike", bike, "2:00, easy", { timeSec: 120 }),
        block("rw-cd-march", march, "1:00", { timeSec: 60, load: "light" }),
      ]),
    ],
  },
  {
    id: "carry-lunges",
    name: "Lunge and March",
    focus: "Reverse lunges, a split squat, and a loaded march. No suitcase carry in this pack.",
    minutes: "~30–40 min",
    implement: "Kettlebell",
    phases: [
      phase("warmup", "optional", [
        block("cl-wu-march", march, "1:00", { timeSec: 60, load: "light" }),
        block("cl-wu-gob", goblet, "6, light", { reps: 6, load: "light" }),
      ]),
      phase("skill", "optional", [
        block("cl-sk-lunge", reverseLunge, "3 sets of 5 a side, light", {
          sets: 3,
          reps: 5,
          perSide: true,
          load: "light",
        }),
      ]),
      phase("form", "recommended", [
        block("cl-form-split", barSplit, "4 sets of 5 a side, rest about a minute", {
          sets: 4,
          reps: 5,
          perSide: true,
          restSec: 60,
          load: "working",
        }),
        block("cl-form-kick", kickback, "10 a side, light", { reps: 10, perSide: true, load: "light" }),
      ]),
      phase(
        "bulk",
        "required",
        [
          block("cl-bulk", reverseLunge, "5 sets of 6 a side, rest about a minute", {
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
        block("cl-cd-thrust", thrust, "8, light", { reps: 8, load: "light" }),
        block("cl-cd-walk", walk, "3:00, easy", { timeSec: 180 }),
      ]),
    ],
  },
  {
    id: "capable-strength",
    name: "Capable Strength",
    focus: "A goblet squat, a leg press, and a step-up. Loads you can own.",
    minutes: "~35–45 min",
    implement: "Dumbbell",
    phases: [
      phase("warmup", "optional", [
        block("cap-wu-march", march, "1:00", { timeSec: 60, load: "light" }),
        block("cap-wu-gob", goblet, "6, light", { reps: 6, load: "light" }),
      ]),
      phase("skill", "optional", [
        block("cap-sk-press", legPress, "3 sets of 8, light", { sets: 3, reps: 8, load: "light" }),
        block("cap-sk-step", stepUps, "6 a side, light", { reps: 6, perSide: true, load: "light" }),
      ]),
      phase("form", "recommended", [
        block("cap-form-gob", goblet, "4 sets of 6, rest about a minute", {
          sets: 4,
          reps: 6,
          restSec: 60,
          load: "working",
        }),
        block("cap-form-hip", thrust, "3 sets of 8, light", { sets: 3, reps: 8, load: "light" }),
      ]),
      phase(
        "bulk",
        "required",
        [
          block("cap-bulk", legPress, "5 sets of 8, rest about 90 seconds", {
            sets: 5,
            reps: 8,
            restSec: 90,
            load: "working",
          }),
        ],
        "6–7",
      ),
      phase("cooldown", "optional", [
        block("cap-cd-abd", abduction, "12, light", { reps: 12, load: "light" }),
        block("cap-cd-walk", walk, "3:00, easy", { timeSec: 180 }),
      ]),
    ],
  },
  {
    id: "carry-everyday",
    name: "Loaded March",
    focus: "A kettlebell march and a step-up. This pack has no farmer carry.",
    minutes: "~25–35 min",
    implement: "Kettlebell",
    phases: [
      phase("warmup", "optional", [
        block("ce-wu-walk", walk, "2:00, easy", { timeSec: 120 }),
        block("ce-wu-gob", goblet, "6, light", { reps: 6, load: "light" }),
      ]),
      phase("skill", "optional", [
        block("ce-sk", march, "3 sets of 10, light", { sets: 3, reps: 10, load: "light" }),
      ]),
      phase("form", "recommended", [
        block("ce-form", march, "4 sets of 12, rest about a minute", {
          sets: 4,
          reps: 12,
          restSec: 60,
          load: "working",
        }),
      ]),
      phase(
        "bulk",
        "required",
        [
          block("ce-bulk", stepUps, "5 sets of 6 a side, rest about a minute", {
            sets: 5,
            reps: 6,
            perSide: true,
            restSec: 60,
            load: "working",
          }),
        ],
        "6–7",
      ),
      phase("cooldown", "optional", [
        block("ce-cd-hack", hack, "8, light", { reps: 8, load: "light" }),
        block("ce-cd-bike", bike, "2:00, easy", { timeSec: 120 }),
      ]),
    ],
  },
  {
    id: "move-freer-easy",
    name: "Move Freer Easy Day",
    focus: "An easy walk, an easy bike, and a light march.",
    minutes: "~25–35 min",
    implement: "Machine",
    phases: [
      phase("warmup", "optional", [
        block("mf-wu-walk", walk, "3:00, easy", { timeSec: 180 }),
      ]),
      phase("skill", "optional", [
        block("mf-sk-march", march, "2:00, light", { reps: 1, timeSec: 120, load: "light" }),
      ]),
      phase("form", "recommended", [
        block("mf-form", bike, "5:00, easy", { reps: 1, timeSec: 300, load: "bodyweight" }),
      ]),
      phase(
        "bulk",
        "required",
        [
          block("mf-bulk", stepmill, "6:00, easy", { sets: 1, reps: 1, timeSec: 360, load: "bodyweight" }),
        ],
        "4–5",
      ),
      phase("cooldown", "optional", [
        block("mf-cd-walk", walk, "3:00, easy", { timeSec: 180 }),
        block("mf-cd-press", kbPress, "6 a side, very light", { reps: 6, perSide: true, load: "light" }),
      ]),
    ],
  },
];
