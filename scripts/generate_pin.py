#!/usr/bin/env python3
"""
Generate a Pinterest-ready pin image (1000x1500, 2:3) for Aman's Travels.

Usage:
  python3 generate_pin.py \
    --photo ../assets/photo11-marina-boat-1600.jpg \
    --kicker "TRIP COSTS - DUBAI, UAE" \
    --title "What This Dubai Trip Actually Cost" \
    --out ../social/pins/dubai-trip-cost-breakdown.png

Design matches css/style.css: primary #1e3a34 (dark green), accent
#c8963e (gold), serif headline (DejaVu Serif standing in for the site's
Georgia), sans-serif kicker label (DejaVu Sans standing in for the
site's system-sans kicker style). No URL is baked into the image since
the site doesn't have a stable custom domain yet -- the destination link
is set separately when creating the pin on Pinterest. Regenerate with a
URL added once a custom domain is live, if wanted.
"""
import argparse
import textwrap
from PIL import Image, ImageDraw, ImageFont, ImageFilter

CANVAS_W, CANVAS_H = 1000, 1500

PRIMARY = (30, 58, 52)       # #1e3a34
PRIMARY_DARK = (20, 40, 36)  # #142824
ACCENT = (200, 150, 62)      # #c8963e
WHITE = (255, 255, 255)

SERIF_BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf"
SANS_BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"


def cover_crop(im, target_w, target_h):
    src_ratio = im.width / im.height
    target_ratio = target_w / target_h
    if src_ratio > target_ratio:
        new_h = im.height
        new_w = int(new_h * target_ratio)
        x0 = (im.width - new_w) // 2
        im = im.crop((x0, 0, x0 + new_w, new_h))
    else:
        new_w = im.width
        new_h = int(new_w / target_ratio)
        y0 = (im.height - new_h) // 3  # bias slightly toward the top third
        im = im.crop((0, y0, new_w, y0 + new_h))
    return im.resize((target_w, target_h), Image.LANCZOS)


def wrap_title(draw, text, font, max_width):
    words = text.split()
    lines, cur = [], ""
    for w in words:
        trial = (cur + " " + w).strip()
        if draw.textlength(trial, font=font) <= max_width:
            cur = trial
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def generate(photo_path, kicker, title, out_path):
    photo = Image.open(photo_path).convert("RGB")
    bg = cover_crop(photo, CANVAS_W, CANVAS_H)

    # Duotone-ish darken so white text stays legible over any photo,
    # heavier toward the bottom where the title band sits.
    overlay = Image.new("RGBA", (CANVAS_W, CANVAS_H), (0, 0, 0, 0))
    odraw = ImageDraw.Draw(overlay)
    for y in range(CANVAS_H):
        t = y / CANVAS_H
        alpha = int(90 + 165 * (t ** 1.4))
        odraw.line([(0, y), (CANVAS_W, y)], fill=PRIMARY_DARK + (min(alpha, 255),))
    # Solid scrim block behind the brand row (top) and kicker/title block
    # (bottom third) so text legibility never depends on the photo's tone.
    odraw.rectangle([(0, 0), (CANVAS_W, 170)], fill=PRIMARY_DARK + (140,))
    odraw.rectangle([(0, 940), (CANVAS_W, CANVAS_H)], fill=PRIMARY_DARK + (190,))
    bg = Image.alpha_composite(bg.convert("RGBA"), overlay)

    draw = ImageDraw.Draw(bg)

    # Top brand row
    kicker_font = ImageFont.truetype(SANS_BOLD, 30)
    brand_font = ImageFont.truetype(SANS_BOLD, 26)
    draw.text((60, 60), "AMAN'S TRAVELS", font=brand_font, fill=WHITE)
    draw.rectangle([(60, 105), (60 + 90, 108)], fill=ACCENT)

    # Kicker (pillar/destination label), lower third
    kicker_y = 980
    draw.text((60, kicker_y), kicker.upper(), font=kicker_font, fill=ACCENT)
    draw.rectangle([(62, kicker_y + 46), (62 + 70, kicker_y + 49)], fill=ACCENT)

    # Title
    title_font = ImageFont.truetype(SERIF_BOLD, 66)
    max_w = CANVAS_W - 120
    lines = wrap_title(draw, title, title_font, max_w)
    line_h = 78
    title_y = kicker_y + 70
    for i, line in enumerate(lines):
        draw.text((60, title_y + i * line_h), line, font=title_font, fill=WHITE)

    bg.convert("RGB").save(out_path, "PNG")
    print(f"wrote {out_path}")


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--photo", required=True)
    ap.add_argument("--kicker", required=True)
    ap.add_argument("--title", required=True)
    ap.add_argument("--out", required=True)
    args = ap.parse_args()
    generate(args.photo, args.kicker, args.title, args.out)
