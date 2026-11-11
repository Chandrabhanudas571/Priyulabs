const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const puppeteer = require('puppeteer-core');

const ROOT_DIR = path.resolve(__dirname, '..');
const PORT = 3003;
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

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
      '.mp4': 'video/mp4'
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
  const userDataDir = path.join(os.tmpdir(), 'puppeteer-hero-' + Date.now() + '-' + Math.random().toString(36).slice(2));
  fs.mkdirSync(userDataDir, { recursive: true });

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    pipe: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--allow-file-access-from-files']
  });

  const screenshotDir = path.join(ROOT_DIR, 'test-artifacts', 'hero-redesign');
  if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

  const results = { checks: [], screenshots: [] };

  try {
    const page = await browser.newPage();

    const viewports = [
      { name: '360px', width: 360, height: 740 },
      { name: '390px', width: 390, height: 844 },
      { name: '430px', width: 430, height: 932 },
      { name: '1280px', width: 1280, height: 800 }
    ];

    for (const vp of viewports) {
      console.log(`\n--- Testing Hero at ${vp.name} (${vp.width}x${vp.height}) ---`);
      await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 2 });
      const fileUrl = 'file:///' + path.join(ROOT_DIR, 'index.html').replace(/\\/g, '/');
      await page.goto(fileUrl, { waitUntil: 'domcontentloaded' });
      await new Promise(r => setTimeout(r, 800));

      // 1. Horizontal scroll check
      const scrollMetrics = await page.evaluate(() => ({
        docScrollWidth: document.documentElement.scrollWidth,
        bodyScrollWidth: document.body.scrollWidth,
        windowInnerWidth: window.innerWidth
      }));
      const hasNoHScroll = scrollMetrics.docScrollWidth <= scrollMetrics.windowInnerWidth &&
                           scrollMetrics.bodyScrollWidth <= scrollMetrics.windowInnerWidth;
      results.checks.push({
        test: `[${vp.name}] No horizontal scroll (doc: ${scrollMetrics.docScrollWidth}px <= win: ${scrollMetrics.windowInnerWidth}px)`,
        pass: hasNoHScroll
      });

      // 2. Element Metrics & Styling Checks
      const metrics = await page.evaluate(() => {
        const body = document.body;
        const bodyStyle = window.getComputedStyle(body);
        const globalFluidBg = document.querySelector('.global-fluid-bg');
        const ambientGrid = document.querySelector('.ambient-dot-grid');

        const nav = document.querySelector('.m-navbar');
        const navStyle = nav ? window.getComputedStyle(nav) : null;
        const navRect = nav ? nav.getBoundingClientRect() : null;

        const trialBtn = document.querySelector('.m-nav-trial-btn');
        const trialStyle = trialBtn ? window.getComputedStyle(trialBtn) : null;
        const trialRect = trialBtn ? trialBtn.getBoundingClientRect() : null;

        const hamburger = document.querySelector('.m-hamburger');
        const hamStyle = hamburger ? window.getComputedStyle(hamburger) : null;
        const hamRect = hamburger ? hamburger.getBoundingClientRect() : null;

        const eyebrow = document.querySelector('.hero-eyebrow');
        const eyebrowStyle = eyebrow ? window.getComputedStyle(eyebrow) : null;
        const eyebrowRect = eyebrow ? eyebrow.getBoundingClientRect() : null;

        const headline = document.querySelector('.hero-headline');
        const headlineStyle = headline ? window.getComputedStyle(headline) : null;
        const headlineRect = headline ? headline.getBoundingClientRect() : null;

        const highlight = document.querySelector('.headline-highlight');
        const highlightStyle = highlight ? window.getComputedStyle(highlight) : null;
        const underlineSvg = document.querySelector('.hand-drawn-underline');

        const subhead = document.querySelector('.hero-subhead');
        const subheadStyle = subhead ? window.getComputedStyle(subhead) : null;
        const subheadRect = subhead ? subhead.getBoundingClientRect() : null;

        const videoCard = document.querySelector('.hero-video-card');
        const videoCardRect = videoCard ? videoCard.getBoundingClientRect() : null;

        const marqueeWrap = document.querySelector('.marquee-wrap');
        const marqueeStyle = marqueeWrap ? window.getComputedStyle(marqueeWrap) : null;

        return {
          bodyBg: bodyStyle.backgroundColor,
          noDimmingOverlays: !globalFluidBg && !ambientGrid,
          navHeight: navRect ? Math.round(navRect.height) : null,
          navBgInitial: navStyle ? navStyle.backgroundColor : null,
          trialBtnHeight: trialRect ? Math.round(trialRect.height) : null,
          trialBtnFontSize: trialStyle ? trialStyle.fontSize : null,
          trialBtnFontWeight: trialStyle ? trialStyle.fontWeight : null,
          hamWidth: hamRect ? Math.round(hamRect.width) : null,
          hamHeight: hamRect ? Math.round(hamRect.height) : null,
          eyebrowExists: !!eyebrow,
          eyebrowText: eyebrow ? eyebrow.innerText.trim() : null,
          eyebrowColor: eyebrowStyle ? eyebrowStyle.color : null,
          eyebrowBg: eyebrowStyle ? eyebrowStyle.backgroundColor : null,
          eyebrowFontSize: eyebrowStyle ? eyebrowStyle.fontSize : null,
          headlineWeight: headlineStyle ? headlineStyle.fontWeight : null,
          headlineColor: headlineStyle ? headlineStyle.color : null,
          highlightText: highlight ? highlight.innerText.trim() : null,
          highlightColor: highlightStyle ? highlightStyle.color : null,
          underlineSvgExists: !!underlineSvg,
          subheadFontSize: subheadStyle ? subheadStyle.fontSize : null,
          subheadColor: subheadStyle ? subheadStyle.color : null,
          subheadFontWeight: subheadStyle ? subheadStyle.fontWeight : null,
          // Spacing calculation (vertical offsets)
          gapNavToEyebrow: (navRect && eyebrowRect) ? Math.round(eyebrowRect.top - navRect.bottom) : null,
          gapEyebrowToHeadline: (eyebrowRect && headlineRect) ? Math.round(headlineRect.top - eyebrowRect.bottom) : null,
          gapHeadlineToSubhead: (headlineRect && subheadRect) ? Math.round(subheadRect.top - headlineRect.bottom) : null,
          gapSubheadToCard: (subheadRect && videoCardRect) ? Math.round(videoCardRect.top - subheadRect.bottom) : null,
          // Marquee styling
          marqueePaddingTop: marqueeStyle ? marqueeStyle.paddingTop : null,
          marqueePaddingBottom: marqueeStyle ? marqueeStyle.paddingBottom : null,
          marqueeMask: marqueeStyle ? (marqueeStyle.maskImage || marqueeStyle.webkitMaskImage) : null
        };
      });

      console.log(`[${vp.name}] Computed metrics:`, metrics);

      // Check Dullness
      results.checks.push({
        test: `[${vp.name}] Body background is clean cream (#FAF6EE / rgb(250, 246, 238))`,
        pass: metrics.bodyBg === 'rgb(250, 246, 238)'
      });
      results.checks.push({
        test: `[${vp.name}] No dimming overlays (.global-fluid-bg, .ambient-dot-grid)`,
        pass: metrics.noDimmingOverlays
      });

      if (vp.width <= 768) {
        // Mobile Navbar
        results.checks.push({
          test: `[${vp.name}] Mobile navbar height is 64px (got ${metrics.navHeight}px)`,
          pass: metrics.navHeight === 64
        });
        results.checks.push({
          test: `[${vp.name}] Start Free Trial button height is 40px, font 14px, weight >= 600`,
          pass: metrics.trialBtnHeight === 40 && metrics.trialBtnFontSize === '14px' && parseInt(metrics.trialBtnFontWeight) >= 600
        });
        results.checks.push({
          test: `[${vp.name}] Hamburger button tap target is >= 44x44px (got ${metrics.hamWidth}x${metrics.hamHeight}px)`,
          pass: metrics.hamWidth >= 44 && metrics.hamHeight >= 44
        });

        // Test Sticky Navbar after 10px scroll
        await page.evaluate(() => window.scrollTo(0, 15));
        await new Promise(r => setTimeout(r, 100));
        const scrolledNavMetrics = await page.evaluate(() => {
          const nav = document.querySelector('.m-navbar');
          const isScrolled = nav.classList.contains('is-scrolled');
          const style = window.getComputedStyle(nav);
          return {
            isScrolled,
            bg: style.backgroundColor,
            backdropFilter: style.backdropFilter || style.webkitBackdropFilter,
            borderBottom: style.borderBottom
          };
        });
        results.checks.push({
          test: `[${vp.name}] Navbar becomes sticky & translucent on scroll (>8px) (class: ${scrolledNavMetrics.isScrolled}, bg: ${scrolledNavMetrics.bg})`,
          pass: scrolledNavMetrics.isScrolled && scrolledNavMetrics.bg.includes('250, 246, 238')
        });
        // Scroll back to top
        await page.evaluate(() => window.scrollTo(0, 0));
        await new Promise(r => setTimeout(r, 100));

        // Spacing checks
        results.checks.push({
          test: `[${vp.name}] 28px gap between navbar and eyebrow pill (got ${metrics.gapNavToEyebrow}px)`,
          pass: Math.abs(metrics.gapNavToEyebrow - 28) <= 2
        });
        results.checks.push({
          test: `[${vp.name}] 14px gap between eyebrow pill and headline (got ${metrics.gapEyebrowToHeadline}px)`,
          pass: Math.abs(metrics.gapEyebrowToHeadline - 14) <= 2
        });
        results.checks.push({
          test: `[${vp.name}] 14px gap between headline and subhead (got ${metrics.gapHeadlineToSubhead}px)`,
          pass: Math.abs(metrics.gapHeadlineToSubhead - 14) <= 2
        });
        results.checks.push({
          test: `[${vp.name}] 32px gap between subhead and video card (got ${metrics.gapSubheadToCard}px)`,
          pass: Math.abs(metrics.gapSubheadToCard - 32) <= 2
        });

        // Eyebrow checks
        results.checks.push({
          test: `[${vp.name}] Eyebrow pill text is "Built for Indian retailers"`,
          pass: metrics.eyebrowText.toUpperCase().includes('BUILT FOR INDIAN RETAILERS')
        });
        results.checks.push({
          test: `[${vp.name}] Eyebrow font 12px, gold color (#9A6F2B / rgb(154, 111, 43))`,
          pass: metrics.eyebrowFontSize === '12px' && metrics.eyebrowColor === 'rgb(154, 111, 43)'
        });

        // Headline & Underline
        results.checks.push({
          test: `[${vp.name}] Headline weight 600, color #1E1B16 (rgb(30, 27, 22))`,
          pass: metrics.headlineWeight === '600' && metrics.headlineColor === 'rgb(30, 27, 22)'
        });
        results.checks.push({
          test: `[${vp.name}] Highlight "one simple system" in warm gold (#B8893A) with hand-drawn underline SVG`,
          pass: metrics.highlightText.includes('one simple system') &&
                metrics.highlightColor === 'rgb(184, 137, 58)' &&
                metrics.underlineSvgExists
        });

        // Subtext
        results.checks.push({
          test: `[${vp.name}] Subtext font 16px, weight 400, color #5B5448 (rgb(91, 84, 72))`,
          pass: metrics.subheadFontSize === '16px' && metrics.subheadFontWeight === '400' && metrics.subheadColor === 'rgb(91, 84, 72)'
        });
      }

      // Marquee strip check
      results.checks.push({
        test: `[${vp.name}] Marquee strip padding 20px top/bottom (got ${metrics.marqueePaddingTop})`,
        pass: metrics.marqueePaddingTop === '20px' && metrics.marqueePaddingBottom === '20px'
      });
      results.checks.push({
        test: `[${vp.name}] Marquee strip has edge fade mask-image`,
        pass: metrics.marqueeMask && metrics.marqueeMask !== 'none'
      });

      // Take screenshot of hero
      const ssPath = path.join(screenshotDir, `hero_${vp.name}.png`);
      await page.screenshot({ path: ssPath, fullPage: false });
      results.screenshots.push(`hero_${vp.name}.png`);
      console.log(`✓ Saved screenshot: hero_${vp.name}.png`);
    }

    // TEST: Prefers-reduced-motion check
    console.log('\n--- Testing Prefers-Reduced-Motion ---');
    await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
    const motionMetrics = await page.evaluate(() => {
      const eyebrow = document.querySelector('.hero-eyebrow');
      const headline = document.querySelector('.hero-headline');
      const subhead = document.querySelector('.hero-subhead');
      const videoWrap = document.querySelector('.hero-video-wrapper');
      const chip = document.querySelector('.chip-top-left');
      const marqueeTrack = document.querySelector('.marquee-track');

      const isNone = (el) => {
        const a = window.getComputedStyle(el).animationName;
        return a === 'none' || a === '';
      };

      return {
        eyebrowAnimNone: isNone(eyebrow),
        headlineAnimNone: isNone(headline),
        subheadAnimNone: isNone(subhead),
        videoWrapAnimNone: isNone(videoWrap),
        chipAnimNone: isNone(chip),
        marqueeTrackAnimNone: isNone(marqueeTrack)
      };
    });
    console.log('Reduced motion metrics:', motionMetrics);
    results.checks.push({
      test: 'prefers-reduced-motion disables animations on hero elements & marquee',
      pass: motionMetrics.eyebrowAnimNone && motionMetrics.headlineAnimNone &&
            motionMetrics.subheadAnimNone && motionMetrics.videoWrapAnimNone &&
            motionMetrics.chipAnimNone && motionMetrics.marqueeTrackAnimNone
    });

  } finally {
    await browser.close();
    server.close();
    console.log('\n[Server] Closed successfully.');
  }

  console.log('\n================ TEST SUMMARY ================');
  let allPassed = true;
  for (let c of results.checks) {
    console.log(`${c.pass ? '✓ PASS' : '✗ FAIL'}: ${c.test}`);
    if (!c.pass) allPassed = false;
  }
  console.log(`\nScreenshots saved in test-artifacts/hero-redesign: ${results.screenshots.join(', ')}`);
  console.log('==============================================\n');

  if (!allPassed) {
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
