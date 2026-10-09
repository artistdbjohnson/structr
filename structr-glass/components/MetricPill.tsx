"use client";

/**
 * MetricPill — StructrGlass recipe (Next.js / React 19)
 * Drop into components/ after copying tokens.css.
 * Home dock stays a SEPARATE liquid-glass system — do not style this with `.dock`.
 */

import type { CSSProperties, ReactNode } from "react";
import styles from "./MetricPill.module.css";

export type StructrTint = "magenta" | "orange" | "cyan";

export type MetricPillProps = {
  label: string;
  /** Primary reading, e.g. "142" or "7.2" — rendered in dot-matrix style */
  value: string | number;
  /** Nested glass % chip (optional) */
  percent?: string | number;
  /** Hairline sparkline points 0–1 (optional) */
  spark?: number[];
  tint?: StructrTint;
  /** Slot for TrendChip or custom footer */
  footer?: ReactNode;
  className?: string;
  style?: CSSProperties;
};

function Sparkline({
  points,
  stroke,
}: {
  points: number[];
  stroke: string;
}) {
  if (points.length < 2) return null;
  const w = 72;
  const h = 28;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const step = w / (points.length - 1);
  const d = points
    .map((p, i) => {
      const x = i * step;
      const y = h - ((p - min) / range) * (h - 4) - 2;
      return `${i === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");

  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      aria-hidden="true"
      style={{
        width: "100%",
        maxWidth: "var(--sg-spark-width)",
        height: "auto",
        maxHeight: "var(--sg-spark-height)",
        opacity: "var(--sg-spark-opacity)" as unknown as number,
      }}
    >
      <path
        d={d}
        fill="none"
        stroke={stroke}
        strokeWidth="var(--sg-spark-stroke)"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/** Nested glass chip for % */
export function PercentChip({ children }: { children: ReactNode }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--sg-chip-pad-y) var(--sg-chip-pad-x)",
        borderRadius: "var(--sg-chip-radius)",
        fontSize: "var(--sg-chip-font-size)",
        fontFamily: "var(--sg-numeral-font)",
        fontVariantNumeric: "tabular-nums",
        letterSpacing: "0.04em",
        color: "var(--ink)",
        background: "var(--liq-row-paint)",
        boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.85)",
        position: "relative",
        zIndex: 3,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}

export function MetricPill({
  label,
  value,
  percent,
  spark,
  tint = "cyan",
  footer,
  className,
  style,
}: MetricPillProps) {
  const pct =
    percent === undefined || percent === null
      ? null
      : typeof percent === "number"
        ? `${percent}%`
        : String(percent).includes("%")
          ? String(percent)
          : `${percent}%`;

  return (
    <article
      className={[styles.pill, className].filter(Boolean).join(" ")}
      data-surface="pill"
      data-tint={tint}
      style={style}
      aria-label={`${label}: ${value}${pct ? `, ${pct}` : ""}`}
    >
      <div className={styles.fit}>
        <div className={styles.label}>{label}</div>
        <div className={styles.row}>
          <span className={styles.value}>{value}</span>
          {spark && spark.length >= 2 ? (
            <Sparkline points={spark} stroke="var(--ink)" />
          ) : null}
        </div>
        {(pct || footer) && (
          <div className={styles.meta}>
            <svg className={styles.accent} viewBox="0 0 140 24" aria-hidden="true">
              <path
                d="M4 18 C 42 18, 64 5, 136 8"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.15"
                strokeLinecap="round"
                strokeDasharray="0.9 3.2"
              />
            </svg>
            {pct ? <PercentChip>{pct}</PercentChip> : <span />}
            {footer}
          </div>
        )}
      </div>
    </article>
  );
}

export default MetricPill;
