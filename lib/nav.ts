export type DockTab = "train" | "plans" | "you";

const DOCK_TAB_KEY = "structr.dockTab";

function normalize(pathname: string): string {
  if (!pathname) return "/";
  return pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
}

/**
 * The dock tab is the route. `/` is the cold wallpaper and selects nothing,
 * so a disc can never sit on a tab whose sheet is closed.
 * Info pages live under Plans: leaving them returns to the Plans sheet.
 */
export function dockTab(pathname: string): DockTab | null {
  const path = normalize(pathname);
  if (path === "/") return null;
  if (path === "/you") return "you";
  if (path === "/train" || path.startsWith("/train/")) return "train";
  if (
    path === "/plans" ||
    path.startsWith("/plans/") ||
    path === "/info" ||
    path.startsWith("/info/")
  ) {
    return "plans";
  }
  return null;
}

/** Train for is the Train tab's own sheet, not an overlay on Plans. */
export function isTrainSheet(pathname: string): boolean {
  return normalize(pathname) === "/train";
}

export function dockHref(tab: DockTab): string {
  if (tab === "train") return "/train";
  if (tab === "you") return "/you";
  return "/plans";
}

export function rememberDockTab(tab: DockTab) {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(DOCK_TAB_KEY, tab);
  } catch {
    /* private mode */
  }
}

/** Session routes unmount the dock. Exit should reopen this tab's sheet, never a bare wallpaper. */
export function rememberedDockTab(): DockTab {
  if (typeof window === "undefined") return "plans";
  try {
    const value = window.sessionStorage.getItem(DOCK_TAB_KEY);
    if (value === "train" || value === "plans" || value === "you") return value;
  } catch {
    /* private mode */
  }
  return "plans";
}
