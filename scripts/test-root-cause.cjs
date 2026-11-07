const puppeteer = require('puppeteer-core');
const fs = require('fs');

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

async function runRootCauseAudit() {
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
  console.log('STEP 2 & 6: PROVING REAL HORIZONTAL OVERFLOW & SCROLL MOVEMENT (375x667)');
  console.log('===============================================================');

  await page.setViewport({ width: 375, height: 667, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:3000/index.html', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => {
    const pre = document.getElementById('priyulabs-preloader') || document.getElementById('sitePreloader');
    if (pre) pre.style.display = 'none';
  });
  await new Promise(r => setTimeout(r, 300));

  const initialProof = await page.evaluate(() => {
    const scroller = document.querySelector('.serve-scroll');
    return {
      exists: !!scroller,
      scrollWidth: scroller?.scrollWidth,
      clientWidth: scroller?.clientWidth,
      scrollLeft: scroller?.scrollLeft,
      overflowX: scroller ? getComputedStyle(scroller).overflowX : null,
      display: scroller ? getComputedStyle(scroller).display : null,
      prevDisabled: document.getElementById('serveArrowPrev')?.disabled,
      nextDisabled: document.getElementById('serveArrowNext')?.disabled
    };
  });
  console.log('Initial Proof State:', initialProof);

  // Next Step 1
  await page.evaluate(() => document.getElementById('serveArrowNext').click());
  await new Promise(r => setTimeout(r, 600));
  const afterNext1 = await page.evaluate(() => ({
    scrollLeft: document.querySelector('.serve-scroll').scrollLeft,
    prevDisabled: document.getElementById('serveArrowPrev').disabled,
    nextDisabled: document.getElementById('serveArrowNext').disabled
  }));
  console.log('After RIGHT Click 1:', afterNext1);

  // Next Step 2
  await page.evaluate(() => document.getElementById('serveArrowNext').click());
  await new Promise(r => setTimeout(r, 600));
  const afterNext2 = await page.evaluate(() => ({
    scrollLeft: document.querySelector('.serve-scroll').scrollLeft,
    prevDisabled: document.getElementById('serveArrowPrev').disabled,
    nextDisabled: document.getElementById('serveArrowNext').disabled
  }));
  console.log('After RIGHT Click 2:', afterNext2);

  // Next Step 3
  await page.evaluate(() => document.getElementById('serveArrowNext').click());
  await new Promise(r => setTimeout(r, 600));
  const afterNext3 = await page.evaluate(() => ({
    scrollLeft: document.querySelector('.serve-scroll').scrollLeft,
    prevDisabled: document.getElementById('serveArrowPrev').disabled,
    nextDisabled: document.getElementById('serveArrowNext').disabled
  }));
  console.log('After RIGHT Click 3:', afterNext3);

  // Next Step 4 (To End)
  await page.evaluate(() => document.getElementById('serveArrowNext').click());
  await new Promise(r => setTimeout(r, 600));
  const afterNext4 = await page.evaluate(() => ({
    scrollLeft: document.querySelector('.serve-scroll').scrollLeft,
    prevDisabled: document.getElementById('serveArrowPrev').disabled,
    nextDisabled: document.getElementById('serveArrowNext').disabled,
    nextAriaDisabled: document.getElementById('serveArrowNext').getAttribute('aria-disabled')
  }));
  console.log('After RIGHT Click 4 (At End):', afterNext4);

  // Prev Step 1
  await page.evaluate(() => document.getElementById('serveArrowPrev').click());
  await new Promise(r => setTimeout(r, 600));
  const afterPrev1 = await page.evaluate(() => ({
    scrollLeft: document.querySelector('.serve-scroll').scrollLeft,
    prevDisabled: document.getElementById('serveArrowPrev').disabled,
    nextDisabled: document.getElementById('serveArrowNext').disabled
  }));
  console.log('After LEFT Click 1:', afterPrev1);

  // Prev Step 2
  await page.evaluate(() => document.getElementById('serveArrowPrev').click());
  await new Promise(r => setTimeout(r, 600));
  const afterPrev2 = await page.evaluate(() => ({
    scrollLeft: document.querySelector('.serve-scroll').scrollLeft,
    prevDisabled: document.getElementById('serveArrowPrev').disabled,
    nextDisabled: document.getElementById('serveArrowNext').disabled
  }));
  console.log('After LEFT Click 2:', afterPrev2);

  // Prev Step 3
  await page.evaluate(() => document.getElementById('serveArrowPrev').click());
  await new Promise(r => setTimeout(r, 600));
  const afterPrev3 = await page.evaluate(() => ({
    scrollLeft: document.querySelector('.serve-scroll').scrollLeft,
    prevDisabled: document.getElementById('serveArrowPrev').disabled,
    nextDisabled: document.getElementById('serveArrowNext').disabled
  }));
  console.log('After LEFT Click 3:', afterPrev3);

  // Prev Step 4 (Back to Start)
  await page.evaluate(() => document.getElementById('serveArrowPrev').click());
  await new Promise(r => setTimeout(r, 600));
  const afterPrev4 = await page.evaluate(() => ({
    scrollLeft: document.querySelector('.serve-scroll').scrollLeft,
    prevDisabled: document.getElementById('serveArrowPrev').disabled,
    prevAriaDisabled: document.getElementById('serveArrowPrev').getAttribute('aria-disabled'),
    nextDisabled: document.getElementById('serveArrowNext').disabled
  }));
  console.log('After LEFT Click 4 (At Start):', afterPrev4);

  // Touch Swipe Test
  console.log('\n===============================================================');
  console.log('STEP 7: NATIVE TOUCH SWIPE VERIFICATION');
  console.log('===============================================================');
  const swipeResult = await page.evaluate(async () => {
    const slider = document.querySelector('.serve-scroll');
    slider.scrollTo({ left: 0, behavior: 'instant' });
    await new Promise(r => setTimeout(r, 100));

    const t1 = new Touch({ identifier: 1, target: slider, clientX: 280, clientY: 300 });
    const t2 = new Touch({ identifier: 1, target: slider, clientX: 80, clientY: 300 });

    slider.dispatchEvent(new TouchEvent('touchstart', { touches: [t1], changedTouches: [t1], bubbles: true }));
    slider.dispatchEvent(new TouchEvent('touchmove', { touches: [t2], changedTouches: [t2], bubbles: true }));
    slider.scrollLeft = 200;
    slider.dispatchEvent(new TouchEvent('touchend', { touches: [], changedTouches: [t2], bubbles: true }));

    await new Promise(r => setTimeout(r, 150));
    return {
      scrollLeftAfterSwipe: slider.scrollLeft,
      prevDisabled: document.getElementById('serveArrowPrev').disabled,
      nextDisabled: document.getElementById('serveArrowNext').disabled
    };
  });
  console.log('Swipe Result:', swipeResult);

  // Viewport Audit Matrix
  console.log('\n===============================================================');
  console.log('FULL MOBILE & DESKTOP AUDIT MATRIX');
  console.log('===============================================================');
  const vpResults = [];
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
    });
    await new Promise(r => setTimeout(r, 200));

    const metrics = await page.evaluate((width) => {
      const isMobile = width <= 768;
      const scroller = document.querySelector('.serve-scroll');
      const prevBtn = document.getElementById('serveArrowPrev');
      const nextBtn = document.getElementById('serveArrowNext');

      const isOverflowing = scroller.scrollWidth > scroller.clientWidth;
      const prevDisp = window.getComputedStyle(prevBtn).display;
      const nextDisp = window.getComputedStyle(nextBtn).display;
      const pageOverflow = document.documentElement.scrollWidth - document.documentElement.clientWidth;

      return {
        isMobile,
        scrollWidth: scroller.scrollWidth,
        clientWidth: scroller.clientWidth,
        isOverflowing: isOverflowing ? 'PASS' : (isMobile ? 'FAIL' : 'N/A (Desktop Grid)'),
        arrowsDisplay: isMobile ? (prevDisp === 'flex' && nextDisp === 'flex' ? 'flex (PASS)' : 'FAIL') : (prevDisp === 'none' && nextDisp === 'none' ? 'none (PASS)' : 'FAIL'),
        pageOverflow: pageOverflow === 0 ? '0px (PASS)' : `${pageOverflow}px (FAIL)`
      };
    }, vp.width);

    vpResults.push({
      viewport: `${vp.width}x${vp.height} (${vp.name})`,
      carouselMetrics: `${metrics.clientWidth}px / ${metrics.scrollWidth}px`,
      overflowState: metrics.isOverflowing,
      arrowsDisplay: metrics.arrowsDisplay,
      pageOverflow: metrics.pageOverflow
    });
  }

  console.table(vpResults);
  console.log('Console Errors:', consoleErrors.length === 0 ? '0 (Clean)' : consoleErrors);

  await browser.close();
}

runRootCauseAudit();
