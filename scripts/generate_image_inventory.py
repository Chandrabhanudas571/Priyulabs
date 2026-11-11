import os
import re
import json
import urllib.parse
from PIL import Image

WORKSPACE = os.path.abspath(".")
IMAGE_EXTS = {".jpg", ".jpeg", ".png", ".webp", ".svg", ".gif", ".ico", ".avif"}

def get_file_info(rel_or_abs_path, from_file_dir):
    # Try resolving path relative to workspace or from_file_dir
    cleaned_path = rel_or_abs_path.split("?")[0].split("#")[0].strip("\"' ")
    if cleaned_path.startswith("http://") or cleaned_path.startswith("https://"):
        return {
            "type": "external",
            "path": cleaned_path,
            "format": cleaned_path.split(".")[-1].split("?")[0].lower() if "." in cleaned_path else "unknown",
            "size": "N/A",
            "width": "N/A",
            "height": "N/A"
        }
    
    # URL decode
    unquoted = urllib.parse.unquote(cleaned_path)
    
    # Possible candidates
    candidates = []
    if unquoted.startswith("/"):
        candidates.append(os.path.join(WORKSPACE, unquoted.lstrip("/\\")))
    else:
        candidates.append(os.path.join(from_file_dir, unquoted))
        candidates.append(os.path.join(WORKSPACE, unquoted))
        candidates.append(os.path.join(WORKSPACE, "assets", os.path.basename(unquoted)))
    
    resolved = None
    for cand in candidates:
        cand_norm = os.path.normpath(cand)
        if os.path.isfile(cand_norm):
            resolved = cand_norm
            break
            
    if not resolved:
        return {
            "type": "missing",
            "path": cleaned_path,
            "format": "missing",
            "size": "missing",
            "width": 0,
            "height": 0
        }
        
    file_bytes = os.path.getsize(resolved)
    ext = os.path.splitext(resolved)[1].lower()
    w, h = 0, 0
    if ext == ".svg":
        # simple svg dimension extraction
        try:
            with open(resolved, "r", encoding="utf-8", errors="ignore") as f:
                content = f.read(2048)
                vw = re.search(r'viewBox=["\']0\s+0\s+(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)["\']', content)
                if vw:
                    w, h = int(float(vw.group(1))), int(float(vw.group(2)))
                else:
                    sw = re.search(r'width=["\'](\d+(?:\.\d+)?)["\']', content)
                    sh = re.search(r'height=["\'](\d+(?:\.\d+)?)["\']', content)
                    if sw and sh:
                        w, h = int(float(sw.group(1))), int(float(sh.group(2)))
        except Exception:
            pass
    elif ext in {".jpg", ".jpeg", ".png", ".webp", ".gif"}:
        try:
            with Image.open(resolved) as im:
                w, h = im.size
        except Exception:
            pass
    elif ext == ".ico":
        try:
            with Image.open(resolved) as im:
                w, h = im.size
        except Exception:
            w, h = 32, 32
            
    return {
        "type": "local",
        "path": os.path.relpath(resolved, WORKSPACE).replace("\\", "/"),
        "format": ext.lstrip(".").upper(),
        "bytes": file_bytes,
        "size_kb": round(file_bytes / 1024, 1),
        "width": w,
        "height": h
    }

# Gather all target files
all_html = []
all_css = []
all_js = []

for root, dirs, files in os.walk(WORKSPACE):
    rel_root = os.path.relpath(root, WORKSPACE)
    parts = rel_root.split(os.sep)
    if any(p in {"node_modules", ".git", "backup-images", "dist", "apps", "video-work", "scratch", "artifacts"} for p in parts):
        continue
    for f in files:
        ext = os.path.splitext(f)[1].lower()
        full_p = os.path.join(root, f)
        if ext == ".html":
            all_html.append(full_p)
        elif ext == ".css":
            all_css.append(full_p)
        elif ext in {".js", ".cjs"}:
            all_js.append(full_p)

print(f"Scanning {len(all_html)} HTML files, {len(all_css)} CSS files, {len(all_js)} JS files...")

inventory = []

# Scan CSS files for background-image
for css_file in all_css:
    rel_css = os.path.relpath(css_file, WORKSPACE).replace("\\", "/")
    with open(css_file, "r", encoding="utf-8", errors="ignore") as f:
        content = f.read()
    urls = re.findall(r'url\s*\(\s*["\']?([^"\'\)\s]+)["\']?\s*\)', content)
    for u in urls:
        ext = os.path.splitext(u.split("?")[0])[1].lower()
        if ext in IMAGE_EXTS:
            info = get_file_info(u, os.path.dirname(css_file))
            inventory.append({
                "context": f"CSS ({rel_css})",
                "tag_type": "css-background",
                "raw_src": u,
                "info": info,
                "alt": "N/A (CSS)",
                "loading": "N/A",
                "has_dims": False
            })

# Scan HTML files
for html_file in all_html:
    rel_html = os.path.relpath(html_file, WORKSPACE).replace("\\", "/")
    file_dir = os.path.dirname(html_file)
    with open(html_file, "r", encoding="utf-8", errors="ignore") as f:
        content = f.read()
        
    # 1. <img> tags
    img_matches = re.finditer(r'<img\s+([^>]*?)>', content, re.IGNORECASE | re.DOTALL)
    for m in img_matches:
        attrs = m.group(1)
        src_m = re.search(r'src=["\']([^"\']+)["\']', attrs, re.IGNORECASE)
        alt_m = re.search(r'alt=["\']([^"\']*)["\']', attrs, re.IGNORECASE)
        w_m = re.search(r'width=["\']?(\d+)', attrs, re.IGNORECASE)
        h_m = re.search(r'height=["\']?(\d+)', attrs, re.IGNORECASE)
        load_m = re.search(r'loading=["\']([^"\']+)["\']', attrs, re.IGNORECASE)
        dec_m = re.search(r'decoding=["\']([^"\']+)["\']', attrs, re.IGNORECASE)
        fetch_m = re.search(r'fetchpriority=["\']([^"\']+)["\']', attrs, re.IGNORECASE)
        style_m = re.search(r'style=["\']([^"\']+)["\']', attrs, re.IGNORECASE)
        class_m = re.search(r'class=["\']([^"\']+)["\']', attrs, re.IGNORECASE)
        
        src = src_m.group(1) if src_m else ""
        if not src:
            continue
        info = get_file_info(src, file_dir)
        inventory.append({
            "context": rel_html,
            "tag_type": "img",
            "raw_src": src,
            "info": info,
            "alt": alt_m.group(1) if alt_m else None,
            "width": w_m.group(1) if w_m else None,
            "height": h_m.group(1) if h_m else None,
            "loading": load_m.group(1) if load_m else None,
            "decoding": dec_m.group(1) if dec_m else None,
            "fetchpriority": fetch_m.group(1) if fetch_m else None,
            "class": class_m.group(1) if class_m else "",
            "style": style_m.group(1) if style_m else ""
        })
        
    # 2. <picture> / <source> tags
    source_matches = re.finditer(r'<source\s+([^>]*?)>', content, re.IGNORECASE | re.DOTALL)
    for m in source_matches:
        attrs = m.group(1)
        srcset_m = re.search(r'srcset=["\']([^"\']+)["\']', attrs, re.IGNORECASE)
        if srcset_m:
            src = srcset_m.group(1)
            info = get_file_info(src.split()[0], file_dir)
            inventory.append({
                "context": rel_html,
                "tag_type": "picture-source",
                "raw_src": src,
                "info": info,
                "alt": "N/A",
                "loading": "N/A"
            })
            
    # 3. <link rel="preload" as="image" href="...">
    preload_matches = re.finditer(r'<link\s+[^>]*?as=["\']image["\'][^>]*?>', content, re.IGNORECASE | re.DOTALL)
    for m in preload_matches:
        attrs = m.group(0)
        href_m = re.search(r'href=["\']([^"\']+)["\']', attrs, re.IGNORECASE)
        if href_m:
            src = href_m.group(1)
            info = get_file_info(src, file_dir)
            inventory.append({
                "context": rel_html,
                "tag_type": "link-preload",
                "raw_src": src,
                "info": info,
                "alt": "N/A (Preload)",
                "loading": "N/A"
            })

    # 4. favicon / apple-touch-icon
    icon_matches = re.finditer(r'<link\s+[^>]*?rel=["\'](?:shortcut )?(?:icon|apple-touch-icon)["\'][^>]*?>', content, re.IGNORECASE | re.DOTALL)
    for m in icon_matches:
        attrs = m.group(0)
        href_m = re.search(r'href=["\']([^"\']+)["\']', attrs, re.IGNORECASE)
        if href_m:
            src = href_m.group(1)
            info = get_file_info(src, file_dir)
            inventory.append({
                "context": rel_html,
                "tag_type": "icon/favicon",
                "raw_src": src,
                "info": info,
                "alt": "N/A (Icon)",
                "loading": "N/A"
            })
            
    # 5. og:image / twitter:image
    meta_matches = re.finditer(r'<meta\s+[^>]*?(?:property|name)=["\'](?:og:image|twitter:image)["\'][^>]*?>', content, re.IGNORECASE | re.DOTALL)
    for m in meta_matches:
        attrs = m.group(0)
        content_m = re.search(r'content=["\']([^"\']+)["\']', attrs, re.IGNORECASE)
        if content_m:
            src = content_m.group(1)
            info = get_file_info(src, file_dir)
            inventory.append({
                "context": rel_html,
                "tag_type": "og/twitter-meta",
                "raw_src": src,
                "info": info,
                "alt": "N/A (Meta)",
                "loading": "N/A"
            })
            
    # 6. video poster="..."
    video_matches = re.finditer(r'<video\s+[^>]*?poster=["\']([^"\']+)["\'][^>]*?>', content, re.IGNORECASE | re.DOTALL)
    for m in video_matches:
        src = m.group(1)
        info = get_file_info(src, file_dir)
        inventory.append({
            "context": rel_html,
            "tag_type": "video-poster",
            "raw_src": src,
            "info": info,
            "alt": "N/A (Poster)",
            "loading": "N/A"
        })

    # 7. Inline background-image styles
    inline_bg = re.finditer(r'style=["\'][^"\']*?background(?:-image)?:\s*url\s*\(\s*["\']?([^"\'\)\s]+)["\']?\s*\)', content, re.IGNORECASE)
    for m in inline_bg:
        src = m.group(1)
        info = get_file_info(src, file_dir)
        inventory.append({
            "context": rel_html,
            "tag_type": "inline-style-bg",
            "raw_src": src,
            "info": info,
            "alt": "N/A (Background)",
            "loading": "N/A"
        })

with open("scratch/inventory_raw.json", "w", encoding="utf-8") as f:
    json.dump(inventory, f, indent=2)

print(f"Total image reference instances found: {len(inventory)}")

