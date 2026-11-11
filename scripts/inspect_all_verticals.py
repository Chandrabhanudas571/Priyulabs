import os
import re

vertical_files = [
    'grocery.html', 'bakeries.html', 'cafes.html', 'restaurants.html', 
    'retail.html', 'electronics.html', 'footwear.html', 'jewellery.html',
    'watches.html', 'bookstores.html', 'salons-spas.html', 'dry-cleaners.html',
    'gyms.html', 'hospitality.html'
]

for vf in vertical_files:
    if os.path.exists(vf):
        with open(vf, 'r', encoding='utf-8', errors='ignore') as f:
            c = f.read()
        imgs = re.findall(r'<img\s+([^>]+)>', c, re.IGNORECASE)
        print(f'{vf}: {len(imgs)} imgs')
        for i, a in enumerate(imgs[:5], 1):
            src = re.search(r'src=["\']([^"\']+)["\']', a)
            print(f'   {src.group(1) if src else None}')

