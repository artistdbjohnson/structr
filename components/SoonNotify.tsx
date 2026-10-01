"use client";

import { useEffect, useState } from "react";
import { loadSoonWatch, setSoonWatch } from "@/lib/soonWatch";
import styles from "./kettlebellInfo.module.css";

/** Local flag only. Never starts a session. */
export function SoonNotify({ id }: { id: string }) {
  const [watching, setWatching] = useState(false);

  useEffect(() => {
    setWatching(loadSoonWatch().includes(id));
  }, [id]);

  return (
    <button
      type="button"
      className={styles.ctaGhost}
      onClick={() => {
        const next = !watching;
        setSoonWatch(id, next);
        setWatching(next);
      }}
    >
      {watching ? "Watching on this device" : "Notify me on this device"}
    </button>
  );
}
