"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { loadSoonWatch, setSoonWatch } from "@/lib/soonWatch";
import styles from "./subpage.module.css";

/** Non-startable catalog row. Info opens the briefing. Never a session. */
export function ComingSoonRow({ id, name, href }: { id: string; name: string; href?: string }) {
  const panelId = useId();
  const [open, setOpen] = useState(false);
  const [watching, setWatching] = useState(false);

  useEffect(() => {
    setWatching(loadSoonWatch().includes(id));
  }, [id]);

  if (href) {
    return (
      <li className={styles.soonItem} data-soon={id}>
        <Link className={styles.soonButton} href={href}>
          <span className={styles.soonName}>{name}</span>
          <span className={styles.soonMeta}>
            <span className={styles.infoMark} aria-hidden="true">
              i
            </span>
            <span className={styles.mark}>Coming soon</span>
          </span>
        </Link>
      </li>
    );
  }

  return (
    <li className={styles.soonItem} data-soon={id}>
      <button
        type="button"
        className={styles.soonButton}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        <span className={styles.soonName}>{name}</span>
        <span className={styles.mark}>Coming soon</span>
      </button>
      {open ? (
        <div id={panelId} className={styles.soonSheet} role="region" aria-label={`${name}. Coming soon.`}>
          <p>Coming soon. Nothing to start yet.</p>
          <div className={styles.soonActions}>
            <button
              type="button"
              className={styles.ghost}
              onClick={() => {
                const next = !watching;
                setSoonWatch(id, next);
                setWatching(next);
              }}
            >
              {watching ? "Watching on this device" : "Notify me"}
            </button>
            <button type="button" className={styles.ghost} onClick={() => setOpen(false)}>
              Dismiss
            </button>
          </div>
        </div>
      ) : null}
    </li>
  );
}
