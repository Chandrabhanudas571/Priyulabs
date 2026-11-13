const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const rootDir = path.resolve(__dirname, '..');

async function inspectPage(relPath) {
  const fullPath = path.join(rootDir, relPath);
  if (!fs.existsSync(fullPath)) {
    return { error: 'File does not exist: ' + relPath };
  }
  const rawHtml = fs.readFileSync(fullPath, 'utf8');

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    pipe: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--single-process']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });

  const networkRequests = [];
  page.on('response', resp => {
    networkRequests.push({
      url: resp.url(),
      status: resp.status()
    });
  });
  page.on('requestfailed', req => {
    networkRequests.push({
      url: req.url(),
      failed: true,
      failure: req.failure() ? req.failure().errorText : 'failed'
    });
  });

  const fileUrl = 'file://' + fullPath.replace(/\\/g, '/');
  await page.goto(fileUrl, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 800));

  // Check head links
  const headAnalysis = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]')).map(l => ({
      href: l.getAttribute('href'),
      fullHref: l.href
    }));
    const scripts = Array.from(document.querySelectorAll('script[src]')).map(s => ({
      src: s.getAttribute('src'),
      fullSrc: s.src
    }));
    return { links, scripts };
  });

  // Check pillar classes and elements
  const pillarMarkup = await page.evaluate(() => {
    const sec = document.querySelector('section[id*="pillar"], .pillars-sec, .clean-pillars-sec, section.pillars, section.solutions-pillars, section:has(.pillar-card), section:has(.pillar-row), section:has([class*="pillar"])');
    if (!sec) {
      // Find any element with pillar in class or id
      const anyPillar = Array.from(document.querySelectorAll('[class*="pillar"], [id*="pillar"]')).map(el => ({
        tag: el.tagName,
        id: el.id,
        class: el.className
      }));
      return { found: false, anyPillar: anyPillar.slice(0, 10) };
    }
    
    // Inspect children and cards
    const cards = Array.from(sec.querySelectorAll('.pillar-row, .pillar-card, .pillar-scroll-step, [class*="card"]'));
    return {
      found: true,
      secTag: sec.tagName,
      secId: sec.id,
      secClass: sec.className,
      cardsCount: cards.length,
      cardsSummary: cards.slice(0, 4).map(c => ({
        tag: c.tagName,
        class: c.className,
        children: Array.from(c.children).map(ch => ({ tag: ch.tagName, class: ch.className }))
      }))
    };
  });

  // Use CDP to inspect matched styles for container and card
  const client = await page.target().createCDPSession();
  await client.send('DOM.enable');
  await client.send('CSS.enable');

  const doc = await client.send('DOM.getDocument');
  
  // Find pillar container node
  let containerMatch = null;
  let cardMatch = null;

  try {
    const containerNode = await client.send('DOM.querySelector', {
      nodeId: doc.root.nodeId,
      selector: '.clean-pillars-sec .clean-container, .pillars-sec .pillars-container, .clean-container:has(.pillar-row), .pillars-container'
    });
    if (containerNode && containerNode.nodeId) {
      containerMatch = await client.send('CSS.getMatchedStylesForNode', { nodeId: containerNode.nodeId });
    }
  } catch (e) {
    containerMatch = { error: e.message };
  }

  try {
    const cardNode = await client.send('DOM.querySelector', {
      nodeId: doc.root.nodeId,
      selector: '.pillar-row, .pillar-card, .pillar-scroll-step'
    });
    if (cardNode && cardNode.nodeId) {
      cardMatch = await client.send('CSS.getMatchedStylesForNode', { nodeId: cardNode.nodeId });
    }
  } catch (e) {
    cardMatch = { error: e.message };
  }

  // Get computed styles on container and card
  const computed = await page.evaluate(() => {
    const sec = document.querySelector('section[id*="pillar"], .pillars-sec, .clean-pillars-sec, section.pillars, section.solutions-pillars');
    const container = sec ? (sec.querySelector('.clean-container, .pillars-container, .sticky-scroll-stage') || sec) : null;
    const card = sec ? sec.querySelector('.pillar-row, .pillar-card, .pillar-scroll-step') : null;

    const props = ['display', 'flex-direction', 'flex', 'width', 'min-width', 'height', 'min-height', 'overflow-x', 'scroll-snap-type', 'align-items', 'opacity', 'filter', 'background-color'];

    function getProps(el) {
      if (!el) return null;
      const cs = window.getComputedStyle(el);
      const res = {};
      props.forEach(p => res[p] = cs.getPropertyValue(p));
      return res;
    }

    return {
      containerComputed: getProps(container),
      cardComputed: getProps(card)
    };
  });

  await browser.close();

  return {
    relPath,
    headAnalysis,
    networkRequests,
    pillarMarkup,
    computed,
    containerRulesCount: containerMatch?.matchedCSSRules?.length || 0,
    cardRulesCount: cardMatch?.matchedCSSRules?.length || 0,
    cardMatchedRules: cardMatch?.matchedCSSRules ? cardMatch.matchedCSSRules.map(r => ({
      selector: r.rule.selectorList.text,
      cssText: r.rule.style.cssText,
      sourceURL: r.rule.parentStyleSheetId
    })) : []
  };
}

(async () => {
  console.log('=== Inspecting food-beverage/cloud-kitchens/index.html ===');
  const res1 = await inspectPage('food-beverage/cloud-kitchens/index.html');
  console.log(JSON.stringify(res1, null, 2));

  console.log('\n=== Inspecting cloud-kitchens.html ===');
  const res2 = await inspectPage('cloud-kitchens.html');
  console.log(JSON.stringify(res2, null, 2));

  console.log('\n=== Inspecting cloud-kitchens-catering.html ===');
  const res3 = await inspectPage('cloud-kitchens-catering.html');
  console.log(JSON.stringify(res3, null, 2));
})();

