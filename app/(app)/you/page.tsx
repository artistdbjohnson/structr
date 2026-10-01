import type { Metadata } from "next";
import { YouScreen } from "@/components/YouScreen";

export const metadata: Metadata = { title: "You" };

export default function YouPage() {
  return <YouScreen />;
}