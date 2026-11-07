const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const CHROME_PATH = fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
  ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  : 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const VIEWPORTS = [
  { name: 'desktop_1920', width: 1920, height: 1080 },
  { name: 'desktop_1440', width: 1440, height: 900 },
  { name: 'desktop_1366', width: 1366, height: 768 },
  { name: 'desktop_1280', width: 1280, height: 800 },
  { name: 'tablet_1024', width: 1024, height: 768 },
  { name: 'tablet_820', width: 820, height: 1180 },
  { name: 'tablet_768', width: 768, height: 1024 },
  { name: 'mobile_540', width: 540, height: 960 },
  { name: 'mobile_480', width: 480, height: 854 },
  { name: 'mobile_430', width: 430, height: 932 },
  { name: 'mobile_414', width: 414, height: 896 },
  { name: 'mobile_390', width: 390, height: 844 },
  { name: 'mobile_375', width: 375, height: 667 },
  { name: 'mobile_360', width: 360, height: 800 },
  { name: 'mobile_320', width: 320, height: 568 },
];

async function runTests() {
  console.log('Launching browser with:', CHROME_PATH);
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  const results = [];

  for (const vp of VIEWPORTS) {
    await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 1 });
    await page.goto('http://localhost:3000/index.html', { waitUntil: 'networkidle0', timeout: 15000 }).catch(() => {});

    // Dismiss preloader if present
    await page.evaluate(() => {
      const pre = document.getElementById('priyulabs-preloader') || document.getElementById('priyulabsIntroPreloader');
      if (pre) {
        pre.style.display = 'none';
        pre.classList.add('preloader-hidden');
      }
    });

    await new Promise(r => setTimeout(r, 600));

    const check = await page.evaluate(() => {
      const scrollW = document.documentElement.scrollWidth;
      const clientW = document.documentElement.clientWidth;
      const bodyScrollW = document.body.scrollWidth;
      const bodyClientW = document.body.clientWidth;
      const hasOverflow = scrollW > clientW || bodyScrollW > bodyClientW;

      // Find overflowing elements
      const overflowingElements = [];
      const allEls = document.querySelectorAll('*');
      for (const el of allEls) {
        if (el.id === 'mobileDrawer' || el.closest('#mobileDrawer') || el.classList.contains('global-fluid-bg') || el.closest('.global-fluid-bg') || el.classList.contains('ambient-dot-grid')) continue;
        const rect = el.getBoundingClientRect();
        if (rect.right > window.innerWidth + 1) {
          overflowingElements.push({
            tag: el.tagName,
            id: el.id,
            className: el.className,
            right: rect.right,
            width: rect.width,
            windowWidth: window.innerWidth
          });
        }
      }

      // Check hero layout
      const heroGrid = document.querySelector('.hero-grid');
      const heroCopy = document.querySelector('.hero-copy');
      const heroVisual = document.querySelector('.hero-visual');
      const heroActions = document.querySelector('.hero-actions');
      const heroTrust = document.querySelector('.hero-trust');

      // Check feature rows
      const featureRows = Array.from(document.querySelectorAll('.feature-row')).map(r => {
        const style = window.getComputedStyle(r);
        return {
          display: style.display,
          gridTemplateColumns: style.gridTemplateColumns
        };
      });

      // Check hamburger
      const hamburger = document.querySelector('.hamburger');
      const navLinks = document.querySelector('.nav-links');
      const hamVisible = hamburger ? window.getComputedStyle(hamburger).display !== 'none' : false;
      const navLinksVisible = navLinks ? window.getComputedStyle(navLinks).display !== 'none' : false;

      // Check Who We Serve scroll
      const serveScroll = document.querySelector('.serve-scroll');
      const serveCards = document.querySelectorAll('.serve-card');
      const serveRoundCta = document.querySelector('.serve-round-cta');

      return {
        viewportWidth: window.innerWidth,
        scrollW,
        clientW,
        bodyScrollW,
        bodyClientW,
        hasOverflow,
        overflowingElements: overflowingElements.slice(0, 10),
        hamVisible,
        navLinksVisible,
        featureRowsCount: featureRows.length,
        featureRows,
        serveCardsCount: serveCards.length,
        serveRoundCtaPresent: !!serveRoundCta,
        serveScrollWidth: serveScroll ? serveScroll.scrollWidth : 0,
        serveClientWidth: serveScroll ? serveScroll.clientWidth : 0
      };
    });

    results.push({ viewport: vp.name, width: vp.width, height: vp.height, ...check });
    console.log(`[${vp.name}] ${vp.width}x${vp.height} -> Overflow: ${check.hasOverflow} (scrollW: ${check.scrollW}, clientW: ${check.clientW}), Hamburger: ${check.hamVisible}, DesktopNav: ${check.navLinksVisible}`);
    if (check.overflowingElements.length > 0) {
      console.log(`  Overflowing elements:`, JSON.stringify(check.overflowingElements));
    }
  }

  // Test Mobile Navigation Drawer Interaction
  console.log('\n--- Testing Mobile Drawer Interaction at 390x844 ---');
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
  await page.goto('http://localhost:3000/index.html', { waitUntil: 'networkidle0', timeout: 15000 }).catch(() => {});
  await page.evaluate(() => {
    const pre = document.getElementById('priyulabs-preloader') || document.getElementById('priyulabsIntroPreloader');
    if (pre) pre.style.display = 'none';
  });

  const hamClick = await page.evaluate(() => {
    const ham = document.getElementById('hamburger');
    if (!ham) return { success: false, reason: 'no hamburger' };
    ham.click();
    const drawer = document.getElementById('mobileDrawer');
    return {
      success: true,
      drawerOpen: drawer.classList.contains('open'),
      drawerDisplay: window.getComputedStyle(drawer).display,
      drawerOpacity: window.getComputedStyle(drawer).opacity
    };
  });
  console.log('Hamburger click result:', hamClick);

  // Drilldown to Business types
  const drillResult = await page.evaluate(() => {
    const bTypeBtn = document.querySelector('.drawer-drill-trigger[data-target="drawerPanelBusiness"]');
    if (!bTypeBtn) return { success: false, reason: 'no drill trigger' };
    bTypeBtn.click();
    const panel = document.getElementById('drawerPanelBusiness');
    const headerTitle = document.getElementById('drawerHeaderTitle').textContent;
    return {
      success: true,
      panelActive: panel.classList.contains('active'),
      headerTitle
    };
  });
  console.log('Drilldown to Business result:', drillResult);

  // Drillback
  const backResult = await page.evaluate(() => {
    const backBtn = document.getElementById('drawerBackBtn');
    if (!backBtn) return { success: false, reason: 'no back button' };
    backBtn.click();
    const mainPanel = document.getElementById('drawerPanelMain');
    const headerTitle = document.getElementById('drawerHeaderTitle').textContent;
    return {
      success: true,
      mainActive: mainPanel.classList.contains('active'),
      headerTitle
    };
  });
  console.log('Back button result:', backResult);

  // Close drawer
  const closeResult = await page.evaluate(() => {
    const closeBtn = document.getElementById('drawerCloseBtn');
    if (!closeBtn) return { success: false, reason: 'no close button' };
    closeBtn.click();
    const drawer = document.getElementById('mobileDrawer');
    return {
      success: true,
      drawerOpen: drawer.classList.contains('open')
    };
  });
  console.log('Close button result:', closeResult);

  await browser.close();
  console.log('\nAll viewport tests completed.');
}

runTests().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
