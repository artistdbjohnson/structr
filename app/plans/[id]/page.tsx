import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageFrame } from "@/components/PageFrame";
import { PlanMarks } from "@/components/PlanMarks";
import { StartPlanButton } from "@/components/StartPlanButton";
import styles from "@/components/subpage.module.css";
import { TEMPLATES, getTemplate } from "@/lib/templates";

export function generateStaticParams() {
  return TEMPLATES.map((template) => ({ id: template.id }));
}

export const dynamicParams = false;

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

  return (
    <PageFrame backHref="/plans" backLabel="‹ Plans" title={template.name}>
      <p className={styles.lead}>
        {template.focus} · {template.minutes}
      </p>
      <PlanMarks id={template.id} />
      <ol className={styles.phaseList}>
        {template.phases.map((phase, index) => (
          <li key={phase.id} className={styles.phaseItem}>
            <h2 className={styles.phaseName}>
              {index + 1}. {phase.name}
            </h2>
            <p className={styles.lead}>{phase.intent}</p>
            {phase.rpeTarget ? <p className={styles.lead}>RPE target {phase.rpeTarget}</p> : null}
            <ul className={styles.blockList}>
              {phase.blocks.map((block) => (
                <li key={block.id}>
                  {block.name} — {block.detail}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
      <StartPlanButton templateId={template.id} />
    </PageFrame>
  );
}
