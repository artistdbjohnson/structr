"use client";

import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import { createSession } from "@/lib/session";
import { loadActive, loadHistory, loadPrefs, saveActive, savePrefs } from "@/lib/storage";
import { getTemplate } from "@/lib/templates";
import { DEFAULT_TEMPLATE_ROUTE } from "@/lib/taxonomy";
import { BoltIcon, CalendarIcon, PersonIcon } from "./icons";
import { TrainSheet } from "./TrainSheet";

/** Shared-layout glide. Near-critical spring so the disc settles without bounce. */
const SELECTION_SPRING = {
  type: "spring" as const,
  stiffness: 380,
  damping: 30,
  mass: 0.62,
};

type SlotId = "train" | "plans" | "you";

function routeSlot(pathname: string): Exclude<SlotId, "train"> {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  if (
    path === "/" ||
    path === "/plans" ||
    path.startsWith("/plans/") ||
    path === "/info" ||
    path.startsWith("/info/")
  ) {
    return "plans";
  }
  return "you";
}

export function HomeDock() {
  const router = useRouter();
  const pathname = usePathname() || "/";
  const reduce = useReducedMotion() === true;
  const lock = useRef(false);
  const routeActive = routeSlot(pathname);
  const [hold, setHold] = useState<SlotId | null>(null);
  const [sheet, setSheet] = useState<{ templateId: string; templateName: string } | null>(null);
  const active: SlotId = hold ?? routeActive;

  useEffect(() => {
    setHold(null);
    setSheet(null);
    lock.current = false;
  }, [pathname]);

  function returningTemplate() {
    const history = loadHistory();
    const prefs = loadPrefs();
    return (
      (history[0]?.templateId && getTemplate(history[0].templateId)) ||
      (prefs.lastTemplateId && getTemplate(prefs.lastTemplateId)) ||
      getTemplate(DEFAULT_TEMPLATE_ROUTE)
    );
  }

  function startTemplate(templateId: string) {
    if (lock.current) return;
    const template = getTemplate(templateId) || getTemplate(DEFAULT_TEMPLATE_ROUTE);
    if (!template) return;
    lock.current = true;
    const prefs = loadPrefs();
    const session = createSession(template, prefs.unit);
    saveActive(session);
    savePrefs({ ...prefs, lastTemplateId: template.id });
    setSheet(null);
    router.push("/session");
  }

  function train() {
    if (lock.current) return;
    if (loadActive()) {
      lock.current = true;
      setSheet(null);
      router.push("/session");
      return;
    }
    if (loadHistory().length > 0) {
      const template = returningTemplate();
      if (!template) return;
      setSheet({ templateId: template.id, templateName: template.name });
      return;
    }
    const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
    if (path === "/" || path === "/plans") return;
    lock.current = true;
    router.push("/plans");
  }

  function press(id: SlotId, event: PointerEvent<HTMLElement>) {
    if (event.button !== 0) return;
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      /* Some browsers reject capture during a cancelled gesture. */
    }
    setHold(id);
  }

  function release(event: PointerEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const inside =
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom;
    if (!inside) setHold(null);
  }

  const slotProps = {
    reduce,
    onPointerUp: release,
    onPointerCancel: () => setHold(null),
  };
  return (
    <>
      <div className="dock-anchor dock-anchor--side">
      <nav className="dock" aria-label="Home" data-active={routeActive}>
        <DockSlot
          {...slotProps}
          id="train"
          label="Train"
          active={active === "train"}
          current={false}
          onPointerDown={(event) => press("train", event)}
          onClick={train}
          icon={<BoltIcon />}
        />
        <DockSlot
          {...slotProps}
          id="plans"
          label="Plans"
          href="/plans"
          active={active === "plans"}
          current={routeActive === "plans"}
          onPointerDown={(event) => press("plans", event)}
          icon={<CalendarIcon />}
        />
        <DockSlot
          {...slotProps}
          id="you"
          label="You"
          href="/you"
          active={active === "you"}
          current={routeActive === "you"}
          onPointerDown={(event) => press("you", event)}
          icon={<PersonIcon />}
        />
        </nav>
      </div>
      {sheet ? (
        <TrainSheet
          templateName={sheet.templateName}
          onClose={() => setSheet(null)}
          onPickPlan={() => {
            setSheet(null);
            router.push("/plans");
          }}
          onStart={() => startTemplate(sheet.templateId)}
        />
      ) : null}
    </>
  );
}

function DockSlot({
  id,
  label,
  href,
  active,
  current,
  reduce,
  icon,
  onPointerDown,
  onPointerUp,
  onPointerCancel,
  onClick,
}: {
  id: SlotId;
  label: string;
  href?: string;
  active: boolean;
  current: boolean;
  reduce: boolean;
  icon: ReactNode;
  onPointerDown: (event: PointerEvent<HTMLElement>) => void;
  onPointerUp: (event: PointerEvent<HTMLElement>) => void;
  onPointerCancel: () => void;
  onClick?: () => void;
}) {
  const body = (
    <>
      {active ? (
        <motion.span
          layoutId="structr-dock-selection"
          className="dock__selection"
          style={{ borderRadius: 9999 }}
          initial={false}
          transition={reduce ? { duration: 0 } : SELECTION_SPRING}
        >
          <span className="dock__selection-face" />
        </motion.span>
      ) : null}
      <span className="dock__content">
        <span className="dock__icon">{icon}</span>
        <span className="dock__label">{label}</span>
      </span>
    </>
  );

  if (href) {
    return (
      <Link
        className="dock__btn"
        href={href}
        aria-label={label}
        aria-current={current ? "page" : undefined}
        data-slot={id}
        data-selected={active ? "true" : "false"}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
      >
        {body}
      </Link>
    );
  }

  return (
    <button
      className="dock__btn"
      type="button"
      aria-label={label}
      data-slot={id}
      data-selected={active ? "true" : "false"}
      onClick={onClick}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
    >
      {body}
    </button>
  );
}
