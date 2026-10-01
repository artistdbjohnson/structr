"use client";

import { useEffect, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { TrayCloseContext } from "./trayClose";
import { useTapGuard } from "./useTapGuard";
import styles from "./trainTray.module.css";

export function TrainTray({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}) {
  const reduce = useReducedMotion() === true;
  const backdropTap = useTapGuard();

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="train-tray"
          className={styles.root}
          data-train-tray="open"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }}
        >
          <motion.button
            type="button"
            className={styles.backdrop}
            aria-label="Close Train for"
            tabIndex={-1}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={reduce ? { duration: 0 } : { duration: 0.2 }}
            onPointerDown={backdropTap.onPointerDown}
            onPointerMove={backdropTap.onPointerMove}
            onClick={() => {
              if (backdropTap.consumeIfMoved()) return;
              onClose();
            }}
          />
          <motion.div
            className={styles.panel}
            role="dialog"
            aria-modal="false"
            aria-labelledby="train-for-title"
            initial={reduce ? { x: 0 } : { x: "-100%" }}
            animate={{ x: 0 }}
            exit={reduce ? { x: 0 } : { x: "-100%" }}
            transition={
              reduce
                ? { duration: 0 }
                : { type: "spring", stiffness: 420, damping: 40, mass: 0.85 }
            }
          >
            <TrayCloseContext.Provider value={onClose}>{children}</TrayCloseContext.Provider>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
