const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const rootDir = path.resolve(__dirname, '..');
const artifactsDir = path.join(rootDir, 'test-artifacts');

const testList = [
  { name: 'Apparel Boutiques', file: 'apparel-boutiques/index.html' },
  { name: 'Cloud Kitchens', file: 'cloud-kitchens-catering.html' },
  { name: 'Cafes', file: 'cafes-chai-bars.html' },
  { name: 'Grocery', file: 'grocery-supermarkets-kirana.html' },
  { name: 'Electronics', file: 'electronics-mobile-shops.html' }
];

async function testSwipeCards() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    pipe: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--single-process']
  });

  const results = [];

  for (const item of testList) {
    const full = path.join(rootDir, item.file);
    if (!fs.existsSync(full)) continue;

    const page = await browser.newPage();
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });

    const fileUrl = 'file://' + full.replace(/\\/g, '/');
    await page.goto(fileUrl, { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 600));

    const data = await page.evaluate(() => {
      const scrollW = document.documentElement.scrollWidth;
      const innerW = window.innerWidth;
      const overflowPx = Math.max(0, scrollW - innerW);

      // Find swipe tracks
      const swipeTracks = Array.from(document.querySelectorAll('.matrix-grid, .cards-grid-6, .clean-grid-6, .clean-feature-grid, .features-grid, .hero-triptych'));
      const tracksInfo = swipeTracks.map(t => {
        const cs = window.getComputedStyle(t);
        const children = Array.from(t.children).filter(c => !c.classList.contains('pl-swipe-hint-bar'));
        const firstChildCS = children[0] ? window.getComputedStyle(children[0]) : null;
        return {
          class: t.className,
          display: cs.display,
          flexDir: cs.flexDirection,
          overflowX: cs.overflowX,
          scrollSnap: cs.scrollSnapType,
          childCount: children.length,
          childWidth: firstChildCS ? firstChildCS.width : 'none',
          childFlex: firstChildCS ? firstChildCS.flex : 'none'
        };
      });

      // Find hint bars
      const hintBars = Array.from(document.querySelectorAll('.pl-swipe-hint-bar')).map(b => ({
        label: b.querySelector('.pl-swipe-hint-label')?.innerText,
        dotsCount: b.querySelectorAll('.pl-swipe-dot').length
      }));

      return {
        scrollW,
        innerW,
        overflowPx,
        tracksCount: swipeTracks.length,
        tracksInfo,
        hintBars
      };
    });

    // Capture screenshot of the swipe section
    const shotPath = path.join(artifactsDir, `swipe_card_${item.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}_390px.png`);
    await page.screenshot({ path: shotPath, fullPage: true });

    results.push({ name: item.name, ...data, screenshot: path.basename(shotPath) });
    await page.close();
  }

  await browser.close();
  console.log('=== Swipe Cards Test Results ===');
  console.log(JSON.stringify(results, null, 2));
}

testSwipeCards();

