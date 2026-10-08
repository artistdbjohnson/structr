export type SurfaceName = "phone" | "desktop";

export type SurfaceSignals = {
  override: boolean;
  standalone: boolean;
  /** (pointer: coarse) */
  coarse: boolean;
  /** (pointer: fine). A mouse-driven desktop. */
  fine: boolean;
  /** (hover: none). Phones report this; it is not enough on its own. */
  hoverNone: boolean;
  touchPoints: number;
  /** 'ontouchstart' in window */
  touchEvent: boolean;
  screenWidth: number;
  screenHeight: number;
};

/**
 * Phone or tablet when any touch signal is present. Desktop site mode on a
 * phone spoofs the UA (Macintosh / no "Mobile") but keeps a coarse pointer,
 * hover: none, maxTouchPoints, and ontouchstart. Those still count.
 * A fine pointer with no touch points is the desktop gate, even if the
 * window is narrow. Screen size only counts together with touch, so a
 * resized desktop window cannot unlock the app.
 */
export function decideSurface(input: SurfaceSignals): SurfaceName {
  if (input.override || input.standalone) return "phone";

  const touched = input.touchPoints > 0 || input.touchEvent;
  // (hover: none) is the other half of the phone media pair. It confirms a
  // coarse pointer; by itself it must not open the app on a desktop.
  const coarsePointer = input.coarse || (input.hoverNone && input.coarse);
  if (coarsePointer || touched) return "phone";

  // input.fine with no touch points is the desktop gate. Screen width and
  // height are not consulted on their own: a narrow window must stay gated,
  // and a phone-sized screen only matters when a touch signal above is set.
  return "desktop";
}

/**
 * Desktop site mode keeps the hardware screen and stretches the layout
 * viewport (often to ~980). A resized desktop window changes the layout
 * only, so it must not be treated as this case. Already inside the fit
 * frame means we render the app, never nest another frame.
 */
export function isSpoofedLayout(screenWidth: number, layoutWidth: number, framed: boolean): boolean {
  if (framed) return false;
  if (!(screenWidth > 0) || !(layoutWidth > 0)) return false;
  return layoutWidth > screenWidth * 1.25 && layoutWidth - screenWidth > 80;
}
