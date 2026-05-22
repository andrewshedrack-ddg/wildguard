#!/usr/bin/env bash
set -euo pipefail
# Simple script to copy the static frontend into `docs/` for GitHub Pages
ROOT=$(cd "$(dirname "$0")/.." && pwd)
SRC="$ROOT/app/static"
DST="$ROOT/docs"
rm -rf "$DST"
mkdir -p "$DST"
cp -r "$SRC"/* "$DST"/
# Ensure no Jekyll processing
touch "$DST/.nojekyll"
echo "Copied frontend to $DST"
