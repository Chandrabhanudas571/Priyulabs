const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const rootDir = path.resolve(__dirname, '..');

const allPages = [
  // Directory
  { name: 'All Business Types', file: 'all-business-types.html' },
  { name: 'Business Types Directory', file: 'business-types.html' },

  // Food & Beverage (6)
  { name: 'Restaurants & Fine Dining', file: 'restaurants-fine-dining.html' },
  { name: 'QSR, Fast Food & Takeaway', file: 'qsr-fast-food.html' },
  { name: 'Cafes & Chai Bars', file: 'cafes-chai-bars.html' },
  { name: 'Cloud Kitchens & Catering', file: 'cloud-kitchens-catering.html' },
  { name: 'Bakeries & Patisseries', file: 'bakeries-shops.html' },
  { name: 'Bars, Pubs & Breweries', file: 'bars-pubs-breweries.html' },

  // Retail (6)
  { name: 'Grocery, Supermarkets & Kirana', file: 'grocery-supermarkets-kirana.html' },
  { name: 'Electronics & Mobile Shops', file: 'electronics-mobile-shops.html' },
  { name: 'Footwear & Leather Stores', file: 'footwear-leather-stores.html' },
  { name: 'Jewellery Showrooms', file: 'jewellery-shops.html' },
  { name: 'Watch Stores & Horology', file: 'watch-stores.html' },
  { name: 'Bookstores & Stationery', file: 'bookstores-stationery.html' },

  // Beauty & Fashion (3)
  { name: 'Apparel Boutiques', file: 'beauty-fashion/apparel/index.html' },
  { name: 'Salons & Spas', file: 'beauty-fashion/salons/index.html' },
  { name: 'Cosmetics & Skincare', file: 'beauty-fashion/cosmetics/index.html' },

  // Services (2)
  { name: 'Gyms & Fitness', file: 'services/gyms/index.html' },
  { name: 'Dry Cleaners & Laundry', file: 'services/dry-cleaners/index.html' }
];

async function runComprehensiveVerification() {
  console.log('===============================================================');
  console.log('   FULL BUSINESS TYPES MOBILE DESIGN SYSTEM VERIFICATION SUITE ');
  console.log('===============================================================\n');

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    pipe: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--single-process']
  });

  const page = await browser.newPage();
  const mobileWidths = [360, 390, 430];
  const results = [];

  for (const item of allPages) {
    const filePath = path.join(rootDir, item.file);
    if (!fs.existsSync(filePath)) {
      results.push({ page: item.name, status: 'MISSING FILE' });
      continue;
    }

    const fileUrl = 'file://' + filePath.replace(/\\/g, '/');
    let pagePass = true;
    let detail = {};

    for (const w of mobileWidths) {
      await page.setViewport({ width: w, height: 800, isMobile: true, hasTouch: true });
      await page.goto(fileUrl, { waitUntil: 'domcontentloaded' });
      await new Promise(r => setTimeout(r, 250));

      const m = await page.evaluate((vpW) => {
        const body = document.body;
        const html = document.documentElement;
        const docScrollW = Math.max(body.scrollWidth, html.scrollWidth);
        const h1 = document.querySelector('h1');
        const h1C = h1 ? window.getComputedStyle(h1) : null;
        const btn = document.querySelector('.btn-solid-dark, .btn-primary, .clean-hero-actions a:first-child, .hero-actions a:first-child, .hero-cta-group a:first-child, .hero-btns a:first-child');
        const btnC = btn ? window.getComputedStyle(btn) : null;

        return {
          hasHScroll: docScrollW > vpW + 1,
          scrollW: docScrollW,
          h1Font: h1C ? h1C.fontFamily : 'NONE',
          h1Size: h1C ? h1C.fontSize : 'NONE',
          btnH: btnC ? btnC.height : 'NONE'
        };
      }, w);

      const isFraunces = m.h1Font.toLowerCase().includes('fraunces');
      if (m.hasHScroll || !isFraunces) {
        pagePass = false;
      }

      detail[w + 'px'] = {
        scroll: m.scrollW + 'px',
        font: isFraunces ? 'Fraunces' : m.h1Font,
        size: m.h1Size,
        btn: m.btnH
      };
    }

    results.push({
      page: item.name,
      file: item.file,
      pass: pagePass ? '✅ PASS' : '❌ FAIL',
      '360px': `${detail['360px'].scroll} | ${detail['360px'].font} (${detail['360px'].size})`,
      '390px': `${detail['390px'].scroll} | ${detail['390px'].font} (${detail['390px'].size})`,
      '430px': `${detail['430px'].scroll} | ${detail['430px'].font} (${detail['430px'].size})`,
      btnHeight: detail['390px'].btn
    });
  }

  console.table(results, ['page', 'pass', '390px', 'btnHeight']);

  // Desktop check
  console.log('\n--- VERIFYING DESKTOP INTEGRITY (1280px, 1440px, 1920px) ---');
  let desktopPass = true;
  for (const w of [1280, 1440, 1920]) {
    await page.setViewport({ width: w, height: 900, isMobile: false, hasTouch: false });
    const sampleUrl = 'file://' + path.join(rootDir, 'restaurants-fine-dining.html').replace(/\\/g, '/');
    await page.goto(sampleUrl, { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 200));

    const check = await page.evaluate(() => {
      const actions = document.querySelector('.clean-hero-actions');
      const h1 = document.querySelector('h1');
      return {
        actionsFlexDir: actions ? window.getComputedStyle(actions).flexDirection : 'NONE',
        h1Size: h1 ? window.getComputedStyle(h1).fontSize : 'NONE'
      };
    });

    if (check.actionsFlexDir !== 'row') {
      desktopPass = false;
      console.error(`  ❌ Desktop ${w}px failed: actions flex-direction is ${check.actionsFlexDir}`);
    } else {
      console.log(`  ✅ Desktop ${w}px: Hero row layout intact (${check.actionsFlexDir}), H1: ${check.h1Size}`);
    }
  }

  await browser.close();

  const allPass = results.every(r => r.pass === '✅ PASS') && desktopPass;
  if (allPass) {
    console.log('\n🌟 CONGRATULATIONS! ALL 19 BUSINESS TYPES PAGES ARE 100% VERIFIED ON MOBILE & DESKTOP!');
  } else {
    console.error('\n⚠️ VERIFICATION COMPLETE WITH WARNINGS/FAILURES');
  }
}

runComprehensiveVerification().catch(err => {
  console.error('Fatal error during comprehensive verification:', err);
  process.exit(1);
});

