const puppeteer = require('puppeteer-core');
const os = require('os');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'puppeteer-perf-'));

const pagesToAudit = [
  { name: 'Homepage (/)', url: 'http://localhost:3000/' },
  { name: 'Solutions (/solutions.html)', url: 'http://localhost:3000/solutions.html' },
  { name: 'POS (/pos.html)', url: 'http://localhost:3000/pos.html' },
  { name: 'Grocery (/grocery.html)', url: 'http://localhost:3000/grocery.html' }
];

async function auditPage(browser, pageInfo) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  let totalTransferBytes = 0;
  let imageBytes = 0;
  let videoBytes = 0;
  let scriptBytes = 0;
  let styleBytes = 0;

  const client = await page.target().createCDPSession();
  await client.send('Network.enable');
  await client.send('Performance.enable');

  client.on('Network.loadingFinished', (params) => {
    totalTransferBytes += params.encodedDataLength || 0;
  });

  page.on('response', (response) => {
    const url = response.url();
    const headers = response.headers();
    const length = parseInt(headers['content-length'] || '0', 10);
    const contentType = headers['content-type'] || '';

    if (contentType.includes('image') || url.match(/\.(webp|png|jpg|jpeg|svg|gif)/i)) {
      imageBytes += length;
    } else if (contentType.includes('video') || url.match(/\.mp4/i)) {
      videoBytes += length;
    } else if (contentType.includes('javascript') || url.match(/\.js/i)) {
      scriptBytes += length;
    } else if (contentType.includes('css') || url.match(/\.css/i)) {
      styleBytes += length;
    }
  });

  // Inject performance observer for LCP and CLS
  await page.evaluateOnNewDocument(() => {
    window.__perfData = { lcp: 0, cls: 0 };
    try {
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        window.__perfData.lcp = lastEntry.renderTime || lastEntry.loadTime;
      }).observe({ type: 'largest-contentful-paint', buffered: true });

      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (!entry.hadRecentInput) {
            window.__perfData.cls += entry.value;
          }
        }
      }).observe({ type: 'layout-shift', buffered: true });
    } catch (e) {}
  });

  const t0 = Date.now();
  await page.goto(pageInfo.url, { waitUntil: 'networkidle2', timeout: 15000 });
  const loadTime = Date.now() - t0;

  // Wait a moment for layout stability and metrics recording
  await new Promise(r => setTimeout(r, 1500));

  const metrics = await page.evaluate(() => {
    const timing = performance.getEntriesByType('navigation')[0] || {};
    const paint = performance.getEntriesByType('paint');
    const fcpEntry = paint.find(p => p.name === 'first-contentful-paint');

    return {
      fcp: fcpEntry ? fcpEntry.startTime : 0,
      lcp: window.__perfData ? window.__perfData.lcp : 0,
      cls: window.__perfData ? window.__perfData.cls : 0,
      domInteractive: timing.domInteractive || 0,
      domComplete: timing.domComplete || 0
    };
  });

  await page.close();

  return {
    name: pageInfo.name,
    loadTimeMs: loadTime,
    fcpMs: Math.round(metrics.fcp),
    lcpMs: Math.round(metrics.lcp || metrics.fcp),
    cls: parseFloat(metrics.cls.toFixed(4)),
    totalTransferMB: (totalTransferBytes / (1024 * 1024)).toFixed(2),
    imageTransferKB: Math.round(imageBytes / 1024),
    videoTransferKB: Math.round(videoBytes / 1024),
    scriptTransferKB: Math.round(scriptBytes / 1024)
  };
}

async function run() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    userDataDir: userDataDir,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  console.log('Auditing core pages performance...\n');
  const results = [];
  for (const pageInfo of pagesToAudit) {
    console.log(`Testing ${pageInfo.name}...`);
    const res = await auditPage(browser, pageInfo);
    results.push(res);
  }

  await browser.close();
  try {
    fs.rmSync(userDataDir, { recursive: true, force: true });
  } catch (e) {}

  console.log('\n=== Core Web Vitals & Delivery Audit Results ===\n');
  console.table(results);
}

run().catch(console.error);
