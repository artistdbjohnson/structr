"use client";

import { createContext, useContext } from "react";

/** Set while Train for is mounted in the left tray. Null on every other screen. */
export const TrayCloseContext = createContext<(() => void) | null>(null);

export function useTrayClose() {
  return useContext(TrayCloseContext);
}
