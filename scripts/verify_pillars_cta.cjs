const path = require('path');
const puppeteer = require('puppeteer-core');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const rootDir = path.resolve(__dirname, '..');

const fnbPages = [
  'restaurants-fine-dining.html',
  'qsr-fast-food.html',
  'cafes-chai-bars.html',
  'cloud-kitchens-catering.html',
  'bakeries-shops.html',
  'bars-pubs-breweries.html'
];

async function verifyAllFnb() {
  console.log('🔍 Checking Pillars Carousel & Final CTA on ALL F&B Pages...');
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    pipe: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--single-process']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });

  let allOk = true;

  for (const pageFile of fnbPages) {
    const fileUrl = 'file://' + path.join(rootDir, pageFile).replace(/\\/g, '/');
    await page.goto(fileUrl, { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 400));

    const res = await page.evaluate(() => {
      const sec = document.querySelector('.clean-pillars-sec, .pillars-sec');
      const container = sec ? sec.querySelector('.clean-container, .pillars-container') : null;
      const cards = sec ? sec.querySelectorAll('.pillar-row, .pillar-card') : [];
      const firstCard = cards[0];
      const firstImg = firstCard ? firstCard.querySelector('img') : null;
      const howDetails = firstCard ? firstCard.querySelector('details.pl-how-details') : null;
      const nav = sec ? sec.querySelector('.pl-carousel-nav') : null;
      const dots = nav ? nav.querySelectorAll('.pl-dot-btn') : [];
      const counter = nav ? nav.querySelector('.pl-counter-badge') : null;
      const ctaCard = document.querySelector('div[style*="grid-template-columns: 1.15fr 0.85fr"], div[style*="grid-template-columns: 1.1fr 1fr"]');
      const ctaPrimaryBtn = ctaCard ? ctaCard.querySelector('a[href*="#contact"], a[style*="background: #ea580c"], a[style*="background:#ea580c"]') : null;

      return {
        cardCount: cards.length,
        hasContainer: !!container,
        firstImgAspect: firstImg ? window.getComputedStyle(firstImg).aspectRatio : null,
        firstImgOrder: firstImg ? window.getComputedStyle(firstImg.closest('.pillar-img-col, .pillar-media-col, .pillar-visual-card') || firstImg).order : null,
        howDetailsCount: sec ? sec.querySelectorAll('details.pl-how-details').length : 0,
        dotsCount: dots.length,
        dotButtonSize: dots.length > 0 ? `${dots[0].offsetWidth}x${dots[0].offsetHeight}` : null,
        counterText: counter ? counter.textContent.trim() : null,
        ctaPrimaryBtnHeight: ctaPrimaryBtn ? window.getComputedStyle(ctaPrimaryBtn).height : null
      };
    });

    console.log(`Page: ${pageFile}`);
    console.log(`  Cards: ${res.cardCount} | Dots: ${res.dotsCount} (Tap: ${res.dotButtonSize}) | Counter: ${res.counterText}`);
    console.log(`  Img: aspect ${res.firstImgAspect}, order ${res.firstImgOrder} | <details>: ${res.howDetailsCount} | CTA Btn: ${res.ctaPrimaryBtnHeight}`);

    if (res.cardCount === 0 || res.dotsCount !== res.cardCount || res.dotButtonSize !== '44x44' || res.ctaPrimaryBtnHeight !== '48px') {
      console.error(`  ❌ Failed verification on ${pageFile}`);
      allOk = false;
    } else {
      console.log(`  ✅ Passed!`);
    }
  }

  await browser.close();
  if (allOk) {
    console.log('\n🎉 ALL F&B PAGES PASSED PILLARS & CTA VERIFICATION!');
  } else {
    process.exit(1);
  }
}

verifyAllFnb();
