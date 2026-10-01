import { notFound } from "next/navigation";
import { loadParsedBrief } from "@/lib/briefs";
import { infoEntry, resolveInfoSlug } from "@/lib/taxonomy";
import { BriefInfo } from "./BriefInfo";
import { KettlebellInfo } from "./KettlebellInfo";

export function InfoScreen({ slug }: { slug: string }) {
  const canonical = resolveInfoSlug(slug);
  const entry = canonical ? infoEntry(canonical) : undefined;
  if (!canonical || !entry) notFound();
  if (entry.kind === "kettlebell") return <KettlebellInfo />;

  const brief = loadParsedBrief(canonical);
  if (!brief) notFound();
  return <BriefInfo entry={entry} brief={brief} />;
}
