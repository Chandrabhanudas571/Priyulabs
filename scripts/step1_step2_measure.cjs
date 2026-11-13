const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const rootDir = path.resolve(__dirname, '..');

async function measurePage(relPath) {
  const fullPath = path.join(rootDir, relPath);
  if (!fs.existsSync(fullPath)) return { error: 'File not found: ' + relPath };

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    pipe: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--single-process']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });

  const networkLog = [];
  page.on('response', r => {
    networkLog.push({ url: r.url(), status: r.status() });
  });
  page.on('requestfailed', r => {
    networkLog.push({ url: r.url(), status: 'FAILED: ' + (r.failure()?.errorText || '') });
  });

  const fileUrl = 'file://' + fullPath.replace(/\\/g, '/');
  await page.goto(fileUrl, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 600));

  // Step 1: Head links & Cache busting & Service worker
  const headData = await page.evaluate(() => {
    const cssLinks = Array.from(document.querySelectorAll('link[rel="stylesheet"]')).map(l => ({
      href: l.getAttribute('href'),
      resolvedHref: l.href
    }));
    const scriptTags = Array.from(document.querySelectorAll('script')).map(s => ({
      src: s.getAttribute('src'),
      resolvedSrc: s.src
    }));
    const hasServiceWorker = 'serviceWorker' in navigator && !!navigator.serviceWorker.controller;
    return { cssLinks, scriptTags, hasServiceWorker };
  });

  // CDP Matched styles
  const client = await page.target().createCDPSession();
  await client.send('DOM.enable');
  await client.send('CSS.enable');
  const doc = await client.send('DOM.getDocument');

  let containerMatched = null;
  let cardMatched = null;

  try {
    const cNode = await client.send('DOM.querySelector', {
      nodeId: doc.root.nodeId,
      selector: '.clean-pillars-sec .clean-container, .pillars-sec .pillars-container, .clean-container, .pillars-container'
    });
    if (cNode && cNode.nodeId) {
      containerMatched = await client.send('CSS.getMatchedStylesForNode', { nodeId: cNode.nodeId });
    }
  } catch (e) {
    containerMatched = { error: e.message };
  }

  try {
    const cardNode = await client.send('DOM.querySelector', {
      nodeId: doc.root.nodeId,
      selector: '.pillar-row, .pillar-scroll-step, .pillar-card'
    });
    if (cardNode && cardNode.nodeId) {
      cardMatched = await client.send('CSS.getMatchedStylesForNode', { nodeId: cardNode.nodeId });
    }
  } catch (e) {
    cardMatched = { error: e.message };
  }

  // Step 1: Computed styles + Step 2: Measurements (Overflow, Grey layer, Blank space)
  const measurements = await page.evaluate(() => {
    const innerW = window.innerWidth;
    const scrollW = document.documentElement.scrollWidth;

    // A. Overflow elements (right > innerWidth + 1 or left < -1)
    const allElements = Array.from(document.querySelectorAll('*'));
    const overflowing = allElements.map(el => {
      const r = el.getBoundingClientRect();
      const cs = window.getComputedStyle(el);
      return {
        tag: el.tagName,
        id: el.id,
        class: el.className,
        rect: { left: Math.round(r.left), right: Math.round(r.right), width: Math.round(r.width) },
        position: cs.position,
        widthCSS: cs.width,
        minWidthCSS: cs.minWidth,
        maxWidthCSS: cs.maxWidth
      };
    }).filter(x => x.rect.right > innerW + 1 || x.rect.left < -1);

    // B. Pillar Container & Card Computed Styles
    const sec = document.querySelector('.clean-pillars-sec, .pillars-sec, section#pillars');
    const container = sec ? (sec.querySelector('.clean-container, .pillars-container, .sticky-scroll-stage') || sec) : null;
    const cards = sec ? Array.from(sec.querySelectorAll('.pillar-row, .pillar-scroll-step, .pillar-card')) : [];

    const propsList = ['display', 'flex-direction', 'flex', 'width', 'min-width', 'height', 'min-height', 'overflow-x', 'scroll-snap-type', 'align-items', 'opacity', 'filter', 'background-color'];
    function getProps(el) {
      if (!el) return null;
      const cs = window.getComputedStyle(el);
      const res = {};
      propsList.forEach(p => res[p] = cs.getPropertyValue(p));
      return res;
    }

    // C. Grey Layer: elementsFromPoint at the center of the first pillar card
    let elementsAboveCard = [];
    let card0Rect = null;
    if (cards.length > 0) {
      cards[0].scrollIntoView({ block: 'center' });
      const r = cards[0].getBoundingClientRect();
      card0Rect = { left: Math.round(r.left), right: Math.round(r.right), top: Math.round(r.top), bottom: Math.round(r.bottom), width: Math.round(r.width), height: Math.round(r.height) };
      const cx = Math.min(Math.max(r.left + r.width / 2, 5), innerW - 5);
      const cy = Math.min(Math.max(r.top + r.height / 2, 5), window.innerHeight - 5);

      const elsAtPoint = document.elementsFromPoint ? document.elementsFromPoint(cx, cy) : [document.elementFromPoint(cx, cy)];
      elementsAboveCard = Array.from(elsAtPoint).map(el => {
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
          pointerEvents: cs.pointerEvents,
          background: cs.backgroundColor
        };
      });
    }

    // D. Blank Space: elements taller than 400px that hold little content
    const tallElements = allElements.map(el => {
      const h = el.offsetHeight;
      const scrollH = el.scrollHeight;
      const cs = window.getComputedStyle(el);
      const textLength = el.innerText ? el.innerText.trim().length : 0;
      return {
        tag: el.tagName,
        id: el.id,
        class: el.className,
        height: h,
        minHeight: cs.minHeight,
        aspectRatio: cs.aspectRatio,
        paddingBottom: cs.paddingBottom,
        display: cs.display,
        alignItems: cs.alignItems,
        textLength
      };
    }).filter(x => x.height > 400 && x.textLength < 100);

    // E. Real pillar markup classes
    const markupClasses = sec ? {
      secTag: sec.tagName,
      secId: sec.id,
      secClass: sec.className,
      containerClass: container ? container.className : 'null',
      cardsCount: cards.length,
      sampleCardClasses: cards.slice(0, 3).map(c => ({
        class: c.className,
        childrenClasses: Array.from(c.children).map(ch => ch.className)
      }))
    } : null;

    return {
      innerW,
      scrollW,
      overflowPx: scrollW - innerW,
      overflowingCount: overflowing.length,
      topOverflowing: overflowing.slice(0, 5),
      containerProps: getProps(container),
      card0Props: getProps(cards[0]),
      card0Rect,
      markupClasses,
      elementsAboveCard,
      tallElements: tallElements.slice(0, 5)
    };
  });

  await browser.close();

  return {
    relPath,
    headData,
    networkLog,
    containerMatchedRules: containerMatched?.matchedCSSRules ? containerMatched.matchedCSSRules.map(r => ({
      selector: r.rule.selectorList.text,
      cssText: (r.rule.style.cssText || (r.rule.style.cssProperties ? r.rule.style.cssProperties.map(p => `${p.name}:${p.value}`).join(';') : '')).replace(/\s+/g, ' ').slice(0, 150),
      origin: r.rule.origin
    })) : [],
    cardMatchedRules: cardMatched?.matchedCSSRules ? cardMatched.matchedCSSRules.map(r => ({
      selector: r.rule.selectorList.text,
      cssText: (r.rule.style.cssText || (r.rule.style.cssProperties ? r.rule.style.cssProperties.map(p => `${p.name}:${p.value}`).join(';') : '')).replace(/\s+/g, ' ').slice(0, 150),
      origin: r.rule.origin
    })) : [],
    measurements
  };
}

(async () => {
  const p1 = await measurePage('food-beverage/cloud-kitchens/index.html');
  const p2 = await measurePage('cloud-kitchens.html');
  const p3 = await measurePage('cloud-kitchens-catering.html');
  const p4 = await measurePage('grocery-supermarkets-kirana.html');

  fs.writeFileSync('test-artifacts/step1_step2_results.json', JSON.stringify({ p1, p2, p3, p4 }, null, 2));
  console.log('Saved to test-artifacts/step1_step2_results.json');
})();
