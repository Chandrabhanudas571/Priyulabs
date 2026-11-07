const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
  ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  : 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const VIEWPORTS = [
  // Mobile requested viewports
  { name: 'mobile_320', width: 320, height: 568 },
  { name: 'mobile_360', width: 360, height: 800 },
  { name: 'mobile_375', width: 375, height: 667 },
  { name: 'mobile_390', width: 390, height: 844 },
  { name: 'mobile_414', width: 414, height: 896 },
  { name: 'mobile_430', width: 430, height: 932 },
  { name: 'mobile_480', width: 480, height: 854 },
  { name: 'mobile_540', width: 540, height: 960 },
  // Tablet
  { name: 'tablet_768', width: 768, height: 1024 },
  // Desktop regression viewports
  { name: 'desktop_1024', width: 1024, height: 768 },
  { name: 'desktop_1280', width: 1280, height: 800 },
  { name: 'desktop_1366', width: 1366, height: 768 },
  { name: 'desktop_1440', width: 1440, height: 900 },
  { name: 'desktop_1920', width: 1920, height: 1080 }
];

async function runHeroTests() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const results = [];

  const screenshotDir = path.join(__dirname, '../artifacts/screenshots');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  for (const vp of VIEWPORTS) {
    await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 1 });
    await page.goto('http://localhost:3000/index.html', { waitUntil: 'networkidle0', timeout: 15000 }).catch(() => {});

    // Dismiss preloader if present
    await page.evaluate(() => {
      const pre = document.getElementById('priyulabs-preloader') || document.getElementById('priyulabsIntroPreloader');
      if (pre) pre.style.display = 'none';
    });
    await new Promise(r => setTimeout(r, 300));

    const data = await page.evaluate((isMobile) => {
      const docScrollW = document.documentElement.scrollWidth;
      const docClientW = document.documentElement.clientWidth;
      const bodyScrollW = document.body.scrollWidth;
      const bodyClientW = document.body.clientWidth;
      const hasOverflow = docScrollW > docClientW || bodyScrollW > bodyClientW;

      const hero = document.querySelector('.hero');
      const h1 = document.querySelector('.hero-copy h1');
      const sub = document.querySelector('.hero-sub');
      const actions = document.querySelector('.hero-actions');
      const visual = document.querySelector('.hero-visual');
      const trust = document.querySelector('.hero-trust');
      const video = document.querySelector('.hero-visual video');

      const btnPrimary = document.querySelector('.hero-actions .btn-primary');
      const btnGhost = document.querySelector('.hero-actions .btn-ghost');

      const h1Rect = h1 ? h1.getBoundingClientRect() : null;
      const subRect = sub ? sub.getBoundingClientRect() : null;
      const actionsRect = actions ? actions.getBoundingClientRect() : null;
      const visualRect = visual ? visual.getBoundingClientRect() : null;
      const trustRect = trust ? trust.getBoundingClientRect() : null;

      // Vertical order check on mobile
      let orderValid = true;
      let orderDetails = '';
      if (h1Rect && subRect && actionsRect && visualRect && trustRect) {
        if (isMobile) {
          const isH1AboveSub = h1Rect.top < subRect.top;
          const isSubAboveActions = subRect.top < actionsRect.top;
          const isActionsAboveVisual = actionsRect.top < visualRect.top;
          const isVisualAboveTrust = visualRect.top < trustRect.top;
          orderValid = isH1AboveSub && isSubAboveActions && isActionsAboveVisual && isVisualAboveTrust;
          orderDetails = `H1(${Math.round(h1Rect.top)}) -> Sub(${Math.round(subRect.top)}) -> Actions(${Math.round(actionsRect.top)}) -> Visual(${Math.round(visualRect.top)}) -> Trust(${Math.round(trustRect.top)})`;
        } else {
          // Desktop side-by-side check: visual should be to the right of h1
          const isVisualBeside = visualRect.left > h1Rect.right - 50;
          orderValid = isVisualBeside;
          orderDetails = `Desktop 2-Col: H1.left=${Math.round(h1Rect.left)}, Visual.left=${Math.round(visualRect.left)}`;
        }
      }

      return {
        docScrollW,
        docClientW,
        hasOverflow,
        orderValid,
        orderDetails,
        h1FontSize: h1 ? window.getComputedStyle(h1).fontSize : null,
        subFontSize: sub ? window.getComputedStyle(sub).fontSize : null,
        visualWidth: visualRect ? Math.round(visualRect.width) : null,
        visualHeight: visualRect ? Math.round(visualRect.height) : null,
        videoPlaying: video ? (!video.paused && !video.ended && video.readyState > 2) : false,
        videoMuted: video ? video.muted : false,
        videoAutoplay: video ? video.autoplay : false,
        videoLoop: video ? video.loop : false,
        btnPrimarySize: btnPrimary ? { w: Math.round(btnPrimary.getBoundingClientRect().width), h: Math.round(btnPrimary.getBoundingClientRect().height) } : null,
        btnGhostSize: btnGhost ? { w: Math.round(btnGhost.getBoundingClientRect().width), h: Math.round(btnGhost.getBoundingClientRect().height) } : null
      };
    }, vp.width <= 768);

    // Take screenshot of hero
    const heroEl = await page.$('.hero');
    if (heroEl) {
      await heroEl.screenshot({ path: path.join(screenshotDir, `hero_${vp.name}.png`) });
    }

    results.push({
      vp: `${vp.width}x${vp.height} (${vp.name})`,
      width: vp.width,
      overflow: data.hasOverflow ? 'FAIL (OVERFLOW)' : 'PASS (Clean)',
      order: data.orderValid ? 'PASS' : 'FAIL',
      details: data.orderDetails,
      h1Font: data.h1FontSize,
      visualSize: `${data.visualWidth}x${data.visualHeight}px`,
      primaryBtn: data.btnPrimarySize ? `${data.btnPrimarySize.w}x${data.btnPrimarySize.h}px` : 'N/A'
    });
  }

  // Test Hamburger Drawer functionality
  await page.setViewport({ width: 375, height: 667 });
  await page.goto('http://localhost:3000/index.html', { waitUntil: 'networkidle0' });
  const drawerTest = await page.evaluate(async () => {
    const burger = document.getElementById('hamburgerBtn') || document.querySelector('.hamburger') || document.querySelector('[data-drawer-toggle]');
    const drawer = document.getElementById('mobileDrawer') || document.querySelector('.mobile-drawer');
    if (!burger || !drawer) return { status: 'NO_BURGER_FOUND' };

    const initialOpen = drawer.classList.contains('active') || drawer.classList.contains('is-open') || window.getComputedStyle(drawer).display !== 'none';
    burger.click();
    await new Promise(r => setTimeout(r, 300));
    const opened = drawer.classList.contains('active') || drawer.classList.contains('is-open') || window.getComputedStyle(drawer).visibility === 'visible' || window.getComputedStyle(drawer).transform.includes('matrix');
    
    // Close button
    const closeBtn = drawer.querySelector('.drawer-close, .close-drawer, [data-drawer-close]') || burger;
    if (closeBtn) closeBtn.click();
    await new Promise(r => setTimeout(r, 300));
    const closed = !drawer.classList.contains('active') && !drawer.classList.contains('is-open');

    return { status: 'SUCCESS', opened, closed };
  });

  console.log('\n=== TASK 01: HERO SECTION AUDIT RESULTS ===\n');
  console.table(results);
  console.log('\n=== MOBILE DRAWER TEST ===\n', drawerTest);

  await browser.close();
}

runHeroTests().catch(console.error);
