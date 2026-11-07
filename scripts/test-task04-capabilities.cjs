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

async function runCapabilitiesAudit() {
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
  console.log('1. AUDITING CORE CAPABILITIES VERTICAL ORDER & CTAS');
  console.log('==================================================');

  await page.setViewport({ width: 375, height: 667, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:3000/index.html', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => {
    const pre = document.getElementById('priyulabs-preloader') || document.getElementById('sitePreloader');
    if (pre) pre.style.display = 'none';
    document.querySelectorAll('.reveal, .feature-row').forEach(el => el.classList.add('in', 'active'));
  });

  const capabilitiesReport = await page.evaluate(() => {
    const rows = Array.from(document.querySelectorAll('.feature-row'));
    return rows.map((row, i) => {
      const textEl = row.querySelector('.feature-text');
      const mediaEl = row.querySelector('.feature-media');
      const title = textEl?.querySelector('h3')?.textContent.trim();
      const link = textEl?.querySelector('a');
      const linkHref = link?.getAttribute('href');
      const linkRect = link?.getBoundingClientRect();
      const textRect = textEl?.getBoundingClientRect();
      const mediaRect = mediaEl?.getBoundingClientRect();

      const textStyle = textEl ? window.getComputedStyle(textEl) : null;
      const mediaStyle = mediaEl ? window.getComputedStyle(mediaEl) : null;

      const isTextAboveMedia = mediaRect && textRect ? mediaRect.top >= textRect.bottom - 5 : false;

      return {
        item: `0${i+1} / ${title}`,
        ctaHref: linkHref,
        ctaHeight: linkRect ? Math.round(linkRect.height) : 0,
        textOrder: textStyle?.order,
        mediaOrder: mediaStyle?.order,
        isVerticalStorytelling: isTextAboveMedia,
        status: isTextAboveMedia && (linkRect?.height >= 44) ? 'PASS' : 'FAIL'
      };
    });
  });
  console.table(capabilitiesReport);

  console.log('\n==================================================');
  console.log('2. AUDITING ALL 15 VIEWPORTS & OVERFLOW CHECK');
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

    const rowMetrics = await page.evaluate((isMob) => {
      const rows = Array.from(document.querySelectorAll('.feature-row'));
      const docW = document.documentElement.scrollWidth;
      const clientW = document.documentElement.clientWidth;
      const noOverflow = docW === clientW;

      let allValid = true;
      for (const row of rows) {
        const textEl = row.querySelector('.feature-text');
        const mediaEl = row.querySelector('.feature-media');
        const textRect = textEl.getBoundingClientRect();
        const mediaRect = mediaEl.getBoundingClientRect();

        if (isMob) {
          // On mobile, media must be below text
          if (mediaRect.top < textRect.top) {
            allValid = false;
          }
        }
      }

      return {
        noOverflow,
        allValid,
        docW,
        clientW
      };
    }, isMobile);

    vpResults.push({
      viewport: `${vp.width}x${vp.height} (${vp.name})`,
      layoutType: isMobile ? 'Single-Column (Text -> Media)' : 'Two-Column Grid',
      verticalOrder: rowMetrics.allValid ? 'PASS' : 'FAIL',
      overflow: rowMetrics.noOverflow ? '0px (PASS)' : `${rowMetrics.docW - rowMetrics.clientW}px (FAIL)`
    });
  }
  console.table(vpResults);

  // Capture Section Screenshots
  console.log('\n==================================================');
  console.log('3. CAPTURING CAPABILITIES VERIFICATION SCREENSHOTS');
  console.log('==================================================');

  // Mobile 375x667 Section screenshot
  await page.setViewport({ width: 375, height: 667 });
  await page.goto('http://localhost:3000/index.html', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => {
    const pre = document.getElementById('priyulabs-preloader') || document.getElementById('sitePreloader');
    if (pre) pre.style.display = 'none';
    document.querySelectorAll('.reveal, .feature-row').forEach(el => el.classList.add('in', 'active'));
  });
  const mobileSol = await page.$('#solutions');
  if (mobileSol) {
    await mobileSol.screenshot({ path: path.join(screenshotDir, 'mobile_375_solutions_vertical.png') });
  }

  // Desktop 1440x900 Section screenshot
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/index.html', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => {
    const pre = document.getElementById('priyulabs-preloader') || document.getElementById('sitePreloader');
    if (pre) pre.style.display = 'none';
    document.querySelectorAll('.reveal, .feature-row').forEach(el => el.classList.add('in', 'active'));
  });
  const deskSol = await page.$('#solutions');
  if (deskSol) {
    await deskSol.screenshot({ path: path.join(screenshotDir, 'desktop_1440_solutions_grid.png') });
  }

  console.log('\nConsole Errors during audit:', consoleErrors.length === 0 ? '0 (Clean)' : consoleErrors);

  await browser.close();
}

runCapabilitiesAudit().catch(console.error);
