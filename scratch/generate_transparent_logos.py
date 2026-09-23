import os
import base64
import shutil
from PIL import Image

def main():
    base_dir = r"c:\Users\chand\Downloads\Antigravity"
    full_path = os.path.join(base_dir, "assets", "logo-full.png")
    
    if not os.path.exists(full_path):
        print(f"Error: {full_path} not found")
        return

    full = Image.open(full_path).convert("RGBA")
    
    # Crop exact glyph (364, 200, 693, 567)
    # Let's dynamically find glyph bbox in upper half (y < 580)
    top_half = full.crop((0, 190, full.width, 580))
    top_bbox = top_half.getbbox()
    glyph_bbox = (top_bbox[0], 190 + top_bbox[1], top_bbox[2], 190 + top_bbox[3])
    print("Detected glyph bbox:", glyph_bbox)
    
    glyph_crop = full.crop(glyph_bbox)
    print("Glyph size:", glyph_crop.size)
    
    # Create 512x512 transparent canvas
    size = 512
    canvas = Image.new("RGBA", (size, size), (255, 255, 255, 0))
    
    # 90% height with preserved aspect ratio
    target_height = int(size * 0.90)
    aspect = glyph_crop.width / glyph_crop.height
    target_width = int(target_height * aspect)
    
    resized_glyph = glyph_crop.resize((target_width, target_height), Image.Resampling.LANCZOS)
    x_offset = (size - target_width) // 2
    y_offset = (size - target_height) // 2
    
    canvas.paste(resized_glyph, (x_offset, y_offset), resized_glyph)
    
    # Save master transparent glyph
    master_512_path = os.path.join(base_dir, "scratch", "glyph_512.png")
    canvas.save(master_512_path, format="PNG")
    print("Master 512x512 transparent glyph saved.")
    
    # Verify corners are transparent
    for pt in [(0, 0), (10, 10), (size-1, 0), (0, size-1), (size-1, size-1)]:
        pix = canvas.getpixel(pt)
        assert pix[3] == 0, f"Expected transparent alpha at {pt}, got {pix}"
    print("Alpha transparency verified on master!")
    
    # Base64 encode for SVG
    with open(master_512_path, "rb") as f:
        b64_data = base64.b64encode(f.read()).decode("ascii")
        
    svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <image href="data:image/png;base64,{b64_data}" width="512" height="512" />
</svg>'''

    # File mappings to update
    png_targets_512 = [
        os.path.join(base_dir, "assets", "logo-glyph.png"),
        os.path.join(base_dir, "logo-glyph.png"),
        os.path.join(base_dir, "assets", "favicon.png"),
        os.path.join(base_dir, "favicon.png"),
        os.path.join(base_dir, "apps", "web", "public", "logo-glyph.png"),
        os.path.join(base_dir, "apps", "web", "public", "favicon.png"),
        os.path.join(base_dir, "apps", "web", "public", "assets", "favicon.png"),
    ]
    
    for pt in png_targets_512:
        os.makedirs(os.path.dirname(pt), exist_ok=True)
        canvas.save(pt, format="PNG")
        print("Updated PNG:", pt)

    # Update full transparent logo.png
    full_targets = [
        os.path.join(base_dir, "logo.png"),
        os.path.join(base_dir, "assets", "logo.png"),
        os.path.join(base_dir, "priyulabs logo.png"),
        os.path.join(base_dir, "assets", "priyulabs-logo-new.png"),
        os.path.join(base_dir, "logo-brand-design.png"),
        os.path.join(base_dir, "assets", "logo-brand-design.png"),
        os.path.join(base_dir, "apps", "web", "public", "logo-brand-design.png"),
        os.path.join(base_dir, "apps", "web", "public", "assets", "logo-brand-design.png"),
    ]
    for ft in full_targets:
        if os.path.exists(os.path.dirname(ft)):
            full.save(ft, format="PNG")
            print("Updated full transparent PNG:", ft)

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
        scaled = canvas.resize((sz, sz), Image.Resampling.LANCZOS)
        for p in paths:
            os.makedirs(os.path.dirname(p), exist_ok=True)
            scaled.save(p, format="PNG")
            print(f"Updated {sz}x{sz} icon: {p}")

    # Generate ICO file
    ico_targets = [
        os.path.join(base_dir, "favicon.ico"),
        os.path.join(base_dir, "assets", "favicon.ico"),
        os.path.join(base_dir, "apps", "web", "public", "favicon.ico"),
        os.path.join(base_dir, "apps", "web", "public", "assets", "favicon.ico"),
    ]
    for it in ico_targets:
        os.makedirs(os.path.dirname(it), exist_ok=True)
        canvas.save(it, format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])
        print("Updated ICO:", it)

    # SVG targets
    svg_targets = [
        os.path.join(base_dir, "assets", "logo.svg"),
        os.path.join(base_dir, "assets", "favicon.svg"),
        os.path.join(base_dir, "favicon.svg"),
        os.path.join(base_dir, "apps", "web", "public", "favicon.svg"),
        os.path.join(base_dir, "apps", "web", "public", "assets", "favicon.svg"),
        os.path.join(base_dir, "apps", "web", "public", "assets", "logo.svg"),
    ]
    
    for st in svg_targets:
        os.makedirs(os.path.dirname(st), exist_ok=True)
        with open(st, "w", encoding="utf-8") as f:
            f.write(svg_content)
        print("Updated SVG:", st)

    # Also update any copies in dist/
    dist_dir = os.path.join(base_dir, "dist")
    if os.path.exists(dist_dir):
        for root, dirs, files in os.walk(dist_dir):
            for file in files:
                fpath = os.path.join(root, file)
                if file == "logo.svg":
                    with open(fpath, "w", encoding="utf-8") as f:
                        f.write(svg_content)
                elif file == "favicon.svg":
                    with open(fpath, "w", encoding="utf-8") as f:
                        f.write(svg_content)
                elif file in ("logo-glyph.png", "favicon.png"):
                    canvas.save(fpath, format="PNG")
                elif file in ("logo.png", "logo-full.png"):
                    full.save(fpath, format="PNG")
                elif file == "favicon-16x16.png":
                    scaled16 = canvas.resize((16, 16), Image.Resampling.LANCZOS)
                    scaled16.save(fpath, format="PNG")
                elif file == "favicon-32x32.png":
                    scaled32 = canvas.resize((32, 32), Image.Resampling.LANCZOS)
                    scaled32.save(fpath, format="PNG")
                elif file == "favicon.ico":
                    canvas.save(fpath, format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])
        print("Updated all matching files in dist/ directory.")

    print("\nALL LOGO ASSETS SUCCESSFULLY GENERATED WITH TRANSPARENT BACKGROUND!")

if __name__ == "__main__":
    main()
