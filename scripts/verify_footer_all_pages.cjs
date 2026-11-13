const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');
const os = require('os');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const testPages = [
  'index.html',
  'pos.html',
  'pos/index.html',
  'cloud-kitchens-catering.html',
  'grocery-supermarkets-kirana.html',
  'apparel-boutiques/index.html',
  'salons-spas.html',
  'all-business-types.html',
  'cafes-chai-bars.html',
  'restaurants-fine-dining.html',
  'electronics-mobile-shops.html',
  'complete-management-system/index.html',
  'digital-marketing/index.html'
];

async function verifyAllFooters() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    pipe: true,
    userDataDir: path.join(os.tmpdir(), 'pupp_footer_test_' + Date.now()),
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--single-process', '--allow-file-access-from-files']
  });

  const page = await browser.newPage();
  const viewports = [360, 390, 430];
  const summary = [];

  for (const p of testPages) {
    const fullPath = path.resolve(__dirname, '..', p);
    if (!fs.existsSync(fullPath)) continue;

    for (const w of viewports) {
      await page.setViewport({ width: w, height: 844, isMobile: true, hasTouch: true });
      await page.goto('file:///' + fullPath.replace(/\\/g, '/'), { waitUntil: 'load' });
      await new Promise(r => setTimeout(r, 400));

      const res = await page.evaluate((w) => {
        const footer = document.querySelector('footer, .priyulabs-universal-footer, .site-footer, .hub-footer');
        if (!footer) return { found: false };

        const cs = window.getComputedStyle(footer);
        const rect = footer.getBoundingClientRect();

        const grid = footer.querySelector('.foot-grid');
        const gridCs = grid ? window.getComputedStyle(grid) : null;
        let numGridCols = 0;
        if (gridCs && gridCs.display === 'grid') {
          numGridCols = gridCs.gridTemplateColumns.trim().split(/\s+/).length;
        }

        const logoImg = footer.querySelector('.logo img, img.logo');
        const logoH = logoImg ? window.getComputedStyle(logoImg).height : 'n/a';

        const social = footer.querySelector('.foot-social');
        const socialVisible = social ? (window.getComputedStyle(social).display !== 'none') : false;

        const stickyBar = document.querySelector('.mobile-sticky-cta, .sticky-bottom-bar, .mobile-dock, .mobile-bottom-bar, [class*="sticky-bar"]');
        let stickyClearance = true;
        if (stickyBar) {
          const stickyRect = stickyBar.getBoundingClientRect();
          const lastEl = footer.querySelector('.foot-bottom, .container, .footer-inner') || footer.lastElementChild;
          if (lastEl) {
            const lastRect = lastEl.getBoundingClientRect();
            // In normal scroll, bottom element must be visible without being obscured by sticky bar
            // We check if footer's computed paddingBottom is at least 60px
            const pb = parseFloat(cs.paddingBottom) || 0;
            const bottomRowPb = lastEl ? (parseFloat(window.getComputedStyle(lastEl).paddingBottom) || 0) : 0;
            stickyClearance = (pb >= 60 || bottomRowPb >= 60);
          }
        }

        return {
          found: true,
          scrollWidth: document.documentElement.scrollWidth,
          innerWidth: w,
          overflow: document.documentElement.scrollWidth - w,
          height: Math.round(rect.height),
          paddingTop: cs.paddingTop,
          paddingBottom: cs.paddingBottom,
          bg: cs.backgroundColor,
          numGridCols,
          logoHeight: logoH,
          hasSocial: socialVisible,
          stickyClearance
        };
      }, w);

      summary.push({ page: p, width: w, ...res });
    }

    // Take screenshot at 390px
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
    await page.goto('file:///' + fullPath.replace(/\\/g, '/'), { waitUntil: 'load' });
    await new Promise(r => setTimeout(r, 400));
    const footerHandle = await page.$('footer, .priyulabs-universal-footer, .site-footer, .hub-footer');
    if (footerHandle) {
      const cleanName = p.replace(/[\\\/.]/g, '_');
      const artDir = path.resolve(__dirname, '..', 'test-artifacts');
      if (!fs.existsSync(artDir)) fs.mkdirSync(artDir, { recursive: true });
      await footerHandle.screenshot({ path: path.join(artDir, `footer_after_${cleanName}.png`) });
    }
  }

  // Also verify Desktop at 1280px for index.html, pos.html, cloud-kitchens
  const desktopPages = ['index.html', 'pos.html', 'cloud-kitchens-catering.html'];
  const desktopSummary = [];
  for (const dp of desktopPages) {
    const fullPath = path.resolve(__dirname, '..', dp);
    await page.setViewport({ width: 1280, height: 800, isMobile: false, hasTouch: false });
    await page.goto('file:///' + fullPath.replace(/\\/g, '/'), { waitUntil: 'load' });
    await new Promise(r => setTimeout(r, 400));

    const dRes = await page.evaluate(() => {
      const footer = document.querySelector('footer, .priyulabs-universal-footer, .site-footer');
      if (!footer) return { found: false };
      const grid = footer.querySelector('.foot-grid');
      const gridCs = grid ? window.getComputedStyle(grid) : null;
      let numGridCols = 0;
      if (gridCs && gridCs.display === 'grid') {
        numGridCols = gridCs.gridTemplateColumns.trim().split(/\s+/).length;
      }
      const social = footer.querySelector('.foot-social');
      const socialVisible = social ? (window.getComputedStyle(social).display !== 'none') : false;
      return {
        found: true,
        numGridCols,
        socialVisibleOnDesktop: socialVisible
      };
    });
    desktopSummary.push({ page: dp, ...dRes });
  }

  await browser.close();

  console.log('=== MOBILE FOOTER VERIFICATION (SAMPLE AT 390PX) ===');
  summary.filter(s => s.width === 390).forEach(s => {
    console.log(`${s.page} | Height: ${s.height}px | Overflow: ${s.overflow}px | GridCols: ${s.numGridCols} | Bg: ${s.bg} | LogoH: ${s.logoHeight}`);
  });

  console.log('\n=== ANY OVERFLOWS AT 360/390/430PX? ===');
  const overflows = summary.filter(s => s.overflow > 0);
  if (overflows.length === 0) {
    console.log('PASSED: Zero overflow across all pages and viewports!');
  } else {
    console.log('FAILED: Overflows found:', overflows);
  }

  console.log('\n=== DESKTOP INTEGRITY CHECK (1280PX) ===');
  console.log(JSON.stringify(desktopSummary, null, 2));
}

verifyAllFooters().catch(console.error);

