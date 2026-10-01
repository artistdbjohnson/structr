"use client";

import type { ReactNode } from "react";
import { HomeDock } from "./HomeDock";

export function AppChrome({ children }: { children: ReactNode }) {
  return (
    <div className="shell shell--sub">
      {children}
      <HomeDock />
    </div>
  );
}
