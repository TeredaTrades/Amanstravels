# Lyon Trip — Progress Notes

Context for whoever (or whichever future session) picks this up: Aman took a trip to Lyon, France
and sent photos/videos in batches to add to the Amanstravels site, following the same treatment as
the Dubai and Korea trips.

## Batch received

**Batch 1** (4 photos + 3 videos, all from the afternoon of one day — timestamps ~15:56 and ~16:07):
- Photo: Cathédrale Saint-Jean-Baptiste facade, Vieux Lyon — Gothic rose window and triple arched
  doorway
- Photo: A quiet cobblestone street in Vieux Lyon, pastel buildings, church spire in the distance
- Photo: Interior mosaic panel inside the Basilica of Notre-Dame de Fourvière — gold/blue, beneath
  stone vaulting and stained glass
- Photo: Notre-Dame de Fourvière's twin-towered facade, mid-restoration (towers wrapped in
  scaffolding)
- Video (3.1s, portrait) — walking a Vieux Lyon street, same spot as the street photo
- Video (12.9s, landscape) — the Saône riverfront, wide shot of the quay and a footbridge
- Video (6.9s, portrait) — panning shot inside the Fourvière basilica, mosaics and stained glass

**Note on photo quality:** the first upload of the 3 non-street photos came through as 320×240
thumbnails (likely a HEIC-to-JPEG preview generated on upload). Aman re-sent full-resolution
versions (3000×4000 / 4000×3000 PNGs) which were used for all processing below.

The story arc (by timestamp): Vieux Lyon street walk → Saône riverfront → up to Fourvière hill →
inside the basilica. No trip-cost or visa/logistics angle here (short in-country day trip, not an
international flight like Dubai/Korea), so no `TRIP_COST_QUESTIONS.md`-style post is planned unless
Aman asks for one.

## Processing done this session

**Photos** — all 4 processed the same way as prior trips: auto-oriented, EXIF-stripped, exported at
1600/800/480 widths in JPG + WebP. Committed to `assets/`, untouched originals (post-orient,
pre-resize) in `assets/originals/`:

| File | Subject |
|---|---|
| `photo17-vieux-lyon-street` | Cobblestone street, Vieux Lyon |
| `photo18-cathedral-facade` | Cathédrale Saint-Jean-Baptiste facade |
| `photo19-mosaic-interior` | Fourvière basilica interior mosaic |
| `photo20-fourviere-scaffold` | Fourvière basilica exterior (scaffolded) |

(WebP versions made via ImageMagick's built-in WebP delegate — `cwebp` isn't installed in this
container, so `convert in.jpg -quality 82 out.webp` was used instead; same visual result.)

**Videos** — all 3 cropped to a consistent 9:16 vertical frame (portrait sources cropped from
1440×1920 → 1080×1920 center-crop; the one landscape source cropped from 1920×1440 → 810×1440
center-crop), scaled to 720×1280, muted, metadata stripped, H.264/yuv420p/+faststart, committed to
`assets/videos/` with posters in `assets/videos/posters/`:

| Output file | Story beat | Notes |
|---|---|---|
| `clip23-vieux-lyon-walk.mp4` | 1. Vieux Lyon | full 3.1s kept |
| `clip24-saone-riverfront.mp4` | 2. Along the Saône | trimmed to first 8s of 12.9s |
| `clip25-fourviere-interior.mp4` | 3. Fourvière | full 6.9s kept |

## Site integration — done

- **Journey page** (`journey.html`): new journey-section block added at the **top** (Lyon is now
  the newest trip), with its own intro line and a 3-clip filmstrip + "coming soon to YouTube" card,
  same markup/lazy-load pattern as the Korea and Dubai sections below it.
- **Home page** (`index.html`): hero status badge updated to "Lyon, France". The Journey preview
  strip got 2 Lyon clips added at the front (`clip23`, `clip25`). The photo mini-grid got a new
  Lyon entry (cathedral facade) linking to `gallery.html#entry-lyon`, ahead of the Dubai entry.
- **Gallery page** (`gallery.html`): 4 new entry-cards added at the top (newest first), in visit
  order — cathedral facade (`id="entry-lyon"`), Vieux Lyon street, Fourvière exterior, Fourvière
  mosaic interior.

## Not yet done / open items

- No trip-cost breakdown or logistics post for Lyon yet (not clearly asked for, and this reads as a
  short local/day trip rather than an international one like Dubai/Korea — flag to Aman if he wants
  one anyway).
- No YouTube link for the Lyon clips yet (placeholder card matches the pattern from other trips).
- If more Lyon batches come in later, this file should be extended the same way
  `TRIP_DUBAI_PROGRESS.md` was extended across its 3 batches.
