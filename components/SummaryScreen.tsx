"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { formatClock, formatWhen } from "@/lib/format";
import { summarize } from "@/lib/session";
import { loadHistory } from "@/lib/storage";
import type { SessionSummary } from "@/lib/types";
import { MetricPill } from "@/structr-glass/components/MetricPill";
import { PhaseBar } from "@/structr-glass/components/PhaseBar";
import { TrendChip } from "@/structr-glass/components/TrendChip";
import styles from "./session.module.css";

export function SummaryScreen() {
  const [summary, setSummary] = useState<SessionSummary | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("id");
    const history = loadHistory();
    const match = (id && history.find((item) => item.id === id)) || history[0];
    setSummary(match ? summarize(match) : null);
    setReady(true);
  }, []);

  if (!ready) {
    return (
      <main className={styles.screen}>
        <div className={styles.shell}>
          <p className={styles.lead}>Loading…</p>
        </div>
      </main>
    );
  }

  if (!summary) {
    return (
      <main className={styles.screen}>
        <div className={styles.shell}>
          <h1 className={styles.title}>Nothing to show yet</h1>
          <p className={styles.lead}>Finish a session and the totals show up here.</p>
          <Link className={styles.nextBtn} href="/">
            Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.screen} data-screen="summary">
      <div className={styles.shell}>
        <header className={styles.heading}>
          <h1 className={styles.title}>{summary.templateName}</h1>
          <p className={styles.kicker}>{formatWhen(summary.endedAt)}</p>
        </header>
        <p className={styles.lead}>Saved on this phone.</p>
        <PhaseBar
          title="Session"
          phases={5}
          activeIndex={4}
          activeProgress={1}
          phaseName="Cool-down"
          percent={100}
          tint="cyan"
        />
        <div className={`${styles.pills} ${styles.pills2}`}>
          <MetricPill className={styles.pillFit} label="Duration" value={formatClock(summary.durationSec)} tint="cyan" />
          <MetricPill className={styles.pillFit} label="Total reps" value={summary.totalReps} tint="magenta" />
          <MetricPill
            className={styles.pillFit}
            label="Top weight"
            value={summary.topWeight > 0 ? summary.topWeight : "—"}
            tint="orange"
            footer={
              summary.topWeight > 0 ? (
                <TrendChip value={summary.unit} direction="flat" tint="orange" />
              ) : undefined
            }
          />
          <MetricPill
            className={styles.pillFit}
            label="How hard"
            value={summary.bulkRpe ?? "—"}
            tint="magenta"
          />
        </div>
        <div className={styles.nextBar}>
          <Link className={styles.nextBtn} href="/">
            Done
          </Link>
          <Link className={styles.ghostLink} href="/you">
            You
          </Link>
        </div>
      </div>
    </main>
  );
}
