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

**6. Newsletter / "New Stop Alerts" capture — scaffolded, needs an account.**
A new sidebar widget (`#newsletter`, "Subscribe" in nav) with an email
input submitting to a Formspree endpoint. **Open item, same shape as
every other account-gated item above:** the form action points at
`https://formspree.io/f/YOUR_FORM_ID` — a placeholder. Someone needs to
sign up at formspree.io (needs an email, can't be done on Aman's
behalf), create a form, and swap `YOUR_FORM_ID` for the real form ID
before this actually captures emails. Until then the form is visually
complete but non-functional — don't advertise it as live.

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

**Net status of the 5 original content-expansion ideas:** analytics ✅
done, SEO/AI ✅ done, map ✅ done, cost-breakdown post ⏸ scaffolded
(needs next-trip data), visa/logistics post ⏸ scaffolded (needs Aman's
input), newsletter ⏸ scaffolded (needs Formspree account), social
pushes ⏸ not started (deferred).

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
