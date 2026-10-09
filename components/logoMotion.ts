/** Settle & Press. Splash is the slow readable timeline; tap press stays short. */

export const E_OUT = "cubic-bezier(0.16, 1, 0.3, 1)";
export const E_STD = "cubic-bezier(0.4, 0, 0.2, 1)";

/** Cold-open settle */
export const LOGO_SETTLE_MS = 600;
/** Press + release together on splash */
export const LOGO_PRESS_MS = 180;
export const LOGO_RELEASE_MS = 320;
export const LOGO_PRESS_TOTAL_MS = LOGO_PRESS_MS + LOGO_RELEASE_MS;
/** Stagger between stacked letters */
export const LOGO_LETTER_STAGGER_MS = 140;
export const LOGO_LETTER_STAMP_MS = 160;
export const LOGO_FLASH_MS = 180;
export const LOGO_HOLD_MS = 1120;
export const LOGO_FADE_MS = 400;
export const LOGO_REDUCED_HOLD_MS = 1000;

const LETTER_COUNT = 7;

/** Tap press stays the older short press/release. */
export const LOGO_TAP_PRESS_MS = 140;
export const LOGO_TAP_RELEASE_MS = 380;
export const LOGO_TAP_MS = LOGO_TAP_PRESS_MS + LOGO_TAP_RELEASE_MS;

/** Full splash before fade: settle + press/release + letters + flash + hold */
export const LOGO_SPLASH_READY_MS =
  LOGO_SETTLE_MS +
  LOGO_PRESS_TOTAL_MS +
  (LETTER_COUNT - 1) * LOGO_LETTER_STAGGER_MS +
  LOGO_LETTER_STAMP_MS +
  LOGO_FLASH_MS +
  LOGO_HOLD_MS;

export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function finish(animation: Animation | undefined) {
  animation?.finished.catch(() => undefined);
}

/**
 * `press` is the dock/header tap (~520ms).
 * Prefer `playSplash` for cold open; settle mode here stays for compatibility.
 */
export function playLogo(tile: HTMLElement, mode: "settle" | "press"): Promise<void> {
  if (mode === "settle") {
    return playSplash(tile);
  }
  if (prefersReducedMotion()) return Promise.resolve();
  const pill = tile.querySelector<HTMLElement>("[data-logo-pill]");
  const flash = tile.querySelector<HTMLElement>("[data-logo-flash]");
  if (!pill || !flash) return Promise.resolve();

  tile.getAnimations({ subtree: true }).forEach((animation) => animation.cancel());
  pill.style.transform = "none";

  const pressMs = LOGO_TAP_PRESS_MS;
  const releaseMs = LOGO_TAP_RELEASE_MS;

  const press = tile.animate([{ transform: "scale(1)" }, { transform: "scale(0.94)" }], {
    duration: pressMs,
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
      { duration: pressMs + releaseMs, easing: "linear", composite: "add", fill: "both" },
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
      { duration: 160, delay: pressMs, fill: "forwards" },
    ),
  );

  return new Promise((resolve) => {
    window.setTimeout(resolve, LOGO_TAP_MS);
  });
}

/** Cold-open: settle → press/release → stamp letters → flash → resolve (caller holds + fades). */
export function playSplash(tile: HTMLElement): Promise<void> {
  if (prefersReducedMotion()) {
    revealLettersStatic(tile);
    return Promise.resolve();
  }

  const pill = tile.querySelector<HTMLElement>("[data-logo-pill]");
  const flash = tile.querySelector<HTMLElement>("[data-logo-flash]");
  const letters = [...tile.querySelectorAll<HTMLElement>("[data-logo-letter]")];
  if (!pill || !flash) return Promise.resolve();

  tile.getAnimations({ subtree: true }).forEach((animation) => animation.cancel());
  pill.style.transform = "none";
  for (const letter of letters) {
    letter.style.opacity = "0";
    letter.style.transform = "scale(1.15)";
  }

  const t0 = 0;
  const afterSettle = LOGO_SETTLE_MS;
  const afterPress = afterSettle + LOGO_PRESS_TOTAL_MS;
  const pressMs = LOGO_PRESS_MS;
  const releaseMs = LOGO_RELEASE_MS;

  finish(
    pill.animate([{ transform: "rotateY(-25deg)" }, { transform: "rotateY(0deg)" }], {
      duration: LOGO_SETTLE_MS,
      delay: t0,
      easing: E_OUT,
      composite: "add",
      fill: "both",
    }),
  );

  const press = tile.animate([{ transform: "scale(1)" }, { transform: "scale(0.94)" }], {
    duration: pressMs,
    delay: afterSettle,
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
      {
        duration: pressMs + releaseMs,
        delay: afterSettle,
        easing: "linear",
        composite: "add",
        fill: "both",
      },
    ),
  );

  for (let i = 0; i < letters.length; i += 1) {
    finish(
      letters[i].animate(
        [
          { opacity: 0, transform: "scale(1.15)" },
          { opacity: 1, transform: "scale(1)" },
        ],
        {
          duration: LOGO_LETTER_STAMP_MS,
          delay: afterPress + i * LOGO_LETTER_STAGGER_MS,
          easing: E_OUT,
          fill: "forwards",
        },
      ),
    );
  }

  const flashAt =
    afterPress + (LETTER_COUNT - 1) * LOGO_LETTER_STAGGER_MS + LOGO_LETTER_STAMP_MS;
  finish(
    flash.animate(
      [
        { opacity: 0 },
        { opacity: 0.9, offset: 0.28 },
        { opacity: 0.9, offset: 0.62 },
        { opacity: 0 },
      ],
      { duration: LOGO_FLASH_MS, delay: flashAt, fill: "forwards" },
    ),
  );

  const readyAt = flashAt + LOGO_FLASH_MS + LOGO_HOLD_MS;
  return new Promise((resolve) => {
    window.setTimeout(resolve, readyAt);
  });
}

export function revealLettersStatic(tile: HTMLElement) {
  const letters = tile.querySelectorAll<HTMLElement>("[data-logo-letter]");
  letters.forEach((letter) => {
    letter.style.opacity = "1";
    letter.style.transform = "scale(1)";
  });
}

/** @deprecated splash letters animate in playSplash */
export function playWord(_word: HTMLElement) {
  /* no-op: word beside the mark is gone */
}
