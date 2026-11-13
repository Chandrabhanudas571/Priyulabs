const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

const rootDir = path.resolve(__dirname, '..');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon'
};

// Simple static server
const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath === '/') reqPath = '/index.html';
  let filePath = path.join(rootDir, reqPath);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found: ' + reqPath);
  }
});

const testPages = [
  'cloud-kitchens-catering.html',
  'food-beverage/cloud-kitchens/index.html',
  'grocery-supermarkets-kirana.html',
  'retail/grocery/index.html',
  'cafes-chai-bars.html',
  'restaurants-fine-dining.html',
  'electronics-mobile-shops.html',
  'jewellery-shops.html',
  'gyms.html'
];

server.listen(8099, async () => {
  console.log('Static server listening on port 8099');

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    pipe: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--single-process']
  });

  const results = [];

  for (const pageRel of testPages) {
    for (const w of [360, 390, 430]) {
      const page = await browser.newPage();
      await page.setViewport({ width: w, height: 844, isMobile: true, hasTouch: true });

      const url = `http://localhost:8099/${pageRel.replace(/\\/g, '/')}`;
      let pageStatus = 200;
      page.on('response', resp => {
        if (resp.url() === url) pageStatus = resp.status();
      });

      await page.goto(url, { waitUntil: 'domcontentloaded' });
      await new Promise(r => setTimeout(r, 600));

      const data = await page.evaluate((vpW) => {
        const docScrollW = document.documentElement.scrollWidth;
        const innerW = window.innerWidth;
        const sec = document.querySelector('.clean-pillars-sec, .pillars-sec, #pillars');
        const cards = sec ? Array.from(sec.querySelectorAll('.pillar-row, .pillar-scroll-step, .pillar-card')) : [];
        const cardWidths = cards.map(c => Math.round(c.getBoundingClientRect().width));
        const cardHeights = cards.map(c => Math.round(c.getBoundingClientRect().height));

        const overflowing = Array.from(document.querySelectorAll('*'))
          .map(el => {
            const r = el.getBoundingClientRect();
            return {
              tag: el.tagName,
              class: el.className,
              overflowRight: Math.round(r.right - window.innerWidth)
            };
          })
          .filter(x => x.overflowRight > 1)
          .sort((a, b) => b.overflowRight - a.overflowRight);

        const secBg = sec ? window.getComputedStyle(sec).backgroundColor : null;

        return {
          vpW,
          scrollW: docScrollW,
          innerW,
          overflowPx: docScrollW - innerW,
          overflowingCount: overflowing.length,
          topOverflow: overflowing[0] ? `${overflowing[0].tag}.${overflowing[0].class} (+${overflowing[0].overflowRight}px)` : 'none',
          cardsCount: cards.length,
          cardWidth: cardWidths[0] || 0,
          cardHeight: cardHeights[0] || 0,
          secBg
        };
      }, w);

      results.push({ page: pageRel, ...data });
      await page.close();
    }
  }

  await browser.close();
  server.close();

  console.table(results);
});

