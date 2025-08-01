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
    "računovodstvo",
    "knjigovodstvo Sombor",
    "računovodstvo Sombor",
    "knjigovodstvena agencija",
    "računovodstvena agencija",
    "knjigovodstvena agencija Sombor",
    "računovodstvena agencija Sombor",
    "knjigovodstvene usluge",
    "računovodstvene usluge",
    "poresko planiranje",
    "finansijsko savetovanje",
    "obračun zarada",
    "osnivanje preduzeća",
    "revizija",
    "poljoprivredna gazdinstva",
    "MSP",
    "Sombor",
    "Srbija",
    "Vojvodina",
    "Bačka",
    "Zapadna Bačka",
    "poreske prijave",
    "PDV prijave",
    "godišnji finansijski izveštaj",
    "knjige evidencije",
    "glavna knjiga",
    "pomoćne knjige",
    "dugotrajni finansijski izveštaj",
    "bilans stanja",
    "bilans uspеha",
    "izveštaj o tokovima gotovine",
    "napomene uz finansijske izveštaje",
    "porez na dobit",
    "lični dohodak",
    "doprinosi",
    "paušalni porez",
    "preduzetnik",
    "d.o.o.",
    "a.d.",
    "zadruga",
    "javno preduzeće",
    "ustanova",
    "ortačko društvo",
    "komanditno društvo",
    "gazdinstvo",
    "poljoprivredna subvencija",
    "IPARD podrška",
    "ruralni razvoj",
    "sertifikovani računovođa",
    "ovlašćeni računovođa",
    "stručni ispit",
    "komora računovođa",
    "knjigovodstvo i revizija",
    "finansijske analize",
    "poslovni plan",
    "kontroling",
    "interni audit",
    "eksterni audit",
    "due diligence",
    "procena vrednosti",
    "likvidacija",
    "stečaj",
    "restrukturiranje",
    "reorganizacija",
    "pripajanje",
    "spajanje",
    "podela",
    "izdvajanje",
    "statusne promene",
    "transfer delatnosti",
    "IFRS standardi",
    "računovodstveni standardi",
    "МРС стандарди",
    "МСФИ стандарди",
    "zakon o računovodstvu",
    "zakon o reviziji",
    "poreska kontrola",
    "inspekcijska kontrola",
    "Poreska uprava",
    "APR",
    "RINO",
    "ePorez",
    "elektronske prijave",
    "digitalno poslovanje",
    "fiskalna kasa",
    "elektronski račun",
    "SEF faktora",
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
