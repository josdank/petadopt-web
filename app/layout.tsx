import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LJL – CoLive",
  description: "Plataforma segura y profesional para convivencia compartida.",
  applicationName: "LJL – CoLive",
  themeColor: "#0B1220",
  manifest: "/manifest.webmanifest",

  // Esto ayuda, pero lo que manda de verdad es app/icon.png
  icons: {
    icon: [
      { url: "/brand/Logo_app.png", type: "image/png" },
    ],
    apple: [
      { url: "/brand/Logo_app.png", type: "image/png" },
    ],
    shortcut: [
      { url: "/brand/Logo_app.png", type: "image/png" },
    ],
  },

  openGraph: {
    title: "LJL – CoLive",
    description: "Plataforma segura y profesional para convivencia compartida.",
    type: "website",
    images: [
      {
        url: "/brand/Logo_app.png",
        width: 512,
        height: 512,
        alt: "LJL – CoLive",
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
