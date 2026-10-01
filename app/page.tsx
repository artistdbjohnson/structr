import { HomeDock } from "@/components/home-dock";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="home" aria-label="Structr home">
      <Image
        src="/bg.jpg"
        alt=""
        fill
        priority
        unoptimized
        sizes="100vw"
        className="wallpaper"
      />
      <HomeDock />
    </main>
  );
}
