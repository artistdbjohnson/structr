/** Settle & Press. Timing matches the logo direction: settle, press, release, one hairline flash. */

export const E_OUT = "cubic-bezier(0.16, 1, 0.3, 1)";
export const E_STD = "cubic-bezier(0.4, 0, 0.2, 1)";

export const LOGO_SETTLE_MS = 420;
export const LOGO_PRESS_MS = 140;
export const LOGO_RELEASE_MS = 380;
export const LOGO_FLASH_MS = 160;
export const LOGO_WORD_MS = 220;
/** Settle overlaps the press. The whole first-load timeline ends under 700ms. */
export const LOGO_SPLASH_MS = 170 + LOGO_PRESS_MS + LOGO_RELEASE_MS;
export const LOGO_TAP_MS = LOGO_PRESS_MS + LOGO_RELEASE_MS;

export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function finish(animation: Animation | undefined) {
  animation?.finished.catch(() => undefined);
}

/**
 * `settle` is the cold-open timeline (690ms). `press` is the 520ms tap.
 * Reduced motion does nothing: the mark stays on its static final pose, and the flash stays hidden.
 */
export function playLogo(tile: HTMLElement, mode: "settle" | "press"): Promise<void> {
  if (prefersReducedMotion()) return Promise.resolve();
  const pill = tile.querySelector<HTMLElement>("[data-logo-pill]");
  const flash = tile.querySelector<HTMLElement>("[data-logo-flash]");
  if (!pill || !flash) return Promise.resolve();

  tile.getAnimations({ subtree: true }).forEach((animation) => animation.cancel());
  pill.style.transform = "none";

  const first = mode === "settle";
  const t0 = first ? 170 : 0;
  const pressMs = LOGO_PRESS_MS;
  const releaseMs = LOGO_RELEASE_MS;

  if (first) {
    finish(
      pill.animate([{ transform: "rotateY(-25deg)" }, { transform: "rotateY(0deg)" }], {
        duration: LOGO_SETTLE_MS,
        easing: E_OUT,
        composite: "add",
        fill: "both",
      }),
    );
  }

  const press = tile.animate([{ transform: "scale(1)" }, { transform: "scale(0.94)" }], {
    duration: pressMs,
    delay: t0,
    easing: E_STD,
    fill: "forwards",
  });
  press.finished
    .then(() => {
      finish(
        tile.animate([{ transform: "scale(0.94)" }, { transform: "scale(1)" }], {
          duration: releaseMs,
          easing: E_STD,
          fill: "forwards",
        }),
      );
    })
    .catch(() => undefined);

  finish(
    pill.animate(
      [
        { transform: "scaleY(1)" },
        { transform: "scaleY(0.9)", offset: pressMs / (pressMs + releaseMs), easing: E_OUT },
        { transform: "scaleY(1.035)", offset: (pressMs + releaseMs * 0.45) / (pressMs + releaseMs) },
        { transform: "scaleY(1)" },
      ],
      { duration: pressMs + releaseMs, delay: t0, easing: "linear", composite: "add", fill: "both" },
    ),
  );

  finish(
    flash.animate(
      [
        { opacity: 0 },
        { opacity: 0.9, offset: 0.3 },
        { opacity: 0.9, offset: 0.6 },
        { opacity: 0 },
      ],
      { duration: LOGO_FLASH_MS, delay: t0 + pressMs, fill: "forwards" },
    ),
  );

  return new Promise((resolve) => {
    window.setTimeout(resolve, first ? LOGO_SPLASH_MS : LOGO_TAP_MS);
  });
}

export function playWord(word: HTMLElement) {
  if (prefersReducedMotion()) {
    word.style.opacity = "1";
    return;
  }
  word.getAnimations().forEach((animation) => animation.cancel());
  finish(
    word.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: LOGO_WORD_MS,
      delay: 170 + LOGO_PRESS_MS,
      easing: E_STD,
      fill: "forwards",
    }),
  );
}
