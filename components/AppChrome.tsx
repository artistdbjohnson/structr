"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { HomeDock } from "./HomeDock";

export function AppChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname() || "/";
  const home = pathname === "/";
  return (
    <div className={home ? "shell" : "shell shell--sub"}>
      {children}
      <HomeDock />
    </div>
  );
}
