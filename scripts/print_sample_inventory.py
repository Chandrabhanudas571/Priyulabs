import json

with open("scratch/step0_inventory_table.json", "r", encoding="utf-8") as f:
    tbl = json.load(f)

print(f"Total entries: {len(tbl)}")
print("\nTop 15 largest local images:")
local_rows = [r for r in tbl if r["file_size"] != "External"]
for row in local_rows[:15]:
    print(f"- File: {row['file_or_url']}")
    print(f"  Format: {row['format']}, Pixel: {row['pixel_size']}, FileSize: {row['file_size']}")
    print(f"  Role: {row['role']}")
    print(f"  Used in: {row['used_where']} ({row['pages_count']} pages)")
    print(f"  Disp 390px: {row['disp_390']}, Disp 1440px: {row['disp_1440']}")
    print(f"  Problems: {row['problems']}")
    print()

