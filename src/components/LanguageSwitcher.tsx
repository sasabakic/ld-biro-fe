import Link from "next/link";
import { useRouter } from "next/router";
import { twMerge } from "tailwind-merge";

interface LanguageSwitcherProps {
  className?: string;
  isMobile?: boolean;
}

export default function LanguageSwitcher({ className, isMobile = false }: LanguageSwitcherProps) {
  const router = useRouter();
  const { locale, asPath } = router;

  // Target locale is the opposite of current
  const targetLocale = locale === "sr" ? "en" : "sr";
  
  // Remove hash from path to prevent scrolling to anchors
  const pathWithoutHash = asPath.split('#')[0];

  return (
    <Link
      href={pathWithoutHash}
      locale={targetLocale}
      className={twMerge(
        `flex items-center gap-2 px-3 py-1.5 rounded-full focus:outline-none ${
          isMobile ? "touch-manipulation w-fit" : "transition-colors hover:bg-black/5 active:bg-black/10"
        }`,
        className
      )}
      style={isMobile ? { WebkitTapHighlightColor: 'transparent' } : undefined}
      aria-label={locale === "sr" ? "Switch to English" : "Prebaci na srpski"}
    >
      <span className="text-sm font-medium">
        {locale === "sr" ? "EN" : "SR"}
      </span>
      <span className="text-lg">{locale === "sr" ? "🇬🇧" : "🇷🇸"}</span>
    </Link>
  );
}
