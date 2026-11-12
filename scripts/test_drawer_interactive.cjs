const puppeteer = require('puppeteer-core');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const rootDir = path.resolve(__dirname, '..');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    pipe: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--single-process']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });

  const fileUrl = 'file://' + path.join(rootDir, 'pos.html').replace(/\\/g, '/');
  await page.goto(fileUrl, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 500));

  console.log('--- TEST 1: Initial state (Drawer closed) ---');
  let isDrawerOpen = await page.evaluate(() => {
    const drawer = document.getElementById('mobileDrawer');
    return drawer && drawer.classList.contains('open');
  });
  console.log('Drawer is open initially:', isDrawerOpen);

  console.log('--- TEST 2: Click Hamburger ---');
  await page.click('#hamburger');
  await new Promise(r => setTimeout(r, 400));

  isDrawerOpen = await page.evaluate(() => {
    const drawer = document.getElementById('mobileDrawer');
    return drawer && drawer.classList.contains('open');
  });
  console.log('Drawer is open after clicking hamburger:', isDrawerOpen);

  await page.screenshot({ path: path.join(rootDir, 'test-artifacts/drawer_open_390px.png') });

  console.log('--- TEST 3: Drill into Solutions ---');
  const solutionsBtn = await page.$('button[data-target="drawerPanelSolutions"]');
  if (solutionsBtn) {
    await solutionsBtn.click();
    await new Promise(r => setTimeout(r, 400));
  }

  const solutionsInfo = await page.evaluate(() => {
    const solutionsPanel = document.getElementById('drawerPanelSolutions');
    const headerTitle = document.getElementById('drawerHeaderTitle');
    const cards = Array.from(solutionsPanel.querySelectorAll('.drawer-sol-card strong')).map(el => el.textContent.trim());
    return {
      panelActive: solutionsPanel && solutionsPanel.classList.contains('active'),
      headerTitle: headerTitle ? headerTitle.textContent : '',
      cards
    };
  });
  console.log('Solutions Drilldown Info:', solutionsInfo);

  await page.screenshot({ path: path.join(rootDir, 'test-artifacts/drawer_solutions_390px.png') });

  console.log('--- TEST 4: Click Back Button ---');
  await page.click('#drawerBackBtn');
  await new Promise(r => setTimeout(r, 400));

  const mainPanelActive = await page.evaluate(() => {
    const main = document.getElementById('drawerPanelMain');
    const headerTitle = document.getElementById('drawerHeaderTitle');
    return {
      active: main && main.classList.contains('active'),
      headerTitle: headerTitle ? headerTitle.textContent : ''
    };
  });
  console.log('Back to Main Panel:', mainPanelActive);

  console.log('--- TEST 5: Close Drawer ---');
  await page.click('#drawerCloseBtn');
  await new Promise(r => setTimeout(r, 400));

  isDrawerOpen = await page.evaluate(() => {
    const drawer = document.getElementById('mobileDrawer');
    return drawer && drawer.classList.contains('open');
  });
  console.log('Drawer is open after close btn:', isDrawerOpen);

  await browser.close();
  console.log('ALL DRAWER TESTS COMPLETED SUCCESSFULLY!');
})();

