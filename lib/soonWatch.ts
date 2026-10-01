import { STORAGE_KEYS } from "./storage";

function canStore(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

/** Local “notify me” flags for coming-soon rows. No backend. */
export function loadSoonWatch(): string[] {
  if (!canStore()) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS.soonWatch);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((id): id is string => typeof id === "string");
  } catch {
    return [];
  }
}

export function setSoonWatch(id: string, on: boolean) {
  if (!canStore()) return;
  const next = new Set(loadSoonWatch());
  if (on) next.add(id);
  else next.delete(id);
  window.localStorage.setItem(STORAGE_KEYS.soonWatch, JSON.stringify([...next]));
}
