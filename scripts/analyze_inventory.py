import json
import os
from collections import defaultdict

with open("scratch/inventory_raw.json", "r", encoding="utf-8") as f:
    items = f.read()
    data = json.loads(items)

unique_images = defaultdict(lambda: {
    "contexts": set(),
    "tag_types": set(),
    "info": None,
    "missing_alt_count": 0,
    "total_refs": 0,
    "missing_dims_count": 0,
    "has_lazy_count": 0,
    "classes": set(),
    "styles": set()
})

for item in data:
    info = item["info"]
    path_key = info["path"] if info["type"] == "local" else item["raw_src"]
    
    entry = unique_images[path_key]
    entry["contexts"].add(item["context"])
    entry["tag_types"].add(item["tag_type"])
    entry["info"] = info
    entry["total_refs"] += 1
    
    if item.get("alt") is None or item.get("alt") == "":
        entry["missing_alt_count"] += 1
    if not item.get("width") or not item.get("height"):
        entry["missing_dims_count"] += 1
    if item.get("loading") == "lazy":
        entry["has_lazy_count"] += 1
    if item.get("class"):
        entry["classes"].add(item.get("class"))
    if item.get("style"):
        entry["styles"].add(item.get("style"))

print(f"Total unique referenced images: {len(unique_images)}")

summary = []
for path, details in sorted(unique_images.items(), key=lambda x: -x[1]["total_refs"]):
    info = details["info"]
    summary.append({
        "path": path,
        "type": info["type"],
        "format": info["format"],
        "pixel_size": f"{info.get('width', 'N/A')}x{info.get('height', 'N/A')}",
        "file_size_kb": info.get("size_kb", "N/A"),
        "total_refs": details["total_refs"],
        "sample_contexts": list(details["contexts"])[:5],
        "tag_types": list(details["tag_types"]),
        "missing_alt_count": details["missing_alt_count"],
        "missing_dims_count": details["missing_dims_count"],
        "classes": list(details["classes"])[:3]
    })

with open("scratch/inventory_summary.json", "w", encoding="utf-8") as f:
    json.dump(summary, f, indent=2)

print("Saved scratch/inventory_summary.json")

