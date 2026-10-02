"use client";

import { useEffect, useRef } from "react";
import styles from "./trainSheet.module.css";

export function TrainSheet({
  templateName,
  onStart,
  onPickPlan,
  onClose,
}: {
  templateName: string;
  onStart: () => void;
  onPickPlan: () => void;
  onClose: () => void;
}) {
  const startRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    startRef.current?.focus();
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onCloseRef.current();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className={styles.scrim} onClick={onClose}>
      <div
        className={styles.sheet}
        role="dialog"
        aria-modal="true"
        aria-labelledby="train-sheet-title"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="train-sheet-title" className={styles.title}>
          Train
        </h2>
        <p className={styles.lead}>Pick up the last plan, or choose another.</p>
        <button ref={startRef} className={styles.primary} type="button" onClick={onStart}>
          Start {templateName}
        </button>
        <button className={styles.ghost} type="button" onClick={onPickPlan}>
          Pick plan
        </button>
        <button className={styles.dismiss} type="button" onClick={onClose}>
          Not now
        </button>
      </div>
    </div>
  );
}
