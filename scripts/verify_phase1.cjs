const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  // Test desktop 1440px
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/index.html', { waitUntil: 'domcontentloaded' });
  const desktopCheck = await page.evaluate(() => {
    const d = document.querySelector('.mobile-drawer, .m-drawer, #mobileDrawer');
    const b = document.querySelector('.drawer-backdrop, .m-drawer-backdrop, #drawerBackdrop');
    const h = document.querySelector('.hamburger, #hamburger');
    return {
      drawerHidden: window.getComputedStyle(d).display === 'none',
      backdropHidden: window.getComputedStyle(b).display === 'none',
      hamburgerHidden: window.getComputedStyle(h).display === 'none'
    };
  });
  console.log('Desktop 1440px check:', desktopCheck);

  // Test mobile 390px
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:3000/index.html', { waitUntil: 'domcontentloaded' });
  const mobileCheck = await page.evaluate(() => {
    const d = document.querySelector('.mobile-drawer, .m-drawer, #mobileDrawer');
    const b = document.querySelector('.drawer-backdrop, .m-drawer-backdrop, #drawerBackdrop');
    const h = document.querySelector('.hamburger, #hamburger');
    return {
      hamburgerVisible: window.getComputedStyle(h).display !== 'none',
      drawerClosed: !d.classList.contains('open') && !d.classList.contains('is-open'),
      backdropClosed: window.getComputedStyle(b).opacity === '0'
    };
  });
  console.log('Mobile 390px check:', mobileCheck);

  await browser.close();
  if (desktopCheck.drawerHidden && desktopCheck.backdropHidden && desktopCheck.hamburgerHidden && mobileCheck.hamburgerVisible && mobileCheck.drawerClosed) {
    console.log('PHASE 1 VERIFICATION PASSED!');
  } else {
    console.error('PHASE 1 VERIFICATION FAILED!');
    process.exit(1);
  }
})();
