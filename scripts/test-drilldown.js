/**
 * Automated Puppeteer test suite for PriyuLabs 3-level drawer drill-down,
 * dynamic sector & solution pages, and responsive mobile viewports.
 */
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const PORT = 8089;
const ROOT_DIR = path.resolve(__dirname, '..');

// Simple static HTTP server with proper MIME types
function startServer() {
  const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.webp': 'image/webp',
    '.xml': 'application/xml'
  };

  const server = http.createServer((req, res) => {
    let reqPath = decodeURI(req.url.split('?')[0]);
    if (reqPath === '/') reqPath = '/index.html';

    let filePath = path.join(ROOT_DIR, reqPath);
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }

    if (!fs.existsSync(filePath)) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  });

  return new Promise((resolve) => {
    server.listen(PORT, () => {
      console.log(`✓ Test HTTP server listening on http://localhost:${PORT}`);
      resolve(server);
    });
  });
}

async function runTests() {
  const server = await startServer();
  let browser;

  try {
    browser = await puppeteer.launch({
      executablePath: CHROME_PATH,
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 393, height: 852, isMobile: true, hasTouch: true });

    console.log('\n--- 1. Testing Homepage & Drawer Level 1 ---');
    await page.goto(`http://localhost:${PORT}/index.html`, { waitUntil: 'domcontentloaded' });

    // Suppress preloader if present
    await page.evaluate(() => {
      const p = document.getElementById('priyulabsIntroPreloader') || document.getElementById('priyulabs-preloader');
      if (p) p.style.display = 'none';
      if (window.__plDismissPreloader) window.__plDismissPreloader();
    });

    // Open Drawer
    await page.evaluate(() => {
      if (window.openMobileNav) window.openMobileNav();
    });
    await new Promise(r => setTimeout(r, 400));

    // Verify Drawer is open
    const isDrawerOpen = await page.evaluate(() => {
      const drawer = document.getElementById('mobileDrawer');
      return drawer && (drawer.classList.contains('is-open') || drawer.classList.contains('open'));
    });
    console.log(`Drawer open: ${isDrawerOpen ? 'PASS' : 'FAIL'}`);

    // Verify 4 items in Level 1
    const level1Items = await page.evaluate(() => {
      const p1 = document.getElementById('mDrillPanel1');
      return Array.from(p1.querySelectorAll('.m-drawer-link')).map(el => el.innerText.trim().replace(/\s*→\s*$/, ''));
    });
    console.log('Level 1 items:', level1Items);

    await page.screenshot({ path: path.join(__dirname, 'screenshot-level-1.png') });
    console.log('✓ Screenshot saved: screenshot-level-1.png');

    console.log('\n--- 2. Testing Drill-Down Level 2 (Business Types) ---');
    await page.evaluate(() => {
      window.mDrillGoLevel2('business-types', 'Business Types');
    });
    await new Promise(r => setTimeout(r, 350));

    const level2Btypes = await page.evaluate(() => {
      const title = document.getElementById('mDrillTitleLevel2').textContent.trim();
      const group = document.getElementById('mDrillGroup-categories-business-types');
      const cats = Array.from(group.querySelectorAll('button')).map(b => b.innerText.trim().replace(/\s*→\s*$/, ''));
      return { title, cats };
    });
    console.log('Level 2 Title:', level2Btypes.title);
    console.log('Level 2 Categories:', level2Btypes.cats);

    await page.screenshot({ path: path.join(__dirname, 'screenshot-level-2-btypes.png') });
    console.log('✓ Screenshot saved: screenshot-level-2-btypes.png');

    console.log('\n--- 3. Testing Drill-Down Level 3 (Food & Beverage) ---');
    await page.evaluate(() => {
      window.mDrillGoLevel3('business-types', 'food-beverage', 'Food & Beverage');
    });
    await new Promise(r => setTimeout(r, 350));

    const level3Fnb = await page.evaluate(() => {
      const title = document.getElementById('mDrillTitleLevel3').textContent.trim();
      const group = document.getElementById('mDrillGroup-business-types-food-beverage');
      const sectors = Array.from(group.querySelectorAll('a')).map(a => ({
        title: a.innerText.trim().replace(/\s*→\s*$/, ''),
        href: a.getAttribute('href')
      }));
      return { title, sectors };
    });
    console.log('Level 3 Title:', level3Fnb.title);
    console.log('Level 3 Sectors:', level3Fnb.sectors);

    await page.screenshot({ path: path.join(__dirname, 'screenshot-level-3-fnb.png') });
    console.log('✓ Screenshot saved: screenshot-level-3-fnb.png');

    console.log('\n--- 4. Testing Back Navigation: Level 3 -> Level 2 -> Level 1 ---');
    await page.evaluate(() => {
      window.mDrillGoBack(2);
    });
    await new Promise(r => setTimeout(r, 300));
    const backTrackPos2 = await page.evaluate(() => document.getElementById('mDrillTrack').style.transform);
    console.log('Track at Level 2:', backTrackPos2);

    await page.evaluate(() => {
      window.mDrillGoBack(1);
    });
    await new Promise(r => setTimeout(r, 300));
    const backTrackPos1 = await page.evaluate(() => document.getElementById('mDrillTrack').style.transform);
    console.log('Track at Level 1:', backTrackPos1);

    console.log('\n--- 5. Testing Drill-Down Level 2 & 3 (Solutions) ---');
    await page.evaluate(() => {
      window.mDrillGoLevel2('solutions', 'Solutions');
    });
    await new Promise(r => setTimeout(r, 300));

    const level2Sol = await page.evaluate(() => {
      const title = document.getElementById('mDrillTitleLevel2').textContent.trim();
      const group = document.getElementById('mDrillGroup-categories-solutions');
      const cats = Array.from(group.querySelectorAll('button')).map(b => b.innerText.trim().replace(/\s*→\s*$/, ''));
      return { title, cats };
    });
    console.log('Solutions Categories:', level2Sol.cats);

    await page.evaluate(() => {
      window.mDrillGoLevel3('solutions', 'billing-pos', 'Billing & POS');
    });
    await new Promise(r => setTimeout(r, 300));

    const level3Pos = await page.evaluate(() => {
      const title = document.getElementById('mDrillTitleLevel3').textContent.trim();
      const group = document.getElementById('mDrillGroup-solutions-billing-pos');
      const items = Array.from(group.querySelectorAll('a')).map(a => ({
        title: a.innerText.trim().replace(/\s*→\s*$/, ''),
        href: a.getAttribute('href')
      }));
      return { title, items };
    });
    console.log('Billing & POS Items:', level3Pos.items);

    await page.screenshot({ path: path.join(__dirname, 'screenshot-level-3-solutions.png') });
    console.log('✓ Screenshot saved: screenshot-level-3-solutions.png');

    console.log('\n--- 6. Testing Sector Page: /business-types/food-beverage/cafe ---');
    await page.goto(`http://localhost:${PORT}/business-types/food-beverage/cafe`, { waitUntil: 'domcontentloaded' });
    const cafePageData = await page.evaluate(() => {
      const title = document.title;
      const h1 = document.querySelector('h1') ? document.querySelector('h1').innerText.trim() : '';
      const breadcrumb = document.querySelector('.dyn-breadcrumb') ? document.querySelector('.dyn-breadcrumb').innerText.replace(/\s+/g, ' ').trim() : '';
      const probCount = document.querySelectorAll('.dyn-prob-card').length;
      const featCount = document.querySelectorAll('.dyn-feat-card').length;
      const faqCount = document.querySelectorAll('.dyn-faq-item').length;
      const hasFab = !!document.getElementById('cmsWhatsappFab');
      return { title, h1, breadcrumb, probCount, featCount, faqCount, hasFab };
    });
    console.log('Cafe Page Verification:', cafePageData);

    await page.screenshot({ path: path.join(__dirname, 'screenshot-sector-cafe.png') });
    console.log('✓ Screenshot saved: screenshot-sector-cafe.png');

    console.log('\n--- 7. Testing Solution Page: /solutions/billing-pos/smart-pos ---');
    await page.goto(`http://localhost:${PORT}/solutions/billing-pos/smart-pos`, { waitUntil: 'domcontentloaded' });
    const solPageData = await page.evaluate(() => {
      const title = document.title;
      const h1 = document.querySelector('h1') ? document.querySelector('h1').innerText.trim() : '';
      const breadcrumb = document.querySelector('.dyn-breadcrumb') ? document.querySelector('.dyn-breadcrumb').innerText.replace(/\s+/g, ' ').trim() : '';
      const probCount = document.querySelectorAll('.dyn-prob-card').length;
      const featCount = document.querySelectorAll('.dyn-feat-card').length;
      const faqCount = document.querySelectorAll('.dyn-faq-item').length;
      const hasFab = !!document.getElementById('cmsWhatsappFab');
      return { title, h1, breadcrumb, probCount, featCount, faqCount, hasFab };
    });
    console.log('Smart POS Solution Verification:', solPageData);

    await page.screenshot({ path: path.join(__dirname, 'screenshot-solution-pos.png') });
    console.log('✓ Screenshot saved: screenshot-solution-pos.png');

    console.log('\n--- 8. Testing Responsive Viewports (360px, 393px, 430px) ---');
    const viewports = [360, 393, 430];
    for (const width of viewports) {
      await page.setViewport({ width, height: 800, isMobile: true });
      await page.goto(`http://localhost:${PORT}/index.html`, { waitUntil: 'domcontentloaded' });
      await page.evaluate(() => {
        const p = document.getElementById('priyulabsIntroPreloader') || document.getElementById('priyulabs-preloader');
        if (p) p.style.display = 'none';
      });

      const overflow = await page.evaluate(() => {
        return {
          windowWidth: window.innerWidth,
          bodyScrollWidth: document.body.scrollWidth,
          htmlScrollWidth: document.documentElement.scrollWidth,
          hasOverflow: document.body.scrollWidth > window.innerWidth
        };
      });
      console.log(`Viewport ${width}px overflow check:`, overflow.hasOverflow ? 'FAILED (has overflow)' : 'PASSED (no overflow)');
    }

    console.log('\n🎉 ALL AUTOMATED TESTS COMPLETED SUCCESSFULLY!');
  } catch (err) {
    console.error('Test failed with error:', err);
    process.exitCode = 1;
  } finally {
    if (browser) await browser.close();
    server.close();
  }
}

runTests();
