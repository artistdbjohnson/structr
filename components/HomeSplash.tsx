"use client";

import { useEffect, useRef, useState } from "react";
import frames from "@/public/hero/manifest.json";

/** Fully on screen before the dissolve starts. */
const HOLD_MS = 6600;
/** Eased crossfade. The next frame is already the only preload. */
const FADE_MS = 1800;

type HeroFrame = {
  file: string;
  subject: string;
  width: number;
  height: number;
  ground: string;
  placeholder: string;
};

const HERO = frames as HeroFrame[];

let avifSupport: Promise<boolean> | null = null;

function supportsAvif(): Promise<boolean> {
  if (typeof window === "undefined") return Promise.resolve(true);
  if (!avifSupport) {
    avifSupport = new Promise((resolve) => {
      const probe = new Image();
      probe.onload = () => resolve(probe.naturalWidth > 0);
      probe.onerror = () => resolve(false);
      probe.src =
        "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=";
    });
  }
  return avifSupport;
}

/**
 * Full-bleed 9:16 stills. Mounted once at the app root, so the hold and
 * crossfade keep running across home, Train, Plans, and You. Each frame
 * holds, then dissolves into the next, and the last returns to the first.
 * Only the on-screen still and the next one are loaded. Reduced motion
 * keeps the opening still and does not crossfade. The opening frame is in
 * the server HTML, with its ground color and placeholder, so the first
 * paint is never blank.
 */
export function HomeSplash() {
  const rootRef = useRef<HTMLDivElement>(null);
  const frontRef = useRef(0);
  const [front, setFront] = useState(0);
  const [under, setUnder] = useState<number | null>(null);
  const [incoming, setIncoming] = useState(false);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduce(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce || media.matches) {
      setUnder(null);
      setIncoming(false);
      return;
    }

    let holdTimer = 0;
    let fadeTimer = 0;
    let remain = HOLD_MS;
    let started = 0;
    let fadeRemain = FADE_MS;
    let fadeStarted = 0;
    let fading = false;
    let pending = false;
    let stopped = false;

    const animations = () => rootRef.current?.getAnimations({ subtree: true }) ?? [];
    const pauseClips = () => {
      animations().forEach((clip) => {
        if (clip.playState === "running") clip.pause();
      });
    };
    const resumeClips = () => {
      animations().forEach((clip) => {
        if (clip.playState === "paused") clip.play();
      });
    };

    const armHold = () => {
      fading = false;
      pending = false;
      started = performance.now();
      holdTimer = window.setTimeout(beginFade, remain);
    };

    const finishFade = () => {
      if (stopped) return;
      setUnder(null);
      setIncoming(false);
      fading = false;
      remain = HOLD_MS;
      fadeRemain = FADE_MS;
      if (document.hidden) return;
      armHold();
    };

    const beginFade = () => {
      if (stopped) return;
      if (document.hidden) {
        pending = true;
        return;
      }
      pending = false;
      fading = true;
      remain = HOLD_MS;
      fadeRemain = FADE_MS;
      fadeStarted = performance.now();
      const current = frontRef.current;
      const next = (current + 1) % HERO.length;
      frontRef.current = next;
      setUnder(current);
      setFront(next);
      setIncoming(false);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (stopped) return;
          setIncoming(true);
          if (document.hidden) return;
          fadeStarted = performance.now();
          window.clearTimeout(fadeTimer);
          fadeTimer = window.setTimeout(finishFade, fadeRemain);
        });
      });
    };

    const onVisibility = () => {
      if (document.hidden) {
        pauseClips();
        if (fading) {
          fadeRemain = Math.max(0, fadeRemain - (performance.now() - fadeStarted));
          window.clearTimeout(fadeTimer);
        } else {
          remain = Math.max(0, remain - (performance.now() - started));
          window.clearTimeout(holdTimer);
        }
        return;
      }
      resumeClips();
      if (pending) {
        beginFade();
        return;
      }
      if (fading) {
        fadeStarted = performance.now();
        fadeTimer = window.setTimeout(finishFade, fadeRemain);
        return;
      }
      armHold();
    };

    armHold();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stopped = true;
      window.clearTimeout(holdTimer);
      window.clearTimeout(fadeTimer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduce]);

  useEffect(() => {
    if (reduce || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const next = HERO[(front + 1) % HERO.length];
    if (!next) return;
    let cancelled = false;
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";

    supportsAvif().then((avif) => {
      if (cancelled) return;
      const ext = avif ? "avif" : "webp";
      const href = `/hero/${next.file}.${ext}`;
      link.href = href;
      link.type = avif ? "image/avif" : "image/webp";
      document.head.appendChild(link);
      const img = new Image();
      img.decoding = "async";
      img.src = href;
      img.decode?.().catch(() => {});
    });

    return () => {
      cancelled = true;
      link.remove();
    };
  }, [front, reduce]);

  const ground = HERO[front]?.ground ?? "#e6e8ec";
  const mounted = new Set<number>([front]);
  if (!reduce && under != null) mounted.add(under);

  return (
    <div
      ref={rootRef}
      className="home__slideshow"
      style={{ backgroundColor: ground }}
      data-hero={HERO[front]?.file}
    >
      {HERO.map((frame, index) => {
        if (!mounted.has(index)) return null;
        const visible = index === under || (index === front && (incoming || under == null));
        return (
          <div
            key={frame.file}
            className="home__slide"
            data-visible={visible ? "true" : "false"}
            data-layer={index === front ? "front" : "under"}
            style={{
              zIndex: index === front ? 2 : 1,
              backgroundColor: frame.ground,
              backgroundImage: `url("${frame.placeholder}")`,
            }}
          >
            <picture>
              <source srcSet={`/hero/${frame.file}.avif`} type="image/avif" />
              <img
                src={`/hero/${frame.file}.webp`}
                alt=""
                width={frame.width}
                height={frame.height}
                draggable={false}
                decoding="async"
                fetchPriority={index === 0 ? "high" : "auto"}
                loading="eager"
              />
            </picture>
          </div>
        );
      })}
    </div>
  );
}
