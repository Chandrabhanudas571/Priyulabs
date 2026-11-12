const fs = require('fs');
const path = require('path');
const os = require('os');
const puppeteer = require('puppeteer-core');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const rootDir = path.resolve(__dirname, '..');

// All candidate pages
const pages = [
  // Directory
  { name: 'All Business Types', url: '/all-business-types.html', file: 'all-business-types.html', cat: 'Directory' },
  { name: 'Business Types Directory', url: '/business-types', file: 'business-types.html', cat: 'Directory' },
  
  // Food & Beverage
  { name: 'Restaurants & Fine Dining', url: '/restaurants-fine-dining', file: 'restaurants-fine-dining.html', cat: 'Food & Beverage' },
  { name: 'QSR, Fast Food & Takeaway', url: '/qsr-fast-food', file: 'qsr-fast-food.html', cat: 'Food & Beverage' },
  { name: 'Cafes & Chai Bars', url: '/cafes-chai-bars', file: 'cafes-chai-bars.html', cat: 'Food & Beverage' },
  { name: 'Cloud Kitchens & Catering', url: '/cloud-kitchens-catering', file: 'cloud-kitchens-catering.html', cat: 'Food & Beverage' },
  { name: 'Bakeries & Patisseries', url: '/bakeries-shops', file: 'bakeries-shops.html', cat: 'Food & Beverage' },
  { name: 'Bars, Pubs & Breweries', url: '/bars-pubs-breweries', file: 'bars-pubs-breweries.html', cat: 'Food & Beverage' },

  // Retail
  { name: 'Grocery, Supermarkets & Kirana', url: '/grocery-supermarkets-kirana', file: 'grocery-supermarkets-kirana.html', cat: 'Retail' },
  { name: 'Electronics & Mobile Shops', url: '/electronics-mobile-shops', file: 'electronics-mobile-shops.html', cat: 'Retail' },
  { name: 'Footwear & Leather Stores', url: '/footwear-leather-stores', file: 'footwear-leather-stores.html', cat: 'Retail' },
  { name: 'Jewellery Showrooms & Bullion', url: '/jewellery-shops', file: 'jewellery-shops.html', cat: 'Retail' },
  { name: 'Watch Stores & Horology', url: '/watch-stores', file: 'watch-stores.html', cat: 'Retail' },
  { name: 'Bookstores & Stationery', url: '/bookstores-stationery', file: 'bookstores-stationery.html', cat: 'Retail' },

  // Beauty & Fashion
  { name: 'Apparel Boutiques', url: '/beauty-fashion/apparel', file: 'beauty-fashion/apparel/index.html', altFile: 'apparel-boutiques.html', cat: 'Beauty & Fashion' },
  { name: 'Salons & Spas', url: '/beauty-fashion/salons', file: 'beauty-fashion/salons/index.html', altFile: 'salons-spas.html', cat: 'Beauty & Fashion' },
  { name: 'Cosmetics & Skincare', url: '/beauty-fashion/cosmetics', file: 'beauty-fashion/cosmetics/index.html', cat: 'Beauty & Fashion' },

  // Services
  { name: 'Gyms & Fitness', url: '/services/gyms', file: 'services/gyms/index.html', altFile: 'gyms.html', cat: 'Services' },
  { name: 'Dry Cleaners & Laundry', url: '/services/dry-cleaners', file: 'services/dry-cleaners/index.html', cat: 'Services' }
];

async function runAudit() {
  console.log('Auditing all Business Types pages...');

  const results = [];
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'pl-audit-'));
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    userDataDir: tmpDir,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });

  for (const item of pages) {
    const targetFile = fs.existsSync(path.join(rootDir, item.file)) ? item.file : item.altFile;
    if (!targetFile || !fs.existsSync(path.join(rootDir, targetFile))) {
      results.push({
        page: item.name,
        category: item.cat,
        file: 'MISSING',
        sharedCss: 'No',
        issues: 'File not found on disk'
      });
      continue;
    }

    const htmlContent = fs.readFileSync(path.join(rootDir, targetFile), 'utf8');
    const hasStyleCss = htmlContent.includes('style.css');
    const inlineStyleCount = (htmlContent.match(/<style\b[^>]*>/g) || []).length;
    const inlineStyleTagLength = (htmlContent.match(/<style\b[^>]*>[\s\S]*?<\/style>/g) || []).reduce((acc, s) => acc + s.length, 0);

    const fileUrl = 'file://' + path.join(rootDir, targetFile).replace(/\\/g, '/');
    await page.goto(fileUrl, { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 200));

    const evalResult = await page.evaluate(() => {
      const p = document.getElementById('priyulabs-preloader');
      if (p) p.remove();

      const scrollW = document.documentElement.scrollWidth;
      const innerW = window.innerWidth;
      const hScroll = scrollW > innerW;

      // Check h1
      const h1 = document.querySelector('h1');
      const h1Text = h1 ? h1.textContent.trim().substring(0, 40) : 'None';
      const h1Style = h1 ? window.getComputedStyle(h1) : null;
      const h1FontSize = h1Style ? h1Style.fontSize : 'N/A';
      const h1FontFamily = h1Style ? h1Style.fontFamily : 'N/A';

      // Check buttons
      const buttons = document.querySelectorAll('a.btn-primary, button.btn-primary, .btn-secondary, a.btn, .hero-cta-btn, .bdir-cta');
      const btnSizes = Array.from(buttons).slice(0, 3).map(b => {
        const rect = b.getBoundingClientRect();
        return `${Math.round(rect.width)}x${Math.round(rect.height)}`;
      });

      // Check cards
      const cards = document.querySelectorAll('.card, .feature-card, .benefit-card, .sector-card, .problem-card, .bdir-card');
      const cardCount = cards.length;

      // Check hero image
      const heroImg = document.querySelector('.hero-img, .hero-image, .bdir-hero img, img.sector-hero-img');
      const heroImgRect = heroImg ? heroImg.getBoundingClientRect() : null;

      // Background color
      const bodyBg = window.getComputedStyle(document.body).backgroundColor;

      return {
        hScroll,
        scrollW,
        innerW,
        h1Text,
        h1FontSize,
        h1FontFamily,
        btnSizes,
        cardCount,
        bodyBg
      };
    });

    const issues = [];
    if (evalResult.hScroll) issues.push(`Horizontal scroll (${evalResult.scrollW}px > ${evalResult.innerW}px)`);
    if (inlineStyleTagLength > 20000) issues.push(`Heavy inline styles (${Math.round(inlineStyleTagLength / 1024)}KB)`);
    if (!evalResult.h1FontFamily.toLowerCase().includes('fraunces') && !evalResult.h1FontFamily.toLowerCase().includes('serif')) {
      issues.push(`Non-serif H1 font (${evalResult.h1FontFamily.split(',')[0]})`);
    }
    if (evalResult.btnSizes.some(s => {
      const h = parseInt(s.split('x')[1]);
      return h < 44;
    })) {
      issues.push(`Tiny buttons (<44px)`);
    }

    results.push({
      page: item.name,
      category: item.cat,
      file: targetFile,
      sharedCss: hasStyleCss ? 'Yes (style.css)' : 'No (isolated)',
      inlineStylesKB: Math.round(inlineStyleTagLength / 1024) + ' KB',
      h1Size: evalResult.h1FontSize,
      hScroll: evalResult.hScroll ? 'YES (BUG)' : 'No',
      cardCount: evalResult.cardCount,
      issues: issues.length ? issues.join('; ') : 'None (Looks good)'
    });
  }

  await browser.close();

  console.log('\n=== STEP 1: AUDIT RESULTS ===');
  console.table(results.map(r => ({
    Page: r.page,
    Category: r.category,
    'Uses Shared CSS': r.sharedCss,
    'Inline Styles': r.inlineStylesKB,
    'H1 Size': r.h1Size,
    'H-Scroll': r.hScroll,
    Issues: r.issues
  })));

  fs.writeFileSync(path.join(rootDir, 'test-artifacts/audit_business_types.json'), JSON.stringify(results, null, 2), 'utf8');
  console.log('Saved audit to test-artifacts/audit_business_types.json');
}

runAudit().catch(err => {
  console.error(err);
  process.exit(1);
});

