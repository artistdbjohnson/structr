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
import { motion, useReducedMotion } from "motion/react";
import { isTrainHome } from "@/lib/nav";
import { createSession } from "@/lib/session";
import { loadActive, loadHistory, loadPrefs, saveActive, savePrefs } from "@/lib/storage";
import { getTemplate } from "@/lib/templates";
import { DEFAULT_TEMPLATE_ROUTE } from "@/lib/taxonomy";
import { BoltIcon, CalendarIcon, PersonIcon } from "./icons";
import { TrainSheet } from "./TrainSheet";
import { useTapGuard } from "./useTapGuard";

/** Y-only glide. Overdamped so the disc settles without bounce or size morph. */
const SELECTION_SPRING = {
  type: "spring" as const,
  stiffness: 420,
  damping: 42,
  mass: 0.8,
};

type SlotId = "train" | "plans" | "you";
type SlotBox = { x: number; y: number; size: number };

function measureSlot(nav: HTMLElement, id: SlotId): SlotBox | null {
  const slot = nav.querySelector<HTMLElement>(`[data-slot="${id}"]`);
  if (!slot) return null;
  const size = slot.offsetWidth;
  if (size <= 0) return null;
  return { x: slot.offsetLeft, y: slot.offsetTop, size };
}

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

export function HomeDock({
  trayOpen,
  onOpenTray,
  onCloseTray,
}: {
  trayOpen: boolean;
  onOpenTray: () => void;
  onCloseTray: () => void;
}) {
  const router = useRouter();
  const pathname = usePathname() || "/";
  const reduce = useReducedMotion() === true;
  const lock = useRef(false);
  const tap = useTapGuard();
  const marginTap = useTapGuard();
  const routeActive = routeSlot(pathname);
  const [hold, setHold] = useState<SlotId | null>(null);
  const [sheet, setSheet] = useState<{ templateId: string; templateName: string } | null>(null);
  const active: SlotId = hold ?? routeActive;
  const navRef = useRef<HTMLElement>(null);
  const [box, setBox] = useState<SlotBox | null>(null);

  useLayoutEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const measure = () => {
      const next = measureSlot(nav, active);
      setBox((prev) => {
        if (!next) return prev;
        if (prev && prev.x === next.x && prev.y === next.y && prev.size === next.size) return prev;
        return next;
      });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(nav);
    for (const slot of nav.querySelectorAll<HTMLElement>("[data-slot]")) observer.observe(slot);
    return () => observer.disconnect();
  }, [active, trayOpen, pathname]);

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
    if (tap.consumeIfMoved()) return;
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
    onOpenTray();
    if (!isTrainHome(pathname)) {
      lock.current = true;
      router.push("/plans");
    }
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
  // Wallpaper home keeps the pill centered. An open tray, and every other page, parks it on the right.
  const parkDock = trayOpen || !isTrainHome(pathname);
  return (
    <>
      <div className={parkDock ? "dock-anchor dock-anchor--side" : "dock-anchor"}>
        {trayOpen ? (
          <button
            type="button"
            className="dock-margin"
            aria-label="Close Train for"
            tabIndex={-1}
            data-dock-margin="true"
            onPointerDown={marginTap.onPointerDown}
            onPointerMove={marginTap.onPointerMove}
            onClick={() => {
              if (marginTap.consumeIfMoved()) return;
              onCloseTray();
            }}
          />
        ) : null}
      <nav ref={navRef} className="dock" aria-label="Home" data-active={routeActive}>
        {box ? (
          <motion.span
            className="dock__selection"
            data-pressed={hold ? "true" : "false"}
            aria-hidden="true"
            layout={false}
            initial={false}
            animate={{ y: box.y, scaleX: 1, scaleY: 1 }}
            style={
              {
                "--disc-size": `${box.size}px`,
                "--disc-x": `${box.x}px`,
              } as CSSProperties
            }
            transition={
              reduce
                ? { duration: 0 }
                : { y: SELECTION_SPRING, scaleX: { duration: 0 }, scaleY: { duration: 0 } }
            }
          >
            <span className="dock__selection-face" />
          </motion.span>
        ) : null}
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
          onClick={(event) => {
            if (tap.consumeIfMoved()) {
              event.preventDefault();
              return;
            }
            onOpenTray();
          }}
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
          onClick={(event) => {
            if (tap.consumeIfMoved()) event.preventDefault();
          }}
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
            onOpenTray();
            if (!isTrainHome(pathname)) router.push("/plans");
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
      {icon}
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
