import Link from "next/link";
import { useRouter } from "next/router";

interface LanguageSwitcherProps {
  className?: string;
}

export default function LanguageSwitcher({
  className = "",
}: LanguageSwitcherProps) {
  const router = useRouter();
  const { locale, asPath } = router;

  // Target locale is the opposite of current
  const targetLocale = locale === "sr" ? "en" : "sr";

  return (
    <Link
      href={asPath}
      locale={targetLocale}
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
