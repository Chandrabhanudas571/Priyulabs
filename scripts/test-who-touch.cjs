const puppeteer = require('puppeteer-core');
const fs = require('fs');

const CHROME_PATH = fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
  ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  : 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

(async () => {
  const browser = await puppeteer.launch({ executablePath: CHROME_PATH, headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 375, height: 667, hasTouch: true, isMobile: true });
  await page.goto('http://localhost:3000/index.html', { waitUntil: 'networkidle0' });

  // Scroll to #who section to center of viewport
  await page.evaluate(() => {
    const who = document.querySelector('.serve-scroll');
    if (who) who.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await new Promise(r => setTimeout(r, 400));

  // Check initial scrollLeft
  const initialScroll = await page.evaluate(() => {
    const slider = document.querySelector('.serve-scroll');
    return {
      scrollLeft: slider.scrollLeft,
      scrollWidth: slider.scrollWidth,
      clientWidth: slider.clientWidth
    };
  });
  console.log('1. Initial Who We Serve Scroll Position:', initialScroll);

  const client = await page.target().createCDPSession();
  
  const sliderBox = await page.evaluate(() => {
    const s = document.querySelector('.serve-scroll');
    const r = s.getBoundingClientRect();
    return { x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height / 2) };
  });

  console.log('2. Performing Swipe Left Gesture (scrollLeft increase) via Input.synthesizeScrollGesture at:', sliderBox);
  await client.send('Input.synthesizeScrollGesture', {
    x: Math.min(350, Math.max(20, sliderBox.x + 50)),
    y: Math.min(600, Math.max(50, sliderBox.y)),
    xDistance: 250,
    yDistance: 0,
    gestureSourceType: 'touch',
    repeatCount: 1,
    repeatDelayMs: 100
  });

  await new Promise(r => setTimeout(r, 600));

  const afterSwipeScroll = await page.evaluate(() => {
    const slider = document.querySelector('.serve-scroll');
    return {
      scrollLeft: slider.scrollLeft,
      url: window.location.href
    };
  });
  console.log('3. After Touch Swipe Scroll Position:', afterSwipeScroll);

  // Now test normal TAP on first visible card
  console.log('4. Performing TAP on card...');
  let navigatedUrl = null;
  page.on('framenavigated', frame => {
    if (frame === page.mainFrame()) {
      navigatedUrl = frame.url();
    }
  });

  const card = await page.$('.serve-card');
  if (card) {
    await card.click();
    await new Promise(r => setTimeout(r, 500));
  }

  console.log('5. Current URL after tap:', page.url(), 'Navigated:', navigatedUrl);

  await browser.close();
})();
