import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title:
    "LD Biro - Stručno Knjigovodstvo & Finansijske Usluge | 30+ godina iskustva",
  description:
    "Stručne usluge knjigovodstva, poresko planiranje i finansijsko savetovanje za preduzeća i poljoprivredna gazdinstva. Senior stručnjaci sa 30+ godina iskustva.",
  keywords: [
    "knjigovodstvo",
    "poresko planiranje",
    "finansijsko savetovanje",
    "obračun zarada",
    "osnivanje preduzeća",
    "revizija",
    "poljoprivredna gazdinstva",
    "MSP",
    "Sombor",
    "Srbija",
  ],
  authors: [{ name: "LD Biro" }],
  openGraph: {
    title:
      "LD Biro - Stručno Knjigovodstvo & Finansijske Usluge | 30+ godina iskustva",
    description:
      "Stručne usluge knjigovodstva, poresko planiranje i finansijsko savetovanje za preduzeća i poljoprivredna gazdinstva. Senior stručnjaci sa 30+ godina iskustva.",
    type: "website",
    locale: "sr_RS",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "LD Biro - Stručno Knjigovodstvo & Finansijske Usluge | 30+ godina iskustva",
    description:
      "Stručne usluge knjigovodstva, poresko planiranje i finansijsko savetovanje za preduzeća i poljoprivredna gazdinstva. Senior stručnjaci sa 30+ godina iskustva.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sr" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
