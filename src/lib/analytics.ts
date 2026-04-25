const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

export function getGAMeasurementId(): string | undefined {
  return GA_MEASUREMENT_ID;
}

export function isAnalyticsEnabled(): boolean {
  return (
    typeof window !== "undefined" &&
    process.env.NODE_ENV === "production" &&
    !!GA_MEASUREMENT_ID
  );
}

export function grantAnalyticsConsent(): void {
  if (!isAnalyticsEnabled()) return;
  window.gtag("consent", "update", {
    analytics_storage: "granted",
  });
}

export function revokeAnalyticsConsent(): void {
  if (!isAnalyticsEnabled()) return;
  window.gtag("consent", "update", {
    analytics_storage: "denied",
  });
}

function trackEvent(eventName: string, params?: Record<string, string>): void {
  if (!isAnalyticsEnabled() || typeof window.gtag !== "function") return;
  window.gtag("event", eventName, params);
}

// Contact form events
export function trackContactFormStart(): void {
  trackEvent("contact_form_start");
}

export function trackContactFormSubmit(): void {
  trackEvent("contact_form_submit");
}

// Navigation events
export function trackNavClick(destination: string): void {
  trackEvent("nav_click", { destination });
}

export function trackCtaClick(location: string): void {
  trackEvent("cta_click", { location });
}

// Contact link events
export function trackPhoneClick(phoneNumber: string): void {
  trackEvent("phone_click", { phone_number: phoneNumber });
}

export function trackEmailClick(emailAddress: string): void {
  trackEvent("email_click", { email_address: emailAddress });
}

// Language switcher
export function trackLanguageChange(language: string): void {
  trackEvent("language_change", { language });
}
