import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DOU CodeLab",
  description: "DOU MYO öğrencileri için evden erişilebilen interaktif yazılım öğrenme laboratuvarı.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
