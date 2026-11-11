import json
import os

with open("scratch/step0_inventory_table.json", "r", encoding="utf-8") as f:
    table = json.load(f)

md_lines = []
md_lines.append("# PriyuLabs Comprehensive Image Inventory & Audit (Step 0)")
md_lines.append("")
md_lines.append("> [!IMPORTANT]")
md_lines.append("> **Audit Scope**: 183 HTML files, shared `style.css`, `script.js`, templates, and data files scanned.")
md_lines.append("> All original assets are backed up in `/backup-images` (847 files).")
md_lines.append("")
md_lines.append("## Executive Summary of Problems Detected")
md_lines.append("")
md_lines.append("1. **Critical Oversized Assets**:")
md_lines.append("   - `Made in india logo.png` (2,183.5 KB / 2.2 MB) displayed at only 110x48px in footers.")
md_lines.append("   - `priyulabs-whatsapp.png` (1,192.5 KB / 1.2 MB) displayed at only 48x48px for floating WhatsApp button.")
md_lines.append("   - `solution_page_front.png` (2,143.7 KB / 2.1 MB) uncompressed PNG used as hero showcase.")
md_lines.append("   - `grocerry bussiness type front image.png` (2,079.1 KB / 2.1 MB) uncompressed PNG.")
md_lines.append("   - `image_4.png` (1,333.5 KB / 1.3 MB) uncompressed PNG.")
md_lines.append("   - `priyulabs_intro_transparent.webp` (2,606.0 KB / 2.6 MB) intro animation overlay.")
md_lines.append("2. **Layout Shift Risk (Missing Dimensions)**:")
md_lines.append("   - Over 95% of `<img>` tags throughout the site lack explicit `width` and `height` attributes, causing Cumulative Layout Shift (CLS) during page loading.")
md_lines.append("3. **Cropping & Cut-Off Side Risks**:")
md_lines.append("   - CSS rules such as `.sq-card-img`, `.serve-mini-img`, and `.cms-whatsapp-img` enforce `object-fit: cover !important` on elements containing UI screenshots, logos, and badges, causing side cropping or cut-off labels on mobile.")
md_lines.append("4. **Format Inefficiencies & Lack of Responsive Art Direction**:")
md_lines.append("   - All local photos and screenshots are served as fixed single-resolution JPGs/PNGs without `<picture>` or `srcset` (no 480w, 768w, 1200w, 1600w variants). Phones download massive desktop-resolution images.")
md_lines.append("5. **Broken References (404s)**:")
md_lines.append("   - `assets/complete-management-system-poster.jpg` referenced in `management.html` does not exist (actual file is `card2-management-poster.jpg`).")
md_lines.append("6. **Filenames with Spaces**:")
md_lines.append("   - `Made in india logo.png`, `grocerry bussiness type front image.png`, `solution page front.png`, `sequre ssl.jpg` cause encoding issues and broken links on strict HTTP servers.")
md_lines.append("")
md_lines.append("---")
md_lines.append("")
md_lines.append("## Master Image Inventory Table")
md_lines.append("")
md_lines.append("| Image / Source | Role / Component | Format | Pixel Dimensions | File Size | Displayed Size @ 390px | Displayed Size @ 1440px | Identified Problems |")
md_lines.append("| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :--- |")

for row in table:
    src = row["file_or_url"]
    # Truncate long URLs for markdown display
    if len(src) > 50 and "unsplash.com" in src:
        src_disp = src.split("?")[0][-35:] + "..."
    elif len(src) > 50:
        src_disp = "..." + src[-45:]
    else:
        src_disp = src
    role = row["role"]
    fmt = row["format"]
    pixel = row["pixel_size"]
    fsize = row["file_size"]
    d390 = row["disp_390"]
    d1440 = row["disp_1440"]
    probs = row["problems"]
    
    md_lines.append(f"| `{src_disp}` | {role} | {fmt} | {pixel} | {fsize} | {d390} | {d1440} | {probs} |")

output_content = "\n".join(md_lines)
with open("scratch/image_inventory_report.md", "w", encoding="utf-8") as f:
    f.write(output_content)

print(f"Generated Markdown report ({len(md_lines)} lines).")

