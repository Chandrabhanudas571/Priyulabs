const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const viewports = [320, 360, 390, 768, 960, 1024, 1440];
  const pagesToTest = [
    'http://localhost:3000/index.html',
    'http://localhost:3000/solutions.html',
    'http://localhost:3000/pos.html',
    'http://localhost:3000/complete-management-system.html'
  ];

  let hasOverflow = false;

  for (const url of pagesToTest) {
    for (const w of viewports) {
      await page.setViewport({ width: w, height: 800 });
      await page.goto(url, { waitUntil: 'domcontentloaded' });
      const overflow = await page.evaluate(() => {
        return {
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
          hasHScroll: document.documentElement.scrollWidth > document.documentElement.clientWidth
        };
      });
      if (overflow.hasHScroll) {
        console.error(`Overflow at ${url} at ${w}px! scrollWidth=${overflow.scrollWidth}, clientWidth=${overflow.clientWidth}`);
        hasOverflow = true;
      }
    }
  }

  await browser.close();
  if (!hasOverflow) {
    console.log('PHASE 2 ZERO HORIZONTAL SCROLL VERIFIED ACROSS ALL VIEWPORTS!');
  } else {
    process.exit(1);
  }
})();
