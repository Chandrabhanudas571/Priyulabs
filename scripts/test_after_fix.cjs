const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const rootDir = path.resolve(__dirname, '..');

const testPages = [
  'food-beverage/cloud-kitchens/index.html',
  'cloud-kitchens.html',
  'cloud-kitchens-catering.html',
  'grocery-supermarkets-kirana.html',
  'retail/grocery/index.html',
  'cafes-chai-bars.html',
  'restaurants-fine-dining.html'
];

async function verifyPages() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    pipe: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--single-process']
  });

  const results = [];

  for (const rel of testPages) {
    const full = path.join(rootDir, rel);
    if (!fs.existsSync(full)) {
      results.push({ page: rel, error: 'Not found' });
      continue;
    }

    for (const w of [360, 390, 430]) {
      const page = await browser.newPage();
      await page.setViewport({ width: w, height: 844, isMobile: true, hasTouch: true });

      const fileUrl = 'file://' + full.replace(/\\/g, '/');
      await page.goto(fileUrl, { waitUntil: 'domcontentloaded' });
      await new Promise(r => setTimeout(r, 600));

      const res = await page.evaluate((vpW) => {
        const docScrollW = document.documentElement.scrollWidth;
        const bodyScrollW = document.body ? document.body.scrollWidth : 0;
        const innerW = window.innerWidth;

        // Check cards
        const sec = document.querySelector('.clean-pillars-sec, .pillars-sec, #pillars');
        const cards = sec ? Array.from(sec.querySelectorAll('.pillar-row, .pillar-scroll-step, .pillar-card')) : [];
        const cardWidths = cards.map(c => Math.round(c.getBoundingClientRect().width));
        const cardHeights = cards.map(c => Math.round(c.getBoundingClientRect().height));

        // Overflow elements
        const overflowing = Array.from(document.querySelectorAll('*'))
          .map(el => {
            const r = el.getBoundingClientRect();
            return {
              tag: el.tagName,
              class: el.className,
              overflowRight: Math.round(r.right - window.innerWidth)
            };
          })
          .filter(x => x.overflowRight > 1)
          .sort((a, b) => b.overflowRight - a.overflowRight);

        // Section background
        const secBg = sec ? window.getComputedStyle(sec).backgroundColor : null;

        // Overlay above card 0
        let overlayCount = 0;
        if (cards.length > 0) {
          cards[0].scrollIntoView({ block: 'center' });
          const r = cards[0].getBoundingClientRect();
          const cx = Math.min(Math.max(r.left + r.width / 2, 5), window.innerWidth - 5);
          const cy = Math.min(Math.max(r.top + r.height / 2, 5), window.innerHeight - 5);
          const els = document.elementsFromPoint ? document.elementsFromPoint(cx, cy) : [document.elementFromPoint(cx, cy)];
          overlayCount = els.filter(el => {
            const cs = window.getComputedStyle(el);
            return (cs.position === 'fixed' || cs.position === 'absolute') && cs.zIndex > 10;
          }).length;
        }

        return {
          vpW,
          docScrollW,
          innerW,
          overflowPx: docScrollW - innerW,
          overflowingCount: overflowing.length,
          topOverflow: overflowing[0] || null,
          cardsCount: cards.length,
          maxCardWidth: cardWidths.length ? Math.max(...cardWidths) : 0,
          maxCardHeight: cardHeights.length ? Math.max(...cardHeights) : 0,
          secBg,
          overlayCount
        };
      }, w);

      results.push({ page: rel, ...res });
      await page.close();
    }
  }

  await browser.close();
  console.table(results);
}

verifyPages();

