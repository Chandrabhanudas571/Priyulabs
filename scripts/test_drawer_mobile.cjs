const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });

  await page.goto('http://localhost:3000/index.html', { waitUntil: 'domcontentloaded', timeout: 15000 });

  const initial = await page.evaluate(() => {
    const hamburger = document.querySelector('.hamburger, #hamburger');
    const drawer = document.querySelector('.mobile-drawer, .m-drawer, #mobileDrawer');
    const backdrop = document.querySelector('.drawer-backdrop, .m-drawer-backdrop, #drawerBackdrop');
    return {
      hamburgerVisible: hamburger ? window.getComputedStyle(hamburger).display !== 'none' : false,
      drawerOpen: drawer ? drawer.classList.contains('open') || drawer.classList.contains('is-open') : false,
      backdropVisible: backdrop ? window.getComputedStyle(backdrop).display !== 'none' && window.getComputedStyle(backdrop).opacity > 0 : false
    };
  });
  console.log('Mobile 390px Initial:', initial);

  // Click hamburger
  await page.click('.hamburger, #hamburger');
  await new Promise(r => setTimeout(r, 400));

  const afterOpen = await page.evaluate(() => {
    const drawer = document.querySelector('.mobile-drawer, .m-drawer, #mobileDrawer');
    const backdrop = document.querySelector('.drawer-backdrop, .m-drawer-backdrop, #drawerBackdrop');
    return {
      drawerOpen: drawer ? drawer.classList.contains('open') || drawer.classList.contains('is-open') : false,
      drawerDisplay: drawer ? window.getComputedStyle(drawer).display : null,
      drawerTransform: drawer ? window.getComputedStyle(drawer).transform : null,
      backdropVisible: backdrop ? window.getComputedStyle(backdrop).opacity > 0 : false,
      bodyOverflow: document.body.style.overflow
    };
  });
  console.log('After Hamburger Click:', afterOpen);

  // Click close button
  await page.click('.drawer-close, #drawerCloseBtn, .drawer-close-btn');
  await new Promise(r => setTimeout(r, 400));

  const afterClose = await page.evaluate(() => {
    const drawer = document.querySelector('.mobile-drawer, .m-drawer, #mobileDrawer');
    const backdrop = document.querySelector('.drawer-backdrop, .m-drawer-backdrop, #drawerBackdrop');
    return {
      drawerOpen: drawer ? drawer.classList.contains('open') || drawer.classList.contains('is-open') : false,
      drawerTransform: drawer ? window.getComputedStyle(drawer).transform : null,
      backdropVisible: backdrop ? window.getComputedStyle(backdrop).opacity > 0 : false,
      bodyOverflow: document.body.style.overflow
    };
  });
  console.log('After Close Click:', afterClose);

  await browser.close();
})();
