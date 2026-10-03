import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { CatalogBrowse } from "@/components/CatalogBrowse";

export const metadata: Metadata = { title: "Plans" };

export default async function PlansPage({
  searchParams,
}: {
  searchParams: Promise<{ for?: string | string[] }>;
}) {
  const params = await searchParams;
  const raw = Array.isArray(params.for) ? params.for[0] : params.for;
  if (raw) redirect(`/train?for=${encodeURIComponent(raw)}`);
  return <CatalogBrowse />;
}
