"use client";

import { useEffect, useState, type FormEvent } from "react";
import { usePathname, useRouter } from "next/navigation";
import { resolveLearnName } from "@/lib/learnSkill";
import { dockTab, rememberDockTab } from "@/lib/nav";
import { createSession } from "@/lib/session";
import { loadActive, loadPrefs, rememberLearnedPlan, saveActive, savePrefs } from "@/lib/storage";
import { getTemplate } from "@/lib/templates";
import styles from "./subpage.module.css";

export function LearnSkill() {
  const router = useRouter();
  const pathname = usePathname() || "/";
  const [name, setName] = useState("");
  const [ask, setAsk] = useState(false);
  const [activeName, setActiveName] = useState<string | null>(null);

  useEffect(() => {
    setActiveName(loadActive()?.templateName ?? null);
  }, []);

  function startNamed() {
    const resolved = resolveLearnName(name);
    if (!resolved) return;
    const template = resolved.template;
    if (!getTemplate(template.id)) rememberLearnedPlan(template);
    const prefs = loadPrefs();
    const session = createSession(template, prefs.unit);
    saveActive(session);
    savePrefs({ ...prefs, lastTemplateId: template.id });
    const tab = dockTab(pathname);
    if (tab) rememberDockTab(tab);
    router.push("/session");
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!name.trim()) return;
    if (loadActive()) {
      setAsk(true);
      setActiveName(loadActive()?.templateName ?? null);
      return;
    }
    startNamed();
  }

  return (
    <section className={styles.card} data-learn-skill="true" aria-labelledby="learn-skill-title">
      <h2 id="learn-skill-title" className={styles.cardTitle}>
        Learn a skill
      </h2>
      <p className={styles.lead}>
        Name it the way you&apos;d say it. If that&apos;s already a plan, we&apos;ll start it. If not, we&apos;ll build a short session from the name.
      </p>
      {ask ? (
        <div className={styles.confirm}>
          <p>
            You&apos;ve got {activeName ? `${activeName} ` : "a session "}going. End it and start this one? The one in
            progress won&apos;t be saved.
          </p>
          <div className={styles.confirmActions}>
            <button className={styles.primary} type="button" onClick={startNamed}>
              End and start
            </button>
            <button className={styles.ghost} type="button" onClick={() => setAsk(false)}>
              Keep going
            </button>
          </div>
        </div>
      ) : (
        <form className={styles.learnForm} onSubmit={onSubmit}>
          <label className={styles.learnLabel}>
            The skill
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Hike pass, or anything else"
              autoComplete="off"
              enterKeyHint="go"
            />
          </label>
          <button className={styles.primary} type="submit" disabled={!name.trim()}>
            Start
          </button>
        </form>
      )}
    </section>
  );
}
