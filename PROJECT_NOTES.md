# Aman's Travels — Project Notes

Context for whoever picks this up next: where this came from, what's actually done, and what's still open.

## What this is

A small personal travel site for "Aman's Travels" — a static HTML single-page site with an about section and a photo gallery. It started as a demo/testbed but is now moving toward something Aman actually uses (real photos, real contact info) rather than staying a pure mock.

## Where things stand

**Deployment — done.**
The site deploys automatically via GitHub Actions (`.github/workflows/pages.yml`) on every push to `main`. Pages source is set to "GitHub Actions" in repo settings (Settings → Pages), not the older branch-based deploy. Live at:
https://teredatrades.github.io/Amanstravels/

No manual steps needed to publish — just push to `main` and the workflow builds and deploys.

**Gallery photos — done (real photos, from Aman's actual trips).**
`index.html` has an 11-photo gallery with `<picture>`/`srcset` markup wired to specific filenames and alt text. The photos live in `assets/` as real images, EXIF-stripped and exported at 1600/800/480px widths in both JPG and WebP:

- `photo11-marina-boat` — boat + jet skis, Dubai Marina waterway (newest — top of gallery)
- `photo9-marina-promenade` — Dubai Marina promenade at dusk
- `photo10-marina-skyline-bluehour` — Dubai Marina skyline, blue hour
- `photo8-addis-aerial` — aerial view over Addis Ababa
- `photo5-parisian` — The Parisian, Macao (night)
- `photo4-le-carre` — Le Carré d'As club, Liège
- `photo7-la-pecera` — La Pecera street, Madrid
- `photo2-monserrate` — Camino Peatonal de Monserrate trail sign, Bogotá
- `photo6-mirador-norte` — Mirador al Norte padlock fence, Monserrate, Bogotá
- `photo1-botero` — Botero Museum, Bogotá (still-life painting)
- `photo3-el-dorado` — El Dorado Airport apron, Bogotá

The original 8 were sourced from Aman's own Snapchat memories, cropped to remove the app's UI chrome. The 3 newest (`photo9`–`photo11`) came in as screenshots with black letterboxing top/bottom and were auto-trimmed to the real photo content before the same EXIF-strip/resize treatment — see `TRIP_DUBAI_PROGRESS.md` for the full Dubai-trip processing log (including 8 short mini-videos in `assets/videos/` not yet wired into the page).

Untouched originals (post-crop/trim, pre-resize) are kept in `assets/originals/` per the workflow `ASSETS_README.md` originally described.

**Hero status badge** — manually maintained, currently reads "Dubai, UAE" (updated from "Addis Ababa, Ethiopia" when the Marina photos were added as the new top entry). Keep this in sync with whichever entry-card is newest.

**"The Journey" video section — done.** A new section (`#journey`) sits between the hero and the main content, above the photo gallery — a horizontal-scroll filmstrip of 8 short muted video clips telling the Addis→Dubai→Addis flight story in order, lazy-loaded via `IntersectionObserver` so nothing but poster thumbnails loads until a visitor scrolls to a given clip. Full detail (which clip is which, the JS mechanics, pending YouTube link) is in `TRIP_DUBAI_PROGRESS.md`.

**About "Snapshot" image — done.** Now uses the real `photo6-mirador-norte` gallery photo instead of the old dangling `assets/sample-photo.jpg` placeholder (that file never actually existed in the repo).

**Recent posts section — dropped.** The placeholder posts (Udaipur, Western Ghats, Delhi street food) had no real content and their `#` links went nowhere, so the whole section and its nav link were removed rather than kept as placeholders. Add it back if/when there's real post content to publish.

**Contact — done, simple version.** Wired up as a `mailto:` link to `mikemann2199@gmail.com` (pre-filled subject line). No third-party form service — chosen deliberately to avoid a signup step. If a native in-page form is wanted later, Formspree (free tier, just needs a form ID from formspree.io) is the natural upgrade.

**Site framing updated.** Removed "mock site" language from the title, About copy, and footer since the site is no longer meant to read as a demo.

**Redesign — done (commit `864b673`, pushed directly to `main`, not through a PR).**
Full visual overhaul of `index.html`. Structural/content summary for whoever
picks this up next:

- **Palette/typography**: swapped the old blue accent (`#0b77d6`) + sans-serif
  (Inter) look for a green/gold theme — dark green primary (`#1e3a34`),
  gold accent (`#c8963e`) — with a serif body font (Georgia) and sans-serif
  (system font stack) reserved for nav/headings/labels. Reads more like a
  travel-blog/editorial site than the original card-based demo look.
- **Header**: split into two pieces — a slim top nav bar (logo + About/Photos/
  Contact links) and a separate dark hero band below it with the tagline
  "Travel with Aman. Travel in Peace." and a status badge reading
  **"📍 Most Recent Stop: Addis Ababa, Ethiopia."** That badge text is
  hardcoded in the HTML — it's currently accurate (Addis is the first/most
  recent entry-card below it), and an HTML comment was added directly above
  it as a reminder to keep it in sync whenever a newer trip is added.
- **Layout**: moved from a single-column hero + grid gallery to a two-column
  blog layout — main content (About card + gallery) on the left (2fr),
  a right sidebar (1fr) with three widgets, stacking to one column under
  768px.
- **Gallery reframed as blog entries.** The 8 photos are no longer a plain
  grid with one-line figcaptions — each is now an `entry-card` styled like a
  blog post: location tag, its own headline (e.g. "Nightlife at Le Carré
  d'As", "Mirador al Norte"), and a short first-person-style write-up
  paragraph per photo. Same 8 photos/filenames/alt text as before, no new
  images added.
- **Sidebar widgets**: an "Meet Aman" author box (circular avatar placeholder
  showing just the letter "A" — no actual headshot), a "Snapshot" widget
  (unchanged photo6-mirador-norte + caption, same as the old About-section
  aside), and a "Say Hello" contact widget (same `mailto:` link as before,
  now styled as a button).
- **Fixed — duplicated About copy.** The sidebar's "Meet Aman" box used to
  repeat the main `#about` card's full welcome paragraph verbatim. Shortened
  it to a one-line bio ("Traveler and photographer, currently sharing stops
  from Colombia, Belgium, Macao, Spain, and Ethiopia.") so the two read as
  a fuller welcome (main card) vs. a quick sidebar bio, rather than the same
  text twice. Update the country list there if the destination mix changes.
- Deployment mechanics, image asset naming convention, and the `mailto:`
  contact address are all unchanged by this redesign — everything below in
  "Repo mechanics worth knowing" still applies as-is.

**Not yet done / open item:**
- **Custom domain.** Still only on the default `teredatrades.github.io/Amanstravels` URL. Confirmed as of 2026-08-31: **not purchased yet.** This needs Aman to actually buy a domain first (a registrar account + payment, which can't be done on his behalf) — once there's a domain name, the remaining steps are: add a `CNAME` file to the repo root with the domain, and set DNS records (A/ALIAS or CNAME depending on registrar) pointing at GitHub Pages. Still nothing to do here until a domain exists — check back next session.
- Extra travel photos referenced in an earlier version of these notes (Sky Tower/Big Ben replica and a building exterior in Macau, a Luxembourg rooftop view) were only ever in a previous session's temporary workspace, not committed to this repo — they no longer exist anywhere accessible. If the gallery should expand beyond the current 8, those would need to be re-sourced from Aman.

## Monetization & content-expansion plan (logged from planning conversation)

Context for whoever picks this up: this was a planning discussion, not yet
fully executed. Some of it needs Aman to take actions we can't do on his
behalf (same shape as the custom-domain blocker above).

**Analytics — done, live.**
GoatCounter (same free, cookie-less tool used on MoneyMattersDaily) works
fine on a static GitHub Pages site — it's just a `<script>` tag, no
server-side code needed. Site is signed up at
https://amanstravels.goatcounter.com and the real site code is wired into
`index.html`'s `<head>`. No data yet since the page hasn't been visited
since the script went live — check back once there's real traffic.

**Revenue sequencing discussed (not yet implemented):**
1. **Affiliate links first** — lowest lift, doesn't need traffic scale.
   Candidates: Booking.com/Expedia/Trip.com (hotel links per post),
   GetYourGuide/Viator (tours/activities), Amazon Associates (travel gear),
   Airalo (eSIM), SafetyWing (travel insurance). Each needs its own
   affiliate-program signup (Aman's accounts) before real links can be
   dropped in — we can draft the surrounding post copy, but not create
   the affiliate accounts.
2. **Display ads — hold off.** Ezoic's minimum is 250K monthly users
   (way out of reach for now); Media.net/AdSense have no real minimum
   and are the fallback once GoatCounter shows steady weekly traffic.
   Revisit once there's real numbers.
3. **YouTube** — separate income line once the full trip compilation
   (see `TRIP_DUBAI_PROGRESS.md`) is posted and the channel builds watch
   time.
4. **Longer-term/Aman-specific** — print-on-demand of a few gallery-quality
   shots (marina boat shot is the standout candidate), paid
   itinerary-consulting if people start asking, tourism-board sponsorships
   once there's a real audience.

**Content expansion ideas (agreed to implement all — in progress):**
- Trip-cost breakdown post ("What this Dubai trip actually cost") —
  natural home for flight/hotel/eSIM affiliate links.
- Practical/logistics posts — visa notes, packing, the Addis→Dubai route.
- An interactive "everywhere I've been" map (Colombia, Belgium, Macao,
  Spain, Ethiopia, UAE so far) as a homepage anchor.
- Push the mini-clips to Instagram/TikTok as Reels/Shorts, linking back
  to the site or eventual YouTube video.
- A simple newsletter/"new stop" email capture for repeat-visitor value.

None of the content-expansion items are built yet — next session should
pick one and start (the cost-breakdown post is probably the fastest win
since the Dubai trip data already exists in `TRIP_DUBAI_PROGRESS.md`).

## SEO & AI-optimization — done, first pass

Full package added this session:
- **Meta tags** — real `<title>`/`<meta description>` on both the home page
  and the new post, a `<link rel="canonical">` on each, Open Graph tags
  (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`) and a
  Twitter `summary_large_image` card, so links shared on social/Slack/etc.
  render with a title, description, and the marina-boat photo as preview
  image.
- **Structured data (JSON-LD)** — `WebSite`/`Person` schema on the home
  page, `Article` schema on the trip-cost post. Helps both traditional
  search and AI answer engines understand what the site/page is without
  guessing from raw HTML.
- **`robots.txt`** — allows all crawlers, points at `sitemap.xml`.
- **`sitemap.xml`** — lists the home page and the new post; add a new
  `<url>` entry here every time a new page/post is added.
- **`llms.txt`** — plain-text summary at the repo root following the
  emerging llms.txt convention some AI crawlers/answer engines read,
  describing the site and explicitly noting that photos/videos are
  Aman's own (not stock) and that cost figures are real unless marked
  as placeholders.

**Open item:** `sitemap.xml` needs a new `<url>` entry for every future
page/post — it's not auto-generated.

## Content expansion — trip-cost breakdown post (first one, scaffolded)

`posts/dubai-trip-cost-breakdown.html` is a new standalone page (not a
section of `index.html`) — matches the site's green/gold/serif theme,
has its own SEO tags and `Article` structured data, includes the
GoatCounter snippet, and links back to the home page. A "From the Blog"
section and a `Posts` nav link were added to `index.html` linking to it.

**Open item — needs Aman's real numbers.** The post is a template: every
line-item cost (flight, hotel, transfers, food, eSIM, total) and the
"was it worth it" closing paragraph are placeholders marked in gold
italic (e.g. `$[FLIGHT COST]`) since the actual amounts spent aren't
known — Dubai trip numbers weren't tracked in the moment and can't be
reliably backfilled now. **Confirmed: this waits until the next trip.**
`TRIP_COST_QUESTIONS.md` in the repo root is a reusable question list to
fill out during/right after that next trip (flights, accommodation,
local transport, activities, food, connectivity, plus a closing
reflection) so the answers can drop straight into a cost-breakdown post
instead of trying to reconstruct totals afterward.

No real affiliate links are in the post yet (see the affiliate-program
signups still needed, noted above) — once those accounts exist, the
flight/hotel/eSIM line items are the natural place to add them.

A printable PDF version of `TRIP_COST_QUESTIONS.md` was also generated
(same questions, one blank line per question for handwriting answers) and
handed directly to Aman — it's not part of the repo/site since it's a
personal-use document, not a page.

## Full session log — everything done and why (consolidated)

Context for whoever/whatever picks this up next: this was one long
session covering monetization planning through several shipped features.
Logged here as one trail since the session is ending on token limits.

**1. Analytics (GoatCounter) — done, confirmed live.**
Why first: every later decision (which affiliate links, whether display
ads make sense, what content to write) depends on knowing if there's
real traffic. Site: https://amanstravels.goatcounter.com, real site code
wired into `index.html`. Aman signed up himself (account creation needs
an email, can't be done on his behalf).

**2. SEO & AI-optimization — done.**
Why second: cheap, one-time, makes every future page discoverable from
day one. Added: meta description/canonical/OG/Twitter-card tags,
JSON-LD structured data (`WebSite`/`Person` on home, `Article` on each
post), `robots.txt`, `sitemap.xml` (needs a new `<url>` per future
page — not automatic), and `llms.txt` (emerging convention for AI
crawlers/answer engines, states plainly that photos/videos are Aman's
own and cost figures are real unless marked placeholder).

**3. Trip-cost breakdown post — scaffolded, `posts/dubai-trip-cost-breakdown.html`.**
Why: fastest content-expansion win since the Dubai footage/data already
existed; a natural future home for affiliate links per the monetization
plan (see below). Every dollar figure is a placeholder — Dubai trip
costs weren't tracked in the moment and weren't fabricated. Fix: a
reusable question list (`TRIP_COST_QUESTIONS.md` + a printable PDF
handed to Aman directly, not stored in the repo) for the *next* trip to
fill in live. **Confirmed: real numbers wait until the next trip —
this is intentionally on hold, not a bug.**

**4. "Everywhere I've Been" map — done, confirmed working.**
Interactive Leaflet.js map (`#map` section) with one pin per country
visited (Dubai, Addis Ababa, Macao, Liège, Madrid, Bogotá), each
popup linking to that location's gallery entry via anchor ids
(`entry-dubai`, `entry-addis`, etc. — added to the first entry-card per
city). Tiles from OpenStreetMap, no API key.
**Bug that shipped and was fixed:** the Leaflet CSS/JS `integrity` (SRI)
hashes were originally typed from memory instead of verified, so they
didn't match the real files and the browser silently blocked both from
loading — map rendered as an empty bordered box, no console-visible
error. Fixed by pulling the exact hashes from Leaflet's own
leafletjs.com download page and switching to their recommended unpkg
URLs. Also added `map.invalidateSize()` ~300ms after init as a general
safety net for container-sizing race conditions. **Confirmed fixed** —
Aman screenshotted the live map showing tiles and all 6 pins rendering
correctly after the fix deployed. **Lesson logged:** never hand-type an
SRI hash from memory again — pull it from the library's own docs or
omit `integrity` entirely.

**5. Visa/logistics post — scaffolded, `posts/dubai-visa-logistics.html`.**
Same standalone-page pattern as the cost post. The general visa-checking
guidance (passport validity, eVisa/visa-on-arrival eligibility varies by
nationality, proof of onward travel, travel insurance) is real, verified
guidance — the two official links in it (UAE's `icp.gov.ae`, Ethiopia's
`evisa.gov.et`) were confirmed as genuine official government domains
via search before being added, not assumed. Aman's actual visa
type/process, packing list, and flight/immigration/transfer experience
are marked placeholder, same honest approach as the cost post.

**6. Newsletter / "New Stop Alerts" capture — done, live.** A sidebar
widget (`#newsletter`, "Subscribe" in nav) plus a full `subscribe.html`
page, both submitting to a real Formspree endpoint
(`https://formspree.io/f/xwlkynek`, wired 2026-09-09, see the "Formspree
wiring" entry below). Both forms redirect back via `_next` on submit and
`site.js` shows a `.form-success` message in place of the form when
`?sent=1` is present — re-verified this whole flow end-to-end with a
scripted test on 2026-09-11 (query param → success message shown, form
hidden) and it's working correctly on both `subscribe.html` and
`contact.html`.

**Monetization plan (from the planning conversation, still mostly
open):** affiliate links (Booking.com/Expedia, GetYourGuide/Viator,
Amazon Associates, Airalo, SafetyWing) need their own account signups
before real links can go in — none created yet. Display ads intentionally
on hold until GoatCounter shows real traffic (Ezoic needs 250K monthly
users; Media.net/AdSense have no real minimum and are the fallback).
YouTube compilation not started. Print-on-demand/consulting/sponsorships
are longer-term, no action taken.

**Deferred by explicit request — Instagram/TikTok clip pushes.** Not
started; picking mini-clips from `assets/videos/` and posting as
Reels/Shorts was one of the five original content-expansion ideas but
is on hold until a future session.

**Net status of the 5 original content-expansion ideas (updated
2026-09-11):** analytics ✅ done, SEO/AI ✅ done, map ✅ done,
cost-breakdown post ⏸ scaffolded (still needs next-trip data — see
`TRIP_COST_QUESTIONS.md`, nothing to do until there's a next trip to
log), visa/logistics post ⏸ scaffolded (still needs Aman's real
answers — the page/structure is done, placeholders remain), newsletter
✅ done and live (Formspree account + form ID were set up, redirect +
confirmation flow re-verified working), social pushes ⏸ not started
(deferred, per above).

## "Everywhere I've Been" map — done

A new full-width section (`#map`, between "The Journey" and the main
two-column container) shows an interactive Leaflet.js map with one pin
per country visited so far (Dubai/UAE, Addis Ababa/Ethiopia, Macao,
Liège/Belgium, Madrid/Spain, Bogotá/Colombia). Uses:
- **Leaflet** (via cdnjs) for the map itself, no API key needed.
- **OpenStreetMap** tiles (free, standard attribution included in the
  map per their license — don't remove the attribution link).
- Each pin's popup has a "See photos →" link that jumps straight to that
  location's first entry-card in the gallery below. To make this work,
  the first `entry-card` for each city now has an `id` attribute
  (`entry-dubai`, `entry-addis`, `entry-macao`, `entry-liege`,
  `entry-madrid`, `entry-bogota`) — keep these ids if entry-cards get
  reordered or added to.
- Map auto-fits its zoom/bounds to show all pins (`fitBounds`), so
  adding a new country pin later doesn't require manually recalculating
  the view.
- `scrollWheelZoom` is disabled so the map doesn't hijack page-scroll
  when a visitor scrolls past it.
- A "Map" nav link was added between Journey and About.

**To add a new stop later:** add an object to the `stops` array in the
map-init `<script>` at the bottom of `index.html` (name, lat, lng, and
the anchor id of that location's entry-card), and make sure that
entry-card has the matching `id`.

**Bug found and fixed:** the map shipped blank (empty bordered box, no
tiles, no pins) — the Leaflet CSS/JS `integrity` (SRI) hashes originally
used were fabricated from memory rather than verified, so they didn't
match the real cdnjs files and the browser silently blocked both the
stylesheet and script from loading (no console-visible error to the
end user, just nothing rendering). Fixed by switching to unpkg's
Leaflet 1.9.4 CDN links with the exact `integrity` hashes published on
leafletjs.com's own download page — verified by fetching that page
directly rather than trusting memory a second time. Also added a
`map.invalidateSize()` safety call ~300ms after init, since Leaflet
maps can occasionally render blank tiles if the container's final size
isn't settled at creation time. **Lesson for next time:** never hand-type
an SRI hash from memory — either omit `integrity` entirely or pull the
exact string from the library's own docs/page first.

## Logistics/visa post — done (second content post, scaffolded)

`posts/dubai-visa-logistics.html` is live, same standalone-page pattern
as the cost-breakdown post (own SEO tags, `Article` structured data,
GoatCounter, links back home). Linked from a second card in the "From
the Blog" section.

**What's real vs. placeholder:** the general visa-checking guidance
(check passport validity, confirm eVisa/visa-on-arrival eligibility for
your specific nationality, proof of onward travel, travel insurance) is
genuine, verified advice — sourced from the actual official government
portals: UAE's ICP (`icp.gov.ae`) and Ethiopia's e-Visa portal
(`evisa.gov.et`), both confirmed as real via search rather than assumed.
The post includes a visible warning box telling readers visa rules
change by nationality and to verify against those official sites before
booking anything non-refundable — this is not a "trust this post"
guide, it's a "here's where to check" guide.

**What's still placeholder:** Aman's actual visa type/process for this
specific trip, the real packing list, and the actual flight/immigration/
Marina-transfer experience — none of that was fabricated; it's marked
in gold italic same as the cost post, waiting on his input.

## Repo mechanics worth knowing

- Deploys happen automatically on push to `main` via `.github/workflows/pages.yml` — don't reintroduce the old manual "Settings → Pages → pick a branch" flow described in the original README; that's been superseded.
- Image asset naming convention: `assets/photoN-<slug>-<width>.<jpg|webp>`, originals at `assets/originals/photoN-<slug>.jpg`. Keep this pattern if adding more gallery photos so `index.html`'s `srcset` stays predictable.
- The site no longer presents itself as a "mock" — copy and framing should stay real/first-person going forward.

## Home page redesign + reverting to solo-Aman framing (this session)

The multi-page split (see SITE_RESTRUCTURE_NOTES.md) had left `index.html`
feeling thin — the "Journey / Photos / Posts" section was just three text
link-cards with an emoji, no actual content. Replaced it with real
previews pulled from existing assets:

- **The Journey preview**: a `.journey-strip` (same lazy-load markup/CSS as
  `journey.html`) with 6 hand-picked clips spanning both trips (Addis
  takeoff, Dubai landing, Marina at night, Bukchon alley, Namsan approach,
  Namsan love locks), linking to the full `journey.html`.
- **Photos preview**: a new `.mini-photo-grid` (3-col responsive grid,
  new CSS) showing one real photo per remaining country (Dubai, Seoul,
  Addis, Macao, Madrid, Liège — Bogotá already covered by the sidebar
  Snapshot widget), each linking to that place's anchor on `gallery.html`.
- **Map preview**: the same Leaflet map/pins from `map.html`, embedded
  directly on the home page in a shorter "compact" variant
  (`.map-section.compact`, 260px instead of 420px) with a link to the
  full interactive map. Needed adding Leaflet's CSS/JS includes to
  `index.html`'s `<head>`/body (previously only on `map.html`);
  `js/site.js`'s map-init IIFE is generic (guards on `#travel-map`
  existing) so it works unmodified on both pages.
- Posts wasn't given a full preview section (no video/photo asset to
  show) — kept as a single slim text line ("Also on the site: ...")
  linking to `posts.html` instead of a card.

**Reverted the "group of friends" framing back to solo Aman**, per
explicit request — this undoes the "Reframing as a group blog" part of
the previous restructure session (Mike/Rodi are no longer named
anywhere): "Meet the Travelers" sidebar/about-page widgets are back to
a single "Meet Aman" bio, the Seoul/Dubai journey-intro bylines and
gallery entry-card bylines attributing those trips to Rodi/Mike now
read as Aman's, JSON-LD `author` on every page is a single Person
(Aman) instead of an array of three, and the footer disclaimer /
welcome copy / meta descriptions no longer say "group of friends" or
name Mike/Rodi. Historical progress logs (`TRIP_DUBAI_PROGRESS.md`,
`TRIP_KOREA_PROGRESS.md`, `SITE_RESTRUCTURE_NOTES.md`) were left as-is
since they're a record of what happened in past sessions, not live
site copy.

## Follow-up: kept the "few friends" framing, still unnamed (this session)

Adjusted the previous solo-Aman revert per feedback: the site should still
say Aman travels with a few friends sometimes — that part was accurate and
should stay — but those friends should never be named individually (no
Mike/Rodi anywhere, on the record from the earlier session's request).
Updated the welcome blurb, the "Meet the Travelers" widget/section
(reverted the heading from "Meet Aman" back to "Meet the Travelers", but
now with a single unattributed paragraph instead of the old three-person
list), and the footer disclaimer to say "sometimes joined by a few friends
along the way" without naming anyone. JSON-LD `author` stays as just Aman
(schema.org expects named persons, and the friends aren't named).

## Disclaimer wording, copy de-duplication, and new "Aman Approved" widget (this session)

- Dropped "personal" from the footer disclaimer ("This is Aman's travel
  blog..." instead of "...Aman's personal travel blog...") per request.
- Footer disclaimer also now leaves room for future monetization: added
  "Some posts may include sponsored content or affiliate links — these
  will always be clearly marked as such." before the existing
  not-affiliated-with-any-business line, since sponsorships/affiliate
  products are planned.
- The home-page Welcome blurb and the sidebar "Meet the Travelers" widget
  used to say almost the same thing (both explaining that Aman travels
  with friends sometimes). Reworded them to cover different ground:
  Welcome now describes what the site offers (photos/clips/cost & visa
  notes), the widget covers who's behind it (Aman does the writing,
  friends sometimes tag along — still unnamed).
- Checked the full git history (all 31 commits) for any prior "Aman
  Approved" card/widget — never existed in this repo, so it wasn't
  something removed by accident. Built a new `.approved-widget` sidebar
  component (CSS + markup, added after the Snapshot widget on every
  sidebar page: index/about/gallery/posts/subscribe/contact) as a home
  for future gear/service recommendations and affiliate picks. Currently
  ships with a single "Coming soon" placeholder list item and a note
  that it may carry affiliate links later, marked clearly when it does.
  **To use it**: replace the placeholder `<li>` in each page's
  `.approved-list` with real `<strong>Name</strong><span>why it's
  recommended, optionally with a link</span>` entries once there's an
  actual product/service to feature — same block is duplicated across
  6 files (no shared include, same as nav/footer), so update all of
  them together.

## SEO/AEO sync + mobile nav fix + domain-migration prep (this session)

Picked this up mid-restructure and found `sitemap.xml` and `llms.txt` had gone
stale after the single-page → 8-page split: both still only listed the old
3-URL set (home + 2 posts), missing `journey.html`, `map.html`, `about.html`,
`gallery.html`, `posts.html`, `subscribe.html`, `contact.html`. Search engines
and AI crawlers reading either file would have no idea 7 of the site's 10
pages exist. Fixed:

- **`sitemap.xml`**: now lists all 10 pages with sensible `changefreq`/
  `priority` (gallery/home weekly since they grow, posts yearly since old
  posts don't change, subscribe/contact low priority).
- **`llms.txt`**: rewritten to describe the current 8-page structure instead
  of the old single-scroll layout, and to reflect current framing (Aman +
  unnamed friends, not solo/not the group-with-names version).
- Per-page SEO (canonical, OG, Twitter Card, JSON-LD) was already correct on
  every page — this wasn't broken, just the two crawler-discovery files.

**Mobile nav was broken**: `.nav-links` had no `@media` handling at all — 7
links plus the logo in one `display:flex` row with no wrap would overflow or
crush together on phone widths. Added a CSS-only hamburger toggle
(`.nav-toggle`, no icon font/JS library) that collapses `.nav-links` into a
dropdown under 768px, plus a small `site.js` IIFE (guarded, safe on every
page) to open/close it and auto-close on link tap. Applied to all 8 shared-
layout pages; the two standalone post pages only have a 3-link nav and don't
need it.

**Domain migration**: no config was in place for this (58 hardcoded
`teredatrades.github.io/Amanstravels` URLs across canonical/OG/Twitter/
JSON-LD/sitemap/robots/llms.txt — expected for a static site with no build
step). Added `scripts/set-domain.sh <newdomain.com>` — a one-command sed pass
that swaps every occurrence and writes the `CNAME` file GitHub Pages needs.
Doesn't touch DNS or GitHub Pages settings (those are manual, see the
script's header comment) — just makes the code-side swap a single command
instead of a manual find/replace across 10+ files.

**Ads**: no ad infrastructure exists yet (no AdSense, no ad-slot markup) —
confirmed via repo-wide search. The footer disclaimer already has language
reserved for "sponsored content or affiliate links" from an earlier session,
but that's copy, not a slot. Not added anything here since there's no ad
network/product picked yet — flagging so it's not mistaken for done.

## Sidebar-overflow fix confirmed + cache-busting added (same session)

Confirmed the min-width:0 fix actually resolves the overflow — measured
`document.documentElement.scrollWidth` vs `clientWidth` in a headless
render at 1512/1280/1060/900px, all came back with 0px difference (was
previously wider than the viewport, which is what pushed the sidebar
off-screen). The GitHub Actions deploy for that fix also completed
successfully. If it's still not visible after a real deploy, it's a
browser/CDN cache issue, not a live bug — hard refresh (Ctrl/Cmd+Shift+R)
clears it.

To stop that exact confusion from recurring: added `?v=<short-commit-sha>`
to every page's `css/style.css` and `js/site.js` link/script tag (all 8
shared-layout pages). Browsers treat a changed query string as a new file,
so this forces a fresh fetch whenever either file actually changes instead
of serving a stale cached copy.

**Maintenance note**: since there's no build step, this version string is
static text and needs a manual bump. **Whenever `css/style.css` or
`js/site.js` changes, update the `?v=` value on all 8 pages to the new
commit's short SHA** (`git rev-parse --short=8 HEAD` after committing) —
otherwise this doesn't do anything. Worth automating in the GitHub Actions
workflow later (e.g. a build step that stamps the current SHA in) if this
becomes a chore.

## Ad slots scaffolded (not live) + Formspree walkthrough given (same session)

Per the user: no ad network chosen yet, just wants the option ready to flip
on later without redesigning anything.

- **`.ad-slot` CSS component** added to `css/style.css` (two variants:
  `.ad-slot--sidebar`, roughly a 300x250 medium-rectangle footprint;
  `.ad-slot--content`, a 728px-max in-content banner) plus the same rules
  duplicated into both post pages' inline `<style>` blocks (they don't share
  `css/style.css` — same pattern as everything else in those two files).
- **Placement markup added but commented out** on all 6 sidebar pages
  (index/about/gallery/posts/subscribe/contact — right after the "Aman
  Approved" widget) and both post pages (before the final section). Nothing
  renders until the HTML comment is removed.
- **To activate a slot**: uncomment the `<div class="widget ad-slot
  ad-slot--sidebar">...</div>` (or `ad-slot--content` for posts) and paste
  either an ad network's unit/script code, or an affiliate banner
  `<a><img></a>`, in place of the placeholder `<span class="ad-label">`.
  Same duplication caveat as nav/footer — no shared include, so do this on
  every page a slot should appear on.
- **`ads.txt`** added at repo root, comments-only for now — needed by
  networks like AdSense once one is chosen; the file itself is safe to ship
  empty/comment-only in the meantime.
- **Formspree**: still not wired up (user doesn't have a form ID yet) —
  walked them through creating one. Once they send the ID, replace
  `YOUR_FORM_ID` in `subscribe.html` and `contact.html` (see
  SITE_RESTRUCTURE_NOTES.md's existing Formspree section for the full
  detail — one shared form ID, both pages, distinguished by a hidden
  `_subject` field).

## Formspree wired up + post-submit confirmation (same session)

User created a Formspree form and sent the ID (`xwlkynek`). Wired it into
both `subscribe.html` and `contact.html` (shared form, told apart by the
existing hidden `_subject` field — this was already built for that, just
needed the real ID).

Also closed the `_next` open item noted in SITE_RESTRUCTURE_NOTES.md: added
a hidden `_next` field on both forms pointing back to the same page with
`?sent=1`, plus a `.form-success` banner + `site.js` check that swaps the
empty form out for a confirmation message when that flag is present.

**Bug caught in my own first pass**: setting the `hidden` attribute via JS
didn't actually hide `.site-form`, because the class's explicit
`display:flex` beat the browser's default `[hidden]{display:none}` in the
cascade (author styles always win over the user-agent stylesheet regardless
of specificity). Fixed with an explicit `.site-form[hidden]{display:none}`
rule. Verified with a local render before pushing: banner shows, form
hides, no overflow/layout issues.

Bumped the `?v=` cache-busting tag on all 8 pages to this session's commit
SHA per the convention noted earlier — both deploys confirmed successful
via the Actions API.

## Rotating Snapshot widget (same session)

Per the user: wanted the sidebar "Snapshot" widget photo to change every
couple of days instead of being permanently pinned to the Bogotá padlock
fence photo. Since this is a static site with no backend/database, did it
client-side in `site.js`: a curated pool of 15 photos (one or two per trip,
skipping `photo12` — the cable-car ticket close-up, not really a "snapshot"
in the same style) with alt text and captions pulled from `gallery.html`.

**Rotation logic**: `Math.floor(daysSinceEpoch / 2) % pool.length` — picks
by date, not randomly, so it changes every 2 days and every visitor sees
the same photo on a given day (no flicker/inconsistency on reload). The
HTML markup is untouched and still ships with the original Bogotá photo
hardcoded — that's the no-JS/crawler fallback; the script swaps it out
after load. Runs on all 6 pages that have the sidebar (same `.snapshot-widget`
selector everywhere).

Verified by mocking the browser's `Date` forward 2 days in a headless
render and confirming the pick changed. To change the rotation cadence,
edit `ROTATE_EVERY_N_DAYS` near the top of that block in `js/site.js`. To
add/remove photos from the pool, edit the `photos` array in the same block
— each entry needs `slug` (matching the `assets/photoN-slug` naming
convention), `sizes` (which width variants actually exist — most trip
photos go up to 1600, the four newest Seoul ones only to 800), `alt`, and
`caption`.

## Sidebar "Meet the Travelers" bio rewrite (2026-09-10)

Rewrote the `<p>` inside the sidebar "Meet the Travelers" widget on the 5
pages that have it (`index.html`, `posts.html`, `gallery.html`,
`subscribe.html`, `contact.html`) — was "Aman does most of the traveling
and all of the writing, sometimes with a friend or two tagging along for
the ride." Now frames the site as a small group of friends who travel
together and separately, with Aman doing most of the traveling and
everyone contributing writing for their own trips.

Note: `about.html` has its OWN, differently-worded "Meet the Travelers"
section in the main content area (not the sidebar widget) — left that one
untouched since it wasn't part of this request. Flag if it should be
brought in line with the new wording too.

No shared template/partial for the sidebar — each page carries its own
copy of the markup, so this had to be a 5-file find-and-replace.

## "Meet the Travelers" — shared template + landing-page-only (2026-09-10, follow-up)

Follow-up to the bio rewrite above, per user request:

1. **Made it a shared template.** This is a static site with no build step
   (see SITE_RESTRUCTURE_NOTES.md), so there's no server-side/build-time
   include. Went with the same pattern already used for the rotating
   Snapshot widget: the markup now lives in ONE place, a guarded IIFE in
   `js/site.js` that injects the widget's HTML into
   `<div id="meet-travelers-widget"></div>` on load. Edit the bio copy in
   `js/site.js` going forward, not in page markup. To reuse the widget on
   another page later, just add that placeholder div to its sidebar —
   `site.js` is already loaded on every page and the IIFE is a no-op where
   the placeholder isn't present.
2. **Landing-page only.** Removed the widget entirely (markup + placeholder)
   from `posts.html`, `gallery.html`, `subscribe.html`, `contact.html`. It
   now only renders on `index.html`.
3. **Updated `about.html`.** Its "Meet the Travelers" section is separate,
   full-content prose (not the sidebar widget — see SITE_RESTRUCTURE_NOTES.md
   for why it's split out), so it wasn't touched by the shared-template
   change. Reworded its paragraph to match the new sidebar copy for
   consistency across the site.

Verified with a quick jsdom render: widget injects correctly on
`index.html`, and the placeholder/widget markup is absent (correct no-op)
on the other 4 pages and on `about.html`.

## Retired the "Travel with Aman. Travel in Peace." catchphrase (2026-09-10)

Per user request: swapped the site-wide tagline for "The Road Is Better
Shared." — fits the group-of-friends framing better than the old
Aman-only phrasing. Updated everywhere it appeared:

- The `.tagline` line in every page's footer (11 pages, incl. the two
  standalone `posts/` pages) and the homepage hero subtitle.
- `index.html`'s `<title>`, `og:title`, `twitter:title`, and JSON-LD
  `name` also used "Aman's Travels — Travel in Peace" as the homepage's
  SEO title suffix — updated those to "Aman's Travels — The Road Is
  Better Shared" to match. No other page's title tags referenced the old
  phrase.

User picked the replacement from a shortlist of options I offered.

## Session summary — 2026-09-10 (this session, all of the above)

Picked this up mid-restructure with a fresh GitHub PAT from the user (their
own token, used for this session's commits only — not stored anywhere).
Three separate asks, done in order, each committed/pushed separately so
they're easy to revert individually if needed:

1. **Sidebar bio rewrite.** User wanted the "Meet the Travelers" sidebar
   text changed from Aman-solo phrasing ("Aman does most of the traveling
   and all of the writing...") to something that reflects the group-blog
   reframing already underway (see "Reframing as a group blog" above) —
   friends who travel and document together, with Aman still doing most of
   the actual traveling. Offered a tightened version of the user's draft;
   they approved. Applied to all 5 pages that had the widget at the time
   (`index`, `posts`, `gallery`, `subscribe`, `contact`).

2. **Shared template + landing-page-only.** Follow-up ask: (a) stop
   duplicating the widget's HTML across pages — make it a single source of
   truth, and (b) only show it on the homepage, not the 4 inner pages.
   Since this is a static site with no build step, "shared template" means
   a JS-injected partial (same pattern as the Snapshot widget rotation):
   the markup now lives once in `js/site.js` and injects into
   `<div id="meet-travelers-widget">`, which now only exists in
   `index.html`. Removed the widget's markup entirely from the other 4
   pages. Also updated `about.html`'s separate, full-prose "Meet the
   Travelers" section to match the new wording, since the user asked for
   that page to be brought in line too. Verified all of this with a
   scripted jsdom render (widget appears on the homepage, is a correct
   no-op everywhere else) before pushing. Bumped the site-wide `?v=`
   cache-busting tag afterward, since this changed shipped JS behavior.

3. **Tagline swap.** User wanted the "Travel with Aman. Travel in Peace."
   catchphrase gone, since it's Aman-solo phrasing and the site no longer
   is. Brainstormed options with the user (two rounds) rather than picking
   unilaterally, since a site-wide tagline is a branding call. They landed
   on "The Road Is Better Shared." — replaced in the footer on all 11
   pages (incl. the 2 standalone `posts/` pages) and the homepage hero,
   plus `index.html`'s `<title>`/`og:title`/`twitter:title`/JSON-LD `name`,
   which had baked the old phrase in as the homepage's SEO title suffix.
   Pure text change, no `?v=` bump needed (matches the convention already
   used for content-only edits vs. CSS/JS changes).

**Still open / worth knowing for next time:**
- Everything from the prior "Open items" list above (Formspree form ID,
  `_next` redirect, standalone posts not using the shared CSS vars) is
  still open — untouched this session.
- If the widget ever needs to come back on an inner page, it's now a
  one-line add (`<div id="meet-travelers-widget"></div>` in that page's
  sidebar) rather than a markup copy-paste.
- `about.html`'s "Meet the Travelers" prose and the sidebar widget's copy
  are intentionally kept in sync by hand (no shared source between them,
  since they live in different places for different reasons) — if the
  bio changes again, both spots need editing.

## Session — 2026-09-11: post-page CSS consolidation, 404 page, map a11y

Picked this up with a fresh GitHub PAT from the user. Important context for
next time: a prior session had reportedly done most of this work
(post-page stylesheet conversion, an accessibility pass, and was
mid-build on a 404 page) but got cut off before committing anything — and
since that session's working directory wasn't persisted anywhere, none of
it actually existed in the repo. Cloned fresh, confirmed the working tree
matched the last real commit (nothing pending), and redid the work
against the actual current state rather than assuming the described work
was there. **Lesson for future sessions: uncommitted work doesn't survive
between sessions — commit and push incrementally rather than batching a
long list of changes for one big commit at the end.**

Four commits, each independently revertable:

1. **Post pages onto the shared stylesheet.** `posts/dubai-trip-cost-breakdown.html`
   and `posts/dubai-visa-logistics.html` no longer duplicate `:root` vars +
   ~90 lines of inline CSS each — that now lives once in `css/style.css`,
   scoped under `main.post-page-main`, `.post-article`, `.post-header` /
   `.post-kicker` / `.post-meta` / `.post-intro`, `table.cost-table`,
   `.note-box` / `.warn-box`, `.checklist`, `.back-link`. None of these
   names collided with anything already in the shared stylesheet or other
   pages — checked before adding. Files went from 237/244 lines to ~150
   each. Caught a real bug while doing this: the shared stylesheet's
   mobile-nav CSS hides `.nav-links` under 768px unless a `.nav-toggle`
   button is present, and neither post page had one — their nav would've
   been invisible on mobile once `css/style.css` was linked. Added the
   toggle button (and the `js/site.js` script tag, which already handles
   it) to both. Verified the toggle actually works with a scripted jsdom
   test (injected `site.js`, dispatched a click, confirmed `.nav-links`
   got the `.open` class and `aria-expanded` flipped to `true`) on both
   files before committing.
2. **404 page.** `404.html`, matching the `.page-header` pattern used on
   every inner page (nav, header, footer). GitHub Pages serves this
   automatically for unmatched paths on a project site — no config
   needed. `noindex`'d.
3. **Map accessibility fallback.** `map.html`'s Leaflet map had no
   accessible fallback — screen readers / no-JS crawlers just saw an
   empty div. Added `aria-label` on the map container and a
   visually-hidden (`.sr-only`, new utility class) text list of all 7
   stops linking to their gallery entries. Verified all 7 anchor IDs
   (`#entry-korea`, `#entry-dubai`, etc.) exist in `gallery.html` before
   wiring the links — they did. Also re-ran the alt-text / form-label /
   heading-structure checks sitewide while in here: all clean (alt text
   present on every real `<img>`, the only "missing" hits were inside
   HTML comments; form labels correctly `for`-associated on both forms;
   exactly one `<h1>` per page across all 10 HTML files). No changes
   needed for any of that.
4. **Cache-busting bump to `?v=abb0a1a4`** across every page that
   references `css/style.css` or `js/site.js`, since this session changed
   both.

**Still open:**
- Everything in SITE_RESTRUCTURE_NOTES.md's "Open items" except the
  post-page CSS duplication, which is now resolved.
- The post pages' nav only has 3 links (Home/Posts/Contact) vs. the
  7-link nav on every other page — left as-is since it predates this
  session and expanding it wasn't part of this ask, but worth asking the
  user about if a full-nav pass ever happens.

## Session — 2026-09-11 (continued): status check-in on the content plan

User asked for a status re-check on the open items from the monetization/
content plan, plus two fixes. Findings:

- **Formspree redirect — confirmed already working**, contrary to the
  worry it might still be a placeholder. Real form ID (`xwlkynek`), `_next`
  redirect, and the `?sent=1` confirmation-message flow are all live on
  both `subscribe.html` and `contact.html` — re-verified with a scripted
  test simulating the post-submit redirect. See corrected "Newsletter"
  entry above (was previously logged as still needing an account; that
  was stale).
- **Post-page nav fixed** — see the separate commit; the 3-link nav was a
  restructure-era leftover, now matches the site's 7-link nav everywhere.
- **Content-plan status, item by item:**
  - Cost-breakdown post: still genuinely stalled on real Dubai spend data
    (confirmed those numbers were never tracked at the time and can't be
    backfilled — see `TRIP_COST_QUESTIONS.md`). Nothing to build here
    until there's a next trip to log numbers for.
  - Visa/logistics post: exists and is structurally complete
    (`posts/dubai-visa-logistics.html`); the open placeholders are Aman's
    own answers (visa type actually used, packing list, route
    experience) — a content-fill task, not a code task. Dubai/Seoul are
    still the only two trips with any content on the site — no second
    trip's worth of material is queued anywhere in the repo.
  - Affiliate signups (Booking.com, GetYourGuide, Amazon Associates,
    Airalo, SafetyWing): still un-created, still can't be done without
    Aman's own account creation. Can draft post copy/placement around
    them whenever there's a real link to drop in.
  - Custom domain: re-tested `scripts/set-domain.sh` end-to-end on a
    scratch copy of the repo (ran it against `example.com`) — it
    correctly rewrites all 14 canonical/OG/sitemap/robots/llms.txt
    references, strips the `/Amanstravels` path segment for the
    custom-domain case, and writes `CNAME`. Confirmed ready; still
    blocked on picking a domain + manual DNS/GitHub Pages settings.
  - Traffic check-in: could not check real GoatCounter numbers this
    session — no login credentials for the dashboard, and
    `amanstravels.goatcounter.com` isn't set up with a public stats page
    (would need to opt into that in GoatCounter's settings, or Aman
    shares a screenshot/export). Worth doing before any display-ad
    decision, as previously noted.
