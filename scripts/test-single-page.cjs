const puppeteer = require('puppeteer-core');

const pageName = process.argv[2] || 'bakeries.html';
const outName = process.argv[3] || 'bakeries_desktop.png';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto(`http://localhost:3000/${pageName}`, { waitUntil: 'domcontentloaded', timeout: 15000 });
  // Wait 1 second for animations/fonts to settle
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: `scratch/${outName}` });
  console.log(`Saved scratch/${outName}`);

  await browser.close();
})();
