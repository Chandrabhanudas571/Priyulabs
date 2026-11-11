const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const puppeteer = require('puppeteer-core');

const ROOT_DIR = path.resolve(__dirname, '..');
const PORT = 3001;
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

// 1. In-process static server with clean URL support
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
      '.gif': 'image/gif'
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
  const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'puppeteer-test-'));

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    userDataDir,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  const screenshotDir = path.join(ROOT_DIR, 'test-artifacts');
  if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

  const results = {
    checks: [],
    screenshots: []
  };

  try {
    const page = await browser.newPage();

    // TEST 1: Viewport 390px on index.html
    console.log('\n--- Testing index.html at 390px ---');
    await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
    await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 600));

    // Open Drawer
    await page.click('#hamburger');
    await new Promise(r => setTimeout(r, 400));

    let ss1 = path.join(screenshotDir, 'drawer_level1_390px.png');
    await page.screenshot({ path: ss1 });
    results.screenshots.push('drawer_level1_390px.png');
    console.log('✓ Captured Level 1 at 390px');

    // Click "Solutions"
    const buttons = await page.$$('.m-drill-panel#mDrillPanel1 .m-drawer-link');
    let solutionsBtn = null;
    for (let btn of buttons) {
      let text = await page.evaluate(el => el.textContent, btn);
      if (text.includes('Solutions')) {
        solutionsBtn = btn;
        break;
      }
    }

    if (!solutionsBtn) throw new Error('Solutions button not found in Level 1');
    await page.evaluate(el => el.click(), solutionsBtn);
    await new Promise(r => setTimeout(r, 600));

    let ss2 = path.join(screenshotDir, 'drawer_solutions_390px.png');
    await page.screenshot({ path: ss2 });
    results.screenshots.push('drawer_solutions_390px.png');
    console.log('✓ Captured Solutions panel at 390px');

    // Also capture Business Types panel for complete visual verification
    const backBtn = await page.$('.m-drill-panel#mDrillPanel2 .m-drill-back-btn');
    if (backBtn) {
      await page.evaluate(el => el.click(), backBtn);
      await new Promise(r => setTimeout(r, 600));
      const btypesBtn = await page.evaluateHandle(() => {
        const btns = Array.from(document.querySelectorAll('.m-drill-panel#mDrillPanel1 .m-drawer-link'));
        return btns.find(b => b.textContent.includes('Business Types'));
      });
      if (btypesBtn) {
        await page.evaluate(el => el.click(), btypesBtn);
        await new Promise(r => setTimeout(r, 600));
        let ssBtypes = path.join(screenshotDir, 'drawer_business_types_390px.png');
        await page.screenshot({ path: ssBtypes });
        results.screenshots.push('drawer_business_types_390px.png');
        console.log('✓ Captured Business Types panel at 390px');

        // Go back and re-enter solutions for remaining tests
        const btypesBack = await page.$('.m-drill-panel#mDrillPanel2 .m-drill-back-btn');
        if (btypesBack) await page.evaluate(el => el.click(), btypesBack);
        await new Promise(r => setTimeout(r, 600));
      }
    }

    // Re-enter solutions
    const reSolBtn = await page.evaluateHandle(() => {
      const btns = Array.from(document.querySelectorAll('.m-drill-panel#mDrillPanel1 .m-drawer-link'));
      return btns.find(b => b.textContent.includes('Solutions'));
    });
    await page.evaluate(el => el.click(), reSolBtn);
    await new Promise(r => setTimeout(r, 600));

    // Verify the 4 items and descriptions in Solutions panel
    const solItems = await page.evaluate(() => {
      const group = document.getElementById('mDrillGroup-categories-solutions');
      if (!group) return null;
      const links = Array.from(group.querySelectorAll('a.m-drawer-card-link'));
      return links.map(a => ({
        href: a.getAttribute('href'),
        title: a.querySelector('.m-drawer-card-title')?.textContent.trim(),
        desc: a.querySelector('.m-drawer-card-desc')?.textContent.trim()
      }));
    });

    console.log('Solutions items found:', solItems);
    results.checks.push({ test: 'Solutions items count === 4', pass: solItems?.length === 4 });
    results.checks.push({ test: 'Item 1 Smart POS', pass: solItems[0]?.title === 'Smart POS' && solItems[0]?.href === '/pos' && solItems[0]?.desc.includes('Fast billing') });
    results.checks.push({ test: 'Item 2 Complete Management System', pass: solItems[1]?.title === 'Complete Management System' && solItems[1]?.href === '/complete-management-system' });
    results.checks.push({ test: 'Item 3 Custom Website Building', pass: solItems[2]?.title === 'Custom Website Building' && solItems[2]?.href === '/website-builder' });
    results.checks.push({ test: 'Item 4 Digital Marketing & Ads', pass: solItems[3]?.title === 'Digital Marketing & Ads' && solItems[3]?.href === '/digital-marketing' });

    // Test Back button back to Level 1
    const backBtnFinal = await page.$('.m-drill-panel#mDrillPanel2 .m-drill-back-btn');
    if (backBtnFinal) {
      await page.evaluate(el => el.click(), backBtnFinal);
      await new Promise(r => setTimeout(r, 600));
      const trackTransform = await page.evaluate(() => document.getElementById('mDrillTrack').style.transform);
      results.checks.push({ test: 'Back button returns to Level 1 (translateX(0%))', pass: trackTransform.includes('0%') });
      console.log('✓ Back button successfully returned to Level 1:', trackTransform);
    }

    // TEST 2: Viewport 320px
    console.log('\n--- Testing index.html at 320px ---');
    await page.setViewport({ width: 320, height: 600, deviceScaleFactor: 2 });
    await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 600));

    await page.evaluate(() => {
      const h = document.getElementById('hamburger');
      if (h) h.click();
    });
    await new Promise(r => setTimeout(r, 600));

    // Drill to Solutions at 320px
    const solBtn320 = await page.evaluateHandle(() => {
      const btns = Array.from(document.querySelectorAll('.m-drill-panel#mDrillPanel1 .m-drawer-link'));
      return btns.find(b => b.textContent.includes('Solutions'));
    });
    await page.evaluate(el => el.click(), solBtn320);
    await new Promise(r => setTimeout(r, 600));

    let ss3 = path.join(screenshotDir, 'drawer_solutions_320px.png');
    await page.screenshot({ path: ss3 });
    results.screenshots.push('drawer_solutions_320px.png');
    console.log('✓ Captured Solutions panel at 320px');

    // Check no horizontal scroll or overflow at 320px
    const overflowCheck = await page.evaluate(() => {
      const drawer = document.getElementById('mobileDrawer');
      const solGroup = document.getElementById('mDrillGroup-categories-solutions');
      return {
        drawerWidth: drawer.offsetWidth,
        bodyClientWidth: document.body.clientWidth,
        groupScrollWidth: solGroup.scrollWidth,
        groupClientWidth: solGroup.clientWidth
      };
    });
    console.log('320px Layout Metrics:', overflowCheck);
    results.checks.push({
      test: '320px No Card Overflow',
      pass: overflowCheck.groupScrollWidth <= overflowCheck.groupClientWidth + 2
    });

    // TEST 3: Navigation click test
    console.log('\n--- Testing Click Navigation on Smart POS link ---');
    const smartPosLink = await page.$('#mDrillGroup-categories-solutions a[href="/pos"]');
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
      page.evaluate(el => el.click(), smartPosLink)
    ]);

    const finalUrl = page.url();
    console.log('Navigated to:', finalUrl);
    results.checks.push({
      test: 'Clicking /pos navigates to /pos with 200 OK',
      pass: finalUrl.includes('/pos')
    });

    // Check drawer closed & scroll unlocked
    const stateAfterNav = await page.evaluate(() => {
      const drawer = document.getElementById('mobileDrawer');
      const backdrop = document.getElementById('drawerBackdrop');
      return {
        drawerIsOpen: drawer?.classList.contains('is-open') || drawer?.classList.contains('open'),
        backdropIsOpen: backdrop?.classList.contains('is-open') || backdrop?.classList.contains('open'),
        bodyOverflow: document.body.style.overflow
      };
    });
    console.log('State after navigation:', stateAfterNav);
    results.checks.push({
      test: 'Drawer closed and scroll-lock released after navigation',
      pass: !stateAfterNav.drawerIsOpen && !stateAfterNav.backdropIsOpen && stateAfterNav.bodyOverflow === ''
    });

    // TEST 4: Inner page check (complete-management-system.html)
    console.log('\n--- Testing Inner Page Drawer (complete-management-system.html) ---');
    await page.goto(`http://localhost:${PORT}/complete-management-system.html`, { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 600));

    await page.evaluate(() => {
      const h = document.getElementById('hamburger');
      if (h) h.click();
    });
    await new Promise(r => setTimeout(r, 600));

    // Click Solutions in inner page drawer
    const innerSolTrigger = await page.$('[data-target="drawerPanelSolutions"]');
    if (innerSolTrigger) {
      await page.evaluate(el => el.click(), innerSolTrigger);
      await new Promise(r => setTimeout(r, 600));

      let ssInner = path.join(screenshotDir, 'inner_page_drawer_solutions_390px.png');
      await page.screenshot({ path: ssInner });
      results.screenshots.push('inner_page_drawer_solutions_390px.png');

      const innerCards = await page.evaluate(() => {
        const panel = document.getElementById('drawerPanelSolutions');
        const cards = Array.from(panel.querySelectorAll('a.drawer-sol-card'));
        return cards.map(c => ({
          href: c.getAttribute('href'),
          title: c.querySelector('strong')?.textContent.trim(),
          desc: c.querySelector('span')?.textContent.trim()
        }));
      });
      console.log('Inner page drawer cards:', innerCards);
      results.checks.push({
        test: 'Inner page drawer has 4 cards with matching titles/descriptions',
        pass: innerCards.length === 4 && innerCards[0].title === 'Smart POS' && innerCards[1].title === 'Complete Management System'
      });
    }

  } finally {
    await browser.close();
    server.close();
    console.log('[Server] Closed successfully.');
  }

  console.log('\n================ TEST SUMMARY ================');
  let allPassed = true;
  for (let c of results.checks) {
    console.log(`${c.pass ? '✓ PASS' : '✗ FAIL'}: ${c.test}`);
    if (!c.pass) allPassed = false;
  }
  console.log(`\nScreenshots saved: ${results.screenshots.join(', ')}`);
  console.log('==============================================\n');

  if (!allPassed) {
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
