import os
from PIL import Image

WORKSPACE = os.path.abspath(".")
ASSETS_DIR = os.path.join(WORKSPACE, "assets")

def optimize_image(src_rel_path, target_widths=[480, 768, 1200, 1600], quality=82):
    full_path = os.path.join(WORKSPACE, src_rel_path)
    if not os.path.exists(full_path):
        return None
    
    base_name, ext = os.path.splitext(os.path.basename(full_path))
    # clean name
    clean_base = base_name.lower().replace(" ", "_").replace("-", "_")
    
    out_dir = os.path.join(ASSETS_DIR, "optimized")
    os.makedirs(out_dir, exist_ok=True)
    
    results = {}
    with Image.open(full_path) as img:
        orig_w, orig_h = img.size
        # RGBA to RGB for jpg, keep RGBA for webp/png
        has_alpha = img.mode in ("RGBA", "LA") or (img.mode == "P" and "transparency" in img.info)
        
        # 1. Base WebP
        webp_base_path = os.path.join(out_dir, f"{clean_base}.webp")
        if has_alpha:
            img.save(webp_base_path, "WEBP", quality=quality, method=6)
        else:
            img.convert("RGB").save(webp_base_path, "WEBP", quality=quality, method=6)
        results["base_webp"] = {
            "path": os.path.relpath(webp_base_path, WORKSPACE).replace("\\", "/"),
            "size_kb": round(os.path.getsize(webp_base_path) / 1024, 1),
            "width": orig_w,
            "height": orig_h
        }
        
        # 2. Responsive WebP sizes (never upscale)
        responsive = []
        for w in target_widths:
            if w < orig_w:
                ratio = w / float(orig_w)
                h = int(orig_h * ratio)
                resized = img.resize((w, h), Image.Resampling.LANCZOS)
                w_path = os.path.join(out_dir, f"{clean_base}_{w}w.webp")
                if has_alpha:
                    resized.save(w_path, "WEBP", quality=quality, method=6)
                else:
                    resized.convert("RGB").save(w_path, "WEBP", quality=quality, method=6)
                responsive.append({
                    "width": w,
                    "height": h,
                    "path": os.path.relpath(w_path, WORKSPACE).replace("\\", "/"),
                    "size_kb": round(os.path.getsize(w_path) / 1024, 1)
                })
        results["responsive_webp"] = responsive
        
    return results

# Test run on one massive image: pos_billing_preview.jpg
test_res = optimize_image("assets/pos_billing_preview.jpg")
print("Test optimization of assets/pos_billing_preview.jpg (Original: 2,143.7 KB):")
print(f"  Base WebP: {test_res['base_webp']['size_kb']} KB ({test_res['base_webp']['width']}x{test_res['base_webp']['height']})")
for r in test_res["responsive_webp"]:
    print(f"  {r['width']}w variant: {r['size_kb']} KB ({r['width']}x{r['height']})")

