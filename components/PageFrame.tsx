"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import styles from "./subpage.module.css";

export function PageFrame({
  backHref,
  backLabel,
  title,
  children,
}: {
  backHref: string;
  backLabel: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <main className={styles.page}>
      <div className={styles.wrap}>
        <Link className={styles.back} href={backHref}>
          {backLabel}
        </Link>
        <h1 className={styles.title}>{title}</h1>
        {children}
      </div>
    </main>
  );
}
