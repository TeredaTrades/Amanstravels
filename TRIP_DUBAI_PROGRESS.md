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

**Batch 3** (3 videos) — completes the trip's story arc. Aman confirmed the whole set of mini-videos
is meant to tell the story: taking off from Bole International Airport (Addis Ababa) → landing in
Dubai → the (short) stay → taking off again from Dubai. Filenames' timestamps confirm the sequence:
- Video `20260827_231105_1.mp4` (23:11, Aug 27; 15.3s) — **Addis takeoff.** Runway/airport lights
  streaking past below the wing as the plane climbs away.
- Video `20260828_025920_1.mp4` (02:59, Aug 28; 10.8s) — **Dubai descent.** Wing silhouette against a
  glowing night horizon, city lights below — moodier/darker shot, needed the most brightening of the three.
- Video `20260828_030504_1.mp4` (03:05, Aug 28; 7.8s) — **Dubai final approach/landing.** Flaps
  extended, a lit highway interchange rolling by close below — the strongest shot of the three.

This means the full story timeline, combining all batches, now reads:
1. **Addis takeoff** (23:11 Aug 27) — `clip6-addis-takeoff.mp4`
2. **Dubai descent** (02:59 Aug 28) — `clip7-dubai-descent.mp4`
3. **Dubai landing** (03:05 Aug 28) — `clip8-dubai-landing.mp4`
4. **The stay** — marina/beach/street footage from batches 1–2: `clip1` through `clip4` (night beach
   waves, beach+skyline, marina street traffic at blue hour), plus the 3 stay-time photos (marina
   promenade, marina skyline, marina boat/jet-skis)
5. **Dubai takeoff** (17:39 Aug 29) — `clip5-takeoff-wing.mp4` (Emirates hangars, golden light)

That's the full arc — no more batches expected unless Aman says otherwise.

## Processing done this session

All 8 videos received across all three batches have been cropped to a consistent 9:16 vertical frame,
scaled down to 720×1280 for web, muted (no audio track), had metadata stripped, and were committed to
`assets/videos/` in this repo:

| Output file | Source | Story beat | Treatment |
|---|---|---|---|
| `clip6-addis-takeoff.mp4` | `20260827_231105_1.mp4` | 1. Addis takeoff | trimmed to 8s of 15.3s, mild brighten/contrast |
| `clip7-dubai-descent.mp4` | `20260828_025920_1.mp4` | 2. Dubai descent | trimmed to 7s of 10.8s, brightened more (darkest of the three flight clips) |
| `clip8-dubai-landing.mp4` | `20260828_030504_1.mp4` | 3. Dubai landing | trimmed to 7s of 7.8s, mild brighten/contrast |
| `clip1-marina-water-night.mp4` | `20260828_192058_99_1.mp4` | 4. The stay | trimmed to 3s, brightened/contrast+saturation boosted (was too dark to read otherwise) |
| `clip2-marina-water-night2.mp4` | `20260828_192119_99_1.mp4` | 4. The stay | same treatment as clip1 |
| `clip3-beach-skyline-night.mp4` | `20260828_192001_99_1.mp4` | 4. The stay | trimmed first 1.2s (was dark/camera still settling), kept remaining ~4.6s, mild brighten/contrast |
| `clip4-marina-street-bluehour.mp4` | `20260828_185502_1.mp4` | 4. The stay | trimmed to first 8s of 14.2s, no brightening needed |
| `clip5-takeoff-wing.mp4` | `20260829_173921_1.mp4` | 5. Dubai takeoff | trimmed to first 8s of 12.6s, no brightening needed |

All outputs: H.264, yuv420p, ~720×1280, no audio, `+faststart` for web streaming, crf 26 (small file
sizes, 0.4–2.3MB each — see actual sizes in `assets/videos/`).

The 4 batch-1 photos have **not** been processed or committed yet (no EXIF-strip/resize pass done on
them) — still just sitting in the chat upload, not in this repo. They're strong candidates to extend
the existing 8-photo gallery in `index.html` (see `PROJECT_NOTES.md` for the naming convention:
`assets/photoN-<slug>-<width>.<jpg|webp>`).

## Not yet done / open items

- **All 3 batches now received and processed** — 8 clips total, full story arc (Addis takeoff → Dubai
  descent/landing → the stay → Dubai takeoff) is complete in `assets/videos/`. No more batches expected
  unless Aman says otherwise.
- **Batch 1 photos** — need the same EXIF-strip + multi-width JPG/WebP export treatment as the
  existing 8 gallery photos before they can go in `index.html`.
- **Site integration** — `index.html` doesn't yet have anywhere to embed video. Need to decide: new
  "mini videos" section (ideally ordered as the story arc above), or slot clips into the existing
  entry-card gallery layout alongside stills? Nothing built yet — just raw processed clips sitting in
  `assets/videos/`.
- **Hero image decision** — the marina waterfront boat/jet-ski photo (batch 1) was flagged as the
  strongest still; not yet formally chosen as anything.
- **YouTube full-length compilation** — not started; no footage has been assembled into a longer cut
  yet. Now that the full story arc is confirmed, this compilation would likely follow the same
  1→5 beat order laid out above, just uncompressed/full-length/unmuted versions of the same source clips.
- Doesn't affect this thread, but note the still-open custom-domain item tracked in `PROJECT_NOTES.md`.
