import type { Metadata } from "next";
import { KettlebellInfo } from "@/components/KettlebellInfo";

export const metadata: Metadata = {
  title: "Kettlebell",
  description: "Kettlebell skill practice. Three paths. Five phases.",
};

export default function KettlebellInfoPage() {
  return <KettlebellInfo />;
}
