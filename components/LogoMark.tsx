import { useId, type CSSProperties, type Ref } from "react";
import styles from "./logo.module.css";

export type LogoVariant = "dark" | "reversed";

export const LOGO_LETTERS = ["s", "t", "r", "u", "c", "t", "r"] as const;

/**
 * Static Structr mark. Dark is the app icon (white pill, #18181b tile).
 * Reversed is the dark pill on a white tile, for pale glass and the desktop gate.
 * Letters only render when withLetters is set — splash only, never the icon or dock.
 */
export function LogoMark({
  variant = "dark",
  size,
  tileRef,
  staticMark = false,
  withLetters = false,
  className,
}: {
  variant?: LogoVariant;
  size?: number;
  tileRef?: Ref<HTMLDivElement>;
  staticMark?: boolean;
  withLetters?: boolean;
  className?: string;
}) {
  const rawId = useId().replace(/:/g, "");
  const gradientId = `logo-flash-${rawId}`;
  const style = (size != null ? { "--logo-size": `${size}px` } : undefined) as CSSProperties | undefined;
  return (
    <div
      ref={tileRef}
      className={[styles.tile, variant === "reversed" ? styles.reversed : "", className ?? ""].filter(Boolean).join(" ")}
      style={style}
      data-static={staticMark ? "true" : undefined}
      data-logo-tile="true"
      data-logo-letters={withLetters ? "true" : undefined}
    >
      <div className={styles.pill} data-logo-pill="true">
        {withLetters ? (
          <span className={styles.letters} data-logo-letter-stack="true" aria-hidden="true">
            {LOGO_LETTERS.map((letter, index) => (
              <span key={`${letter}-${index}`} className={styles.letter} data-logo-letter="true">
                {letter}
              </span>
            ))}
          </span>
        ) : null}
        <svg className={styles.flash} data-logo-flash="true" viewBox="0 0 56 136" aria-hidden="true">
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" style={{ stopColor: "var(--logo-flash-a)" }} />
              <stop offset="100%" style={{ stopColor: "var(--logo-flash-b)" }} />
            </linearGradient>
          </defs>
          <rect
            x="0.625"
            y="0.625"
            width="54.75"
            height="134.75"
            rx="27.375"
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="1.25"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
    </div>
  );
}
