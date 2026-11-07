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

async function runTask03Tests() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const results = [];

  const screenshotDir = path.join(__dirname, '../artifacts/screenshots_task03');
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
      document.querySelectorAll('.reveal, .feature-row').forEach(el => el.classList.add('in', 'active'));
    });
    await new Promise(r => setTimeout(r, 250));

    const data = await page.evaluate((isMobile) => {
      const docScrollW = document.documentElement.scrollWidth;
      const docClientW = document.documentElement.clientWidth;
      const bodyScrollW = document.body.scrollWidth;
      const bodyClientW = document.body.clientWidth;
      const hasOverflow = docScrollW > docClientW || bodyScrollW > bodyClientW;

      // Navbar checks
      const burger = document.getElementById('hamburger');
      const burgerDisplay = burger ? window.getComputedStyle(burger).display : 'none';
      const navLinks = document.querySelector('.nav-links');
      const navLinksDisplay = navLinks ? window.getComputedStyle(navLinks).display : 'none';
      const navDemoBtn = document.querySelector('.nav-right-actions a.nav-cta-ghost');
      const navDemoDisplay = navDemoBtn ? window.getComputedStyle(navDemoBtn).display : 'none';

      const navbarValid = isMobile
        ? (burgerDisplay !== 'none' && navLinksDisplay === 'none' && navDemoDisplay === 'none')
        : (burgerDisplay === 'none' && navLinksDisplay !== 'none' && navDemoDisplay !== 'none');

      // Core Capabilities Feature Rows checks
      const featureRows = document.querySelectorAll('.feature-row');
      const rowChecks = [];
      featureRows.forEach((row, idx) => {
        const text = row.querySelector('.feature-text');
        const media = row.querySelector('.feature-media');
        const h3 = text ? text.querySelector('h3') : null;
        const link = text ? text.querySelector('a') : null;

        const textRect = text ? text.getBoundingClientRect() : null;
        const mediaRect = media ? media.getBoundingClientRect() : null;

        let rowOrderValid = false;
        if (textRect && mediaRect) {
          if (isMobile) {
            // Mobile: Text MUST be above media (text.top < media.top)
            rowOrderValid = textRect.top < mediaRect.top;
          } else {
            // Desktop alternating 2-column check
            if (idx % 2 === 0) {
              // Row 0 & 2: Text on left, media on right
              rowOrderValid = textRect.left < mediaRect.left;
            } else {
              // Row 1 & 3: Media on left, text on right
              rowOrderValid = mediaRect.left < textRect.left;
            }
          }
        }

        rowChecks.push({
          title: h3 ? h3.innerText.trim() : `Row ${idx+1}`,
          href: link ? link.getAttribute('href') : null,
          validOrder: rowOrderValid,
          textTop: textRect ? Math.round(textRect.top) : 0,
          mediaTop: mediaRect ? Math.round(mediaRect.top) : 0
        });
      });

      // Check Task 01 Hero & Task 02 Who We Serve integrity
      const hero = document.querySelector('.hero');
      const who = document.getElementById('who');
      const task01Intact = !!(hero && hero.querySelector('h1') && hero.querySelector('video'));
      const task02Intact = !!(who && who.querySelectorAll('.serve-card').length >= 4);

      return {
        hasOverflow,
        navbarValid,
        burgerDisplay,
        navLinksDisplay,
        navDemoDisplay,
        rowChecks,
        allRowsValid: rowChecks.every(r => r.validOrder),
        task01Intact,
        task02Intact
      };
    }, vp.width <= 768);

    results.push({
      viewport: `${vp.width}x${vp.height} (${vp.name})`,
      overflow: data.hasOverflow ? 'FAIL (OVERFLOW)' : 'PASS (Clean)',
      navbar: data.navbarValid ? 'PASS' : 'FAIL',
      coreCapabilitiesOrder: data.allRowsValid ? 'PASS (Text Above Media)' : 'FAIL',
      task01Hero: data.task01Intact ? 'PASS' : 'FAIL',
      task02Who: data.task02Intact ? 'PASS' : 'FAIL'
    });
  }

  // Functional Drawer and Links Test
  console.log('\n=== TESTING MOBILE DRAWER OPEN, CLOSE, DRILLDOWN & LINKS ===');
  await page.setViewport({ width: 375, height: 667 });
  await page.goto('http://localhost:3000/index.html', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    const pre = document.getElementById('priyulabs-preloader') || document.getElementById('priyulabsIntroPreloader');
    if (pre) pre.style.display = 'none';
  });

  // Capture Mobile Navbar Screenshot
  await page.screenshot({ path: path.join(screenshotDir, 'mobile_navbar_375.png') });

  // Open Drawer
  const drawerOpenResult = await page.evaluate(async () => {
    const burger = document.getElementById('hamburger');
    const drawer = document.getElementById('mobileDrawer');
    if (!burger || !drawer) return { error: 'Burger or Drawer not found' };

    burger.click();
    await new Promise(r => setTimeout(r, 400));

    const isOpen = drawer.classList.contains('open');
    const bodyLocked = document.body.style.overflow === 'hidden';

    // Drilldown to Business Types
    const bizTrigger = drawer.querySelector('[data-target="drawerPanelBusiness"]');
    if (bizTrigger) bizTrigger.click();
    await new Promise(r => setTimeout(r, 400));

    const bizPanelActive = document.getElementById('drawerPanelBusiness')?.classList.contains('active');
    const headerTitle = document.getElementById('drawerHeaderTitle')?.textContent;

    // Drilldown to F&B
    const fnbTrigger = drawer.querySelector('[data-target="drawerPanelFnb"]');
    if (fnbTrigger) fnbTrigger.click();
    await new Promise(r => setTimeout(r, 400));

    const fnbPanelActive = document.getElementById('drawerPanelFnb')?.classList.contains('active');

    // Test Back button
    const backBtn = document.getElementById('drawerBackBtn');
    if (backBtn) backBtn.click();
    await new Promise(r => setTimeout(r, 400));

    const backToBiz = document.getElementById('drawerPanelBusiness')?.classList.contains('active');

    // Close Drawer
    const closeBtn = document.getElementById('drawerCloseBtn');
    if (closeBtn) closeBtn.click();
    await new Promise(r => setTimeout(r, 400));

    const isClosed = !drawer.classList.contains('open');
    const bodyUnlocked = document.body.style.overflow === '';

    return {
      isOpen,
      bodyLocked,
      bizPanelActive,
      headerTitle,
      fnbPanelActive,
      backToBiz,
      isClosed,
      bodyUnlocked
    };
  });

  // Capture Core Capabilities Section Screenshot on Mobile (375px)
  await page.evaluate(async () => {
    const sol = document.getElementById('solutions');
    if (sol) {
      sol.scrollIntoView();
      // Scroll each feature row into view to trigger lazy load
      const rows = sol.querySelectorAll('.feature-row');
      for (const row of rows) {
        row.scrollIntoView();
        const img = row.querySelector('img');
        if (img) {
          img.loading = 'eager';
        }
      }
    }
  });
  await new Promise(r => setTimeout(r, 600));
  const solEl = await page.$('#solutions');
  if (solEl) {
    await solEl.screenshot({ path: path.join(screenshotDir, 'solutions_mobile_375.png') });
  }

  // Capture Desktop Screenshot (1440px)
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/index.html', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    const pre = document.getElementById('priyulabs-preloader') || document.getElementById('priyulabsIntroPreloader');
    if (pre) pre.style.display = 'none';
    const sol = document.getElementById('solutions');
    if (sol) sol.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 300));
  const solElDesk = await page.$('#solutions');
  if (solElDesk) {
    await solElDesk.screenshot({ path: path.join(screenshotDir, 'solutions_desktop_1440.png') });
  }

  console.log('\n=== TASK 03: AUDIT RESULTS ===\n');
  console.table(results);
  console.log('\n=== MOBILE DRAWER INTERACTION RESULTS ===\n', drawerOpenResult);

  await browser.close();
}

runTask03Tests().catch(console.error);
