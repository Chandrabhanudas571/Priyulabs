const puppeteer = require('puppeteer-core');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3000/solutions.html', { waitUntil: 'networkidle0', timeout: 15000 });

  await page.screenshot({ path: 'scratch/solutions_desktop.png' });
  console.log('Saved scratch/solutions_desktop.png');

  await page.setViewport({ width: 375, height: 812, deviceScaleFactor: 2 });
  await page.reload({ waitUntil: 'networkidle0', timeout: 15000 });
  await page.screenshot({ path: 'scratch/solutions_mobile.png' });
  console.log('Saved scratch/solutions_mobile.png');

  await browser.close();
})();
