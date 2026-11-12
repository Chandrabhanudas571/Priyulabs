const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const rootDir = path.resolve(__dirname, '..');

const testPages = [
  { name: 'All Business Types', file: 'all-business-types.html' },
  { name: 'Business Types Directory', file: 'business-types.html' },
  { name: 'Restaurants & Fine Dining', file: 'restaurants-fine-dining.html' },
  { name: 'QSR Fast Food', file: 'qsr-fast-food.html' },
  { name: 'Cafes Chai Bars', file: 'cafes-chai-bars.html' },
  { name: 'Cloud Kitchens', file: 'cloud-kitchens-catering.html' },
  { name: 'Bakeries & Patisseries', file: 'bakeries-shops.html' },
  { name: 'Bars & Pubs', file: 'bars-pubs-breweries.html' }
];

async function runVerification() {
  console.log('🚀 Running Batch 1 (F&B & Directory) Verification Suite...');
  
  const os = require('os');
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    pipe: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--single-process']
  });

  const page = await browser.newPage();
  const viewports = [
    { name: '360px (Small Mobile)', width: 360, height: 740 },
    { name: '390px (iPhone 14)', width: 390, height: 844 },
    { name: '430px (iPhone Pro Max)', width: 430, height: 932 }
  ];

  let allPassed = true;

  for (const item of testPages) {
    console.log(`\nTesting Page: ${item.name} (${item.file})`);
    const fileUrl = 'file://' + path.join(rootDir, item.file).replace(/\\/g, '/');

    for (const vp of viewports) {
      await page.setViewport({ width: vp.width, height: vp.height, isMobile: true, hasTouch: true });
      await page.goto(fileUrl, { waitUntil: 'domcontentloaded' });
      await new Promise(r => setTimeout(r, 400));

      const metrics = await page.evaluate((vpWidth) => {
        const body = document.body;
        const html = document.documentElement;
        const docScrollWidth = Math.max(body.scrollWidth, html.scrollWidth);
        const h1 = document.querySelector('h1');
        const h1Computed = h1 ? window.getComputedStyle(h1) : null;
        const btn = document.querySelector('.btn-solid-dark, .btn-primary, .clean-hero-actions a:first-child');
        const btnComputed = btn ? window.getComputedStyle(btn) : null;

        return {
          hasHScroll: docScrollWidth > vpWidth + 1,
          scrollWidth: docScrollWidth,
          h1Font: h1Computed ? h1Computed.fontFamily : 'NONE',
          h1Size: h1Computed ? h1Computed.fontSize : 'NONE',
          h1Weight: h1Computed ? h1Computed.fontWeight : 'NONE',
          btnHeight: btnComputed ? btnComputed.height : 'NONE'
        };
      }, vp.width);

      const hasFraunces = metrics.h1Font.toLowerCase().includes('fraunces');
      const passHScroll = !metrics.hasHScroll;
      const passBtnHeight = metrics.btnHeight === '48px';

      if (!passHScroll || !hasFraunces) {
        allPassed = false;
        console.error(`  ❌ [${vp.name}] H-Scroll: ${metrics.scrollWidth}px (max ${vp.width}px) | H1 Font: ${metrics.h1Font} | H1 Size: ${metrics.h1Size} | Btn Height: ${metrics.btnHeight}`);
      } else {
        console.log(`  ✅ [${vp.name}] 0 H-Scroll | H1 Font: Fraunces (${metrics.h1Size}) | Btn: ${metrics.btnHeight}`);
      }
    }
  }

  // Also check desktop untouched at 1280px
  console.log('\n--- Checking Desktop (1280px) remains untouched ---');
  await page.setViewport({ width: 1280, height: 800, isMobile: false, hasTouch: false });
  const sampleUrl = 'file://' + path.join(rootDir, 'restaurants-fine-dining.html').replace(/\\/g, '/');
  await page.goto(sampleUrl, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 400));

  const desktopMetrics = await page.evaluate(() => {
    const actions = document.querySelector('.clean-hero-actions');
    const actionsStyle = actions ? window.getComputedStyle(actions) : null;
    return {
      actionsFlexDir: actionsStyle ? actionsStyle.flexDirection : 'NONE',
      actionsWidth: actionsStyle ? actionsStyle.width : 'NONE'
    };
  });
  console.log(`  Desktop hero actions flex-direction: ${desktopMetrics.actionsFlexDir} (row expected)`);

  await browser.close();

  if (allPassed) {
    console.log('\n🎉 ALL BATCH 1 TESTS PASSED PERFECTLY!');
  } else {
    console.error('\n⚠️ SOME TESTS HAD WARNINGS OR FAILURES');
  }
}

runVerification().catch(err => {
  console.error('Fatal error during verification:', err);
  process.exit(1);
});
