import glob
import os
import re

EXCLUDE_FILES = {
    'index.html',
    'pos.html',
    'digital-marketing.html',
    'interactive-demo.html'
}

def get_rel_style_path(filepath):
    rel_dir = os.path.dirname(filepath)
    if not rel_dir or rel_dir == '.':
        return 'style.css'
    parts = [p for p in rel_dir.replace('\\', '/').split('/') if p and p != '.']
    depth = len(parts)
    return ('../' * depth) + 'style.css'

def process():
    all_html = [
        f for f in glob.glob('**/*.html', recursive=True)
        if not f.startswith('scratch') and not f.startswith('node_modules') and not f.startswith('apps')
    ]

    linked_count = 0
    skipped_count = 0

    for f in all_html:
        normalized = f.replace('\\', '/')
        basename = os.path.basename(normalized)
        
        # Check if in exclusions
        if normalized in EXCLUDE_FILES or basename in EXCLUDE_FILES:
            skipped_count += 1
            continue

        with open(f, 'r', encoding='utf-8', errors='ignore') as fp:
            content = fp.read()

        # Skip redirect stubs
        if 'window.location.replace' in content:
            skipped_count += 1
            continue

        if 'style.css' in content:
            continue

        rel_path = get_rel_style_path(f)
        # Add stylesheet link in <head>
        # Look for fonts link or before </head> or <style>
        tag = f'  <link rel="stylesheet" href="{rel_path}" />\n'
        
        if '<style>' in content:
            new_content = content.replace('<style>', tag + '  <style>', 1)
        elif '<style ' in content:
            new_content = re.sub(r'(<style[^>]*>)', tag + r'\1', content, count=1)
        elif '</head>' in content:
            new_content = content.replace('</head>', tag + '</head>', 1)
        else:
            print(f"Could not find insert point in {f}")
            continue

        with open(f, 'w', encoding='utf-8') as fp:
            fp.write(new_content)
        linked_count += 1
        print(f"Linked style.css in {f} -> href='{rel_path}'")

    print(f"\nDone! Linked {linked_count} files, skipped {skipped_count} excluded/stub files.")

if __name__ == '__main__':
    process()
