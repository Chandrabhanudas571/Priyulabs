const puppeteer = require('puppeteer-core');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const rootDir = path.resolve(__dirname, '..');

async function inspectVisuals(fileRelPath) {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    pipe: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--single-process']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });

  const fileUrl = 'file://' + path.join(rootDir, fileRelPath).replace(/\\/g, '/');
  await page.goto(fileUrl, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 600));

  const info = await page.evaluate(() => {
    // 1. Backdrops & Overlays
    const backdrops = Array.from(document.querySelectorAll('.drawer-backdrop, .m-drawer-backdrop, .mobile-drawer, [id*="backdrop"], [class*="backdrop"], [class*="overlay"]')).map(el => {
      const cs = window.getComputedStyle(el);
      return {
        tag: el.tagName,
        id: el.id,
        class: el.className,
        display: cs.display,
        visibility: cs.visibility,
        opacity: cs.opacity,
        zIndex: cs.zIndex,
        position: cs.position,
        pointerEvents: cs.pointerEvents,
        background: cs.background,
        rect: {
          left: el.getBoundingClientRect().left,
          top: el.getBoundingClientRect().top,
          width: el.getBoundingClientRect().width,
          height: el.getBoundingClientRect().height
        }
      };
    });

    // 2. Pillars section and card
    const pillarSec = document.querySelector('.clean-pillars-sec, .pillars-sec');
    const firstCard = pillarSec ? pillarSec.querySelector('.pillar-row, .pillar-card') : null;
    let cardInfo = null;

    if (firstCard) {
      firstCard.scrollIntoView({ block: 'start' });
      const cr = firstCard.getBoundingClientRect();
      const cs = window.getComputedStyle(firstCard);

      // Check what is at card center
      const cx = cr.left + cr.width / 2;
      const cy = Math.max(100, Math.min(cr.top + 100, window.innerHeight - 100));
      const elsAtCard = document.elementsFromPoint ? document.elementsFromPoint(cx, cy) : [];

      cardInfo = {
        cardRect: { left: cr.left, right: cr.right, top: cr.top, width: cr.width, height: cr.height },
        cardBg: cs.backgroundColor,
        cardOpacity: cs.opacity,
        cardFilter: cs.filter,
        cardBackdropFilter: cs.backdropFilter,
        cardBorder: cs.border,
        cardBoxShadow: cs.boxShadow,
        elementsAtPoint: elsAtCard.map(el => ({
          tag: el.tagName,
          id: el.id,
          class: el.className,
          bg: window.getComputedStyle(el).backgroundColor,
          opacity: window.getComputedStyle(el).opacity,
          zIndex: window.getComputedStyle(el).zIndex,
          filter: window.getComputedStyle(el).filter
        }))
      };
    }

    // 3. Edges check (Left edge x=5, Right edge x=385)
    const leftEl = document.elementFromPoint(5, 400);
    const rightEl = document.elementFromPoint(385, 400);
    const centerEl = document.elementFromPoint(195, 400);

    const getElSummary = (el) => {
      if (!el) return null;
      const cs = window.getComputedStyle(el);
      return {
        tag: el.tagName,
        id: el.id,
        class: el.className,
        bg: cs.backgroundColor,
        color: cs.color,
        border: cs.border,
        rect: {
          left: Math.round(el.getBoundingClientRect().left),
          right: Math.round(el.getBoundingClientRect().right),
          width: Math.round(el.getBoundingClientRect().width)
        }
      };
    };

    return {
      backdrops,
      cardInfo,
      leftEdge: getElSummary(leftEl),
      rightEdge: getElSummary(rightEl),
      center: getElSummary(centerEl)
    };
  });

  // Capture screenshot of the pillars section
  const screenshotPath = path.join(rootDir, `test-artifacts/diag_${path.basename(fileRelPath, '.html')}_390px.png`);
  await page.screenshot({ path: screenshotPath, fullPage: false });

  await browser.close();
  return info;
}

(async () => {
  console.log('=== Checking Cloud Kitchens ===');
  const ck = await inspectVisuals('cloud-kitchens-catering.html');
  console.log(JSON.stringify(ck, null, 2));

  console.log('\n=== Checking Cafes ===');
  const cafe = await inspectVisuals('cafes-chai-bars.html');
  console.log(JSON.stringify(cafe, null, 2));
})();

