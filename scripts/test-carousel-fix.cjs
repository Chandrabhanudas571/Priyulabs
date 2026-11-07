const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
  ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  : 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const VIEWPORTS = [
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
  { name: 'desktop_1024x768', width: 1024, height: 768 },
  { name: 'desktop_1280x800', width: 1280, height: 800 },
  { name: 'desktop_1366x768', width: 1366, height: 768 },
  { name: 'desktop_1440x900', width: 1440, height: 900 },
  { name: 'desktop_1920x1080', width: 1920, height: 1080 }
];

async function runCarouselAudit() {
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

  console.log('===============================================================');
  console.log('1. TESTING ARROWS & TOUCH SWIPE STEP-BY-STEP (375x667)');
  console.log('===============================================================');

  await page.setViewport({ width: 375, height: 667, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:3000/index.html', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => {
    const pre = document.getElementById('priyulabs-preloader') || document.getElementById('sitePreloader');
    if (pre) pre.style.display = 'none';
    document.getElementById('who').scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 400));

  // Step 1: Check initial state
  const step1 = await page.evaluate(() => {
    const slider = document.querySelector('.serve-scroll');
    const prevBtn = document.getElementById('serveArrowPrev');
    const nextBtn = document.getElementById('serveArrowNext');
    return {
      scrollLeft: slider.scrollLeft,
      scrollWidth: slider.scrollWidth,
      clientWidth: slider.clientWidth,
      prevDisabled: prevBtn.disabled,
      nextDisabled: nextBtn.disabled
    };
  });
  console.log('Initial State (Start):', step1);

  // Step 2: Click Next Arrow
  await page.evaluate(() => document.getElementById('serveArrowNext').click());
  await new Promise(r => setTimeout(r, 600));

  const step2 = await page.evaluate(() => {
    const slider = document.querySelector('.serve-scroll');
    const prevBtn = document.getElementById('serveArrowPrev');
    const nextBtn = document.getElementById('serveArrowNext');
    return {
      scrollLeft: slider.scrollLeft,
      prevDisabled: prevBtn.disabled,
      nextDisabled: nextBtn.disabled
    };
  });
  console.log('After 1st Next Click (Card 1):', step2);

  // Step 3: Click Next Arrow
  await page.evaluate(() => document.getElementById('serveArrowNext').click());
  await new Promise(r => setTimeout(r, 600));

  const step3 = await page.evaluate(() => {
    const slider = document.querySelector('.serve-scroll');
    const prevBtn = document.getElementById('serveArrowPrev');
    const nextBtn = document.getElementById('serveArrowNext');
    return {
      scrollLeft: slider.scrollLeft,
      prevDisabled: prevBtn.disabled,
      nextDisabled: nextBtn.disabled
    };
  });
  console.log('After 2nd Next Click (Card 2):', step3);

  // Step 4: Click Next Arrow
  await page.evaluate(() => document.getElementById('serveArrowNext').click());
  await new Promise(r => setTimeout(r, 600));

  const step4 = await page.evaluate(() => {
    const slider = document.querySelector('.serve-scroll');
    const prevBtn = document.getElementById('serveArrowPrev');
    const nextBtn = document.getElementById('serveArrowNext');
    return {
      scrollLeft: slider.scrollLeft,
      prevDisabled: prevBtn.disabled,
      nextDisabled: nextBtn.disabled
    };
  });
  console.log('After 3rd Next Click (Card 3):', step4);

  // Step 5: Click Next Arrow to reach End (CTA)
  await page.evaluate(() => document.getElementById('serveArrowNext').click());
  await new Promise(r => setTimeout(r, 600));

  const step5 = await page.evaluate(() => {
    const slider = document.querySelector('.serve-scroll');
    const prevBtn = document.getElementById('serveArrowPrev');
    const nextBtn = document.getElementById('serveArrowNext');
    return {
      scrollLeft: slider.scrollLeft,
      prevDisabled: prevBtn.disabled,
      nextDisabled: nextBtn.disabled,
      nextAriaDisabled: nextBtn.getAttribute('aria-disabled')
    };
  });
  console.log('After 4th Next Click (At End):', step5);

  // Step 6: Click Prev Arrow
  await page.evaluate(() => document.getElementById('serveArrowPrev').click());
  await new Promise(r => setTimeout(r, 600));

  const step6 = await page.evaluate(() => {
    const slider = document.querySelector('.serve-scroll');
    const prevBtn = document.getElementById('serveArrowPrev');
    const nextBtn = document.getElementById('serveArrowNext');
    return {
      scrollLeft: slider.scrollLeft,
      prevDisabled: prevBtn.disabled,
      nextDisabled: nextBtn.disabled
    };
  });
  console.log('After 1st Prev Click:', step6);

  // Step 7: Touch swipe gesture test
  console.log('\n--- TESTING NATIVE TOUCH SWIPE GESTURE ---');
  const touchRes = await page.evaluate(async () => {
    const slider = document.querySelector('.serve-scroll');
    slider.scrollTo({ left: 0, behavior: 'instant' });
    await new Promise(r => setTimeout(r, 100));

    // Simulate touch drag
    const touchStart = new Touch({ identifier: Date.now(), target: slider, clientX: 300, clientY: 400 });
    const touchMove = new Touch({ identifier: Date.now(), target: slider, clientX: 100, clientY: 400 });
    
    slider.dispatchEvent(new TouchEvent('touchstart', { touches: [touchStart], changedTouches: [touchStart], bubbles: true }));
    slider.dispatchEvent(new TouchEvent('touchmove', { touches: [touchMove], changedTouches: [touchMove], bubbles: true }));
    slider.scrollLeft = 200; // Native scroll occurs
    slider.dispatchEvent(new TouchEvent('touchend', { touches: [], changedTouches: [touchMove], bubbles: true }));

    await new Promise(r => setTimeout(r, 200));
    return {
      scrollLeftAfterSwipe: slider.scrollLeft,
      prevDisabled: document.getElementById('serveArrowPrev').disabled,
      nextDisabled: document.getElementById('serveArrowNext').disabled
    };
  });
  console.log('Touch Swipe Result:', touchRes);

  // Step 8: Viewport matrix
  console.log('\n===============================================================');
  console.log('2. AUDITING ALL 15 VIEWPORTS & SCROLL METRICS');
  console.log('===============================================================');

  const results = [];
  for (const vp of VIEWPORTS) {
    await page.setViewport({
      width: vp.width,
      height: vp.height,
      isMobile: vp.width <= 768,
      hasTouch: vp.width <= 768
    });

    await page.goto('http://localhost:3000/index.html', { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => {
      const pre = document.getElementById('priyulabs-preloader') || document.getElementById('sitePreloader');
      if (pre) pre.style.display = 'none';
      document.getElementById('who').scrollIntoView();
    });
    await new Promise(r => setTimeout(r, 300));

    const metrics = await page.evaluate((width) => {
      const isMobile = width <= 768;
      const slider = document.querySelector('.serve-scroll');
      const prevBtn = document.getElementById('serveArrowPrev');
      const nextBtn = document.getElementById('serveArrowNext');

      const isOverflowing = slider.scrollWidth > slider.clientWidth;
      const prevDisp = window.getComputedStyle(prevBtn).display;
      const nextDisp = window.getComputedStyle(nextBtn).display;
      const pageOverflow = document.documentElement.scrollWidth - document.documentElement.clientWidth;

      return {
        isMobile,
        scrollWidth: slider.scrollWidth,
        clientWidth: slider.clientWidth,
        isOverflowing: isOverflowing ? 'PASS' : 'FAIL',
        arrowsDisplay: isMobile ? (prevDisp === 'flex' && nextDisp === 'flex' ? 'flex (PASS)' : 'FAIL') : (prevDisp === 'none' && nextDisp === 'none' ? 'none (PASS)' : 'FAIL'),
        pageOverflow: pageOverflow === 0 ? '0px (PASS)' : `${pageOverflow}px (FAIL)`
      };
    }, vp.width);

    results.push({
      viewport: `${vp.width}x${vp.height} (${vp.name})`,
      carouselOverflow: metrics.isOverflowing,
      scrollMetrics: `${metrics.clientWidth}px / ${metrics.scrollWidth}px`,
      arrowsDisplay: metrics.arrowsDisplay,
      pageOverflow: metrics.pageOverflow
    });
  }

  console.table(results);
  console.log('Console Errors:', consoleErrors.length === 0 ? '0 (Clean)' : consoleErrors);

  await browser.close();
}

runCarouselAudit();
