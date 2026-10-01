import type { Metadata } from "next";
import { CatalogBrowse } from "@/components/CatalogBrowse";

export const metadata: Metadata = { title: "Browse" };

export default function BrowsePage() {
  return <CatalogBrowse />;
}
