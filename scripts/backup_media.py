import os
import shutil

WORKSPACE = os.path.abspath(".")
BACKUP_MEDIA = os.path.join(WORKSPACE, "backup-media")
os.makedirs(BACKUP_MEDIA, exist_ok=True)

MEDIA_EXTS = {".jpg", ".jpeg", ".png", ".webp", ".svg", ".gif", ".ico", ".avif", ".mp4", ".webm", ".mov"}

copied = 0
for root, dirs, files in os.walk(WORKSPACE):
    rel_root = os.path.relpath(root, WORKSPACE)
    parts = rel_root.split(os.sep)
    if any(p in {"node_modules", ".git", "backup-images", "backup-media", "dist", "video-work", "scratch", "artifacts"} for p in parts):
        continue
    if "apps" in parts and "dist" in parts:
        continue
    
    for f in files:
        ext = os.path.splitext(f)[1].lower()
        if ext in MEDIA_EXTS:
            src_path = os.path.join(root, f)
            rel_path = os.path.relpath(src_path, WORKSPACE)
            dest_path = os.path.join(BACKUP_MEDIA, rel_path)
            os.makedirs(os.path.dirname(dest_path), exist_ok=True)
            if not os.path.exists(dest_path):
                shutil.copy2(src_path, dest_path)
                copied += 1

print(f"Backed up {copied} media files to {BACKUP_MEDIA}")
