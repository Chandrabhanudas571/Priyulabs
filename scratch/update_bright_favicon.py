import os
import base64
from PIL import Image, ImageFilter
import numpy as np

def main():
    base_dir = r"c:\Users\chand\Downloads\Antigravity"
    master_path = os.path.join(base_dir, "scratch", "glyph_512.png")
    
    im = Image.open(master_path).convert("RGBA")
    arr = np.array(im, dtype=np.float32)
    r, g, b, a = arr[:,:,0], arr[:,:,1], arr[:,:,2], arr[:,:,3]
    
    mask_visible = a > 30
    is_arrow = mask_visible & (b > 160) & (b > r * 2.0)
    is_dark = mask_visible & (~is_arrow)
    
    # Transform dark navy into vibrant royal blue (#2563EB -> 37, 99, 235)
    # and arrow into electric cyan (#00E5FF -> 0, 220, 255)
    bright_arr = arr.copy()
    bright_arr[is_dark, 0] = 37
    bright_arr[is_dark, 1] = 99
    bright_arr[is_dark, 2] = 235
    
    bright_arr[is_arrow, 0] = 0
    bright_arr[is_arrow, 1] = 220
    bright_arr[is_arrow, 2] = 255
    
    bright_img = Image.fromarray(bright_arr.astype(np.uint8))
    
    # Add subtle luminous contour for maximum contrast on dark browser tabs
    alpha_img = bright_img.split()[-1]
    glow = alpha_img.filter(ImageFilter.MaxFilter(9))
    glow_arr = np.array(glow, dtype=np.float32)
    outline = np.clip(glow_arr - a, 0, 255)
    
    bg = np.zeros_like(arr)
    bg[:,:,0] = 255
    bg[:,:,1] = 255
    bg[:,:,2] = 255
    bg[:,:,3] = outline * 0.65
    
    final_favicon_512 = Image.alpha_composite(Image.fromarray(bg.astype(np.uint8)), bright_img)
    
    # Save master bright favicon
    out_master = os.path.join(base_dir, "scratch", "bright_favicon_512.png")
    final_favicon_512.save(out_master, format="PNG")
    print("Master bright favicon saved.")
    
    # Base64 encode for SVG
    with open(out_master, "rb") as f:
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
        os.path.join(base_dir, "logo-glyph.png"),
        os.path.join(base_dir, "assets", "logo-glyph.png"),
        os.path.join(base_dir, "apps", "web", "public", "logo-glyph.png"),
    ]
    for pt in png_targets:
        os.makedirs(os.path.dirname(pt), exist_ok=True)
        final_favicon_512.save(pt, format="PNG")
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
        scaled = final_favicon_512.resize((sz, sz), Image.Resampling.LANCZOS)
        for p in paths:
            os.makedirs(os.path.dirname(p), exist_ok=True)
            scaled.save(p, format="PNG")
            print(f"Updated {sz}x{sz} favicon: {p}")

    # Favicon ICO
    ico_targets = [
        os.path.join(base_dir, "favicon.ico"),
        os.path.join(base_dir, "assets", "favicon.ico"),
        os.path.join(base_dir, "apps", "web", "public", "favicon.ico"),
        os.path.join(base_dir, "apps", "web", "public", "assets", "favicon.ico"),
    ]
    for it in ico_targets:
        os.makedirs(os.path.dirname(it), exist_ok=True)
        final_favicon_512.save(it, format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])
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
                elif file in ("favicon.png", "logo-glyph.png"):
                    final_favicon_512.save(fpath, format="PNG")
                elif file == "favicon-16x16.png":
                    scaled16 = final_favicon_512.resize((16, 16), Image.Resampling.LANCZOS)
                    scaled16.save(fpath, format="PNG")
                elif file == "favicon-32x32.png":
                    scaled32 = final_favicon_512.resize((32, 32), Image.Resampling.LANCZOS)
                    scaled32.save(fpath, format="PNG")
                elif file == "favicon.ico":
                    final_favicon_512.save(fpath, format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])
        print("Updated all matching favicon files in dist/ directory.")

    print("\nBRIGHT HIGH-VISIBILITY FAVICON SUCCESSFULLY APPLIED ACROSS ALL ASSETS!")

if __name__ == "__main__":
    main()
