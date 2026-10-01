"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { isTrainHome } from "@/lib/nav";
import { HomeDock } from "./HomeDock";
import { TrainTray } from "./TrainTray";

export function AppChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname() || "/";
  const [dismissed, setDismissed] = useState(false);
  const prevPath = useRef(pathname);
  const trainHome = isTrainHome(pathname);
  const trayOpen = trainHome && !dismissed;

  useEffect(() => {
    const before = prevPath.current;
    prevPath.current = pathname;
    if (isTrainHome(pathname) && !isTrainHome(before)) setDismissed(false);
  }, [pathname]);

  function openTray() {
    setDismissed(false);
  }

  function closeTray() {
    setDismissed(true);
  }

  return (
    <div className="shell shell--sub" data-tray={trayOpen ? "open" : "closed"}>
      {trainHome ? <div className="home" aria-hidden="true" /> : null}
      {trainHome ? (
        <>
          <TrainTray open={trayOpen} onClose={closeTray}>
            {children}
          </TrainTray>
          {trayOpen ? null : (
            <main className="home-stage">
              <h1 className="sr-only">Structr</h1>
            </main>
          )}
        </>
      ) : (
        children
      )}
      <HomeDock trayOpen={trayOpen} onOpenTray={openTray} onCloseTray={closeTray} />
    </div>
  );
}
