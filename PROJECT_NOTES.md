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
`index.html` has an 8-photo gallery with `<picture>`/`srcset` markup wired to specific filenames and alt text. The 8 photos live in `assets/` as real images (sourced from Aman's own Snapchat memories, cropped to remove the app's UI chrome, EXIF-stripped, and exported at 1600/800/480px widths in both JPG and WebP):

- `photo1-botero` — Botero Museum, Bogotá (still-life painting)
- `photo2-monserrate` — Camino Peatonal de Monserrate trail sign, Bogotá
- `photo3-el-dorado` — El Dorado Airport apron, Bogotá
- `photo4-le-carre` — Le Carré d'As club, Liège
- `photo5-parisian` — The Parisian, Macao (night)
- `photo6-mirador-norte` — Mirador al Norte padlock fence, Monserrate, Bogotá
- `photo7-la-pecera` — La Pecera street, Madrid
- `photo8-addis-aerial` — aerial view over Addis Ababa

Untouched originals (post-crop, pre-resize) are kept in `assets/originals/` per the workflow `ASSETS_README.md` originally described.

**About "Snapshot" image — done.** Now uses the real `photo6-mirador-norte` gallery photo instead of the old dangling `assets/sample-photo.jpg` placeholder (that file never actually existed in the repo).

**Recent posts section — dropped.** The placeholder posts (Udaipur, Western Ghats, Delhi street food) had no real content and their `#` links went nowhere, so the whole section and its nav link were removed rather than kept as placeholders. Add it back if/when there's real post content to publish.

**Contact — done, simple version.** Wired up as a `mailto:` link to `mikemann2199@gmail.com` (pre-filled subject line). No third-party form service — chosen deliberately to avoid a signup step. If a native in-page form is wanted later, Formspree (free tier, just needs a form ID from formspree.io) is the natural upgrade.

**Site framing updated.** Removed "mock site" language from the title, About copy, and footer since the site is no longer meant to read as a demo.

**Not yet done / open item:**
- **Custom domain.** Still only on the default `teredatrades.github.io/Amanstravels` URL. This needs Aman to actually purchase a domain first (a registrar account + payment, which can't be done on his behalf) — once there's a domain name, the remaining steps are: add a `CNAME` file to the repo root with the domain, and set DNS records (A/ALIAS or CNAME depending on registrar) pointing at GitHub Pages. Whoever picks this up next should ask if a domain has been bought yet before doing anything here.
- Extra travel photos referenced in an earlier version of these notes (Sky Tower/Big Ben replica and a building exterior in Macau, a Luxembourg rooftop view) were only ever in a previous session's temporary workspace, not committed to this repo — they no longer exist anywhere accessible. If the gallery should expand beyond the current 8, those would need to be re-sourced from Aman.

## Repo mechanics worth knowing

- Deploys happen automatically on push to `main` via `.github/workflows/pages.yml` — don't reintroduce the old manual "Settings → Pages → pick a branch" flow described in the original README; that's been superseded.
- Image asset naming convention: `assets/photoN-<slug>-<width>.<jpg|webp>`, originals at `assets/originals/photoN-<slug>.jpg`. Keep this pattern if adding more gallery photos so `index.html`'s `srcset` stays predictable.
- The site no longer presents itself as a "mock" — copy and framing should stay real/first-person going forward.
