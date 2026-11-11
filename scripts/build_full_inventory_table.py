import json
import os
import re
from PIL import Image

WORKSPACE = os.path.abspath(".")

with open("scratch/inventory_raw.json", "r", encoding="utf-8") as f:
    raw_inventory = json.load(f)

# Group by canonical image source
images_map = {}

def get_displayed_sizes(context, tag_type, raw_src, cls, style):
    # Determine component based on src, class, style, context
    src_lower = raw_src.lower()
    cls_lower = cls.lower() if cls else ""
    
    # 1. Logo
    if "logo" in src_lower and ("svg" in src_lower or "logo" in cls_lower):
        if "foot" in cls_lower or "footer" in context:
            return "32x32px", "32x32px", "Logo in navbar / footer"
        return "32x32px", "32x32px", "Logo in header / navbar"
    
    # 2. Made in India / Trust badges / Certifications
    if "made_in_india" in src_lower or "made in india" in src_lower:
        return "110x48px", "130x55px", "Footer/Header Make in India Badge"
    if "ssl" in src_lower:
        return "100x42px", "120x50px", "Footer Security Badge"
    if "msme" in src_lower or "ashoka" in src_lower:
        return "40x50px", "50x62px", "Footer MSME Trust Emblem"
    if "whatsapp" in src_lower:
        return "48x48px", "56x56px", "Floating WhatsApp FAB / Icon"
        
    # 3. Intro / Hero visual
    if "intro_transparent" in src_lower:
        return "280x280px", "420x420px", "Animated Intro Logo Overlay"
    if "hero" in src_lower or "front" in src_lower or "showcase" in src_lower:
        return "350x220px", "600x380px", "Hero / Showcase Featured Product"
        
    # 4. Video Posters
    if "poster" in tag_type or "poster" in src_lower:
        return "350x220px", "580x360px", "Video Preview Poster"
        
    # 5. Grid cards (serve-card, sector-card, sq-photo-card, test-grid)
    if "card" in cls_lower or "serve" in cls_lower or "sector" in cls_lower or "sq" in cls_lower:
        return "350x220px", "380x240px", "Sector / Solution Card Image"
        
    # 6. Testimonial / Review avatar
    if "avatar" in cls_lower or "test" in cls_lower or "review" in src_lower or "photo-1441986300917" in src_lower or "photo-1554118811" in src_lower:
        return "48x48px", "60x60px", "Customer Testimonial Avatar"
        
    # 7. Unsplash industry cards
    if "unsplash.com" in src_lower:
        if "w=200" in src_lower:
            return "48x48px", "60x60px", "Testimonial Avatar"
        return "350x220px", "400x260px", "Vertical / Industry Showcase Image"
        
    # 8. Icons / Favicons
    if "favicon" in tag_type or "favicon" in src_lower or "icon" in tag_type:
        return "32x32px", "32x32px", "Browser Icon / Favicon"
        
    # 9. Meta images
    if "meta" in tag_type:
        return "1200x630px (Social)", "1200x630px (Social)", "Social Graph Preview Meta"
        
    # Default fallback
    return "350x220px", "450x280px", "Content Image"

for item in raw_inventory:
    info = item["info"]
    raw_src = item["raw_src"].strip()
    tag_type = item["tag_type"]
    context = item["context"]
    cls = item.get("class", "")
    style = item.get("style", "")
    
    # Canonical key
    if info["type"] == "local":
        key = info["path"].replace("\\", "/")
    elif info["type"] == "external":
        key = raw_src.split("?")[0] # base URL without query for grouping
    else:
        key = raw_src
        
    if key not in images_map:
        images_map[key] = {
            "canonical_path": key,
            "raw_samples": set(),
            "info": info,
            "contexts": set(),
            "tag_types": set(),
            "missing_dim_count": 0,
            "missing_alt_count": 0,
            "has_alt_count": 0,
            "sample_alts": set(),
            "classes": set(),
            "styles": set()
        }
        
    rec = images_map[key]
    rec["raw_samples"].add(raw_src)
    rec["contexts"].add(context)
    rec["tag_types"].add(tag_type)
    if cls: rec["classes"].add(cls)
    if style: rec["styles"].add(style)
    
    if tag_type == "img":
        if not item.get("width") or not item.get("height"):
            rec["missing_dim_count"] += 1
        alt = item.get("alt")
        if alt is None or alt.strip() == "":
            rec["missing_alt_count"] += 1
        else:
            rec["has_alt_count"] += 1
            rec["sample_alts"].add(alt)

inventory_table = []

for key, rec in images_map.items():
    info = rec["info"]
    fmt = info.get("format", "UNKNOWN")
    raw_sample = list(rec["raw_samples"])[0]
    sample_ctx = list(rec["contexts"])[0]
    sample_cls = list(rec["classes"])[0] if rec["classes"] else ""
    sample_style = list(rec["styles"])[0] if rec["styles"] else ""
    
    disp_390, disp_1440, comp_role = get_displayed_sizes(sample_ctx, list(rec["tag_types"])[0], raw_sample, sample_cls, sample_style)
    
    # Analyze problems
    problems = []
    
    # Check dimensions
    if rec["missing_dim_count"] > 0:
        problems.append("missing dimensions (no width/height)")
        
    # Check alt
    if rec["missing_alt_count"] > 0:
        problems.append("missing or empty alt text")
        
    # Check spaces in filename
    if " " in key:
        problems.append("spaces in filename (URL encoding risk)")
        
    # Check local image specifics
    if info["type"] == "local":
        w = info.get("width", 0)
        h = info.get("height", 0)
        kb = info.get("size_kb", 0)
        
        # Format problem
        if fmt in {"PNG", "JPG", "JPEG"}:
            if "logo" in key.lower() and fmt != "SVG":
                problems.append("raster logo (should use SVG or optimized transparent WebP)")
            elif "logo" not in key.lower() and "favicon" not in key.lower() and "icon" not in key.lower():
                problems.append("wrong format (legacy PNG/JPG without modern WebP/AVIF responsive srcset)")
                
        # Oversized problem
        if kb > 400:
            problems.append(f"oversized ({kb} KB, exceeds 150-300KB budget)")
        elif kb > 150 and ("card" in comp_role.lower() or "avatar" in comp_role.lower() or "badge" in comp_role.lower()):
            problems.append(f"oversized for component role ({kb} KB)")
            
        # Cropping risk
        if "screenshot" in key.lower() or "preview" in key.lower() or "billing" in key.lower() or "pos" in key.lower() or "front" in key.lower() or "badge" in comp_role.lower():
            if "cover" in sample_style or "cover" in sample_cls:
                problems.append("cropped/cut-off risk (screenshot/UI/badge using object-fit:cover)")
                
    elif info["type"] == "external":
        problems.append("external Unsplash image (fixed query dimensions, missing local WebP srcset)")
    elif info["type"] == "missing":
        problems.append("MISSING / 404 file reference")
        
    pixel_size = f"{info.get('width', 'N/A')}x{info.get('height', 'N/A')}" if info["type"] == "local" else "Remote/Variable"
    file_size = f"{info.get('size_kb', 'N/A')} KB" if info["type"] == "local" else "External"
    
    # Simplify context list
    ctx_list = sorted(list(rec["contexts"]))
    if len(ctx_list) > 3:
        used_where = f"{ctx_list[0]}, {ctx_list[1]} (+{len(ctx_list)-2} more pages)"
    else:
        used_where = ", ".join(ctx_list)
        
    inventory_table.append({
        "file_or_url": key,
        "role": comp_role,
        "used_where": used_where,
        "pages_count": len(ctx_list),
        "format": fmt,
        "pixel_size": pixel_size,
        "file_size": file_size,
        "file_size_kb": info.get("size_kb", 0) if info["type"] == "local" else 9999,
        "disp_390": disp_390,
        "disp_1440": disp_1440,
        "problems": "; ".join(problems) if problems else "None (Optimal)"
    })

# Sort by file size descending
inventory_table.sort(key=lambda x: -x["file_size_kb"])

with open("scratch/step0_inventory_table.json", "w", encoding="utf-8") as f:
    json.dump(inventory_table, f, indent=2)

print(f"Inventory table generated with {len(inventory_table)} unique images/sources.")

