import Link from "next/link";
import { InfoLink } from "@/components/InfoLink";
import { PageFrame } from "@/components/PageFrame";
import { TrainModules } from "@/components/TrainModules";
import styles from "@/components/subpage.module.css";
import {
  comingSoonForChip,
  goalForChip,
  liveChips,
  modulesForChip,
  soonChips,
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
      titleId="train-for-title"
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
