"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import styles from "./subpage.module.css";

export function PageFrame({
  backHref,
  backLabel,
  title,
  meta,
  trailing,
  children,
}: {
  backHref: string;
  backLabel: string;
  title: string;
  meta?: ReactNode;
  trailing?: ReactNode;
  children: ReactNode;
}) {
  return (
    <main className={styles.page}>
      <div className={styles.wrap}>
        <div className={styles.chrome}>
          <Link className={styles.back} href={backHref}>
            {backLabel}
          </Link>
          {trailing}
        </div>
        <header className={styles.heading}>
          <h1 className={styles.title}>{title}</h1>
          {meta ? <p className={styles.kicker}>{meta}</p> : null}
        </header>
        {children}
      </div>
    </main>
  );
}
