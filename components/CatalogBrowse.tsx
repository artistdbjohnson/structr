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
  const seenGoals = new Set<string>();

  return (
    <PageFrame backHref="/plans" backLabel="‹ Train for" title="Browse">
      <p className={styles.lead}>
        Categories, then modules, then templates. Kettlebell is the only thing you can start.
      </p>
      <div className={styles.stack}>
        {tree.map(({ category, modules, goal }) => {
          const goalSeen = goal ? seenGoals.has(goal.id) : false;
          if (goal) seenGoals.add(goal.id);
          return (
            <section key={category.id} className={styles.category} aria-labelledby={category.id}>
              <header className={styles.categoryHead}>
                <h2 id={category.id} className={styles.cardTitle}>
                  {category.name}
                </h2>
                <p className={styles.lead}>{category.blurb}</p>
              </header>
              {modules.map((module) => (
                <ModuleCard key={module.id} module={module} />
              ))}
              {goal && !goalSeen ? <GoalCard goal={goal} /> : null}
              {goal && goalSeen ? (
                <p className={styles.lead}>
                  Same home as{" "}
                  <Link className={styles.quietLink} href={goal.infoHref}>
                    {goal.label}
                  </Link>
                  .
                </p>
              ) : null}
            </section>
          );
        })}
      </div>
    </PageFrame>
  );
}

function ModuleCard({ module }: { module: CatalogModule }) {
  const live = module.status === "live";
  return (
    <article
      className={live ? styles.glass : `${styles.glass} ${styles.glassSoon}`}
      data-module={module.id}
      data-status={module.status}
    >
      <p className={styles.eyebrow}>{module.subcategory}</p>
      <div className={styles.moduleHead}>
        <h3 className={styles.cardTitle}>{module.name}</h3>
        <InfoLink href={module.infoHref} label={`${module.name} info`} />
      </div>
      <p className={styles.lead}>{module.blurb}</p>
      {live ? (
        <>
          <p className={styles.kicker}>{templateCountLabel(module.templateIds.length)} ready</p>
          <ul className={styles.templateList}>
            {module.templateIds.map((taxonomyId) => {
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
        </>
      ) : (
        <>
          <p className={styles.mark}>Coming soon</p>
          <ul className={styles.planned}>
            {module.plannedTemplates.map((item) => (
              <li key={item.name}>
                <span className={styles.plannedName}>{item.name}</span>
                <span className={styles.kicker}>{item.minutes}</span>
                {item.bridgeTemplateId ? (
                  <Link className={styles.quietLink} href={`/plans/${item.bridgeTemplateId}`}>
                    Continues in Get-Up Primer
                  </Link>
                ) : (
                  <span className={styles.kicker}>Not startable</span>
                )}
              </li>
            ))}
          </ul>
          <Link className={styles.quietLink} href={module.infoHref}>
            Read the briefing
          </Link>
        </>
      )}
    </article>
  );
}

function GoalCard({ goal }: { goal: GoalPage }) {
  return (
    <article className={`${styles.glass} ${styles.glassSoon}`} data-goal={goal.id} data-status="soon">
      <p className={styles.eyebrow}>More goals</p>
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
