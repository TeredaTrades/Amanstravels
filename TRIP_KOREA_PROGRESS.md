# Seoul Trip — Progress Notes

Follows the same pattern established in `TRIP_DUBAI_PROGRESS.md`. Aman sent a batch of raw phone
photos/videos from a day in Seoul; this file tracks what's been received/processed so a future
session can pick up mid-trip if needed.

## Batches received so far

**Batch 1** (1 photo + 6 videos):
- Photo: Namsan Cable Car ticket (physical ticket, illustrated with the cable car crossing above
  Namsan Park toward N Seoul Tower) — native resolution only (395×1062, a phone photo of a small
  paper ticket, no benefit to upscaling)
- Video `VID-20260908-WA0033_1_1.mp4` (13.0s) — Bukchon Hanok Village, long alley establishing shot
- Video `VID-20260908-WA0021_1.mp4` (2.5s) — Bukchon Hanok Village, walking the alley, Namsan Tower
  visible in the distance over the rooftops
- Video `VID-20260908-WA0027_1.mp4` (7.5s) — Bukchon Hanok Village, traditional house with a small
  tour crowd gathered outside
- Video `VID-20260908-WA0024_1.mp4` (9.9s) — Myeongdong shopping street, storefronts and traffic
- Video `VID-20260908-WA0034_1.mp4` (6.1s) — approaching Namsan Tower through the park's trees
- Video `VID-20260908-WA0034_2_1.mp4` (12.2s) — at the base of Namsan Tower near the fence/love-locks
  area

Story arc for this batch: Bukchon Hanok Village → Myeongdong → Namsan Tower (climb) → cable car up
(implied by the ticket photo). Order inferred from content/geography, not from file timestamps (none
of the videos had embedded `creation_time` metadata, unlike the Dubai clips).

## Processing done this session

All 6 videos were already vertical (360×640, unlike Dubai's raw landscape source), so no cropping was
needed — just upscaled to the same 720×1280 target, muted, had metadata stripped, and were committed
to `assets/videos/`:

| Output file | Source | Story beat | Treatment |
|---|---|---|---|
| `clip9-bukchon-alley.mp4` | `VID-20260908-WA0033_1_1.mp4` | 1. Bukchon | trimmed to 8s of 13.0s |
| `clip10-bukchon-walking.mp4` | `VID-20260908-WA0021_1.mp4` | 1. Bukchon | full 2.5s, no trim |
| `clip11-bukchon-hanok.mp4` | `VID-20260908-WA0027_1.mp4` | 1. Bukchon | full 7.5s, no trim |
| `clip12-myeongdong-street.mp4` | `VID-20260908-WA0024_1.mp4` | 2. Myeongdong | trimmed to 8s of 9.9s |
| `clip13-namsan-approach.mp4` | `VID-20260908-WA0034_1.mp4` | 3. Namsan Tower | full 6.1s, no trim |
| `clip14-namsan-base.mp4` | `VID-20260908-WA0034_2_1.mp4` | 3. Namsan Tower | trimmed to 8s of 12.2s |

All outputs: H.264, yuv420p, 720×1280, no audio, `+faststart`, crf 26 (1.5–4.2MB each — daytime
handheld footage with more motion than Dubai's night clips, so slightly larger files despite similar
settings — see actual sizes in `assets/videos/`). No brightening needed (all shot in daylight).

**Photo — done.** Ticket photo EXIF-stripped and exported as `photo12-namsan-cable-car-ticket-native`
in JPG + WebP, committed to `assets/`. Wired into a new entry-card at the top of the `index.html`
gallery (ahead of the Dubai entry). Hero status badge, journey section, and sidebar bio/meta
descriptions updated to reflect Seoul as the most recent stop.

**Site integration — done.** Extended the existing "The Journey" section (built for Dubai) rather
than creating a new one: added a second `journey-intro` line ("🇰🇷 Seoul, South Korea — ...") and a
second `.journey-strip` directly below the Dubai strip, with its own 6 clips + its own
"coming soon to YouTube" placeholder card. This establishes the pattern for future trips — each new
trip gets its own intro line + strip pair appended to the `#journey` section. Same lazy-load approach
as Dubai (`IntersectionObserver`, `data-src`, muted/loop/playsinline) — no changes needed to the JS
since it already selects all `.journey-card video[data-src]` regardless of which strip they're in.

## Not yet done / open items

- No more batches expected yet unless Aman sends more from this trip.
- YouTube full-length compilation — not started for this trip either.
- The gallery entry-card grid is still a single long scrolling column — the user has flagged that
  this should be revisited/restructured as more trips are added (see `PROJECT_NOTES.md` /
  `amans-travels-site` memory notes). Not addressed in this session.
- Custom-domain item from `PROJECT_NOTES.md` still open, unrelated to this trip.
