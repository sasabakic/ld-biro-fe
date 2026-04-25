import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Script from "next/script";
import { Inter } from "next/font/google";
import { I18nProvider, Locale } from "../i18n";
import { getGAMeasurementId } from "../lib/analytics";
import CookieConsent from "../components/CookieConsent";
import "../styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const locale = (router.locale || "sr") as Locale;
  const gaId = getGAMeasurementId();
  const isProduction = process.env.NODE_ENV === "production";

  return (
    <I18nProvider locale={locale}>
      {isProduction && gaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                analytics_storage: 'denied'
              });
              gtag('js', new Date());
              gtag('config', '${gaId}');
            `}
          </Script>
        </>
      )}
      <main className={`${inter.variable} font-sans antialiased`}>
        <Component {...pageProps} />
      </main>
      {isProduction && gaId && <CookieConsent />}
    </I18nProvider>
  );
}
