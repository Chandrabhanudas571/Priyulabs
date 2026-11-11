import os
import re

fixed_count = 0
for root, dirs, files in os.walk("."):
    dirs[:] = [d for d in dirs if d not in {'node_modules', '.git', 'backup-media', 'backup-images', 'dist', 'video-work'}]
    for f in files:
        if f.endswith(".html"):
            path = os.path.join(root, f)
            with open(path, "r", encoding="utf-8", errors="ignore") as fp:
                content = fp.read()
            if 'id="mobileDrawer"' in content and 'id="drawerBackdrop"' not in content:
                new_content = re.sub(
                    r'(<div[^>]*id=["\']mobileDrawer["\'])',
                    r'<div class="drawer-backdrop m-drawer-backdrop" id="drawerBackdrop" aria-hidden="true" onclick="closeMobileDrawer && closeMobileDrawer()"></div>\n\1',
                    content,
                    count=1
                )
                if new_content != content:
                    with open(path, "w", encoding="utf-8") as fp:
                        fp.write(new_content)
                    fixed_count += 1
                    print(f"Added backdrop to {path}")

print(f"Backdrop added to {fixed_count} HTML pages.")
