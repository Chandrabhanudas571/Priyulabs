const puppeteer = require('puppeteer-core');
const path = require('path');
const os = require('os');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function verifySolutions() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    pipe: true,
    userDataDir: path.join(os.tmpdir(), 'pl_sol_' + Date.now()),
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--single-process', '--allow-file-access-from-files']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });

  const testPages = [
    'solutions/billing-pos/gst-billing/index.html',
    'solutions/growth-marketing/customer-crm/index.html',
    'business-types.html'
  ];

  for (const p of testPages) {
    const pageUrl = 'file:///' + path.resolve(p).replace(/\\/g, '/');
    await page.goto(pageUrl, { waitUntil: 'load' });
    await new Promise(r => setTimeout(r, 400));

    // Open drawer
    await page.evaluate(() => {
      const btn = document.querySelector('.m-hamburger, #hamburger, .mobile-hamburger');
      if (btn) btn.click();
      else if (typeof openMobileNav === 'function') openMobileNav();
      else if (typeof openMobileDrawer === 'function') openMobileDrawer();
    });
    await new Promise(r => setTimeout(r, 400));

    const res = await page.evaluate(() => {
      const drawer = document.getElementById('mobileDrawer') || document.querySelector('.m-drawer, .mobile-drawer');
      if (!drawer) return { found: false };
      const items = Array.from(drawer.querySelectorAll('#mDrillPanel1 a, #mDrillPanel1 button, .drawer-nav-item, .m-drawer-link'));
      return {
        found: true,
        items: items.map(el => el.textContent.trim().replace(/\s+/g, ' ')),
        hasWhatsNew: items.some(el => /What's\s*new/i.test(el.textContent))
      };
    });
    console.log(`Page: ${p} -> hasWhatsNew: ${res.hasWhatsNew}, total drawer items: ${res.items.length}`);
  }

  await browser.close();
}

verifySolutions();

