import type { Metadata } from "next";
import { TrainFor } from "@/components/TrainFor";
import { resolveTrainChip } from "@/lib/taxonomy";

export const metadata: Metadata = { title: "Train for" };

export default async function TrainPage({
  searchParams,
}: {
  searchParams: Promise<{ for?: string | string[] }>;
}) {
  const params = await searchParams;
  const raw = Array.isArray(params.for) ? params.for[0] : params.for;
  return <TrainFor chip={resolveTrainChip(raw)} />;
}
