from PIL import Image
import os

WORKSPACE = os.path.abspath(".")
ASSETS = os.path.join(WORKSPACE, "assets")

# 1. WhatsApp icon (currently 1.2 MB)
# Generate crisp 96x96 (2x for 48px) and 128x128 WebP
wa_src = os.path.join(ASSETS, "images", "priyulabs-whatsapp.png")
if not os.path.exists(wa_src):
    wa_src = os.path.join(ASSETS, "priyulabs-whatsapp.png")

if os.path.exists(wa_src):
    with Image.open(wa_src) as img:
        # 96x96 (2x retina)
        im96 = img.resize((96, 96), Image.Resampling.LANCZOS)
        im96.save(os.path.join(ASSETS, "priyulabs-whatsapp-opt.png"), "PNG", optimize=True)
        im96.save(os.path.join(ASSETS, "priyulabs-whatsapp.webp"), "WEBP", quality=90)
        im96.save(os.path.join(ASSETS, "images", "priyulabs-whatsapp.png"), "PNG", optimize=True)
        print("Optimized priyulabs-whatsapp.png from 1.2MB to:", os.path.getsize(os.path.join(ASSETS, "images", "priyulabs-whatsapp.png")), "bytes")

# 2. Secure SSL badge (fix filename space and optimize)
ssl_src = os.path.join(WORKSPACE, "sequre ssl.jpg")
if not os.path.exists(ssl_src):
    ssl_src = os.path.join(ASSETS, "sequre ssl.jpg")

if os.path.exists(ssl_src):
    with Image.open(ssl_src) as img:
        img.save(os.path.join(ASSETS, "secure_ssl.webp"), "WEBP", quality=85)
        img.save(os.path.join(WORKSPACE, "secure_ssl.webp"), "WEBP", quality=85)
        print("Created secure_ssl.webp:", os.path.getsize(os.path.join(ASSETS, "secure_ssl.webp")), "bytes")

# 3. Poster for management.html (fix broken complete-management-system-poster.jpg)
poster_src = os.path.join(ASSETS, "card2-management-poster.jpg")
if os.path.exists(poster_src):
    with Image.open(poster_src) as img:
        img.save(os.path.join(ASSETS, "complete-management-system-poster.jpg"), "JPEG", quality=85)
        print("Created complete-management-system-poster.jpg from card2 poster")
