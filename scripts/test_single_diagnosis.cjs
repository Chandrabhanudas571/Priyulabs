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
  const width = 360;
  await page.setViewport({ width, height: 800, isMobile: true, hasTouch: true });

  const fileUrl = 'file://' + path.join(rootDir, 'restaurants-fine-dining.html').replace(/\\/g, '/');
  await page.goto(fileUrl, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 600));

  const diagnosis = await page.evaluate((vpWidth) => {
    // 1. Natural scrollWidth by temporarily disabling overflow-x: hidden on html/body
    const origHtmlOverflow = document.documentElement.style.overflowX;
    const origBodyOverflow = document.body.style.overflowX;
    document.documentElement.style.setProperty('overflow-x', 'visible', 'important');
    document.body.style.setProperty('overflow-x', 'visible', 'important');
    
    const naturalScrollWidth = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
    
    // Restore
    document.documentElement.style.overflowX = origHtmlOverflow;
    document.body.style.overflowX = origBodyOverflow;

    const innerWidth = window.innerWidth;
    const overflowPx = Math.max(0, naturalScrollWidth - innerWidth);

    // 2. Find all overflowing elements
    const culprits = [];
    const allEls = document.querySelectorAll('*');
    allEls.forEach(el => {
      // Ignore scripts, styles, meta, etc.
      if (['SCRIPT', 'STYLE', 'META', 'LINK', 'HEAD', 'TITLE', 'NOSCRIPT'].includes(el.tagName)) return;
      const rect = el.getBoundingClientRect();
      const cs = window.getComputedStyle(el);
      if (cs.display === 'none' || cs.visibility === 'hidden' && rect.width === 0) return;

      const isRightOverflow = rect.right > innerWidth + 1;
      const isLeftOverflow = rect.left < -1;

      if (isRightOverflow || isLeftOverflow) {
        // Build readable selector
        let sel = el.tagName.toLowerCase();
        if (el.id) sel += '#' + el.id;
        if (el.className && typeof el.className === 'string') {
          const classes = el.className.trim().split(/\s+/).filter(c => c && !c.startsWith('is-') && !c.startsWith('has-')).slice(0, 3);
          if (classes.length) sel += '.' + classes.join('.');
        }

        culprits.push({
          selector: sel,
          tag: el.tagName,
          rect: {
            left: Math.round(rect.left),
            right: Math.round(rect.right),
            width: Math.round(rect.width),
            height: Math.round(rect.height)
          },
          overflowAmount: isRightOverflow ? Math.round(rect.right - innerWidth) : Math.round(-rect.left),
          computedWidth: cs.width,
          maxWidth: cs.maxWidth,
          minWidth: cs.minWidth,
          position: cs.position,
          margin: `${cs.marginTop} ${cs.marginRight} ${cs.marginBottom} ${cs.marginLeft}`,
          padding: `${cs.paddingTop} ${cs.paddingRight} ${cs.paddingBottom} ${cs.paddingLeft}`,
          transform: cs.transform !== 'none' ? cs.transform : undefined
        });
      }
    });

    // Sort culprits by overflow amount descending
    culprits.sort((a, b) => b.overflowAmount - a.overflowAmount);

    // 3. Find blank gaps / unusually tall sections
    const blankGaps = [];
    const sections = document.querySelectorAll('section, header, footer, .clean-hero-sec, .clean-pillars-sec, .clean-features-sec, .clean-grid-sec, .clean-metrics-sec, .clean-cta-sec, .deal-matrix-sec, .triptych-sec, main > div');
    sections.forEach(sec => {
      const rect = sec.getBoundingClientRect();
      const cs = window.getComputedStyle(sec);
      if (rect.height <= 0 || cs.display === 'none') return;

      // Check min-height
      const minH = cs.minHeight;
      const pt = parseFloat(cs.paddingTop) || 0;
      const pb = parseFloat(cs.paddingBottom) || 0;
      const mt = parseFloat(cs.marginTop) || 0;
      const mb = parseFloat(cs.marginBottom) || 0;

      // Find children bounding box
      let maxChildBottom = 0;
      let minChildTop = Infinity;
      const children = Array.from(sec.children).filter(c => {
        const ccs = window.getComputedStyle(c);
        return ccs.display !== 'none' && ccs.position !== 'absolute' && ccs.position !== 'fixed';
      });

      children.forEach(c => {
        const crect = c.getBoundingClientRect();
        if (crect.bottom > maxChildBottom) maxChildBottom = crect.bottom;
        if (crect.top < minChildTop) minChildTop = crect.top;
      });

      const contentHeight = children.length > 0 ? (maxChildBottom - minChildTop) : 0;
      const excessHeight = Math.round(rect.height - contentHeight);

      // Check stuck elements (opacity: 0 or visibility: hidden)
      const stuckEls = Array.from(sec.querySelectorAll('.pos-reveal, .reveal, [data-reveal], [data-animate], .clean-anim')).filter(el => {
        const elCs = window.getComputedStyle(el);
        return elCs.opacity === '0' || elCs.visibility === 'hidden';
      }).map(el => el.className);

      let sel = sec.tagName.toLowerCase();
      if (sec.id) sel += '#' + sec.id;
      if (sec.className && typeof sec.className === 'string') {
        sel += '.' + sec.className.trim().split(/\s+/).slice(0, 2).join('.');
      }

      blankGaps.push({
        selector: sel,
        sectionHeight: Math.round(rect.height),
        contentHeight: Math.round(contentHeight),
        excessHeight,
        paddingTop: Math.round(pt),
        paddingBottom: Math.round(pb),
        minHeight: minH,
        stuckElementsCount: stuckEls.length,
        stuckClasses: stuckEls.slice(0, 3)
      });
    });

    blankGaps.sort((a, b) => b.excessHeight - a.excessHeight);

    return {
      naturalScrollWidth,
      innerWidth,
      overflowPx,
      topCulprits: culprits.slice(0, 10),
      topGaps: blankGaps.slice(0, 5)
    };
  }, width);

  console.log(JSON.stringify(diagnosis, null, 2));
  await browser.close();
})();

