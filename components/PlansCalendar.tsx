"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { useRouter } from "next/navigation";
import { rememberReturnTo } from "@/lib/nav";
import {
  dayKeyFromDate,
  dayKeyFromIso,
  loadCalendarPlans,
  removeCalendarPlan,
  setCalendarPlan,
  type CalendarPlanMap,
} from "@/lib/calendarPlans";
import { createSession, summarize } from "@/lib/session";
import { loadHistory, loadPrefs, saveActive, savePrefs } from "@/lib/storage";
import { TEMPLATES, getTemplate } from "@/lib/templates";
import type { SessionSummary, WorkoutSession } from "@/lib/types";
import { PageFrame } from "./PageFrame";
import styles from "./plansCalendar.module.css";

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"] as const;
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

type DayState = "rest" | "planned" | "trained";

type Sheet =
  | { kind: "trained"; dayKey: string; summary: SessionSummary }
  | { kind: "planned"; dayKey: string; templateId: string; templateName: string }
  | { kind: "empty"; dayKey: string }
  | { kind: "picker"; dayKey: string };

function formatDuration(sec: number): string {
  const m = Math.max(1, Math.round(sec / 60));
  return `${m} min`;
}

function startOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function daysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function trainedByDay(history: WorkoutSession[]): Map<string, WorkoutSession> {
  const map = new Map<string, WorkoutSession>();
  for (const session of history) {
    if (session.status === "abandoned") continue;
    if (session.status !== "complete" && !session.endedAt) continue;
    const key = dayKeyFromIso(session.endedAt ?? session.startedAt);
    if (!key) continue;
    const prev = map.get(key);
    if (!prev || Date.parse(session.endedAt ?? session.startedAt) >= Date.parse(prev.endedAt ?? prev.startedAt)) {
      map.set(key, session);
    }
  }
  return map;
}

export function PlansCalendar() {
  const router = useRouter();
  const today = useMemo(() => {
    const n = new Date();
    return new Date(n.getFullYear(), n.getMonth(), n.getDate());
  }, []);
  const todayKey = dayKeyFromDate(today);

  const [cursor, setCursor] = useState(() => startOfMonth(today));
  const [plans, setPlans] = useState<CalendarPlanMap>({});
  const [trained, setTrained] = useState<Map<string, WorkoutSession>>(() => new Map());
  const [sheet, setSheet] = useState<Sheet | null>(null);
  const swipeX = useRef<number | null>(null);

  const refresh = useCallback(() => {
    setPlans(loadCalendarPlans());
    setTrained(trainedByDay(loadHistory()));
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const count = daysInMonth(year, month);

  function shiftMonth(delta: number) {
    setCursor((c) => new Date(c.getFullYear(), c.getMonth() + delta, 1));
    setSheet(null);
  }

  function onPointerDown(e: ReactPointerEvent<HTMLDivElement>) {
    swipeX.current = e.clientX;
  }

  function onPointerUp(e: ReactPointerEvent<HTMLDivElement>) {
    if (swipeX.current == null) return;
    const dx = e.clientX - swipeX.current;
    swipeX.current = null;
    if (Math.abs(dx) < 56) return;
    shiftMonth(dx < 0 ? 1 : -1);
  }

  function openDay(day: number) {
    const date = new Date(year, month, day);
    const key = dayKeyFromDate(date);
    const session = trained.get(key);
    if (session && date.getTime() <= today.getTime()) {
      const summary = summarize({
        ...session,
        endedAt: session.endedAt ?? session.startedAt,
      });
      setSheet({ kind: "trained", dayKey: key, summary });
      return;
    }
    const templateId = plans[key];
    if (templateId) {
      const template = getTemplate(templateId);
      setSheet({
        kind: "planned",
        dayKey: key,
        templateId,
        templateName: template?.name ?? templateId,
      });
      return;
    }
    setSheet({ kind: "empty", dayKey: key });
  }

  function startPlan(templateId: string) {
    const template = getTemplate(templateId);
    if (!template) return;
    const prefs = loadPrefs();
    const session = createSession(template, prefs.unit);
    saveActive(session);
    savePrefs({ ...prefs, lastTemplateId: template.id });
    rememberReturnTo("/plans");
    setSheet(null);
    router.push("/session");
  }

  function assignPlan(dayKey: string, templateId: string) {
    setCalendarPlan(dayKey, templateId);
    refresh();
    const template = getTemplate(templateId);
    setSheet({
      kind: "planned",
      dayKey,
      templateId,
      templateName: template?.name ?? templateId,
    });
  }

  function clearPlan(dayKey: string) {
    removeCalendarPlan(dayKey);
    refresh();
    setSheet({ kind: "empty", dayKey });
  }

  return (
    <PageFrame title="Plans" meta="Training spine">
      <div className={styles.root}>
        <div className={styles.monthRail}>
          <button type="button" className={styles.navBtn} aria-label="Previous month" onClick={() => shiftMonth(-1)}>
            ‹
          </button>
          <div className={styles.monthName} aria-live="polite">
            {MONTHS[month]} {year}
          </div>
          <button type="button" className={styles.navBtn} aria-label="Next month" onClick={() => shiftMonth(1)}>
            ›
          </button>
        </div>

        <div
          className={styles.spine}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={() => {
            swipeX.current = null;
          }}
        >
          <ul className={styles.days}>
            {Array.from({ length: count }, (_, i) => {
              const day = i + 1;
              const date = new Date(year, month, day);
              const key = dayKeyFromDate(date);
              const isToday = key === todayKey;
              const hasTrain = trained.has(key);
              const hasPlan = Boolean(plans[key]);
              let state: DayState = "rest";
              if (hasTrain && date.getTime() <= today.getTime()) state = "trained";
              else if (hasPlan) state = "planned";
              return (
                <li key={key}>
                  <button
                    type="button"
                    className={styles.day}
                    data-state={state}
                    data-today={isToday ? "true" : "false"}
                    aria-label={`${MONTHS[month]} ${day}${isToday ? ", today" : ""}, ${state}`}
                    onClick={() => openDay(day)}
                  >
                    <span className={styles.weekday}>{WEEKDAYS[date.getDay()]}</span>
                    <span className={styles.num}>{day}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {sheet ? (
        <div
          className={styles.sheetScrim}
          role="presentation"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSheet(null);
          }}
        >
          <div className={styles.sheet} role="dialog" aria-modal="true">
            {sheet.kind === "trained" ? (
              <>
                <p className={styles.sheetKicker}>{sheet.dayKey}</p>
                <h2 className={styles.sheetTitle}>{sheet.summary.templateName}</h2>
                <p className={styles.sheetMeta}>
                  {formatDuration(sheet.summary.durationSec)}
                  {sheet.summary.totalReps ? ` · ${sheet.summary.totalReps} reps` : ""}
                  {sheet.summary.bulkRpe != null ? ` · RPE ${sheet.summary.bulkRpe}` : ""}
                </p>
                <div className={styles.actions}>
                  <button type="button" className={styles.ghost} onClick={() => setSheet(null)}>
                    Close
                  </button>
                </div>
              </>
            ) : null}

            {sheet.kind === "planned" ? (
              <>
                <p className={styles.sheetKicker}>{sheet.dayKey}</p>
                <h2 className={styles.sheetTitle}>{sheet.templateName}</h2>
                <p className={styles.sheetMeta}>Planned session</p>
                <div className={styles.actions}>
                  <button type="button" className={styles.primary} onClick={() => startPlan(sheet.templateId)}>
                    Start
                  </button>
                  <button type="button" className={styles.ghost} onClick={() => clearPlan(sheet.dayKey)}>
                    Remove
                  </button>
                  <button type="button" className={styles.ghost} onClick={() => setSheet(null)}>
                    Close
                  </button>
                </div>
              </>
            ) : null}

            {sheet.kind === "empty" ? (
              <>
                <p className={styles.sheetKicker}>{sheet.dayKey}</p>
                <h2 className={styles.sheetTitle}>Open day</h2>
                <p className={styles.sheetMeta}>No plan on this day yet.</p>
                <div className={styles.actions}>
                  <button
                    type="button"
                    className={styles.primary}
                    onClick={() => setSheet({ kind: "picker", dayKey: sheet.dayKey })}
                  >
                    Add a plan
                  </button>
                  <button type="button" className={styles.ghost} onClick={() => setSheet(null)}>
                    Close
                  </button>
                </div>
              </>
            ) : null}

            {sheet.kind === "picker" ? (
              <>
                <p className={styles.sheetKicker}>{sheet.dayKey}</p>
                <h2 className={styles.sheetTitle}>Add a plan</h2>
                <p className={styles.sheetMeta}>Pick from Train plans.</p>
                <ul className={styles.picker}>
                  {TEMPLATES.map((template) => (
                    <li key={template.id}>
                      <button type="button" className={styles.pick} onClick={() => assignPlan(sheet.dayKey, template.id)}>
                        {template.name}
                        <span className={styles.pickMeta}>{template.minutes}</span>
                      </button>
                    </li>
                  ))}
                </ul>
                <div className={styles.actions} style={{ marginTop: "0.75rem" }}>
                  <button type="button" className={styles.ghost} onClick={() => setSheet({ kind: "empty", dayKey: sheet.dayKey })}>
                    Back
                  </button>
                </div>
              </>
            ) : null}
          </div>
        </div>
      ) : null}
    </PageFrame>
  );
}
