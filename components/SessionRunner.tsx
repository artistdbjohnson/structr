"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { dockHref, rememberedDockTab } from "@/lib/nav";
import { formatClock } from "@/lib/format";
import { QUIET_STOP_SEC, quietStopDelaysMs } from "@/lib/quietStop";
import { checkAdvance, phaseProgress, templateForSession } from "@/lib/session";
import { clearActive, loadHistory, loadPrefs, saveActive, saveHistory, savePrefs } from "@/lib/storage";
import { PHASE_SHORT, defaultBell } from "@/lib/templates";
import type { WorkoutSession } from "@/lib/types";
import { PhaseBar } from "@/structr-glass/components/PhaseBar";
import { BulkPhase } from "./BulkPhase";
import { PrepPhase } from "./PrepPhase";
import styles from "./session.module.css";

export function SessionRunner({ initial }: { initial: WorkoutSession }) {
  const router = useRouter();
  const template = templateForSession(initial);
  const [session, setSession] = useState(initial);
  const sessionRef = useRef(session);
  sessionRef.current = session;
  const [message, setMessage] = useState<string | null>(null);
  const [confirmText, setConfirmText] = useState<string | null>(null);
  const [menu, setMenu] = useState(false);
  const [now, setNow] = useState(() => Date.now());
  const [quietUntil, setQuietUntil] = useState<number | null>(null);
  const finishing = useRef(false);

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 250);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const phaseId = sessionRef.current.phases[sessionRef.current.phaseIndex]?.id;
    if (phaseId !== "skill") {
      setQuietUntil(null);
      return;
    }
    const delays = quietStopDelaysMs(sessionRef.current.id, "skill");
    const timers = delays.map((delay) =>
      window.setTimeout(() => {
        const live = sessionRef.current;
        if (live.phases[live.phaseIndex]?.id !== "skill") return;
        setQuietUntil(Date.now() + QUIET_STOP_SEC * 1000);
      }, delay),
    );
    return () => {
      for (const timer of timers) window.clearTimeout(timer);
    };
  }, [session.id, session.phaseIndex]);

  function commit(next: WorkoutSession) {
    sessionRef.current = next;
    setSession(next);
    if (next.status === "active") saveActive(next);
    setMessage(null);
  }

  if (!template) {
    return (
      <main className={styles.screen}>
        <div className={styles.shell}>
          <h1 className={styles.title}>Plan missing</h1>
          <p className={styles.lead}>This plan isn't on the phone anymore.</p>
          <button
            className={styles.nextBtn}
            type="button"
            onClick={() => {
              clearActive();
              router.push(dockHref(rememberedDockTab()));
            }}
          >
            Drop it
          </button>
        </div>
      </main>
    );
  }

  const phase = session.phases[session.phaseIndex];
  const spec = template.phases[session.phaseIndex];
  const quiet = phase?.id === "skill" && quietUntil != null && now < quietUntil;
  const quietLeft = quiet && quietUntil != null ? Math.max(0, Math.ceil((quietUntil - now) / 1000)) : 0;
  const quietDelays = phase?.id === "skill" ? quietStopDelaysMs(session.id, "skill") : [];
  const started = Date.parse(session.startedAt);
  const elapsed = Number.isFinite(started) ? Math.max(0, Math.floor((now - started) / 1000)) : 0;
  const bulkSets = phase?.bulk?.sets.length ?? 0;
  const bulkTarget = spec?.id === "bulk" ? (spec.blocks[0]?.sets ?? 0) : 0;

  function advance(force: boolean) {
    const current = sessionRef.current;
    const activeTemplate = templateForSession(current);
    if (!activeTemplate) return;
    const result = checkAdvance(current, activeTemplate);
    if (result.type === "block") {
      setConfirmText(null);
      setMessage(result.message);
      return;
    }
    if (result.type === "confirm" && !force) {
      setMessage(null);
      setConfirmText(result.message);
      return;
    }
    setConfirmText(null);
    setMessage(null);
    if (current.phaseIndex >= current.phases.length - 1) {
      if (finishing.current) return;
      finishing.current = true;
      const done: WorkoutSession = {
        ...current,
        status: "complete",
        endedAt: new Date().toISOString(),
      };
      saveHistory([done, ...loadHistory().filter((item) => item.id !== done.id)].slice(0, 40));
      clearActive();
      const prefs = loadPrefs();
      savePrefs({ ...prefs, lastTemplateId: done.templateId });
      sessionRef.current = done;
      setSession(done);
      router.replace(`/session/complete?id=${encodeURIComponent(done.id)}`);
      return;
    }
    commit({ ...current, phaseIndex: current.phaseIndex + 1 });
  }

  function abortSet() {
    const current = sessionRef.current;
    commit({
      ...current,
      phases: current.phases.map((item) =>
        item.id === "bulk" && item.bulk
          ? { ...item, bulk: { ...item.bulk, ui: "idle", activeStartedAt: undefined } }
          : item,
      ),
    });
    setMenu(false);
  }

  function toggleUnit() {
    const current = sessionRef.current;
    const unit = current.unit === "lb" ? "kg" : "lb";
    const prefs = loadPrefs();
    savePrefs({ ...prefs, unit });
    const next: WorkoutSession = {
      ...current,
      unit,
      phases: current.phases.map((item) => {
        if (item.id !== "bulk" || !item.bulk || item.bulk.sets.length > 0) return item;
        return { ...item, bulk: { ...item.bulk, weight: defaultBell(current.templateId, unit) } };
      }),
    };
    commit(next);
    setMenu(false);
  }

  return (
    <main
      className={styles.screen}
      data-screen="session"
      data-phase={phase?.id ?? "unknown"}
      data-quiet-stop={quiet ? "true" : "false"}
      data-quiet-delays={quietDelays.join(",") || undefined}
    >
      {quiet ? (
        <div className={styles.quietScrim} role="status" aria-live="assertive" data-quiet-card="true">
          <div className={styles.quietCard}>
            <p className={styles.quietKicker}>Quiet stop</p>
            <p className={styles.quietTime} data-seconds={quietLeft}>
              {formatClock(quietLeft)}
            </p>
            <p className={styles.quietLead}>Do nothing.</p>
            <p className={styles.quietNote}>Replay the last rep in your head.</p>
            <div className={styles.quietTrack} aria-hidden="true">
              <span style={{ width: `${Math.round((quietLeft / QUIET_STOP_SEC) * 1000) / 10}%` }} />
            </div>
          </div>
        </div>
      ) : null}
      <div className={styles.shell} inert={quiet ? true : undefined}>
        <header className={styles.chrome}>
          <button className={styles.iconBtn} type="button" aria-label="End session" onClick={() => router.push(dockHref(rememberedDockTab()))}>
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
              <path
                d="M14.5 5.5 8 12l6.5 6.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <span className={styles.phasePill}>{spec?.id === "bulk" ? "BULK" : spec?.name}</span>
          <button
            className={styles.iconBtn}
            type="button"
            aria-label="Session menu"
            aria-expanded={menu}
            onClick={() => setMenu((open) => !open)}
          >
            ···
          </button>
        </header>
        {menu ? (
          <div className={styles.menu} role="menu">
            <button type="button" onClick={() => router.push(dockHref(rememberedDockTab()))}>
              End session
            </button>
            {phase?.bulk?.ui === "active" ? (
              <button type="button" onClick={abortSet}>
                Stop this set
              </button>
            ) : null}
            <button type="button" onClick={toggleUnit}>
              Units · {session.unit === "lb" ? "lb" : "kg"}
            </button>
            <button type="button" onClick={() => setMenu(false)}>
              Close
            </button>
          </div>
        ) : null}
        <PhaseBar
          title="Session"
          phases={5}
          activeIndex={session.phaseIndex}
          activeProgress={phaseProgress(session, template)}
          phaseName={PHASE_SHORT[session.phaseIndex] ?? spec?.name}
          tint={phase?.id === "bulk" ? "orange" : "magenta"}
        />
        {phase?.id === "bulk" ? (
          <BulkPhase session={session} template={template} now={now} onChange={commit} />
        ) : (
          <PrepPhase key={phase?.id} session={session} template={template} held={quiet} onChange={commit} />
        )}
        <div className={styles.nextBar}>
          {message ? (
            <p className={styles.message} role="alert">
              {message}
            </p>
          ) : null}
          {confirmText ? (
            <div className={styles.confirm}>
              <p>{confirmText}</p>
              <div className={styles.confirmActions}>
                <button type="button" onClick={() => advance(true)}>
                  Continue
                </button>
                <button type="button" onClick={() => setConfirmText(null)}>
                  Stay
                </button>
              </div>
            </div>
          ) : null}
          <button className={styles.nextBtn} type="button" disabled={quiet} onClick={() => advance(false)}>
            {session.phaseIndex >= session.phases.length - 1 ? "Finish" : "Next"}
          </button>
        </div>
        <p className={styles.metaFooter}>
          <span>{formatClock(elapsed)} in</span>
          <span>
            {phase?.id === "bulk"
              ? `${Math.max(0, bulkTarget - bulkSets)} sets left`
              : spec?.name}
          </span>
        </p>
      </div>
    </main>
  );
}
