import Link from "next/link";
import { PageFrame } from "@/components/PageFrame";
import styles from "@/components/subpage.module.css";

export default function PlanUnavailable() {
  return (
    <PageFrame backHref="/plans" backLabel="‹ Plans" title="Plan unavailable">
      <p className={styles.lead}>That plan isn't here.</p>
      <Link className={styles.primary} href="/plans">
        Back to Plans
      </Link>
    </PageFrame>
  );
}
