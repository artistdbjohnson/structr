"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { formatClock, formatWhen } from "@/lib/format";
import { summarize } from "@/lib/session";
import { clearAllData, loadActive, loadHistory, loadPrefs, savePrefs } from "@/lib/storage";
import type { Prefs, Unit, WorkoutSession } from "@/lib/types";
import { PageFrame } from "./PageFrame";
import styles from "./subpage.module.css";

export function YouScreen() {
  const [prefs, setPrefs] = useState<Prefs | null>(null);
  const [history, setHistory] = useState<WorkoutSession[] | null>(null);
  const [activeName, setActiveName] = useState<string | null>(null);
  const [ask, setAsk] = useState(false);

  useEffect(() => {
    setPrefs(loadPrefs());
    setHistory(loadHistory());
    setActiveName(loadActive()?.templateName ?? null);
  }, []);

  function chooseUnit(unit: Unit) {
    const next = { ...(prefs ?? { unit }), unit };
    savePrefs(next);
    setPrefs(next);
  }

  function clear() {
    clearAllData();
    setHistory([]);
    setPrefs({ unit: "lb" });
    setActiveName(null);
    setAsk(false);
  }

  return (
    <PageFrame backHref="/" backLabel="‹ Home" title="You">
      {prefs && history ? (
        <>
          <p className={styles.lead}>Sessions stay on this device. No account.</p>
          {activeName ? (
            <Link className={styles.primary} href="/session">
              Resume {activeName}
            </Link>
          ) : null}
          <section className={styles.card}>
            <h2 className={styles.cardTitle}>Units</h2>
            <p className={styles.lead}>New sessions use this preference. Saved sessions keep the unit they were logged in.</p>
            <div className={styles.unitRow}>
              {(["lb", "kg"] as const).map((unit) => (
                <button
                  key={unit}
                  type="button"
                  className={prefs.unit === unit ? `${styles.ghost} ${styles.unitOn}` : styles.ghost}
                  aria-pressed={prefs.unit === unit}
                  onClick={() => chooseUnit(unit)}
                >
                  {unit}
                </button>
              ))}
            </div>
          </section>
          <section className={styles.stack}>
            <h2 className={styles.cardTitle}>Recent</h2>
            {history.length === 0 ? (
              <p className={styles.lead}>No sessions yet. Train starts Swing Foundation.</p>
            ) : (
              history.map((session) => {
                const summary = summarize(session);
                return (
                  <article key={summary.id} className={styles.card}>
                    <div className={styles.sessionItem}>
                      <strong>{summary.templateName}</strong>
                      <span className={styles.lead}>{formatWhen(summary.endedAt)}</span>
                      <span className={styles.lead}>
                        {formatClock(summary.durationSec)} · {summary.totalReps} reps ·{" "}
                        {summary.topWeight > 0 ? `${summary.topWeight} ${summary.unit}` : "no load"} · BULK RPE{" "}
                        {summary.bulkRpe ?? "—"}
                      </span>
                    </div>
                  </article>
                );
              })
            )}
          </section>
          {ask ? (
            <div className={styles.confirm}>
              <p>Erase sessions, the active workout, and the unit preference from this device?</p>
              <div className={styles.confirmActions}>
                <button className={styles.danger} type="button" onClick={clear}>
                  Erase
                </button>
                <button className={styles.ghost} type="button" onClick={() => setAsk(false)}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button className={styles.danger} type="button" onClick={() => setAsk(true)}>
              Clear data
            </button>
          )}
        </>
      ) : (
        <p className={styles.lead}>Loading…</p>
      )}
    </PageFrame>
  );
}
