const puppeteer = require('puppeteer-core');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const rootDir = path.resolve(__dirname, '..');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    pipe: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--single-process']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  
  const fileUrl = 'file://' + path.join(rootDir, 'pos.html').replace(/\\/g, '/');
  await page.goto(fileUrl, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 400));

  await page.screenshot({ path: path.join(rootDir, 'test-artifacts/pos_current_390px.png'), clip: { x: 0, y: 0, width: 390, height: 200 } });

  const navInfo = await page.evaluate(() => {
    const nav = document.querySelector('.nav');
    const header = document.querySelector('header');
    const logo = document.querySelector('.logo');
    const rightActions = document.querySelector('.nav-right-actions');
    const ghostBtn = document.querySelector('.nav-cta-ghost');
    const primaryBtn = document.querySelector('.nav-cta');
    const hamburger = document.querySelector('.hamburger');

    return {
      headerHeight: header ? window.getComputedStyle(header).height : 'none',
      navPadding: nav ? window.getComputedStyle(nav).padding : 'none',
      logoWidth: logo ? logo.getBoundingClientRect().width : 0,
      rightActionsWidth: rightActions ? rightActions.getBoundingClientRect().width : 0,
      ghostBtnDisplay: ghostBtn ? window.getComputedStyle(ghostBtn).display : 'none',
      ghostBtnDimensions: ghostBtn ? { width: ghostBtn.getBoundingClientRect().width, height: ghostBtn.getBoundingClientRect().height } : null,
      primaryBtnDimensions: primaryBtn ? { width: primaryBtn.getBoundingClientRect().width, height: primaryBtn.getBoundingClientRect().height } : null,
      hasHamburger: !!hamburger
    };
  });

  console.log('Current POS Mobile Navbar Metrics (390px):', JSON.stringify(navInfo, null, 2));
  await browser.close();
})();

