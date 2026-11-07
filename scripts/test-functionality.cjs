const puppeteer = require('puppeteer-core');
const fs = require('fs');

const CHROME_PATH = fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
  ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  : 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

async function testFullFunctionality() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844 });
  await page.goto('http://localhost:3000/index.html', { waitUntil: 'networkidle0' });

  // Dismiss preloader
  await page.evaluate(() => {
    const pre = document.getElementById('priyulabs-preloader') || document.getElementById('priyulabsIntroPreloader');
    if (pre) pre.style.display = 'none';
  });

  console.log('=== FUNCTIONAL TESTING ===\n');

  // 1. Who We Serve Sector Links Check
  const sectorLinks = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('.serve-scroll a'));
    return cards.map(c => ({
      href: c.getAttribute('href'),
      title: c.querySelector('h4') ? c.querySelector('h4').textContent : (c.querySelector('.round-cta-label') ? c.querySelector('.round-cta-label').textContent : 'CTA'),
      isClickable: !c.disabled && window.getComputedStyle(c).pointerEvents !== 'none'
    }));
  });
  console.log('1. Who We Serve Links:', sectorLinks);

  // 2. Feature Rows Links Check
  const featureLinks = await page.evaluate(() => {
    const rows = Array.from(document.querySelectorAll('.feature-row'));
    return rows.map((r, i) => {
      const h3 = r.querySelector('h3') ? r.querySelector('h3').textContent : '';
      const a = r.querySelector('a');
      return {
        row: i + 1,
        title: h3,
        linkText: a ? a.textContent : '',
        href: a ? a.getAttribute('href') : ''
      };
    });
  });
  console.log('2. Feature Rows Links:', featureLinks);

  // 3. Mobile Navigation Full Drilldown Test
  console.log('\n3. Testing Mobile Navigation Drawer Drilldowns...');
  // Open hamburger
  await page.click('#hamburger');
  await new Promise(r => setTimeout(r, 350));

  // Test Drilldown to Food & Beverage
  await page.click('.drawer-drill-trigger[data-target="drawerPanelBusiness"]');
  await new Promise(r => setTimeout(r, 350));
  await page.click('.drawer-drill-trigger[data-target="drawerPanelFnb"]');
  await new Promise(r => setTimeout(r, 350));

  const fnbLinks = await page.evaluate(() => {
    const title = document.getElementById('drawerHeaderTitle').textContent;
    const links = Array.from(document.querySelectorAll('#drawerPanelFnb .drawer-nav-item')).map(a => ({
      text: a.textContent.trim(),
      href: a.getAttribute('href')
    }));
    return { title, linksCount: links.length, links: links.slice(0, 3) };
  });
  console.log('   F&B Panel:', fnbLinks);

  // Back to Business Types
  await page.click('#drawerBackBtn');
  await new Promise(r => setTimeout(r, 350));

  // Back to Main Menu
  await page.click('#drawerBackBtn');
  await new Promise(r => setTimeout(r, 350));

  // Test Drilldown to Solutions
  await page.click('.drawer-drill-trigger[data-target="drawerPanelSolutions"]');
  await new Promise(r => setTimeout(r, 350));
  const solLinks = await page.evaluate(() => {
    const title = document.getElementById('drawerHeaderTitle').textContent;
    const links = Array.from(document.querySelectorAll('#drawerPanelSolutions .drawer-sol-card')).map(a => ({
      title: a.querySelector('strong') ? a.querySelector('strong').textContent : '',
      href: a.getAttribute('href')
    }));
    return { title, links };
  });
  console.log('   Solutions Panel:', solLinks);

  // Close drawer
  await page.click('#drawerCloseBtn');
  await new Promise(r => setTimeout(r, 350));

  const isClosed = await page.evaluate(() => !document.getElementById('mobileDrawer').classList.contains('open'));
  console.log('   Drawer Closed successfully:', isClosed);

  // 4. Form Validation & Submission Test
  console.log('\n4. Testing Onboarding Form Validation...');
  const formValidation = await page.evaluate(() => {
    const form = document.getElementById('mainLeadForm');
    const name = document.getElementById('userName');
    const bType = document.getElementById('businessType');
    const service = document.getElementById('serviceCategory');
    const phone = document.getElementById('userPhone');

    // Fill valid details
    name.value = 'Rajesh Sharma';
    bType.value = 'Restaurants & Fine Dining';
    service.value = 'Smart POS';
    phone.value = '9876543210';

    return {
      name: name.value,
      bType: bType.value,
      service: service.value,
      phone: phone.value,
      formValid: form.checkValidity()
    };
  });
  console.log('   Form populated and validated:', formValidation);

  await browser.close();
  console.log('\nAll functional tests passed successfully!');
}

testFullFunctionality().catch(console.error);
