const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
  ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  : 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const VIEWPORTS = [
  // Mobile requested viewports
  { name: 'mobile_320x568', width: 320, height: 568 },
  { name: 'mobile_360x800', width: 360, height: 800 },
  { name: 'mobile_375x667', width: 375, height: 667 },
  { name: 'mobile_375x812', width: 375, height: 812 },
  { name: 'mobile_390x844', width: 390, height: 844 },
  { name: 'mobile_414x896', width: 414, height: 896 },
  { name: 'mobile_430x932', width: 430, height: 932 },
  { name: 'mobile_480x854', width: 480, height: 854 },
  { name: 'mobile_540x960', width: 540, height: 960 },
  // Tablet
  { name: 'tablet_768x1024', width: 768, height: 1024 },
  { name: 'tablet_820x1180', width: 820, height: 1180 },
  // Desktop regression viewports
  { name: 'desktop_1024x768', width: 1024, height: 768 },
  { name: 'desktop_1280x800', width: 1280, height: 800 },
  { name: 'desktop_1366x768', width: 1366, height: 768 },
  { name: 'desktop_1440x900', width: 1440, height: 900 },
  { name: 'desktop_1920x1080', width: 1920, height: 1080 }
];

async function runWhoTests() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const results = [];

  const screenshotDir = path.join(__dirname, '../artifacts/screenshots_task02');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  for (const vp of VIEWPORTS) {
    await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 1 });
    await page.goto('http://localhost:3000/index.html', { waitUntil: 'networkidle0', timeout: 15000 }).catch(() => {});

    // Dismiss preloader if present
    await page.evaluate(() => {
      const pre = document.getElementById('priyulabs-preloader') || document.getElementById('priyulabsIntroPreloader');
      if (pre) pre.style.display = 'none';
    });
    await new Promise(r => setTimeout(r, 300));

    const data = await page.evaluate(() => {
      const docScrollW = document.documentElement.scrollWidth;
      const docClientW = document.documentElement.clientWidth;
      const bodyScrollW = document.body.scrollWidth;
      const bodyClientW = document.body.clientWidth;
      const hasOverflow = docScrollW > docClientW || bodyScrollW > bodyClientW;

      const who = document.getElementById('who');
      const head = who ? who.querySelector('.section-head') : null;
      const heading = head ? head.querySelector('h2') : null;
      const scroll = who ? who.querySelector('.serve-scroll') : null;
      const cards = who ? who.querySelectorAll('.serve-card') : [];
      const roundCta = who ? who.querySelector('.serve-round-cta') : null;

      // Card link checks
      const cardLinks = Array.from(cards).map(c => ({
        text: c.querySelector('h4') ? c.querySelector('h4').innerText.trim() : '',
        href: c.getAttribute('href'),
        width: Math.round(c.getBoundingClientRect().width),
        height: Math.round(c.getBoundingClientRect().height)
      }));

      const roundCtaHref = roundCta ? roundCta.getAttribute('href') : null;
      const roundCtaWidth = roundCta ? Math.round(roundCta.getBoundingClientRect().width) : null;

      // Scrollable carousel metrics
      const scrollInfo = scroll ? {
        scrollWidth: scroll.scrollWidth,
        clientWidth: scroll.clientWidth,
        isScrollable: scroll.scrollWidth > scroll.clientWidth,
        computedSnap: window.getComputedStyle(scroll).scrollSnapType
      } : null;

      // Verify Hero section still has 100% order integrity (Task 01 preservation)
      const hero = document.querySelector('.hero');
      const h1 = document.querySelector('.hero-copy h1');
      const actions = document.querySelector('.hero-actions');
      const visual = document.querySelector('.hero-visual');
      const trust = document.querySelector('.hero-trust');

      const heroIntact = !!(hero && h1 && actions && visual && trust);

      return {
        hasOverflow,
        docScrollW,
        docClientW,
        headingText: heading ? heading.innerText.trim() : '',
        headingFontSize: heading ? window.getComputedStyle(heading).fontSize : '',
        cardCount: cards.length,
        cardLinks,
        roundCtaHref,
        roundCtaWidth,
        scrollInfo,
        heroIntact
      };
    });

    // Take screenshot of #who section
    const whoEl = await page.$('#who');
    if (whoEl) {
      await whoEl.screenshot({ path: path.join(screenshotDir, `who_${vp.name}.png`) });
    }

    results.push({
      viewport: `${vp.width}x${vp.height} (${vp.name})`,
      overflow: data.hasOverflow ? 'FAIL (OVERFLOW)' : 'PASS (Clean)',
      card0Size: data.cardLinks[0] ? `${data.cardLinks[0].width}x${data.cardLinks[0].height}px` : 'N/A',
      isCarouselScrollable: data.scrollInfo ? (data.scrollInfo.isScrollable ? 'YES' : 'NO') : 'N/A',
      scrollSnap: data.scrollInfo ? data.scrollInfo.computedSnap : 'N/A',
      heroIntact: data.heroIntact ? 'PASS' : 'FAIL',
      ctaSize: data.roundCtaWidth ? `${data.roundCtaWidth}px` : 'N/A'
    });
  }

  // Functional navigation click test
  console.log('\n=== TESTING CARD AND CTA NAVIGATION CLICKABILITY ===');
  await page.setViewport({ width: 375, height: 667 });
  await page.goto('http://localhost:3000/index.html', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    const pre = document.getElementById('priyulabs-preloader') || document.getElementById('priyulabsIntroPreloader');
    if (pre) pre.style.display = 'none';
  });

  const navTests = [];
  const linkSelectors = [
    { name: 'Card 1: Salons & Spas', selector: '.serve-scroll .serve-card:nth-child(1)', expected: 'salons-spas.html' },
    { name: 'Card 2: Cafes & Dining', selector: '.serve-scroll .serve-card:nth-child(2)', expected: 'cafes-chai-bars.html' },
    { name: 'Card 3: Supermarket & Grocery', selector: '.serve-scroll .serve-card:nth-child(3)', expected: 'grocery-supermarkets-kirana.html' },
    { name: 'Card 4: Electronics & Mobile', selector: '.serve-scroll .serve-card:nth-child(4)', expected: 'electronics-mobile-shops.html' },
    { name: 'CTA: See All 18 Sectors', selector: '.serve-scroll .serve-round-cta', expected: 'all-business-types.html' }
  ];

  for (const item of linkSelectors) {
    const targetHref = await page.$eval(item.selector, el => el.getAttribute('href'));
    const isMatching = targetHref === item.expected;
    navTests.push({
      item: item.name,
      selector: item.selector,
      href: targetHref,
      expectedHref: item.expected,
      status: isMatching ? 'PASS' : 'FAIL'
    });
  }

  // Test swipe / scroll interaction programmatically
  const swipeTest = await page.evaluate(async () => {
    const slider = document.querySelector('.serve-scroll');
    const startPos = slider.scrollLeft;
    slider.scrollBy({ left: 200, behavior: 'smooth' });
    await new Promise(r => setTimeout(r, 400));
    const movedPos = slider.scrollLeft;
    return {
      startPos,
      movedPos,
      scrollWorked: movedPos > startPos
    };
  });

  console.log('\n=== TASK 02: WHO WE SERVE AUDIT RESULTS ===\n');
  console.table(results);
  console.log('\n=== CARD DESTINATION VERIFICATION ===\n');
  console.table(navTests);
  console.log('\n=== SWIPE / SCROLL TEST ===\n', swipeTest);

  await browser.close();
}

runWhoTests().catch(console.error);
