import { useState, useEffect } from "react";
import LDBiroLogo from "./LDBiroLogo";
import LanguageSwitcher from "./LanguageSwitcher";
import { MenuIcon, CloseIcon } from "./icons";
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinkClass = `transition-colors duration-300 focus:outline-none ${
    isOverLightSection
      ? "text-slate-700 hover:text-blue-600"
      : "text-slate-800 hover:text-blue-600"
  }`;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav
        className={`fixed w-full transition-all duration-300 border-b ${
          isOverLightSection
            ? "bg-slate-100/95 backdrop-blur-md border-slate-300/50 shadow-lg"
            : "bg-white/90 backdrop-blur-md border-white/40 shadow-sm"
        }`}
        style={{ zIndex: 9997 }}
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

            {/* Desktop CTA & Language Switcher */}
            <div className="hidden md:flex items-center gap-4">
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

            {/* Mobile Hamburger Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-lg hover:bg-black/5 transition-colors focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <CloseIcon className="w-6 h-6 text-slate-900" />
              ) : (
                <MenuIcon className="w-6 h-6 text-slate-900" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay - Outside nav for proper z-index */}
      <div
        className={`fixed inset-0 bg-black/50 md:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{ zIndex: 9998 }}
        onClick={closeMobileMenu}
      />

      {/* Mobile Menu - Outside nav for proper z-index */}
      <div
        className={`fixed top-0 right-0 bottom-0 h-screen w-[280px] shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ backgroundColor: '#ffffff', opacity: 1, zIndex: 9999, height: '100vh' }}
      >
          <div className="flex flex-col h-full" style={{ backgroundColor: '#ffffff' }}>
            {/* Mobile Menu Header */}
            <div className="flex justify-between items-center p-4 border-b border-slate-200" style={{ backgroundColor: '#ffffff' }}>
              <span className="text-lg font-semibold text-slate-900">Menu</span>
              <button
                onClick={closeMobileMenu}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors focus:outline-none"
                aria-label="Close menu"
              >
                <CloseIcon className="w-6 h-6 text-slate-900" />
              </button>
            </div>

            {/* Mobile Menu Items */}
            <div className="flex flex-col flex-1 p-4 space-y-1" style={{ backgroundColor: '#ffffff' }}>
              {NAV_LINKS.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className="px-4 py-3 text-slate-700 hover:bg-slate-100 hover:text-blue-600 rounded-lg transition-colors focus:outline-none"
                >
                  {t.nav[link.key as keyof typeof t.nav]}
                </a>
              ))}

              {/* Divider */}
              <div className="py-2">
                <div className="border-t border-slate-200" />
              </div>

              {/* Language Switcher in Mobile Menu */}
              <div className="px-4 py-2">
                <LanguageSwitcher className="text-slate-700 justify-start" isMobile={true} />
              </div>

            {/* Start Cooperation Button */}
            <div className="pt-4">
              <a
                href="#contact"
                onClick={closeMobileMenu}
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center px-6 py-3 rounded-full transition-colors focus:outline-none font-medium"
              >
                {t.nav.startCooperation}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
