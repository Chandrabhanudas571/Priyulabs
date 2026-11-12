const puppeteer = require('puppeteer-core');
const path = require('path');
const os = require('os');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = path.resolve(__dirname, '../test-artifacts/business-types-drawer');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function run() {
  console.log('🚀 Starting Business Types Drawer Verification Suite...');
  let hasErrors = false;

  // 1. Static 1:1 Comparison of Desktop Mega-Menu vs Mobile Drawer Markup
  console.log('\n--- 1. STATIC 1:1 COMPARISON (DESKTOP VS MOBILE IN INDEX.HTML) ---');
  const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

  const categories = [
    { name: 'Food & Beverage', slug: 'food-beverage', desktopTab: 'tab-fnb' },
    { name: 'Retail', slug: 'retail', desktopTab: 'tab-retail' },
    { name: 'Beauty & Fashion', slug: 'beauty-fashion', desktopTab: 'tab-beauty' },
    { name: 'Services', slug: 'services', desktopTab: 'tab-services' }
  ];

  const comparisonTable = [];

  categories.forEach(cat => {
    // Desktop sectors
    const dStart = html.indexOf('id="' + cat.desktopTab + '"');
    const dEnd = html.indexOf('</div>', dStart);
    const dBlock = html.substring(dStart, dEnd);
    const dLinks = [];
    const linkRegex = /<a\s+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g;
    let match;
    while ((match = linkRegex.exec(dBlock)) !== null) {
      dLinks.push({
        href: match[1],
        text: match[2].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ').replace(/&amp;/g, '&')
      });
    }

    // Mobile sectors
    const mStart = html.indexOf('id="mDrillGroup-business-types-' + cat.slug + '"');
    const mEnd = html.indexOf('</div>', mStart);
    const mBlock = html.substring(mStart, mEnd);
    const mLinks = [];
    while ((match = linkRegex.exec(mBlock)) !== null) {
      mLinks.push({
        href: match[1],
        text: match[2].replace(/<[^>]+>/g, '').replace(/→|&rarr;/g, '').trim().replace(/\s+/g, ' ').replace(/&amp;/g, '&')
      });
    }

    const matchesCount = dLinks.length === mLinks.length;
    let itemsMatch = true;
    for (let i = 0; i < Math.max(dLinks.length, mLinks.length); i++) {
      const d = dLinks[i];
      const m = mLinks[i];
      if (!d || !m || d.href !== m.href || d.text !== m.text) {
        itemsMatch = false;
        console.error(`  MISMATCH in ${cat.name} at [${i}]: Desktop=[${d ? d.text + ' ' + d.href : 'NONE'}] vs Mobile=[${m ? m.text + ' ' + m.href : 'NONE'}]`);
      }
    }

    comparisonTable.push({
      Category: cat.name,
      'Desktop Sectors': dLinks.length,
      'Mobile Sectors': mLinks.length,
      '1:1 Match': (matchesCount && itemsMatch) ? '✅ PASS' : '❌ FAIL'
    });

    if (!matchesCount || !itemsMatch) {
      hasErrors = true;
    }
  });

  console.table(comparisonTable);

  // Check All Business Types link in Level 2
  const hasAllBTypesLink = html.includes('all-business-types.html') &&
    html.includes('mDrillGroup-categories-business-types') &&
    html.indexOf('all-business-types.html', html.indexOf('mDrillGroup-categories-business-types')) !== -1;
  console.log(`All Business Types link present in mobile Level 2: ${hasAllBTypesLink ? '✅ PASS' : '❌ FAIL'}`);
  if (!hasAllBTypesLink) hasErrors = true;

  // 2. Link Destination File Check (Ensure No 404s)
  console.log('\n--- 2. ROUTE & LINK INTEGRITY (CHECK FOR 404s) ---');
  const checkedUrls = new Set();
  const rootDir = path.resolve(__dirname, '..');

  categories.forEach(cat => {
    const dStart = html.indexOf('id="' + cat.desktopTab + '"');
    const dEnd = html.indexOf('</div>', dStart);
    const dBlock = html.substring(dStart, dEnd);
    const linkRegex = /<a\s+href="([^"]+)"/g;
    let match;
    while ((match = linkRegex.exec(dBlock)) !== null) {
      checkedUrls.add(match[1]);
    }
  });
  checkedUrls.add('all-business-types.html');

  checkedUrls.forEach(url => {
    let exists = false;
    const cleanUrl = url.split('#')[0].split('?')[0];
    const cand1 = path.join(rootDir, cleanUrl + '.html');
    const cand2 = path.join(rootDir, cleanUrl, 'index.html');
    const cand3 = path.join(rootDir, cleanUrl);
    if (fs.existsSync(cand1) || fs.existsSync(cand2) || fs.existsSync(cand3)) {
      exists = true;
    }
    if (exists) {
      console.log(`  Route ${url} -> FOUND (200 OK)`);
    } else {
      console.error(`  Route ${url} -> 404 NOT FOUND!`);
      hasErrors = true;
    }
  });

  // 3. Headless Browser Behavioral Testing
  console.log('\n--- 3. PUPPETEER BEHAVIORAL TESTING (DRILL-DOWN & NAVIGATION) ---');
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  const fileUrl = 'file://' + path.resolve(__dirname, '../index.html').replace(/\\/g, '/');
  await page.goto(fileUrl, { waitUntil: 'domcontentloaded' });

  // Suppress preloader
  await page.evaluate(() => {
    const p = document.getElementById('priyulabs-preloader');
    if (p) p.remove();
  });

  // Test Mobile Viewport (390px)
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await new Promise(r => setTimeout(r, 200));

  // Open Drawer
  await page.evaluate(() => {
    if (window.openMobileNav) window.openMobileNav();
  });
  await new Promise(r => setTimeout(r, 350));

  // Step A: Tap Business Types to enter Level 2
  await page.evaluate(() => {
    window.mDrillGoLevel2('business-types', 'Business Types');
  });
  await new Promise(r => setTimeout(r, 350));

  const l2State = await page.evaluate(() => {
    const title = document.getElementById('mDrillTitleLevel2').textContent.trim();
    const group = document.getElementById('mDrillGroup-categories-business-types');
    const cats = Array.from(group.querySelectorAll('button')).map(b => b.textContent.trim().replace(/\s*→\s*$/, ''));
    const allLink = group.querySelector('a');
    return {
      title,
      cats,
      allLinkText: allLink ? allLink.textContent.trim().replace(/\s*→\s*$/, '') : null,
      allLinkHref: allLink ? allLink.getAttribute('href') : null
    };
  });

  console.log('Level 2 Title:', l2State.title);
  console.log('Level 2 Categories in Order:', l2State.cats);
  console.log('Level 2 "All" Link:', l2State.allLinkText, '->', l2State.allLinkHref);

  const expectedCats = ['Food & Beverage', 'Retail', 'Beauty & Fashion', 'Services'];
  const catsMatch = JSON.stringify(l2State.cats) === JSON.stringify(expectedCats);
  console.log(`Level 2 4 Categories exact match & order: ${catsMatch ? '✅ PASS' : '❌ FAIL'}`);
  if (!catsMatch) hasErrors = true;

  await page.screenshot({ path: path.join(outDir, 'mobile_level_2_business_types.png') });

  // Step B: Drill into each of the 4 categories, check title, check sector list, check back button
  for (const cat of categories) {
    console.log(`\n  Testing Category drill-down: [${cat.name}]`);
    await page.evaluate((slug, name) => {
      window.mDrillGoLevel3('business-types', slug, name);
    }, cat.slug, cat.name);
    await new Promise(r => setTimeout(r, 300));

    const l3Data = await page.evaluate((slug) => {
      const title = document.getElementById('mDrillTitleLevel3').textContent.trim();
      const group = document.getElementById('mDrillGroup-business-types-' + slug);
      const isActive = group ? group.classList.contains('is-active') : false;
      const sectors = group ? Array.from(group.querySelectorAll('a')).map(a => ({
        text: a.textContent.trim().replace(/\s*→\s*$/, '').replace(/\s+/g, ' '),
        href: a.getAttribute('href')
      })) : [];
      return { title, isActive, sectors };
    }, cat.slug);

    console.log(`    Sub-panel Title: "${l3Data.title}" (Expected: "${cat.name}")`);
    console.log(`    Sub-panel Active: ${l3Data.isActive}`);
    console.log(`    Sectors Count: ${l3Data.sectors.length}`);

    if (l3Data.title !== cat.name || !l3Data.isActive || l3Data.sectors.length === 0) {
      console.error(`    ❌ FAILED Level 3 check for ${cat.name}`);
      hasErrors = true;
    } else {
      console.log(`    ✅ Level 3 ${cat.name} PASS`);
    }

    await page.screenshot({ path: path.join(outDir, `mobile_level_3_${cat.slug}.png`) });

    // Click Back to Level 2
    await page.evaluate(() => {
      window.mDrillGoBack(2);
    });
    await new Promise(r => setTimeout(r, 250));
  }

  // Click Back to Level 1
  await page.evaluate(() => {
    window.mDrillGoBack(1);
  });
  await new Promise(r => setTimeout(r, 250));
  const level1Active = await page.evaluate(() => {
    const track = document.getElementById('mDrillTrack');
    return track.style.transform === 'translateX(0%)';
  });
  console.log(`\nBack navigation to Level 1: ${level1Active ? '✅ PASS' : '❌ FAIL'}`);
  if (!level1Active) hasErrors = true;

  // 4. Viewport & Horizontal Scroll Checks
  console.log('\n--- 4. VIEWPORT & HORIZONTAL SCROLL CHECKS ---');
  const viewports = [
    { name: 'mobile_360px', width: 360, height: 740, isMobile: true },
    { name: 'mobile_390px', width: 390, height: 844, isMobile: true },
    { name: 'mobile_430px', width: 430, height: 932, isMobile: true },
    { name: 'desktop_1280px', width: 1280, height: 800, isMobile: false },
    { name: 'desktop_1440px', width: 1440, height: 900, isMobile: false },
    { name: 'desktop_1920px', width: 1920, height: 1080, isMobile: false }
  ];

  for (const vp of viewports) {
    await page.setViewport({ width: vp.width, height: vp.height, isMobile: vp.isMobile });
    await new Promise(r => setTimeout(r, 200));

    const metrics = await page.evaluate(() => {
      return {
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
        drawerHiddenOnDesktop: window.innerWidth >= 1024 ?
          window.getComputedStyle(document.getElementById('mobileDrawer')).display === 'none' : true
      };
    });

    const noHScroll = metrics.scrollWidth <= metrics.innerWidth;
    console.log(`[${vp.name}] scrollWidth: ${metrics.scrollWidth}px vs innerWidth: ${metrics.innerWidth}px -> HScroll: ${noHScroll ? 'PASS' : 'FAIL'} | Desktop Drawer Hidden: ${metrics.drawerHiddenOnDesktop ? 'PASS' : 'FAIL'}`);

    if (!noHScroll || !metrics.drawerHiddenOnDesktop) {
      hasErrors = true;
    }
  }

  await browser.close();

  console.log('\n======================================================');
  if (hasErrors) {
    console.error('❌ SOME CHECKS FAILED!');
    process.exit(1);
  } else {
    console.log('🎉 ALL BUSINESS TYPES DRAWER VERIFICATION CHECKS PASSED!');
    process.exit(0);
  }
}

run().catch(err => {
  console.error('Fatal error during verification:', err);
  process.exit(1);
});

