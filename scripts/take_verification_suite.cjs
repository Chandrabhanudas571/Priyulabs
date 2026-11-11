const puppeteer = require('puppeteer-core');
const os = require('os');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'puppeteer-verify-'));
const screenshotDir = path.resolve('verification-screenshots');

if (!fs.existsSync(screenshotDir)) {
  fs.mkdirSync(screenshotDir, { recursive: true });
}

const pages = [
  { name: 'homepage', path: '/' },
  { name: 'solutions', path: '/solutions.html' },
  { name: 'pos', path: '/pos.html' },
  { name: 'complete-management-system', path: '/complete-management-system.html' },
  { name: 'website-builder', path: '/website-builder.html' },
  { name: 'grocery', path: '/grocery.html' },
  { name: 'salons-spas', path: '/salons-spas.html' }
];

const viewports = [320, 360, 390, 414, 600, 768, 1024, 1280, 1440, 1920];

async function run() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    userDataDir: userDataDir,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  const page = await browser.newPage();
  const savedScreenshots = [];
  const viewportResults = [];

  console.log('--- STEP 1: Taking Responsive Screenshots ---');
  for (const p of pages) {
    const fullUrl = `http://localhost:3000${p.path}`;

    // Desktop 1440
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(fullUrl, { waitUntil: 'networkidle2', timeout: 15000 });
    const deskPath = path.join(screenshotDir, `${p.name}-1440px.png`);
    await page.screenshot({ path: deskPath, fullPage: false });
    savedScreenshots.push(deskPath);
    console.log(`Saved: ${p.name}-1440px.png`);

    // Mobile 390
    await page.setViewport({ width: 390, height: 844 });
    await page.goto(fullUrl, { waitUntil: 'networkidle2', timeout: 15000 });
    const mobPath = path.join(screenshotDir, `${p.name}-390px.png`);
    await page.screenshot({ path: mobPath, fullPage: false });
    savedScreenshots.push(mobPath);
    console.log(`Saved: ${p.name}-390px.png`);
  }

  console.log('\n--- STEP 2: Running Multi-Viewport Programmatic Verification ---');
  for (const vpWidth of viewports) {
    await page.setViewport({ width: vpWidth, height: 800 });
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2', timeout: 15000 });

    const check = await page.evaluate((width) => {
      const scrollWidth = document.documentElement.scrollWidth;
      const innerWidth = window.innerWidth;
      const horizontalOverflow = Math.max(0, scrollWidth - innerWidth);

      // Drawer checks
      const drawer = document.querySelector('.mobile-drawer, #mobileDrawer, .m-drawer');
      const backdrop = document.querySelector('.drawer-backdrop, #drawerBackdrop, .m-drawer-backdrop');
      const hamburger = document.querySelector('.hamburger, #hamburger');

      let drawerVisible = false;
      let backdropVisible = false;
      if (drawer) {
        const style = window.getComputedStyle(drawer);
        drawerVisible = style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
      }
      if (backdrop) {
        const style = window.getComputedStyle(backdrop);
        backdropVisible = style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
      }

      // Check for stretched images
      const images = Array.from(document.querySelectorAll('img'));
      let stretchedImages = 0;
      images.forEach(img => {
        if (img.naturalWidth > 0 && img.naturalHeight > 0 && img.clientWidth > 0 && img.clientHeight > 0) {
          const naturalRatio = img.naturalWidth / img.naturalHeight;
          const displayRatio = img.clientWidth / img.clientHeight;
          const style = window.getComputedStyle(img);
          // If object-fit is not cover/contain/scale-down and ratio diverges significantly
          if (style.objectFit === 'fill' && Math.abs(naturalRatio - displayRatio) > 0.5) {
            stretchedImages++;
          }
        }
      });

      return {
        width,
        scrollWidth,
        innerWidth,
        horizontalOverflow,
        drawerVisible,
        backdropVisible,
        stretchedImages
      };
    }, vpWidth);

    viewportResults.push(check);
    console.log(`Viewport ${vpWidth}px -> Overflow: ${check.horizontalOverflow}px | DrawerVisible: ${check.drawerVisible} | BackdropVisible: ${check.backdropVisible} | StretchedImages: ${check.stretchedImages}`);
  }

  await browser.close();

  try {
    fs.rmSync(userDataDir, { recursive: true, force: true });
  } catch (e) {}

  console.log('\n=== Multi-Viewport Summary ===');
  const allPass = viewportResults.every(r => r.horizontalOverflow === 0 && !r.backdropVisible && r.stretchedImages === 0);
  console.log(`All viewports zero overflow & zero regression: ${allPass ? 'PASSED (100%)' : 'FAILED'}`);
}

run().catch(console.error);
