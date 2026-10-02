"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { MOVEMENT_ART_CREDIT, movementHowTo, type MovementGuide } from "@/lib/movementHowTo";
import { REPDB_CREDIT, REPDB_HOME } from "@/lib/repdb";
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

function usePrefersStill(): boolean {
  const [still, setStill] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setStill(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  return still;
}

function FrameReel({ frames }: { frames: readonly string[] }) {
  const still = usePrefersStill();
  const [index, setIndex] = useState(0);

  const signature = frames.join("|");
  useEffect(() => {
    if (still || frames.length < 2) return;
    const count = frames.length;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % count);
    }, 1100);
    return () => window.clearInterval(id);
  }, [still, signature, frames.length]);

  const shown = still ? 0 : index;

  return (
    <div className={styles.poster} data-art="frames" data-motion={still ? "still" : "frames"}>
      {frames.map((src, frameIndex) => (
        <img
          key={src}
          src={src}
          alt=""
          width={512}
          height={512}
          decoding="async"
          draggable={false}
          data-active={frameIndex === shown ? "true" : "false"}
        />
      ))}
    </div>
  );
}

function RepdbStill({ frames, labels }: { frames: readonly string[]; labels: readonly string[] }) {
  const [index, setIndex] = useState(0);
  const [failed, setFailed] = useState(false);
  const shown = Math.min(index, frames.length - 1);

  if (failed) {
    return (
      <div className={styles.poster} data-art="placeholder" data-motion="still">
        <p className={styles.posterKicker}>How</p>
        <p className={styles.posterName}>Picture didn't load. The words below still count.</p>
      </div>
    );
  }

  return (
    <div className={styles.artBlock}>
      <div className={styles.poster} data-art="repdb" data-motion="still">
        {frames.map((src, frameIndex) => (
          <img
            key={src}
            src={src}
            alt={labels[frameIndex] ? `${labels[frameIndex]} position` : ""}
            width={512}
            height={512}
            decoding="async"
            draggable={false}
            data-active={frameIndex === shown ? "true" : "false"}
            onError={() => setFailed(true)}
          />
        ))}
      </div>
      {frames.length > 1 ? (
        <div className={styles.frameToggle} role="group" aria-label="Still frames">
          {labels.map((label, frameIndex) => (
            <button
              key={label}
              type="button"
              aria-pressed={frameIndex === shown}
              data-on={frameIndex === shown ? "true" : "false"}
              onClick={() => setIndex(frameIndex)}
            >
              {label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function MovementArt({ guide }: { guide: MovementGuide }) {
  if (guide.source === "repdb" && guide.frames && guide.labels) {
    return <RepdbStill frames={guide.frames} labels={guide.labels} />;
  }
  if (guide.source === "guide" && guide.frames) {
    return <FrameReel frames={guide.frames} />;
  }
  return null;
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
      const nodes = [...root.querySelectorAll<HTMLElement>("button, a[href]")];
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
        data-movement-art={guide.source ?? "placeholder"}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.sheetBar}>
          <span className={styles.grabber} aria-hidden="true" />
          <button className={styles.close} type="button" data-movement-close="true" onClick={() => onCloseRef.current()}>
            Close
          </button>
        </div>
        {guide.frames ? (
          <>
            <MovementArt guide={guide} />
            <h2 id={titleId} className={styles.name}>
              {guide.name}
            </h2>
          </>
        ) : (
          <div className={styles.poster} data-art="placeholder" data-motion="still">
            <p className={styles.posterKicker}>How</p>
            <h2 id={titleId} className={styles.posterName}>
              {guide.name}
            </h2>
          </div>
        )}
        <ul className={styles.cues}>
          {guide.cues.map((cue) => (
            <li key={cue}>{cue}</li>
          ))}
        </ul>
        {guide.source === "repdb" ? (
          <p className={styles.credit}>
            <a href={REPDB_HOME} target="_blank" rel="noreferrer">
              {REPDB_CREDIT}
            </a>
            . Still pictures. Not a loop.
          </p>
        ) : guide.source === "guide" ? (
          <p className={styles.credit}>
            Drawing by {MOVEMENT_ART_CREDIT.creator},{" "}
            <a href={MOVEMENT_ART_CREDIT.workUrl} target="_blank" rel="noreferrer">
              {MOVEMENT_ART_CREDIT.work}
            </a>
            .{" "}
            <a href={MOVEMENT_ART_CREDIT.licenseUrl} target="_blank" rel="noreferrer">
              {MOVEMENT_ART_CREDIT.license}
            </a>
            . {MOVEMENT_ART_CREDIT.changes}
          </p>
        ) : (
          <p className={styles.credit}>No picture yet. These words will get you through it.</p>
        )}
      </div>
    </div>,
    document.body,
  );
}
