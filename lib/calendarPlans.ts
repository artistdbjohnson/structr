/** Day → template id map for the Plans calendar. Local only. */

const KEY = "structr.calendarPlans";

export type CalendarPlanMap = Record<string, string>;

function read(): CalendarPlanMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") return {};
    const out: CalendarPlanMap = {};
    for (const [k, v] of Object.entries(parsed as Record<string, unknown>)) {
      if (/^\d{4}-\d{2}-\d{2}$/.test(k) && typeof v === "string" && v) out[k] = v;
    }
    return out;
  } catch {
    return {};
  }
}

function write(map: CalendarPlanMap) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(map));
  } catch {
    /* private mode */
  }
}

export function loadCalendarPlans(): CalendarPlanMap {
  return read();
}

export function setCalendarPlan(dayKey: string, templateId: string) {
  const map = read();
  map[dayKey] = templateId;
  write(map);
}

export function removeCalendarPlan(dayKey: string) {
  const map = read();
  delete map[dayKey];
  write(map);
}

export function dayKeyFromDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function dayKeyFromIso(iso: string): string | null {
  const t = Date.parse(iso);
  if (!Number.isFinite(t)) return null;
  return dayKeyFromDate(new Date(t));
}
