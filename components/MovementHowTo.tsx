"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { movementHowTo, type MovementGuide } from "@/lib/movementHowTo";
import styles from "./movementHowTo.module.css";
import { useTapGuard } from "./useTapGuard";

export function MovementTitle({
  name,
  className,
  as: Heading = "h2",
}: {
  name: string;
  className?: string;
  as?: "h1" | "h2";
}) {
  const [open, setOpen] = useState(false);
  const tap = useTapGuard();
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Heading className={className}>
        <button
          ref={triggerRef}
          type="button"
          className={styles.howTitle}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-label={`${name}, how to`}
          data-movement-title={name}
          onPointerDown={tap.onPointerDown}
          onPointerMove={tap.onPointerMove}
          onClick={() => {
            if (tap.consumeIfMoved()) return;
            setOpen(true);
          }}
        >
          <span className={styles.howName}>{name}</span>
          <span className={styles.howMark} aria-hidden="true">
            How
          </span>
        </button>
      </Heading>
      {open ? (
        <MovementSheet
          guide={movementHowTo(name)}
          onClose={() => {
            setOpen(false);
            requestAnimationFrame(() => triggerRef.current?.focus());
          }}
        />
      ) : null}
    </>
  );
}

function VitalClip({ guide }: { guide: MovementGuide }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setPlay(!media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !play) return;
    video.muted = true;
    video.defaultMuted = true;
    const onHide = () => {
      if (document.hidden) {
        video.pause();
        return;
      }
      void video.play().catch(() => undefined);
    };
    document.addEventListener("visibilitychange", onHide);
    void video.play().catch(() => undefined);
    return () => {
      document.removeEventListener("visibilitychange", onHide);
      video.pause();
    };
  }, [play]);

  if (!guide.poster || !guide.mp4) return null;

  return (
    <figure className={styles.clipCard} data-vital-clip="true" data-motion={play ? "clip" : "still"}>
      <div className={styles.clipWell}>
        <div className={styles.clipHalo} aria-hidden="true" />
        <div className={styles.clipPanel}>
          <picture>
            <source srcSet={guide.poster.avif} type="image/avif" />
            <img src={guide.poster.webp} alt="" width={480} height={480} decoding="async" draggable={false} />
          </picture>
          {play ? (
            <video
              ref={videoRef}
              src={guide.mp4}
              muted
              loop
              playsInline
              autoPlay
              preload="auto"
              disablePictureInPicture
              controls={false}
            />
          ) : null}
        </div>
      </div>
      <figcaption className={styles.clipCredit}>Animation: Vital Animations</figcaption>
    </figure>
  );
}

function MovementSheet({ guide, onClose }: { guide: MovementGuide; onClose: () => void }) {
  const titleId = useId();
  const sheetRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    sheetRef.current?.focus();
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab") return;
      const root = sheetRef.current;
      if (!root) return;
      const nodes = [...root.querySelectorAll<HTMLElement>("button, a[href], input, textarea")];
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && (active === first || active === root)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return createPortal(
    <div
      className={styles.scrim}
      data-movement-scrim="true"
      onClick={(event) => {
        if (event.target === event.currentTarget) onCloseRef.current();
      }}
    >
      <div
        ref={sheetRef}
        className={styles.sheet}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        data-movement-sheet="true"
        data-movement-art={guide.mp4 ? "vital" : "words"}
        data-how-step="cues"
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.sheetBar}>
          <span className={styles.grabber} aria-hidden="true" />
          <button className={styles.close} type="button" data-movement-close="true" onClick={() => onCloseRef.current()}>
            Close
          </button>
        </div>
        <h2 id={titleId} className={styles.name}>
          {guide.name}
        </h2>
        {guide.poster ? <VitalClip guide={guide} /> : null}
        <ol className={styles.cues}>
          {guide.cues.map((cue) => (
            <li key={cue}>{cue}</li>
          ))}
        </ol>
        {guide.poster ? null : <p className={styles.credit}>No clip for this one. These words will get you through it.</p>}
      </div>
    </div>,
    document.body,
  );
}
