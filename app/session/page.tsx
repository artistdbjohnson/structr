import type { Metadata } from "next";
import { SessionScreen } from "@/components/SessionScreen";

export const metadata: Metadata = { title: "Session" };

export default function SessionPage() {
  return <SessionScreen />;
}
