"use client";

/**
 * PhaseBar — StructrGlass multi-phase / session progress recipe
 */

import type { CSSProperties } from "react";
import styles from "./PhaseBar.module.css";
import type { StructrTint } from "./MetricPill";
import { PercentChip } from "./MetricPill";

export type PhaseBarProps = {
  title: string;
  /** Total phases (segments) */
  phases: number;
  /** 0-based index of the active phase */
  activeIndex: number;
  /** 0–1 progress within the active phase */
  activeProgress?: number;
  /** Optional phase name shown in dot-matrix */
  phaseName?: string;
  /** Optional nested % chip */
  percent?: string | number;
  tint?: StructrTint;
  className?: string;
  style?: CSSProperties;
};

export function PhaseBar({
  title,
  phases,
  activeIndex,
  activeProgress = 0.5,
  phaseName,
  percent,
  tint = "magenta",
  className,
  style,
}: PhaseBarProps) {
  const count = Math.max(1, Math.floor(phases));
  const idx = Math.min(Math.max(0, activeIndex), count - 1);
  const progress = Math.min(1, Math.max(0, activeProgress));
  const pct =
    percent === undefined || percent === null
      ? null
      : typeof percent === "number"
        ? `${Math.round(percent)}%`
        : String(percent).includes("%")
          ? String(percent)
          : `${percent}%`;

  return (
    <div
      className={[styles.wrap, className].filter(Boolean).join(" ")}
      data-tint={tint}
      style={style}
      role="group"
      aria-label={`${title}: phase ${idx + 1} of ${count}${
        phaseName ? `, ${phaseName}` : ""
      }`}
    >
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
        <span className={styles.phaseSlot}>
          {phaseName ? (
            <span className={styles.phaseLabel}>{phaseName}</span>
          ) : (
            <span className={styles.phaseLabel}>
              {idx + 1}/{count}
            </span>
          )}
          {pct ? <PercentChip>{pct}</PercentChip> : null}
        </span>
      </div>
      <div className={styles.track} aria-hidden="true">
        {Array.from({ length: count }, (_, i) => {
          const state = i < idx ? "done" : i === idx ? "active" : "todo";
          return (
            <div
              key={i}
              className={styles.seg}
              data-state={state}
              style={
                state === "active"
                  ? ({ ["--pb-progress" as string]: `${progress * 100}%` } as CSSProperties)
                  : undefined
              }
            >
              {state === "active" ? <span className={styles.fill} /> : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PhaseBar;
