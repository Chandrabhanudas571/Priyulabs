const puppeteer = require('puppeteer-core');
const fs = require('fs');

const CHROME_PATH = fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
  ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  : 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

(async () => {
  const browser = await puppeteer.launch({ executablePath: CHROME_PATH, headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 375, height: 667 });
  await page.goto('http://localhost:3000/index.html', { waitUntil: 'networkidle0' });
  await page.waitForFunction(() => {
    const pre = document.getElementById('sitePreloader');
    return !pre || pre.style.display === 'none' || pre.classList.contains('preloader-hidden');
  }, { timeout: 5000 }).catch(() => {});
  await new Promise(r => setTimeout(r, 1000));

  // 1. Initial State
  const initial = await page.evaluate(() => {
    const d = document.getElementById('mobileDrawer');
    return {
      drawerExists: !!d,
      isOpen: d.classList.contains('open'),
      bodyOverflow: document.body.style.overflow
    };
  });
  console.log('1. Initial State:', initial);

  // 2. Open Drawer
  await page.click('#hamburger');
  await new Promise(r => setTimeout(r, 400));
  const afterOpen = await page.evaluate(() => {
    const d = document.getElementById('mobileDrawer');
    return {
      isOpen: d.classList.contains('open'),
      bodyOverflow: document.body.style.overflow,
      mainPanelActive: document.getElementById('drawerPanelMain').classList.contains('active')
    };
  });
  console.log('2. After Hamburger Click:', afterOpen);

  // 3. Drilldown to Business Types
  await page.click('[data-target="drawerPanelBusiness"]');
  await new Promise(r => setTimeout(r, 400));
  const afterBizDrill = await page.evaluate(() => {
    return {
      bizActive: document.getElementById('drawerPanelBusiness').classList.contains('active'),
      mainParentOut: document.getElementById('drawerPanelMain').classList.contains('parent-out'),
      headerTitle: document.getElementById('drawerHeaderTitle').textContent,
      backBtnVisible: document.getElementById('drawerBackBtn').classList.contains('visible')
    };
  });
  console.log('3. After Business Types Drilldown:', afterBizDrill);

  // 4. Drilldown to Food & Beverage
  await page.click('[data-target="drawerPanelFnb"]');
  await new Promise(r => setTimeout(r, 400));
  const afterFnbDrill = await page.evaluate(() => {
    return {
      fnbActive: document.getElementById('drawerPanelFnb').classList.contains('active'),
      headerTitle: document.getElementById('drawerHeaderTitle').textContent
    };
  });
  console.log('4. After F&B Drilldown:', afterFnbDrill);

  // 5. Back Button Click
  await page.click('#drawerBackBtn');
  await new Promise(r => setTimeout(r, 400));
  const afterBack = await page.evaluate(() => {
    return {
      bizActive: document.getElementById('drawerPanelBusiness').classList.contains('active'),
      fnbActive: document.getElementById('drawerPanelFnb').classList.contains('active'),
      headerTitle: document.getElementById('drawerHeaderTitle').textContent
    };
  });
  console.log('5. After Back Button Click:', afterBack);

  // 6. Close Drawer
  await page.click('#drawerCloseBtn');
  await new Promise(r => setTimeout(r, 400));
  const afterClose = await page.evaluate(() => {
    const d = document.getElementById('mobileDrawer');
    return {
      isOpen: d.classList.contains('open'),
      bodyOverflow: document.body.style.overflow
    };
  });
  console.log('6. After Close Button Click:', afterClose);

  await browser.close();
})();
