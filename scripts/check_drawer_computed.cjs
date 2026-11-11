const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const urls = [
    'http://localhost:3000/index.html',
    'http://localhost:3000/solutions.html',
    'http://localhost:3000/complete-management-system.html',
    'http://localhost:3000/website-builder.html',
    'http://localhost:3000/digital-marketing.html',
    'http://localhost:3000/business-types.html'
  ];

  for (const u of urls) {
    await page.goto(u, { waitUntil: 'domcontentloaded', timeout: 15000 });
    const res = await page.evaluate(() => {
      const drawer = document.querySelector('.mobile-drawer, .m-drawer, #mobileDrawer');
      const backdrop = document.querySelector('.drawer-backdrop, .m-drawer-backdrop, #drawerBackdrop');
      const hamburger = document.querySelector('.hamburger, #hamburger');
      
      const getInfo = (el) => {
        if (!el) return 'NOT_FOUND';
        const cs = window.getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        return {
          tag: el.tagName,
          display: cs.display,
          visibility: cs.visibility,
          opacity: cs.opacity,
          zIndex: cs.zIndex,
          rect: { top: rect.top, left: rect.left, width: rect.width, height: rect.height }
        };
      };

      return {
        url: window.location.pathname,
        drawer: getInfo(drawer),
        backdrop: getInfo(backdrop),
        hamburger: getInfo(hamburger)
      };
    });
    console.log(JSON.stringify(res, null, 2));
  }

  await browser.close();
})();
