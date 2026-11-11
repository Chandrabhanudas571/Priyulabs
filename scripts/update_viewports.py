import os
import re

count = 0
for root, dirs, files in os.walk("."):
    dirs[:] = [d for d in dirs if d not in {'node_modules', '.git', 'backup-media', 'backup-images', 'dist', 'video-work'}]
    for f in files:
        if f.endswith(".html"):
            p = os.path.join(root, f)
            with open(p, "r", encoding="utf-8", errors="ignore") as fp:
                c = fp.read()
            
            # Search for meta viewport
            if '<meta name="viewport"' in c or "<meta name='viewport'" in c:
                new_c = re.sub(
                    r'<meta\s+name=["\']viewport["\']\s+content=["\'][^"\']*["\']>',
                    '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">',
                    c,
                    flags=re.IGNORECASE
                )
            else:
                # Add after <head> or charset
                new_c = re.sub(
                    r'(<head[^>]*>)',
                    r'\1\n  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">',
                    c,
                    count=1,
                    flags=re.IGNORECASE
                )
            
            if new_c != c:
                with open(p, "w", encoding="utf-8") as fp:
                    fp.write(new_c)
                count += 1

print(f"Updated viewport meta in {count} HTML files.")
