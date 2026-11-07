const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
  ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  : 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const BASE_URL = 'http://localhost:3000';
const SCREENSHOT_DIR = path.join(__dirname, '../scratch/qa_restored_buttons');

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function runAudit() {
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
  console.log('VERIFYING RESTORED PRIYULABS BUTTON DESIGN & PRESERVED FEATURES');
  console.log('======================================================================');

  const pagesToAudit = [
    { name: 'index_desktop', url: `${BASE_URL}/index.html`, vp: { width: 1440, height: 900 } },
    { name: 'index_mobile', url: `${BASE_URL}/index.html`, vp: { width: 375, height: 812, isMobile: true, hasTouch: true } },
    { name: 'pos', url: `${BASE_URL}/pos.html`, vp: { width: 1440, height: 900 } },
    { name: 'cms', url: `${BASE_URL}/complete-management-system.html`, vp: { width: 1440, height: 900 } },
    { name: 'website_builder', url: `${BASE_URL}/website-builder.html`, vp: { width: 1440, height: 900 } },
    { name: 'digital_marketing', url: `${BASE_URL}/digital-marketing.html`, vp: { width: 1440, height: 900 } },
    { name: 'solutions', url: `${BASE_URL}/solutions.html`, vp: { width: 1440, height: 900 } },
    { name: 'interactive_demo', url: `${BASE_URL}/interactive-demo.html`, vp: { width: 1440, height: 900 } },
    { name: 'bakeries', url: `${BASE_URL}/bakeries.html`, vp: { width: 1440, height: 900 } },
    { name: 'apparel', url: `${BASE_URL}/apparel-boutiques.html`, vp: { width: 1440, height: 900 } }
  ];

  const results = [];

  for (const item of pagesToAudit) {
    await page.setViewport(item.vp);
    await page.goto(item.url, { waitUntil: 'domcontentloaded', timeout: 20000 });
    await page.evaluate(() => {
      const pre = document.getElementById('priyulabs-preloader') || document.getElementById('sitePreloader');
      if (pre) pre.style.display = 'none';
    });
    await new Promise(r => setTimeout(r, 600));

    const check = await page.evaluate(() => {
      const isGlowPresent = (
        getComputedStyle(document.documentElement).getPropertyValue('--glow-green').trim() !== '' ||
        document.querySelector('.glow-btn') !== null ||
        document.querySelector('[class*="glow-btn"]') !== null
      );

      // Check primary button
      const primary = (
        document.querySelector('.btn-primary') ||
        document.querySelector('.btn-hero-primary') ||
        document.querySelector('.m-hero-cta') ||
        document.querySelector('.btn-submit-form') ||
        document.querySelector('.nav-cta') ||
        document.querySelector('.hero-cta-btn') ||
        document.querySelector('.cms-btn-primary') ||
        document.querySelector('.btn-solid-dark')
      );

      let primaryInfo = null;
      if (primary) {
        const s = getComputedStyle(primary);
        primaryInfo = {
          tag: primary.tagName,
          className: primary.className,
          bg: s.backgroundColor,
          bgImg: s.backgroundImage,
          color: s.color,
          boxShadow: s.boxShadow,
          borderRadius: s.borderRadius
        };
      }

      // Check WhatsApp button
      const waFab = document.querySelector('.cms-whatsapp-fab, #cmsWhatsappFab, .whatsapp-float');
      let waInfo = null;
      if (waFab) {
        const s = getComputedStyle(waFab);
        waInfo = {
          bg: s.backgroundColor,
          href: waFab.getAttribute('href'),
          display: s.display,
          visible: s.visibility !== 'hidden' && s.opacity !== '0'
        };
      }

      return {
        isGlowPresent,
        primaryInfo,
        waInfo
      };
    });

    const shotPath = path.join(SCREENSHOT_DIR, `${item.name}.png`);
    await page.screenshot({ path: shotPath });

    results.push({
      page: item.name,
      glowTokensPresent: check.isGlowPresent ? 'FAIL (Found)' : 'PASS (Clean)',
      primaryButtonBg: check.primaryInfo ? (check.primaryInfo.bgImg !== 'none' ? check.primaryInfo.bgImg : check.primaryInfo.bg) : 'N/A',
      primaryTextColor: check.primaryInfo ? check.primaryInfo.color : 'N/A',
      whatsAppFabGreen: check.waInfo ? (check.waInfo.bg.includes('37, 211, 102') ? 'PASS (#25D366)' : check.waInfo.bg) : 'None on page'
    });
  }

  console.table(results);
  console.log('\nConsole Errors across all test pages:', consoleErrors.length === 0 ? '0 (Clean)' : consoleErrors);

  await browser.close();
}

runAudit().catch(console.error);
