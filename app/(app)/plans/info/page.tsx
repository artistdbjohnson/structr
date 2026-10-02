import type { Metadata } from "next";
import { KettlebellInfo } from "@/components/KettlebellInfo";

export const metadata: Metadata = {
  title: "Kettlebell",
  description: "The swing, the clean, and the get-up.",
};

export default function KettlebellInfoPage() {
  return <KettlebellInfo />;
}
