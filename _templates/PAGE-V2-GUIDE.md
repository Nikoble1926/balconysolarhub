# PAGE-V2-GUIDE — how to generate a "v2-native" page (BalconySolarHub, UK)

Every **new** page must be generated from `_templates/page-v2.html` and follow the
Design v2 doctrine below. Do not retrofit existing pages here — this governs
future pages only. Copy the skeleton, replace the `PLACEHOLDER…` markers, delete
the example comment blocks you don't use.

---

## 1. Head requirements

The `<head>` is copied verbatim from the live `index.html` head (favicons, charset,
viewport, theme-init snippet, `robots`, OG/Twitter pattern, `style.css`) with two
required additions/rules:

- **`theme.js` and `film.js` both load, deferred, side by side:**
  ```html
  <script src="/theme.js" defer></script><script src="/film.js" defer></script>
  ```
  `film.js` must always be present next to `theme.js`. It scans the page for
  `.mini-film` elements and renders the animated line-art automatically — no
  per-page JS.
- `<title>`, `<meta name="description">`, `<link rel="canonical">`, and the JSON-LD
  block are per-page (see the `PLACEHOLDER` markers). `og:url` must equal the
  canonical URL. OG/Twitter title+description mirror the page title+description.
  Set `"inLanguage":"en-GB"` in the JSON-LD.

---

## 2. Page structure & the folding doctrine

Fixed top-of-page order:

```
h1
badges + "Last verified: YYYY-MM-DD"
visible quick-answer   (<div class="answer">, ALWAYS visible)
content
```

- The **quick answer** is a `<div class="answer">`. It is always visible and answers
  the query in its first sentence. Never fold it. Keep the honest UK framing —
  never "just plug it in, fully legal now" when the transition says otherwise.
- Wrap **secondary explainer sections** (deep-dives most readers skip) in a fold:
  ```html
  <details class="fold"><summary>Section title</summary>
  <div class="fold-body">…</div></details>
  ```
- **NEVER fold** any of these — they must be visible on load:
  - quick answers
  - FAQ content that is mirrored in JSON-LD (`FAQPage`)
  - buy / affiliate CTAs
  - affiliate disclosures
- **Never hide a link** inside a collapsed fold if it's the only path to that page.

---

## 3. Product mini-films

Next to **every** product mention or product card, insert:

```html
<div class="mini-film" data-art="KEY" style="max-width:220px"></div>
```

`KEY` is exactly one of:

`panel-kit` · `microinverter` · `microinverter-wifi` · `battery` ·
`power-station` · `foldable-panel` · `plug` · `cable` · `mount` · `panel`

`film.js` renders the animated line-art automatically from `data-art`. Pick the key
that matches the product type (e.g. an AC-coupled balcony battery like EcoFlow
STREAM / Anker SOLIX → `battery`; a portable power station → `power-station`;
a Hoymiles/APsystems microinverter → `microinverter` or `microinverter-wifi`).

---

## 4. Minimal doctrine

- No boxes/frames around content for decoration. Keep visible text short.
- Everything that isn't the primary answer or a CTA goes into a fold.
- Never hide links. Minimal ≠ inaccessible.

---

## 5. Affiliate & publishing rules (unchanged)

- **Amazon UK tag:** `balconysolarh-21` on every Amazon link.
- Every affiliate link: `rel="sponsored nofollow noopener"` and `target="_blank"`.
- The footer **affiliate disclosure** must be present (it is in the template).
- **Visible text must equal JSON-LD claims** — every price, spec, or FAQ answer in
  the structured data must appear verbatim in visible page text.
- **Sitemap:** add the new URL to `/sitemap.xml` with `<lastmod>` = today, an
  appropriate `<changefreq>`/`<priority>`, following the existing entry pattern.
- **IndexNow ping** after commit + Pages build (per existing convention — same
  storm-watch pinger, UK URLs):
  ```
  python3 /root/storm-watch/storm_watch.py --ping \
    "https://balconysolarhub.co.uk/<slug>/" \
    "https://balconysolarhub.co.uk/sitemap.xml"
  ```
  (IndexNow key file: `e351203baa994167a936d36533c26c94.txt` at web root.)

---

## Note on CSS/JS assets

`.answer` and `.badge` are already styled in `style.css`. The v2 doctrine also relies
on `.fold` / `.fold-body` styling and `/film.js`, which are added to the shared assets
separately — this template only ADDS the markup contract; it does not modify
`style.css` or `film.js`. `<details>` degrades gracefully if `.fold` CSS is absent.
