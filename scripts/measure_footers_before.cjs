const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');
const os = require('os');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const pages = [
  'index.html',
  'pos.html',
  'cloud-kitchens-catering.html',
  'grocery-supermarkets-kirana.html',
  'apparel-boutiques/index.html',
  'salons-spas.html',
  'all-business-types.html'
];

async function measureFooters() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    pipe: true,
    userDataDir: path.join(os.tmpdir(), 'pupp_footer_' + Date.now()),
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--single-process', '--allow-file-access-from-files']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });

  const results = [];

  for (const p of pages) {
    const fullPath = path.resolve(__dirname, '..', p);
    if (!fs.existsSync(fullPath)) continue;

    await page.goto('file:///' + fullPath.replace(/\\/g, '/'), { waitUntil: 'load' });
    await new Promise(r => setTimeout(r, 600));

    const data = await page.evaluate(() => {
      const footer = document.querySelector('footer, .priyulabs-universal-footer, .site-footer, .hub-footer');
      if (!footer) return { found: false };

      const cs = window.getComputedStyle(footer);
      const rect = footer.getBoundingClientRect();

      // Check sticky bottom bar
      const stickyBar = document.querySelector('.mobile-sticky-cta, .sticky-bottom-bar, .mobile-dock, .mobile-bottom-bar, [class*="sticky-bar"]');
      let stickyHeight = 0;
      if (stickyBar) {
        stickyHeight = stickyBar.getBoundingClientRect().height;
      }

      // Check foot-grid or child layout
      const grid = footer.querySelector('.foot-grid, .footer-inner, .container');
      const gridCs = grid ? window.getComputedStyle(grid) : null;

      // Check links
      const links = Array.from(footer.querySelectorAll('a')).map(a => a.innerText.trim()).filter(Boolean);

      // Check logo img
      const logoImg = footer.querySelector('.logo img, img.logo');
      const logoCs = logoImg ? window.getComputedStyle(logoImg) : null;

      return {
        found: true,
        tag: footer.tagName,
        className: footer.className,
        height: Math.round(rect.height),
        paddingTop: cs.paddingTop,
        paddingBottom: cs.paddingBottom,
        background: cs.backgroundColor,
        borderTop: cs.borderTop,
        gridDisplay: gridCs ? gridCs.display : 'none',
        gridCols: gridCs ? gridCs.gridTemplateColumns : 'none',
        logoHeight: logoCs ? logoCs.height : 'none',
        stickyPresent: !!stickyBar,
        stickyHeight: Math.round(stickyHeight),
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
        numLinks: links.length
      };
    });

    results.push({ page: p, ...data });

    // Capture screenshot of footer
    const footerHandle = await page.$('footer, .priyulabs-universal-footer, .site-footer, .hub-footer');
    if (footerHandle) {
      const cleanName = p.replace(/[\\\/.]/g, '_');
      const artDir = path.resolve(__dirname, '..', 'test-artifacts');
      if (!fs.existsSync(artDir)) fs.mkdirSync(artDir, { recursive: true });
      await footerHandle.screenshot({ path: path.join(artDir, `footer_before_${cleanName}.png`) });
    }
  }

  await browser.close();
  console.log(JSON.stringify(results, null, 2));
}

measureFooters().catch(console.error);
