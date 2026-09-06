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

## Repo mechanics worth knowing

- Deploys happen automatically on push to `main` via `.github/workflows/pages.yml` — don't reintroduce the old manual "Settings → Pages → pick a branch" flow described in the original README; that's been superseded.
- Image asset naming convention: `assets/photoN-<slug>-<width>.<jpg|webp>`, originals at `assets/originals/photoN-<slug>.jpg`. Keep this pattern if adding more gallery photos so `index.html`'s `srcset` stays predictable.
- The site no longer presents itself as a "mock" — copy and framing should stay real/first-person going forward.
