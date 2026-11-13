const puppeteer = require('puppeteer-core');
const path = require('path');
const os = require('os');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    pipe: true,
    userDataDir: path.join(os.tmpdir(), 'pl_posidx_wa_' + Date.now()),
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--single-process']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, isMobile: true });
  await page.goto('file:///' + path.resolve('pos/index.html').replace(/\\/g, '/'), { waitUntil: 'load' });
  const href = await page.evaluate(() => {
    const el = document.querySelector('.foot-social-btn[aria-label="Chat on WhatsApp"]');
    return el ? el.href : 'not found';
  });
  console.log('pos/index.html footer WhatsApp href:', href);
  await browser.close();
})();
