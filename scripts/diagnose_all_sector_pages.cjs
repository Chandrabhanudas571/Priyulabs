const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const rootDir = path.resolve(__dirname, '..');

const sectorPages = [
  // Directory (2)
  { id: 'all-business-types', name: 'All Business Types', file: 'all-business-types.html', cat: 'Directory' },
  { id: 'business-types', name: 'Business Types Directory', file: 'business-types.html', cat: 'Directory' },

  // Food & Beverage (6)
  { id: 'restaurants-fine-dining', name: 'Restaurants & Fine Dining', file: 'restaurants-fine-dining.html', cat: 'Food & Beverage' },
  { id: 'qsr-fast-food', name: 'QSR, Fast Food & Takeaway', file: 'qsr-fast-food.html', cat: 'Food & Beverage' },
  { id: 'cafes-chai-bars', name: 'Cafes & Chai Bars', file: 'cafes-chai-bars.html', cat: 'Food & Beverage' },
  { id: 'cloud-kitchens-catering', name: 'Cloud Kitchens & Catering', file: 'cloud-kitchens-catering.html', cat: 'Food & Beverage' },
  { id: 'bakeries-shops', name: 'Bakeries & Patisseries', file: 'bakeries-shops.html', cat: 'Food & Beverage' },
  { id: 'bars-pubs-breweries', name: 'Bars, Pubs & Breweries', file: 'bars-pubs-breweries.html', cat: 'Food & Beverage' },

  // Retail (6)
  { id: 'grocery-supermarkets-kirana', name: 'Grocery & Supermarkets', file: 'grocery-supermarkets-kirana.html', cat: 'Retail' },
  { id: 'electronics-mobile-shops', name: 'Electronics & Mobile', file: 'electronics-mobile-shops.html', cat: 'Retail' },
  { id: 'footwear-leather-stores', name: 'Footwear & Leather', file: 'footwear-leather-stores.html', cat: 'Retail' },
  { id: 'jewellery-shops', name: 'Jewellery Showrooms', file: 'jewellery-shops.html', cat: 'Retail' },
  { id: 'watch-stores', name: 'Watch Stores & Horology', file: 'watch-stores.html', cat: 'Retail' },
  { id: 'bookstores-stationery', name: 'Bookstores & Stationery', file: 'bookstores-stationery.html', cat: 'Retail' },

  // Beauty & Fashion (3)
  { id: 'apparel-boutiques', name: 'Apparel Boutiques', file: 'beauty-fashion/apparel/index.html', altFile: 'apparel-boutiques.html', cat: 'Beauty & Fashion' },
  { id: 'salons-spas', name: 'Salons & Spas', file: 'beauty-fashion/salons/index.html', altFile: 'salons-spas.html', cat: 'Beauty & Fashion' },
  { id: 'cosmetics-skincare', name: 'Cosmetics & Skincare', file: 'beauty-fashion/cosmetics/index.html', altFile: 'cosmetics-skincare.html', cat: 'Beauty & Fashion' },

  // Services (2)
  { id: 'gyms', name: 'Gyms & Fitness', file: 'services/gyms/index.html', altFile: 'gyms.html', cat: 'Services' },
  { id: 'dry-cleaners', name: 'Dry Cleaners & Laundry', file: 'services/dry-cleaners/index.html', altFile: 'dry-cleaners.html', cat: 'Services' }
];

async function diagnosePage(browser, item, width) {
  const page = await browser.newPage();
  await page.setViewport({ width, height: 800, isMobile: true, hasTouch: true });

  const targetFile = fs.existsSync(path.join(rootDir, item.file)) ? item.file : item.altFile;
  const fileUrl = 'file://' + path.join(rootDir, targetFile).replace(/\\/g, '/');

  await page.goto(fileUrl, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 400));

  const diag = await page.evaluate((vpWidth) => {
    const innerW = window.innerWidth;
    const bodyScrollW = document.body ? document.body.scrollWidth : 0;
    const docScrollW = document.documentElement.scrollWidth;
    
    // Check natural unconstrained scrollWidth (temporarily remove overflow-x: hidden on html/body)
    const prevHtmlOv = document.documentElement.style.overflowX;
    const prevBodyOv = document.body.style.overflowX;
    document.documentElement.style.setProperty('overflow-x', 'visible', 'important');
    document.body.style.setProperty('overflow-x', 'visible', 'important');
    const naturalScrollW = Math.max(document.body.scrollWidth, document.documentElement.scrollWidth);
    document.documentElement.style.overflowX = prevHtmlOv;
    document.body.style.overflowX = prevBodyOv;

    const currentScrollW = Math.max(bodyScrollW, docScrollW);
    const overflowPx = Math.max(0, naturalScrollW - innerW);

    // Culprit elements
    const culprits = [];
    const all = document.querySelectorAll('*');
    all.forEach(el => {
      if (['SCRIPT', 'STYLE', 'META', 'LINK', 'HEAD', 'TITLE', 'NOSCRIPT'].includes(el.tagName)) return;
      const r = el.getBoundingClientRect();
      const cs = window.getComputedStyle(el);
      if (cs.display === 'none') return;

      const isRightOverflow = r.right > innerW + 1.5;
      const isLeftOverflow = r.left < -1.5;

      if (isRightOverflow || isLeftOverflow) {
        let sel = el.tagName.toLowerCase();
        if (el.id) sel += '#' + el.id;
        if (el.className && typeof el.className === 'string') {
          const cls = el.className.trim().split(/\s+/).filter(c => c && !c.startsWith('is-') && !c.startsWith('has-')).slice(0, 2);
          if (cls.length) sel += '.' + cls.join('.');
        }

        const overflowAmt = isRightOverflow ? Math.round(r.right - innerW) : Math.round(-r.left);

        // Find CSS rule setting width or min-width
        culprits.push({
          selector: sel,
          tag: el.tagName,
          rect: {
            left: Math.round(r.left),
            right: Math.round(r.right),
            width: Math.round(r.width)
          },
          overflowAmt,
          computedWidth: cs.width,
          minWidth: cs.minWidth,
          maxWidth: cs.maxWidth,
          position: cs.position,
          margin: `${cs.marginTop} ${cs.marginRight} ${cs.marginBottom} ${cs.marginLeft}`,
          padding: `${cs.paddingTop} ${cs.paddingRight} ${cs.paddingBottom} ${cs.paddingLeft}`,
          transform: cs.transform !== 'none' ? cs.transform : 'none'
        });
      }
    });

    culprits.sort((a, b) => b.overflowAmt - a.overflowAmt);

    // Blank space analysis across all sections
    const blankGaps = [];
    const sections = document.querySelectorAll('section, header, footer, .clean-hero-sec, .clean-pillars-sec, .clean-features-sec, .clean-grid-sec, .clean-metrics-sec, .clean-cta-sec, .deal-matrix-sec, .triptych-sec, .bottom-cta-sec');
    sections.forEach(sec => {
      const r = sec.getBoundingClientRect();
      const cs = window.getComputedStyle(sec);
      if (r.height <= 0 || cs.display === 'none') return;

      const pt = parseFloat(cs.paddingTop) || 0;
      const pb = parseFloat(cs.paddingBottom) || 0;
      const minH = cs.minHeight;

      // Children bounds
      let minTop = Infinity;
      let maxBottom = 0;
      const children = Array.from(sec.children).filter(c => {
        const ccs = window.getComputedStyle(c);
        return ccs.display !== 'none' && ccs.position !== 'absolute' && ccs.position !== 'fixed';
      });

      children.forEach(c => {
        const cr = c.getBoundingClientRect();
        if (cr.top < minTop) minTop = cr.top;
        if (cr.bottom > maxBottom) maxBottom = cr.bottom;
      });

      const contentH = children.length > 0 ? Math.max(0, maxBottom - minTop) : 0;
      const excessH = Math.round(r.height - contentH);

      // Check stuck elements (opacity: 0 or visibility: hidden)
      const stuckEls = Array.from(sec.querySelectorAll('.pos-reveal, .reveal, [data-reveal], [data-animate], .clean-anim, .fade-up, .hero-fade')).filter(el => {
        const elCs = window.getComputedStyle(el);
        return elCs.opacity === '0' || elCs.visibility === 'hidden';
      }).map(el => el.className);

      let sel = sec.tagName.toLowerCase();
      if (sec.id) sel += '#' + sec.id;
      if (sec.className && typeof sec.className === 'string') {
        const cls = sec.className.trim().split(/\s+/).slice(0, 2);
        if (cls.length) sel += '.' + cls.join('.');
      }

      blankGaps.push({
        selector: sel,
        sectionHeight: Math.round(r.height),
        contentHeight: Math.round(contentH),
        excessHeight: excessH,
        paddingTop: Math.round(pt),
        paddingBottom: Math.round(pb),
        minHeight: minH,
        stuckCount: stuckEls.length,
        stuckClasses: stuckEls.slice(0, 2)
      });
    });

    blankGaps.sort((a, b) => b.excessHeight - a.excessHeight);

    return {
      innerW,
      currentScrollW,
      naturalScrollW,
      overflowPx,
      topCulprits: culprits.slice(0, 5),
      topGaps: blankGaps.slice(0, 3)
    };
  }, width);

  await page.close();
  return diag;
}

(async () => {
  console.log('Starting Step 1 Audit across all 19 Sector Pages at 360, 390, 430px...\n');

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    pipe: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--single-process']
  });

  const allResults = [];
  const widths = [360, 390, 430];

  for (const item of sectorPages) {
    console.log(`Auditing: ${item.name} (${item.file})...`);
    const pageDiag = {
      id: item.id,
      name: item.name,
      cat: item.cat,
      file: item.file,
      byWidth: {}
    };

    for (const w of widths) {
      pageDiag.byWidth[w] = await diagnosePage(browser, item, w);
    }
    allResults.push(pageDiag);
  }

  await browser.close();

  fs.writeFileSync(path.join(rootDir, 'test-artifacts/step1_full_audit.json'), JSON.stringify(allResults, null, 2), 'utf8');
  console.log('\nAudit complete! Saved detailed JSON to test-artifacts/step1_full_audit.json');

  // Print summary
  console.log('\n========================================================================================');
  console.log('PAGE | OVERFLOW (360/390/430) | TOP CULPRIT SELECTORS | BIGGEST BLANK GAP (PX, SELECTOR)');
  console.log('========================================================================================');

  allResults.forEach(r => {
    const o360 = r.byWidth[360].overflowPx;
    const o390 = r.byWidth[390].overflowPx;
    const o430 = r.byWidth[430].overflowPx;
    const culprits360 = r.byWidth[360].topCulprits.map(c => `${c.selector} (+${c.overflowAmt}px)`).slice(0, 3).join('; ') || 'None';
    const biggestGap360 = r.byWidth[360].topGaps[0] ? `${r.byWidth[360].topGaps[0].excessHeight}px (${r.byWidth[360].topGaps[0].selector})` : 'None';
    console.log(`${r.name.padEnd(28)} | 360: +${o360}px, 390: +${o390}px, 430: +${o430}px | ${culprits360} | ${biggestGap360}`);
  });
})();

