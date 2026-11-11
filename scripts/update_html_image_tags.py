import os
import re

DIMENSIONS_MAP = {
    "logo.svg": ("32", "32"),
    "favicon.svg": ("32", "32"),
    "favicon.png": ("32", "32"),
    "made_in_india_logo.webp": ("110", "48"),
    "made_in_india_logo_opt.png": ("110", "48"),
    "msme_ashoka_emblem.webp": ("40", "50"),
    "msme_ashoka_emblem_opt.png": ("40", "50"),
    "secure_ssl.webp": ("100", "42"),
    "sequre ssl.jpg": ("100", "42"),
    "priyulabs-whatsapp.png": ("48", "48"),
    "priyulabs-whatsapp.webp": ("48", "48"),
    "priyulabs_intro_transparent.webp": ("400", "400"),
    "smart_pos_touch_billing.jpg": ("600", "380"),
    "card1-pos-poster.jpg": ("600", "380"),
    "card2-management-poster.jpg": ("600", "380"),
    "card3-website-poster.jpg": ("600", "380"),
    "card4-marketing-poster.jpg": ("600", "380"),
    "complete-management-system-poster.jpg": ("600", "380"),
    "custom_website_builder.jpg": ("600", "380"),
    "digital_marketing_ads.jpg": ("600", "380"),
    "solution_page_front.png": ("1200", "692"),
    "solution_page_front.webp": ("1200", "692"),
    "grocery_business_type_front.png": ("1200", "574"),
    "grocerry bussiness type front image.png": ("1200", "574"),
    "hero_platform_showcase.jpg": ("1200", "675"),
    "pos_stock_prediction.jpg": ("600", "380"),
    "pos_offline_counter.jpg": ("600", "380"),
    "pine_labs_real.jpg": ("600", "380"),
    "inventory_ocr_preview.jpg": ("600", "380"),
    "hrms_selfie_preview.jpg": ("600", "380"),
    "image_4.png": ("400", "580"),
    "image_4.webp": ("400", "580")
}

updated_pages = 0

for root, dirs, files in os.walk("."):
    dirs[:] = [d for d in dirs if d not in {'node_modules', '.git', 'backup-media', 'backup-images', 'dist', 'video-work'}]
    for f in files:
        if f.endswith(".html"):
            p = os.path.join(root, f)
            with open(p, "r", encoding="utf-8", errors="ignore") as fp:
                content = fp.read()

            orig_content = content

            # 1. Normalize spaces in file names & massive PNGs to WebP
            content = content.replace("Made in india logo.png", "assets/made_in_india_logo.webp")
            content = content.replace("made_in_india_logo.png", "assets/made_in_india_logo.webp")
            content = content.replace("sequre ssl.jpg", "assets/secure_ssl.webp")
            content = content.replace("grocerry bussiness type front image.png", "assets/grocery_business_type_front.png")
            content = content.replace("solution page front.png", "assets/solution_page_front.png")
            content = content.replace("assets/complete-management-system-poster.jpg", "assets/card2-management-poster.jpg")
            
            # 2. Process all <img> tags
            def fix_img_tag(match):
                attrs = match.group(1)
                
                # Extract attributes
                src_m = re.search(r'src=["\']([^"\']+)["\']', attrs, re.IGNORECASE)
                alt_m = re.search(r'alt=["\']([^"\']*)["\']', attrs, re.IGNORECASE)
                w_m = re.search(r'width=["\']?(\d+)', attrs, re.IGNORECASE)
                h_m = re.search(r'height=["\']?(\d+)', attrs, re.IGNORECASE)
                load_m = re.search(r'loading=["\']([^"\']+)["\']', attrs, re.IGNORECASE)
                dec_m = re.search(r'decoding=["\']([^"\']+)["\']', attrs, re.IGNORECASE)
                fetch_m = re.search(r'fetchpriority=["\']([^"\']+)["\']', attrs, re.IGNORECASE)
                class_m = re.search(r'class=["\']([^"\']+)["\']', attrs, re.IGNORECASE)

                if not src_m:
                    return match.group(0)

                src = src_m.group(1)
                is_hero = "hero" in src.lower() or "showcase" in src.lower() or (class_m and "hero" in class_m.group(1).lower())
                
                # Check Unsplash URL
                if "images.unsplash.com" in src:
                    # Append w=800&q=75&auto=format&fm=webp if not present
                    if "w=" in src:
                        src = re.sub(r'w=\d+', 'w=800', src)
                    else:
                        src += "&w=800"
                    if "q=" in src:
                        src = re.sub(r'q=\d+', 'q=75', src)
                    else:
                        src += "&q=75"
                    if "fm=" not in src:
                        src += "&fm=webp"
                    attrs = re.sub(r'src=["\'][^"\']+["\']', f'src="{src}"', attrs)

                # Set dimensions
                fname = os.path.basename(src.split("?")[0])
                if fname in DIMENSIONS_MAP and (not w_m or not h_m):
                    w, h = DIMENSIONS_MAP[fname]
                    if not w_m:
                        attrs += f' width="{w}"'
                    if not h_m:
                        attrs += f' height="{h}"'
                elif not w_m and not h_m:
                    if "avatar" in src.lower() or "w=200" in src.lower():
                        attrs += ' width="60" height="60"'
                    elif "logo" in src.lower():
                        attrs += ' width="32" height="32"'
                    else:
                        attrs += ' width="600" height="380"'

                # Ensure alt text
                if not alt_m or not alt_m.group(1).strip():
                    alt_text = fname.split(".")[0].replace("_", " ").replace("-", " ").title()
                    if not alt_m:
                        attrs += f' alt="{alt_text}"'
                    else:
                        attrs = re.sub(r'alt=["\'][^"\']*["\']', f'alt="{alt_text}"', attrs)

                # Hero priority vs lazy
                if is_hero:
                    if not fetch_m:
                        attrs += ' fetchpriority="high"'
                    attrs = re.sub(r'loading=["\']lazy["\']', '', attrs)
                else:
                    if not load_m:
                        attrs += ' loading="lazy"'
                    if not dec_m:
                        attrs += ' decoding="async"'

                return f"<img {attrs.strip()}>"

            content = re.sub(r'<img\s+([^>]+)>', fix_img_tag, content, flags=re.IGNORECASE)

            if content != orig_content:
                with open(p, "w", encoding="utf-8") as fp:
                    fp.write(content)
                updated_pages += 1

print(f"Updated images in {updated_pages} HTML files.")
