import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { I18nProvider, Locale } from "../../i18n";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// Base URL for your site - update this for production
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://ldbiro.rs";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({
  params,
}: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;

  const titles = {
    sr: "LD Biro - Stručno Knjigovodstvo & Finansijske Usluge | 30+ godina iskustva",
    en: "LD Biro - Professional Bookkeeping & Financial Services | 30+ years experience",
  };

  const descriptions = {
    sr: "Stručne usluge knjigovodstva, poresko planiranje i finansijsko savetovanje za preduzeća i poljoprivredna gazdinstva. Senior stručnjaci sa 30+ godina iskustva.",
    en: "Professional bookkeeping services, tax planning and financial consulting for businesses and agricultural farms. Senior experts with 30+ years of experience.",
  };

  return {
    title: titles[locale],
    description: descriptions[locale],
    keywords: [
      "knjigovodstvo",
      "računovodstvo",
      "bookkeeping",
      "accounting",
      "knjigovodstvo Sombor",
      "računovodstvo Sombor",
      "knjigovodstvena agencija",
      "računovodstvena agencija",
      "knjigovodstvena agencija Sombor",
      "računovodstvena agencija Sombor",
      "knjigovodstvene usluge",
      "računovodstvene usluge",
      "poresko planiranje",
      "tax planning",
      "finansijsko savetovanje",
      "financial consulting",
      "obračun zarada",
      "payroll",
      "osnivanje preduzeća",
      "company formation",
      "revizija",
      "audit",
      "poljoprivredna gazdinstva",
      "agricultural farms",
      "MSP",
      "SME",
      "Sombor",
      "Srbija",
      "Serbia",
      "Vojvodina",
    ],
    authors: [{ name: "LD Biro" }],
    alternates: {
      canonical: locale === "sr" ? BASE_URL : `${BASE_URL}/en`,
      languages: {
        sr: BASE_URL,
        en: `${BASE_URL}/en`,
        "x-default": BASE_URL,
      },
    },
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      type: "website",
      locale: locale === "sr" ? "sr_RS" : "en_US",
      alternateLocale: locale === "sr" ? "en_US" : "sr_RS",
      url: locale === "sr" ? BASE_URL : `${BASE_URL}/en`,
    },
    twitter: {
      card: "summary_large_image",
      title: titles[locale],
      description: descriptions[locale],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  return (
    <html lang={locale} className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        <I18nProvider locale={locale}>{children}</I18nProvider>
      </body>
    </html>
  );
}
