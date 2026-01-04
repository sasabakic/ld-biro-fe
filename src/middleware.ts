import { NextRequest, NextResponse } from "next/server";

export const locales = ["sr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "sr";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip API routes and static files
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".") // files with extensions
  ) {
    return NextResponse.next();
  }

  // Check if pathname starts with a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    // If it's the default locale (sr), redirect to remove it from URL
    if (pathname.startsWith("/sr/") || pathname === "/sr") {
      const newPathname = pathname.replace(/^\/sr/, "") || "/";
      return NextResponse.redirect(new URL(newPathname, request.url));
    }
    // For /en, let it pass through
    return NextResponse.next();
  }

  // No locale in pathname - this is Serbian (default)
  // Rewrite to /sr internally (URL stays the same for user)
  const newUrl = new URL(`/sr${pathname}`, request.url);
  return NextResponse.rewrite(newUrl);
}

export const config = {
  matcher: [
    // Match all paths except static files and api
    "/((?!_next/static|_next/image|favicon.ico|.*\\.).*)",
  ],
};
