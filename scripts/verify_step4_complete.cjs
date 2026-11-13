const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const rootDir = path.resolve(__dirname, '..');
const artifactsDir = path.join(rootDir, 'test-artifacts');
if (!fs.existsSync(artifactsDir)) fs.mkdirSync(artifactsDir, { recursive: true });

const targetSectors = [
  { name: 'Restaurants', file: 'restaurants-fine-dining.html' },
  { name: 'Cloud Kitchens', file: 'cloud-kitchens-catering.html' },
  { name: 'Cloud Kitchens (Subdir)', file: 'food-beverage/cloud-kitchens/index.html' },
  { name: 'Cafes', file: 'cafes-chai-bars.html' },
  { name: 'Bakeries', file: 'bakeries-shops.html' },
  { name: 'Jewellery', file: 'jewellery-shops.html' },
  { name: 'Electronics', file: 'electronics-mobile-shops.html' },
  { name: 'Salons', file: 'salons-spas.html' },
  { name: 'Gyms', file: 'gyms.html' },
  { name: 'Laundry', file: 'dry-cleaners.html' },
  { name: 'Grocery', file: 'grocery-supermarkets-kirana.html' },
  { name: 'Grocery (Subdir)', file: 'retail/grocery/index.html' }
];

async function runStep4Verification() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    pipe: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--single-process']
  });

  const report = [];

  for (const item of targetSectors) {
    const fullPath = path.join(rootDir, item.file);
    if (!fs.existsSync(fullPath)) {
      console.log('Skipping missing:', item.file);
      continue;
    }

    const fileUrl = 'file://' + fullPath.replace(/\\/g, '/');

    // 1. Mobile verification across 360, 390, 430px
    for (const w of [360, 390, 430]) {
      const page = await browser.newPage();
      await page.setViewport({ width: w, height: 844, isMobile: true, hasTouch: true });

      const consoleErrors = [];
      page.on('console', msg => {
        if (msg.type() === 'error') consoleErrors.push(msg.text());
      });

      const failedReqs = [];
      page.on('requestfailed', req => {
        const u = req.url();
        if (!u.startsWith('https://fonts.googleapis') && !u.startsWith('https://fonts.gstatic')) {
          failedReqs.push(u);
        }
      });

      await page.goto(fileUrl, { waitUntil: 'domcontentloaded' });
      await new Promise(r => setTimeout(r, 600));

      const evalData = await page.evaluate((vpW) => {
        const scrollW = document.documentElement.scrollWidth;
        const innerW = window.innerWidth;
        const overflowPx = Math.max(0, scrollW - innerW);

        // Check for elements with right > innerWidth + 1
        const overflowingEls = Array.from(document.querySelectorAll('*'))
          .map(el => {
            const r = el.getBoundingClientRect();
            return {
              tag: el.tagName,
              class: el.className,
              overflow: Math.round(r.right - window.innerWidth)
            };
          })
          .filter(x => x.overflow > 1);

        // Check pillar cards
        const sec = document.querySelector('.clean-pillars-sec, .pillars-sec, #pillars');
        const cards = sec ? Array.from(sec.querySelectorAll('.pillar-row, .pillar-scroll-step, .pillar-card')) : [];
        const cardWidths = cards.map(c => Math.round(c.getBoundingClientRect().width));
        const cardHeights = cards.map(c => Math.round(c.getBoundingClientRect().height));

        // Check card internal gaps
        let biggestInsideGap = 0;
        cards.forEach(card => {
          const children = Array.from(card.children);
          for (let i = 0; i < children.length - 1; i++) {
            const r1 = children[i].getBoundingClientRect();
            const r2 = children[i+1].getBoundingClientRect();
            const gap = r2.top - r1.bottom;
            if (gap > biggestInsideGap) biggestInsideGap = Math.round(gap);
          }
        });

        // Overlay check at card 0 center
        let hasOverlay = false;
        let overlayDesc = 'none';
        if (cards.length > 0) {
          cards[0].scrollIntoView({ block: 'center' });
          const r = cards[0].getBoundingClientRect();
          const cx = Math.min(Math.max(r.left + r.width / 2, 5), window.innerWidth - 5);
          const cy = Math.min(Math.max(r.top + r.height / 2, 5), window.innerHeight - 5);
          const els = document.elementsFromPoint ? document.elementsFromPoint(cx, cy) : [document.elementFromPoint(cx, cy)];
          const blocking = els.filter(el => {
            const cs = window.getComputedStyle(el);
            return (cs.position === 'fixed' || cs.position === 'absolute') && parseInt(cs.zIndex || '0', 10) > 10;
          });
          if (blocking.length > 0) {
            hasOverlay = true;
            overlayDesc = blocking.map(b => `${b.tagName}.${b.className}`).join(', ');
          }
        }

        const secBg = sec ? window.getComputedStyle(sec).backgroundColor : 'none';

        return {
          scrollW,
          innerW,
          overflowPx,
          overflowCount: overflowingEls.length,
          cardsCount: cards.length,
          maxCardW: cardWidths.length ? Math.max(...cardWidths) : 0,
          maxCardH: cardHeights.length ? Math.max(...cardHeights) : 0,
          biggestInsideGap,
          hasOverlay,
          overlayDesc,
          secBg
        };
      }, w);

      // Screenshot at 390px
      if (w === 390) {
        const shotName = `verified_${item.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}_390px.png`;
        const shotPath = path.join(artifactsDir, shotName);
        await page.screenshot({ path: shotPath, fullPage: true });
        evalData.screenshot = shotName;
      }

      report.push({
        sector: item.name,
        file: item.file,
        vpW: w,
        ...evalData,
        consoleErrorsCount: consoleErrors.length,
        failedReqsCount: failedReqs.length
      });

      await page.close();
    }
  }

  // 2. Desktop check (1280, 1440, 1920px) to verify zero desktop regression
  const desktopChecks = [];
  for (const dw of [1280, 1440, 1920]) {
    const dpage = await browser.newPage();
    await dpage.setViewport({ width: dw, height: 900 });
    const fileUrl = 'file://' + path.join(rootDir, 'cloud-kitchens-catering.html').replace(/\\/g, '/');
    await dpage.goto(fileUrl, { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 500));

    const dData = await dpage.evaluate(() => {
      const sec = document.querySelector('.clean-pillars-sec, .pillars-sec');
      const card = sec ? sec.querySelector('.pillar-row, .pillar-scroll-step') : null;
      const cs = card ? window.getComputedStyle(card) : null;
      return {
        cardDisplay: cs ? cs.display : 'none',
        cardGridCols: cs ? cs.gridTemplateColumns : 'none',
        cardFlexDir: cs ? cs.flexDirection : 'none'
      };
    });

    desktopChecks.push({ width: dw, ...dData });
    await dpage.close();
  }

  await browser.close();

  fs.writeFileSync(path.join(artifactsDir, 'step4_verification_report.json'), JSON.stringify({ report, desktopChecks }, null, 2));
  console.log('Verification Complete! Results written to test-artifacts/step4_verification_report.json');
}

runStep4Verification();

