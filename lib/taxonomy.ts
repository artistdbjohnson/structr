/**
 * Curated Train-for catalog.
 * Locked by TRAIN_FOR_IA: chips resolve to modules, templates, or coming-soon
 * rows. No generated programs. Nest adds modules here; routes stay stable.
 *
 * Template route ids are the existing MVP ids so saved sessions still open.
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
};

export type CatalogModule = {
  id: string;
  categoryId: string;
  /** Stable subcategory id. Day one, kettlebell module === this subcategory. */
  subcategoryId: string;
  subcategory: string;
  name: string;
  blurb: string;
  status: CatalogStatus;
  /** Per-module info. Kettlebell stays on /plans/info until /info/[module]. */
  infoHref?: string;
  templateIds: TaxonomyTemplateId[];
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

export const TEMPLATE_ROUTES: Record<TaxonomyTemplateId, string> = {
  tpl_swing: "swing-foundation",
  tpl_clean: "clean-path",
  tpl_getup: "get-up-primer",
};

export const DEFAULT_TEMPLATE_ROUTE = TEMPLATE_ROUTES.tpl_swing;

export const DEFAULT_TRAIN_CHIP_ID: TrainChipId = "kettlebell-skill";

export const CATEGORIES: Category[] = [
  { id: "cat_strength", name: "Strength & free weights" },
  { id: "cat_calisthenics", name: "Bodyweight · calisthenics skills" },
  { id: "cat_mobility", name: "Mobility · movement quality" },
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
    infoHref: "/plans/info",
    templateIds: ["tpl_swing", "tpl_clean", "tpl_getup"],
  },
  {
    id: "mod_dumbbell",
    categoryId: "cat_strength",
    subcategoryId: "sub_dumbbell",
    subcategory: "Dumbbell / home free weights",
    name: "Dumbbell strength skill",
    blurb: "Press, row, and goblet patterns — when that module is written.",
    status: "soon",
    templateIds: [],
  },
  {
    id: "mod_barbell",
    categoryId: "cat_strength",
    subcategoryId: "sub_barbell",
    subcategory: "Barbell strength",
    name: "Barbell form basics",
    blurb: "Squat, bench, and deadlift practice — later, not today.",
    status: "soon",
    templateIds: [],
  },
  {
    id: "mod_calisthenics",
    categoryId: "cat_calisthenics",
    subcategoryId: "sub_calisthenics",
    subcategory: "Pull / push / squat progressions",
    name: "Calisthenics ladder",
    blurb: "Pull-up, dip, and squat progressions. A ladder, not a random circuit.",
    status: "soon",
    templateIds: [],
  },
  {
    id: "mod_mobility",
    categoryId: "cat_mobility",
    subcategoryId: "sub_daily_mobility",
    subcategory: "Daily mobility",
    name: "Daily mobility session",
    blurb: "Short sessions so you move freer. Not a fix.",
    status: "soon",
    templateIds: [],
  },
  {
    id: "mod_balance",
    categoryId: "cat_mobility",
    subcategoryId: "sub_balance",
    subcategory: "Balance practice",
    name: "Balance & get-up pack",
    blurb: "Balance confidence beside the get-up.",
    status: "soon",
    templateIds: [],
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
    comingSoonIds: ["mod_dumbbell", "mod_barbell", "mod_calisthenics"],
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
    comingSoonIds: ["mod_mobility", "mod_balance"],
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
    plannedNames: ["Calisthenics ladder", "Handstand practice"],
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
    plannedNames: ["Hyrox station prep", "Hardstyle conditioning"],
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
    plannedNames: ["Yoga mat practice", "Pilates mat practice"],
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
    plannedNames: ["Golf fitness", "Climbing strength"],
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
    plannedNames: ["Strength for longevity", "Balance confidence"],
  },
];

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

export function browseTree(): { category: Category; modules: CatalogModule[] }[] {
  return CATEGORIES.map((category) => ({
    category,
    modules: MODULES.filter((module) => module.categoryId === category.id),
  })).filter((group) => group.modules.length > 0);
}

export function templateCountLabel(count: number): string {
  return count === 1 ? "1 template" : `${count} templates`;
}
