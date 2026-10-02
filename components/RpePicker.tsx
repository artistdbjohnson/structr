"use client";

import styles from "./session.module.css";

export function RpePicker({
  value,
  onChange,
  required,
  hint,
}: {
  value?: number;
  onChange: (value: number) => void;
  required?: boolean;
  hint: string;
}) {
  return (
    <div className={styles.rpe}>
      <div className={styles.rpeHead}>
        <span>How hard</span>
        <span>{hint}</span>
      </div>
      <div
        className={styles.rpeTicks}
        role="group"
        aria-label={required ? "How hard, required, 1 easy to 10 empty" : "How hard, 1 easy to 10 empty"}
      >
        {Array.from({ length: 10 }, (_, index) => {
          const score = index + 1;
          return (
            <button
              key={score}
              type="button"
              aria-pressed={value === score}
              onClick={() => onChange(score)}
            >
              {score}
            </button>
          );
        })}
      </div>
    </div>
  );
}
