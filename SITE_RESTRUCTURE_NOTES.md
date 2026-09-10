# Multi-Page Restructure — What Changed

The site used to be a single giant `index.html` (1100+ lines, one long scroll). It's now split into
8 top-level pages sharing `css/style.css` and `js/site.js`, because the single-page version was going
to keep growing forever as more trips get added.

## New file structure

- `index.html` — short home page: hero, brief welcome blurb, three link-cards to Journey/Photos/Posts,
  sidebar (Team + Snapshot only)
- `journey.html` — the two video filmstrips (Seoul, Dubai), full width, no sidebar (matches original
  layout — the horizontal-scroll strips need the space)
- `map.html` — the Leaflet map, full width, no sidebar. **Fixed a pre-existing bug here**: Seoul/South
  Korea was missing from the map pin list even though the gallery already had a Seoul entry — added it.
  **Also fixed a script-order bug** introduced during the split: `site.js` was loading before
  `leaflet.js`, so the map-init code's `typeof L === 'undefined'` check always failed and the map
  never rendered. Leaflet must load before `site.js` — see the `<script>` order at the bottom of
  `map.html` if this ever gets touched again.
- `about.html` — Welcome text + full "Meet the Travelers" team bios (previously a condensed sidebar
  widget; now has its own page with room to say more)
- `gallery.html` — all 16 entry-cards (Field Logs & Travels), sidebar (Team + Snapshot)
- `posts.html` — blog post list (2 posts so far, both about the Dubai trip)
- `subscribe.html` — newsletter signup, now a full form page instead of a sidebar widget
- `contact.html` — contact form, **replaces the old `mailto:` link** (see below)
- `css/style.css` — every style that used to live in `index.html`'s `<style>` block, plus new rules
  for `.page-header` (slim header used on every inner page), `.section-links` (home page's 3 link
  cards), `.form-card` / `.site-form` (Subscribe & Contact), and footer `.disclaimer` /
  `.footer-links`
- `js/site.js` — the two IIFEs that used to be inline (`journey-card` video lazy-load, Leaflet map
  init). Both guard on the relevant element existing, so it's safe to include on every page — it's a
  no-op on pages without that content.

`posts/dubai-visa-logistics.html` and `posts/dubai-trip-cost-breakdown.html` are unchanged in
structure (they keep their own standalone inline `<style>`, separate from the shared `css/style.css`)
but their internal links (`nav`, in-body references, footer) were updated to point at the new pages
instead of the old `index.html#anchor` fragments. Their footers also got the same disclaimer text
added to their own inline `<style>` block, since they don't use the shared stylesheet.

## Nav consistency

Every page's `<nav>` now links to real pages (`journey.html`, `map.html`, etc.) instead of `#anchor`
fragments on a single page. If a new top-level page is ever added, update the `<nav>` block on ALL
existing pages — there's no shared header include (this is a plain static site, no build step), so
the nav markup is duplicated across every file. Same goes for the footer.

## Formspree — subscribe + contact forms

Both `subscribe.html` and `contact.html` point at the same placeholder:
`https://formspree.io/f/YOUR_FORM_ID`. **This needs a real Formspree form ID from the user before
either form will work.** Once they have one:
- Replace `YOUR_FORM_ID` in both files (two occurrences total, one per file)
- Both forms share the same endpoint on purpose, distinguished by a hidden `_subject` field
  (`"New newsletter signup — Aman's Travels"` vs `"New contact message — Aman's Travels"`) so
  submissions land in the same inbox but with different subject lines — avoids needing two separate
  Formspree forms/IDs.
- The old `contact-widget` used a `mailto:mikemann2199@gmail.com` link, which the user said is a
  dead end (doesn't work / isn't checked). The Formspree contact form replaces this entirely — no
  more mailto link anywhere on the site.
- Neither form has a custom `_next` redirect set, so on submit the visitor will land on Formspree's
  own default plain "thanks" page rather than being routed back to the site. Worth revisiting once
  the form ID is in — could add `_next` pointing back to `contact.html` or `subscribe.html` with a
  `?sent=1` query param and a small JS-shown confirmation message instead, if a more polished
  confirmation is wanted.

## Footer disclaimer

Added to every page's footer (both the shared one in `css`/nav-having pages and the two standalone
post pages): a short "personal blog, not sponsored/affiliated, verify details before you travel"
disclaimer. Exact wording is in `css/style.css`'s companion markup (the `<footer>` block, duplicated
per page — see nav consistency note above).

## Reframing as a group blog (same session)

Also folded into this pass, per the user's request: the site now frames itself as a group of friends
(Aman, Mike, Rodi, "and a few others") rather than solely Aman. Specifically:
- "Meet Aman" sidebar widget → "Meet the Travelers", now listing all three with short blurbs, on
  `about.html` in expanded form and as a condensed widget in the sidebar on other pages
- Dubai journey intro/entry now attributed to Mike; Seoul journey intro/entry now attributed to Rodi
  (small "— Mike" / "— Rodi" bylines added to the two headline entry-cards, plus the journey-intro
  lines were reworded)
- Home page welcome blurb rewritten to acknowledge the group
- JSON-LD `author` field on every page is now an array of all three people instead of just Aman
- Fixed a stale "Six countries so far" line on the map (hadn't been updated since Dubai/Korea were
  added) — now correctly says seven

## Open items

- **Formspree form ID still needed** — nothing will submit until the user provides one (see above).
- No `_next` redirect configured for either form yet (see above).
- ~~The standalone post pages duplicate the site's CSS variables~~ — resolved, see
  PROJECT_NOTES.md's 2026-09-11 session entry. Both post pages now use `css/style.css`; a third
  post can reuse the same `.post-page-main`/`.post-article` classes instead of starting a new
  inline `<style>` block.
