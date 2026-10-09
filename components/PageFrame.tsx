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
  backdrop,
  children,
}: {
  backHref?: string;
  backLabel?: string;
  title: string;
  titleId?: string;
  meta?: ReactNode;
  trailing?: ReactNode;
  /** Fixed layer behind the copy. You uses this for the hero reel. */
  backdrop?: ReactNode;
  children: ReactNode;
}) {
  const trayClose = useTrayClose();
  const close = backHref ? null : trayClose;
  const back = Boolean((backHref && backLabel) || close || trailing);
  const className = [styles.page, trayClose ? styles.pageTray : "", backdrop ? styles.pageHeroes : ""]
    .filter(Boolean)
    .join(" ");
  return (
    <main className={className}>
      {backdrop}
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
