"use client";

import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import { createSession } from "@/lib/session";
import { loadActive, loadPrefs, saveActive, savePrefs } from "@/lib/storage";
import { getTemplate } from "@/lib/templates";
import { BoltIcon, CalendarIcon, PersonIcon } from "./icons";

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
  if (path === "/plans" || path.startsWith("/plans/")) return "plans";
  return "you";
}

export function HomeDock() {
  const router = useRouter();
  const pathname = usePathname() || "/";
  const reduce = useReducedMotion() === true;
  const lock = useRef(false);
  const routeActive = routeSlot(pathname);
  const [hold, setHold] = useState<SlotId | null>(null);
  const active: SlotId = hold ?? routeActive;

  useEffect(() => {
    setHold(null);
  }, [pathname]);

  function train() {
    if (lock.current) return;
    lock.current = true;
    const activeSession = loadActive();
    if (activeSession) {
      router.push("/session");
      return;
    }
    const prefs = loadPrefs();
    const template =
      (prefs.lastTemplateId && getTemplate(prefs.lastTemplateId)) || getTemplate("swing-foundation");
    if (!template) {
      lock.current = false;
      setHold(null);
      return;
    }
    const session = createSession(template, prefs.unit);
    saveActive(session);
    savePrefs({ ...prefs, lastTemplateId: template.id });
    router.push("/session");
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
    <motion.div className="dock-anchor" layoutRoot>
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
    </motion.div>
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
      onClick={onClick}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
    >
      {body}
    </button>
  );
}
