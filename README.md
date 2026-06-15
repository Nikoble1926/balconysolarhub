# balconysolarhub.co.uk

Static site for **BalconySolarHub** — an independent UK guide tracking the BS 7671 Amendment 4 transition for balcony / plug-in solar.

Built on plain HTML + a single 64-line stylesheet. Hosted on GitHub Pages, served at https://balconysolarhub.co.uk/.

## Layout

```
/                       Home
/legal/                 Flagship: Is plug-in solar legal in the UK?
/g98-notification/      DNO walkthrough
/best-kits-2026/        Honest UK kit picks
/savings-calculator/    £ calculator (~27p/kWh default)
/guides/800w-limit/
/guides/normal-socket/
/guides/battery-storage/
/guides/cost-payback/
/faq/
/about/
/contact/
/privacy/
/affiliate-disclosure/

/style.css              64-line stylesheet (shared with US sister site)
/og-image.png           1200×630 OG share image
/gen_og_image.py        Reproducible PIL generator for og-image.png
/CNAME                  balconysolarhub.co.uk
/robots.txt
/sitemap.xml
/llms.txt               AI-discovery feed
```

## Editorial principle

We do not publish "just plug it in, fully legal now" copy while the BSI product standard for DIY plug-in kits is still pending (~July 2026). Honest framing first; SEO ranking second.

## Funding

Reader-supported via Amazon Associates UK (placeholder tag `TAG_PENDING` until registration completes). No paid placement, no in-kind product, no display ads.

## Updating

When a regulatory or product fact changes:

1. Edit the affected page(s).
2. Bump `<lastmod>` in `sitemap.xml`.
3. If the OG image needs to track a major change, re-run `python3 gen_og_image.py`.
4. Commit + push to `main` — GitHub Pages picks it up.
