"use client";

import { useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createSession } from "@/lib/session";
import { loadActive, loadPrefs, saveActive, savePrefs } from "@/lib/storage";
import { getTemplate } from "@/lib/templates";
import { BoltIcon, CalendarIcon, PersonIcon } from "./icons";

export function HomeDock() {
  const router = useRouter();
  const lock = useRef(false);

  function train() {
    if (lock.current) return;
    lock.current = true;
    const active = loadActive();
    if (active) {
      router.push("/session");
      return;
    }
    const prefs = loadPrefs();
    const template =
      (prefs.lastTemplateId && getTemplate(prefs.lastTemplateId)) || getTemplate("swing-foundation");
    if (!template) {
      lock.current = false;
      return;
    }
    const session = createSession(template, prefs.unit);
    saveActive(session);
    savePrefs({ ...prefs, lastTemplateId: template.id });
    router.push("/session");
  }

  return (
    <nav className="dock" aria-label="Home">
      <button className="dock__btn" type="button" onClick={train} aria-label="Train">
        <BoltIcon />
        <span className="dock__label">Train</span>
      </button>
      <Link className="dock__btn" href="/plans" aria-label="Plans">
        <CalendarIcon />
        <span className="dock__label">Plans</span>
      </Link>
      <Link className="dock__btn" href="/you" aria-label="You" aria-current="page">
        <PersonIcon />
        <span className="dock__label">You</span>
      </Link>
    </nav>
  );
}
