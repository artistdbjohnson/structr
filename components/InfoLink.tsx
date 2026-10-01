import Link from "next/link";
import styles from "./subpage.module.css";

export function InfoLink() {
  return (
    <Link className={styles.infoLink} href="/plans/info" aria-label="Kettlebell info">
      i
    </Link>
  );
}
