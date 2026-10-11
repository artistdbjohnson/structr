import { redirect } from "next/navigation";

/** Plans catalog merged into Train. Old links land on Train. */
export default function PlansPage() {
  redirect("/train");
}
