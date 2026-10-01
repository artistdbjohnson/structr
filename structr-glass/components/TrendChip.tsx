"use client";

/**
 * TrendChip — StructrGlass recipe for delta / trend
 * Pair inside MetricPill footer or stand alone.
 */

import type { CSSProperties } from "react";
import styles from "./TrendChip.module.css";
import type { StructrTint } from "./MetricPill";

export type TrendDirection = "up" | "down" | "flat";

export type TrendChipProps = {
  /** Signed or preformatted delta, e.g. "+3.2%" or "−1" */
  value: string;
  direction?: TrendDirection;
  tint?: StructrTint;
  className?: string;
  style?: CSSProperties;
};

const ARROW: Record<TrendDirection, string> = {
  up: "▲",
  down: "▼",
  flat: "◆",
};

export function TrendChip({
  value,
  direction = "flat",
  tint = "cyan",
  className,
  style,
}: TrendChipProps) {
  return (
    <span
      className={[styles.chip, className].filter(Boolean).join(" ")}
      data-tint={tint}
      data-direction={direction}
      style={style}
      role="status"
      aria-label={`Trend ${direction}: ${value}`}
    >
      <span className={styles.arrow} aria-hidden="true">
        {ARROW[direction]}
      </span>
      <span className={styles.label}>{value}</span>
    </span>
  );
}

export default TrendChip;
