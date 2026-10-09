"use client";

import { useEffect, useRef, useState } from "react";
import { JetBrains_Mono } from "next/font/google";
import { LogoMark } from "./LogoMark";
import styles from "./logo.module.css";
import { playLogo, playWord, prefersReducedMotion } from "./logoMotion";

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

const FADE_MS = 240;
const STILL_HOLD_MS = 700;

/**
 * Cold document load only. The mark is in the server HTML, cocked, on a solid field,
 * so the first paint is never blank. Client navigations keep this instance and do not replay.
 */
export function LogoSplash() {
  const tileRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLParagraphElement>(null);
  const [phase, setPhase] = useState<"show" | "out" | "gone">("show");

  useEffect(() => {
    if (window.__structrSplash) {
      setPhase("gone");
      return;
    }
    window.__structrSplash = true;
    const tile = tileRef.current;
    const word = wordRef.current;
    if (!tile || !word) return;

    let cancelled = false;
    const finish = () => {
      if (cancelled) return;
      setPhase("gone");
    };

    if (prefersReducedMotion()) {
      word.style.opacity = "1";
      const timer = window.setTimeout(finish, STILL_HOLD_MS);
      return () => {
        cancelled = true;
        window.clearTimeout(timer);
      };
    }

    let fadeTimer = 0;
    void playLogo(tile, "settle").then(() => {
      if (cancelled) return;
      setPhase("out");
      fadeTimer = window.setTimeout(finish, FADE_MS);
    });
    playWord(word);
    return () => {
      cancelled = true;
      window.clearTimeout(fadeTimer);
    };
  }, []);

  if (phase === "gone") return null;

  const splashClass = [styles.splash, logoMono.variable, phase === "out" ? styles["is-out"] : ""].filter(Boolean).join(" ");

  return (
    <div
      className={splashClass}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "#0b0b0d",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <LogoMark variant="dark" size={200} tileRef={tileRef} staticMark />
      <p ref={wordRef} className={styles.word}>
        STRUCTR
      </p>
    </div>
  );
}
