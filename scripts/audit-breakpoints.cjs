const puppeteer = require('puppeteer-core');
const fs = require('fs');

const CHROME_PATH = fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
  ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  : 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const BREAKPOINTS = [320, 360, 375, 390, 414, 430, 480, 540, 768, 820, 1024, 1280, 1366, 1440, 1920];

async function testAllBreakpoints() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  console.log('=== PRECISE BREAKPOINT AUDIT ===');
  for (const width of BREAKPOINTS) {
    const height = width >= 1024 ? 900 : (width >= 768 ? 1024 : 800);
    await page.setViewport({ width, height, deviceScaleFactor: 1 });
    await page.goto('http://localhost:3000/index.html', { waitUntil: 'networkidle0', timeout: 15000 }).catch(() => {});

    await page.evaluate(() => {
      const pre = document.getElementById('priyulabs-preloader') || document.getElementById('priyulabsIntroPreloader');
      if (pre) pre.style.display = 'none';
    });

    await new Promise(r => setTimeout(r, 400));

    const metrics = await page.evaluate(() => {
      const docScrollW = document.documentElement.scrollWidth;
      const docClientW = document.documentElement.clientWidth;
      const bodyScrollW = document.body.scrollWidth;
      const bodyClientW = document.body.clientWidth;

      // Check for horizontal overflow
      const hasOverflow = docScrollW > docClientW || bodyScrollW > bodyClientW;

      // Find any overflowing elements
      const overflows = [];
      document.querySelectorAll('*').forEach(el => {
        if (el.id === 'mobileDrawer' || el.closest('#mobileDrawer') || el.classList.contains('global-fluid-bg') || el.closest('.global-fluid-bg') || el.classList.contains('ambient-dot-grid')) return;
        const r = el.getBoundingClientRect();
        if (r.right > window.innerWidth + 0.5) {
          overflows.push({
            tag: el.tagName,
            cls: el.className,
            id: el.id,
            right: Math.round(r.right),
            windowW: window.innerWidth
          });
        }
      });

      // Check hero elements
      const hero = document.querySelector('.hero');
      const heroH1 = document.querySelector('.hero-copy h1');
      const heroSub = document.querySelector('.hero-sub');
      const heroVisual = document.querySelector('.hero-visual');
      const heroActions = document.querySelector('.hero-actions');
      const heroTrust = document.querySelector('.hero-trust');

      // Check Who We Serve
      const serveScroll = document.querySelector('.serve-scroll');
      const cards = document.querySelectorAll('.serve-card');

      return {
        hasOverflow,
        docScrollW,
        docClientW,
        overflowsCount: overflows.length,
        topOverflows: overflows.slice(0, 5),
        h1FontSize: heroH1 ? window.getComputedStyle(heroH1).fontSize : null,
        heroVisualWidth: heroVisual ? Math.round(heroVisual.getBoundingClientRect().width) : 0,
        serveScrollW: serveScroll ? serveScroll.scrollWidth : 0,
        cardsCount: cards.length
      };
    });

    console.log(`[${width}px] Overflow: ${metrics.hasOverflow} (scroll: ${metrics.docScrollW} / client: ${metrics.docClientW}) | H1: ${metrics.h1FontSize} | HeroVisualW: ${metrics.heroVisualWidth}px | Overflows: ${metrics.overflowsCount}`);
    if (metrics.overflowsCount > 0) {
      console.log(`   Overflowing:`, metrics.topOverflows);
    }
  }

  await browser.close();
}

testAllBreakpoints().catch(console.error);
