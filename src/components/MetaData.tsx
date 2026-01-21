import Head from "next/head";
import { Locale } from "../i18n";

interface MetaDataProps {
  locale: Locale;
}

// Base URL for your site - update this for production
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://ldbiro.rs";

// OG Image - create a 1200x630px image and place in public/og-image.png
const OG_IMAGE = `${BASE_URL}/ld-og-image.png`;

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

// JSON-LD Structured Data
function getStructuredData(locale: Locale, canonicalUrl: string) {
  const isSerbian = locale === "sr";

  // LocalBusiness schema for the accounting firm
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    "@id": `${BASE_URL}/#organization`,
    name: "LD Biro",
    alternateName: "LD BIRO DOO SOMBOR",
    description: descriptions[locale],
    url: canonicalUrl,
    logo: `${BASE_URL}/ld-logo.png`,
    image: OG_IMAGE,
    telephone: "+381637587089",
    email: "biro.ld.sombor@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rade Končara 10",
      addressLocality: "Sombor",
      postalCode: "25000",
      addressCountry: "RS",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 45.7747,
      longitude: 19.1128,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "16:00",
      },
    ],
    priceRange: "$$",
    currenciesAccepted: "RSD, EUR",
    paymentAccepted: "Cash, Bank Transfer",
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 45.7747,
        longitude: 19.1128,
      },
      geoRadius: "100000",
    },
    serviceType: isSerbian
      ? [
          "Knjigovodstvo",
          "Računovodstvo",
          "Poresko planiranje",
          "Finansijsko savetovanje",
          "Obračun zarada",
          "Osnivanje preduzeća",
        ]
      : [
          "Bookkeeping",
          "Accounting",
          "Tax Planning",
          "Financial Consulting",
          "Payroll Processing",
          "Company Formation",
        ],
    founder: {
      "@type": "Person",
      name: "Lidija Vojkić",
    },
    foundingDate: "2022-01-14",
    taxID: "112845655",
    legalName: "LD BIRO DOO SOMBOR",
    sameAs: [],
  };

  // WebSite schema
  const webSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    url: BASE_URL,
    name: "LD Biro",
    description: descriptions[locale],
    publisher: {
      "@id": `${BASE_URL}/#organization`,
    },
    inLanguage: [
      {
        "@type": "Language",
        name: "Serbian",
        alternateName: "sr",
      },
      {
        "@type": "Language",
        name: "English",
        alternateName: "en",
      },
    ],
  };

  // BreadcrumbList schema
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: isSerbian ? "Početna" : "Home",
        item: canonicalUrl,
      },
    ],
  };

  return [localBusiness, webSite, breadcrumb];
}

export default function MetaData({ locale }: MetaDataProps) {
  const title = titles[locale];
  const description = descriptions[locale];
  const canonicalUrl = locale === "sr" ? BASE_URL : `${BASE_URL}/en`;
  const ogLocale = locale === "sr" ? "sr_RS" : "en_US";
  const structuredData = getStructuredData(locale, canonicalUrl);

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
      <meta property="og:site_name" content="LD Biro" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="LD Biro - Knjigovodstvo & Finansije" />
      <meta property="og:locale" content={ogLocale} />
      <meta
        property="og:locale:alternate"
        content={locale === "sr" ? "en_US" : "sr_RS"}
      />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE} />
      <meta name="twitter:image:alt" content="LD Biro - Knjigovodstvo & Finansije" />

      {/* Robots */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1" />

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/ld-logo.png" />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
    </Head>
  );
}
