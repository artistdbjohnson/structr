import Link from "next/link";
import styles from "./subpage.module.css";

export function InfoLink({
  href = "/plans/info",
  label = "Kettlebell info",
}: {
  href?: string;
  label?: string;
}) {
  return (
    <Link className={styles.infoLink} href={href} aria-label={label}>
      i
    </Link>
  );
}
