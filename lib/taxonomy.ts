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
export type TaxonomyTemplateId = "tpl_swing" | "tpl_clean" | "tpl_getup";

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
};

export type GoalPage = {
  id: string;
  chipId: TrainChipId;
  slug: string;
  label: string;
  lede: string;
  infoHref: string;
  plannedNames: string[];
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

export const TEMPLATE_ROUTES: Record<TaxonomyTemplateId, string> = {
  tpl_swing: "swing-foundation",
  tpl_clean: "clean-path",
  tpl_getup: "get-up-primer",
};

export const DEFAULT_TEMPLATE_ROUTE = TEMPLATE_ROUTES.tpl_swing;

export const DEFAULT_TRAIN_CHIP_ID: TrainChipId = "kettlebell-skill";

export const CATEGORIES: Category[] = [
  {
    id: "cat_strength",
    name: "Strength & free weights",
    blurb: "The spine of the catalog. Kettlebell is ready to train.",
  },
  {
    id: "cat_calisthenics",
    name: "Bodyweight · calisthenics skills",
    blurb: "Ladders you earn rung by rung. The wider goal collects bar and wall skills later.",
    goalId: "goal_bodyweight",
  },
  {
    id: "cat_mobility",
    name: "Mobility · movement quality",
    blurb: "Move freer. Joint control and balance — lifestyle practice, not a clinic.",
  },
  {
    id: "cat_mindbody",
    name: "Mind-body · flow · core",
    blurb: "Yoga and Pilates mat packs. A different promise from daily mobility.",
    goalId: "goal_mat",
  },
  {
    id: "cat_conditioning",
    name: "Conditioning & endurance",
    blurb: "Station and erg practice you can whiteboard. Not a GPS run app.",
    goalId: "goal_engine",
  },
  {
    id: "cat_functional",
    name: "Functional & competition fitness",
    blurb: "Race-day stations sit with engine prep when that wave ships.",
    goalId: "goal_engine",
  },
  {
    id: "cat_sport",
    name: "Sport skill practice",
    blurb: "Solo drills you can time. No swing-video coach.",
    goalId: "goal_sport",
  },
  {
    id: "cat_aging",
    name: "Active aging · everyday function",
    blurb: "Stay capable at any age. Get-Up Primer is already live.",
    goalId: "goal_stay_capable",
  },
];

export const MODULES: CatalogModule[] = [
  {
    id: "mod_kettlebell",
    categoryId: "cat_strength",
    subcategoryId: "sub_kettlebell",
    subcategory: "Kettlebell skill practice",
    name: "Kettlebell skill practice",
    blurb: "Practice the swing, the clean, and the get-up.",
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
    blurb: "Press, row, and goblet squat — patterns you groove until the load can climb.",
    status: "soon",
    slug: "dumbbell_strength",
    infoHref: "/info/dumbbell_strength",
    templateIds: [],
    plannedTemplates: [
      { name: "Goblet Squat Path", minutes: "~35–45 min" },
      { name: "Press Path", minutes: "~35–45 min" },
      { name: "Row Path", minutes: "~35–45 min" },
    ],
  },
  {
    id: "mod_barbell_form",
    categoryId: "cat_strength",
    subcategoryId: "sub_barbell",
    subcategory: "Barbell strength",
    name: "Barbell form basics",
    blurb: "Squat, bench, and deadlift as form practice. A few cues, then density.",
    status: "soon",
    slug: "barbell_form",
    infoHref: "/info/barbell_form",
    templateIds: [],
    plannedTemplates: [
      { name: "Squat Basics", minutes: "~40–50 min" },
      { name: "Bench Basics", minutes: "~40–50 min" },
      { name: "Deadlift Basics", minutes: "~40–50 min" },
    ],
  },
  {
    id: "mod_calisthenics_ladder",
    categoryId: "cat_calisthenics",
    subcategoryId: "sub_calisthenics",
    subcategory: "Pull / push / squat progressions",
    name: "Calisthenics ladder",
    blurb: "Pull, push, and squat ladders. Earn the next rung when this one is clean.",
    status: "soon",
    slug: "calisthenics_ladder",
    infoHref: "/info/calisthenics_ladder",
    templateIds: [],
    plannedTemplates: [
      { name: "Pull Ladder", minutes: "~35–45 min" },
      { name: "Push Ladder", minutes: "~35–45 min" },
      { name: "Squat Ladder", minutes: "~35–45 min" },
    ],
  },
  {
    id: "mod_daily_mobility",
    categoryId: "cat_mobility",
    subcategoryId: "sub_daily_mobility",
    subcategory: "Daily mobility",
    name: "Daily mobility session",
    blurb: "Slow, active circles and openers. Move freer — not a fix.",
    status: "soon",
    slug: "daily_mobility",
    infoHref: "/info/daily_mobility",
    templateIds: [],
    plannedTemplates: [
      { name: "Full-Body CARs Day", minutes: "~20–30 min" },
      { name: "Hips & Thoracic Open", minutes: "~25–35 min" },
      { name: "Shoulders & Wrists Prep", minutes: "~20–30 min" },
    ],
  },
  {
    id: "mod_balance_getup",
    categoryId: "cat_mobility",
    subcategoryId: "sub_balance",
    subcategory: "Balance practice",
    name: "Balance & get-up pack",
    blurb: "Steady feet and a calm floor-to-stand. The loaded get-up stays with kettlebell.",
    status: "soon",
    slug: "balance_getup",
    infoHref: "/info/balance_getup",
    templateIds: [],
    plannedTemplates: [
      { name: "Steady Stance", minutes: "~20–30 min" },
      { name: "Floor-to-Stand Path", minutes: "~25–35 min" },
      { name: "Get-Up Bridge", minutes: "~30–40 min", bridgeTemplateId: "get-up-primer" },
    ],
  },
];

export const GOAL_PAGES: GoalPage[] = [
  {
    id: "goal_bodyweight",
    chipId: "bodyweight-skills",
    slug: "bodyweight_skills",
    label: "Bodyweight skills",
    lede: "Ladders and practices with a bar, a wall, and the floor — craft, not a burpee burner.",
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
    lede: "Station practice and erg intervals on the five-phase board. Not a GPS run app.",
    infoHref: "/info/engine_race_prep",
    plannedNames: [
      "Station Skills Primer",
      "Erg Engine Bulk",
      "Mixed Modal Practice",
      "Race Week Downshift",
      "Carry & Lunges Path",
    ],
  },
  {
    id: "goal_mat",
    chipId: "mat-practice",
    slug: "mat_practice",
    label: "Mat practice",
    lede: "Yoga, Pilates, and quiet flow as structured sessions. Breath matters. Therapy claims don’t.",
    infoHref: "/info/mat_practice",
    plannedNames: [
      "Morning Mat Flow",
      "Pilates Mat Fundamentals",
      "Hip-Friendly Soft Strength",
      "Breath & Downshift Pack",
      "Core Control on the Mat",
    ],
  },
  {
    id: "goal_sport",
    chipId: "sport-prep",
    slug: "sport_prep",
    label: "Sport prep",
    lede: "Gym-side and solo drills for the sport you love. No swing-video coach.",
    infoHref: "/info/sport_prep",
    plannedNames: [
      "Golf Gym Prep",
      "Hangboard Practice Block",
      "Shadow Boxing Rounds",
      "Rotational Power Path",
      "Pre-Match Downshift",
    ],
  },
  {
    id: "goal_stay_capable",
    chipId: "stay-capable",
    slug: "stay_capable",
    label: "Stay capable",
    lede: "Keep doing the things you love — strength, balance, and a calm get-up. Not a clinic.",
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
    why: "Three kettlebell templates. Phases stay in order.",
    moduleIds: ["mod_kettlebell"],
    templateIds: ["tpl_swing", "tpl_clean", "tpl_getup"],
    primaryTemplateId: "tpl_swing",
    comingSoonIds: [],
    plannedNames: [],
  },
  {
    id: "get-stronger",
    label: "Get stronger",
    status: "live",
    why: "The kettlebell templates are the strength practice you can start today.",
    moduleIds: ["mod_kettlebell"],
    templateIds: ["tpl_swing", "tpl_clean", "tpl_getup"],
    primaryTemplateId: "tpl_swing",
    comingSoonIds: ["mod_dumbbell_strength", "mod_barbell_form", "mod_calisthenics_ladder"],
    plannedNames: [],
  },
  {
    id: "move-freer",
    label: "Move freer",
    status: "live",
    why: "Get-up first — move freer, not a fix. Swing and clean stay on the list.",
    moduleIds: ["mod_kettlebell"],
    templateIds: ["tpl_getup", "tpl_swing", "tpl_clean"],
    primaryTemplateId: "tpl_getup",
    comingSoonIds: ["mod_daily_mobility", "mod_balance_getup"],
    plannedNames: [],
  },
  {
    id: "bodyweight-skills",
    label: "Bodyweight skills",
    status: "soon",
    why: "We're building this.",
    moduleIds: [],
    templateIds: [],
    primaryTemplateId: "tpl_swing",
    comingSoonIds: [],
    plannedNames: GOAL_PAGES[0].plannedNames,
  },
  {
    id: "engine",
    label: "Engine / race prep",
    status: "soon",
    why: "We're building this.",
    moduleIds: [],
    templateIds: [],
    primaryTemplateId: "tpl_swing",
    comingSoonIds: [],
    plannedNames: GOAL_PAGES[1].plannedNames,
  },
  {
    id: "mat-practice",
    label: "Mat practice",
    status: "soon",
    why: "We're building this.",
    moduleIds: [],
    templateIds: [],
    primaryTemplateId: "tpl_swing",
    comingSoonIds: [],
    plannedNames: GOAL_PAGES[2].plannedNames,
  },
  {
    id: "sport-prep",
    label: "Sport prep",
    status: "soon",
    why: "We're building this.",
    moduleIds: [],
    templateIds: [],
    primaryTemplateId: "tpl_swing",
    comingSoonIds: [],
    plannedNames: GOAL_PAGES[3].plannedNames,
  },
  {
    id: "stay-capable",
    label: "Stay capable",
    status: "soon",
    why: "We're building this.",
    moduleIds: [],
    templateIds: [],
    primaryTemplateId: "tpl_swing",
    comingSoonIds: [],
    plannedNames: GOAL_PAGES[4].plannedNames,
  },
];

const KETTLEBELL_CTAS = [
  { href: "/plans", label: "Browse kettlebell" },
  { href: "/plans/swing-foundation", label: "Swing Foundation" },
];

export const INFO_ENTRIES: InfoEntry[] = [
  {
    slug: "kettlebell",
    kind: "kettlebell",
    title: "Kettlebell",
    promise: "Skill practice. Three paths. Five phases.",
    crumbs: ["Strength & free weights", "Kettlebell skill practice"],
    status: "live",
    bridgeGetUp: false,
    ctas: KETTLEBELL_CTAS,
  },
  {
    slug: "dumbbell_strength",
    kind: "module",
    title: "Dumbbell strength",
    promise: "Three paths. Five phases.",
    crumbs: ["Strength & free weights", "Dumbbell strength skill"],
    status: "soon",
    bridgeGetUp: false,
    ctas: [
      { href: "/plans?for=get-stronger", label: "Back to Get stronger" },
      { href: "/plans", label: "Browse kettlebell" },
    ],
  },
  {
    slug: "barbell_form",
    kind: "module",
    title: "Barbell form basics",
    promise: "Three lifts. Five phases.",
    crumbs: ["Strength & free weights", "Barbell form basics"],
    status: "soon",
    bridgeGetUp: false,
    ctas: [
      { href: "/plans?for=get-stronger", label: "Back to Get stronger" },
      { href: "/info/dumbbell_strength", label: "Dumbbell strength" },
    ],
  },
  {
    slug: "calisthenics_ladder",
    kind: "module",
    title: "Calisthenics ladder",
    promise: "Climb clean. Five phases.",
    crumbs: ["Bodyweight · calisthenics skills", "Calisthenics ladder"],
    status: "soon",
    bridgeGetUp: false,
    ctas: [
      { href: "/plans?for=get-stronger", label: "Back to Get stronger" },
      { href: "/info/bodyweight_skills", label: "Bodyweight skills" },
    ],
  },
  {
    slug: "daily_mobility",
    kind: "module",
    title: "Daily mobility",
    promise: "Move freer. Five phases.",
    crumbs: ["Mobility · movement quality", "Daily mobility session"],
    status: "soon",
    bridgeGetUp: false,
    ctas: [
      { href: "/plans?for=move-freer", label: "Back to Move freer" },
      { href: "/plans/get-up-primer", label: "Get-Up Primer" },
    ],
  },
  {
    slug: "balance_getup",
    kind: "module",
    title: "Balance & get-up",
    promise: "Steady feet. Calm rises.",
    crumbs: ["Mobility · movement quality", "Balance & get-up pack"],
    status: "soon",
    bridgeGetUp: true,
    ctas: [
      { href: "/plans/get-up-primer", label: "Open Get-Up Primer" },
      { href: "/plans?for=move-freer", label: "Back to Move freer" },
    ],
  },
  {
    slug: "bodyweight_skills",
    kind: "goal",
    title: "Bodyweight skills",
    promise: "Coming soon. Bar, wall, and floor — as craft.",
    crumbs: ["More goals", "Bodyweight skills"],
    status: "soon",
    bridgeGetUp: false,
    ctas: [
      { href: "/plans", label: "Browse kettlebell" },
      { href: "/plans?for=get-stronger", label: "Get stronger" },
      { href: "/info/calisthenics_ladder", label: "Calisthenics ladder" },
    ],
  },
  {
    slug: "engine_race_prep",
    kind: "goal",
    title: "Engine / race prep",
    promise: "Coming soon. Practice the stations. Earn the engine.",
    crumbs: ["More goals", "Engine / race prep"],
    status: "soon",
    bridgeGetUp: false,
    ctas: [
      { href: "/plans", label: "Browse kettlebell" },
      { href: "/plans?for=get-stronger", label: "Get stronger" },
    ],
  },
  {
    slug: "mat_practice",
    kind: "goal",
    title: "Mat practice",
    promise: "Coming soon. Yoga and Pilates, still a Structr session.",
    crumbs: ["More goals", "Mat practice"],
    status: "soon",
    bridgeGetUp: false,
    ctas: [
      { href: "/plans?for=move-freer", label: "Move freer" },
      { href: "/info/daily_mobility", label: "Daily mobility" },
      { href: "/plans", label: "Browse kettlebell" },
    ],
  },
  {
    slug: "sport_prep",
    kind: "goal",
    title: "Sport prep",
    promise: "Coming soon. Solo drills. No swing AI.",
    crumbs: ["More goals", "Sport prep"],
    status: "soon",
    bridgeGetUp: false,
    ctas: [
      { href: "/plans?for=get-stronger", label: "Get stronger" },
      { href: "/plans", label: "Browse kettlebell" },
    ],
  },
  {
    slug: "stay_capable",
    kind: "goal",
    title: "Stay capable",
    promise: "Coming soon. Keep doing the things you love.",
    crumbs: ["More goals", "Stay capable"],
    status: "soon",
    bridgeGetUp: true,
    ctas: [
      { href: "/plans/get-up-primer", label: "Open Get-Up Primer" },
      { href: "/plans?for=move-freer", label: "Move freer" },
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
  if (id === DEFAULT_TRAIN_CHIP_ID) return "/plans";
  return `/plans?for=${encodeURIComponent(id)}`;
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
  return count === 1 ? "1 template" : `${count} templates`;
}
