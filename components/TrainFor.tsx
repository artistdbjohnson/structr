import Link from "next/link";
import { InfoLink } from "@/components/InfoLink";
import { PageFrame } from "@/components/PageFrame";
import { PlanMarks } from "@/components/PlanMarks";
import { StartPlanButton } from "@/components/StartPlanButton";
import { ComingSoonRow } from "@/components/ComingSoonRow";
import styles from "@/components/subpage.module.css";
import {
  comingSoonForChip,
  getCategory,
  goalForChip,
  liveChips,
  modulesForChip,
  soonChips,
  templateCountLabel,
  templatesForChip,
  trainForHref,
  type TrainChip,
} from "@/lib/taxonomy";

export function TrainFor({ chip }: { chip: TrainChip }) {
  const live = chip.status === "live";
  const modules = modulesForChip(chip);
  const templates = templatesForChip(chip);
  const comingSoon = comingSoonForChip(chip);
  const goal = goalForChip(chip.id);
  const infoHref = live ? "/plans/info" : goal?.infoHref;
  const infoLabel = live ? "Kettlebell info" : goal ? `${goal.label} info` : "Info";

  return (
    <PageFrame
      title="Train for"
      trailing={infoHref ? <InfoLink href={infoHref} label={infoLabel} /> : undefined}
    >
      <nav className={styles.goals} aria-label="Train for" data-train-for={chip.id} data-chip-status={chip.status}>
        <div className={styles.chipRow}>
          {liveChips().map((item) => {
            const selected = item.id === chip.id;
            return (
              <Link
                key={item.id}
                href={trainForHref(item.id)}
                className={selected ? `${styles.chip} ${styles.chipOn}` : styles.chip}
                aria-current={selected ? "page" : undefined}
                data-chip={item.id}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
        <details key={chip.id} className={styles.more} open={chip.status === "soon"}>
          <summary>
            More goals
            <span className={styles.mark}>Coming soon</span>
          </summary>
          <div className={styles.chipRow} aria-label="More goals">
            {soonChips().map((item) => {
              const selected = item.id === chip.id;
              return (
                <Link
                  key={item.id}
                  href={trainForHref(item.id)}
                  className={
                    selected ? `${styles.chip} ${styles.chipSoon} ${styles.chipOn}` : `${styles.chip} ${styles.chipSoon}`
                  }
                  aria-current={selected ? "page" : undefined}
                  data-chip={item.id}
                >
                  {item.label}
                  <span className={styles.sr}>Coming soon</span>
                </Link>
              );
            })}
          </div>
        </details>
      </nav>

      {live ? (
        <>
          <p className={styles.lead}>{chip.why}</p>
          <div className={styles.stack}>
            {modules.map((module) => {
              const category = getCategory(module.categoryId);
              return (
                <article key={module.id} id={module.id} className={styles.card} data-module={module.id}>
                  {category ? <p className={styles.eyebrow}>{category.name}</p> : null}
                  <div className={styles.moduleHead}>
                    <h2 className={styles.cardTitle}>{module.name}</h2>
                    {module.infoHref ? <InfoLink href={module.infoHref} label={`${module.name} info`} /> : null}
                  </div>
                  <p className={styles.lead}>{module.blurb}</p>
                  <p className={styles.lead}>{templateCountLabel(templates.length)}</p>
                  <ul className={styles.templateList}>
                    {templates.map(({ taxonomyId, template }) => {
                      const primary = taxonomyId === chip.primaryTemplateId;
                      return (
                        <li key={template.id} className={styles.templateRow} data-template={template.id}>
                          <Link className={styles.templateLink} href={`/plans/${template.id}`}>
                            <span className={styles.templateTitle}>
                              <span className={styles.cardTitle}>{template.name}</span>
                              {chip.id === "move-freer" && primary ? (
                                <span className={styles.mark}>Featured</span>
                              ) : null}
                            </span>
                            <span className={styles.kicker}>{template.minutes}</span>
                            <span className={styles.lead}>{template.focus}</span>
                          </Link>
                          <PlanMarks id={template.id} />
                          <StartPlanButton
                            templateId={template.id}
                            className={primary ? `${styles.primary} ${styles.blockBtn}` : `${styles.ghost} ${styles.blockBtn}`}
                          />
                        </li>
                      );
                    })}
                  </ul>
                </article>
              );
            })}
            {comingSoon.length > 0 ? (
              <section className={styles.card} aria-labelledby="coming-soon-heading">
                <h2 id="coming-soon-heading" className={styles.cardTitle}>
                  Coming soon
                </h2>
                <p className={styles.lead}>Names only. These don’t start a session.</p>
                <ul className={styles.soonList}>
                  {comingSoon.map((module) => (
                    <ComingSoonRow key={module.id} id={module.id} name={module.name} href={module.infoHref} />
                  ))}
                </ul>
              </section>
            ) : null}
          </div>
        </>
      ) : (
        <section className={`${styles.glass} ${styles.glassSoon}`} aria-labelledby="soon-goal-heading">
          <h2 id="soon-goal-heading" className={styles.cardTitle}>
            {chip.label}
          </h2>
          <p className={styles.mark}>Coming soon</p>
          <p className={styles.lead}>{goal?.lede ?? "We're building this."}</p>
          <p className={styles.lead}>Names only. Nothing here starts a session.</p>
          <ul className={styles.planned}>
            {chip.plannedNames.map((name) => (
              <li key={name}>
                <span className={styles.plannedName}>{name}</span>
                <span className={styles.kicker}>Not startable</span>
              </li>
            ))}
          </ul>
          <div className={styles.soonActions}>
            {goal ? (
              <Link className={styles.ghost} href={goal.infoHref}>
                About {chip.label}
              </Link>
            ) : null}
            <Link className={styles.ghost} href="/plans">
              Browse kettlebell
            </Link>
          </div>
        </section>
      )}

      <Link className={styles.quietLink} href="/plans/browse">
        Browse all
      </Link>
    </PageFrame>
  );
}
