const puppeteer = require('puppeteer-core');
const fs = require('fs');

const CHROME_PATH = fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
  ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  : 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

(async () => {
  const browser = await puppeteer.launch({ executablePath: CHROME_PATH, headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 375, height: 667 });
  await page.goto('http://localhost:3000/index.html', { waitUntil: 'networkidle0' });

  // 1. Check Header Stickiness
  const stickyPositions = [];
  for (const scrollY of [0, 300, 800, 1500, 2500]) {
    await page.evaluate((y) => window.scrollTo(0, y), scrollY);
    await new Promise(r => setTimeout(r, 100));
    const headerRect = await page.evaluate(() => {
      const h = document.querySelector('header');
      const r = h ? h.getBoundingClientRect() : null;
      return {
        scrollY: window.scrollY,
        headerTop: r ? r.top : null,
        headerHeight: r ? r.height : null,
        headerPosition: h ? window.getComputedStyle(h).position : null,
        headerZIndex: h ? window.getComputedStyle(h).zIndex : null,
        bodyOverflowX: window.getComputedStyle(document.body).overflowX,
        htmlOverflowX: window.getComputedStyle(document.documentElement).overflowX
      };
    });
    stickyPositions.push(headerRect);
  }
  console.log('=== STICKY NAVBAR DIAGNOSTICS (Mobile 375px) ===');
  console.table(stickyPositions);

  // Desktop Stickiness Test
  await page.setViewport({ width: 1440, height: 900 });
  const deskStickyPositions = [];
  for (const scrollY of [0, 500, 1500, 3000]) {
    await page.evaluate((y) => window.scrollTo(0, y), scrollY);
    await new Promise(r => setTimeout(r, 100));
    const headerRect = await page.evaluate(() => {
      const h = document.querySelector('header');
      const r = h ? h.getBoundingClientRect() : null;
      return {
        scrollY: window.scrollY,
        headerTop: r ? r.top : null,
        headerHeight: r ? r.height : null
      };
    });
    deskStickyPositions.push(headerRect);
  }
  console.log('=== STICKY NAVBAR DIAGNOSTICS (Desktop 1440px) ===');
  console.table(deskStickyPositions);

  // 2. Who We Serve Diagnostics
  await page.setViewport({ width: 375, height: 667 });
  await page.evaluate(() => {
    const who = document.getElementById('who');
    if (who) who.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 200));

  const whoDiag = await page.evaluate(() => {
    const slider = document.querySelector('.serve-scroll');
    const cards = document.querySelectorAll('.serve-card');
    const roundCta = document.querySelector('.serve-round-cta');
    return {
      sliderExists: !!slider,
      cardsCount: cards.length,
      roundCtaExists: !!roundCta,
      scrollWidth: slider ? slider.scrollWidth : 0,
      clientWidth: slider ? slider.clientWidth : 0,
      isScrollable: slider ? slider.scrollWidth > slider.clientWidth : false,
      overflowX: slider ? window.getComputedStyle(slider).overflowX : null,
      touchAction: slider ? window.getComputedStyle(slider).touchAction : null,
      scrollSnapType: slider ? window.getComputedStyle(slider).scrollSnapType : null,
      cards: Array.from(cards).map(c => ({
        text: c.querySelector('h4')?.textContent,
        href: c.getAttribute('href'),
        width: c.getBoundingClientRect().width
      }))
    };
  });
  console.log('\n=== WHO WE SERVE DIAGNOSTICS ===\n', whoDiag);

  // 3. Link Audit on Landing Page
  const linkAudit = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('a[href]'));
    return links.map(l => ({
      text: l.innerText.replace(/\s+/g, ' ').trim().slice(0, 35),
      href: l.getAttribute('href'),
      target: l.getAttribute('target') || '_self'
    }));
  });
  console.log(`\n=== LINK AUDIT (${linkAudit.length} links found) ===\n`);
  console.table(linkAudit.slice(0, 30));

  await browser.close();
})();
