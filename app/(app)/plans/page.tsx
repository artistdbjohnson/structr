import type { Metadata } from "next";
import { PlansCalendar } from "@/components/PlansCalendar";

export const metadata: Metadata = { title: "Plans" };

export default function PlansPage() {
  return <PlansCalendar />;
}
