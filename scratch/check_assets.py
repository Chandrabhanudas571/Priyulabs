import base64
import io
from PIL import Image

# 1. Check assets/logo.svg (Navbar logo)
content = open('assets/logo.svg').read()
b64 = content.split('base64,')[1].split('"')[0]
im = Image.open(io.BytesIO(base64.b64decode(b64))).convert('RGBA')
print('assets/logo.svg (navbar logo) corner alpha (should be 0 - transparent):', im.getpixel((0,0))[3])

# 2. Check favicon.png (Favicon)
fav = Image.open('favicon.png').convert('RGBA')
print('favicon.png corner alpha (transparent outside squircle):', fav.getpixel((0,0))[3])
print('favicon.png center pixel (inside squircle, should be visible):', fav.getpixel((fav.width//2, fav.height//2)))

# 3. Check assets/favicon.svg
content_fav = open('assets/favicon.svg').read()
b64_fav = content_fav.split('base64,')[1].split('"')[0]
im_fav = Image.open(io.BytesIO(base64.b64decode(b64_fav))).convert('RGBA')
print('assets/favicon.svg corner alpha:', im_fav.getpixel((0,0))[3])
