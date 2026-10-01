import type { Metadata } from "next";
import { SummaryScreen } from "@/components/SummaryScreen";

export const metadata: Metadata = { title: "Summary" };

export default function CompletePage() {
  return <SummaryScreen />;
}
