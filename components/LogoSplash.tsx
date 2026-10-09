"use client";

import { useEffect, useRef, useState } from "react";
import { JetBrains_Mono } from "next/font/google";
import { LogoMark } from "./LogoMark";
import styles from "./logo.module.css";
import {
  LOGO_FADE_MS,
  LOGO_REDUCED_HOLD_MS,
  playSplash,
  prefersReducedMotion,
  revealLettersStatic,
} from "./logoMotion";

const logoMono = JetBrains_Mono({
  weight: "500",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-logo",
});

declare global {
  interface Window {
    __structrSplash?: boolean;
  }
}

/**
 * Cold document load only. The mark is in the server HTML, cocked, on a solid field,
 * so the first paint is never blank. Client navigations keep this instance and do not replay.
 * Tap skips. Letters live inside the white pill — never on the icon, dock, or gate.
 */
export function LogoSplash() {
  const tileRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<"show" | "out" | "gone">("show");
  const skipRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (window.__structrSplash) {
      setPhase("gone");
      return;
    }
    window.__structrSplash = true;
    const tile = tileRef.current;
    if (!tile) return;

    let cancelled = false;
    let fadeTimer = 0;
    let holdTimer = 0;

    const finish = () => {
      if (cancelled) return;
      setPhase("gone");
    };

    const beginFade = () => {
      if (cancelled) return;
      setPhase("out");
      fadeTimer = window.setTimeout(finish, LOGO_FADE_MS);
    };

    const skip = () => {
      if (cancelled) return;
      tile.getAnimations({ subtree: true }).forEach((animation) => animation.cancel());
      revealLettersStatic(tile);
      const pill = tile.querySelector<HTMLElement>("[data-logo-pill]");
      if (pill) pill.style.transform = "none";
      tile.style.transform = "none";
      beginFade();
    };
    skipRef.current = skip;

    if (prefersReducedMotion()) {
      revealLettersStatic(tile);
      holdTimer = window.setTimeout(beginFade, LOGO_REDUCED_HOLD_MS);
      return () => {
        cancelled = true;
        window.clearTimeout(holdTimer);
        window.clearTimeout(fadeTimer);
        skipRef.current = null;
      };
    }

    void playSplash(tile).then(() => {
      if (cancelled) return;
      beginFade();
    });

    return () => {
      cancelled = true;
      window.clearTimeout(fadeTimer);
      window.clearTimeout(holdTimer);
      skipRef.current = null;
    };
    // phase omitted on purpose: cold-open runs once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (phase === "gone") return null;

  const splashClass = [styles.splash, logoMono.variable, phase === "out" ? styles["is-out"] : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={splashClass}
      aria-hidden="true"
      role="presentation"
      onPointerDown={() => skipRef.current?.()}
      onClick={() => skipRef.current?.()}
    >
      <LogoMark variant="dark" tileRef={tileRef} staticMark withLetters />
    </div>
  );
}
