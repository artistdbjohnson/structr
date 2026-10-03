"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { dockTab, rememberDockTab } from "@/lib/nav";
import { createSession } from "@/lib/session";
import { loadActive, loadPrefs, saveActive, savePrefs } from "@/lib/storage";
import { getTemplate } from "@/lib/templates";
import styles from "./subpage.module.css";
import { useTapGuard } from "./useTapGuard";

export function StartPlanButton({
  templateId,
  className,
  label = "Start",
}: {
  templateId: string;
  className?: string;
  label?: string;
}) {
  const router = useRouter();
  const pathname = usePathname() || "/";
  const tap = useTapGuard();
  const [mode, setMode] = useState<"start" | "resume">("start");
  const [ask, setAsk] = useState(false);

  useEffect(() => {
    const active = loadActive();
    setMode(active?.templateId === templateId ? "resume" : "start");
  }, [templateId]);

  function startFresh() {
    const template = getTemplate(templateId);
    if (!template) return;
    const prefs = loadPrefs();
    const session = createSession(template, prefs.unit);
    saveActive(session);
    savePrefs({ ...prefs, lastTemplateId: template.id });
    const tab = dockTab(pathname);
    if (tab) rememberDockTab(tab);
    router.push("/session");
  }

  function onClick() {
    if (tap.consumeIfMoved()) return;
    const active = loadActive();
    if (active?.templateId === templateId) {
      const tab = dockTab(pathname);
      if (tab) rememberDockTab(tab);
      router.push("/session");
      return;
    }
    if (active) {
      setAsk(true);
      return;
    }
    startFresh();
  }

  if (ask) {
    return (
      <div className={styles.confirm}>
        <p>You&apos;ve got a session going. End it and start this one? The one in progress won&apos;t be saved.</p>
        <div className={styles.confirmActions}>
          <button
            className={styles.primary}
            type="button"
            onPointerDown={tap.onPointerDown}
            onPointerMove={tap.onPointerMove}
            onClick={() => {
              if (tap.consumeIfMoved()) return;
              startFresh();
            }}
          >
            End and start
          </button>
          <button
            className={styles.ghost}
            type="button"
            onPointerDown={tap.onPointerDown}
            onPointerMove={tap.onPointerMove}
            onClick={() => {
              if (tap.consumeIfMoved()) return;
              const tab = dockTab(pathname);
              if (tab) rememberDockTab(tab);
              router.push("/session");
            }}
          >
            Resume
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      className={className ?? styles.primary}
      type="button"
      onPointerDown={tap.onPointerDown}
      onPointerMove={tap.onPointerMove}
      onClick={onClick}
    >
      {mode === "resume" ? "Resume" : label}
    </button>
  );
}
