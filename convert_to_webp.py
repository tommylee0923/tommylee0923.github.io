from pathlib import Path
from PIL import Image

# ----------- Configurable settings and variables -----------
INPUT_DIR = Path("./image")
OUTPUT_DIR = Path("./image/webp")

QUALITY = 82    # 0 - 100, higher = larger files
METHOD = 6      # 0 - 6, higher = better compression, slower
LOSSLESS_FOR_PNG = False
# -----------------------------------------------------------

def convert_one(src_path: Path, dst_path: Path):
    # Convert one image file to .webp and save to dst_path.
    # Handles transparency for PNGs by converting to RGBA.
    dst_path.parent.mkdir(parents=True, exist_ok=True)

    with Image.open(src_path) as im:
        if im.mode in ("P", "LA") or (im.mode == "RGBA"):
            im = im.convert("RGBA")
        else:
            im = im.convert("RGB")

        save_kwargs = {
            "format": "WEBP",
            "quality": QUALITY,
            "method": METHOD,
            "optimize": True,
        }

        if src_path.suffix.lower() == ".png" and LOSSLESS_FOR_PNG:
            save_kwargs["lossless"] = True
        
        im.save(dst_path, **save_kwargs)

def main() -> None:
    if not INPUT_DIR.exists():
        raise FileNotFoundError(
            f"Input folder not found: {INPUT_DIR.resolve()}"
            )
    
    extensions = {".png", ".jpg", "jpeg"}

    converted = 0
    skipped = 0
    failed = 0

    for src in INPUT_DIR.rglob("*"):
        if not src.is_file():
            continue
            
        if src.suffix.lower() not in extensions:
            continue

        rel = src.relative_to(INPUT_DIR)
        dst = (OUTPUT_DIR / rel).with_suffix(".webp")

        if dst.exists():
            skipped += 1
            continue
            
        try:
            convert_one(src, dst)
            converted += 1
            print(f"✅ {src} -> {dst}")
        except Exception as e:
            failed += 1
            print(f"❌ Failed: {src} ({e})")
    print(f"\n--- Summary ---")
    print(f"Converted: {converted}")
    print(f"Skipped (already exists): {skipped}")
    print(f"Failed: {failed}")
    print(f"Output folder: {OUTPUT_DIR.resolve()}")

if __name__ == "__main__":
    main()