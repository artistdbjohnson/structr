import type { Metadata } from "next";
import { TrainFor } from "@/components/TrainFor";
import { resolveTrainChip } from "@/lib/taxonomy";

export const metadata: Metadata = { title: "Train for" };

/** Cold load is wallpaper and the centered dock. Plans opens the Train for tray. */
export default function HomePage() {
  return <TrainFor chip={resolveTrainChip(null)} />;
}
