import type { Metadata } from "next";
import Link from "next/link";
import { ComingSoonRow } from "@/components/ComingSoonRow";
import { PageFrame } from "@/components/PageFrame";
import styles from "@/components/subpage.module.css";
import { browseTree, soonChips, TEMPLATE_ROUTES, trainForHref } from "@/lib/taxonomy";
import { getTemplate } from "@/lib/templates";

export const metadata: Metadata = { title: "Browse" };

export default function BrowsePage() {
  const tree = browseTree();

  return (
    <PageFrame backHref="/plans" backLabel="‹ Train for" title="Browse">
      <p className={styles.lead}>Categories, then modules. Only kettlebell is ready to train.</p>
      <div className={styles.stack}>
        {tree.map(({ category, modules }) => (
          <section key={category.id} className={styles.stack} aria-labelledby={category.id}>
            <h2 id={category.id} className={styles.cardTitle}>
              {category.name}
            </h2>
            {modules.map((module) =>
              module.status === "live" ? (
                <article key={module.id} className={styles.card} data-module={module.id}>
                  <h3 className={styles.cardTitle}>{module.name}</h3>
                  <p className={styles.lead}>{module.blurb}</p>
                  <ul className={styles.templateList}>
                    {module.templateIds.map((taxonomyId) => {
                      const template = getTemplate(TEMPLATE_ROUTES[taxonomyId]);
                      if (!template) return null;
                      return (
                        <li key={template.id}>
                          <Link className={styles.templateLink} href={`/plans/${template.id}`}>
                            <span className={styles.cardTitle}>{template.name}</span>
                            <span className={styles.kicker}>{template.minutes}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                  {module.infoHref ? (
                    <Link className={styles.quietLink} href={module.infoHref}>
                      About kettlebell
                    </Link>
                  ) : null}
                </article>
              ) : (
                <ul key={module.id} className={styles.soonList}>
                  <ComingSoonRow id={module.id} name={module.name} />
                </ul>
              ),
            )}
          </section>
        ))}
        <section className={styles.card} aria-labelledby="more-goals-heading">
          <h2 id="more-goals-heading" className={styles.cardTitle}>
            More goals
          </h2>
          <p className={styles.lead}>Coming soon. Names only — nothing to start.</p>
          <ul className={styles.nameList}>
            {soonChips().map((chip) => (
              <li key={chip.id}>
                <Link className={styles.quietLink} href={trainForHref(chip.id)}>
                  {chip.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </PageFrame>
  );
}
