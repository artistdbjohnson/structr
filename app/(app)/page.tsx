import type { Metadata } from "next";
import { TrainFor } from "@/components/TrainFor";
import { resolveTrainChip } from "@/lib/taxonomy";

export const metadata: Metadata = { title: "Train for" };

/** Cold load opens the Train for tray over the wallpaper. Dismiss leaves the dock. */
export default function HomePage() {
  return <TrainFor chip={resolveTrainChip(null)} />;
}
