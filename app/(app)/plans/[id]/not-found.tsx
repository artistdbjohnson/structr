import Link from "next/link";
import { PageFrame } from "@/components/PageFrame";
import styles from "@/components/subpage.module.css";

export default function PlanUnavailable() {
  return (
    <PageFrame backHref="/plans" backLabel="‹ Train for" title="Plan unavailable">
      <p className={styles.lead}>That plan isn’t in the catalog.</p>
      <Link className={styles.primary} href="/plans">
        Back to Train for
      </Link>
    </PageFrame>
  );
}
