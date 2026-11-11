import os

for fname in ["style.css", "index.html", "complete-management-system.html", "website-builder.html", "digital-marketing.html", "solutions.html"]:
    if not os.path.exists(fname): continue
    with open(fname, "r", encoding="utf-8", errors="ignore") as f:
        lines = f.readlines()
    print(f"\n=== {fname} ===")
    for i, l in enumerate(lines):
        if any(k in l for k in [".drawer-backdrop", ".m-drawer-backdrop", "#drawerBackdrop", "m-overlay"]):
            print(f"  Line {i+1}: {l.strip()[:80]}")
