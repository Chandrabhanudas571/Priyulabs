const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
  ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  : 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const VIEWPORTS = [
  // Mobile requested viewports (<= 768px)
  { name: 'mobile_320x568', width: 320, height: 568 },
  { name: 'mobile_360x800', width: 360, height: 800 },
  { name: 'mobile_375x667', width: 375, height: 667 },
  { name: 'mobile_375x812', width: 375, height: 812 },
  { name: 'mobile_390x844', width: 390, height: 844 },
  { name: 'mobile_414x896', width: 414, height: 896 },
  { name: 'mobile_430x932', width: 430, height: 932 },
  { name: 'mobile_480x854', width: 480, height: 854 },
  { name: 'mobile_540x960', width: 540, height: 960 },
  { name: 'tablet_768x1024', width: 768, height: 1024 },
  // Desktop regression viewports (>= 1024px)
  { name: 'desktop_1024x768', width: 1024, height: 768 },
  { name: 'desktop_1280x800', width: 1280, height: 800 },
  { name: 'desktop_1366x768', width: 1366, height: 768 },
  { name: 'desktop_1440x900', width: 1440, height: 900 },
  { name: 'desktop_1920x1080', width: 1920, height: 1080 }
];

async function runTask04Suite() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', err => consoleErrors.push(err.toString()));

  const screenshotDir = path.join(__dirname, '../artifacts/screenshots_task04');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  console.log('==================================================');
  console.log('1. AUDITING STICKY NAVBAR ACROSS ALL 15 VIEWPORTS');
  console.log('==================================================');

  const stickyResults = [];
  for (const vp of VIEWPORTS) {
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.goto('http://localhost:3000/index.html', { waitUntil: 'networkidle0' });

    // Dismiss preloader
    await page.evaluate(() => {
      const pre = document.getElementById('priyulabs-preloader') || document.getElementById('priyulabsIntroPreloader') || document.getElementById('sitePreloader');
      if (pre) pre.style.display = 'none';
      document.querySelectorAll('.reveal, .feature-row').forEach(el => el.classList.add('in', 'active'));
    });

    const isMobile = vp.width <= 768;

    // Check sticky positions at 0, 400, 1200, 2400 scrollY
    const scrollChecks = [];
    for (const scrollY of [0, 400, 1200, 2400]) {
      await page.evaluate((y) => window.scrollTo(0, y), scrollY);
      await new Promise(r => setTimeout(r, 60));

      const check = await page.evaluate(() => {
        const header = document.querySelector('header');
        const rect = header ? header.getBoundingClientRect() : null;
        const style = header ? window.getComputedStyle(header) : null;
        return {
          scrollY: window.scrollY,
          top: rect ? Math.round(rect.top) : null,
          height: rect ? Math.round(rect.height) : null,
          position: style ? style.position : null,
          zIndex: style ? parseInt(style.zIndex, 10) : 0,
          isPinnedAtTop: rect ? Math.round(rect.top) === 0 : false
        };
      });
      scrollChecks.push(check);
    }

    const docOverflow = await page.evaluate(() => {
      const docW = document.documentElement.scrollWidth;
      const clientW = document.documentElement.clientWidth;
      const bodyW = document.body.scrollWidth;
      return docW > clientW || bodyW > clientW;
    });

    const allPinned = scrollChecks.every(c => c.isPinnedAtTop);
    stickyResults.push({
      viewport: `${vp.width}x${vp.height} (${vp.name})`,
      stickyNavbar: allPinned ? 'PASS (Sticky at top: 0)' : 'FAIL',
      overflow: docOverflow ? 'FAIL (Overflow)' : 'PASS (Clean 0px)',
      headerZIndex: scrollChecks[0].zIndex,
      headerPosition: scrollChecks[0].position
    });
  }
  console.table(stickyResults);

  console.log('\n==================================================');
  console.log('2. AUDITING WHO WE SERVE HORIZONTAL CAROUSEL & SWIPE');
  console.log('==================================================');

  await page.setViewport({ width: 375, height: 667, hasTouch: true, isMobile: true });
  await page.goto('http://localhost:3000/index.html', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    const pre = document.getElementById('priyulabs-preloader') || document.getElementById('sitePreloader');
    if (pre) pre.style.display = 'none';
  });

  // Scroll to #who
  await page.evaluate(() => {
    const who = document.getElementById('who');
    if (who) who.scrollIntoView({ block: 'start' });
  });
  await new Promise(r => setTimeout(r, 300));

  const whoMetrics = await page.evaluate(() => {
    const slider = document.querySelector('.serve-scroll');
    const cards = Array.from(document.querySelectorAll('.serve-card'));
    const roundCta = document.querySelector('.serve-round-cta');

    const style = window.getComputedStyle(slider);
    return {
      scrollWidth: slider.scrollWidth,
      clientWidth: slider.clientWidth,
      isScrollable: slider.scrollWidth > slider.clientWidth,
      overflowX: style.overflowX,
      overflowY: style.overflowY,
      touchAction: style.touchAction,
      scrollSnapType: style.scrollSnapType,
      cardsCount: cards.length,
      cardsHrefs: cards.map(c => ({ title: c.querySelector('h4')?.textContent, href: c.getAttribute('href') })),
      roundCtaHref: roundCta ? roundCta.getAttribute('href') : null
    };
  });
  console.log('Who We Serve Carousel CSS & Dimensions:', whoMetrics);

  // Test horizontal scrolling on carousel
  const scrollSteps = await page.evaluate(async () => {
    const slider = document.querySelector('.serve-scroll');
    const results = [];

    // Step 0: Initial
    results.push({ step: 'Initial', scrollLeft: slider.scrollLeft });

    // Step 1: Programmatic / gesture scroll forward
    slider.scrollTo({ left: 300, behavior: 'instant' });
    await new Promise(r => setTimeout(r, 100));
    results.push({ step: 'Scroll to Card 2', scrollLeft: slider.scrollLeft });

    // Step 2: Scroll to Card 3
    slider.scrollTo({ left: 600, behavior: 'instant' });
    await new Promise(r => setTimeout(r, 100));
    results.push({ step: 'Scroll to Card 3', scrollLeft: slider.scrollLeft });

    // Step 3: Scroll to End (Round CTA)
    slider.scrollTo({ left: slider.scrollWidth, behavior: 'instant' });
    await new Promise(r => setTimeout(r, 100));
    results.push({ step: 'Scroll to End (Round CTA)', scrollLeft: slider.scrollLeft });

    // Step 4: Scroll Back to 0
    slider.scrollTo({ left: 0, behavior: 'instant' });
    await new Promise(r => setTimeout(r, 100));
    results.push({ step: 'Scroll Back to Start', scrollLeft: slider.scrollLeft });

    return results;
  });
  console.log('Carousel Horizontal Movement Steps:');
  console.table(scrollSteps);

  console.log('\n==================================================');
  console.log('3. AUDITING ALL BUTTONS, CARDS & INTERACTIVE CTA LINKS');
  console.log('==================================================');

  const interactiveElements = await page.evaluate(() => {
    const results = [];

    // 1. Header elements
    const logo = document.querySelector('header .logo');
    const burger = document.getElementById('hamburger');
    const demoBtn = document.querySelector('.nav-cta-ghost');
    const trialBtn = document.querySelector('.nav-cta');
    results.push({ section: 'Header', element: 'Logo', href: logo?.getAttribute('href'), status: logo ? 'PASS' : 'FAIL' });
    results.push({ section: 'Header', element: 'Hamburger', hasId: !!burger, status: burger ? 'PASS' : 'FAIL' });
    results.push({ section: 'Header', element: 'Interactive Demo CTA', href: demoBtn?.getAttribute('href'), status: demoBtn ? 'PASS' : 'FAIL' });
    results.push({ section: 'Header', element: 'Start Free Trial CTA', href: trialBtn?.getAttribute('href'), status: trialBtn ? 'PASS' : 'FAIL' });

    // 2. Hero buttons
    const heroPrimary = document.querySelector('.hero-actions .btn-primary');
    const heroGhost = document.querySelector('.hero-actions .btn-ghost');
    results.push({ section: 'Hero', element: 'Book a 10-min Demo (WhatsApp)', href: heroPrimary?.getAttribute('href'), status: heroPrimary ? 'PASS' : 'FAIL' });
    results.push({ section: 'Hero', element: 'See How It Works (Solutions Anchor)', href: heroGhost?.getAttribute('href'), status: heroGhost ? 'PASS' : 'FAIL' });

    // 3. Core Capabilities CTAs
    const capRows = document.querySelectorAll('.feature-row');
    capRows.forEach((row, i) => {
      const title = row.querySelector('h3')?.textContent;
      const link = row.querySelector('a');
      results.push({ section: 'Core Capabilities', element: `Feature ${i+1}: ${title}`, href: link?.getAttribute('href'), status: link ? 'PASS' : 'FAIL' });
    });

    // 4. Who We Serve Cards & CTA
    const cards = document.querySelectorAll('.serve-card');
    cards.forEach((card, i) => {
      const title = card.querySelector('h4')?.textContent;
      const href = card.getAttribute('href');
      results.push({ section: 'Who We Serve', element: `Card ${i+1}: ${title}`, href, status: href ? 'PASS' : 'FAIL' });
    });
    const roundCta = document.querySelector('.serve-round-cta');
    results.push({ section: 'Who We Serve', element: 'See All 18 Sectors Round CTA', href: roundCta?.getAttribute('href'), status: roundCta ? 'PASS' : 'FAIL' });

    // 5. Onboarding / Free Trial Form
    const form = document.getElementById('mainLeadForm');
    const nameInp = document.getElementById('userName');
    const bTypeSelect = document.getElementById('businessType');
    const serviceSelect = document.getElementById('serviceCategory');
    const submitBtn = document.getElementById('mainSubmitBtn') || form?.querySelector('button[type="submit"]');
    results.push({ section: 'Free Trial Form', element: 'Form & Required Fields', hasForm: !!form, hasName: !!nameInp, hasBType: !!bTypeSelect, hasService: !!serviceSelect, status: form && nameInp && bTypeSelect && serviceSelect ? 'PASS' : 'FAIL' });

    // 6. Mobile Drawer Elements
    const drawer = document.getElementById('mobileDrawer');
    const drawerClose = document.getElementById('drawerCloseBtn');
    const drawerBack = document.getElementById('drawerBackBtn');
    const drawerTriggers = document.querySelectorAll('.drawer-drill-trigger');
    results.push({ section: 'Mobile Drawer', element: 'Drawer Shell & Controls', hasDrawer: !!drawer, hasClose: !!drawerClose, hasBack: !!drawerBack, triggersCount: drawerTriggers.length, status: drawer && drawerClose && drawerBack ? 'PASS' : 'FAIL' });

    return results;
  });
  console.table(interactiveElements);

  // Capture Verification Screenshots
  console.log('\n==================================================');
  console.log('4. CAPTURING TASK 04 VERIFICATION SCREENSHOTS');
  console.log('==================================================');

  // Mobile Sticky Header at scrollY = 800
  await page.setViewport({ width: 375, height: 667 });
  await page.goto('http://localhost:3000/index.html', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    const pre = document.getElementById('priyulabs-preloader') || document.getElementById('sitePreloader');
    if (pre) pre.style.display = 'none';
    window.scrollTo(0, 800);
  });
  await new Promise(r => setTimeout(r, 300));
  await page.screenshot({ path: path.join(screenshotDir, 'mobile_sticky_header_scrolled.png') });

  // Mobile Who We Serve section screenshot
  await page.evaluate(() => {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
    const who = document.getElementById('who');
    if (who) who.scrollIntoView({ block: 'start' });
  });
  await new Promise(r => setTimeout(r, 400));
  const whoSection = await page.$('#who');
  if (whoSection) {
    await whoSection.screenshot({ path: path.join(screenshotDir, 'mobile_who_we_serve_section.png') });
  }

  // Desktop Sticky Header at scrollY = 1200
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/index.html', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    const pre = document.getElementById('priyulabs-preloader') || document.getElementById('sitePreloader');
    if (pre) pre.style.display = 'none';
    window.scrollTo(0, 1200);
  });
  await new Promise(r => setTimeout(r, 300));
  await page.screenshot({ path: path.join(screenshotDir, 'desktop_sticky_header_scrolled.png') });

  console.log('\nConsole Errors during full test suite:', consoleErrors.length === 0 ? '0 (Clean)' : consoleErrors);

  await browser.close();
}

runTask04Suite().catch(console.error);
