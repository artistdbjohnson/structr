"use client";

import { clampInt } from "@/lib/format";
import styles from "./session.module.css";

export function Stepper({
  label,
  value,
  onChange,
  min = 0,
  max = 999,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}) {
  function set(next: number) {
    onChange(clampInt(next, min, max));
  }

  return (
    <div className={styles.stepper}>
      <span className={styles.stepperLabel}>{label}</span>
      <div className={styles.stepperControls}>
        <button type="button" aria-label={`Decrease ${label}`} onClick={() => set(value - 1)}>
          −
        </button>
        <input
          aria-label={label}
          inputMode="numeric"
          type="number"
          min={min}
          max={max}
          value={value}
          onChange={(event) => set(Number(event.target.value))}
        />
        <button type="button" aria-label={`Increase ${label}`} onClick={() => set(value + 1)}>
          +
        </button>
      </div>
    </div>
  );
}
