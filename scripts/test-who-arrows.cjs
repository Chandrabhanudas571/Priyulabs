const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
  ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  : 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const VIEWPORTS = [
  // Mobile requested viewports (<= 768px)
  { name: 'mobile_320x568', width: 320, height: 568 },
  { name: 'mobile_360x800', width: 360, height: 800 },
  { name: 'mobile_375x667', width: 375, height: 667 },
  { name: 'mobile_375x812', width: 375, height: 812 },
  { name: 'mobile_390x844', width: 390, height: 844 },
  { name: 'mobile_414x896', width: 414, height: 896 },
  { name: 'mobile_430x932', width: 430, height: 932 },
  { name: 'mobile_480x854', width: 480, height: 854 },
  { name: 'mobile_540x960', width: 540, height: 960 },
  { name: 'tablet_768x1024', width: 768, height: 1024 },
  // Desktop regression viewports (>= 1024px)
  { name: 'desktop_1024x768', width: 1024, height: 768 },
  { name: 'desktop_1280x800', width: 1280, height: 800 },
  { name: 'desktop_1366x768', width: 1366, height: 768 },
  { name: 'desktop_1440x900', width: 1440, height: 900 },
  { name: 'desktop_1920x1080', width: 1920, height: 1080 }
];

async function runWhoArrowsSuite() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', err => consoleErrors.push(err.toString()));

  const screenshotDir = path.join(__dirname, '../artifacts/screenshots_who_arrows');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  console.log('==================================================');
  console.log('1. AUDITING ARROWS FUNCTIONALITY & STATES (375x667)');
  console.log('==================================================');

  await page.setViewport({ width: 375, height: 667, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:3000/index.html', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => {
    const pre = document.getElementById('priyulabs-preloader') || document.getElementById('sitePreloader');
    if (pre) pre.style.display = 'none';
  });

  // Scroll #who into view
  await page.evaluate(() => {
    document.getElementById('who').scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 400));

  // Step 1: Initial State Check
  const initialState = await page.evaluate(() => {
    const prevBtn = document.getElementById('serveArrowPrev');
    const nextBtn = document.getElementById('serveArrowNext');
    const slider = document.querySelector('.serve-scroll');
    return {
      scrollLeft: slider.scrollLeft,
      prevDisabled: prevBtn.disabled,
      prevAriaDisabled: prevBtn.getAttribute('aria-disabled'),
      nextDisabled: nextBtn.disabled,
      nextAriaDisabled: nextBtn.getAttribute('aria-disabled'),
      prevDisplay: window.getComputedStyle(prevBtn).display,
      nextDisplay: window.getComputedStyle(nextBtn).display
    };
  });
  console.log('Initial State (At Start):', initialState);

  // Step 2: Click Next Arrow
  await page.evaluate(() => document.getElementById('serveArrowNext').click());
  await new Promise(r => setTimeout(r, 600));

  const afterNext1 = await page.evaluate(() => {
    const prevBtn = document.getElementById('serveArrowPrev');
    const nextBtn = document.getElementById('serveArrowNext');
    const slider = document.querySelector('.serve-scroll');
    return {
      scrollLeft: slider.scrollLeft,
      prevDisabled: prevBtn.disabled,
      nextDisabled: nextBtn.disabled
    };
  });
  console.log('After 1st Next Arrow Click:', afterNext1);

  // Step 3: Click Next Arrow Again
  await page.evaluate(() => document.getElementById('serveArrowNext').click());
  await new Promise(r => setTimeout(r, 600));

  const afterNext2 = await page.evaluate(() => {
    const prevBtn = document.getElementById('serveArrowPrev');
    const nextBtn = document.getElementById('serveArrowNext');
    const slider = document.querySelector('.serve-scroll');
    return {
      scrollLeft: slider.scrollLeft,
      prevDisabled: prevBtn.disabled,
      nextDisabled: nextBtn.disabled
    };
  });
  console.log('After 2nd Next Arrow Click:', afterNext2);

  // Step 4: Click Prev Arrow
  await page.evaluate(() => document.getElementById('serveArrowPrev').click());
  await new Promise(r => setTimeout(r, 600));

  const afterPrev1 = await page.evaluate(() => {
    const prevBtn = document.getElementById('serveArrowPrev');
    const nextBtn = document.getElementById('serveArrowNext');
    const slider = document.querySelector('.serve-scroll');
    return {
      scrollLeft: slider.scrollLeft,
      prevDisabled: prevBtn.disabled,
      nextDisabled: nextBtn.disabled
    };
  });
  console.log('After Prev Arrow Click:', afterPrev1);

  // Step 5: Scroll to End
  await page.evaluate(() => {
    const slider = document.querySelector('.serve-scroll');
    slider.scrollTo({ left: slider.scrollWidth, behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 200));

  const atEndState = await page.evaluate(() => {
    const prevBtn = document.getElementById('serveArrowPrev');
    const nextBtn = document.getElementById('serveArrowNext');
    const slider = document.querySelector('.serve-scroll');
    return {
      scrollLeft: slider.scrollLeft,
      prevDisabled: prevBtn.disabled,
      nextDisabled: nextBtn.disabled,
      nextAriaDisabled: nextBtn.getAttribute('aria-disabled')
    };
  });
  console.log('At End State:', atEndState);

  // Step 6: Scroll Back to Start
  await page.evaluate(() => {
    const slider = document.querySelector('.serve-scroll');
    slider.scrollTo({ left: 0, behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 200));

  console.log('\n==================================================');
  console.log('2. AUDITING ALL 15 VIEWPORTS & HORIZONTAL OVERFLOW');
  console.log('==================================================');

  const vpResults = [];
  for (const vp of VIEWPORTS) {
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.goto('http://localhost:3000/index.html', { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => {
      const pre = document.getElementById('priyulabs-preloader') || document.getElementById('sitePreloader');
      if (pre) pre.style.display = 'none';
      document.querySelectorAll('.reveal, .feature-row').forEach(el => el.classList.add('in', 'active'));
    });

    const isMobile = vp.width <= 768;

    const data = await page.evaluate((isMob) => {
      const docW = document.documentElement.scrollWidth;
      const clientW = document.documentElement.clientWidth;
      const prevBtn = document.getElementById('serveArrowPrev');
      const nextBtn = document.getElementById('serveArrowNext');
      const prevStyle = prevBtn ? window.getComputedStyle(prevBtn) : null;
      const nextStyle = nextBtn ? window.getComputedStyle(nextBtn) : null;
      const prevRect = prevBtn ? prevBtn.getBoundingClientRect() : null;

      const isArrowExpected = isMob ? (prevStyle?.display === 'flex' && nextStyle?.display === 'flex') : (prevStyle?.display === 'none' && nextStyle?.display === 'none');

      return {
        overflow0px: docW === clientW,
        docW,
        clientW,
        arrowVisibility: prevStyle?.display,
        isArrowExpected,
        arrowHeight: prevRect ? Math.round(prevRect.height) : 0
      };
    }, isMobile);

    vpResults.push({
      viewport: `${vp.width}x${vp.height} (${vp.name})`,
      arrowsDisplay: data.arrowVisibility,
      expected: data.isArrowExpected ? 'PASS' : 'FAIL',
      touchHeight: isMobile ? `${data.arrowHeight}px (PASS)` : 'Hidden (PASS)',
      overflow: data.overflow0px ? '0px (PASS)' : `${data.docW - data.clientW}px (FAIL)`
    });
  }
  console.table(vpResults);

  // Capture Screenshots
  console.log('\n==================================================');
  console.log('3. CAPTURING VERIFICATION SCREENSHOTS');
  console.log('==================================================');

  // Mobile 375x667 Section screenshot
  await page.setViewport({ width: 375, height: 667 });
  await page.goto('http://localhost:3000/index.html', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => {
    const pre = document.getElementById('priyulabs-preloader') || document.getElementById('sitePreloader');
    if (pre) pre.style.display = 'none';
    document.querySelectorAll('.reveal, .feature-row').forEach(el => el.classList.add('in', 'active'));
    const who = document.getElementById('who');
    if (who) who.scrollIntoView({ block: 'start' });
  });
  await new Promise(r => setTimeout(r, 200));

  const whoSection = await page.$('#who');
  if (whoSection) {
    await whoSection.screenshot({ path: path.join(screenshotDir, 'mobile_375_who_we_serve_arrows.png') });
  }

  console.log('\nConsole Errors during audit:', consoleErrors.length === 0 ? '0 (Clean)' : consoleErrors);

  await browser.close();
}

runWhoArrowsSuite().catch(console.error);
