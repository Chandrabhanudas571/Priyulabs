const puppeteer = require('puppeteer-core');
const fs = require('fs');

const CHROME_PATH = fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
  ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  : 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

async function testSubmission() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 375, height: 667 });
  await page.goto('http://localhost:3000/index.html', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => {
    const pre = document.getElementById('priyulabs-preloader') || document.getElementById('sitePreloader');
    if (pre) pre.style.display = 'none';
  });

  // Fill valid inputs
  await page.type('#userName', 'Ramesh Kumar');
  await page.select('#businessType', 'Grocery, Supermarkets & Kirana');
  await page.select('#serviceCategory', 'Smart POS');
  await page.type('#userPhone', '9876543210');

  // Submit form
  await page.evaluate(() => {
    const form = document.getElementById('mainLeadForm');
    form.requestSubmit();
  });

  await new Promise(r => setTimeout(r, 200));

  const loadingState = await page.evaluate(() => {
    const btn = document.getElementById('mainSubmitBtn');
    return {
      disabled: btn?.disabled,
      hasLoadingClass: btn?.classList.contains('is-loading'),
      buttonHtml: btn?.innerHTML
    };
  });
  console.log('Loading State:', loadingState);

  // Wait for submission completion / success popup
  await new Promise(r => setTimeout(r, 3400));

  const successState = await page.evaluate(() => {
    const statusEl = document.getElementById('mainFormStatus');
    const popup = document.getElementById('leadSuccessPopup');
    const waBtn = document.getElementById('leadSuccessWaBtn');
    return {
      statusDisplay: statusEl?.style.display,
      statusHasConfirmation: statusEl?.innerHTML.includes('Submission Confirmed!'),
      popupDisplay: popup?.style.display,
      waLink: waBtn?.getAttribute('href')
    };
  });
  console.log('Success State:', successState);

  await browser.close();
}

testSubmission().catch(console.error);
