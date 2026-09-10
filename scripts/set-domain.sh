#!/usr/bin/env bash
# Swaps the site's canonical/OG/sitemap/robots/llms.txt URLs from the current
# GitHub Pages domain to a custom domain, in one pass. Run this once you've
# bought a domain and pointed its DNS at GitHub Pages.
#
# Usage: ./scripts/set-domain.sh yourdomain.com
#
# What this does NOT do (you still need to):
#   1. Point your domain's DNS at GitHub Pages (A/AAAA records to GitHub's
#      IPs, or a CNAME record if using a subdomain) — see GitHub's docs:
#      https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site
#   2. Add a `CNAME` file at the repo root containing just the domain name
#      (this script creates it for you) and enable "Enforce HTTPS" in
#      Settings -> Pages once DNS has propagated.
#   3. Re-check GoatCounter analytics still fires correctly (it's domain-
#      independent, so this should be a no-op, but worth a manual visit).

set -euo pipefail

OLD_DOMAIN="teredatrades.github.io/Amanstravels"
NEW_DOMAIN="${1:-}"

if [ -z "$NEW_DOMAIN" ]; then
  echo "Usage: $0 <yourdomain.com>"
  exit 1
fi

cd "$(dirname "$0")/.."

# Strip any accidental protocol/trailing slash the user pastes in.
NEW_DOMAIN="${NEW_DOMAIN#https://}"
NEW_DOMAIN="${NEW_DOMAIN#http://}"
NEW_DOMAIN="${NEW_DOMAIN%/}"

FILES=$(grep -rl "$OLD_DOMAIN" --include="*.html" --include="*.xml" --include="*.txt" .)

for f in $FILES; do
  # Custom domains serve from the root, so also drop the "/Amanstravels" path
  # segment that only exists in the github.io project-pages URL.
  sed -i "s|https://${OLD_DOMAIN}|https://${NEW_DOMAIN}|g" "$f"
done

echo "$NEW_DOMAIN" > CNAME

echo "Done. Updated $(echo "$FILES" | wc -l) files and wrote CNAME."
echo "Next: commit + push, point DNS at GitHub Pages, then enable 'Enforce HTTPS' in Settings -> Pages."
