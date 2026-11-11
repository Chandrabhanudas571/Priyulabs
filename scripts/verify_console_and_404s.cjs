const puppeteer = require('puppeteer-core');
const os = require('os');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'puppeteer-profile-'));

const pagesToTest = [
  '/',
  '/pos.html',
  '/complete-management-system.html',
  '/website-builder.html',
  '/digital-marketing.html',
  '/solutions.html',
  '/all-business-types.html',
  '/interactive-demo.html',
  '/bakeries.html',
  '/grocery.html',
  '/apparel-boutiques.html',
  '/cafes.html'
];

async function run() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    userDataDir: userDataDir,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  const page = await browser.newPage();
  let totalErrors = 0;
  const issues = [];

  page.on('console', msg => {
    if (msg.type() === 'error') {
      const text = msg.text();
      if (!text.includes('chrome-extension') && !text.includes('favicon')) {
        issues.push({ type: 'CONSOLE_ERROR', url: page.url(), text });
        totalErrors++;
      }
    }
  });

  page.on('response', resp => {
    const status = resp.status();
    const url = resp.url();
    if (status >= 400 && url.includes('localhost:3000')) {
      issues.push({ type: 'HTTP_' + status, pageUrl: page.url(), resUrl: url });
      totalErrors++;
    }
  });

  for (const p of pagesToTest) {
    const fullUrl = `http://localhost:3000${p}`;
    console.log(`Checking ${fullUrl} at 1440x900...`);
    await page.setViewport({ width: 1440, height: 900 });
    try {
      await page.goto(fullUrl, { waitUntil: 'networkidle2', timeout: 12000 });
    } catch (e) {
      console.warn(`Timeout or error on ${fullUrl}:`, e.message);
    }

    console.log(`Checking ${fullUrl} at 390x844...`);
    await page.setViewport({ width: 390, height: 844 });
    try {
      await page.goto(fullUrl, { waitUntil: 'networkidle2', timeout: 12000 });
    } catch (e) {
      console.warn(`Timeout or error on ${fullUrl}:`, e.message);
    }
  }

  await browser.close();

  try {
    fs.rmSync(userDataDir, { recursive: true, force: true });
  } catch (e) {}

  console.log(`\n=== Verification Results ===`);
  console.log(`Total Issues / 404s: ${totalErrors}`);
  if (issues.length > 0) {
    console.log('Issues found:');
    issues.forEach(i => console.log(JSON.stringify(i)));
  } else {
    console.log('Zero console errors and zero 404s on all tested core pages!');
  }
}

run().catch(console.error);
