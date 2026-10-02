"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { formatClock, formatWhen } from "@/lib/format";
import { MOVEMENT_ART_CREDIT } from "@/lib/movementHowTo";
import { REPDB_CREDIT, REPDB_HOME } from "@/lib/repdb";
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
    <PageFrame backHref="/" backLabel="‹ Train for" title="You">
      {prefs && history ? (
        <>
          <p className={styles.lead}>Sessions stay on this phone. No account.</p>
          {activeName ? (
            <Link className={styles.primary} href="/session">
              Resume {activeName}
            </Link>
          ) : null}
          <section className={styles.card}>
            <h2 className={styles.cardTitle}>Units</h2>
            <p className={styles.lead}>New sessions use this. Old ones keep the unit you logged them in.</p>
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
              <p className={styles.lead}>Nothing saved yet. Hit Train and pick a plan.</p>
            ) : (
              history.map((session) => {
                const summary = summarize(session);
                return (
                  <article key={summary.id} className={styles.card}>
                    <div className={styles.sessionItem}>
                      <strong className={styles.sessionName}>{summary.templateName}</strong>
                      <p className={styles.kicker}>{formatWhen(summary.endedAt)}</p>
                      <ul className={styles.statRow}>
                        <li>{formatClock(summary.durationSec)}</li>
                        <li>{summary.totalReps} reps</li>
                        <li>{summary.topWeight > 0 ? `${summary.topWeight} ${summary.unit}` : "no load"}</li>
                        <li>How hard {summary.bulkRpe ?? "—"}</li>
                      </ul>
                    </div>
                  </article>
                );
              })
            )}
          </section>
          <section className={styles.card}>
            <h2 className={styles.cardTitle}>Pictures</h2>
            <p className={styles.finePrint}>
              <a href={REPDB_HOME} target="_blank" rel="noreferrer">
                {REPDB_CREDIT}
              </a>
              . The How sheets use their free still pictures, start and peak or one frame. Not loops.
            </p>
            <p className={styles.finePrint}>
              The world's greatest stretch drawing is by {MOVEMENT_ART_CREDIT.creator},{" "}
              <a href={MOVEMENT_ART_CREDIT.workUrl} target="_blank" rel="noreferrer">
                {MOVEMENT_ART_CREDIT.work}
              </a>
              , under{" "}
              <a href={MOVEMENT_ART_CREDIT.licenseUrl} target="_blank" rel="noreferrer">
                {MOVEMENT_ART_CREDIT.license}
              </a>
              . {MOVEMENT_ART_CREDIT.changes}
            </p>
          </section>
          {ask ? (
            <div className={styles.confirm}>
              <p>Wipe the sessions, the one in progress, and your lb/kg choice off this phone?</p>
              <div className={styles.confirmActions}>
                <button className={styles.danger} type="button" onClick={clear}>
                  Wipe it
                </button>
                <button className={styles.ghost} type="button" onClick={() => setAsk(false)}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button className={styles.danger} type="button" onClick={() => setAsk(true)}>
              Clear everything
            </button>
          )}
        </>
      ) : (
        <p className={styles.lead}>One second…</p>
      )}
    </PageFrame>
  );
}
