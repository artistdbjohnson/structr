export type DockTab = "train" | "you";

const RETURN_KEY = "structr.returnTo";

function normalize(pathname: string): string {
  if (!pathname) return "/";
  return pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
}

/**
 * Dock has Train and You only. Plan and info routes sit under Train.
 * `/` selects nothing so the pearl never rests on a closed sheet.
 */
export function dockTab(pathname: string): DockTab | null {
  const path = normalize(pathname);
  if (path === "/") return null;
  if (path === "/you") return "you";
  if (
    path === "/train" ||
    path.startsWith("/train/") ||
    path === "/plans" ||
    path.startsWith("/plans/") ||
    path === "/info" ||
    path.startsWith("/info/")
  ) {
    return "train";
  }
  return null;
}

export function isTrainSheet(pathname: string): boolean {
  const path = normalize(pathname);
  return path === "/train" || path.startsWith("/train/");
}

export function dockHref(tab: DockTab): string {
  return tab === "you" ? "/you" : "/train";
}

/** Where session chrome Back / swipe should land. */
export function rememberReturnTo(pathname: string) {
  if (typeof window === "undefined") return;
  const path = normalize(pathname);
  if (!path || path.startsWith("/session")) return;
  try {
    window.sessionStorage.setItem(RETURN_KEY, path);
  } catch {
    /* private mode */
  }
}

export function peekReturnTo(): string {
  if (typeof window === "undefined") return "/";
  try {
    const value = window.sessionStorage.getItem(RETURN_KEY);
    if (value && value !== "/session" && !value.startsWith("/session/")) return value;
  } catch {
    /* private mode */
  }
  return "/";
}

export function clearReturnTo() {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(RETURN_KEY);
  } catch {
    /* private mode */
  }
}

/**
 * Leave session: prefer history.back so iOS swipe matches the chrome control.
 * Falls back to the stored return path, then home.
 */
export function exitSession(router: { back(): void; push(href: string): void }) {
  const fallback = peekReturnTo();
  clearReturnTo();
  if (typeof window !== "undefined" && window.history.length > 1) {
    router.back();
    return;
  }
  router.push(fallback || "/");
}

/** @deprecated kept for any stray imports — maps to train/you only */
export function rememberDockTab(tab: DockTab) {
  rememberReturnTo(dockHref(tab));
}

export function rememberedDockTab(): DockTab {
  const path = peekReturnTo();
  return dockTab(path) ?? "train";
}
