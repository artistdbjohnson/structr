/** Home routes that show the Train for tray over the wallpaper. */
export function isTrainHome(pathname: string): boolean {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  return path === "/" || path === "/plans";
}
