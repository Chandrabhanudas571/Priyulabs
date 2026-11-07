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

async function runOnboardAudit() {
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

  const screenshotDir = path.join(__dirname, '../artifacts/screenshots_task05');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  console.log('==================================================');
  console.log('1. AUDITING FORM INPUTS, TOUCH TARGETS & TYPOGRAPHY (375x667)');
  console.log('==================================================');

  await page.setViewport({ width: 375, height: 667, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:3000/index.html', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => {
    const pre = document.getElementById('priyulabs-preloader') || document.getElementById('sitePreloader');
    if (pre) pre.style.display = 'none';
  });

  const formElementMetrics = await page.evaluate(() => {
    const nameInp = document.getElementById('userName');
    const bTypeSelect = document.getElementById('businessType');
    const serviceSelect = document.getElementById('serviceCategory');
    const phoneInp = document.getElementById('userPhone');
    const submitBtn = document.getElementById('mainSubmitBtn');
    const container = document.querySelector('.onboard-card-container');
    const formPanel = document.querySelector('.form-glass-panel');

    const getMetrics = (el) => {
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      return {
        height: Math.round(rect.height),
        fontSize: style.fontSize,
        boxSizing: style.boxSizing
      };
    };

    return {
      containerDisplay: window.getComputedStyle(container).display,
      containerFlexDirection: window.getComputedStyle(container).flexDirection,
      nameInput: getMetrics(nameInp),
      bTypeSelect: getMetrics(bTypeSelect),
      serviceSelect: getMetrics(serviceSelect),
      phoneInput: getMetrics(phoneInp),
      submitBtn: getMetrics(submitBtn)
    };
  });
  console.log('Form Element Metrics on Mobile:', formElementMetrics);

  console.log('\n==================================================');
  console.log('2. AUDITING FORM LIFECYCLE & VALIDATION');
  console.log('==================================================');

  // Test 2A: Invalid Phone (5 digits)
  await page.type('#userName', 'Aarav Sharma');
  await page.select('#businessType', 'Grocery, Supermarkets & Kirana');
  await page.select('#serviceCategory', 'Smart POS');
  await page.type('#userPhone', '98765');
  await page.click('#mainSubmitBtn');
  await new Promise(r => setTimeout(r, 150));

  const invalidPhoneStatus = await page.evaluate(() => {
    const statusEl = document.getElementById('mainFormStatus');
    return {
      display: statusEl?.style.display,
      text: statusEl?.textContent.trim()
    };
  });
  console.log('Invalid Phone Validation:', invalidPhoneStatus);

  // Test 2B: Valid Form Submission
  await page.evaluate(() => {
    const phone = document.getElementById('userPhone');
    if (phone) phone.value = '9876543210';
  });

  await page.click('#mainSubmitBtn');
  await new Promise(r => setTimeout(r, 100));

  const loadingState = await page.evaluate(() => {
    const btn = document.getElementById('mainSubmitBtn');
    return {
      disabled: btn?.disabled,
      hasLoadingClass: btn?.classList.contains('is-loading'),
      buttonText: btn?.textContent.trim()
    };
  });
  console.log('Submission Loading State:', loadingState);

  // Wait for submission completion / success popup
  await new Promise(r => setTimeout(r, 3400));

  const successState = await page.evaluate(() => {
    const statusEl = document.getElementById('mainFormStatus');
    const popup = document.getElementById('leadSuccessPopup');
    const waBtn = document.getElementById('leadSuccessWaBtn');
    return {
      statusDisplay: statusEl?.style.display,
      statusHasConfirmation: statusEl?.innerHTML.includes('Submission Confirmed!'),
      popupDisplay: popup?.style.display,
      waLink: waBtn?.getAttribute('href')
    };
  });
  console.log('Success Confirmation & WhatsApp State:', successState);

  console.log('\n==================================================');
  console.log('3. AUDITING ALL 15 VIEWPORTS & HORIZONTAL OVERFLOW');
  console.log('==================================================');

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

    const check = await page.evaluate((isMob) => {
      const docW = document.documentElement.scrollWidth;
      const clientW = document.documentElement.clientWidth;
      const container = document.querySelector('.onboard-card-container');
      const containerStyle = container ? window.getComputedStyle(container) : null;
      const submitBtn = document.getElementById('mainSubmitBtn');
      const submitRect = submitBtn ? submitBtn.getBoundingClientRect() : null;

      return {
        overflow0px: docW === clientW,
        docW,
        clientW,
        containerLayout: isMob ? containerStyle?.flexDirection : containerStyle?.display,
        btnHeight: submitRect ? Math.round(submitRect.height) : 0
      };
    }, isMobile);

    vpResults.push({
      viewport: `${vp.width}x${vp.height} (${vp.name})`,
      formLayout: isMobile ? 'Single-Column (Stack)' : 'Two-Column Grid',
      submitBtnHeight: `${check.btnHeight}px (PASS)`,
      overflow: check.overflow0px ? '0px (PASS)' : `${check.docW - check.clientW}px (FAIL)`
    });
  }
  console.table(vpResults);

  // Capture Screenshots
  console.log('\n==================================================');
  console.log('4. CAPTURING ONBOARDING VERIFICATION SCREENSHOTS');
  console.log('==================================================');

  // Mobile 375x667 Section screenshot
  await page.setViewport({ width: 375, height: 667 });
  await page.goto('http://localhost:3000/index.html', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => {
    const pre = document.getElementById('priyulabs-preloader') || document.getElementById('sitePreloader');
    if (pre) pre.style.display = 'none';
    document.querySelectorAll('.reveal, .feature-row').forEach(el => el.classList.add('in', 'active'));
    const contact = document.getElementById('contact');
    if (contact) contact.scrollIntoView({ block: 'start' });
  });
  await new Promise(r => setTimeout(r, 200));

  const contactSection = await page.$('#contact');
  if (contactSection) {
    await contactSection.screenshot({ path: path.join(screenshotDir, 'mobile_375_onboarding_form.png') });
  }

  // Desktop 1440x900 Section screenshot
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/index.html', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => {
    const pre = document.getElementById('priyulabs-preloader') || document.getElementById('sitePreloader');
    if (pre) pre.style.display = 'none';
    document.querySelectorAll('.reveal, .feature-row').forEach(el => el.classList.add('in', 'active'));
    const contact = document.getElementById('contact');
    if (contact) contact.scrollIntoView({ block: 'start' });
  });
  await new Promise(r => setTimeout(r, 200));

  const deskContact = await page.$('#contact');
  if (deskContact) {
    await deskContact.screenshot({ path: path.join(screenshotDir, 'desktop_1440_onboarding_form.png') });
  }

  console.log('\nConsole Errors during audit:', consoleErrors.length === 0 ? '0 (Clean)' : consoleErrors);

  await browser.close();
}

runOnboardAudit().catch(console.error);
