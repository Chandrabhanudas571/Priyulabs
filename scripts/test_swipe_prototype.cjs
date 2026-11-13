const puppeteer = require('puppeteer-core');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const rootDir = path.resolve(__dirname, '..');

async function checkApparelAndKitchen() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    pipe: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--single-process']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });

  const fileUrl = 'file://' + path.join(rootDir, 'apparel-boutiques/index.html').replace(/\\/g, '/');
  await page.goto(fileUrl, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 600));

  const data = await page.evaluate(() => {
    const triptych = document.querySelector('.hero-triptych');
    const matrix = document.querySelector('.matrix-grid');
    return {
      triptychCount: triptych ? triptych.children.length : 0,
      matrixCount: matrix ? matrix.children.length : 0,
      matrixDisplay: matrix ? window.getComputedStyle(matrix).display : 'none'
    };
  });

  console.log('Apparel data:', data);
  await browser.close();
}

checkApparelAndKitchen();

