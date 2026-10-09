"use client";

import { useCallback, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { isTrainSheet } from "@/lib/nav";
import { HomeDock } from "./HomeDock";
import { TrainTray } from "./TrainTray";

export function AppChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const trainSheet = isTrainSheet(pathname);
  const coldHome = !trainSheet && dockIsCold(pathname);

  const closeTrain = useCallback(() => {
    router.push("/");
  }, [router]);

  return (
    <div className="shell shell--sub" data-tray={trainSheet ? "open" : "closed"}>
      {trainSheet ? (
        <TrainTray open onClose={closeTrain}>
          {children}
        </TrainTray>
      ) : coldHome ? (
        <main className="home-stage">
          <h1 className="sr-only">Structr</h1>
        </main>
      ) : (
        children
      )}
      <HomeDock />
    </div>
  );
}

function dockIsCold(pathname: string): boolean {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  return path === "/";
}
