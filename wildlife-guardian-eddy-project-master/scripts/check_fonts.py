import os

FONTS_DIR = os.path.join("app", "static", "vendor", "fonts")

def main():
    if os.path.isdir(FONTS_DIR):
        files = [f for f in os.listdir(FONTS_DIR) if os.path.isfile(os.path.join(FONTS_DIR, f))]
        if files:
            print(f"Found {len(files)} font files in {FONTS_DIR}")
            return 0
        else:
            print(f"WARNING: No font files found in {FONTS_DIR}. Run scripts/vendorize_fonts.ps1 locally to populate woff2 files.")
            return 0
    else:
        print(f"WARNING: Fonts directory {FONTS_DIR} does not exist. Run scripts/vendorize_fonts.ps1 locally to populate fonts.")
        return 0

if __name__ == '__main__':
    raise SystemExit(main())
