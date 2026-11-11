import os
import re
from PIL import Image

pages = [
    "index.html",
    "pos.html",
    "complete-management-system.html",
    "website-builder.html",
    "digital-marketing.html",
    "solutions.html",
    "all-business-types.html",
    "interactive-demo.html"
]

for p in pages:
    if not os.path.exists(p):
        print(f"Skipping {p} (not found)")
        continue
    with open(p, "r", encoding="utf-8", errors="ignore") as f:
        html = f.read()
    imgs = re.findall(r'<img\s+([^>]+)>', html, re.IGNORECASE)
    print(f"\n=== {p} ({len(imgs)} img tags) ===")
    for idx, attrs in enumerate(imgs, 1):
        src_m = re.search(r'src=["\']([^"\']+)["\']', attrs, re.IGNORECASE)
        alt_m = re.search(r'alt=["\']([^"\']*)["\']', attrs, re.IGNORECASE)
        w_m = re.search(r'width=["\']?(\d+)', attrs, re.IGNORECASE)
        h_m = re.search(r'height=["\']?(\d+)', attrs, re.IGNORECASE)
        load_m = re.search(r'loading=["\']([^"\']+)["\']', attrs, re.IGNORECASE)
        class_m = re.search(r'class=["\']([^"\']+)["\']', attrs, re.IGNORECASE)
        
        src = src_m.group(1) if src_m else "NO_SRC"
        alt = alt_m.group(1) if alt_m else "NO_ALT"
        w = w_m.group(1) if w_m else "NO_W"
        h = h_m.group(1) if h_m else "NO_H"
        loading = load_m.group(1) if load_m else "NO_LOADING"
        cls = class_m.group(1) if class_m else ""
        print(f"  [{idx}] src: {src} | alt: {alt} | {w}x{h} | load: {loading} | class: {cls}")

