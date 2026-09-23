with open('index.html', 'r', encoding='utf-8', errors='ignore') as f:
    for i, line in enumerate(f):
        if any(w in line.lower() for w in ['<nav', 'class="nav', 'logo.svg', 'logo.png', 'logo-glyph', 'logo']):
            print(f"{i+1}: {line.strip()[:100]}")
