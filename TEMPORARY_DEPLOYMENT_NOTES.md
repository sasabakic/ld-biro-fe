# Temporary Deployment - SEO Blocking Configuration

⚠️ **IMPORTANT**: This site is currently configured to be **NON-DISCOVERABLE** and **NON-INDEXABLE** by search engines.

## Current Status
✅ Site is accessible ONLY via direct URL link
✅ Search engines are blocked from indexing and crawling
✅ Site will NOT appear in Google, Bing, or any other search engine

## Protection Layers Implemented

### 1. Meta Tags (HTML Head)
**File**: `src/components/MetaData.tsx`
- Lines 220-228: Multiple `noindex, nofollow` meta tags for all major search engines
- Lines 191-195: Canonical links (commented out)
- Lines 234-240: JSON-LD structured data (commented out)

### 2. HTTP Headers (Server-side)
**File**: `next.config.ts`
- Lines 47-50: `X-Robots-Tag` HTTP header with full blocking

### 3. Robots.txt (File-level)
**File**: `public/robots.txt`
- Blocks ALL search engine crawlers
- Disallows all paths

## When Ready to Go LIVE (Enable SEO)

### Step 1: Update MetaData.tsx
Replace lines 220-228 with:
```tsx
{/* Robots */}
<meta name="robots" content="index, follow" />
<meta name="googlebot" content="index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1" />
```

Uncomment lines 191-195 (canonical links):
```tsx
{/* Canonical and Language Alternates */}
<link rel="canonical" href={canonicalUrl} />
<link rel="alternate" hrefLang="sr" href={BASE_URL} />
<link rel="alternate" hrefLang="en" href={`${BASE_URL}/en`} />
<link rel="alternate" hrefLang="x-default" href={BASE_URL} />
```

Uncomment lines 234-240 (structured data):
```tsx
{/* JSON-LD Structured Data */}
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(structuredData),
  }}
/>
```

### Step 2: Update next.config.ts
Remove or comment out lines 47-50 (X-Robots-Tag header)

### Step 3: Update robots.txt
Replace `public/robots.txt` with:
```txt
# Robots.txt - Production
User-agent: *
Allow: /

Sitemap: https://ldbiro.rs/sitemap.xml
```

### Step 4: Update BASE_URL
In `src/components/MetaData.tsx`, line 9:
```tsx
const BASE_URL = "https://ldbiro.rs"; // Update to production URL
```

## Testing
To verify blocking is working:
1. Check robots.txt: `https://your-temp-url.com/robots.txt`
2. View page source and check for `noindex` meta tags
3. Use Google Search Console to verify noindex status

## Notes
- Keep this configuration until you're ready for public launch
- Search engines typically respect these directives within 24-48 hours
- Once you enable indexing, it may take 1-2 weeks for full Google indexing
- Consider submitting sitemap to Google Search Console when ready

---
**Last Updated**: January 22, 2026
**Status**: 🔒 NON-INDEXABLE (Temporary Deployment)
