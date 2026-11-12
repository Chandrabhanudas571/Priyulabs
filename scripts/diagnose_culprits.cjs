const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    pipe: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--single-process']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 360, height: 740, isMobile: true });
  
  const fileUrl = 'file://' + path.resolve(__dirname, '../restaurants-fine-dining.html').replace(/\\/g, '/');
  await page.goto(fileUrl, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 600));

  const info = await page.evaluate(() => {
    const h1 = document.querySelector('h1');
    const h1Computed = h1 ? window.getComputedStyle(h1) : null;
    const btn = document.querySelector('.btn-solid-dark, .btn-primary, .clean-hero-actions a:first-child');
    const btnComputed = btn ? window.getComputedStyle(btn) : null;
    const actions = document.querySelector('.clean-hero-actions');
    const actionsComputed = actions ? window.getComputedStyle(actions) : null;

    // Find overflow elements
    const overflows = [];
    document.querySelectorAll('*').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.right > 361) {
        overflows.push({
          tag: el.tagName,
          class: el.className,
          id: el.id,
          right: rect.right,
          width: rect.width
        });
      }
    });

    return {
      scrollWidth: Math.max(document.body.scrollWidth, document.documentElement.scrollWidth),
      h1Tag: h1 ? h1.outerHTML.slice(0, 100) : 'none',
      h1Font: h1Computed ? h1Computed.fontFamily : 'none',
      h1Size: h1Computed ? h1Computed.fontSize : 'none',
      actionsFlexDir: actionsComputed ? actionsComputed.flexDirection : 'none',
      btnHeight: btnComputed ? btnComputed.height : 'none',
      btnBg: btnComputed ? btnComputed.backgroundColor : 'none',
      overflows: overflows.slice(0, 5)
    };
  });

  console.log('Result with local base (Mobile 360px):', JSON.stringify(info, null, 2));

  // Test Desktop
  const desktopWidths = [1280, 1440, 1920];
  for (const w of desktopWidths) {
    await page.setViewport({ width: w, height: 800, isMobile: false });
    await new Promise(r => setTimeout(r, 200));
    const dInfo = await page.evaluate(() => {
      const actions = document.querySelector('.clean-hero-actions');
      const actionsComputed = actions ? window.getComputedStyle(actions) : null;
      const h1 = document.querySelector('h1');
      const h1Computed = h1 ? window.getComputedStyle(h1) : null;
      return {
        actionsFlexDir: actionsComputed ? actionsComputed.flexDirection : 'none',
        actionsWidth: actionsComputed ? actionsComputed.width : 'none',
        h1Font: h1Computed ? h1Computed.fontFamily : 'none',
        h1Size: h1Computed ? h1Computed.fontSize : 'none'
      };
    });
    console.log(`Desktop ${w}px Result:`, JSON.stringify(dInfo));
  }

  await browser.close();
})();
