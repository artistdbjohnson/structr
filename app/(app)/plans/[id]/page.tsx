import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InfoLink } from "@/components/InfoLink";
import { PageFrame } from "@/components/PageFrame";
import { PlanMarks } from "@/components/PlanMarks";
import { StartPlanButton } from "@/components/StartPlanButton";
import styles from "@/components/subpage.module.css";
import { infoHrefForTemplate } from "@/lib/taxonomy";
import { TEMPLATES, getTemplate } from "@/lib/templates";

export function generateStaticParams() {
  return TEMPLATES.map((template) => ({ id: template.id }));
}

export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const template = getTemplate(id);
  return { title: template?.name ?? "Plan" };
}

export default async function PlanDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const template = getTemplate(id);
  if (!template) notFound();
  const info = infoHrefForTemplate(template.id);

  return (
    <PageFrame
      backHref="/plans"
      backLabel="‹ Plans"
      title={template.name}
      meta={template.minutes}
      trailing={<InfoLink href={info.href} label={info.label} />}
    >
      <div className={styles.withStart}>
        <p className={styles.lead}>{template.focus}</p>
        <PlanMarks id={template.id} />
        <ol className={styles.phaseList}>
        {template.phases.map((phase, index) => (
          <li key={phase.id} className={styles.phaseItem}>
            <div className={styles.phaseHead}>
              <h2 className={styles.phaseName}>
                {index + 1}. {phase.name}
              </h2>
              {phase.rpeTarget ? <p className={styles.kicker}>Aim for {phase.rpeTarget}</p> : null}
            </div>
            <p className={styles.lead}>{phase.intent}</p>
            <ul className={styles.blockList}>
              {phase.blocks.map((block) => (
                <li key={block.id}>
                  <span className={styles.blockName}>{block.name}</span>
                  <span className={styles.blockDetail}>{block.detail}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
        </ol>
      </div>
      <div className={styles.startBar}>
        <div className={styles.startBarInner}>
          <StartPlanButton templateId={template.id} />
        </div>
      </div>
    </PageFrame>
  );
}
