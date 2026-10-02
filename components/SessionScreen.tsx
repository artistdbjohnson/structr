"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { loadActive } from "@/lib/storage";
import type { WorkoutSession } from "@/lib/types";
import { SessionRunner } from "./SessionRunner";
import styles from "./session.module.css";

export function SessionScreen() {
  const [session, setSession] = useState<WorkoutSession | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setSession(loadActive());
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

  if (!session) {
    return (
      <main className={styles.screen}>
        <div className={styles.shell}>
          <h1 className={styles.title}>Nothing going</h1>
          <p className={styles.lead}>Pick a plan and we'll start from the warm-up.</p>
          <div className={styles.links}>
            <Link href="/">Home</Link>
            <Link href="/plans">Train for</Link>
          </div>
        </div>
      </main>
    );
  }

  return <SessionRunner initial={session} />;
}
