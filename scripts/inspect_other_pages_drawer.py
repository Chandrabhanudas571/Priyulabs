import glob
import re

pages = ["index.html", "pos.html", "complete-management-system.html", "website-builder.html", "digital-marketing.html", "solutions.html", "all-business-types.html", "business-types.html"]

for p in pages:
    try:
        with open(p, "r", encoding="utf-8", errors="ignore") as f:
            c = f.read()
        print(f"\n=== {p} ===")
        # Look for drawer markup
        drawer_divs = re.findall(r'<[^>]+(?:mobile-drawer|drawer-sheet|m-drawer|drawer-backdrop)[^>]*>', c)
        print(f"  Drawer tags found: {len(drawer_divs)}")
        for d in drawer_divs[:3]:
            print(f"    {d[:80]}")
        # Look for unstyled text signs: e.g. does it have inline styles or rely on style.css?
        has_drawer_css = "drawer" in c and "<style" in c
        print(f"  Has internal style with drawer: {has_drawer_css}")
    except Exception as e:
        print(f"Error reading {p}: {e}")
