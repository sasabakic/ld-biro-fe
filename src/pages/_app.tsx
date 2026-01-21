import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { Inter } from "next/font/google";
import { I18nProvider, Locale } from "../i18n";
import "../styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Determine locale from router
  const locale = (router.locale || "sr") as Locale;

  return (
    <I18nProvider locale={locale}>
      <main className={`${inter.variable} font-sans antialiased`}>
        <Component {...pageProps} />
      </main>
    </I18nProvider>
  );
}
