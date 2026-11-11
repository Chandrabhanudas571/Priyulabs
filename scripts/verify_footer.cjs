const path = require('path');
const puppeteer = require('puppeteer-core');
const fs = require('fs');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ROOT_DIR = path.resolve(__dirname, '..');

async function testFooter() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    pipe: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--allow-file-access-from-files']
  });

  const screenshotDir = path.join(ROOT_DIR, 'test-artifacts', 'footer');
  if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

  const viewports = [
    { name: '360px', width: 360, height: 740 },
    { name: '390px', width: 390, height: 844 },
    { name: '430px', width: 430, height: 932 },
    { name: '1280px', width: 1280, height: 800 }
  ];

  const results = { checks: [], screenshots: [] };

  try {
    const page = await browser.newPage();
    const fileUrl = 'file:///' + path.join(ROOT_DIR, 'index.html').replace(/\\/g, '/');

    for (const vp of viewports) {
      console.log(`\n--- Testing Footer at ${vp.name} (${vp.width}x${vp.height}) ---`);
      await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 2 });
      await page.goto(fileUrl, { waitUntil: 'domcontentloaded' });
      await new Promise(r => setTimeout(r, 600));

      const metrics = await page.evaluate(() => {
        const f = document.querySelector('footer');
        const fRect = f.getBoundingClientRect();
        const fStyle = window.getComputedStyle(f);

        const grid = document.querySelector('.foot-grid');
        const gridRect = grid.getBoundingClientRect();
        const gridStyle = window.getComputedStyle(grid);

        const logoImg = document.querySelector('.foot-grid .logo img');
        const logoRect = logoImg ? logoImg.getBoundingClientRect() : null;

        const h5 = document.querySelector('.foot-grid h5');
        const h5Style = h5 ? window.getComputedStyle(h5) : null;

        const link = document.querySelector('.foot-grid a');
        const linkStyle = link ? window.getComputedStyle(link) : null;

        const socialBtn = document.querySelector('.foot-social-btn');
        const socialRect = socialBtn ? socialBtn.getBoundingClientRect() : null;
        const socialSvg = document.querySelector('.foot-social-btn svg');
        const socialSvgRect = socialSvg ? socialSvg.getBoundingClientRect() : null;

        const bottom = document.querySelector('.foot-bottom');
        const bottomStyle = bottom ? window.getComputedStyle(bottom) : null;

        const stickyBar = document.querySelector('.hero-sticky-bar');
        const stickyStyle = stickyBar ? window.getComputedStyle(stickyBar) : null;
        const stickyRect = stickyBar ? stickyBar.getBoundingClientRect() : null;

        const waBtn = document.querySelector('.sticky-wa-btn');
        const waRect = waBtn ? waBtn.getBoundingClientRect() : null;

        const demoBtn = document.querySelector('.sticky-demo-btn');
        const demoRect = demoBtn ? demoBtn.getBoundingClientRect() : null;
        const demoStyle = demoBtn ? window.getComputedStyle(demoBtn) : null;

        // Gap between link items inside ul
        const ul = document.querySelector('.foot-grid ul');
        const ulStyle = ul ? window.getComputedStyle(ul) : null;

        return {
          footerHeight: Math.round(fRect.height),
          paddingTop: fStyle.paddingTop,
          paddingBottom: fStyle.paddingBottom,
          borderTop: fStyle.borderTop,
          gridHeight: Math.round(gridRect.height),
          gridColumns: gridStyle.gridTemplateColumns.split(' ').length,
          gridRowGap: gridStyle.rowGap,
          gridColGap: gridStyle.columnGap,
          linkGap: ulStyle ? ulStyle.rowGap || ulStyle.gap : null,
          logoImgHeight: logoRect ? Math.round(logoRect.height) : null,
          h5FontSize: h5Style ? h5Style.fontSize : null,
          h5FontWeight: h5Style ? h5Style.fontWeight : null,
          linkFontSize: linkStyle ? linkStyle.fontSize : null,
          linkColor: linkStyle ? linkStyle.color : null,
          socialBtnWidth: socialRect ? Math.round(socialRect.width) : null,
          socialBtnHeight: socialRect ? Math.round(socialRect.height) : null,
          socialSvgWidth: socialSvgRect ? Math.round(socialSvgRect.width) : null,
          socialSvgHeight: socialSvgRect ? Math.round(socialSvgRect.height) : null,
          bottomFontSize: bottomStyle ? bottomStyle.fontSize : null,
          bottomBorderTop: bottomStyle ? bottomStyle.borderTop : null,
          stickyBarHeight: stickyRect ? Math.round(stickyRect.height) : null,
          waBtnWidth: waRect ? Math.round(waRect.width) : null,
          demoBtnHeight: demoRect ? Math.round(demoRect.height) : null,
          demoBtnFontSize: demoStyle ? demoStyle.fontSize : null,
          demoBtnFontWeight: demoStyle ? demoStyle.fontWeight : null,
          demoBtnRadius: demoStyle ? demoStyle.borderRadius : null,
          docScrollWidth: document.documentElement.scrollWidth,
          windowWidth: window.innerWidth
        };
      });

      console.log(`[${vp.name}] Computed footer metrics:`, metrics);

      // Check 1: No horizontal scroll
      const noHScroll = metrics.docScrollWidth <= metrics.windowWidth;
      results.checks.push({
        test: `[${vp.name}] Zero horizontal scroll (doc: ${metrics.docScrollWidth}px <= win: ${metrics.windowWidth}px)`,
        pass: noHScroll
      });

      // Check 2: Vertical padding
      if (vp.width <= 768) {
        results.checks.push({
          test: `[${vp.name}] Vertical padding 40px top and 24px bottom (got ${metrics.paddingTop} / ${metrics.paddingBottom})`,
          pass: metrics.paddingTop === '40px' && metrics.paddingBottom === '24px'
        });
        results.checks.push({
          test: `[${vp.name}] Mobile footer grid is 2-column (got ${metrics.gridColumns} cols)`,
          pass: metrics.gridColumns === 2
        });
        results.checks.push({
          test: `[${vp.name}] Footer total height roughly half (~under 750px, got ${metrics.footerHeight}px vs old 1354px)`,
          pass: metrics.footerHeight <= 750
        });
      } else {
        results.checks.push({
          test: `[${vp.name}] Desktop padding 56px top and 28px bottom (got ${metrics.paddingTop} / ${metrics.paddingBottom})`,
          pass: metrics.paddingTop === '56px' && metrics.paddingBottom === '28px'
        });
      }

      // Check 3: Link gap & Typography
      results.checks.push({
        test: `[${vp.name}] Gap between link items is 10px (got ${metrics.linkGap})`,
        pass: metrics.linkGap === '10px'
      });
      results.checks.push({
        test: `[${vp.name}] Footer logo image height is ~28px (got ${metrics.logoImgHeight}px)`,
        pass: Math.abs(metrics.logoImgHeight - 28) <= 2
      });
      results.checks.push({
        test: `[${vp.name}] Headings are 14px, weight 600 (got ${metrics.h5FontSize}, ${metrics.h5FontWeight})`,
        pass: metrics.h5FontSize === '14px' && parseInt(metrics.h5FontWeight) === 600
      });
      results.checks.push({
        test: `[${vp.name}] Links font-size 14px, color #5B5448 (rgb(91, 84, 72)) (got ${metrics.linkFontSize}, ${metrics.linkColor})`,
        pass: metrics.linkFontSize === '14px' && metrics.linkColor === 'rgb(91, 84, 72)'
      });
      results.checks.push({
        test: `[${vp.name}] Copyright font-size 12px to 13px (got ${metrics.bottomFontSize})`,
        pass: parseFloat(metrics.bottomFontSize) >= 12 && parseFloat(metrics.bottomFontSize) <= 13
      });

      // Check 4: Social icons
      results.checks.push({
        test: `[${vp.name}] Social icons 20px inside 36px tap targets (got ${metrics.socialSvgWidth}px inside ${metrics.socialBtnWidth}x${metrics.socialBtnHeight}px)`,
        pass: metrics.socialBtnWidth === 36 && metrics.socialBtnHeight === 36 &&
              metrics.socialSvgWidth === 20 && metrics.socialSvgHeight === 20
      });

      // Check 5: Borders
      results.checks.push({
        test: `[${vp.name}] 1px border-top on footer and 1px divider above copyright row`,
        pass: metrics.borderTop.includes('1px') && metrics.bottomBorderTop.includes('1px')
      });

      // Optional: Sticky bottom bar
      if (vp.width <= 768) {
        results.checks.push({
          test: `[${vp.name}] Sticky bottom bar refined (WA: 44px, Demo: 46px, font 15px, weight 600, radius 12px)`,
          pass: metrics.waBtnWidth === 44 && metrics.demoBtnHeight === 46 &&
                metrics.demoBtnFontSize === '15px' && parseInt(metrics.demoBtnFontWeight) === 600 &&
                metrics.demoBtnRadius === '12px'
        });
      }

      // Screenshot footer
      const fHandle = await page.$('footer');
      if (fHandle) {
        const ssPath = path.join(screenshotDir, `footer_${vp.name}.png`);
        await fHandle.screenshot({ path: ssPath });
        results.screenshots.push(`footer_${vp.name}.png`);
        console.log(`✓ Saved screenshot: footer_${vp.name}.png`);
      }
    }

    console.log('\n================ FOOTER TEST SUMMARY ================');
    let allPassed = true;
    for (let c of results.checks) {
      console.log(`${c.pass ? '✓ PASS' : '✗ FAIL'}: ${c.test}`);
      if (!c.pass) allPassed = false;
    }
    console.log(`\nScreenshots saved in test-artifacts/footer: ${results.screenshots.join(', ')}`);
    console.log('=====================================================\n');

    try {
      const proc = browser.process();
      await Promise.race([
        browser.close(),
        new Promise(r => setTimeout(r, 1000))
      ]);
      if (proc && !proc.killed) proc.kill();
    } catch (e) {}

    if (!allPassed) {
      process.exit(1);
    } else {
      process.exit(0);
    }
  } catch (err) {
    console.error('Footer test failed:', err);
    try {
      if (browser) {
        const proc = browser.process();
        browser.close().catch(() => {});
        if (proc && !proc.killed) proc.kill();
      }
    } catch (e) {}
    process.exit(1);
  }
}

testFooter();
