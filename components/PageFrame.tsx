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
  backHref?: string;
  backLabel?: string;
  title: string;
  meta?: ReactNode;
  trailing?: ReactNode;
  children: ReactNode;
}) {
  const back = backHref && backLabel;
  return (
    <main className={styles.page}>
      <div className={styles.wrap}>
        {back || trailing ? (
          <div className={styles.chrome}>
            {backHref && backLabel ? (
              <Link className={styles.back} href={backHref}>
                {backLabel}
              </Link>
            ) : (
              <span />
            )}
            {trailing}
          </div>
        ) : null}
        <header className={styles.heading}>
          <h1 className={styles.title}>{title}</h1>
          {meta ? <p className={styles.kicker}>{meta}</p> : null}
        </header>
        {children}
      </div>
    </main>
  );
}
