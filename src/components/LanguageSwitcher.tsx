"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "../i18n";

interface LanguageSwitcherProps {
  className?: string;
}

export default function LanguageSwitcher({
  className = "",
}: LanguageSwitcherProps) {
  const { locale } = useI18n();
  const pathname = usePathname();

  // Get the path without locale prefix for building the switch URL
  const getTargetPath = () => {
    if (locale === "sr") {
      // Currently Serbian (at /), switch to English (/en)
      return `/en${pathname}`;
    } else {
      // Currently English (at /en/*), switch to Serbian (/)
      // Remove /en prefix
      return pathname.replace(/^\/en/, "") || "/";
    }
  };

  return (
    <Link
      href={getTargetPath()}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-colors hover:bg-black/5 focus:outline-none ${className}`}
      aria-label={locale === "sr" ? "Switch to English" : "Prebaci na srpski"}
    >
      <span className="text-sm font-medium">
        {locale === "sr" ? "EN" : "SR"}
      </span>
      <span className="text-lg">{locale === "sr" ? "🇬🇧" : "🇷🇸"}</span>
    </Link>
  );
}
