const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
  ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  : 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const VIEWPORTS = [
  { name: '320', width: 320, height: 568 },
  { name: '360', width: 360, height: 800 },
  { name: '375', width: 375, height: 667 },
  { name: '390', width: 390, height: 844 },
  { name: '414', width: 414, height: 896 },
  { name: '430', width: 430, height: 932 },
  { name: '480', width: 480, height: 854 },
  { name: '540', width: 540, height: 960 },
  { name: '768', width: 768, height: 1024 },
  { name: '1024', width: 1024, height: 768 },
  { name: '1280', width: 1280, height: 800 },
  { name: '1366', width: 1366, height: 768 },
  { name: '1440', width: 1440, height: 900 },
  { name: '1920', width: 1920, height: 1080 }
];

async function runComprehensiveAudit() {
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

  console.log('==================================================');
  console.log('AUDIT 1: NAVBAR & DRAWER INTERACTION (375x667)');
  console.log('==================================================');

  await page.setViewport({ width: 375, height: 667, hasTouch: true, isMobile: true });
  await page.goto('http://localhost:3000/index.html', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => {
    const pre = document.getElementById('priyulabs-preloader') || document.getElementById('sitePreloader');
    if (pre) pre.style.display = 'none';
  });

  // Test Hamburger Open
  const beforeOpenOverflow = await page.evaluate(() => document.body.style.overflow);
  await page.click('#hamburger');
  await new Promise(r => setTimeout(r, 150));

  const drawerOpenState = await page.evaluate(() => {
    const d = document.getElementById('mobileDrawer');
    return {
      isOpen: d.classList.contains('open'),
      ariaHidden: d.getAttribute('aria-hidden'),
      bodyOverflow: document.body.style.overflow
    };
  });
  console.log('Drawer Open State (Expected: open, false, hidden):', drawerOpenState);

  // Test Drilldown to Business Types
  await page.evaluate(() => {
    const btn = document.querySelector('.drawer-drill-trigger[data-target="drawerPanelBusiness"]');
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 150));

  const drilldownState = await page.evaluate(() => {
    const panel = document.getElementById('drawerPanelBusiness');
    const backBtn = document.getElementById('drawerBackBtn');
    const title = document.getElementById('drawerHeaderTitle');
    return {
      panelActive: panel.classList.contains('active'),
      backBtnVisible: backBtn.classList.contains('visible'),
      titleText: title.textContent
    };
  });
  console.log('Drilldown to Business Types (Expected: true, true, Business types):', drilldownState);

  // Test Back Navigation
  await page.click('#drawerBackBtn');
  await new Promise(r => setTimeout(r, 150));

  const backState = await page.evaluate(() => {
    const mainPanel = document.getElementById('drawerPanelMain');
    const backBtn = document.getElementById('drawerBackBtn');
    const title = document.getElementById('drawerHeaderTitle');
    return {
      mainActive: mainPanel.classList.contains('active'),
      backBtnVisible: backBtn.classList.contains('visible'),
      titleText: title.textContent
    };
  });
  console.log('Back Button Navigation (Expected: true, false, Menu):', backState);

  // Test Close Button
  await page.click('#drawerCloseBtn');
  await new Promise(r => setTimeout(r, 350));

  const drawerCloseState = await page.evaluate(() => {
    const d = document.getElementById('mobileDrawer');
    return {
      isOpen: d.classList.contains('open'),
      ariaHidden: d.getAttribute('aria-hidden'),
      bodyOverflow: document.body.style.overflow
    };
  });
  console.log('Drawer Close State (Expected: false, true, ""):', drawerCloseState);

  console.log('\n==================================================');
  console.log('AUDIT 2: HERO CTAS & VIDEO ENGINE');
  console.log('==================================================');

  const heroMetrics = await page.evaluate(() => {
    const primaryCta = document.querySelector('.hero-actions .btn-primary');
    const ghostCta = document.querySelector('.hero-actions .btn-ghost');
    const video = document.querySelector('.hero-visual video');
    return {
      primaryHref: primaryCta?.getAttribute('href'),
      ghostHref: ghostCta?.getAttribute('href'),
      videoExists: !!video,
      videoAutoplay: video?.autoplay,
      videoMuted: video?.muted,
      videoPlaysInline: video?.hasAttribute('playsinline')
    };
  });
  console.log('Hero CTAs & Video:', heroMetrics);

  console.log('\n==================================================');
  console.log('AUDIT 3: WHO WE SERVE CAROUSEL & SWIPE/CLICK');
  console.log('==================================================');

  const whoMetrics = await page.evaluate(() => {
    const slider = document.querySelector('.serve-scroll');
    const cards = Array.from(document.querySelectorAll('.serve-card'));
    const roundCta = document.querySelector('.serve-round-cta');
    const style = window.getComputedStyle(slider);
    return {
      scrollWidth: slider.scrollWidth,
      clientWidth: slider.clientWidth,
      isScrollable: slider.scrollWidth > slider.clientWidth,
      overflowX: style.overflowX,
      touchAction: style.touchAction,
      scrollSnapType: style.scrollSnapType,
      cardsCount: cards.length,
      cardsHrefs: cards.map(c => ({ title: c.querySelector('h4')?.textContent.trim(), href: c.getAttribute('href') })),
      roundCtaHref: roundCta?.getAttribute('href')
    };
  });
  console.log('Who We Serve Carousel Metrics:', whoMetrics);

  console.log('\n==================================================');
  console.log('AUDIT 4: VIEWPORT AUDIT & DOCUMENT OVERFLOW CHECK');
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

    // Check sticky navbar at scroll positions
    const scrollPositions = [0, 500, 1500];
    let stickyPassed = true;
    for (const y of scrollPositions) {
      await page.evaluate((pos) => window.scrollTo(0, pos), y);
      await new Promise(r => setTimeout(r, 40));
      const rectTop = await page.evaluate(() => {
        const header = document.querySelector('header');
        return header ? Math.round(header.getBoundingClientRect().top) : null;
      });
      if (rectTop !== 0) {
        stickyPassed = false;
      }
    }

    const overflowCheck = await page.evaluate(() => {
      const docW = document.documentElement.scrollWidth;
      const clientW = document.documentElement.clientWidth;
      return {
        docW,
        clientW,
        isZeroOverflow: docW === clientW
      };
    });

    vpResults.push({
      width: vp.width,
      stickyNavbar: stickyPassed ? 'PASS' : 'FAIL',
      overflow: overflowCheck.isZeroOverflow ? '0px (PASS)' : `${overflowCheck.docW - overflowCheck.clientW}px (FAIL)`
    });
  }
  console.table(vpResults);

  console.log('\nConsole Errors during audit:', consoleErrors.length === 0 ? '0 (Clean)' : consoleErrors);

  await browser.close();
}

runComprehensiveAudit().catch(console.error);
