import Link from "next/link";
import { InfoLink } from "@/components/InfoLink";
import { LearnSkill } from "@/components/LearnSkill";
import { PageFrame } from "@/components/PageFrame";
import { TrainModules } from "@/components/TrainModules";
import styles from "@/components/subpage.module.css";
import {
  comingSoonForChip,
  goalForChip,
  mainChips,
  modulesForChip,
  moreChips,
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
  const infoHref = goal?.infoHref ?? modules[0]?.infoHref ?? "/plans/info";
  const infoLabel = infoHref === "/plans/info" ? "Kettlebell info" : `${goal?.label ?? modules[0]?.name ?? "Plan"} info`;
  const more = moreChips();
  const moreSoon = more.some((item) => item.status === "soon");

  return (
    <PageFrame
      title="Train for"
      titleId="train-for-title"
      tone="night"
      trailing={infoHref ? <InfoLink href={infoHref} label={infoLabel} /> : undefined}
    >
      <nav className={styles.goals} aria-label="Train for" data-train-for={chip.id} data-chip-status={chip.status}>
        <div className={styles.chipRow}>
          {mainChips().map((item) => {
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
        {more.length > 0 ? (
        <details key={chip.id} className={styles.more} open={chip.shelf === "more"}>
          <summary>
            More goals
            {moreSoon ? <span className={styles.mark}>Coming soon</span> : null}
          </summary>
          <div className={styles.chipRow} aria-label="More goals">
            {more.map((item) => {
              const selected = item.id === chip.id;
              const soon = item.status === "soon";
              return (
                <Link
                  key={item.id}
                  href={trainForHref(item.id)}
                  className={
                    soon
                      ? selected
                        ? `${styles.chip} ${styles.chipSoon} ${styles.chipOn}`
                        : `${styles.chip} ${styles.chipSoon}`
                      : selected
                        ? `${styles.chip} ${styles.chipOn}`
                        : styles.chip
                  }
                  aria-current={selected ? "page" : undefined}
                  data-chip={item.id}
                >
                  {item.label}
                  {soon ? <span className={styles.sr}>Coming soon</span> : null}
                </Link>
              );
            })}
          </div>
        </details>
        ) : null}
      </nav>

      {live ? (
        <>
          <p className={styles.lead}>{chip.why}</p>
          <TrainModules chip={chip} modules={modules} templates={templates} comingSoon={comingSoon} />
        </>
      ) : (
        <section className={`${styles.glass} ${styles.glassSoon}`} aria-labelledby="soon-goal-heading">
          <h2 id="soon-goal-heading" className={styles.cardTitle}>
            {chip.label}
          </h2>
          <p className={styles.mark}>Coming soon</p>
          <p className={styles.lead}>{goal?.lede ?? "Still writing this."}</p>
          <p className={styles.lead}>Just names for now. You can't start these yet.</p>
          <ul className={styles.planned}>
            {chip.plannedNames.map((name) => (
              <li key={name}>
                <span className={styles.plannedName}>{name}</span>
                <span className={styles.kicker}>Not yet</span>
              </li>
            ))}
          </ul>
          <div className={styles.soonActions}>
            {goal ? (
              <Link className={styles.ghost} href={goal.infoHref}>
                About {chip.label}
              </Link>
            ) : null}
            <Link className={styles.ghost} href="/train">
              Browse kettlebell
            </Link>
          </div>
        </section>
      )}

      <LearnSkill />
      <Link className={styles.quietLink} href="/plans">
        Browse all
      </Link>
    </PageFrame>
  );
}
