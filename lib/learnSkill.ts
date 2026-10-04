import { block, phase } from "./planBuild";
import { MODULES, TEMPLATE_ROUTES } from "./taxonomy";
import { getTemplate, TEMPLATES } from "./templates";
import type { Template } from "./types";

export function normalizeSkillName(raw: string): string {
  return raw
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function tidyName(raw: string): string {
  const trimmed = raw.trim().replace(/\s+/g, " ");
  if (!trimmed) return "Practice";
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}

export function learnedTemplateId(name: string): string {
  const slug = normalizeSkillName(name).replace(/ /g, "-").replace(/-+/g, "-").slice(0, 48);
  const base = `learn-${slug || "practice"}`;
  if (getTemplate(base)) return `learn-custom-${slug || "practice"}`;
  return base;
}

/** A catalog plan or module, when the words clearly name one. */
export function matchCatalogPlan(raw: string): Template | undefined {
  const key = normalizeSkillName(raw);
  if (key.length < 2) return undefined;

  const exact = TEMPLATES.find(
    (template) => normalizeSkillName(template.name) === key || normalizeSkillName(template.id) === key,
  );
  if (exact) return exact;

  const byFocus = TEMPLATES.find((template) => normalizeSkillName(template.focus) === key);
  if (byFocus) return byFocus;

  const module = MODULES.find((item) =>
    [item.name, item.subcategory, item.slug].some((value) => normalizeSkillName(value) === key),
  );
  const moduleTemplateId = module?.templateIds[0];
  if (moduleTemplateId) {
    const template = getTemplate(TEMPLATE_ROUTES[moduleTemplateId]);
    if (template) return template;
  }

  if (key.length >= 4) {
    const hits = TEMPLATES.filter((template) => normalizeSkillName(template.name).includes(key));
    if (hits.length === 1) return hits[0];
  }
  return undefined;
}

/** Same five parts as every other Structr session, built only from the name. */
export function buildLearnedTemplate(raw: string): Template {
  const name = tidyName(raw);
  const id = learnedTemplateId(name);
  return {
    id,
    name,
    focus: name,
    minutes: "~25–35 min",
    implement: "Body weight",
    phases: [
      phase("warmup", "optional", [
        block(`${id}-wu-hip`, "Hip circles", "45 seconds", { timeSec: 45 }),
        block(`${id}-wu-cat`, "Cat-cow", "6", { reps: 6, load: "bodyweight" }),
        block(`${id}-wu-easy`, `${name}, easy`, "6 easy", { reps: 6, load: "bodyweight" }),
      ]),
      phase(
        "skill",
        "optional",
        [
          block(`${id}-sk-slow`, `${name}, slow`, "3 sets of 5, slow", {
            sets: 3,
            reps: 5,
            load: "bodyweight",
          }),
          block(`${id}-sk-piece`, `${name}, one piece`, "3 sets of 5. One piece only.", {
            sets: 3,
            reps: 5,
            load: "bodyweight",
          }),
        ],
        undefined,
        "Learn the move before you rush it.",
      ),
      phase("form", "recommended", [
        block(`${id}-form`, name, "4 sets of 5, clean", { sets: 4, reps: 5, load: "bodyweight" }),
      ]),
      phase(
        "bulk",
        "required",
        [
          block(`${id}-bulk`, name, "5 sets of 6, rest about a minute", {
            sets: 5,
            reps: 6,
            restSec: 60,
            load: "bodyweight",
          }),
        ],
        "6–7",
      ),
      phase("cooldown", "optional", [
        block(`${id}-cd-child`, "Child's pose", "1:00", { timeSec: 60 }),
        block(`${id}-cd-breathe`, "Box breathe", "2:00", { timeSec: 120 }),
      ]),
    ],
  };
}

export type LearnStart =
  | { kind: "plan"; template: Template }
  | { kind: "built"; template: Template };

export function resolveLearnName(raw: string): LearnStart | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  const plan = matchCatalogPlan(trimmed);
  if (plan) return { kind: "plan", template: plan };
  return { kind: "built", template: buildLearnedTemplate(trimmed) };
}
