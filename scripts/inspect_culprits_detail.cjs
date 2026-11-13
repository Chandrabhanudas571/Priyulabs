const puppeteer = require('puppeteer-core');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const rootDir = path.resolve('.');

async function inspectElement(file, selector) {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    pipe: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--single-process']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 360, height: 800, isMobile: true, hasTouch: true });
  await page.goto('file://' + path.join(rootDir, file).replace(/\\/g, '/'), { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 400));

  const details = await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return 'Not found';
    const cs = window.getComputedStyle(el);
    const rect = el.getBoundingClientRect();
    const parent = el.parentElement ? {
      tag: el.parentElement.tagName,
      class: el.parentElement.className,
      rect: {
        left: el.parentElement.getBoundingClientRect().left,
        right: el.parentElement.getBoundingClientRect().right,
        width: el.parentElement.getBoundingClientRect().width
      },
      overflow: window.getComputedStyle(el.parentElement).overflow
    } : null;

    return {
      rect: { left: Math.round(rect.left), right: Math.round(rect.right), width: Math.round(rect.width), height: Math.round(rect.height) },
      cs: {
        width: cs.width,
        minWidth: cs.minWidth,
        maxWidth: cs.maxWidth,
        position: cs.position,
        left: cs.left,
        right: cs.right,
        transform: cs.transform,
        overflow: cs.overflow,
        display: cs.display
      },
      parent
    };
  }, selector);

  console.log(`\n=== ${file} -> ${selector} ===`);
  console.log(JSON.stringify(details, null, 2));
  await browser.close();
}

(async () => {
  console.log('--- Inspecting Retail Tabs ---');
  await inspectElement('grocery-supermarkets-kirana.html', 'button.sticky-nav-tab');
  await inspectElement('grocery-supermarkets-kirana.html', '.sticky-nav-tabs');

  console.log('--- Inspecting Beauty/Services bg-vid ---');
  await inspectElement('beauty-fashion/apparel/index.html', 'video.bg-vid');
  await inspectElement('beauty-fashion/apparel/index.html', '.video-banner-wrap, .video-wrap, .hero-video-wrap');

  console.log('--- Inspecting Salons Div ---');
  await inspectElement('beauty-fashion/salons/index.html', 'section.features-6-sec');
})();

