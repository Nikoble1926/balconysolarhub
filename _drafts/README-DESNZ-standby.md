# DESNZ Standby — READY (prepared 12 Jul 2026)

Drafts for the ~22 Jul 2026 DESNZ decision. **Nothing here is deployed** — the
`_drafts/` folder is not linked and not indexed. On decision day, pick ONE
scenario, fill placeholders **only from the primary gov.uk document**, then
deploy via the UK chain. Accuracy > speed; same-day is the goal (NH proved it).

## Scenario → file map
| Outcome on ~22 Jul | Scenario | Action |
|---|---|---|
| DESNZ opens the road (response confirms legalisation / "legal from [date]") | **A — GREEN** | Deploy `desnz-approved-READY.html` as a NEW page at `/news/desnz-plug-in-solar-response-2026/`; then update `/legal/`, `/news/consultation`, homepage to match. |
| Response published but not yet legal / partial / timeline slipped | **B — DELAY** | Do NOT add a page. Paste the blocks from `desnz-delayed-READY.html` into `/legal/` (+ `/news/consultation`). |
| Nothing published on the day (date slips — very common) | **C — NOTHING** | **No site change.** Log entry only; watcher continues. Do NOT write "expected 22 July" anywhere so nothing goes stale. |

Media pitch (`desnz-pitch-READY.txt`): Scenario A or a clearly newsworthy B only.
**Send nothing without Nikos's explicit OK.**

## Placeholders (fill from the gov.uk primary document only)
- `[[DATE]]` — human date of the DESNZ publication, e.g. `22 July 2026`
- `[[DATE_ISO]]` — same date ISO, e.g. `2026-07-22` (used in JSON-LD datePublished/dateModified)
- `[[WHAT_EXACTLY]]` / `[[WHAT_THEY_SAID]]` — exactly what DESNZ announced
- `[[WHAT_PENDING]]` — (Scenario B) what still has to happen
- `[[NEXT_MILESTONE]]` — (Scenario B) the next expected step/date
- `[[EFFECTIVE]]` — when it takes effect (or "a date to be confirmed")
- `[[CAP_W]]` — confirmed headline device cap (consultation figure: 800VA AC / PV DC ≤2000W)
- `[[SOURCE_URL]]` — the gov.uk publication URL
- `[[FIRST_NAME]]` — (pitch only) journalist first name

**NH lesson:** if the document does not state something explicitly, leave it
out — never fill from press/Twitter. Only write the word "legal" if the
document actually makes it legal.

## Verified facts already baked in (from the live consultation/legal pages)
- Consultation: opened 16 Jun 2026, closed 30 Jun 2026 23:59, response summary ~22 Jul 2026.
- Route: PSSR 1994 amendment + DESNZ Interim Product Specification v1.0; enduring BSI standard later. Written statement HCWS118 (16 Jun 2026).
- Consultation device limits (may change in the response): single phase ≤253V AC/50Hz; ≤800VA; ≤3.5A; PV DC ≤2000W; one device/household; no batteries; BS 1363 plug + 5A fuse, partially insulated pins. German model.
- Today's compliant route: 800W hardwired by a CPS-registered electrician + free G98 Connect & Notify.

## Runbook (decision day ~22 Jul)
1. Watcher alert → open the **primary gov.uk document** (not Twitter/news). Read it.
2. Pick scenario A / B / C from the document. If ambiguous → STOP, ask central task/Nikos.
3. Fill placeholders from the document only, with the source link.
4. Deploy (UK chain): push (explicit paths) → `cd D:\repos\balconysolarhub; git pull` → robocopy to `_deploy\balconysolarhub` → `npx wrangler pages deploy . --project-name balconysolarhub --commit-dirty=true`.
5. Live verify; **IndexNow** (UK key `e351203baa994167a936d36533c26c94`); sitemap lastmod on changed URLs.
6. **GSC Request Indexing: via central task only** (executor profile has no GSC access).
7. Pitch: present the filled draft to central task/Nikos → send ONLY on OK.
8. Log everything.

## Deploy facts
- UK repo: `Nikoble1926/balconysolarhub`, branch `main`. Cloudflare Pages project: **balconysolarhub**.
- Amazon UK tag: `balconysolarh-21`. UK IndexNow key: `e351203baa994167a936d36533c26c94`.
- Git: explicit paths only (never `add -A/-u`). UTF-8 File IO. Do not touch the US site.
