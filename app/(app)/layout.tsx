import type { ReactNode } from "react";
import { HomeDock } from "@/components/HomeDock";

/**
 * Home, Plans, and You share one dock instance so the selection disc can
 * glide between slots as the route changes. Session routes live outside
 * this group, so the dock unmounts there.
 */
export default function HomeChromeLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <HomeDock />
    </>
  );
}
