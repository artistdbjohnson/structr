import type { Metadata } from "next";
import { InfoScreen } from "@/components/InfoScreen";
import { infoEntry, infoStaticParams, resolveInfoSlug } from "@/lib/taxonomy";

export function generateStaticParams() {
  return infoStaticParams();
}

export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = infoEntry(resolveInfoSlug(slug) ?? "");
  return {
    title: entry?.title ?? "Info",
    description: entry?.promise,
  };
}

export default async function PlansModuleInfoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <InfoScreen slug={slug} />;
}
