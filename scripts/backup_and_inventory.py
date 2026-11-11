import os
import shutil
import re
from PIL import Image

WORKSPACE = os.path.abspath(".")
BACKUP_DIR = os.path.join(WORKSPACE, "backup-images")
IMAGE_EXTS = {".jpg", ".jpeg", ".png", ".webp", ".svg", ".gif", ".ico", ".avif"}

# 1. Backup all source images
copied = 0
for root, dirs, files in os.walk(WORKSPACE):
    # Skip ignored dirs
    rel_root = os.path.relpath(root, WORKSPACE)
    parts = rel_root.split(os.sep)
    if any(p in {"node_modules", ".git", "backup-images", "dist", "video-work", "scratch", "artifacts"} for p in parts):
        continue
    if "apps" in parts and "dist" in parts:
        continue
    
    for f in files:
        ext = os.path.splitext(f)[1].lower()
        if ext in IMAGE_EXTS:
            src_path = os.path.join(root, f)
            rel_path = os.path.relpath(src_path, WORKSPACE)
            dest_path = os.path.join(BACKUP_DIR, rel_path)
            os.makedirs(os.path.dirname(dest_path), exist_ok=True)
            if not os.path.exists(dest_path):
                shutil.copy2(src_path, dest_path)
                copied += 1

print(f"Backed up {copied} images to {BACKUP_DIR}")

