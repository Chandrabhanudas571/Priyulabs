const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const puppeteer = require('puppeteer-core');

const ROOT_DIR = path.resolve(__dirname, '..');
const PORT = 3002;
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

function startServer() {
  const server = http.createServer((req, res) => {
    let reqUrl = new URL(req.url, `http://localhost:${PORT}`);
    let filePath = path.join(ROOT_DIR, decodeURIComponent(reqUrl.pathname));

    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }

    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      return serveFile(filePath, res);
    }

    if (fs.existsSync(filePath + '.html') && fs.statSync(filePath + '.html').isFile()) {
      return serveFile(filePath + '.html', res);
    }

    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  });

  function serveFile(fp, res) {
    const ext = path.extname(fp).toLowerCase();
    const mimeTypes = {
      '.html': 'text/html; charset=utf-8',
      '.css': 'text/css; charset=utf-8',
      '.js': 'application/javascript; charset=utf-8',
      '.json': 'application/json; charset=utf-8',
      '.svg': 'image/svg+xml',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.webp': 'image/webp',
      '.mp4': 'video/mp4'
    };
    const contentType = mimeTypes[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(fp).pipe(res);
  }

  return new Promise((resolve) => {
    server.listen(PORT, () => {
      console.log(`[Server] Running at http://localhost:${PORT}/`);
      resolve(server);
    });
  });
}

async function runTests() {
  const server = await startServer();
  const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'puppeteer-hero-'));

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    userDataDir,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  const screenshotDir = path.join(ROOT_DIR, 'test-artifacts', 'hero-redesign');
  if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

  const results = { checks: [], screenshots: [] };

  try {
    const page = await browser.newPage();

    const viewports = [
      { name: '360px', width: 360, height: 740 },
      { name: '390px', width: 390, height: 844 },
      { name: '430px', width: 430, height: 932 },
      { name: '1280px', width: 1280, height: 800 }
    ];

    for (const vp of viewports) {
      console.log(`\n--- Testing Hero at ${vp.name} (${vp.width}x${vp.height}) ---`);
      await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 2 });
      await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'domcontentloaded' });
      await new Promise(r => setTimeout(r, 600));

      // 1. Horizontal scroll check
      const scrollMetrics = await page.evaluate(() => ({
        docScrollWidth: document.documentElement.scrollWidth,
        bodyScrollWidth: document.body.scrollWidth,
        windowInnerWidth: window.innerWidth
      }));
      const hasNoHScroll = scrollMetrics.docScrollWidth <= scrollMetrics.windowInnerWidth &&
                           scrollMetrics.bodyScrollWidth <= scrollMetrics.windowInnerWidth;
      results.checks.push({
        test: `[${vp.name}] No horizontal scroll (doc: ${scrollMetrics.docScrollWidth}px <= win: ${scrollMetrics.windowInnerWidth}px)`,
        pass: hasNoHScroll
      });

      // 2. Video Card & Chips Metrics
      const heroMetrics = await page.evaluate(() => {
        const hero = document.querySelector('.hero-redesign');
        const headline = document.querySelector('.hero-headline');
        const videoCard = document.querySelector('.hero-video-card');
        const video = document.querySelector('.hero-video-player');
        const chipTL = document.querySelector('.chip-top-left');
        const chipBR = document.querySelector('.chip-bottom-right');
        const stickyBar = document.querySelector('.hero-sticky-bar');
        const waFab = document.querySelector('#cmsWhatsappFab, .cms-whatsapp-fab');

        const heroStyle = hero ? window.getComputedStyle(hero) : null;
        const cardStyle = videoCard ? window.getComputedStyle(videoCard) : null;
        const stickyStyle = stickyBar ? window.getComputedStyle(stickyBar) : null;
        const waFabStyle = waFab ? window.getComputedStyle(waFab) : null;

        const cardRect = videoCard ? videoCard.getBoundingClientRect() : null;
        const chipTLRect = chipTL ? chipTL.getBoundingClientRect() : null;
        const chipBRRect = chipBR ? chipBR.getBoundingClientRect() : null;

        return {
          heroBg: heroStyle?.backgroundColor,
          headlineText: headline?.innerText?.trim(),
          cardBorderRadius: cardStyle?.borderRadius,
          cardBorder: cardStyle?.border,
          videoExists: !!video,
          cardWidth: cardRect?.width,
          chipTLText: chipTL?.innerText?.trim(),
          chipBRText: chipBR?.innerText?.trim(),
          chipTLTop: chipTLRect?.top,
          cardTop: cardRect?.top,
          chipBRBottom: chipBRRect?.bottom,
          cardBottom: cardRect?.bottom,
          stickyBarDisplay: stickyStyle?.display,
          stickyBarPosition: stickyStyle?.position,
          waFabVisible: waFabStyle ? (waFabStyle.display !== 'none' && waFabStyle.visibility !== 'hidden') : false
        };
      });

      console.log(`[${vp.name}] Hero metrics:`, heroMetrics);

      // Verify layout specifics
      if (vp.width <= 430) {
        results.checks.push({
          test: `[${vp.name}] Video card has border-radius 24px`,
          pass: heroMetrics.cardBorderRadius === '24px'
        });
        results.checks.push({
          test: `[${vp.name}] Top-Left stat chip overlaps card edge`,
          pass: heroMetrics.chipTLTop < heroMetrics.cardTop && heroMetrics.chipTLText.includes('100+')
        });
        results.checks.push({
          test: `[${vp.name}] Bottom-Right stat chip overlaps card edge`,
          pass: heroMetrics.chipBRBottom > heroMetrics.cardBottom && heroMetrics.chipBRText.includes('99.9%')
        });
        results.checks.push({
          test: `[${vp.name}] Sticky bottom bar is visible and fixed`,
          pass: heroMetrics.stickyBarDisplay !== 'none' && heroMetrics.stickyBarPosition === 'fixed'
        });
        results.checks.push({
          test: `[${vp.name}] Old floating WhatsApp button is removed/hidden`,
          pass: !heroMetrics.waFabVisible
        });
      } else {
        // Desktop check
        results.checks.push({
          test: `[${vp.name}] Card max-width centered (~960px)`,
          pass: heroMetrics.cardWidth <= 965
        });
        results.checks.push({
          test: `[${vp.name}] Sticky bar hidden on desktop (inline actions used)`,
          pass: heroMetrics.stickyBarDisplay === 'none'
        });
      }

      // Take screenshot of hero
      const ssPath = path.join(screenshotDir, `hero_${vp.name}.png`);
      await page.screenshot({ path: ssPath, fullPage: false });
      results.screenshots.push(`hero_${vp.name}.png`);
      console.log(`✓ Saved screenshot: hero_${vp.name}.png`);
    }

    // TEST: Prefers-reduced-motion check
    console.log('\n--- Testing Prefers-Reduced-Motion ---');
    await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
    const motionMetrics = await page.evaluate(() => {
      const chip = document.querySelector('.chip-top-left');
      const style = window.getComputedStyle(chip);
      return style.animationName;
    });
    results.checks.push({
      test: 'prefers-reduced-motion disables chip animation',
      pass: motionMetrics === 'none' || motionMetrics === ''
    });
    console.log('Reduced motion animationName:', motionMetrics);

  } finally {
    await browser.close();
    server.close();
    console.log('\n[Server] Closed successfully.');
  }

  console.log('\n================ TEST SUMMARY ================');
  let allPassed = true;
  for (let c of results.checks) {
    console.log(`${c.pass ? '✓ PASS' : '✗ FAIL'}: ${c.test}`);
    if (!c.pass) allPassed = false;
  }
  console.log(`\nScreenshots saved in test-artifacts/hero-redesign: ${results.screenshots.join(', ')}`);
  console.log('==============================================\n');

  if (!allPassed) {
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
