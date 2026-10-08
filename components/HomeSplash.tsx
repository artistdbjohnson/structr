"use client";

import { useEffect, useRef } from "react";

/**
 * Full-bleed 9:16 loop behind the dock: the shore runner, then the light-trail runner.
 * Each hand-off is a 1.25s eased dissolve baked into the file, and the last frame
 * runs straight into the first, so the native loop has no seam.
 */
export function HomeSplash() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = true;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      if (motion.matches) {
        video.pause();
        if (Number.isFinite(video.duration)) video.currentTime = 0;
        return;
      }
      const pending = video.play();
      if (pending) pending.catch(() => {});
    };

    sync();
    motion.addEventListener("change", sync);
    return () => motion.removeEventListener("change", sync);
  }, []);

  return (
    <video
      ref={ref}
      className="home__video"
      autoPlay
      muted
      loop
      playsInline
      poster="/splash-poster.jpg"
      preload="auto"
      disablePictureInPicture
      controls={false}
    >
      <source src="/splash.webm" type="video/webm" />
      <source src="/splash.mp4" type="video/mp4" />
    </video>
  );
}
