"use client";

import { createContext, useContext, ReactNode } from "react";
import en from "./locales/en.json";
import sr from "./locales/sr.json";

export type Locale = "en" | "sr";

type TranslationType = typeof en;

const translations: Record<Locale, TranslationType> = {
  en,
  sr,
};

interface I18nContextType {
  locale: Locale;
  t: TranslationType;
}

const I18nContext = createContext<I18nContextType | null>(null);

interface I18nProviderProps {
  children: ReactNode;
  locale: Locale;
}

export function I18nProvider({ children, locale }: I18nProviderProps) {
  const value: I18nContextType = {
    locale,
    t: translations[locale],
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}

export function useTranslations() {
  const { t } = useI18n();
  return t;
}
