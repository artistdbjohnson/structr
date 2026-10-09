/**
 * Curated Train-for catalog.
 * Chips resolve to live kettlebell templates or coming-soon rows.
 * Module copy lives in structr-docs/modules/*_BRIEF.md. No generated programs.
 *
 * Template route ids stay the MVP ids so saved sessions still open.
 */

import { getTemplate } from "./templates";
import type { Template } from "./types";

export type CatalogStatus = "live" | "soon";

/** Stable taxonomy ids. Route ids live on TEMPLATE_ROUTES. */
export const TEMPLATE_ROUTES = {
  tpl_swing: "swing-foundation",
  tpl_clean: "clean-path",
  tpl_getup: "get-up-primer",
  tpl_goblet: "goblet-squat-path",
  tpl_press: "press-path",
  tpl_chest: "chest-machines",
  tpl_squat: "squat-basics",
  tpl_deadlift: "deadlift-basics",
  tpl_steady: "steady-stance",
  tpl_floor: "floor-to-stand",
  tpl_stations: "station-skills",
  tpl_erg: "erg-intervals",
  tpl_mixed: "mixed-stations",
  tpl_race_easy: "race-week-easy",
  tpl_carries: "carry-lunges",
  tpl_capable: "capable-strength",
  tpl_carry_day: "carry-everyday",
  tpl_easy_day: "move-freer-easy",
} as const;

export type TaxonomyTemplateId = keyof typeof TEMPLATE_ROUTES;

export type TrainChipId =
  | "kettlebell-skill"
  | "get-stronger"
  | "move-freer"
  | "bodyweight-skills"
  | "engine"
  | "mat-practice"
  | "sport-prep"
  | "stay-capable";

export type Category = {
  id: string;
  name: string;
  blurb: string;
  /** Goal shell shown with this category when the modules aren’t written yet. */
  goalId?: string;
};

export type PlannedTemplate = {
  name: string;
  minutes: string;
  /** Names a live kettlebell template this row should open. */
  bridgeTemplateId?: string;
};

export type CatalogModule = {
  id: string;
  categoryId: string;
  subcategoryId: string;
  subcategory: string;
  name: string;
  blurb: string;
  status: CatalogStatus;
  /** Info route slug. Kettlebell keeps /plans/info as well. */
  slug: string;
  infoHref: string;
  templateIds: TaxonomyTemplateId[];
  /** Written, not startable. */
  plannedTemplates: PlannedTemplate[];
};

export type TrainChip = {
  id: TrainChipId;
  label: string;
  status: CatalogStatus;
  /** Result line under the chips. Soon chips use the empty-state copy instead. */
  why: string;
  moduleIds: string[];
  /** Display order. Move freer leads with the get-up. */
  templateIds: TaxonomyTemplateId[];
  primaryTemplateId: TaxonomyTemplateId;
  comingSoonIds: string[];
  /** Soon-chip empty state. Names only — never startable. */
  plannedNames: string[];
  /** Main row, or the More goals disclosure. */
  shelf: "main" | "more";
};

export type GoalPage = {
  id: string;
  chipId: TrainChipId;
  slug: string;
  label: string;
  lede: string;
  infoHref: string;
  plannedNames: string[];
  /** Startable plans when this goal is no longer just names. */
  templateIds?: TaxonomyTemplateId[];
};

export type InfoKind = "kettlebell" | "module" | "goal";

export type InfoEntry = {
  slug: string;
  kind: InfoKind;
  title: string;
  promise: string;
  crumbs: string[];
  status: CatalogStatus;
  /** Open the live kettlebell get-up from this page. */
  bridgeGetUp: boolean;
  ctas: { href: string; label: string }[];
};

export const DEFAULT_TEMPLATE_ROUTE = TEMPLATE_ROUTES.tpl_swing;

export const DEFAULT_TRAIN_CHIP_ID: TrainChipId = "kettlebell-skill";

export const CATEGORIES: Category[] = [
  {
    id: "cat_strength",
    name: "Strength & free weights",
    blurb: "Kettlebell, dumbbell, and barbell. Same five-part session. All three can start.",
  },
  {
    id: "cat_calisthenics",
    name: "Bodyweight",
    blurb: "You earn the next rung when this one feels easy.",
  },
  {
    id: "cat_mobility",
    name: "Move easier",
    blurb: "Looser joints. Steadier feet. The kind of practice you can do on a normal day.",
  },
  {
    id: "cat_mindbody",
    name: "Mat and quiet strength",
    blurb: "Yoga, Pilates, and quiet work on the floor.",
  },
  {
    id: "cat_conditioning",
    name: "Conditioning & endurance",
    blurb: "Stations and machines, in a normal session you can time.",
  },
  {
    id: "cat_functional",
    name: "Functional & competition fitness",
    blurb: "The same engine sessions, for a race week.",
    goalId: "goal_engine",
  },
  {
    id: "cat_sport",
    name: "Sport skill practice",
    blurb: "Solo drills you can time for the sport you already play.",
  },
  {
    id: "cat_aging",
    name: "Stay capable",
    blurb: "Keep doing the things you love. Strength, balance, and a way up off the floor.",
  },
];

export const MODULES: CatalogModule[] = [
  {
    id: "mod_kettlebell",
    categoryId: "cat_strength",
    subcategoryId: "sub_kettlebell",
    subcategory: "Kettlebell skill practice",
    name: "Kettlebell skill practice",
    blurb: "Practice the swing, the overhead press, and the lift up off the floor.",
    status: "live",
    slug: "kettlebell",
    infoHref: "/plans/info",
    templateIds: ["tpl_swing", "tpl_clean", "tpl_getup"],
    plannedTemplates: [],
  },
  {
    id: "mod_dumbbell_strength",
    categoryId: "cat_strength",
    subcategoryId: "sub_dumbbell",
    subcategory: "Dumbbell / home free weights",
    name: "Dumbbell strength skill",
    blurb: "Goblet squat, an overhead press, and chest machines. No bench or row in this pack.",
    status: "live",
    slug: "dumbbell_strength",
    infoHref: "/info/dumbbell_strength",
    templateIds: ["tpl_goblet", "tpl_press", "tpl_chest"],
    plannedTemplates: [],
  },
  {
    id: "mod_barbell_form",
    categoryId: "cat_strength",
    subcategoryId: "sub_barbell",
    subcategory: "Barbell strength",
    name: "Barbell form basics",
    blurb: "Back squat and a Romanian deadlift. This pack has no bench or conventional deadlift.",
    status: "live",
    slug: "barbell_form",
    infoHref: "/info/barbell_form",
    templateIds: ["tpl_squat", "tpl_deadlift"],
    plannedTemplates: [],
  },
  {
    id: "mod_calisthenics_ladder",
    categoryId: "cat_calisthenics",
    subcategoryId: "sub_calisthenics",
    subcategory: "Pull / push / squat progressions",
    name: "Calisthenics ladder",
    blurb: "Pull-ups, push-ups, and a bodyweight squat. None of those clips are in this pack.",
    status: "soon",
    slug: "calisthenics_ladder",
    infoHref: "/info/calisthenics_ladder",
    templateIds: [],
    plannedTemplates: [
      { name: "Pull Ladder", minutes: "~35–45 min" },
      { name: "Push Ladder", minutes: "~35–45 min" },
      { name: "Squat Ladder", minutes: "~30–40 min" },
    ],
  },
  {
    id: "mod_daily_mobility",
    categoryId: "cat_mobility",
    subcategoryId: "sub_daily_mobility",
    subcategory: "Daily mobility",
    name: "Daily mobility session",
    blurb: "Circles and openers. This pack has no stretch clips, so these stay names.",
    status: "soon",
    slug: "daily_mobility",
    infoHref: "/info/daily_mobility",
    templateIds: [],
    plannedTemplates: [
      { name: "Full-body joint circles", minutes: "~25–35 min" },
      { name: "Hips and upper back", minutes: "~25–35 min" },
      { name: "Shoulders and wrists", minutes: "~25–35 min" },
    ],
  },
  {
    id: "mod_balance_getup",
    categoryId: "cat_mobility",
    subcategoryId: "sub_balance",
    subcategory: "Balance practice",
    name: "Balance & get-up pack",
    blurb: "A loaded march and a lift off the floor. The get-up itself is not in this pack.",
    status: "live",
    slug: "balance_getup",
    infoHref: "/info/balance_getup",
    templateIds: ["tpl_steady", "tpl_floor"],
    plannedTemplates: [{ name: "Get-Up Bridge", minutes: "~30–40 min" }],
  },
  {
    id: "mod_bodyweight_skills",
    categoryId: "cat_calisthenics",
    subcategoryId: "sub_bodyweight_skills",
    subcategory: "Bar, wall, and floor",
    name: "Bodyweight skills",
    blurb: "Handstand, dips, core holds, and a muscle-up. None of those clips are in this pack.",
    status: "soon",
    slug: "bodyweight_skills",
    infoHref: "/info/bodyweight_skills",
    templateIds: [],
    plannedTemplates: [
      { name: "Handstand Wall Path", minutes: "~30–40 min" },
      { name: "Dip & Support Strength", minutes: "~30–40 min" },
      { name: "Core Holds Studio", minutes: "~25–35 min" },
      { name: "Muscle-Up Approach", minutes: "~35–45 min" },
    ],
  },
  {
    id: "mod_mat",
    categoryId: "cat_mindbody",
    subcategoryId: "sub_mat",
    subcategory: "Yoga and Pilates",
    name: "Mat practice",
    blurb: "Yoga, Pilates, and floor holds. This pack has no mat or core clips.",
    status: "soon",
    slug: "mat_practice",
    infoHref: "/info/mat_practice",
    templateIds: [],
    plannedTemplates: [
      { name: "Morning Mat Flow", minutes: "~25–35 min" },
      { name: "Pilates Mat Fundamentals", minutes: "~30–40 min" },
      { name: "Easy hip strength", minutes: "~25–35 min" },
      { name: "Breath and settle", minutes: "~20–30 min" },
      { name: "Core Control on the Mat", minutes: "~25–35 min" },
    ],
  },
  {
    id: "mod_engine",
    categoryId: "cat_conditioning",
    subcategoryId: "sub_engine",
    subcategory: "Stations and machines",
    name: "Engine / race prep",
    blurb: "Rower, bike, rope, and a lunge-and-march. No carries in this pack.",
    status: "live",
    slug: "engine_race_prep",
    infoHref: "/info/engine_race_prep",
    templateIds: ["tpl_stations", "tpl_erg", "tpl_mixed", "tpl_race_easy", "tpl_carries"],
    plannedTemplates: [],
  },
  {
    id: "mod_sport",
    categoryId: "cat_sport",
    subcategoryId: "sub_sport",
    subcategory: "Solo sport drills",
    name: "Sport prep",
    blurb: "Golf, a fingerboard, and shadow boxing. None of those clips are in this pack.",
    status: "soon",
    slug: "sport_prep",
    infoHref: "/info/sport_prep",
    templateIds: [],
    plannedTemplates: [
      { name: "Golf Gym Prep", minutes: "~30–40 min" },
      { name: "Hangboard Practice Block", minutes: "~25–35 min" },
      { name: "Shadow Boxing Rounds", minutes: "~25–35 min" },
      { name: "Power in the turn", minutes: "~30–40 min" },
      { name: "Day-before easy", minutes: "~20–30 min" },
    ],
  },
  {
    id: "mod_stay",
    categoryId: "cat_aging",
    subcategoryId: "sub_stay",
    subcategory: "Strength, balance, carry",
    name: "Stay capable",
    blurb: "Kinder loads, a march, and a lift off the floor. No farmer carry in this pack.",
    status: "live",
    slug: "stay_capable",
    infoHref: "/info/stay_capable",
    templateIds: ["tpl_capable", "tpl_steady", "tpl_floor", "tpl_carry_day", "tpl_easy_day"],
    plannedTemplates: [],
  },
];

export const GOAL_PAGES: GoalPage[] = [
  {
    id: "goal_bodyweight",
    chipId: "bodyweight-skills",
    slug: "bodyweight_skills",
    label: "Bodyweight skills",
    lede: "Pull-ups, handstands, and floor work. You earn them one step at a time.",
    infoHref: "/info/bodyweight_skills",
    plannedNames: [
      "Pull Ladder",
      "Handstand Wall Path",
      "Dip & Support Strength",
      "Core Holds Studio",
      "Muscle-Up Approach",
    ],
  },
  {
    id: "goal_engine",
    chipId: "engine",
    slug: "engine_race_prep",
    label: "Engine / race prep",
    lede: "Station practice and machine intervals, still a normal session with a warm-up and a cool-down.",
    infoHref: "/info/engine_race_prep",
    plannedNames: [
      "Station Skills Primer",
      "Erg intervals",
      "Mixed station practice",
      "Race week easy",
      "Carry & Lunges Path",
    ],
    templateIds: ["tpl_stations", "tpl_erg", "tpl_mixed", "tpl_race_easy", "tpl_carries"],
  },
  {
    id: "goal_mat",
    chipId: "mat-practice",
    slug: "mat_practice",
    label: "Mat practice",
    lede: "Yoga, Pilates, and quiet flow. Breath counts. Still a real session.",
    infoHref: "/info/mat_practice",
    plannedNames: [
      "Morning Mat Flow",
      "Pilates Mat Fundamentals",
      "Easy hip strength",
      "Breath and settle",
      "Core Control on the Mat",
    ],
  },
  {
    id: "goal_sport",
    chipId: "sport-prep",
    slug: "sport_prep",
    label: "Sport prep",
    lede: "Gym work and solo drills for the sport you already love.",
    infoHref: "/info/sport_prep",
    plannedNames: [
      "Golf Gym Prep",
      "Hangboard Practice Block",
      "Shadow Boxing Rounds",
      "Power in the turn",
      "Day-before easy",
    ],
  },
  {
    id: "goal_stay_capable",
    chipId: "stay-capable",
    slug: "stay_capable",
    label: "Stay capable",
    lede: "Keep doing the things you love. Strength, balance, and a calm way up off the floor.",
    infoHref: "/info/stay_capable",
    plannedNames: [
      "Capable Strength",
      "Steady Stance",
      "Floor-to-Stand Path",
      "Carry Everyday",
      "Move Freer Easy Day",
    ],
  },
];

export const TRAIN_CHIPS: TrainChip[] = [
  {
    id: "kettlebell-skill",
    label: "Kettlebell skill",
    status: "live",
    why: "Swing, overhead press, and the lift up off the floor.",
    moduleIds: ["mod_kettlebell"],
    templateIds: ["tpl_swing", "tpl_clean", "tpl_getup"],
    primaryTemplateId: "tpl_swing",
    comingSoonIds: [],
    plannedNames: [],
    shelf: "main",
  },
  {
    id: "get-stronger",
    label: "Get stronger",
    status: "live",
    why: "Kettlebell, dumbbell, and barbell. Every step has a clip.",
    moduleIds: ["mod_kettlebell", "mod_dumbbell_strength", "mod_barbell_form"],
    templateIds: [
      "tpl_swing",
      "tpl_clean",
      "tpl_getup",
      "tpl_goblet",
      "tpl_press",
      "tpl_chest",
      "tpl_squat",
      "tpl_deadlift",
    ],
    primaryTemplateId: "tpl_swing",
    comingSoonIds: ["mod_calisthenics_ladder"],
    plannedNames: [],
    shelf: "main",
  },
  {
    id: "move-freer",
    label: "Move freer",
    status: "live",
    why: "Start with the lift off the floor. Marches are here too.",
    moduleIds: ["mod_kettlebell", "mod_balance_getup"],
    templateIds: ["tpl_getup", "tpl_swing", "tpl_clean", "tpl_steady", "tpl_floor"],
    primaryTemplateId: "tpl_getup",
    comingSoonIds: ["mod_daily_mobility"],
    plannedNames: [],
    shelf: "main",
  },
  {
    id: "bodyweight-skills",
    label: "Bodyweight skills",
    status: "soon",
    why: "Pull-ups, push-ups, and the wall. Those clips are not in this pack.",
    moduleIds: ["mod_calisthenics_ladder", "mod_bodyweight_skills"],
    templateIds: [],
    primaryTemplateId: "tpl_swing",
    comingSoonIds: [],
    plannedNames: [
      "Pull Ladder",
      "Push Ladder",
      "Squat Ladder",
      "Handstand Wall Path",
      "Dip & Support Strength",
      "Core Holds Studio",
      "Muscle-Up Approach",
    ],
    shelf: "more",
  },
  {
    id: "engine",
    label: "Engine / race prep",
    status: "live",
    why: "Stations, a rower, lunges. Still a normal session.",
    moduleIds: ["mod_engine"],
    templateIds: ["tpl_stations", "tpl_erg", "tpl_mixed", "tpl_race_easy", "tpl_carries"],
    primaryTemplateId: "tpl_stations",
    comingSoonIds: [],
    plannedNames: [],
    shelf: "more",
  },
  {
    id: "mat-practice",
    label: "Mat practice",
    status: "soon",
    why: "Yoga and Pilates. Those clips are not in this pack.",
    moduleIds: ["mod_mat"],
    templateIds: [],
    primaryTemplateId: "tpl_swing",
    comingSoonIds: [],
    plannedNames: [
      "Morning Mat Flow",
      "Pilates Mat Fundamentals",
      "Easy hip strength",
      "Breath and settle",
      "Core Control on the Mat",
    ],
    shelf: "more",
  },
  {
    id: "sport-prep",
    label: "Sport prep",
    status: "soon",
    why: "Sport drills. Those clips are not in this pack.",
    moduleIds: ["mod_sport"],
    templateIds: [],
    primaryTemplateId: "tpl_swing",
    comingSoonIds: [],
    plannedNames: [
      "Golf Gym Prep",
      "Hangboard Practice Block",
      "Shadow Boxing Rounds",
      "Power in the turn",
      "Day-before easy",
    ],
    shelf: "more",
  },
  {
    id: "stay-capable",
    label: "Stay capable",
    status: "live",
    why: "Strength, a march, and a way up off the floor.",
    moduleIds: ["mod_stay"],
    templateIds: ["tpl_capable", "tpl_steady", "tpl_floor", "tpl_carry_day", "tpl_easy_day"],
    primaryTemplateId: "tpl_capable",
    comingSoonIds: [],
    plannedNames: [],
    shelf: "more",
  },
];

const KETTLEBELL_CTAS = [
  { href: "/train", label: "Browse kettlebell" },
  { href: "/plans/swing-foundation", label: "Swing Foundation" },
];

export const INFO_ENTRIES: InfoEntry[] = [
  {
    slug: "kettlebell",
    kind: "kettlebell",
    title: "Kettlebell",
    promise: "The swing, the overhead press, and the lift up off the floor.",
    crumbs: ["Strength & free weights", "Kettlebell skill practice"],
    status: "live",
    bridgeGetUp: false,
    ctas: KETTLEBELL_CTAS,
  },
  {
    slug: "dumbbell_strength",
    kind: "module",
    title: "Dumbbell strength",
    promise: "Goblet squat, overhead press, and chest machines.",
    crumbs: ["Strength & free weights", "Dumbbell strength skill"],
    status: "live",
    bridgeGetUp: false,
    ctas: [
      { href: "/train?for=get-stronger", label: "Back to Get stronger" },
      { href: "/train", label: "Browse kettlebell" },
    ],
  },
  {
    slug: "barbell_form",
    kind: "module",
    title: "Barbell form basics",
    promise: "Back squat and a Romanian deadlift.",
    crumbs: ["Strength & free weights", "Barbell form basics"],
    status: "live",
    bridgeGetUp: false,
    ctas: [
      { href: "/train?for=get-stronger", label: "Back to Get stronger" },
      { href: "/info/dumbbell_strength", label: "Dumbbell strength" },
    ],
  },
  {
    slug: "calisthenics_ladder",
    kind: "module",
    title: "Calisthenics ladder",
    promise: "Earn the next rung when this one is clean.",
    crumbs: ["Bodyweight skills", "Calisthenics ladder"],
    status: "soon",
    bridgeGetUp: false,
    ctas: [
      { href: "/train?for=get-stronger", label: "Back to Get stronger" },
      { href: "/info/bodyweight_skills", label: "Bodyweight skills" },
    ],
  },
  {
    slug: "daily_mobility",
    kind: "module",
    title: "Daily mobility",
    promise: "Slow circles, so tomorrow you move a little easier.",
    crumbs: ["Move easier", "Daily mobility"],
    status: "soon",
    bridgeGetUp: false,
    ctas: [
      { href: "/train?for=move-freer", label: "Back to Move freer" },
      { href: "/plans/get-up-primer", label: "Get-Up Primer" },
    ],
  },
  {
    slug: "balance_getup",
    kind: "module",
    title: "Balance & get-up",
    promise: "A march, and a lift off the floor.",
    crumbs: ["Move easier", "Balance and get-up"],
    status: "live",
    bridgeGetUp: true,
    ctas: [
      { href: "/plans/get-up-primer", label: "Open Get-Up Primer" },
      { href: "/train?for=move-freer", label: "Back to Move freer" },
    ],
  },
  {
    slug: "bodyweight_skills",
    kind: "goal",
    title: "Bodyweight skills",
    promise: "A bar, a wall, and the floor. One rung at a time.",
    crumbs: ["More goals", "Bodyweight skills"],
    status: "soon",
    bridgeGetUp: false,
    ctas: [
      { href: "/train", label: "Browse kettlebell" },
      { href: "/train?for=get-stronger", label: "Get stronger" },
      { href: "/info/calisthenics_ladder", label: "Calisthenics ladder" },
    ],
  },
  {
    slug: "engine_race_prep",
    kind: "goal",
    title: "Engine / race prep",
    promise: "Practice the stations until the work feels familiar.",
    crumbs: ["More goals", "Engine / race prep"],
    status: "live",
    bridgeGetUp: false,
    ctas: [
      { href: "/train", label: "Browse kettlebell" },
      { href: "/train?for=get-stronger", label: "Get stronger" },
    ],
  },
  {
    slug: "mat_practice",
    kind: "goal",
    title: "Mat practice",
    promise: "Yoga and Pilates, still a real session.",
    crumbs: ["More goals", "Mat practice"],
    status: "soon",
    bridgeGetUp: false,
    ctas: [
      { href: "/train?for=move-freer", label: "Move freer" },
      { href: "/info/daily_mobility", label: "Daily mobility" },
      { href: "/train", label: "Browse kettlebell" },
    ],
  },
  {
    slug: "sport_prep",
    kind: "goal",
    title: "Sport prep",
    promise: "Solo drills for the sport you play.",
    crumbs: ["More goals", "Sport prep"],
    status: "soon",
    bridgeGetUp: false,
    ctas: [
      { href: "/train?for=get-stronger", label: "Get stronger" },
      { href: "/train", label: "Browse kettlebell" },
    ],
  },
  {
    slug: "stay_capable",
    kind: "goal",
    title: "Stay capable",
    promise: "Strength, a march, and a lift off the floor.",
    crumbs: ["More goals", "Stay capable"],
    status: "live",
    bridgeGetUp: true,
    ctas: [
      { href: "/plans/get-up-primer", label: "Open Get-Up Primer" },
      { href: "/train?for=move-freer", label: "Move freer" },
      { href: "/info/balance_getup", label: "Balance & get-up" },
    ],
  },
];

const SLUG_ALIASES: Record<string, string> = {
  kettlebell: "kettlebell",
  dumbbell_strength: "dumbbell_strength",
  "dumbbell-strength": "dumbbell_strength",
  barbell_form: "barbell_form",
  "barbell-form": "barbell_form",
  calisthenics_ladder: "calisthenics_ladder",
  "calisthenics-ladder": "calisthenics_ladder",
  daily_mobility: "daily_mobility",
  "daily-mobility": "daily_mobility",
  balance_getup: "balance_getup",
  "balance-getup": "balance_getup",
  "balance-get-up-pack": "balance_getup",
  "balance-get-up": "balance_getup",
  bodyweight_skills: "bodyweight_skills",
  "bodyweight-skills": "bodyweight_skills",
  goal_bodyweight: "bodyweight_skills",
  engine_race_prep: "engine_race_prep",
  "engine-race-prep": "engine_race_prep",
  engine: "engine_race_prep",
  goal_engine: "engine_race_prep",
  mat_practice: "mat_practice",
  "mat-practice": "mat_practice",
  goal_mat: "mat_practice",
  sport_prep: "sport_prep",
  "sport-prep": "sport_prep",
  goal_sport: "sport_prep",
  stay_capable: "stay_capable",
  "stay-capable": "stay_capable",
  goal_stay_capable: "stay_capable",
};

export function resolveInfoSlug(raw: string): string | undefined {
  return SLUG_ALIASES[raw];
}

export function infoEntry(slug: string): InfoEntry | undefined {
  return INFO_ENTRIES.find((entry) => entry.slug === slug);
}

export function infoStaticParams(): { slug: string }[] {
  return Object.keys(SLUG_ALIASES).map((slug) => ({ slug }));
}

export function trainForHref(id: TrainChipId): string {
  if (id === DEFAULT_TRAIN_CHIP_ID) return "/train";
  return `/train?for=${encodeURIComponent(id)}`;
}

export function resolveTrainChip(raw?: string | null): TrainChip {
  const found = TRAIN_CHIPS.find((chip) => chip.id === raw);
  if (found) return found;
  return TRAIN_CHIPS.find((chip) => chip.id === DEFAULT_TRAIN_CHIP_ID) ?? TRAIN_CHIPS[0];
}

export function getCategory(id: string): Category | undefined {
  return CATEGORIES.find((category) => category.id === id);
}

export function getModule(id: string): CatalogModule | undefined {
  return MODULES.find((module) => module.id === id);
}

export function getGoal(id: string): GoalPage | undefined {
  return GOAL_PAGES.find((goal) => goal.id === id);
}

export function goalForChip(id: TrainChipId): GoalPage | undefined {
  return GOAL_PAGES.find((goal) => goal.chipId === id);
}

export function liveChips(): TrainChip[] {
  return TRAIN_CHIPS.filter((chip) => chip.status === "live");
}

export function soonChips(): TrainChip[] {
  return TRAIN_CHIPS.filter((chip) => chip.status === "soon");
}

export function mainChips(): TrainChip[] {
  return TRAIN_CHIPS.filter((chip) => chip.shelf === "main");
}

export function moreChips(): TrainChip[] {
  return TRAIN_CHIPS.filter((chip) => chip.shelf === "more");
}

export function plansForTaxonomyIds(ids: readonly TaxonomyTemplateId[]): Template[] {
  return ids.flatMap((id) => {
    const template = getTemplate(TEMPLATE_ROUTES[id]);
    return template ? [template] : [];
  });
}

export function plansForInfoSlug(slug: string): Template[] {
  const module = MODULES.find((item) => item.slug === slug);
  if (module && module.templateIds.length > 0) return plansForTaxonomyIds(module.templateIds);
  const goal = GOAL_PAGES.find((item) => item.slug === slug);
  if (goal?.templateIds?.length) return plansForTaxonomyIds(goal.templateIds);
  return [];
}

export function infoHrefForTemplate(templateId: string): { href: string; label: string } {
  const module = MODULES.find((item) =>
    item.templateIds.some((id) => TEMPLATE_ROUTES[id] === templateId),
  );
  if (module) return { href: module.infoHref, label: `${module.name} info` };
  return { href: "/plans/info", label: "Kettlebell info" };
}

export function modulesForChip(chip: TrainChip): CatalogModule[] {
  if (chip.status !== "live") return [];
  return chip.moduleIds
    .map((id) => getModule(id))
    .filter((module): module is CatalogModule => module?.status === "live");
}

export function templatesForChip(chip: TrainChip): { taxonomyId: TaxonomyTemplateId; template: Template }[] {
  if (chip.status !== "live") return [];
  return chip.templateIds.flatMap((taxonomyId) => {
    const template = getTemplate(TEMPLATE_ROUTES[taxonomyId]);
    return template ? [{ taxonomyId, template }] : [];
  });
}

export function comingSoonForChip(chip: TrainChip): CatalogModule[] {
  if (chip.status !== "live") return [];
  return chip.comingSoonIds
    .map((id) => getModule(id))
    .filter((module): module is CatalogModule => module?.status === "soon");
}

export function browseTree(): { category: Category; modules: CatalogModule[]; goal?: GoalPage }[] {
  return CATEGORIES.map((category) => ({
    category,
    modules: MODULES.filter((module) => module.categoryId === category.id),
    goal: category.goalId ? getGoal(category.goalId) : undefined,
  }));
}

export function templateCountLabel(count: number): string {
  return count === 1 ? "1 plan" : `${count} plans`;
}
