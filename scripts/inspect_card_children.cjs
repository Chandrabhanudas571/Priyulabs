const puppeteer = require('puppeteer-core');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const rootDir = path.resolve(__dirname, '..');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    pipe: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--single-process']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto('file://' + path.join(rootDir, 'cloud-kitchens-catering.html').replace(/\\/g, '/'), { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 600));

  const details = await page.evaluate(() => {
    const card = document.querySelector('.pillar-row, .pillar-card');
    if (!card) return 'No card';

    const children = Array.from(card.children).map(c => {
      const cs = window.getComputedStyle(c);
      const r = c.getBoundingClientRect();
      return {
        tag: c.tagName,
        class: c.className,
        rect: { top: Math.round(r.top), height: Math.round(r.height), width: Math.round(r.width) },
        cs: {
          display: cs.display,
          opacity: cs.opacity,
          filter: cs.filter,
          bg: cs.backgroundColor,
          color: cs.color
        }
      };
    });

    const cardCS = window.getComputedStyle(card);
    const container = card.parentElement;
    const containerCS = window.getComputedStyle(container);
    const sec = container.closest('section');
    const secCS = sec ? window.getComputedStyle(sec) : null;

    // Check if card has an overlay or ::before / ::after
    const beforeCS = window.getComputedStyle(card, '::before');
    const afterCS = window.getComputedStyle(card, '::after');
    const secBeforeCS = sec ? window.getComputedStyle(sec, '::before') : null;
    const secAfterCS = sec ? window.getComputedStyle(sec, '::after') : null;

    return {
      cardClasses: card.className,
      cardBg: cardCS.backgroundColor,
      cardOpacity: cardCS.opacity,
      cardFilter: cardCS.filter,
      cardBackdropFilter: cardCS.backdropFilter,
      cardShadow: cardCS.boxShadow,
      cardBefore: beforeCS && beforeCS.content !== 'none' ? { content: beforeCS.content, bg: beforeCS.backgroundColor, opacity: beforeCS.opacity } : 'none',
      cardAfter: afterCS && afterCS.content !== 'none' ? { content: afterCS.content, bg: afterCS.backgroundColor, opacity: afterCS.opacity } : 'none',
      containerBg: containerCS.backgroundColor,
      secBg: secCS ? secCS.backgroundColor : 'none',
      secBefore: secBeforeCS && secBeforeCS.content !== 'none' ? { content: secBeforeCS.content, bg: secBeforeCS.backgroundColor, opacity: secBeforeCS.opacity } : 'none',
      secAfter: secAfterCS && secAfterCS.content !== 'none' ? { content: secAfterCS.content, bg: secAfterCS.backgroundColor, opacity: secAfterCS.opacity } : 'none',
      children
    };
  });

  console.log('Card and Children Details:');
  console.log(JSON.stringify(details, null, 2));

  // Let's also check what elements exist between left 0-20 and right 370-390
  const edges = await page.evaluate(() => {
    const card = document.querySelector('.pillar-row, .pillar-card');
    const cr = card ? card.getBoundingClientRect() : null;
    return {
      cardRect: cr ? { left: Math.round(cr.left), right: Math.round(cr.right), width: Math.round(cr.width) } : null,
      containerRect: card && card.parentElement ? {
        left: Math.round(card.parentElement.getBoundingClientRect().left),
        right: Math.round(card.parentElement.getBoundingClientRect().right),
        width: Math.round(card.parentElement.getBoundingClientRect().width)
      } : null,
      sectionRect: card && card.closest('section') ? {
        left: Math.round(card.closest('section').getBoundingClientRect().left),
        right: Math.round(card.closest('section').getBoundingClientRect().right),
        width: Math.round(card.closest('section').getBoundingClientRect().width)
      } : null
    };
  });
  console.log('Edges and Rects:', edges);

  await browser.close();
})();

