// Company statistics - update these values as needed
export const COMPANY_STATS = {
  yearsExperience: "30+",
  agriculturalFarms: "15+",
  satisfiedClients: "80+",
  support: "24/7",
} as const;

// Service icons mapped by index
export const SERVICE_ICONS = [
  "📊", // Tax Planning
  "📚", // Complete Bookkeeping
  "🌾", // Agricultural Farms
  "💼", // Financial Consulting
  "💰", // Payroll Processing
  "🏢", // Company Formation
  "🔍", // Audit and Verification
  "📄", // VAT and Tax Returns
  "📈", // Financial Reports
] as const;

// Contact info icons
export const CONTACT_ICONS = {
  address: "📍",
  phone: "📞",
  email: "✉️",
  workingHours: "⏰",
} as const;

// Navigation links
export const NAV_LINKS = [
  { key: "services", href: "#services" },
  { key: "about", href: "#about" },
  { key: "contact", href: "#contact" },
] as const;

// Light sections for header color switching
export const LIGHT_SECTIONS = ["services", "about", "contact"] as const;

// Business type option keys (values come from translations)
export const BUSINESS_TYPE_KEYS = [
  "entrepreneur",
  "llc",
  "jsc",
  "farm",
  "partnership",
  "limitedPartnership",
  "cooperative",
  "publicEnterprise",
  "institution",
  "other",
] as const;

// Footer service links mapping
export const FOOTER_BASIC_SERVICES = [
  { key: "taxPlanning", serviceIndex: 0 },
  { key: "completeBookkeeping", serviceIndex: 1 },
  { key: "agriculturalFarms", serviceIndex: 2 },
  { key: "financialConsulting", serviceIndex: 3 },
  { key: "payroll", serviceIndex: 4 },
] as const;

export const FOOTER_ADDITIONAL_SERVICES = [
  { key: "companyFormation", serviceIndex: 5 },
  { key: "audit", serviceIndex: 6 },
  { key: "vatTax", serviceIndex: 7 },
  { key: "financialReports", serviceIndex: 8 },
] as const;

// Copyright year - dynamically set
export const COPYRIGHT_YEAR = new Date().getFullYear();
