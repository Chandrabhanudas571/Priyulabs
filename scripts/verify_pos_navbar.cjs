const puppeteer = require('puppeteer-core');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const rootDir = path.resolve(__dirname, '..');

async function testViewport(fileRelPath, width, height) {
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

  const metrics = await page.evaluate(() => {
    const nav = document.querySelector('.nav');
    const header = document.querySelector('header');
    const logo = document.querySelector('.logo');
    const ghostBtn = document.querySelector('.nav-cta-ghost');
    const primaryBtn = document.querySelector('.nav-cta');
    const hamburger = document.querySelector('.hamburger');
    const drawer = document.querySelector('.mobile-drawer');
    const backdrop = document.querySelector('.drawer-backdrop');

    const headerCS = header ? window.getComputedStyle(header) : null;
    const ghostCS = ghostBtn ? window.getComputedStyle(ghostBtn) : null;
    const primaryCS = primaryBtn ? window.getComputedStyle(primaryBtn) : null;
    const hamburgerCS = hamburger ? window.getComputedStyle(hamburger) : null;

    return {
      headerHeight: headerCS ? headerCS.height : 'none',
      headerBackground: headerCS ? headerCS.backgroundColor : 'none',
      ghostDisplay: ghostCS ? ghostCS.display : 'none',
      primaryBtnDimensions: primaryBtn ? {
        width: Math.round(primaryBtn.getBoundingClientRect().width),
        height: Math.round(primaryBtn.getBoundingClientRect().height)
      } : null,
      hamburgerDisplay: hamburgerCS ? hamburgerCS.display : 'none',
      hamburgerDimensions: hamburger ? {
        width: Math.round(hamburger.getBoundingClientRect().width),
        height: Math.round(hamburger.getBoundingClientRect().height)
      } : null,
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      hasDrawer: !!drawer,
      hasBackdrop: !!backdrop
    };
  });

  const screenshotPath = path.join(rootDir, `test-artifacts/test_${path.basename(fileRelPath, '.html')}_${width}px.png`);
  await page.screenshot({ path: screenshotPath, clip: { x: 0, y: 0, width, height: Math.min(height, 300) } });

  await browser.close();
  return metrics;
}

(async () => {
  console.log('Testing pos.html at 390px...');
  const m390 = await testViewport('pos.html', 390, 844);
  console.log('390px metrics:', m390);

  console.log('Testing pos.html at 1280px...');
  const d1280 = await testViewport('pos.html', 1280, 800);
  console.log('1280px metrics:', d1280);
})();

