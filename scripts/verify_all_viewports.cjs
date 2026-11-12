const puppeteer = require('puppeteer-core');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const rootDir = path.resolve(__dirname, '..');

async function testPageAtViewport(fileRelPath, width, height) {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    pipe: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--single-process']
  });

  const page = await browser.newPage();
  await page.setViewport({ width, height, isMobile: width <= 768, hasTouch: width <= 768 });

  const fileUrl = 'file://' + path.join(rootDir, fileRelPath).replace(/\\/g, '/');
  await page.goto(fileUrl, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 400));

  const info = await page.evaluate(() => {
    const header = document.querySelector('header');
    const ghost = document.querySelector('.nav-cta-ghost');
    const primary = document.querySelector('.nav-cta');
    const hamburger = document.querySelector('.hamburger');

    return {
      headerH: header ? window.getComputedStyle(header).height : 'none',
      ghostDisplay: ghost ? window.getComputedStyle(ghost).display : 'none',
      primaryW: primary ? Math.round(primary.getBoundingClientRect().width) : 0,
      primaryH: primary ? Math.round(primary.getBoundingClientRect().height) : 0,
      hamburgerDisplay: hamburger ? window.getComputedStyle(hamburger).display : 'none',
      hamburgerW: hamburger ? Math.round(hamburger.getBoundingClientRect().width) : 0,
      hamburgerH: hamburger ? Math.round(hamburger.getBoundingClientRect().height) : 0,
      overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth
    };
  });

  await page.screenshot({
    path: path.join(rootDir, `test-artifacts/${path.basename(fileRelPath, '.html')}_${width}px.png`),
    clip: { x: 0, y: 0, width, height: Math.min(height, 180) }
  });

  await browser.close();
  return info;
}

(async () => {
  const viewports = [
    { w: 360, h: 800 },
    { w: 390, h: 844 },
    { w: 430, h: 932 },
    { w: 1280, h: 800 },
    { w: 1440, h: 900 }
  ];

  for (const file of ['pos.html', 'pos/index.html']) {
    console.log(`\n=== Testing ${file} ===`);
    for (const vp of viewports) {
      const res = await testPageAtViewport(file, vp.w, vp.h);
      console.log(`${vp.w}px: Header: ${res.headerH}, Primary: ${res.primaryW}x${res.primaryH}px, Hamburger: ${res.hamburgerDisplay} (${res.hamburgerW}x${res.hamburgerH}px), Ghost: ${res.ghostDisplay}, Overflow: ${res.overflow}`);
    }
  }
})();

