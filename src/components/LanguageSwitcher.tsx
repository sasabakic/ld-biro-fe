import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { twMerge } from "tailwind-merge";

interface LanguageSwitcherProps {
  className?: string;
  isMobile?: boolean;
}

const LANGUAGES = [
  { code: "sr", label: "SR", flag: "🇷🇸" },
  { code: "en", label: "EN", flag: "🇬🇧" },
  { code: "ru", label: "RU", flag: "🇷🇺" },
] as const;

export default function LanguageSwitcher({ className, isMobile = false }: LanguageSwitcherProps) {
  const router = useRouter();
  const { locale, asPath } = router;
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentLang = LANGUAGES.find((l) => l.code === locale) ?? LANGUAGES[0];

  const handleSelect = (code: string) => {
    setIsOpen(false);
    if (code === locale) return;
    const pathWithoutHash = asPath.split("#")[0];
    router.push(pathWithoutHash, pathWithoutHash, { locale: code });
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <div
      ref={containerRef}
      className={twMerge("relative", className)}
      style={isMobile ? { WebkitTapHighlightColor: "transparent" } : undefined}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={twMerge(
          "flex items-center gap-1.5 px-3 py-1.5 rounded-full focus:outline-none cursor-pointer",
          isMobile
            ? "touch-manipulation text-slate-700"
            : "transition-colors hover:bg-black/5 active:bg-black/10"
        )}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Select language"
      >
        <span className="text-lg">{currentLang.flag}</span>
        <span className="text-sm font-medium">{currentLang.label}</span>
        <svg
          className={twMerge(
            "w-3.5 h-3.5 opacity-60 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <ul
          role="listbox"
          aria-label="Select language"
          className="absolute right-0 mt-1 py-1 bg-white rounded-lg shadow-lg border border-slate-200 min-w-[120px] z-50"
        >
          {LANGUAGES.map((lang) => (
            <li
              key={lang.code}
              role="option"
              aria-selected={lang.code === locale}
              onClick={() => handleSelect(lang.code)}
              className={twMerge(
                "flex items-center gap-2 px-3 py-2 cursor-pointer transition-colors text-sm",
                lang.code === locale
                  ? "bg-blue-50 text-blue-700 font-medium"
                  : "text-slate-700 hover:bg-slate-50"
              )}
            >
              <span className="text-lg">{lang.flag}</span>
              <span>{lang.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
