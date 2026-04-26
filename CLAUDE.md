# Project notes for Claude

## Sitemap lastmod

`public/sitemap.xml` contains `<lastmod>` entries for each URL. Whenever you make code changes that affect the site's content (copy, pages, routes, anything user-visible), update every `<lastmod>` value in `public/sitemap.xml` to today's date (`YYYY-MM-DD`) as part of the same change. Do not skip this — Google uses lastmod as a recrawl signal.
