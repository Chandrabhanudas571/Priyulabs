const puppeteer = require('puppeteer-core');
const path = require('path');
const os = require('os');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = path.resolve(__dirname, '../test-artifacts/responsive-split');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function verify() {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'pl-pup-'));
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    userDataDir: tmpDir,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  const fileUrl = 'file://' + path.resolve(__dirname, '../index.html').replace(/\\/g, '/');

  console.log('Loading:', fileUrl);
  await page.goto(fileUrl, { waitUntil: 'networkidle2' });

  const desktopViewports = [
    { width: 1280, height: 800, name: 'desktop_1280px' },
    { width: 1440, height: 900, name: 'desktop_1440px' },
    { width: 1920, height: 1080, name: 'desktop_1920px' }
  ];

  const mobileViewports = [
    { width: 360, height: 740, name: 'mobile_360px' },
    { width: 390, height: 844, name: 'mobile_390px' },
    { width: 430, height: 932, name: 'mobile_430px' }
  ];

  let hasErrors = false;

  console.log('\n--- VERIFYING DESKTOP VIEWPORTS ---');
  for (const vp of desktopViewports) {
    await page.setViewport({ width: vp.width, height: vp.height });
    await new Promise(r => setTimeout(r, 300));

    const check = await page.evaluate(() => {
      const desktopHeader = document.querySelector('.desktop-header');
      const mobileNav = document.querySelector('.m-navbar');
      const desktopHero = document.querySelector('.desktop-hero');
      const mobileHero = document.querySelector('.hero-redesign');
      const stickyBar = document.querySelector('.hero-sticky-bar');
      const eyebrow = document.querySelector('.hero-eyebrow');
      const chips = document.querySelectorAll('.hero-stat-chip');
      const waFab = document.querySelector('#cmsWhatsappFab, .cms-whatsapp-fab');
      const footSocial = document.querySelector('.foot-social');
      const emblemsImg = document.querySelector('.footer-national-emblems-wrap img');
      const footer = document.querySelector('footer');
      const footGrid = document.querySelector('.foot-grid');

      const isVisible = (el) => {
        if (!el) return false;
        const style = window.getComputedStyle(el);
        return style.display !== 'none' && style.visibility !== 'hidden';
      };

      const isHidden = (el) => {
        if (!el) return true;
        const style = window.getComputedStyle(el);
        return style.display === 'none' || style.visibility === 'hidden';
      };

      const scrollWidth = document.documentElement.scrollWidth;
      const innerWidth = window.innerWidth;

      return {
        desktopHeaderVisible: isVisible(desktopHeader),
        mobileNavHidden: isHidden(mobileNav),
        desktopHeroVisible: isVisible(desktopHero),
        mobileHeroHidden: isHidden(mobileHero),
        stickyBarHidden: isHidden(stickyBar),
        eyebrowHidden: isHidden(eyebrow),
        chipsHidden: Array.from(chips).every(c => isHidden(c)),
        waFabVisible: isVisible(waFab),
        footSocialHidden: isHidden(footSocial),
        emblemHeight: emblemsImg ? window.getComputedStyle(emblemsImg).height : '0',
        footGridColumns: footGrid ? window.getComputedStyle(footGrid).gridTemplateColumns : '',
        footerBg: footer ? window.getComputedStyle(footer).backgroundColor : '',
        horizontalScroll: scrollWidth > innerWidth,
        scrollWidth,
        innerWidth
      };
    });

    console.log(`[${vp.name}]`);
    console.log(`  Desktop Header Visible: ${check.desktopHeaderVisible}`);
    console.log(`  Mobile Nav Hidden: ${check.mobileNavHidden}`);
    console.log(`  Desktop Hero Visible: ${check.desktopHeroVisible}`);
    console.log(`  Mobile Hero Hidden: ${check.mobileHeroHidden}`);
    console.log(`  Sticky Bar Hidden: ${check.stickyBarHidden}`);
    console.log(`  Eyebrow Hidden: ${check.eyebrowHidden}`);
    console.log(`  Chips Hidden: ${check.chipsHidden}`);
    console.log(`  WhatsApp FAB Visible: ${check.waFabVisible}`);
    console.log(`  Foot Social Hidden: ${check.footSocialHidden}`);
    console.log(`  Emblem Height: ${check.emblemHeight}`);
    console.log(`  Footer Columns: ${check.footGridColumns}`);
    console.log(`  Horizontal Scroll: ${check.horizontalScroll ? 'FAIL (' + check.scrollWidth + 'px > ' + check.innerWidth + 'px)' : 'PASS'}`);

    // Screenshot top hero
    await page.screenshot({ path: path.join(outDir, `${vp.name}_hero.png`) });

    if (!check.desktopHeaderVisible || !check.mobileNavHidden || !check.desktopHeroVisible ||
        !check.mobileHeroHidden || !check.stickyBarHidden || !check.eyebrowHidden ||
        !check.chipsHidden || !check.waFabVisible || !check.footSocialHidden || check.horizontalScroll) {
      console.error(`  FAIL on ${vp.name}!`);
      hasErrors = true;
    } else {
      console.log(`  PASS on ${vp.name}`);
    }
  }

  console.log('\n--- VERIFYING MOBILE VIEWPORTS ---');
  for (const vp of mobileViewports) {
    await page.setViewport({ width: vp.width, height: vp.height });
    await new Promise(r => setTimeout(r, 300));

    const check = await page.evaluate(() => {
      const desktopHeader = document.querySelector('.desktop-header');
      const mobileNav = document.querySelector('.m-navbar');
      const desktopHero = document.querySelector('.desktop-hero');
      const mobileHero = document.querySelector('.hero-redesign');
      const stickyBar = document.querySelector('.hero-sticky-bar');
      const eyebrow = document.querySelector('.hero-eyebrow');
      const chips = document.querySelectorAll('.hero-stat-chip');
      const waFab = document.querySelector('#cmsWhatsappFab, .cms-whatsapp-fab');
      const footSocial = document.querySelector('.foot-social');
      const emblemsImg = document.querySelector('.footer-national-emblems-wrap img');
      const footer = document.querySelector('footer');
      const footGrid = document.querySelector('.foot-grid');

      const isVisible = (el) => {
        if (!el) return false;
        const style = window.getComputedStyle(el);
        return style.display !== 'none' && style.visibility !== 'hidden';
      };

      const isHidden = (el) => {
        if (!el) return true;
        const style = window.getComputedStyle(el);
        return style.display === 'none' || style.visibility === 'hidden';
      };

      const scrollWidth = document.documentElement.scrollWidth;
      const innerWidth = window.innerWidth;

      return {
        desktopHeaderHidden: isHidden(desktopHeader),
        mobileNavVisible: isVisible(mobileNav),
        desktopHeroHidden: isHidden(desktopHero),
        mobileHeroVisible: isVisible(mobileHero),
        stickyBarVisible: isVisible(stickyBar),
        eyebrowVisible: isVisible(eyebrow),
        chipsCount: chips.length,
        chipsVisible: Array.from(chips).every(c => isVisible(c)),
        waFabHidden: isHidden(waFab),
        footSocialVisible: isVisible(footSocial),
        emblemHeight: emblemsImg ? window.getComputedStyle(emblemsImg).height : '0',
        footGridColumns: footGrid ? window.getComputedStyle(footGrid).gridTemplateColumns : '',
        horizontalScroll: scrollWidth > innerWidth,
        scrollWidth,
        innerWidth
      };
    });

    console.log(`[${vp.name}]`);
    console.log(`  Desktop Header Hidden: ${check.desktopHeaderHidden}`);
    console.log(`  Mobile Nav Visible: ${check.mobileNavVisible}`);
    console.log(`  Desktop Hero Hidden: ${check.desktopHeroHidden}`);
    console.log(`  Mobile Hero Visible: ${check.mobileHeroVisible}`);
    console.log(`  Sticky Bar Visible: ${check.stickyBarVisible}`);
    console.log(`  Eyebrow Visible: ${check.eyebrowVisible}`);
    console.log(`  Chips Visible: ${check.chipsVisible} (${check.chipsCount} chips)`);
    console.log(`  WhatsApp FAB Hidden: ${check.waFabHidden}`);
    console.log(`  Foot Social Visible: ${check.footSocialVisible}`);
    console.log(`  Emblem Height: ${check.emblemHeight}`);
    console.log(`  Footer Columns: ${check.footGridColumns}`);
    console.log(`  Horizontal Scroll: ${check.horizontalScroll ? 'FAIL (' + check.scrollWidth + 'px > ' + check.innerWidth + 'px)' : 'PASS'}`);

    // Screenshot mobile view
    await page.screenshot({ path: path.join(outDir, `${vp.name}_hero.png`) });

    if (!check.desktopHeaderHidden || !check.mobileNavVisible || !check.desktopHeroHidden ||
        !check.mobileHeroVisible || !check.stickyBarVisible || !check.eyebrowVisible ||
        !check.chipsVisible || !check.waFabHidden || !check.footSocialVisible || check.horizontalScroll) {
      console.error(`  FAIL on ${vp.name}!`);
      hasErrors = true;
    } else {
      console.log(`  PASS on ${vp.name}`);
    }
  }

  await browser.close();

  if (hasErrors) {
    console.error('\nVerification FAILED!');
    process.exit(1);
  } else {
    console.log('\nAll desktop and mobile verification checks PASSED perfectly!');
    process.exit(0);
  }
}

verify().catch(e => {
  console.error(e);
  process.exit(1);
});
