"use client";

import { Children, Fragment, useState, type ReactNode } from "react";
import Link from "next/link";
import { InfoLink } from "@/components/InfoLink";
import { LearnSkill } from "@/components/LearnSkill";
import { PageFrame } from "@/components/PageFrame";
import { PlanMarks } from "@/components/PlanMarks";
import { StartPlanButton } from "@/components/StartPlanButton";
import styles from "@/components/subpage.module.css";
import {
  TEMPLATE_ROUTES,
  browseTree,
  plansForTaxonomyIds,
  templateCountLabel,
  type CatalogModule,
  type GoalPage,
} from "@/lib/taxonomy";
import { getTemplate } from "@/lib/templates";
import type { Template } from "@/lib/types";

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
    <PageFrame title="Plans">
      <p className={styles.lead}>
        Open a practice, then a plan. Every startable move has a clip in How.
      </p>
      <LearnSkill />
      <div className={styles.accList}>
        {tree.map(({ category, modules, goal }) => {
          const goalSeen = goal ? seenGoals.has(goal.id) : false;
          if (goal) seenGoals.add(goal.id);
          const open = openCategory === category.id;
          const panelId = `${category.id}-panel`;
          const showGoal = Boolean(goal && !goalSeen);
          const entries: PileEntry[] =
            modules.length > 0
              ? [
                  ...modules.map((module) => ({
                    id: module.id,
                    open: openModule === module.id,
                    panelId: `${module.id}-body`,
                    attrs: {
                      "data-module": module.id,
                      "data-status": module.status,
                      "data-open": openModule === module.id ? "true" : "false",
                    },
                    header: (
                      <ModuleHeader
                        module={module}
                        open={openModule === module.id}
                        onToggle={() =>
                          setOpenModule((current) => (current === module.id ? null : module.id))
                        }
                      />
                    ),
                    cards: moduleCards(module),
                  })),
                  ...(showGoal && goal
                    ? [
                        {
                          id: goal.id,
                          open: openModule === goal.id,
                          panelId: `${goal.id}-body`,
                          attrs: {
                            "data-goal": goal.id,
                            "data-status": "soon",
                            "data-open": openModule === goal.id ? "true" : "false",
                          },
                          header: (
                            <ModuleHeader
                              module={{
                                id: goal.id,
                                name: goal.label,
                                blurb: goal.lede,
                                status: "soon",
                                infoHref: goal.infoHref,
                                planned: goal.plannedNames.map((name) => ({ name, minutes: "Just a name" })),
                                bridge: goal.id === "goal_stay_capable",
                              }}
                              open={openModule === goal.id}
                              onToggle={() =>
                                setOpenModule((current) => (current === goal.id ? null : goal.id))
                              }
                            />
                          ),
                          cards: goalNameCards(goal),
                        } satisfies PileEntry,
                      ]
                    : []),
                ]
              : [];
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
                <div id={panelId} className={`${styles.accPanel} ${styles.accPanelNest}`}>
                  <p className={styles.lead}>{category.blurb}</p>
                  {entries.length > 0 ? <CategoryPile entries={entries} /> : null}
                  {showGoal && goal && modules.length === 0 ? <GoalNest goal={goal} /> : null}
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
    parts.push(modules.length === 1 ? "1 practice" : `${modules.length} practices`);
  }
  const templates = modules.reduce((sum, module) => sum + module.templateIds.length, 0);
  if (templates > 0) parts.push(templateCountLabel(templates));
  if (goal && !goalSeen && modules.length === 0) {
    const live = goal.templateIds?.length ?? 0;
    if (live > 0) parts.push(templateCountLabel(live));
    else parts.push(goal.plannedNames.length === 1 ? "1 planned" : `${goal.plannedNames.length} planned`);
  }
  if (goal && !goalSeen && modules.length > 0) parts.push("More goals");
  if (goal && goalSeen) parts.push(goal.label);
  return parts.join(" · ") || "Coming soon";
}

type PileAttrs = {
  "data-module"?: string;
  "data-goal"?: string;
  "data-status"?: string;
  "data-open"?: string;
};

type PileEntry = {
  id: string;
  open: boolean;
  panelId: string;
  attrs?: PileAttrs;
  header: ReactNode;
  cards: ReactNode[];
};

/** Sticky step. Each next card drops 12px. The safe area is only the screen inset. */
function stickyTop(step: number): string {
  return `calc(${step * 12}px + env(safe-area-inset-top, 0px))`;
}

/** Cards higher in the pile scale down 1.2% per step. The last card stays full size. */
function pileScale(index: number, total: number): string {
  return (1 - (total - 1 - index) * 0.012).toFixed(3);
}

function CardNest({
  children,
  startStep = 0,
  zStart = 1,
  flushEnd = false,
}: {
  children: ReactNode;
  startStep?: number;
  zStart?: number;
  flushEnd?: boolean;
}) {
  const items = Children.toArray(children).filter(Boolean);
  const total = items.length;
  if (total === 0) return null;
  return (
    <div className={styles.cardNest}>
      {items.map((child, index) => {
        const last = index === total - 1;
        return (
          <div
            key={index}
            className={styles.cardNestItem}
            style={{
              top: stickyTop(startStep + index),
              zIndex: zStart + index,
              marginBottom: last && flushEnd ? 0 : 12,
            }}
          >
            <div className={styles.cardNestFace} style={{ transform: `scale(${pileScale(index, total)})` }}>
              {child}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/**
 * Subcategory cards share one column so they stick and pile together.
 * An open card's plans are their own pile in that same column, not a flat list.
 */
function CategoryPile({ entries }: { entries: PileEntry[] }) {
  let z = 1;
  return (
    <div className={styles.cardNest}>
      {entries.map((entry, index) => {
        const cards = entry.cards.filter(Boolean);
        const showCards = entry.open && cards.length > 0;
        const last = index === entries.length - 1;
        const headerZ = z;
        z += 1;
        const planZ = z;
        if (showCards) z += cards.length;
        return (
          <Fragment key={entry.id}>
            <div
              className={styles.cardNestItem}
              {...entry.attrs}
              style={{
                top: stickyTop(index),
                zIndex: headerZ,
                marginBottom: last && !showCards ? 0 : 12,
              }}
            >
              <div
                className={styles.cardNestFace}
                style={{ transform: `scale(${pileScale(index, entries.length)})` }}
              >
                {entry.header}
              </div>
            </div>
            {showCards ? (
              <div id={entry.panelId}>
                <CardNest startStep={index + 1} zStart={planZ} flushEnd={last}>
                  {cards}
                </CardNest>
              </div>
            ) : null}
          </Fragment>
        );
      })}
    </div>
  );
}

type PlannedRow = { name: string; minutes: string; bridgeTemplateId?: string };

type DisclosureModule = {
  id: string;
  name: string;
  blurb: string;
  status: "live" | "soon";
  infoHref: string;
  planned: PlannedRow[];
  bridge?: boolean;
  templateIds?: CatalogModule["templateIds"];
};

function ModuleHeader({
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
    <>
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
        <>
          <p className={styles.nestBlurb}>{module.blurb}</p>
          {!live ? (
            <div className={styles.nestExtra}>
              {"bridge" in module && module.bridge ? (
                <Link className={styles.quietLink} href="/plans/get-up-primer">
                  Get-Up Primer is ready
                </Link>
              ) : null}
              <Link className={styles.quietLink} href={module.infoHref}>
                {`About ${module.name}`}
              </Link>
            </div>
          ) : null}
        </>
      ) : null}
    </>
  );
}

function moduleCards(module: CatalogModule | DisclosureModule): ReactNode[] {
  const live = module.status === "live";
  const planned = "plannedTemplates" in module ? module.plannedTemplates : module.planned;
  const templateIds = ("templateIds" in module ? module.templateIds : undefined) ?? [];
  if (live) {
    return templateIds.flatMap((taxonomyId) => {
      const template = getTemplate(TEMPLATE_ROUTES[taxonomyId]);
      return template ? [<PlanCard key={template.id} template={template} />] : [];
    });
  }
  return planned.map((item) => <PlannedCard key={item.name} item={item} />);
}

function PlanCard({ template }: { template: Template }) {
  return (
    <article className={styles.card} data-template={template.id}>
      <Link className={styles.templateLink} href={`/plans/${template.id}`}>
        <span className={styles.cardTitle}>{template.name}</span>
        <span className={styles.kicker}>{template.minutes}</span>
        <span className={styles.lead}>{template.focus}</span>
      </Link>
      <PlanMarks id={template.id} />
      <StartPlanButton templateId={template.id} />
    </article>
  );
}

function PlannedCard({ item }: { item: PlannedRow }) {
  return (
    <article className={`${styles.card} ${styles.glassSoon}`}>
      <span className={styles.plannedName}>{item.name}</span>
      <span className={styles.kicker}>{item.minutes}</span>
      {item.bridgeTemplateId ? (
        <Link className={styles.quietLink} href={`/plans/${item.bridgeTemplateId}`}>
          Continues in Get-Up Primer
        </Link>
      ) : (
        <span className={styles.kicker}>Not yet</span>
      )}
    </article>
  );
}

function goalNameCards(goal: GoalPage): ReactNode[] {
  return goal.plannedNames.map((name) => <PlannedCard key={name} item={{ name, minutes: "Just a name" }} />);
}

function GoalNest({ goal }: { goal: GoalPage }) {
  const templates = plansForTaxonomyIds(goal.templateIds ?? []);
  const live = templates.length > 0;
  const cards = live
    ? templates.map((template) => <PlanCard key={template.id} template={template} />)
    : goalNameCards(goal);
  return (
    <CategoryPile
      entries={[
        {
          id: goal.id,
          open: true,
          panelId: `${goal.id}-body`,
          attrs: {
            "data-goal": goal.id,
            "data-status": live ? "live" : "soon",
            "data-open": "true",
          },
          header: (
            <article className={live ? styles.card : `${styles.card} ${styles.glassSoon}`}>
              <div className={styles.moduleHead}>
                <h3 className={styles.cardTitle}>{goal.label}</h3>
                <InfoLink href={goal.infoHref} label={`${goal.label} info`} />
              </div>
              <p className={styles.lead}>{goal.lede}</p>
              {!live ? <p className={styles.mark}>Coming soon</p> : null}
              {!live && goal.id === "goal_stay_capable" ? (
                <Link className={styles.quietLink} href="/plans/get-up-primer">
                  Get-Up Primer is ready
                </Link>
              ) : null}
              <Link className={styles.quietLink} href={goal.infoHref}>
                About {goal.label}
              </Link>
            </article>
          ),
          cards,
        },
      ]}
    />
  );
}
