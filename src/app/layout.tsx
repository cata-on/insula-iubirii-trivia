import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Insula Iubirii 2025 - Participanți și Informații",
  description:
    "Descoperă toți participanții din sezonul 9 al Insula Iubirii 2025. Informații complete despre ispitele feminine și masculine, cuplurile participante și toate detaliile despre show-ul cel mai așteptat al anului.",
  keywords:
    "insula iubirii 2025, participanți, ispite feminine, ispite masculine, cupluri, reality show, antena 1",
  authors: [{ name: "Insula Iubirii Fan Site" }],
  robots: "index, follow",
  openGraph: {
    title: "Insula Iubirii 2025 - Participanți și Informații",
    description:
      "Descoperă toți participanții din sezonul 9 al Insula Iubirii 2025",
    type: "website",
    locale: "ro_RO",
  },
  twitter: {
    card: "summary_large_image",
    title: "Insula Iubirii 2025 - Participanți și Informații",
    description:
      "Descoperă toți participanții din sezonul 9 al Insula Iubirii 2025",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro">
      <body>{children}</body>
    </html>
  );
}
