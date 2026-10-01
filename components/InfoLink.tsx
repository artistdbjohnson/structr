import Link from "next/link";
import styles from "./subpage.module.css";

export function InfoLink() {
  return (
    <Link className={styles.infoLink} href="/info/kettlebell" aria-label="Kettlebell info">
      i
    </Link>
  );
}
