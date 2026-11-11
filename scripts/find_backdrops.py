import os
import re

for fname in ["style.css", "index.html", "complete-management-system.html", "website-builder.html", "digital-marketing.html", "solutions.html"]:
    if not os.path.exists(fname): continue
    with open(fname, "r", encoding="utf-8", errors="ignore") as f:
        c = f.read()
    
    # check backdrop rules
    backdrops = re.findall(r'([^{}]*(?:backdrop|overlay)[^{}]*)\{([^{}]+)\}', c, re.IGNORECASE)
    print(f"\n=== {fname} ({len(backdrops)} backdrop/overlay rules) ===")
    for sel, b in backdrops[:6]:
        sel = sel.strip().replace('\n', ' ')
        b_clean = ' '.join(b.split())
        print(f"  {sel[:45]} -> {b_clean[:65]}")
