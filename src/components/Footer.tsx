import LDBiroLogo from "./LDBiroLogo";
import {
  FOOTER_BASIC_SERVICES,
  FOOTER_ADDITIONAL_SERVICES,
  NAV_LINKS,
} from "../lib/constants";

interface FooterTranslations {
  common: {
    companyName: string;
  };
  nav: {
    services: string;
    about: string;
    contact: string;
  };
  footer: {
    description: string;
    basicServices: string;
    additionalServices: string;
    navigation: string;
    serviceLinks: Record<string, string>;
    copyright: string;
  };
}

interface FooterProps {
  translations: FooterTranslations;
}

export default function Footer({ translations: t }: FooterProps) {
  return (
    <footer className="bg-slate-200 text-slate-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <LDBiroLogo width={32} height={32} className="mr-3" />
              <h3 className="text-2xl font-bold">{t.common.companyName}</h3>
            </div>
            <p className="text-slate-700 mb-4">{t.footer.description}</p>
          </div>

          {/* Basic Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">
              {t.footer.basicServices}
            </h4>
            <ul className="space-y-2 text-slate-700">
              {FOOTER_BASIC_SERVICES.map(({ key, serviceIndex }) => (
                <li key={key}>
                  <a
                    href={`#service-${serviceIndex}`}
                    className="hover:text-slate-800 transition-colors"
                  >
                    {t.footer.serviceLinks[key]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Additional Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">
              {t.footer.additionalServices}
            </h4>
            <ul className="space-y-2 text-slate-700">
              {FOOTER_ADDITIONAL_SERVICES.map(({ key, serviceIndex }) => (
                <li key={key}>
                  <a
                    href={`#service-${serviceIndex}`}
                    className="hover:text-slate-800 transition-colors"
                  >
                    {t.footer.serviceLinks[key]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-lg font-semibold mb-4">
              {t.footer.navigation}
            </h4>
            <ul className="space-y-2 text-slate-700">
              {NAV_LINKS.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className="hover:text-slate-800 transition-colors"
                  >
                    {t.nav[link.key as keyof typeof t.nav]}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-300 mt-8 pt-8 text-center text-slate-700">
          <p>{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
