"use client";

import { useRef, type ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogoMarkButton } from "./LogoMarkButton";
import logoStyles from "./logo.module.css";
import { useTrayClose } from "./trayClose";
import styles from "./subpage.module.css";

export function PageFrame({
  backHref,
  backLabel,
  title,
  titleId,
  meta,
  trailing,
  tone,
  children,
}: {
  backHref?: string;
  backLabel?: string;
  title: string;
  titleId?: string;
  meta?: ReactNode;
  trailing?: ReactNode;
  /** You and Train keep the pre-mist surface. Plans stays on the shared frost. */
  tone?: "night";
  children: ReactNode;
}) {
  const trayClose = useTrayClose();
  const router = useRouter();
  const pathname = usePathname() || "/";
  const markLock = useRef(false);
  const close = backHref ? null : trayClose;
  const back = Boolean((backHref && backLabel) || close || trailing);
  const className = [styles.page, trayClose ? styles.pageTray : "", tone === "night" ? styles.night : ""]
    .filter(Boolean)
    .join(" ");
  return (
    <main className={className}>
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
          <div className={logoStyles.lockup}>
            <LogoMarkButton
              variant={tone === "night" ? "dark" : "reversed"}
              size={40}
              label="Structr"
              onClick={() => {
                const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
                if (path === "/" || markLock.current) return;
                markLock.current = true;
                window.setTimeout(() => router.push("/"), 520);
              }}
            />
            <div className={logoStyles.titles}>
              <h1 id={titleId} className={styles.title}>
                {title}
              </h1>
              {meta ? <p className={styles.kicker}>{meta}</p> : null}
            </div>
          </div>
        </header>
        {children}
      </div>
    </main>
  );
}
