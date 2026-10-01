import type { Metadata, Viewport } from "next";
import { RegisterSw } from "@/components/register-sw";
import "./globals.css";

export const metadata: Metadata = {
  title: "Structr",
  description: "Structr home",
  applicationName: "Structr",
  appleWebApp: {
    capable: true,
    title: "Structr",
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <RegisterSw />
      </body>
    </html>
  );
}
