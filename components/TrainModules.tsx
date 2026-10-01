"use client";

import { useState } from "react";
import Link from "next/link";
import { ComingSoonRow } from "@/components/ComingSoonRow";
import { InfoLink } from "@/components/InfoLink";
import { PlanMarks } from "@/components/PlanMarks";
import { StartPlanButton } from "@/components/StartPlanButton";
import styles from "@/components/subpage.module.css";
import {
  getCategory,
  templateCountLabel,
  type CatalogModule,
  type TrainChip,
} from "@/lib/taxonomy";
import type { Template } from "@/lib/types";

type ChipTemplate = { taxonomyId: string; template: Template };

/** Live modules collapse to title + count. One open at a time. */
export function TrainModules({
  chip,
  modules,
  templates,
  comingSoon,
}: {
  chip: TrainChip;
  modules: CatalogModule[];
  templates: ChipTemplate[];
  comingSoon: CatalogModule[];
}) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className={styles.stack}>
      <div className={styles.accList}>
        {modules.map((module) => {
          const category = getCategory(module.categoryId);
          const open = openId === module.id;
          const panelId = `${module.id}-templates`;
          return (
            <section key={module.id} className={styles.accItem} data-module={module.id} data-open={open ? "true" : "false"}>
              <div className={styles.accHead}>
                <button
                  type="button"
                  className={styles.accButton}
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setOpenId((current) => (current === module.id ? null : module.id))}
                >
                  <span className={styles.accMain}>
                    {category ? <span className={styles.eyebrow}>{category.name}</span> : null}
                    <span className={styles.accName}>{module.name}</span>
                  </span>
                  <span className={styles.accSide}>
                    <span className={styles.accMeta}>{templateCountLabel(templates.length)}</span>
                    <span className={styles.accChevron} data-open={open ? "true" : "false"} aria-hidden="true">
                      ▾
                    </span>
                  </span>
                </button>
                {module.infoHref ? <InfoLink href={module.infoHref} label={`${module.name} info`} /> : null}
              </div>
              {open ? (
                <article id={panelId} className={styles.card}>
                  <p className={styles.lead}>{module.blurb}</p>
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
              ) : null}
            </section>
          );
        })}
      </div>
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
  );
}
