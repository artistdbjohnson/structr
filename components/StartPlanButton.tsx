"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createSession } from "@/lib/session";
import { loadActive, loadPrefs, saveActive, savePrefs } from "@/lib/storage";
import { getTemplate } from "@/lib/templates";
import styles from "./subpage.module.css";

export function StartPlanButton({
  templateId,
  className,
}: {
  templateId: string;
  className?: string;
}) {
  const router = useRouter();
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
    router.push("/session");
  }

  function onClick() {
    const active = loadActive();
    if (active?.templateId === templateId) {
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
        <p>A session is already in progress. Replace it with this plan?</p>
        <div className={styles.confirmActions}>
          <button className={styles.primary} type="button" onClick={startFresh}>
            Replace
          </button>
          <button className={styles.ghost} type="button" onClick={() => router.push("/session")}>
            Resume
          </button>
        </div>
      </div>
    );
  }

  return (
    <button className={className ?? styles.primary} type="button" onClick={onClick}>
      {mode === "resume" ? "Resume" : "Start"}
    </button>
  );
}
