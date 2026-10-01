import type { Metadata } from "next";
import { TrainFor } from "@/components/TrainFor";
import { resolveTrainChip } from "@/lib/taxonomy";

export const metadata: Metadata = { title: "Train for" };

/** Cold load opens Train for. The wallpaper-only dock is no longer the entry. */
export default function HomePage() {
  return <TrainFor chip={resolveTrainChip(null)} />;
}
