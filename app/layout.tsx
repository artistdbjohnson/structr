import type { Metadata, Viewport } from "next";
import { RegisterSw } from "@/components/RegisterSw";
import "./globals.css";
import "../structr-glass/tokens.css";

export const metadata: Metadata = {
  title: {
    default: "Structr",
    template: "%s · Structr",
  },
  description: "Structured kettlebell training sessions.",
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
    <html lang="en">
      <body>
        {children}
        <RegisterSw />
      </body>
    </html>
  );
}
