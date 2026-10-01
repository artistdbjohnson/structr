"use client";

import { useState } from "react";
import Link from "next/link";
import { InfoLink } from "@/components/InfoLink";
import { PageFrame } from "@/components/PageFrame";
import { PlanMarks } from "@/components/PlanMarks";
import { StartPlanButton } from "@/components/StartPlanButton";
import styles from "@/components/subpage.module.css";
import {
  TEMPLATE_ROUTES,
  browseTree,
  templateCountLabel,
  type CatalogModule,
  type GoalPage,
} from "@/lib/taxonomy";
import { getTemplate } from "@/lib/templates";

export function CatalogBrowse() {
  const tree = browseTree();
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [openModule, setOpenModule] = useState<string | null>(null);
  const seenGoals = new Set<string>();

  function toggleCategory(id: string) {
    setOpenCategory((current) => (current === id ? null : id));
    setOpenModule(null);
  }

  return (
    <PageFrame backHref="/plans" backLabel="‹ Train for" title="Browse">
      <p className={styles.lead}>
        Categories, then modules, then templates. Kettlebell is the only thing you can start.
      </p>
      <div className={styles.accList}>
        {tree.map(({ category, modules, goal }) => {
          const goalSeen = goal ? seenGoals.has(goal.id) : false;
          if (goal) seenGoals.add(goal.id);
          const open = openCategory === category.id;
          const panelId = `${category.id}-panel`;
          return (
            <section
              key={category.id}
              className={styles.accItem}
              data-category={category.id}
              data-open={open ? "true" : "false"}
            >
              <button
                type="button"
                className={styles.accButton}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => toggleCategory(category.id)}
              >
                <span className={styles.accMain}>
                  <span className={styles.accName}>{category.name}</span>
                </span>
                <span className={styles.accSide}>
                  <span className={styles.accMeta}>{categoryMeta(modules, goal, goalSeen)}</span>
                  <span className={styles.accChevron} data-open={open ? "true" : "false"} aria-hidden="true">
                    ▾
                  </span>
                </span>
              </button>
              {open ? (
                <div id={panelId} className={styles.accPanel}>
                  <p className={styles.lead}>{category.blurb}</p>
                  {modules.map((module) => (
                    <ModuleDisclosure
                      key={module.id}
                      module={module}
                      open={openModule === module.id}
                      onToggle={() => setOpenModule((current) => (current === module.id ? null : module.id))}
                    />
                  ))}
                  {goal && !goalSeen && modules.length === 0 ? <GoalBody goal={goal} /> : null}
                  {goal && !goalSeen && modules.length > 0 ? (
                    <ModuleDisclosure
                      key={goal.id}
                      module={{
                        id: goal.id,
                        name: goal.label,
                        blurb: goal.lede,
                        status: "soon",
                        infoHref: goal.infoHref,
                        planned: goal.plannedNames.map((name) => ({ name, minutes: "Name only" })),
                        bridge: goal.id === "goal_stay_capable",
                      }}
                      open={openModule === goal.id}
                      onToggle={() => setOpenModule((current) => (current === goal.id ? null : goal.id))}
                    />
                  ) : null}
                  {goal && goalSeen ? (
                    <p className={styles.lead}>
                      Same home as{" "}
                      <Link className={styles.quietLink} href={goal.infoHref}>
                        {goal.label}
                      </Link>
                      .
                    </p>
                  ) : null}
                </div>
              ) : null}
            </section>
          );
        })}
      </div>
    </PageFrame>
  );
}

function categoryMeta(modules: CatalogModule[], goal: GoalPage | undefined, goalSeen: boolean): string {
  const parts: string[] = [];
  if (modules.length > 0) {
    parts.push(modules.length === 1 ? "1 module" : `${modules.length} modules`);
  }
  const templates = modules.reduce((sum, module) => sum + module.templateIds.length, 0);
  if (templates > 0) parts.push(templateCountLabel(templates));
  if (goal && !goalSeen && modules.length === 0) {
    parts.push(goal.plannedNames.length === 1 ? "1 planned" : `${goal.plannedNames.length} planned`);
  }
  if (goal && !goalSeen && modules.length > 0) parts.push("More goals");
  if (goal && goalSeen) parts.push(goal.label);
  return parts.join(" · ") || "Coming soon";
}

type DisclosureModule = {
  id: string;
  name: string;
  blurb: string;
  status: "live" | "soon";
  infoHref: string;
  planned: { name: string; minutes: string; bridgeTemplateId?: string }[];
  bridge?: boolean;
  templateIds?: CatalogModule["templateIds"];
};

function ModuleDisclosure({
  module,
  open,
  onToggle,
}: {
  module: CatalogModule | DisclosureModule;
  open: boolean;
  onToggle: () => void;
}) {
  const panelId = `${module.id}-body`;
  const live = module.status === "live";
  const planned = "plannedTemplates" in module ? module.plannedTemplates : module.planned;
  const templateIds = ("templateIds" in module ? module.templateIds : undefined) ?? [];
  const meta = live
    ? templateCountLabel(templateIds.length)
    : planned.length > 0
      ? `${planned.length} planned`
      : "Coming soon";

  return (
    <div className={styles.accItem} data-module={module.id} data-status={module.status} data-open={open ? "true" : "false"}>
      <div className={styles.accHead}>
        <button type="button" className={styles.accButton} aria-expanded={open} aria-controls={panelId} onClick={onToggle}>
          <span className={styles.accMain}>
            {"subcategory" in module ? <span className={styles.eyebrow}>{module.subcategory}</span> : null}
            <span className={styles.accName}>{module.name}</span>
          </span>
          <span className={styles.accSide}>
            <span className={styles.accMeta}>{meta}</span>
            {!live ? <span className={styles.mark}>Coming soon</span> : null}
            <span className={styles.accChevron} data-open={open ? "true" : "false"} aria-hidden="true">
              ▾
            </span>
          </span>
        </button>
        <InfoLink href={module.infoHref} label={`${module.name} info`} />
      </div>
      {open ? (
        <div id={panelId} className={live ? styles.card : `${styles.card} ${styles.glassSoon}`}>
          <p className={styles.lead}>{module.blurb}</p>
          {live ? (
            <ul className={styles.templateList}>
              {templateIds.map((taxonomyId) => {
                const template = getTemplate(TEMPLATE_ROUTES[taxonomyId]);
                if (!template) return null;
                return (
                  <li key={template.id} className={styles.templateRow} data-template={template.id}>
                    <Link className={styles.templateLink} href={`/plans/${template.id}`}>
                      <span className={styles.cardTitle}>{template.name}</span>
                      <span className={styles.kicker}>{template.minutes}</span>
                      <span className={styles.lead}>{template.focus}</span>
                    </Link>
                    <PlanMarks id={template.id} />
                    <StartPlanButton templateId={template.id} />
                  </li>
                );
              })}
            </ul>
          ) : (
            <>
              <ul className={styles.planned}>
                {planned.map((item) => (
                  <li key={item.name}>
                    <span className={styles.plannedName}>{item.name}</span>
                    <span className={styles.kicker}>{item.minutes}</span>
                    {"bridgeTemplateId" in item && item.bridgeTemplateId ? (
                      <Link className={styles.quietLink} href={`/plans/${item.bridgeTemplateId}`}>
                        Continues in Get-Up Primer
                      </Link>
                    ) : (
                      <span className={styles.kicker}>Not startable</span>
                    )}
                  </li>
                ))}
              </ul>
              {"bridge" in module && module.bridge ? (
                <Link className={styles.quietLink} href="/plans/get-up-primer">
                  Get-Up Primer is live
                </Link>
              ) : null}
              <Link className={styles.quietLink} href={module.infoHref}>
                {"bridge" in module ? `About ${module.name}` : "Read the briefing"}
              </Link>
            </>
          )}
        </div>
      ) : null}
    </div>
  );
}

function GoalBody({ goal }: { goal: GoalPage }) {
  return (
    <article className={`${styles.card} ${styles.glassSoon}`} data-goal={goal.id} data-status="soon">
      <div className={styles.moduleHead}>
        <h3 className={styles.cardTitle}>{goal.label}</h3>
        <InfoLink href={goal.infoHref} label={`${goal.label} info`} />
      </div>
      <p className={styles.lead}>{goal.lede}</p>
      <p className={styles.mark}>Coming soon</p>
      <ul className={styles.planned}>
        {goal.plannedNames.map((name) => (
          <li key={name}>
            <span className={styles.plannedName}>{name}</span>
            <span className={styles.kicker}>Name only</span>
          </li>
        ))}
      </ul>
      {goal.id === "goal_stay_capable" ? (
        <Link className={styles.quietLink} href="/plans/get-up-primer">
          Get-Up Primer is live
        </Link>
      ) : null}
      <Link className={styles.quietLink} href={goal.infoHref}>
        About {goal.label}
      </Link>
    </article>
  );
}
