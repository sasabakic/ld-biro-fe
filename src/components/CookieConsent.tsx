import { useState, useEffect } from "react";
import { useTranslations } from "../i18n";
import { grantAnalyticsConsent, revokeAnalyticsConsent } from "../lib/analytics";

const CONSENT_KEY = "cookie_consent";

export function getStoredConsent(): "granted" | "denied" | null {
  if (typeof window === "undefined") return null;
  const value = localStorage.getItem(CONSENT_KEY);
  if (value === "granted" || value === "denied") return value;
  return null;
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const t = useTranslations();

  useEffect(() => {
    const stored = getStoredConsent();
    if (stored === null) {
      setVisible(true);
    } else if (stored === "granted") {
      grantAnalyticsConsent();
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, "granted");
    grantAnalyticsConsent();
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(CONSENT_KEY, "denied");
    revokeAnalyticsConsent();
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 bg-slate-900 text-white px-4 py-4 shadow-lg z-[10000]"
      role="dialog"
      aria-label="Cookie consent"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-slate-200">
          {t.cookieConsent.message}
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={handleDecline}
            className="px-4 py-2 text-sm rounded-lg border border-slate-500 text-slate-300 hover:bg-slate-800 transition-colors"
          >
            {t.cookieConsent.decline}
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 text-sm rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
          >
            {t.cookieConsent.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
