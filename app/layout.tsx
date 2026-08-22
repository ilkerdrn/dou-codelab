import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DOU CodeLab",
  description:
    "DOU MYO öğrencileri için evden erişilebilen interaktif yazılım öğrenme laboratuvarı.",
  applicationName: "DOU CodeLab",
  keywords: [
    "Doğuş Üniversitesi",
    "yazılım eğitimi",
    "kod laboratuvarı",
    "öğrenme patikaları",
  ],
  openGraph: {
    title: "DOU CodeLab",
    description:
      "Ders, pratik, proje ve gelişimi bir araya getiren interaktif yazılım öğrenme ortamı.",
    type: "website",
  },
  robots: { index: true, follow: true },
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
