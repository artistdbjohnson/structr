import type { Metadata, Viewport } from "next";
import { DesktopGate } from "@/components/DesktopGate";
import { RegisterSw } from "@/components/RegisterSw";
import { surfaceBootScript } from "@/lib/surfaceBoot";
import "./globals.css";
import "./gate.css";
import "../structr-glass/tokens.css";

export const metadata: Metadata = {
  title: {
    default: "Structr",
    template: "%s · Structr",
  },
  description: "Kettlebell practice you can follow, one session at a time.",
  applicationName: "Structr",
  appleWebApp: {
    capable: true,
    title: "Structr",
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script id="structr-boot" data-structr-keep="" dangerouslySetInnerHTML={{ __html: surfaceBootScript }} />
        <link rel="preconnect" href="https://exercise-dataset.com" />
      </head>
      <body suppressHydrationWarning>
        <DesktopGate />
        {children}
        <RegisterSw />
      </body>
    </html>
  );
}
