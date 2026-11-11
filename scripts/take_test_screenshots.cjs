const puppeteer = require('puppeteer-core');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  
  await page.goto('http://localhost:3000/index.html', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.screenshot({ path: 'scratch/test_index_1440.png' });
  
  await page.goto('http://localhost:3000/solutions.html', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.screenshot({ path: 'scratch/test_solutions_1440.png' });

  await page.goto('http://localhost:3000/complete-management-system.html', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.screenshot({ path: 'scratch/test_cms_1440.png' });
  
  console.log('Screenshots saved to scratch/');
  await browser.close();
})();
