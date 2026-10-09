"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
  type ReactNode,
} from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { dockTab, isTrainSheet, rememberDockTab } from "@/lib/nav";
import { createSession, templateForSession } from "@/lib/session";
import { learnedPlan, loadActive, loadHistory, loadPrefs, saveActive, savePrefs } from "@/lib/storage";
import { getTemplate } from "@/lib/templates";
import { DEFAULT_TEMPLATE_ROUTE } from "@/lib/taxonomy";
import { BoltIcon, CalendarIcon, PersonIcon } from "./icons";
import { LogoMarkButton } from "./LogoMarkButton";
import logoStyles from "./logo.module.css";
import { TrainSheet } from "./TrainSheet";
import { useTapGuard } from "./useTapGuard";

type SlotId = "train" | "plans" | "you";
type SlotBox = { x: number; y: number; size: number };

/**
 * One diameter for every slot: the dock's content box, not each button's
 * offsetWidth. A spring on y was still stretching the disc (motion couples
 * that axis to scale). Position is applied as a translate only.
 */
function measureSlot(nav: HTMLElement, id: SlotId): SlotBox | null {
  const slot = nav.querySelector<HTMLElement>(`[data-slot="${id}"]`);
  if (!slot) return null;
  const style = getComputedStyle(nav);
  const padL = Number.parseFloat(style.paddingLeft) || 0;
  const padR = Number.parseFloat(style.paddingRight) || 0;
  const size = Math.round(nav.clientWidth - padL - padR);
  if (size <= 0) return null;
  const y = Math.round(slot.offsetTop + (slot.offsetHeight - size) / 2);
  return { x: Math.round(padL), y, size };
}

function normalize(pathname: string): string {
  return pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
}

export function HomeDock() {
  const router = useRouter();
  const pathname = usePathname() || "/";
  const lock = useRef(false);
  const tap = useTapGuard();
  const marginTap = useTapGuard();
  const path = normalize(pathname);
  const tab = dockTab(path);
  const [hold, setHold] = useState<SlotId | null>(null);
  const [sheet, setSheet] = useState<{ templateId: string; templateName: string } | null>(null);
  const active: SlotId | null = hold ?? tab;
  const navRef = useRef<HTMLElement>(null);
  const [box, setBox] = useState<SlotBox | null>(null);

  useLayoutEffect(() => {
    const nav = navRef.current;
    if (!nav || !active) {
      setBox(null);
      return;
    }
    const slot = active;
    const measure = () => {
      const next = measureSlot(nav, slot);
      setBox((prev) => {
        if (!next) return null;
        if (prev && prev.x === next.x && prev.y === next.y && prev.size === next.size) return prev;
        return next;
      });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(nav);
    return () => observer.disconnect();
  }, [active, pathname]);

  useEffect(() => {
    setHold(null);
    setSheet(null);
    lock.current = false;
    if (tab) rememberDockTab(tab);
  }, [pathname, tab]);

  function findTemplate(templateId: string) {
    return (
      getTemplate(templateId) ??
      learnedPlan(templateId) ??
      loadHistory().find((item) => item.templateId === templateId)?.templateSnapshot
    );
  }

  function returningTemplate() {
    const history = loadHistory();
    const prefs = loadPrefs();
    const recent = history[0] ? templateForSession(history[0]) : undefined;
    return recent || (prefs.lastTemplateId && findTemplate(prefs.lastTemplateId)) || getTemplate(DEFAULT_TEMPLATE_ROUTE);
  }

  function startTemplate(templateId: string) {
    if (lock.current) return;
    const template = findTemplate(templateId) || getTemplate(DEFAULT_TEMPLATE_ROUTE);
    if (!template) return;
    lock.current = true;
    const prefs = loadPrefs();
    const session = createSession(template, prefs.unit);
    saveActive(session);
    savePrefs({ ...prefs, lastTemplateId: template.id });
    setSheet(null);
    rememberDockTab("train");
    router.push("/session");
  }

  function train() {
    if (lock.current) return;
    if (tap.consumeIfMoved()) {
      setHold(null);
      return;
    }
    if (loadActive()) {
      lock.current = true;
      setSheet(null);
      rememberDockTab("train");
      router.push("/session");
      return;
    }
    if (loadHistory().length > 0) {
      const template = returningTemplate();
      if (!template) return;
      setHold(null);
      setSheet({ templateId: template.id, templateName: template.name });
      return;
    }
    if (path !== "/train") {
      lock.current = true;
      router.push("/train");
      return;
    }
    setHold(null);
  }

  function press(id: SlotId, event: PointerEvent<HTMLElement>) {
    if (event.button !== 0) return;
    // Do not capture the pointer. Capture turned a scroll beside the pill into a Train click,
    // which resumed Warm-up. Movement past a few pixels is ignored instead.
    tap.onPointerDown(event);
    setHold(id);
  }

  function release(event: PointerEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const inside =
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom;
    if (!inside) {
      tap.suppress();
      setHold(null);
    }
  }

  const slotProps = {
    onPointerMove: tap.onPointerMove,
    onPointerUp: release,
    onPointerCancel: () => {
      tap.suppress();
      setHold(null);
    },
    onPointerLeave: () => setHold(null),
  };
  // Wallpaper home keeps the pill centered. A sheet, and every other page, parks it on the right.
  const trainSheet = isTrainSheet(path);
  const parkDock = trainSheet || path !== "/";
  // Empty column above and below the pill. You already returns home this way; Plans does too.
  const gutterDismiss = path === "/you" || path === "/plans";

  function goHome() {
    if (marginTap.consumeIfMoved()) return;
    if (lock.current) return;
    lock.current = true;
    router.push("/");
  }

  const gutterProps = {
    type: "button" as const,
    className: "dock-gutter",
    "aria-label": path === "/plans" ? "Close Plans" : "Close You",
    tabIndex: -1,
    onPointerDown: marginTap.onPointerDown,
    onPointerMove: marginTap.onPointerMove,
    onClick: goHome,
  };

  return (
    <>
      <div
        className={
          gutterDismiss
            ? "dock-anchor dock-anchor--side dock-anchor--you"
            : parkDock
              ? "dock-anchor dock-anchor--side"
              : "dock-anchor"
        }
      >
        {gutterDismiss ? <button {...gutterProps} data-dock-gutter="above" /> : null}
        {trainSheet ? (
          <button
            type="button"
            className="dock-margin"
            aria-label="Close Train for"
            tabIndex={-1}
            data-dock-margin="true"
            onPointerDown={marginTap.onPointerDown}
            onPointerMove={marginTap.onPointerMove}
            onClick={goHome}
          />
        ) : null}
      <nav ref={navRef} className="dock" aria-label="Home" data-active={tab ?? "none"}>
        <LogoMarkButton
          variant="reversed"
          size={44}
          className={logoStyles.dockMark}
          label="Structr"
          onClick={() => {
            if (path === "/") return;
            if (lock.current) return;
            lock.current = true;
            router.push("/");
          }}
        />
        {box && active ? (
          <span
            className="dock__selection"
            aria-hidden="true"
            style={
              {
                "--disc-size": `${box.size}px`,
                "--disc-x": `${box.x}px`,
                "--disc-y": `${box.y}px`,
              } as CSSProperties
            }
          >
            <span className="dock__selection-face" />
          </span>
        ) : null}
        <DockSlot
          {...slotProps}
          id="train"
          label="Train"
          active={active === "train"}
          current={tab === "train"}
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
          current={tab === "plans"}
          onPointerDown={(event) => press("plans", event)}
          onClick={(event) => {
            if (tap.consumeIfMoved()) {
              event.preventDefault();
              setHold(null);
            }
          }}
          icon={<CalendarIcon />}
        />
        <DockSlot
          {...slotProps}
          id="you"
          label="You"
          href="/you"
          active={active === "you"}
          current={tab === "you"}
          onPointerDown={(event) => press("you", event)}
          onClick={(event) => {
            if (tap.consumeIfMoved()) {
              event.preventDefault();
              setHold(null);
            }
          }}
          icon={<PersonIcon />}
        />
        </nav>
        {gutterDismiss ? <button {...gutterProps} data-dock-gutter="below" /> : null}
      </div>
      {sheet ? (
        <TrainSheet
          templateName={sheet.templateName}
          onClose={() => setSheet(null)}
          onPickPlan={() => {
            setSheet(null);
            router.push("/train");
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
  icon,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onPointerCancel,
  onPointerLeave,
  onClick,
}: {
  id: SlotId;
  label: string;
  href?: string;
  active: boolean;
  current: boolean;
  icon: ReactNode;
  onPointerDown: (event: PointerEvent<HTMLElement>) => void;
  onPointerMove: (event: PointerEvent<HTMLElement>) => void;
  onPointerUp: (event: PointerEvent<HTMLElement>) => void;
  onPointerCancel: () => void;
  onPointerLeave: () => void;
  onClick?: (event: { preventDefault(): void }) => void;
}) {
  const body = (
    <span className="dock__content">
      <span className="dock__icon">{icon}</span>
      <span className="dock__label">{label}</span>
    </span>
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
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        onPointerLeave={onPointerLeave}
        onClick={onClick}
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
      aria-current={current ? "page" : undefined}
      data-slot={id}
      data-selected={active ? "true" : "false"}
      onClick={onClick}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
      onPointerLeave={onPointerLeave}
    >
      {body}
    </button>
  );
}
