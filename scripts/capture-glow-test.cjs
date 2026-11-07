const puppeteer = require('puppeteer-core');
const fs = require('fs');

const CHROME_PATH = fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
  ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  : (fs.existsSync('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe')
      ? 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
      : 'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe');

(async () => {
  console.log('Using executable:', CHROME_PATH);
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3000/scratch/test-glow-button.html', { waitUntil: 'networkidle0' });

  // Take screenshot of default state
  await page.screenshot({ path: 'scratch/glow_test_default.png', fullPage: true });
  console.log('Saved scratch/glow_test_default.png');

  // Hover over the first glow button
  const refBtn = await page.$('.btn-glow-ref');
  if (refBtn) {
    await refBtn.hover();
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: 'scratch/glow_test_hover.png', fullPage: true });
    console.log('Saved scratch/glow_test_hover.png');
  }

  await browser.close();
  console.log('Completed successfully!');
})();
