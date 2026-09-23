import os

files_to_update = [
    "pos.html",
    "pos/index.html",
    "complete-management-system.html",
    "complete-management-system/index.html",
    "digital-marketing.html",
    "digital-marketing/index.html",
    "website-builder.html",
    "website-builder/index.html",
    "all-business-types.html",
    "all-business-types/index.html",
    "interactive-demo.html",
    "interactive-demo/index.html",
]

for rel_path in files_to_update:
    if not os.path.exists(rel_path):
        continue
    with open(rel_path, "r", encoding="utf-8", errors="ignore") as f:
        content = f.read()

    changed = False

    # 1. pos.html
    old_pos = """    .logo img {
      height: 34px;
      width: 34px;
      object-fit: contain;
      border-radius: 8px;
      display: inline-block;
      flex-shrink: 0;
    }"""
    new_pos = """    .logo img {
      height: 34px;
      width: 34px;
      object-fit: contain;
      display: inline-block;
      flex-shrink: 0;
      background: transparent !important;
      border: none !important;
      box-shadow: none !important;
    }"""
    if old_pos in content:
        content = content.replace(old_pos, new_pos)
        changed = True

    # 2. cms / website-builder / digital-marketing
    old_cms = """  .logo img,
  .brand-logo-img {
    height: 32px !important;
    width: 32px !important;
    object-fit: contain !important;
    border-radius: 8px !important;
    display: inline-block !important;
  }"""
    new_cms = """  .logo img,
  .brand-logo-img {
    height: 32px !important;
    width: 32px !important;
    object-fit: contain !important;
    display: inline-block !important;
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;
  }"""
    if old_cms in content:
        content = content.replace(old_cms, new_cms)
        changed = True

    # 3. all-business-types
    old_abt = """    .brand-logo-img {
      height: 36px;
      width: 36px;
      object-fit: contain;
      border-radius: 8px;
    }"""
    new_abt = """    .brand-logo-img {
      height: 36px;
      width: 36px;
      object-fit: contain;
      background: transparent !important;
      border: none !important;
      box-shadow: none !important;
    }"""
    if old_abt in content:
        content = content.replace(old_abt, new_abt)
        changed = True

    # 4. interactive-demo
    old_demo = """    .logo img {
      width: 32px;
      height: 32px;
      border-radius: 8px;
    }"""
    new_demo = """    .logo img {
      width: 32px;
      height: 32px;
      background: transparent !important;
      border: none !important;
      box-shadow: none !important;
    }"""
    if old_demo in content:
        content = content.replace(old_demo, new_demo)
        changed = True

    if changed:
        with open(rel_path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Updated CSS in: {rel_path}")
    else:
        print(f"No direct replacement pattern matched in: {rel_path}")

print("Done updating logo CSS.")
