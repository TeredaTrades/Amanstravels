# Dubai Trip Mini-Videos — Progress Notes

Context for whoever (or whichever future session) picks this up: Aman went to Dubai and is sending
raw phone photos/videos in batches to turn into mini videos for the Amanstravels site itself, plus
possibly a longer compilation for YouTube that the site would link to. This file tracks what's been
received, what's been processed, and what's still open — so we can resume even if a chat session
runs out of context/tokens partway through.

## Plan (as discussed)

- Short muted mini-videos live directly on the Amanstravels site (new addition — the site currently
  only has a static photo gallery, see `PROJECT_NOTES.md`).
- Later: a longer/full edit posted to YouTube, with a link from the site to that YouTube video.
- Videos can be freely muted, compressed, cropped, trimmed, color-adjusted — Aman gave blanket
  permission to edit as deemed appropriate for the site.

## Batches received so far

**Batch 1** (4 photos + 3 videos):
- Photo: Marina promenade at dusk, pedestrians/cars, warm sunset glow
- Photo: Marina skyline, blue hour, car passing
- Photo: Marina waterfront with boat + jet skis, reflections — strongest single still, good hero-image candidate
- Photo: in-flight cabin display showing flight stats (distance/altitude/speed/-9°C outside temp) — fun
  "getting there" detail shot; holding back from the public site for now since it's a real device
  screen, but fine for a behind-the-scenes YouTube cut
- Video `20260828_192058_99_1.mp4` (7.8s) — very dark close-up, turned out to be sea foam/waves
  hitting sand at night, only visible once brightened
- Video `20260828_192119_99_1.mp4` (8.9s) — same subject, second angle
- Video `20260829_173921_1.mp4` (12.6s) — plane wing + Dubai airport (Emirates hangars) at takeoff/golden light

**Batch 2** (2 videos):
- Video `20260828_192001_99_1.mp4` (5.8s) — beach shoreline at night with lit-up skyline in the
  background; same beach as the two dark close-ups above, just wider/clearer framing
- Video `20260828_185502_1.mp4` (14.2s) — street-level traffic shot at blue hour near an "EMAAR"
  building, taxis and marina-area skyscrapers behind

**Batch 3** — not yet received. Aman said more mini vids are coming.

## Processing done this session

All 5 videos received so far (batches 1 + 2) have been cropped to a consistent 9:16 vertical frame,
scaled down to 720×1280 for web, muted (no audio track), had metadata stripped, and were committed to
`assets/videos/` in this repo:

| Output file | Source | Treatment |
|---|---|---|
| `clip1-marina-water-night.mp4` | `20260828_192058_99_1.mp4` | trimmed to 3s, brightened/contrast+saturation boosted (was too dark to read otherwise) |
| `clip2-marina-water-night2.mp4` | `20260828_192119_99_1.mp4` | same treatment as clip1 |
| `clip3-beach-skyline-night.mp4` | `20260828_192001_99_1.mp4` | trimmed first 1.2s (was dark/camera still settling), kept remaining ~4.6s, mild brighten/contrast |
| `clip4-marina-street-bluehour.mp4` | `20260828_185502_1.mp4` | trimmed to first 8s of 14.2s, no brightening needed |
| `clip5-takeoff-wing.mp4` | `20260829_173921_1.mp4` | trimmed to first 8s of 12.6s, no brightening needed |

All outputs: H.264, yuv420p, ~720×1280, no audio, `+faststart` for web streaming, crf 26 (small file
sizes, 0.4–2.3MB each — see actual sizes in `assets/videos/`).

The 4 batch-1 photos have **not** been processed or committed yet (no EXIF-strip/resize pass done on
them) — still just sitting in the chat upload, not in this repo. They're strong candidates to extend
the existing 8-photo gallery in `index.html` (see `PROJECT_NOTES.md` for the naming convention:
`assets/photoN-<slug>-<width>.<jpg|webp>`).

## Not yet done / open items

- **Batch 3 videos** — waiting on Aman to send them.
- **Batch 1 photos** — need the same EXIF-strip + multi-width JPG/WebP export treatment as the
  existing 8 gallery photos before they can go in `index.html`.
- **Site integration** — `index.html` doesn't yet have anywhere to embed video. Need to decide: new
  "mini videos" section, or slot clips into the existing entry-card gallery layout alongside stills?
  Nothing built yet — just raw processed clips sitting in `assets/videos/`.
- **Hero image decision** — the marina waterfront boat/jet-ski photo (batch 1) was flagged as the
  strongest still; not yet formally chosen as anything.
- **YouTube full-length compilation** — not started; no footage has been assembled into a longer cut yet.
- Doesn't affect this thread, but note the still-open custom-domain item tracked in `PROJECT_NOTES.md`.
