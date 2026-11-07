const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const pagesToTest = [
  { url: 'http://localhost:3000/index.html', name: 'index' },
  { url: 'http://localhost:3000/complete-management-system.html', name: 'complete_management_system' },
  { url: 'http://localhost:3000/website-builder.html', name: 'website_builder' },
  { url: 'http://localhost:3000/pos.html', name: 'pos' },
  { url: 'http://localhost:3000/digital-marketing.html', name: 'digital_marketing' },
  { url: 'http://localhost:3000/solutions.html', name: 'solutions' },
  { url: 'http://localhost:3000/interactive-demo.html', name: 'interactive_demo' },
  { url: 'http://localhost:3000/bakeries.html', name: 'bakeries' },
  { url: 'http://localhost:3000/apparel-boutiques.html', name: 'apparel_boutiques' }
];

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  for (const item of pagesToTest) {
    try {
      // Desktop
      await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
      await page.goto(item.url, { waitUntil: 'domcontentloaded', timeout: 20000 });
      await new Promise(r => setTimeout(r, 1000));
      const desktopPath = path.join('scratch', `qa_${item.name}_desktop.png`);
      await page.screenshot({ path: desktopPath });
      console.log(`[PASS] Captured ${desktopPath}`);

      // Mobile
      await page.setViewport({ width: 375, height: 812, deviceScaleFactor: 2 });
      await page.reload({ waitUntil: 'domcontentloaded', timeout: 20000 });
      await new Promise(r => setTimeout(r, 1000));
      const mobilePath = path.join('scratch', `qa_${item.name}_mobile.png`);
      await page.screenshot({ path: mobilePath });
      console.log(`[PASS] Captured ${mobilePath}`);
    } catch (err) {
      console.error(`[ERROR] Failed on ${item.name}:`, err.message);
    }
  }

  await browser.close();
  console.log('\nAll QA screenshots captured successfully.');
})();
