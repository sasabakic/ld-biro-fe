import Head from "next/head";
import { Locale } from "../i18n";

interface MetaDataProps {
  locale: Locale;
}

// Base URL for your site - update this for production
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://ldbiro.rs";

const titles: Record<Locale, string> = {
  sr: "LD Biro - Stručno Knjigovodstvo & Finansijske Usluge | 30+ godina iskustva",
  en: "LD Biro - Professional Bookkeeping & Financial Services | 30+ years experience",
};

const descriptions: Record<Locale, string> = {
  sr: "Stručne usluge knjigovodstva, poresko planiranje i finansijsko savetovanje za preduzeća i poljoprivredna gazdinstva. Senior stručnjaci sa 30+ godina iskustva.",
  en: "Professional bookkeeping services, tax planning and financial consulting for businesses and agricultural farms. Senior experts with 30+ years of experience.",
};

const keywords = [
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
].join(", ");

export default function MetaData({ locale }: MetaDataProps) {
  const title = titles[locale];
  const description = descriptions[locale];
  const canonicalUrl = locale === "sr" ? BASE_URL : `${BASE_URL}/en`;
  const ogLocale = locale === "sr" ? "sr_RS" : "en_US";

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="LD Biro" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Canonical and Language Alternates */}
      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" hrefLang="sr" href={BASE_URL} />
      <link rel="alternate" hrefLang="en" href={`${BASE_URL}/en`} />
      <link rel="alternate" hrefLang="x-default" href={BASE_URL} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:locale" content={ogLocale} />
      <meta
        property="og:locale:alternate"
        content={locale === "sr" ? "en_US" : "sr_RS"}
      />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      {/* Robots */}
      <meta name="robots" content="index, follow" />

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
