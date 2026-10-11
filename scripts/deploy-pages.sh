#!/usr/bin/env bash
# Build the static site locally and publish it to the gh-pages branch.
# Use this when GitHub Actions is unavailable. Pages must be set to
# "Deploy from a branch" -> gh-pages / (root).
#
#   npm run deploy:pages            build + push
#   DRY_RUN=1 npm run deploy:pages  build only, don't push
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
REMOTE_URL="$(git -C "$ROOT" remote get-url origin)"
REPO="$(basename "${REMOTE_URL%.git}")"
BRANCH="${PAGES_BRANCH:-gh-pages}"

WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT

# Build in a throwaway copy so the real tree (and a running dev server's
# .next) is never touched, and so app/api can be dropped for the export.
rsync -a --exclude node_modules --exclude .next --exclude .git --exclude out "$ROOT/" "$WORK/site/"
ln -s "$ROOT/node_modules" "$WORK/site/node_modules"
cd "$WORK/site"
rm -rf app/api

STATIC_EXPORT=true NEXT_PUBLIC_BASE_PATH="/$REPO" npm run build
touch out/.nojekyll

if [ "${DRY_RUN:-}" = "1" ]; then
  echo "DRY_RUN: built OK, not pushing. Output:"
  ls -a out
  exit 0
fi

cd out
git init -q -b "$BRANCH"
git add -A
git commit -q -m "Deploy $(date -u +%Y-%m-%dT%H:%M:%SZ)"
git push -f "$REMOTE_URL" "$BRANCH"
echo "Pushed to $BRANCH. Site: https://$(echo "$REMOTE_URL" | sed -E 's#.*[:/]([^/]+)/[^/]+$#\1#' | tr 'A-Z' 'a-z').github.io/$REPO/"
