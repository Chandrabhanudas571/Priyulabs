const puppeteer = require('puppeteer-core');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const rootDir = path.resolve(__dirname, '..');

async function testPillarAndGreyLayer(fileRelPath, width) {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    pipe: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--single-process']
  });

  const page = await browser.newPage();
  await page.setViewport({ width, height: 800, isMobile: true, hasTouch: true });

  const fileUrl = 'file://' + path.join(rootDir, fileRelPath).replace(/\\/g, '/');
  await page.goto(fileUrl, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 600));

  const result = await page.evaluate((vpW) => {
    // 1. Pillar Container & Cards
    const pillarSec = document.querySelector('.clean-pillars-sec, .pillars-sec, section#pillars');
    const container = pillarSec ? pillarSec.querySelector('.clean-container, .pillars-container, .sticky-scroll-stage') : null;
    const cards = pillarSec ? Array.from(pillarSec.querySelectorAll('.pillar-row, .pillar-scroll-step, .pillar-card')) : [];

    const secCS = pillarSec ? window.getComputedStyle(pillarSec) : null;
    const contCS = container ? window.getComputedStyle(container) : null;

    const cardsInfo = cards.map((card, idx) => {
      const r = card.getBoundingClientRect();
      const cs = window.getComputedStyle(card);
      
      // Card center coordinates for elementFromPoint
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const elAtCenter = (cx >= 0 && cx <= window.innerWidth && cy >= 0 && cy <= window.innerHeight)
        ? document.elementFromPoint(cx, cy)
        : null;

      // Also test a point in viewport: if cy is offscreen, scroll to card first
      return {
        idx,
        tag: card.tagName,
        class: card.className,
        rect: {
          left: Math.round(r.left),
          right: Math.round(r.right),
          top: Math.round(r.top),
          width: Math.round(r.width),
          height: Math.round(r.height)
        },
        cs: {
          display: cs.display,
          flex: cs.flex,
          minWidth: cs.minWidth,
          maxWidth: cs.maxWidth,
          width: cs.width,
          height: cs.height,
          minHeight: cs.minHeight,
          alignSelf: cs.alignSelf,
          padding: `${cs.paddingTop} ${cs.paddingRight} ${cs.paddingBottom} ${cs.paddingLeft}`,
          opacity: cs.opacity,
          filter: cs.filter,
          backdropFilter: cs.backdropFilter,
          backgroundColor: cs.backgroundColor
        }
      };
    });

    // 2. ElementFromPoint test when scrolled to the first card
    let elementsAboveCard = [];
    let card1Parents = [];
    if (cards.length > 0) {
      cards[0].scrollIntoView({ block: 'center' });
      const r = cards[0].getBoundingClientRect();
      const cx = Math.min(Math.max(r.left + r.width / 2, 10), window.innerWidth - 10);
      const cy = Math.min(Math.max(r.top + r.height / 2, 10), window.innerHeight - 10);

      // Check all elements under that point
      // document.elementsFromPoint returns list of elements from top-most to bottom
      const elementsAtPoint = document.elementsFromPoint ? document.elementsFromPoint(cx, cy) : [document.elementFromPoint(cx, cy)];
      elementsAboveCard = Array.from(elementsAtPoint || []).map(el => {
        if (!el) return null;
        const cs = window.getComputedStyle(el);
        return {
          tag: el.tagName,
          id: el.id,
          class: el.className,
          position: cs.position,
          zIndex: cs.zIndex,
          opacity: cs.opacity,
          filter: cs.filter,
          backdropFilter: cs.backdropFilter,
          backgroundColor: cs.backgroundColor,
          pointerEvents: cs.pointerEvents,
          rect: {
            left: Math.round(el.getBoundingClientRect().left),
            right: Math.round(el.getBoundingClientRect().right),
            width: Math.round(el.getBoundingClientRect().width),
            height: Math.round(el.getBoundingClientRect().height)
          }
        };
      });

      // Walk up parents of card[0] to check opacity, filter, background
      let curr = cards[0];
      while (curr && curr !== document.documentElement) {
        const cs = window.getComputedStyle(curr);
        card1Parents.push({
          tag: curr.tagName,
          id: curr.id,
          class: curr.className,
          opacity: cs.opacity,
          filter: cs.filter,
          backdropFilter: cs.backdropFilter,
          backgroundColor: cs.backgroundColor
        });
        curr = curr.parentElement;
      }
    }

    // 3. Dark Brown Strips at Left/Right Edges
    // Check html and body styles
    const htmlCS = window.getComputedStyle(document.documentElement);
    const bodyCS = window.getComputedStyle(document.body);
    const htmlRect = document.documentElement.getBoundingClientRect();
    const bodyRect = document.body ? document.body.getBoundingClientRect() : null;

    // Check edge backgrounds (e.g. at x=2, y=400 and x=window.innerWidth-2, y=400)
    const leftEl = document.elementFromPoint(2, 400);
    const rightEl = document.elementFromPoint(window.innerWidth - 2, 400);

    return {
      pillarContainer: {
        selector: container ? (container.className || container.tagName) : 'None',
        display: contCS ? contCS.display : 'none',
        flexDirection: contCS ? contCS.flexDirection : 'none',
        flexWrap: contCS ? contCS.flexWrap : 'none',
        overflowX: contCS ? contCS.overflowX : 'none',
        scrollSnapType: contCS ? contCS.scrollSnapType : 'none',
        alignItems: contCS ? contCS.alignItems : 'none',
        width: contCS ? contCS.width : 'none',
        maxWidth: contCS ? contCS.maxWidth : 'none',
        padding: contCS ? `${contCS.paddingTop} ${contCS.paddingRight} ${contCS.paddingBottom} ${contCS.paddingLeft}` : 'none'
      },
      cardsCount: cards.length,
      cards: cardsInfo,
      elementsAboveCard,
      card1Parents: card1Parents.slice(0, 6),
      edgeInfo: {
        htmlBg: htmlCS.backgroundColor,
        bodyBg: bodyCS.backgroundColor,
        bodyMargin: `${bodyCS.marginTop} ${bodyCS.marginRight} ${bodyCS.marginBottom} ${bodyCS.marginLeft}`,
        bodyPadding: `${bodyCS.paddingTop} ${bodyCS.paddingRight} ${bodyCS.paddingBottom} ${bodyCS.paddingLeft}`,
        bodyWidth: bodyRect ? bodyRect.width : 0,
        bodyLeft: bodyRect ? bodyRect.left : 0,
        leftEl: leftEl ? `${leftEl.tagName}.${leftEl.className}` : 'null',
        rightEl: rightEl ? `${rightEl.tagName}.${rightEl.className}` : 'null'
      }
    };
  }, width);

  await browser.close();
  return result;
}

(async () => {
  console.log('--- Diagnosing Cloud Kitchens (390px) ---');
  const ck390 = await testPillarAndGreyLayer('cloud-kitchens-catering.html', 390);
  console.log('Cloud Kitchens Result:', JSON.stringify(ck390, null, 2));

  console.log('\n--- Diagnosing Cafes & Chai Bars (390px) ---');
  const cafe390 = await testPillarAndGreyLayer('cafes-chai-bars.html', 390);
  console.log('Cafes Result:', JSON.stringify(cafe390, null, 2));
})();
