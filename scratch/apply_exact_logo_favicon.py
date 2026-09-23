import os
import base64
from PIL import Image, ImageDraw

def main():
    base_dir = r"c:\Users\chand\Downloads\Antigravity"
    master_path = os.path.join(base_dir, "scratch", "glyph_512.png")
    
    # Load original exact glyph
    orig_glyph = Image.open(master_path).convert("RGBA")
    
    # Create 512x512 rounded white squircle badge for favicon
    size = 512
    badge = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(badge)
    
    # Subtle border for light backgrounds, bright white fill for dark tabs
    radius = 120
    draw.rounded_rectangle(
        [(16, 16), (size - 16, size - 16)],
        radius=radius,
        fill=(255, 255, 255, 255),
        outline=(220, 226, 236, 255),
        width=3
    )
    
    # Place exact original PriyuLabs logo inside (78% size so it's prominent and clear)
    target_size = 400
    glyph_resized = orig_glyph.resize((target_size, target_size), Image.Resampling.LANCZOS)
    offset = (size - target_size) // 2
    badge.paste(glyph_resized, (offset, offset), glyph_resized)
    
    out_badge = os.path.join(base_dir, "scratch", "badge_favicon_512.png")
    badge.save(out_badge, format="PNG")
    print("Master badge favicon saved.")
    
    # Base64 encode for favicon SVG
    with open(out_badge, "rb") as f:
        b64_data = base64.b64encode(f.read()).decode("ascii")
        
    svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <image href="data:image/png;base64,{b64_data}" width="512" height="512" />
</svg>'''

    # Targets for 512x512 favicon PNG
    png_targets = [
        os.path.join(base_dir, "favicon.png"),
        os.path.join(base_dir, "assets", "favicon.png"),
        os.path.join(base_dir, "apps", "web", "public", "favicon.png"),
        os.path.join(base_dir, "apps", "web", "public", "assets", "favicon.png"),
    ]
    for pt in png_targets:
        os.makedirs(os.path.dirname(pt), exist_ok=True)
        badge.save(pt, format="PNG")
        print("Updated PNG favicon:", pt)

    # Multi-resolution favicons
    sizes = {
        16: [
            os.path.join(base_dir, "favicon-16x16.png"),
            os.path.join(base_dir, "assets", "favicon-16x16.png"),
            os.path.join(base_dir, "apps", "web", "public", "favicon-16x16.png"),
        ],
        32: [
            os.path.join(base_dir, "favicon-32x32.png"),
            os.path.join(base_dir, "assets", "favicon-32x32.png"),
            os.path.join(base_dir, "apps", "web", "public", "favicon-32x32.png"),
        ],
        48: [
            os.path.join(base_dir, "favicon-48x48.png"),
        ],
        180: [
            os.path.join(base_dir, "apple-touch-icon.png"),
            os.path.join(base_dir, "assets", "apple-touch-icon.png"),
        ]
    }
    for sz, paths in sizes.items():
        scaled = badge.resize((sz, sz), Image.Resampling.LANCZOS)
        for p in paths:
            os.makedirs(os.path.dirname(p), exist_ok=True)
            scaled.save(p, format="PNG")
            print(f"Updated {sz}x{sz} favicon: {p}")

    # Favicon ICO (16, 32, 48)
    ico_targets = [
        os.path.join(base_dir, "favicon.ico"),
        os.path.join(base_dir, "assets", "favicon.ico"),
        os.path.join(base_dir, "apps", "web", "public", "favicon.ico"),
        os.path.join(base_dir, "apps", "web", "public", "assets", "favicon.ico"),
    ]
    for it in ico_targets:
        os.makedirs(os.path.dirname(it), exist_ok=True)
        badge.save(it, format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])
        print("Updated favicon ICO:", it)

    # Favicon SVG
    svg_targets = [
        os.path.join(base_dir, "favicon.svg"),
        os.path.join(base_dir, "assets", "favicon.svg"),
        os.path.join(base_dir, "apps", "web", "public", "favicon.svg"),
        os.path.join(base_dir, "apps", "web", "public", "assets", "favicon.svg"),
    ]
    for st in svg_targets:
        os.makedirs(os.path.dirname(st), exist_ok=True)
        with open(st, "w", encoding="utf-8") as f:
            f.write(svg_content)
        print("Updated favicon SVG:", st)

    # Sync to dist/ directory
    dist_dir = os.path.join(base_dir, "dist")
    if os.path.exists(dist_dir):
        for root, dirs, files in os.walk(dist_dir):
            for file in files:
                fpath = os.path.join(root, file)
                if file == "favicon.svg":
                    with open(fpath, "w", encoding="utf-8") as f:
                        f.write(svg_content)
                elif file == "favicon.png":
                    badge.save(fpath, format="PNG")
                elif file == "favicon-16x16.png":
                    scaled16 = badge.resize((16, 16), Image.Resampling.LANCZOS)
                    scaled16.save(fpath, format="PNG")
                elif file == "favicon-32x32.png":
                    scaled32 = badge.resize((32, 32), Image.Resampling.LANCZOS)
                    scaled32.save(fpath, format="PNG")
                elif file == "favicon.ico":
                    badge.save(fpath, format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])
        print("Updated all matching favicon files in dist/ directory.")

    print("\nPERFECT EXACT LOGO SQUIRCLE FAVICON SUCCESSFULLY GENERATED AND SYNCED!")

if __name__ == "__main__":
    main()
