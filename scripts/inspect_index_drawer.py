with open("index.html", "r", encoding="utf-8", errors="ignore") as f:
    lines = f.readlines()

for i, l in enumerate(lines):
    if "mobileDrawer" in l or "mobile-drawer" in l or "m-drawer" in l:
        print(f"Line {i+1}: {l.strip()[:100]}")
