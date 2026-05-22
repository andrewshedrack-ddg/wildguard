#!/usr/bin/env bash
set -euo pipefail
# Attempt to download Inter variable font from Google Fonts repo (if network available)
OUT_DIR="app/static/vendor/fonts"
mkdir -p "$OUT_DIR"
URL="https://github.com/rsms/inter/releases/download/v3.19/Inter-3.19.zip"
echo "Attempting to download Inter from $URL"
if command -v curl >/dev/null 2>&1; then
  curl -L "$URL" -o /tmp/inter.zip || exit 0
elif command -v wget >/dev/null 2>&1; then
  wget -O /tmp/inter.zip "$URL" || exit 0
else
  echo "No curl or wget found; skip"
  exit 0
fi
unzip -o /tmp/inter.zip -d /tmp/inter || true
find /tmp/inter -type f -name "*.woff2" -exec cp {} "$OUT_DIR" \; || true
echo "Copied any found woff2 files to $OUT_DIR"
