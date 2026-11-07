const puppeteer = require('puppeteer-core');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = 'http://localhost:3000';

async function runTests() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', err => {
    errors.push(err.toString());
  });

  console.log('--- STARTING FUNCTIONAL & VISUAL VERIFICATION ---');

  // Test 1: Main landing page (index.html)
  await page.goto(`${BASE_URL}/index.html`, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 800));

  // Check CSS variables on :root
  const rootVars = await page.evaluate(() => {
    const cs = getComputedStyle(document.documentElement);
    return {
      purple: cs.getPropertyValue('--glow-purple').trim(),
      pink: cs.getPropertyValue('--glow-pink').trim(),
      gradient: cs.getPropertyValue('--glow-gradient').trim(),
      shadow: cs.getPropertyValue('--glow-shadow').trim()
    };
  });
  console.log('Root CSS Tokens:', rootVars);

  // Check Main Submit Button & Hero Buttons
  const indexButtons = await page.evaluate(() => {
    const heroBtn = document.querySelector('.btn-primary') || document.querySelector('.nav-cta');
    const submitBtn = document.querySelector('#mainSubmitBtn');
    const getStyles = el => {
      if (!el) return null;
      const s = getComputedStyle(el);
      return {
        borderRadius: s.borderRadius,
        backgroundImage: s.backgroundImage,
        boxShadow: s.boxShadow,
        color: s.color,
        border: s.border
      };
    };
    return {
      hero: getStyles(heroBtn),
      submit: getStyles(submitBtn)
    };
  });
  console.log('Index button styles:', indexButtons);

  // Check form validation trigger
  const formState = await page.evaluate(() => {
    const form = document.querySelector('form');
    const submitBtn = document.querySelector('#mainSubmitBtn') || document.querySelector('button[type="submit"]');
    if (!submitBtn) return 'No submit button';
    
    // Simulate click
    submitBtn.click();
    return {
      isValid: form ? form.checkValidity() : null,
      btnDisabled: submitBtn.disabled
    };
  });
  console.log('Form validation test:', formState);

  // Check Floating WhatsApp button
  const waFab = await page.evaluate(() => {
    const fab = document.querySelector('.cms-whatsapp-fab, #cmsWhatsappFab, .whatsapp-float');
    if (!fab) return null;
    const s = getComputedStyle(fab);
    return {
      tagName: fab.tagName,
      href: fab.getAttribute('href'),
      bgColor: s.backgroundColor,
      borderRadius: s.borderRadius,
      boxShadow: s.boxShadow
    };
  });
  console.log('WhatsApp FAB check (index.html):', waFab);

  // Test 2: Complete Management System
  await page.goto(`${BASE_URL}/complete-management-system.html`, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 800));
  const cmsWaFab = await page.evaluate(() => {
    const fab = document.querySelector('.cms-whatsapp-fab, .whatsapp-float, a[href*="wa.me"]');
    if (!fab) return null;
    const s = getComputedStyle(fab);
    return {
      href: fab.getAttribute('href'),
      bgColor: s.backgroundColor,
      boxShadow: s.boxShadow
    };
  });
  console.log('WhatsApp FAB check (CMS):', cmsWaFab);

  // Test 3: Website Builder
  await page.goto(`${BASE_URL}/website-builder.html`, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 800));
  const wbBtnStyles = await page.evaluate(() => {
    const btn = document.querySelector('.btn-primary, .nav-cta');
    if (!btn) return null;
    const s = getComputedStyle(btn);
    return {
      borderRadius: s.borderRadius,
      backgroundImage: s.backgroundImage,
      boxShadow: s.boxShadow
    };
  });
  console.log('Website Builder CTA button:', wbBtnStyles);

  // Test 4: POS & Management
  await page.goto(`${BASE_URL}/pos.html`, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 800));
  const posBtnStyles = await page.evaluate(() => {
    const btn = document.querySelector('.btn-hero-primary, .nav-cta');
    const s = getComputedStyle(btn);
    return {
      borderRadius: s.borderRadius,
      backgroundImage: s.backgroundImage,
      boxShadow: s.boxShadow
    };
  });
  console.log('POS CTA button:', posBtnStyles);

  // Test 5: Digital Marketing
  await page.goto(`${BASE_URL}/digital-marketing.html`, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 800));
  const dmBtnStyles = await page.evaluate(() => {
    const btn = document.querySelector('.hero-cta-btn, .nav-cta');
    const s = getComputedStyle(btn);
    return {
      borderRadius: s.borderRadius,
      backgroundImage: s.backgroundImage,
      boxShadow: s.boxShadow
    };
  });
  console.log('Digital Marketing CTA button:', dmBtnStyles);

  // Test 6: Solutions page
  await page.goto(`${BASE_URL}/solutions.html`, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 800));
  const solBtnStyles = await page.evaluate(() => {
    const btn = document.querySelector('.btn-primary, .bdir-card-cta');
    const s = getComputedStyle(btn);
    return {
      borderRadius: s.borderRadius,
      backgroundImage: s.backgroundImage,
      boxShadow: s.boxShadow
    };
  });
  console.log('Solutions CTA button:', solBtnStyles);

  // Test 7: Vertical subpage (Bakeries)
  await page.goto(`${BASE_URL}/bakeries/index.html`, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 800));
  const bakBtnStyles = await page.evaluate(() => {
    const btn = document.querySelector('.btn-solid-dark, .nav-cta, .btn-primary');
    if (!btn) return 'Button not found';
    const s = getComputedStyle(btn);
    return {
      tagName: btn.tagName,
      className: btn.className,
      borderRadius: s.borderRadius,
      backgroundImage: s.backgroundImage,
      boxShadow: s.boxShadow,
      border: s.border,
      color: s.color
    };
  });
  console.log('Bakeries CTA button:', bakBtnStyles);

  console.log('Errors captured:', errors);

  await browser.close();
  console.log('--- ALL FUNCTIONAL CHECKS COMPLETE ---');
}

runTests().catch(err => {
  console.error('Error running test:', err);
  process.exit(1);
});
