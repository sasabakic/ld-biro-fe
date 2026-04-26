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
  sr: "Knjigovodstvo i računovodstvo Sombor – LD Biro agencija",
  en: "Bookkeeping & Accounting Sombor – LD Biro Agency",
  ru: "Бухгалтерия и учёт Сомбор – агенция LD Biro",
};

const descriptions: Record<Locale, string> = {
  sr: "LD Biro – knjigovodstvena i računovodstvena agencija u Somboru. Stručni knjigovodstveni i računovodstveni poslovi, poresko planiranje i finansijsko savetovanje. 30+ godina iskustva.",
  en: "LD Biro – a bookkeeping and accounting agency in Sombor. Professional bookkeeping and accounting services, tax planning and financial consulting. 30+ years of experience.",
  ru: "LD Biro – бухгалтерская агенция в Сомборе. Профессиональные бухгалтерские и учётные услуги, налоговое планирование и финансовое консультирование. 30+ лет опыта.",
};

const keywords = [
  "knjigovodstvo",
  "računovodstvo",
  "knjigovodstveni poslovi",
  "računovodstveni poslovi",
  "knjigovodstveni i računovodstveni poslovi",
  "knjigovodstvo i računovodstvo",
  "knjigovodstvo Sombor",
  "računovodstvo Sombor",
  "knjigovodstvo i računovodstvo Sombor",
  "knjigovodstvena agencija",
  "računovodstvena agencija",
  "knjigovodstvena i računovodstvena agencija",
  "knjigovodstvena agencija Sombor",
  "računovodstvena agencija Sombor",
  "knjigovodstvene usluge",
  "računovodstvene usluge",
  "knjigovodstvene i računovodstvene usluge",
  "bookkeeping",
  "accounting",
  "bookkeeping and accounting",
  "bookkeeping Sombor",
  "accounting Sombor",
  "poresko planiranje",
  "tax planning",
  "finansijsko savetovanje",
  "financial consulting",
  "obračun zarada",
  "payroll",
  "osnivanje preduzeća",
  "company formation",
  "PDV prijave",
  "poreske prijave",
  "finansijski izveštaji",
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
  const isRussian = locale === "ru";

  const serviceTypes = isSerbian
    ? [
        "Knjigovodstvo",
        "Računovodstvo",
        "Poresko planiranje",
        "Finansijsko savetovanje",
        "Obračun zarada",
        "Osnivanje preduzeća",
        "Knjigovodstvo poljoprivrednih gazdinstava",
        "PDV i poreske prijave",
        "Finansijski izveštaji",
      ]
    : isRussian
      ? [
          "Бухгалтерский учёт",
          "Налоговое планирование",
          "Финансовое консультирование",
          "Расчёт заработной платы",
          "Регистрация предприятий",
          "Бухгалтерия для сельскохозяйственных хозяйств",
          "НДС и налоговые декларации",
          "Финансовая отчётность",
        ]
      : [
          "Bookkeeping",
          "Accounting",
          "Tax Planning",
          "Financial Consulting",
          "Payroll Processing",
          "Company Formation",
          "Bookkeeping for agricultural farms",
          "VAT and tax returns",
          "Financial reporting",
        ];

  // LocalBusiness schema for the accounting firm
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": ["AccountingService", "ProfessionalService", "LocalBusiness"],
    "@id": `${BASE_URL}/#organization`,
    name: "LD Biro",
    alternateName: ["LD BIRO DOO SOMBOR", "LD Biro Sombor"],
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
      addressRegion: "Vojvodina",
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
    areaServed: [
      { "@type": "City", name: "Sombor" },
      { "@type": "City", name: "Apatin" },
      { "@type": "City", name: "Odžaci" },
      { "@type": "City", name: "Kula" },
      { "@type": "City", name: "Bačka Topola" },
      { "@type": "AdministrativeArea", name: "Vojvodina" },
      { "@type": "Country", name: "Srbija" },
    ],
    serviceType: serviceTypes,
    knowsAbout: serviceTypes,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: isSerbian
        ? "Usluge LD Biro"
        : isRussian
          ? "Услуги LD Biro"
          : "LD Biro Services",
      itemListElement: serviceTypes.map((s, i) => ({
        "@type": "Offer",
        position: i + 1,
        itemOffered: {
          "@type": "Service",
          name: s,
          provider: { "@id": `${BASE_URL}/#organization` },
          areaServed: { "@type": "City", name: "Sombor" },
        },
      })),
    },
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
      {
        "@type": "Language",
        name: "Russian",
        alternateName: "ru",
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
        name: isSerbian ? "Početna" : isRussian ? "Главная" : "Home",
        item: canonicalUrl,
      },
    ],
  };

  return [localBusiness, webSite, breadcrumb];
}

export default function MetaData({ locale }: MetaDataProps) {
  const title = titles[locale];
  const description = descriptions[locale];
  const canonicalUrl = locale === "sr" ? BASE_URL : `${BASE_URL}/${locale}`;
  const ogLocale = locale === "sr" ? "sr_RS" : locale === "ru" ? "ru_RU" : "en_US";
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
      <link rel="alternate" hrefLang="ru" href={`${BASE_URL}/ru`} />
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
      {(["sr_RS", "en_US", "ru_RU"] as const)
        .filter((alt) => alt !== ogLocale)
        .map((alt) => (
          <meta key={alt} property="og:locale:alternate" content={alt} />
        ))}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE} />
      <meta name="twitter:image:alt" content="LD Biro - Knjigovodstvo & Finansije" />

      {/* Robots - Allow search engine crawling and indexing */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
      <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1" />

      {/* Local SEO geo tags */}
      <meta name="geo.region" content="RS-VO" />
      <meta name="geo.placename" content="Sombor" />
      <meta name="geo.position" content="45.7747;19.1128" />
      <meta name="ICBM" content="45.7747, 19.1128" />
      <meta name="theme-color" content="#0f172a" />

      {/* Favicon */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
      <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
      <link rel="icon" type="image/png" sizes="512x512" href="/icon-512.png" />
      <link rel="apple-touch-icon" sizes="192x192" href="/icon-192.png" />
      <link rel="manifest" href="/site.webmanifest" />

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
