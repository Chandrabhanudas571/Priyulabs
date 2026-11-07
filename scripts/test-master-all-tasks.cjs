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

async function runMasterVerification() {
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

  console.log('======================================================================');
  console.log('MASTER VERIFICATION: TASKS 01 TO 05 INTEGRITY & VIEWPORT MATRIX AUDIT');
  console.log('======================================================================');

  // Test across all 15 viewports
  const vpResults = [];
  for (const vp of VIEWPORTS) {
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.goto('http://localhost:3000/index.html', { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => {
      const pre = document.getElementById('priyulabs-preloader') || document.getElementById('sitePreloader');
      if (pre) pre.style.display = 'none';
      document.querySelectorAll('.reveal, .feature-row').forEach(el => el.classList.add('in', 'active'));
    });

    const isMobile = vp.width <= 768;

    // Check sticky header position at scrollY = 0, 500, 1200
    let stickyPassed = true;
    for (const y of [0, 500, 1200]) {
      await page.evaluate((pos) => window.scrollTo(0, pos), y);
      await new Promise(r => setTimeout(r, 30));
      const rectTop = await page.evaluate(() => {
        const header = document.querySelector('header');
        return header ? Math.round(header.getBoundingClientRect().top) : null;
      });
      if (rectTop !== 0) stickyPassed = false;
    }

    const audit = await page.evaluate((isMob) => {
      const docW = document.documentElement.scrollWidth;
      const clientW = document.documentElement.clientWidth;

      // 1. Hero Check (H1 -> Sub -> Actions -> Visual -> Trust)
      const h1 = document.querySelector('.hero-copy h1');
      const sub = document.querySelector('.hero-sub');
      const actions = document.querySelector('.hero-actions');
      const visual = document.querySelector('.hero-visual');
      const trust = document.querySelector('.hero-trust');
      let heroOrderValid = true;
      if (isMob && h1 && sub && actions && visual && trust) {
        const h1Top = h1.getBoundingClientRect().top;
        const subTop = sub.getBoundingClientRect().top;
        const actTop = actions.getBoundingClientRect().top;
        const visTop = visual.getBoundingClientRect().top;
        const trTop = trust.getBoundingClientRect().top;
        heroOrderValid = h1Top < subTop && subTop < actTop && actTop < visTop && visTop < trTop;
      }

      // 2. Who We Serve Check
      const serveSlider = document.querySelector('.serve-scroll');
      const whoValid = isMob ? (serveSlider.scrollWidth > serveSlider.clientWidth) : true;

      // 3. Core Capabilities Check
      const rows = Array.from(document.querySelectorAll('.feature-row'));
      let capValid = true;
      if (isMob) {
        for (const row of rows) {
          const t = row.querySelector('.feature-text');
          const m = row.querySelector('.feature-media');
          if (m.getBoundingClientRect().top < t.getBoundingClientRect().top) capValid = false;
        }
      }

      // 4. Onboard Form Check
      const formContainer = document.querySelector('.onboard-card-container');
      const nameInp = document.getElementById('userName');
      const submitBtn = document.getElementById('mainSubmitBtn');
      const formValid = nameInp && submitBtn && (submitBtn.getBoundingClientRect().height >= 44);

      return {
        docW,
        clientW,
        isZeroOverflow: docW === clientW,
        heroOrderValid,
        whoValid,
        capValid,
        formValid
      };
    }, isMobile);

    vpResults.push({
      viewport: `${vp.width}x${vp.height} (${vp.name})`,
      stickyNavbar: stickyPassed ? 'PASS' : 'FAIL',
      heroLayout: audit.heroOrderValid ? 'PASS' : 'FAIL',
      whoCarousel: audit.whoValid ? 'PASS' : 'FAIL',
      coreCapabilities: audit.capValid ? 'PASS' : 'FAIL',
      onboardForm: audit.formValid ? 'PASS' : 'FAIL',
      overflow: audit.isZeroOverflow ? '0px (PASS)' : `${audit.docW - audit.clientW}px (FAIL)`
    });
  }
  console.table(vpResults);

  console.log('\nConsole Errors during full master audit:', consoleErrors.length === 0 ? '0 (Clean)' : consoleErrors);

  await browser.close();
}

runMasterVerification().catch(console.error);
