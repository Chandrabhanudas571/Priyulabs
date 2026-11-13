const puppeteer = require('puppeteer-core');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const rootDir = path.resolve(__dirname, '..');

async function testPage(fileRel) {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    pipe: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--single-process']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, isMobile: true });
  await page.goto('file://' + path.join(rootDir, fileRel).replace(/\\/g, '/'), { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 600));

  const data = await page.evaluate(() => {
    const sec = document.querySelector('.pillars-sec, .clean-pillars-sec');
    const container = sec ? sec.querySelector('.pillars-container, .clean-container') : null;
    const cards = sec ? Array.from(sec.querySelectorAll('.pillar-scroll-step, .pillar-row, .pillar-card')) : [];
    const mediaCard = sec ? sec.querySelector('.sticky-media-card, .pillar-visual-card') : null;
    const navTabs = sec ? sec.querySelector('.sticky-nav-tabs') : null;

    // Check overflow elements
    const overflowing = Array.from(document.querySelectorAll('*'))
      .map(el => {
        const r = el.getBoundingClientRect();
        return {
          tag: el.tagName,
          id: el.id,
          class: el.className,
          left: Math.round(r.left),
          right: Math.round(r.right),
          width: Math.round(r.width),
          cssWidth: window.getComputedStyle(el).width,
          overflowRight: Math.round(r.right - window.innerWidth)
        };
      })
      .filter(x => x.overflowRight > 1 || x.left < -1)
      .sort((a, b) => b.overflowRight - a.overflowRight);

    // Check elements at center of first pillar step
    let overlayAtCardCenter = [];
    if (cards.length > 0) {
      cards[0].scrollIntoView({ block: 'center' });
      const r = cards[0].getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      if (cx >= 0 && cx <= window.innerWidth && cy >= 0 && cy <= window.innerHeight) {
        const els = document.elementsFromPoint ? document.elementsFromPoint(cx, cy) : [document.elementFromPoint(cx, cy)];
        overlayAtCardCenter = Array.from(els).map(el => {
          const cs = window.getComputedStyle(el);
          return {
            tag: el.tagName,
            class: el.className,
            bg: cs.backgroundColor,
            opacity: cs.opacity,
            zIndex: cs.zIndex,
            filter: cs.filter,
            backdropFilter: cs.backdropFilter,
            pointerEvents: cs.pointerEvents
          };
        });
      }
    }

    return {
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
      overflowPx: document.documentElement.scrollWidth - window.innerWidth,
      topOverflowing: overflowing.slice(0, 8),
      secInfo: sec ? {
        class: sec.className,
        bg: window.getComputedStyle(sec).backgroundColor,
        height: sec.offsetHeight
      } : null,
      containerInfo: container ? {
        class: container.className,
        display: window.getComputedStyle(container).display,
        flexDir: window.getComputedStyle(container).flexDirection,
        overflowX: window.getComputedStyle(container).overflowX,
        width: container.offsetWidth,
        height: container.offsetHeight
      } : null,
      cardsCount: cards.length,
      cardsSummary: cards.map((c, i) => {
        const r = c.getBoundingClientRect();
        const cs = window.getComputedStyle(c);
        return {
          idx: i,
          tag: c.tagName,
          class: c.className,
          w: Math.round(r.width),
          h: Math.round(r.height),
          left: Math.round(r.left),
          right: Math.round(r.right),
          display: cs.display,
          flex: cs.flex,
          minHeight: cs.minHeight,
          contentHeight: c.scrollHeight,
          excessBlank: c.offsetHeight - c.scrollHeight
        };
      }),
      mediaCardInfo: mediaCard ? {
        class: mediaCard.className,
        display: window.getComputedStyle(mediaCard).display,
        position: window.getComputedStyle(mediaCard).position,
        w: mediaCard.offsetWidth,
        h: mediaCard.offsetHeight
      } : null,
      navTabsInfo: navTabs ? {
        class: navTabs.className,
        display: window.getComputedStyle(navTabs).display,
        w: navTabs.offsetWidth,
        h: navTabs.offsetHeight
      } : null,
      overlayAtCardCenter
    };
  });

  await browser.close();
  return data;
}

(async () => {
  console.log('=== grocery-supermarkets-kirana.html ===');
  console.log(JSON.stringify(await testPage('grocery-supermarkets-kirana.html'), null, 2));

  console.log('=== retail/grocery/index.html ===');
  console.log(JSON.stringify(await testPage('retail/grocery/index.html'), null, 2));
})();

