import type { Metadata } from "next";
import Link from "next/link";
import { InfoLink } from "@/components/InfoLink";
import { PageFrame } from "@/components/PageFrame";
import { PlanMarks } from "@/components/PlanMarks";
import { StartPlanButton } from "@/components/StartPlanButton";
import styles from "@/components/subpage.module.css";
import { TEMPLATES } from "@/lib/templates";

export const metadata: Metadata = { title: "Plans" };

export default function PlansPage() {
  return (
    <PageFrame backHref="/" backLabel="‹ Home" title="Plans" trailing={<InfoLink />}>
      <p className={styles.lead}>Three kettlebell templates. Phases stay in order.</p>
      <div className={styles.stack}>
        {TEMPLATES.map((template) => (
          <article key={template.id} className={styles.card} data-template={template.id}>
            <Link className={styles.cardLink} href={`/plans/${template.id}`}>
              <h2 className={styles.cardTitle}>{template.name}</h2>
              <p className={styles.lead}>
                {template.focus} · {template.minutes}
              </p>
            </Link>
            <PlanMarks id={template.id} />
            <StartPlanButton templateId={template.id} />
          </article>
        ))}
      </div>
    </PageFrame>
  );
}
