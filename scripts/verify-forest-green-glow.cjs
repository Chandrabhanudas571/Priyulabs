const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = 'http://localhost:3000';
const SCREENSHOT_DIR = path.join(__dirname, '../scratch/qa_forest_glow');

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function runTests() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', err => errors.push(err.toString()));

  console.log('=== STARTING PRIYULABS FOREST GREEN GLOW BUTTON QA ===');

  // 1. Verify index.html desktop
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`${BASE_URL}/index.html`, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 800));

  const indexRootVars = await page.evaluate(() => {
    const cs = getComputedStyle(document.documentElement);
    return {
      glowGreen: cs.getPropertyValue('--glow-green').trim(),
      gradient: cs.getPropertyValue('--glow-gradient').trim(),
      shadow: cs.getPropertyValue('--glow-shadow').trim()
    };
  });
  console.log('Index Root Tokens:', indexRootVars);

  const indexButtons = await page.evaluate(() => {
    const primary = document.querySelector('.btn-primary') || document.querySelector('.nav-cta');
    const secondary = document.querySelector('.btn-ghost') || document.querySelector('.nav-cta-ghost');
    const submit = document.querySelector('#mainSubmitBtn');

    const getStyles = el => {
      if (!el) return null;
      const s = getComputedStyle(el);
      return {
        tagName: el.tagName,
        className: el.className,
        borderRadius: s.borderRadius,
        backgroundImage: s.backgroundImage,
        backgroundColor: s.backgroundColor,
        color: s.color,
        border: s.border,
        boxShadow: s.boxShadow
      };
    };

    return {
      primary: getStyles(primary),
      secondary: getStyles(secondary),
      submit: getStyles(submit)
    };
  });
  console.log('Index Button Styles:', JSON.stringify(indexButtons, null, 2));

  // Hover test on secondary button
  const secondaryHover = await page.evaluate(async () => {
    const sec = document.querySelector('.btn-ghost') || document.querySelector('.nav-cta-ghost');
    if (!sec) return null;
    sec.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    await new Promise(r => setTimeout(r, 100));
    const s = getComputedStyle(sec);
    return {
      color: s.color,
      backgroundColor: s.backgroundColor,
      borderColor: s.borderColor,
      boxShadow: s.boxShadow
    };
  });
  console.log('Secondary Button Hover Test:', secondaryHover);

  // Check floating WhatsApp button on index.html
  const indexWa = await page.evaluate(() => {
    const fab = document.querySelector('.cms-whatsapp-fab, #cmsWhatsappFab');
    if (!fab) return null;
    const s = getComputedStyle(fab);
    return {
      href: fab.getAttribute('href'),
      bgColor: s.backgroundColor,
      borderRadius: s.borderRadius,
      boxShadow: s.boxShadow
    };
  });
  console.log('Index WhatsApp Button:', indexWa);

  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '01_index_desktop.png') });

  // Mobile viewport test
  await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
  await page.reload({ waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 800));

  const mobileHeroBtn = await page.evaluate(() => {
    const btn = document.querySelector('.m-hero-cta') || document.querySelector('.btn-primary');
    if (!btn) return null;
    const s = getComputedStyle(btn);
    return {
      borderRadius: s.borderRadius,
      backgroundImage: s.backgroundImage,
      color: s.color,
      boxShadow: s.boxShadow
    };
  });
  console.log('Mobile Hero Button:', mobileHeroBtn);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '01_index_mobile.png') });

  // 2. Complete Management System
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`${BASE_URL}/complete-management-system.html`, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 800));

  const cmsButtons = await page.evaluate(() => {
    const primary = document.querySelector('.cms-btn-primary') || document.querySelector('.nav-cta');
    const secondary = document.querySelector('.nav-cta-ghost') || document.querySelector('.btn-demo-nav');
    const sPri = primary ? getComputedStyle(primary) : null;
    const sSec = secondary ? getComputedStyle(secondary) : null;
    return {
      primary: sPri ? { borderRadius: sPri.borderRadius, bgImg: sPri.backgroundImage, shadow: sPri.boxShadow } : null,
      secondary: sSec ? { borderRadius: sSec.borderRadius, bg: sSec.backgroundColor, color: sSec.color, border: sSec.border } : null
    };
  });
  console.log('CMS Buttons:', cmsButtons);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '02_cms_desktop.png') });

  // 3. Website Builder
  await page.goto(`${BASE_URL}/website-builder.html`, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 800));
  const wbButtons = await page.evaluate(() => {
    const primary = document.querySelector('.btn-primary') || document.querySelector('.nav-cta');
    const s = getComputedStyle(primary);
    return { borderRadius: s.borderRadius, bgImg: s.backgroundImage, shadow: s.boxShadow };
  });
  console.log('Website Builder Primary:', wbButtons);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '03_wb_desktop.png') });

  // 4. POS & Management
  await page.goto(`${BASE_URL}/pos.html`, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 800));
  const posButtons = await page.evaluate(() => {
    const primary = document.querySelector('.btn-hero-primary') || document.querySelector('.nav-cta');
    const secondary = document.querySelector('.btn-hero-secondary') || document.querySelector('.nav-cta-ghost');
    const sPri = getComputedStyle(primary);
    const sSec = getComputedStyle(secondary);
    return {
      primary: { borderRadius: sPri.borderRadius, bgImg: sPri.backgroundImage, shadow: sPri.boxShadow },
      secondary: { borderRadius: sSec.borderRadius, bg: sSec.backgroundColor, color: sSec.color, border: sSec.border }
    };
  });
  console.log('POS Buttons:', posButtons);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '04_pos_desktop.png') });

  // 5. Digital Marketing
  await page.goto(`${BASE_URL}/digital-marketing.html`, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 800));
  const dmButtons = await page.evaluate(() => {
    const primary = document.querySelector('.hero-cta-btn') || document.querySelector('.nav-cta');
    const secondary = document.querySelector('.hero-wa-pill-btn') || document.querySelector('.nav-cta-ghost');
    const sPri = getComputedStyle(primary);
    const sSec = getComputedStyle(secondary);
    return {
      primary: { borderRadius: sPri.borderRadius, bgImg: sPri.backgroundImage, shadow: sPri.boxShadow },
      secondary: { borderRadius: sSec.borderRadius, bg: sSec.backgroundColor, color: sSec.color, border: sSec.border }
    };
  });
  console.log('Digital Marketing Buttons:', dmButtons);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '05_dm_desktop.png') });

  // 6. Solutions Page
  await page.goto(`${BASE_URL}/solutions.html`, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 800));
  const solButtons = await page.evaluate(() => {
    const primary = document.querySelector('.bdir-card-cta') || document.querySelector('.btn-primary');
    const s = getComputedStyle(primary);
    return { borderRadius: s.borderRadius, bgImg: s.backgroundImage, shadow: s.boxShadow };
  });
  console.log('Solutions Button:', solButtons);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '06_solutions_desktop.png') });

  // 7. Subpage: Bakeries
  await page.goto(`${BASE_URL}/bakeries/index.html`, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 800));
  const bakButtons = await page.evaluate(() => {
    const primary = document.querySelector('.btn-solid-dark') || document.querySelector('.btn-primary');
    const secondary = document.querySelector('.btn-outline-clean') || document.querySelector('.clean-nav-link');
    const sPri = getComputedStyle(primary);
    const sSec = secondary ? getComputedStyle(secondary) : null;
    return {
      primary: { borderRadius: sPri.borderRadius, bgImg: sPri.backgroundImage, shadow: sPri.boxShadow },
      secondary: sSec ? { borderRadius: sSec.borderRadius, bg: sSec.backgroundColor, color: sSec.color, border: sSec.border } : null
    };
  });
  console.log('Bakeries Subpage Button:', bakButtons);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '07_bakeries_desktop.png') });

  console.log('Runtime errors captured:', errors);
  await browser.close();
  console.log('=== VERIFICATION COMPLETED SUCCESSFULLY ===');
}

runTests().catch(err => {
  console.error('Test run failed:', err);
  process.exit(1);
});
