"use client";

import { useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { isTrainHome } from "@/lib/nav";
import { HomeDock } from "./HomeDock";
import { HomeSplash } from "./HomeSplash";
import { TrainTray } from "./TrainTray";

export function AppChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname() || "/";
  // Closed is the lasting default. A hard load of / or /plans must not open Train for.
  const [dismissed, setDismissed] = useState(true);
  const trainHome = isTrainHome(pathname);
  const trayOpen = trainHome && !dismissed;

  function openTray() {
    setDismissed(false);
  }

  function closeTray() {
    setDismissed(true);
  }

  return (
    <div className="shell shell--sub" data-tray={trayOpen ? "open" : "closed"}>
      {trainHome ? (
        <div className="home" aria-hidden="true">
          <HomeSplash />
        </div>
      ) : null}
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
