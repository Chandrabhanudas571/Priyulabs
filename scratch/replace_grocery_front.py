import os, re

# 1. Update HTML files
html_target_files = [
    'grocery.html',
    'grocery/index.html',
    'grocery-supermarkets-kirana.html',
    'grocery-supermarkets-kirana/index.html',
    'retail/grocery.html',
    'retail/grocery/index.html',
    'retail/grocery-supermarkets-kirana/index.html',
    'retail/supermarkets/index.html'
]

html_replacement = '''    <!-- Hero Showcase: High-Throughput Retail POS Dashboard -->
    <div class="retail-pos-mockup">
      <img
        src="grocerry bussiness type front image.png"
        alt="PriyuLabs Grocery &amp; Supermarkets Retail Engine Counter POS"
        style="width: 100%; height: auto; display: block; object-fit: contain;"
        onerror="if(!this.dataset.retry){this.dataset.retry='1';this.src='/grocerry bussiness type front image.png';}else if(this.dataset.retry==='1'){this.dataset.retry='2';this.src='assets/grocerry bussiness type front image.png';}"
        loading="eager"
      />
    </div>'''

html_pattern = re.compile(
    r'<!-- Hero Interactive UI Mockup: Wide Retail POS Dashboard -->.*?Auto-Kick Drawer &amp; Print Thermal Receipt ↵\s*</button>\s*</div>\s*</div>\s*</div>\s*</div>',
    re.DOTALL
)

for htf in html_target_files:
    if os.path.exists(htf):
        with open(htf, 'r', encoding='utf-8') as f:
            content = f.read()
        if html_pattern.search(content):
            new_content = html_pattern.sub(html_replacement, content, count=1)
            with open(htf, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f'Successfully updated {htf}')
        else:
            print(f'Pattern not matched in {htf}')

# 2. Update React TSX file
tsx_file = 'apps/web/src/features/marketing/GrocerySupermarketsKiranaPage.tsx'
tsx_replacement = '''          {/* Hero Showcase: High-Throughput Retail POS Dashboard */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-14 overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200 bg-white shadow-2xl text-left"
          >
            <img
              src="/grocerry bussiness type front image.png"
              alt="PriyuLabs Grocery & Supermarkets Retail Engine Counter POS"
              className="w-full h-auto block object-contain"
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.dataset.retry) {
                  target.dataset.retry = '1';
                  target.src = '/assets/grocerry bussiness type front image.png';
                }
              }}
              loading="eager"
            />
          </motion.div>'''

tsx_pattern = re.compile(
    r'\{\/\* Hero Interactive UI Mockup: Wide Retail POS Dashboard \*\/}.*?Auto-Kick Drawer &amp; Print Thermal Receipt ↵\s*</button>\s*</div>\s*</div>\s*</motion\.div>',
    re.DOTALL
)

if os.path.exists(tsx_file):
    with open(tsx_file, 'r', encoding='utf-8') as f:
        content = f.read()
    if tsx_pattern.search(content):
        new_content = tsx_pattern.sub(tsx_replacement, content, count=1)
        with open(tsx_file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f'Successfully updated {tsx_file}')
    else:
        print(f'Pattern not matched in {tsx_file}')
