const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');
const http = require('http');

const CHROME_PATH = fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
  ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  : 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const MOBILE_VIEWPORTS = [
  { name: '320x568 (iPhone SE / small phone)', width: 320, height: 568 },
  { name: '360x800 (Galaxy S20)', width: 360, height: 800 },
  { name: '375x667 (iPhone 8 / SE2)', width: 375, height: 667 },
  { name: '375x812 (iPhone X / 11 Pro)', width: 375, height: 812 },
  { name: '390x844 (iPhone 12/13/14)', width: 390, height: 844 },
  { name: '414x896 (iPhone XR / 11)', width: 414, height: 896 },
  { name: '430x932 (iPhone 14/15 Pro Max)', width: 430, height: 932 },
  { name: '480x854 (Android mid)', width: 480, height: 854 },
  { name: '540x960 (Galaxy Fold / Phablet)', width: 540, height: 960 },
  { name: '768x1024 (iPad / Tablet boundary)', width: 768, height: 1024 }
];

const DESKTOP_VIEWPORTS = [
  { name: '1024x768 (Desktop Standard)', width: 1024, height: 768 },
  { name: '1280x800 (MacBook 13)', width: 1280, height: 800 },
  { name: '1366x768 (Laptop Standard)', width: 1366, height: 768 },
  { name: '1440x900 (Desktop Widescreen)', width: 1440, height: 900 },
  { name: '1920x1080 (Full HD)', width: 1920, height: 1080 }
];

// Simple static file server
function startServer(port) {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let reqPath = req.url.split('?')[0];
      if (reqPath === '/') reqPath = '/index.html';
      const filePath = path.join(__dirname, '..', decodeURIComponent(reqPath));

      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        const ext = path.extname(filePath).toLowerCase();
        const mimeTypes = {
          '.html': 'text/html',
          '.css': 'text/css',
          '.js': 'application/javascript',
          '.json': 'application/json',
          '.png': 'image/png',
          '.jpg': 'image/jpeg',
          '.jpeg': 'image/jpeg',
          '.svg': 'image/svg+xml',
          '.mp4': 'video/mp4',
          '.webp': 'image/webp'
        };
        res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
        fs.createReadStream(filePath).pipe(res);
      } else {
        res.writeHead(404);
        res.end('Not found');
      }
    });

    server.listen(port, () => {
      resolve(server);
    });
  });
}

async function runAudit() {
  const PORT = 3460;
  const server = await startServer(PORT);
  console.log(`Test server running at http://localhost:${PORT}`);

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

  console.log('\n============================================================');
  console.log('PHASE 4: MOBILE VIEWPORTS & COMPONENT TESTING (<= 768px)');
  console.log('============================================================');

  let allMobilePassed = true;
  for (const vp of MOBILE_VIEWPORTS) {
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.goto(`http://localhost:${PORT}/index.html`, { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => {
      const pre = document.getElementById('priyulabs-preloader') || document.getElementById('priyulabsIntroPreloader');
      if (pre) pre.style.display = 'none';
      document.body.style.overflow = '';
    });

    const result = await page.evaluate(() => {
      const docWidth = document.documentElement.clientWidth;
      const scrollWidth = document.documentElement.scrollWidth;
      const bodyScrollWidth = document.body.scrollWidth;
      const overflowPx = Math.max(0, scrollWidth - docWidth, bodyScrollWidth - docWidth);

      // Check mobile header & hamburger
      const hamburger = document.getElementById('hamburger');
      const hamburgerDisplay = hamburger ? window.getComputedStyle(hamburger).display : 'none';
      const navLinks = document.querySelector('.nav-links');
      const navLinksDisplay = navLinks ? window.getComputedStyle(navLinks).display : 'none';

      // Check carousel
      const serveScroll = document.querySelector('.serve-scroll');
      const prevBtn = document.getElementById('serveArrowPrev');
      const nextBtn = document.getElementById('serveArrowNext');

      // Check form
      const form = document.getElementById('mainLeadForm');
      const nameInput = document.getElementById('userName');
      const bTypeSelect = document.getElementById('businessType');
      const serviceSelect = document.getElementById('serviceCategory');
      const phoneInput = document.getElementById('userPhone');
      const submitBtn = document.getElementById('mainSubmitBtn');

      return {
        docWidth,
        scrollWidth,
        overflowPx,
        hamburgerVisible: hamburgerDisplay !== 'none',
        desktopNavHidden: navLinksDisplay === 'none',
        hasCarousel: !!serveScroll,
        hasNextBtn: !!nextBtn,
        hasForm: !!form,
        formControlsExist: !!(nameInput && bTypeSelect && serviceSelect && phoneInput && submitBtn)
      };
    });

    const passed = result.overflowPx === 0 && result.hamburgerVisible && result.desktopNavHidden && result.hasForm && result.hasCarousel;
    if (!passed) allMobilePassed = false;

    console.log(`Viewport ${vp.name.padEnd(36)} -> Overflow: ${result.overflowPx}px | Hamburger Vis: ${result.hamburgerVisible} | Desktop Nav Hidden: ${result.desktopNavHidden} | Status: ${passed ? 'PASS' : 'FAIL'}`);
  }

  console.log('\n============================================================');
  console.log('MOBILE INTERACTION TESTS: DRAWER, CAROUSEL, FORM');
  console.log('============================================================');

  // Set standard mobile viewport
  await page.setViewport({ width: 375, height: 812 });
  await page.goto(`http://localhost:${PORT}/index.html`, { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => {
    const pre = document.getElementById('priyulabs-preloader') || document.getElementById('priyulabsIntroPreloader');
    if (pre) pre.style.display = 'none';
    document.body.style.overflow = '';
  });

  // 1. Drawer Test
  console.log('\n1. Testing Mobile Navigation Drawer...');
  const drawerInitial = await page.evaluate(() => {
    const drawer = document.getElementById('mobileDrawer');
    return drawer ? drawer.classList.contains('is-open') : false;
  });
  console.log('   Drawer initially closed:', !drawerInitial);

  await page.click('#hamburger');
  await new Promise(r => setTimeout(r, 200));

  const drawerOpened = await page.evaluate(() => {
    const drawer = document.getElementById('mobileDrawer');
    const bodyLock = document.body.style.overflow === 'hidden';
    return drawer && drawer.classList.contains('is-open') && bodyLock;
  });
  console.log('   Drawer opened & body scroll locked:', drawerOpened);

  // Toggle accordion in drawer
  await page.click('#drawerSolBtn');
  await new Promise(r => setTimeout(r, 150));
  const solAccOpen = await page.evaluate(() => {
    const content = document.getElementById('drawerSolContent');
    return content && content.classList.contains('is-open');
  });
  console.log('   Solutions accordion toggled open:', solAccOpen);

  // Close drawer
  await page.click('#drawerCloseBtn');
  await new Promise(r => setTimeout(r, 200));
  const drawerClosed = await page.evaluate(() => {
    const drawer = document.getElementById('mobileDrawer');
    const bodyFree = document.body.style.overflow === '';
    return drawer && !drawer.classList.contains('is-open') && bodyFree;
  });
  console.log('   Drawer closed & body scroll restored:', drawerClosed);

  // 2. Carousel Interaction Test
  console.log('\n2. Testing Mobile Who We Serve Carousel scrollBy()...');
  const initialScrollPos = await page.evaluate(() => {
    const slider = document.querySelector('.serve-scroll');
    const prev = document.getElementById('serveArrowPrev');
    const next = document.getElementById('serveArrowNext');
    return {
      scrollLeft: slider ? slider.scrollLeft : 0,
      prevDisabled: prev ? prev.disabled : false,
      nextDisabled: next ? next.disabled : false
    };
  });
  console.log('   Initial Carousel state: scrollLeft =', initialScrollPos.scrollLeft, '| prevDisabled =', initialScrollPos.prevDisabled);

  // Click Next
  await page.click('#serveArrowNext');
  await new Promise(r => setTimeout(r, 450));
  const afterNextState = await page.evaluate(() => {
    const slider = document.querySelector('.serve-scroll');
    const prev = document.getElementById('serveArrowPrev');
    return {
      scrollLeft: slider ? slider.scrollLeft : 0,
      prevDisabled: prev ? prev.disabled : true
    };
  });
  console.log('   After Next click: scrollLeft =', afterNextState.scrollLeft, '| prevDisabled =', afterNextState.prevDisabled);

  // Click Prev back to start
  await page.click('#serveArrowPrev');
  await new Promise(r => setTimeout(r, 450));
  const backTo0State = await page.evaluate(() => {
    const slider = document.querySelector('.serve-scroll');
    const prev = document.getElementById('serveArrowPrev');
    return {
      scrollLeft: slider ? slider.scrollLeft : 0,
      prevDisabled: prev ? prev.disabled : false
    };
  });
  console.log('   Back at start: scrollLeft =', backTo0State.scrollLeft, '| prevDisabled =', backTo0State.prevDisabled);

  // 3. Form Validation & Submission Test
  console.log('\n3. Testing Lead Capture Form Lifecycle...');

  // A. Empty form submit
  const emptyCheck = await page.evaluate(() => {
    const name = document.getElementById('userName');
    return name.checkValidity();
  });
  console.log('   Empty form name field valid:', emptyCheck, '(expected: false)');

  // B. Fill valid inputs
  await page.type('#userName', 'Ramesh Sharma');
  await page.select('#businessType', 'Salons, Spas & Beauty Parlors');
  await page.select('#serviceCategory', 'Smart POS');
  await page.type('#userPhone', '9876543210');

  const filledCheck = await page.evaluate(() => {
    const form = document.getElementById('mainLeadForm');
    return {
      name: document.getElementById('userName').value,
      bType: document.getElementById('businessType').value,
      service: document.getElementById('serviceCategory').value,
      phone: document.getElementById('userPhone').value,
      isValid: form.checkValidity()
    };
  });
  console.log('   Form filled with valid data:', filledCheck);

  // Intercept fetch to verify payload and simulate fast response
  await page.setRequestInterception(true);
  let interceptedPayload = null;
  page.on('request', req => {
    if (req.url().includes('script.google.com')) {
      interceptedPayload = req.postData();
      req.respond({ status: 200, contentType: 'application/json', body: JSON.stringify({ status: 'success' }) });
    } else {
      req.continue();
    }
  });

  // Click Submit
  await page.click('#mainSubmitBtn');
  await new Promise(r => setTimeout(r, 600));

  const postSubmitState = await page.evaluate(() => {
    const statusEl = document.getElementById('mainFormStatus');
    const popup = document.getElementById('leadSuccessPopup');
    return {
      statusDisplay: statusEl ? statusEl.style.display : 'none',
      statusText: statusEl ? statusEl.textContent.trim() : '',
      popupDisplay: popup ? popup.style.display : 'none'
    };
  });
  console.log('   Submission result status display:', postSubmitState.statusDisplay);
  console.log('   Status message contains confirmation:', postSubmitState.statusText.includes('Submission Confirmed') || postSubmitState.statusText.includes('submitted'));
  console.log('   Intercepted Payload to Google Apps Script:', interceptedPayload);

  console.log('\n============================================================');
  console.log('PHASE 5: DESKTOP REGRESSION MATRIX AUDIT (>= 1024px)');
  console.log('============================================================');

  let allDesktopPassed = true;
  for (const vp of DESKTOP_VIEWPORTS) {
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.goto(`http://localhost:${PORT}/index.html`, { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => {
      const pre = document.getElementById('priyulabs-preloader') || document.getElementById('priyulabsIntroPreloader');
      if (pre) pre.style.display = 'none';
      document.body.style.overflow = '';
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
    });

    const result = await page.evaluate(() => {
      const docWidth = document.documentElement.clientWidth;
      const scrollWidth = document.documentElement.scrollWidth;
      const overflowPx = Math.max(0, scrollWidth - docWidth);

      const hamburger = document.getElementById('hamburger');
      const hamburgerDisplay = hamburger ? window.getComputedStyle(hamburger).display : 'none';
      const navLinks = document.querySelector('.nav-links');
      const navLinksDisplay = navLinks ? window.getComputedStyle(navLinks).display : 'none';

      const desktopHero = document.querySelector('.hero');
      const desktopSolutions = document.getElementById('solutions');
      const desktopWho = document.getElementById('who');
      const desktopContact = document.getElementById('contact');
      const desktopFooter = document.querySelector('footer');

      return {
        docWidth,
        scrollWidth,
        overflowPx,
        hamburgerHidden: hamburgerDisplay === 'none',
        desktopNavVisible: navLinksDisplay !== 'none',
        hasDesktopHero: !!desktopHero,
        hasDesktopSolutions: !!desktopSolutions,
        hasDesktopWho: !!desktopWho,
        hasDesktopContact: !!desktopContact,
        hasDesktopFooter: !!desktopFooter
      };
    });

    const passed = result.overflowPx === 0 && result.hamburgerHidden && result.desktopNavVisible && result.hasDesktopHero && result.hasDesktopSolutions && result.hasDesktopWho && result.hasDesktopContact;
    if (!passed) allDesktopPassed = false;

    console.log(`Viewport ${vp.name.padEnd(32)} -> Overflow: ${result.overflowPx}px | Hamburger Hidden: ${result.hamburgerHidden} | Desktop Nav Vis: ${result.desktopNavVisible} | Status: ${passed ? 'PASS' : 'FAIL'}`);
  }

  console.log('\n============================================================');
  console.log('CONSOLE ERRORS COUNT');
  console.log('============================================================');
  console.log('Total Console Errors:', consoleErrors.length);
  if (consoleErrors.length > 0) {
    consoleErrors.forEach((e, idx) => console.log(`   [${idx+1}]`, e));
  } else {
    console.log('   0 JavaScript errors detected across all tested viewports & interactions.');
  }

  await browser.close();
  server.close();
  console.log('\nAudit complete.');
}

runAudit().catch(err => {
  console.error('Audit failed with exception:', err);
  process.exit(1);
});
