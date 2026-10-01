"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useTrayClose } from "./trayClose";
import styles from "./subpage.module.css";

export function PageFrame({
  backHref,
  backLabel,
  title,
  titleId,
  meta,
  trailing,
  children,
}: {
  backHref?: string;
  backLabel?: string;
  title: string;
  titleId?: string;
  meta?: ReactNode;
  trailing?: ReactNode;
  children: ReactNode;
}) {
  const trayClose = useTrayClose();
  const close = backHref ? null : trayClose;
  const back = Boolean((backHref && backLabel) || close || trailing);
  return (
    <main className={trayClose ? `${styles.page} ${styles.pageTray}` : styles.page}>
      <div className={styles.wrap}>
        {back ? (
          <div className={styles.chrome}>
            {close ? (
              <button type="button" className={styles.back} onClick={close} aria-label="Close Train for">
                Done
              </button>
            ) : backHref && backLabel ? (
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
          <h1 id={titleId} className={styles.title}>
            {title}
          </h1>
          {meta ? <p className={styles.kicker}>{meta}</p> : null}
        </header>
        {children}
      </div>
    </main>
  );
}
