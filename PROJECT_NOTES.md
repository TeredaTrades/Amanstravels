# Aman's Travels — Project Notes

Context for whoever picks this up next: where this came from, what's actually done, and what's still just scaffolding.

## What this is

A small mock personal travel blog/site for "Aman's Travels" — a static HTML single-page site with an about section, a placeholder posts list, and a photo gallery. It exists as a demo/testbed, not a production product with a real backend or CMS.

## Where things stand

**Deployment — done.**
The site deploys automatically via GitHub Actions (`.github/workflows/pages.yml`) on every push to `main`. Pages source is set to "GitHub Actions" in repo settings (Settings → Pages), not the older branch-based deploy. Live at:
https://teredatrades.github.io/Amanstravels/

No manual steps needed to publish — just push to `main` and the workflow builds and deploys.

**Gallery photos — done (real photos, from Aman's actual trips).**
`index.html` has an 8-photo gallery with `<picture>`/`srcset` markup already wired to specific filenames and alt text. The 8 photos now live in `assets/` as real images (sourced from Aman's own Snapchat memories, cropped to remove the app's UI chrome, EXIF-stripped, and exported at 1600/800/480px widths in both JPG and WebP):

- `photo1-botero` — Botero Museum, Bogotá (still-life painting)
- `photo2-monserrate` — Camino Peatonal de Monserrate trail sign, Bogotá
- `photo3-el-dorado` — El Dorado Airport apron, Bogotá
- `photo4-le-carre` — Le Carré d'As club, Liège
- `photo5-parisian` — The Parisian, Macao (night)
- `photo6-mirador-norte` — Mirador al Norte padlock fence, Monserrate, Bogotá
- `photo7-la-pecera` — La Pecera street, Madrid
- `photo8-addis-aerial` — aerial view over Addis Ababa

Untouched originals (post-crop, pre-resize) are kept in `assets/originals/` per the workflow `ASSETS_README.md` originally described.

**Not yet done / open items:**
- The "Recent posts" section (Udaipur, Western Ghats, Delhi street food) is still placeholder text with no real content or linked pages — `#` links go nowhere.
- The "Snapshot" aside under About still points at `assets/sample-photo.jpg`, a leftover placeholder — not one of the 8 real gallery photos.
- No contact form is wired up (`#contact` section says as much — suggests Formspree or Netlify Forms as options, neither set up).
- No custom domain — currently only on the default `teredatrades.github.io/Amanstravels` URL.
- Extra travel photos exist from the same photo drop (Sky Tower/Big Ben replica and building exterior in Macau, a Luxembourg rooftop view) that don't correspond to any of the 8 gallery slots — not used anywhere yet, but available if the gallery expands.

## Where we might go next

Natural next steps, roughly in order of effort:
1. Swap the About "Snapshot" placeholder image for a real photo.
2. Turn the 3 placeholder posts into either real short write-ups or drop the section until there's real content.
3. Decide if this stays a pure demo (in which case a "mock site" badge and placeholder contact section are fine as-is) or becomes something Aman actually uses (in which case: real contact form, maybe a custom domain, maybe more photos from the unused extras).

## Repo mechanics worth knowing

- Deploys happen automatically on push to `main` via `.github/workflows/pages.yml` — don't reintroduce the old manual "Settings → Pages → pick a branch" flow described in the original README; that's been superseded.
- Image asset naming convention: `assets/photoN-<slug>-<width>.<jpg|webp>`, originals at `assets/originals/photoN-<slug>.jpg`. Keep this pattern if adding more gallery photos so `index.html`'s `srcset` stays predictable.
