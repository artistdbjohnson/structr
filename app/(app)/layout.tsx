import type { ReactNode } from "react";
import { AppChrome } from "@/components/AppChrome";

/**
 * Home, Train, Plans, and You share one dock instance so the selection disc
 * can glide between slots as the route changes. Session routes live outside
 * this group, so the dock unmounts there and the last tab is restored on exit.
 */
export default function HomeChromeLayout({ children }: { children: ReactNode }) {
  return <AppChrome>{children}</AppChrome>;
}
