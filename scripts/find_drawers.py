import glob
import re
import os

all_html = []
for root, dirs, files in os.walk("."):
    if any(p in root for p in ["node_modules", ".git", "backup", "dist"]):
        continue
    for f in files:
        if f.endswith(".html"):
            all_html.append(os.path.join(root, f))

print(f"Total HTML files to inspect: {len(all_html)}")

drawer_pages = []
for path in all_html:
    with open(path, "r", encoding="utf-8", errors="ignore") as f:
        content = f.read()
    
    drawer_matches = re.findall(r'class=["\'][^"\']*(?:mobile-drawer|drawer-sheet|drawer-backdrop|m-drawer)[^"\']*["\']', content, re.IGNORECASE)
    hamburger_matches = re.findall(r'class=["\'][^"\']*(?:hamburger|menu-toggle)[^"\']*["\']', content, re.IGNORECASE)
    
    if drawer_matches or hamburger_matches:
        drawer_pages.append({
            "path": path.replace("\\", "/"),
            "drawers": len(drawer_matches),
            "hamburgers": len(hamburger_matches),
            "has_desktop_guard": bool(re.search(r'@media[^{]+(?:min-width:\s*(?:769|1024|1025)px)[^{]*\{[^}]*(?:mobile-drawer|m-drawer)[^}]*display:\s*none', content, re.DOTALL))
        })

print(f"Found {len(drawer_pages)} pages with drawer/hamburger elements.")
for p in drawer_pages[:20]:
    print(f"  {p['path']}: {p['drawers']} drawer elems, {p['hamburgers']} hamburgers, has_guard={p['has_desktop_guard']}")
