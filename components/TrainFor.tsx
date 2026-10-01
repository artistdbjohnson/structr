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
  const showInfo = modules.some((module) => module.infoHref);

  return (
    <PageFrame
      backHref="/"
      backLabel="‹ Home"
      title="Train for"
      trailing={showInfo ? <InfoLink /> : undefined}
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
                  </div>
                  <p className={styles.lead}>{module.blurb}</p>
                  <p className={styles.lead}>{templateCountLabel(templates.length)}</p>
                  {module.infoHref ? (
                    <Link className={styles.quietLink} href={module.infoHref}>
                      About kettlebell
                    </Link>
                  ) : null}
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
                    <ComingSoonRow key={module.id} id={module.id} name={module.name} />
                  ))}
                </ul>
              </section>
            ) : null}
          </div>
        </>
      ) : (
        <section className={styles.stack} aria-labelledby="soon-goal-heading">
          <h2 id="soon-goal-heading" className={styles.cardTitle}>
            {chip.label}
          </h2>
          <p className={styles.lead}>We&apos;re building this.</p>
          <ul className={styles.nameList}>
            {chip.plannedNames.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
          <Link className={styles.ghost} href="/plans">
            Browse kettlebell
          </Link>
        </section>
      )}

      <Link className={styles.quietLink} href="/plans/browse">
        Browse all
      </Link>
    </PageFrame>
  );
}
