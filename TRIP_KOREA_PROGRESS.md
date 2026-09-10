# Seoul Trip — Progress Notes

Follows the same pattern established in `TRIP_DUBAI_PROGRESS.md`. Aman sent a batch of raw phone
photos/videos from a day in Seoul; this file tracks what's been received/processed so a future
session can pick up mid-trip if needed.

## Batches received so far

**All 3 batches received — trip complete.**

**Batch 3** (2 photos + 3 videos):
- Photo: N Seoul Tower with the cable car crossing overhead, seen from below near the lower station,
  with a yellow ginkgo tree in the foreground (`photo16`) — a near-duplicate pair was sent
  (`IMG-20260908-WA0013.jpg` and `IMG-20260908-WA0017.jpg`); used WA0013, better framed
- Video `VID-20260908-WA0031.mp4` (8.4s) — summit love-lock fence, close-up
- Video `VID-20260908-WA0032.mp4` (18.6s) — more love locks with the city view and observation deck
  stairs behind
- Video `VID-20260908-WA0028.mp4` (7.4s) — the summit observation deck, full Seoul skyline panorama
  — **this file's raw pixel content is sideways with no rotation metadata** (WhatsApp likely stripped
  it); fixed with `transpose=2` (90° counter-clockwise) before scaling — confirmed visually, don't
  redo this rotation if this file is ever touched again

**Batch 2** (3 photos + 5 videos):
- Photo: Bukchon rooftops with N Seoul Tower visible on its hill in the distance (`photo13`)
- Photo: Myeongdong souvenir stall wall of squishy bread/cat-shaped toys in mesh bags (`photo14`) —
  matches the subject of video `VID-20260908-WA0018_1_.mp4` below
- Photo: cup of spicy instant noodles held up at the Namsan Tower summit plaza (`photo15`) — this is
  the first shot actually taken at the summit itself, everything else in batches 1–2 is on the way up
- Video `VID-20260908-WA0023.mp4` (4.8s) — Bukchon, close-up of a hanok's wooden veranda and
  latticed sliding doors
- Video `VID-20260908-WA0030_1.mp4` (12.6s) — Bukchon, a quieter street with the city's mountains
  rising behind the rooftops
- Video `VID-20260908-WA0018_1_.mp4` (4.8s) — Myeongdong, the same squishy-souvenir stall as photo14
- Video `VID-20260908-WA0019.mp4` (5.4s) — Myeongdong, a Nike storefront with a large yellow tumbler
  decoration out front
- Video `VID-20260908-WA0020.mp4` (7.3s) — the Namsan Cable Car itself, POV of the car climbing the
  incline through the park — pairs directly with the batch-1 ticket photo

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

Batch 2 videos, same treatment:

| Output file | Source | Story beat | Treatment |
|---|---|---|---|
| `clip15-bukchon-hanok-interior.mp4` | `VID-20260908-WA0023.mp4` | 1. Bukchon | full 4.8s, no trim |
| `clip16-bukchon-mountain-view.mp4` | `VID-20260908-WA0030_1.mp4` | 1. Bukchon | trimmed to 8s of 12.6s |
| `clip17-myeongdong-souvenirs.mp4` | `VID-20260908-WA0018_1_.mp4` | 2. Myeongdong | full 4.8s, no trim |
| `clip18-myeongdong-storefront.mp4` | `VID-20260908-WA0019.mp4` | 2. Myeongdong | full 5.4s, no trim |
| `clip19-namsan-cablecar-ascent.mp4` | `VID-20260908-WA0020.mp4` | 3. Namsan Tower | full 7.3s, no trim |

Batch 3 videos, same treatment (all Namsan/summit, appended to the end of the Namsan section, right
after the cable-car-ascent clip and before the "coming soon to YouTube" placeholder):

| Output file | Source | Story beat | Treatment |
|---|---|---|---|
| `clip20-namsan-locks.mp4` | `VID-20260908-WA0031.mp4` | 3. Namsan Tower | trimmed to 8s of 8.4s |
| `clip21-namsan-deck.mp4` | `VID-20260908-WA0032.mp4` | 3. Namsan Tower | trimmed to 8s of 18.6s |
| `clip22-namsan-panorama.mp4` | `VID-20260908-WA0028.mp4` | 3. Namsan Tower | full 7.4s, rotated 90° CCW first (see note above), no trim |

**Photo — done.** Ticket photo EXIF-stripped and exported as `photo12-namsan-cable-car-ticket-native`
in JPG + WebP, committed to `assets/`. Batches 2–3's four photos (`photo13`–`photo16`) exported at
480/800 widths in JPG + WebP (native resolution was modest — 821–1280px on the long edge — so no
1600w version, same call as the ticket photo). All five photos wired into their own entry-cards at
the top of the `index.html` gallery (ahead of the Dubai entry). Hero status badge, journey section,
and sidebar bio/meta descriptions updated to reflect Seoul as the most recent stop.

**Site integration — done, trip complete.** Extended the existing "The Journey" section (built for
Dubai) rather than creating a new one: added a second `journey-intro` line
("🇰🇷 Seoul, South Korea — ...") and a second `.journey-strip` directly below the Dubai strip. Clips
from batches 2 and 3 were woven into this same strip at their narrative point rather than appended at
the end — e.g. the cable-car-ascent clip sits right after the Namsan-base clip, and batch 3's three
summit clips (love locks ×2, panorama) close out the strip right before the "coming soon to YouTube"
placeholder — so the whole thing reads as one continuous story (16 clips total) rather than
"batch 1, then batch 2, then batch 3". Same lazy-load approach as Dubai (`IntersectionObserver`,
`data-src`, muted/loop/playsinline) — no changes needed to the JS since it already selects all
`.journey-card video[data-src]` regardless of which strip they're in.

## Not yet done / open items

- Trip is complete as of batch 3 — no more Korea batches expected unless Aman says otherwise.
- YouTube full-length compilation — not started for this trip.
- The gallery entry-card grid is still a single long scrolling column — the user has flagged that
  this should be revisited/restructured as more trips are added (see `PROJECT_NOTES.md` /
  `amans-travels-site` memory notes). Not addressed in this session. This trip alone added 5
  entry-cards, all currently un-collapsed at the top of the grid — this is probably the best trip to
  use as the test case when that restructuring work happens, since it's the largest single trip so far.
- Custom-domain item from `PROJECT_NOTES.md` still open, unrelated to this trip.
