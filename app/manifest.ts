import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Structr",
    short_name: "Structr",
    description: "Kettlebell practice you can follow, one session at a time.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#e6e8ec",
    theme_color: "#e6e8ec",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
