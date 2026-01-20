import LDBiroLogo from "./LDBiroLogo";
import LanguageSwitcher from "./LanguageSwitcher";
import { NAV_LINKS } from "../lib/constants";

interface NavigationProps {
  isOverLightSection: boolean;
  translations: {
    nav: {
      services: string;
      about: string;
      contact: string;
      startCooperation: string;
    };
    common: {
      companyName: string;
      tagline: string;
    };
  };
}

export default function Navigation({
  isOverLightSection,
  translations: t,
}: NavigationProps) {
  const navLinkClass = `transition-colors duration-300 focus:outline-none ${
    isOverLightSection
      ? "text-slate-700 hover:text-blue-600"
      : "text-slate-800 hover:text-blue-600"
  }`;

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 border-b ${
        isOverLightSection
          ? "bg-slate-100/95 backdrop-blur-md border-slate-300/50 shadow-lg"
          : "bg-white/90 backdrop-blur-md border-white/40 shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <a
              href="#"
              className="flex items-center cursor-pointer focus:outline-none"
            >
              <LDBiroLogo width={40} height={40} className="mr-3" />
              <div className="flex flex-col">
                <h1 className="text-xl font-bold text-slate-900 transition-colors duration-300">
                  {t.common.companyName}
                </h1>
                <span
                  className={`text-xs transition-colors duration-300 ${
                    isOverLightSection ? "text-slate-600" : "text-slate-700"
                  }`}
                >
                  {t.common.tagline}
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <a key={link.key} href={link.href} className={navLinkClass}>
                {t.nav[link.key as keyof typeof t.nav]}
              </a>
            ))}
          </div>

          {/* CTA & Language Switcher */}
          <div className="flex items-center gap-4">
            <a
              href="#contact"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition-colors focus:outline-none"
            >
              {t.nav.startCooperation}
            </a>
            <LanguageSwitcher
              className={
                isOverLightSection ? "text-slate-700" : "text-slate-800"
              }
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
