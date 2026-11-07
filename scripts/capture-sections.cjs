const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
  ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  : 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const outDir = path.resolve('C:\\Users\\BISHNU PRASAD\\.gemini\\antigravity-ide\\brain\\cfee8c0f-7da8-4beb-bcff-599c7fcb39e1\\screenshots');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function capture() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const viewports = [
    { name: 'desktop_1440', width: 1440, height: 900 },
    { name: 'tablet_768', width: 768, height: 1024 },
    { name: 'mobile_390', width: 390, height: 844 },
    { name: 'mobile_320', width: 320, height: 568 }
  ];

  for (const vp of viewports) {
    const page = await browser.newPage();
    await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 1 });
    await page.goto('http://localhost:3000/index.html', { waitUntil: 'networkidle0', timeout: 15000 }).catch(() => {});

    // Dismiss preloader and force reveal on animated elements
    await page.evaluate(() => {
      const pre = document.getElementById('priyulabs-preloader') || document.getElementById('priyulabsIntroPreloader');
      if (pre) {
        pre.style.display = 'none';
        pre.classList.add('preloader-hidden');
      }
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
      document.querySelectorAll('.feature-row').forEach(el => el.classList.add('in'));
    });

    await new Promise(r => setTimeout(r, 600));

    // Full page screenshot
    const fullPath = path.join(outDir, `${vp.name}_full.png`);
    await page.screenshot({ path: fullPath, fullPage: true });
    console.log(`Saved: ${fullPath}`);

    // Hero section screenshot
    const heroEl = await page.$('.hero');
    if (heroEl) {
      await heroEl.screenshot({ path: path.join(outDir, `${vp.name}_hero.png`) });
    }

    // Solutions / Features section screenshot
    const solutionsEl = await page.$('#solutions');
    if (solutionsEl) {
      await solutionsEl.screenshot({ path: path.join(outDir, `${vp.name}_solutions.png`) });
    }

    // Who we serve section screenshot
    const whoEl = await page.$('#who');
    if (whoEl) {
      await whoEl.screenshot({ path: path.join(outDir, `${vp.name}_who.png`) });
    }

    // Stats section screenshot
    const statsEl = await page.$('.stats-band');
    if (statsEl) {
      await statsEl.screenshot({ path: path.join(outDir, `${vp.name}_stats.png`) });
    }

    // Contact / Onboard section screenshot
    const contactEl = await page.$('#contact');
    if (contactEl) {
      await contactEl.screenshot({ path: path.join(outDir, `${vp.name}_contact.png`) });
    }

    // Footer screenshot
    const footerEl = await page.$('footer');
    if (footerEl) {
      await footerEl.screenshot({ path: path.join(outDir, `${vp.name}_footer.png`) });
    }

    await page.close();
  }

  await browser.close();
  console.log('Finished capturing screenshots.');
}

capture().catch(console.error);
