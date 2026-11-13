const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');
const os = require('os');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function verify() {
  let browser;
  try {
    const tmpDir = path.join(os.tmpdir(), 'pl_wn_' + Date.now());
    browser = await puppeteer.launch({
      executablePath: chromePath,
      headless: 'new',
      pipe: true,
      userDataDir: tmpDir,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--single-process', '--allow-file-access-from-files']
    });

    const page = await browser.newPage();

    // 1. Check index.html on mobile (390x844)
    console.log('\n--- Test 1: index.html on Mobile (390px) ---');
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
    const indexUrl = 'file:///' + path.resolve('index.html').replace(/\\/g, '/');
    await page.goto(indexUrl, { waitUntil: 'load' });
    await new Promise(r => setTimeout(r, 600));

    // Check #whats-new section on mobile
    const whatsNewMobile = await page.evaluate(() => {
      const el = document.getElementById('whats-new');
      if (!el) return { exists: false };
      const comp = window.getComputedStyle(el);
      return {
        exists: true,
        display: comp.display,
        offsetHeight: el.offsetHeight,
        isVisible: el.offsetHeight > 0 && comp.display !== 'none'
      };
    });
    console.log('Mobile #whats-new section:', whatsNewMobile);

    // Open mobile drawer
    await page.evaluate(() => {
      const openBtn = document.querySelector('.m-hamburger, #hamburger, .mobile-hamburger');
      if (openBtn) openBtn.click();
      else if (typeof openMobileNav === 'function') openMobileNav();
    });
    await new Promise(r => setTimeout(r, 600));

    // Check links in drawer
    const drawerLinks = await page.evaluate(() => {
      const drawer = document.getElementById('mobileDrawer') || document.querySelector('.m-drawer');
      if (!drawer) return { found: false };
      const items = Array.from(drawer.querySelectorAll('#mDrillPanel1 a, #mDrillPanel1 button, .drawer-nav-item, .m-drawer-link'));
      return {
        found: true,
        items: items.map(el => el.textContent.trim().replace(/\s+/g, ' ')),
        hasWhatsNew: items.some(el => /What's\s*new/i.test(el.textContent))
      };
    });
    console.log('Mobile Drawer items:', drawerLinks);

    // Take screenshot of open drawer
    const outDir = 'C:\\Users\\chand\\.gemini\\antigravity\\brain\\9fdbafb1-2c8d-445f-9c22-1b074a204f23';
    const screenshotPath = path.join(outDir, 'mobile_drawer_no_whats_new.png');
    await page.screenshot({ path: screenshotPath });
    console.log('Saved screenshot to:', screenshotPath);

    // 2. Check index.html on Desktop (1280px)
    console.log('\n--- Test 2: index.html on Desktop (1280px) ---');
    await page.setViewport({ width: 1280, height: 900, isMobile: false });
    await page.goto(indexUrl, { waitUntil: 'load' });
    await new Promise(r => setTimeout(r, 600));

    const desktopWhatsNew = await page.evaluate(() => {
      const el = document.getElementById('whats-new');
      if (!el) return { exists: false };
      const comp = window.getComputedStyle(el);
      const navItem = Array.from(document.querySelectorAll('.desktop-header a, .site-header a, .nav-menu a, .dyn-nav-links a'))
        .find(a => /What's\s*new/i.test(a.textContent));
      return {
        exists: true,
        display: comp.display,
        offsetHeight: el.offsetHeight,
        navItemFound: !!navItem,
        navItemText: navItem ? navItem.textContent.trim() : null
      };
    });
    console.log('Desktop view status:', desktopWhatsNew);

    // 3. Check pos.html on mobile (390px)
    console.log('\n--- Test 3: pos.html on Mobile (390px) ---');
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
    const posUrl = 'file:///' + path.resolve('pos.html').replace(/\\/g, '/');
    await page.goto(posUrl, { waitUntil: 'load' });
    await new Promise(r => setTimeout(r, 600));

    // Open drawer
    await page.evaluate(() => {
      const posOpenBtn = document.querySelector('.m-hamburger, #hamburger, .mobile-hamburger, .header-hamburger');
      if (posOpenBtn) posOpenBtn.click();
      else if (typeof openMobileDrawer === 'function') openMobileDrawer();
    });
    await new Promise(r => setTimeout(r, 600));

    const posDrawer = await page.evaluate(() => {
      const drawer = document.getElementById('mobileDrawer') || document.querySelector('.mobile-drawer, .m-drawer');
      if (!drawer) return { found: false };
      const items = Array.from(drawer.querySelectorAll('.drawer-nav-item, .m-drawer-link, .drawer-sublink'));
      return {
        found: true,
        items: items.map(el => el.textContent.trim().replace(/\s+/g, ' ')),
        hasWhatsNew: items.some(el => /What's\s*new/i.test(el.textContent))
      };
    });
    console.log('POS Mobile Drawer:', {
      found: posDrawer.found,
      hasWhatsNew: posDrawer.hasWhatsNew,
      mainItems: posDrawer.items.slice(0, 6)
    });

    console.log('\n--- VERIFICATION SUMMARY ---');
    const mobileSuccess = whatsNewMobile.display === 'none' && !drawerLinks.hasWhatsNew;
    const desktopSuccess = desktopWhatsNew.display !== 'none' && desktopWhatsNew.offsetHeight > 0 && desktopWhatsNew.navItemFound;
    const posSuccess = !posDrawer.hasWhatsNew;

    console.log('1. Mobile #whats-new is display:none ->', whatsNewMobile.display === 'none');
    console.log('2. Mobile drawer has NO "What\'s New" ->', !drawerLinks.hasWhatsNew);
    console.log('3. Desktop #whats-new is visible ->', desktopWhatsNew.display !== 'none' && desktopWhatsNew.offsetHeight > 0);
    console.log('4. Desktop top nav has "What\'s new" ->', desktopWhatsNew.navItemFound);
    console.log('5. POS Mobile drawer has NO "What\'s New" ->', !posDrawer.hasWhatsNew);

    if (mobileSuccess && desktopSuccess && posSuccess) {
      console.log('\n>>> ALL VERIFICATION CHECKS PASSED PERFECTLY! <<<');
    } else {
      console.error('\n>>> SOME CHECKS FAILED! <<<');
      process.exitCode = 1;
    }
  } catch (err) {
    console.error('Test error:', err);
    process.exitCode = 1;
  } finally {
    if (browser) await browser.close();
  }
}

verify();
