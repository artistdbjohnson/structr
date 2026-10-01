/** Wallpaper routes. The Train for tray stays closed until Plans (or Train) opens it. */
export function isTrainHome(pathname: string): boolean {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  return path === "/" || path === "/plans";
}
