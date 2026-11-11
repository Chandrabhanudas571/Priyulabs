const puppeteer = require('puppeteer-core');
const path = require('path');
const os = require('os');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = path.resolve(__dirname, '../test-artifacts/footer-social');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function verify() {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'pl-social-'));
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    userDataDir: tmpDir,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  const fileUrl = 'file://' + path.resolve(__dirname, '../index.html').replace(/\\/g, '/');

  console.log('Loading page:', fileUrl);
  await page.goto(fileUrl, { waitUntil: 'networkidle2' });

  let hasErrors = false;

  console.log('\n--- 1. VERIFYING MOBILE VIEW (390px) ---');
  await page.setViewport({ width: 390, height: 844 });
  await new Promise(r => setTimeout(r, 400));

  // Remove preloader and scroll directly to .foot-social
  await page.evaluate(() => {
    const pre = document.getElementById('priyulabs-preloader');
    if (pre) pre.remove();
    const footSocial = document.querySelector('.foot-social');
    footSocial.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await new Promise(r => setTimeout(r, 300));

  const mobileCheck = await page.evaluate(() => {
    const footSocial = document.querySelector('.foot-social');
    const buttons = document.querySelectorAll('.foot-social-btn');
    const tagline = document.querySelector('.foot-brand-desc');
    const solutionsCol = document.querySelector('.foot-grid > div:nth-child(2)');

    const style = footSocial ? window.getComputedStyle(footSocial) : null;

    const btnsData = Array.from(buttons).map(b => {
      const bStyle = window.getComputedStyle(b);
      const svg = b.querySelector('svg');
      const svgStyle = svg ? window.getComputedStyle(svg) : null;
      const rect = b.getBoundingClientRect();
      const hit = document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2);

      return {
        href: b.getAttribute('href'),
        target: b.getAttribute('target'),
        rel: b.getAttribute('rel'),
        ariaLabel: b.getAttribute('aria-label'),
        width: bStyle.width,
        height: bStyle.height,
        borderRadius: bStyle.borderRadius,
        backgroundColor: bStyle.backgroundColor,
        boxShadow: bStyle.boxShadow,
        svgWidth: svgStyle ? svgStyle.width : null,
        svgHeight: svgStyle ? svgStyle.height : null,
        svgHtml: svg ? svg.outerHTML : null,
        clickable: hit === b || b.contains(hit),
        hitElement: hit ? hit.tagName + (hit.className ? '.' + hit.className : '') : null
      };
    });

    // Contact links
    const contactLinks = Array.from(document.querySelectorAll('.foot-grid div:last-child a')).map(a => ({
      text: a.textContent.trim(),
      href: a.getAttribute('href')
    }));

    // Spacing
    let gapTaglineToIcons = null;
    let gapIconsToSolutions = null;
    if (tagline && footSocial) {
      const tagRect = tagline.getBoundingClientRect();
      const socRect = footSocial.getBoundingClientRect();
      gapTaglineToIcons = Math.round(socRect.top - tagRect.bottom);
    }
    if (footSocial && solutionsCol) {
      const socRect = footSocial.getBoundingClientRect();
      const solRect = solutionsCol.getBoundingClientRect();
      gapIconsToSolutions = Math.round(solRect.top - socRect.bottom);
    }

    return {
      footSocialVisible: style && style.display !== 'none',
      btnsCount: buttons.length,
      btnsData,
      contactLinks,
      gapTaglineToIcons,
      gapIconsToSolutions
    };
  });

  console.log(`Foot Social Visible: ${mobileCheck.footSocialVisible}`);
  console.log(`Button Count: ${mobileCheck.btnsCount}`);
  console.log(`Gap Tagline to Icons: ${mobileCheck.gapTaglineToIcons}px (expected ~16px)`);
  console.log(`Gap Icons to Next Row: ${mobileCheck.gapIconsToSolutions}px (expected ~24px)`);

  if (mobileCheck.gapTaglineToIcons !== 16) {
    console.error(`  FAIL: Gap Tagline to Icons is ${mobileCheck.gapTaglineToIcons}px, expected 16px!`);
    hasErrors = true;
  }
  if (mobileCheck.gapIconsToSolutions !== 24) {
    console.error(`  FAIL: Gap Icons to Next Row is ${mobileCheck.gapIconsToSolutions}px, expected 24px!`);
    hasErrors = true;
  }

  const expectedBtns = [
    {
      name: 'WhatsApp',
      expectedHref: 'https://wa.me/917879844050?text=Hi%20Priyulabs%2C%20I%20want%20to%20book%20a%2010-min%20demo.',
      expectedTarget: '_blank',
      expectedRel: 'noopener noreferrer',
      expectedAria: 'Chat on WhatsApp',
      colorCheck: (svg) => svg && svg.includes('#25D366')
    },
    {
      name: 'LinkedIn',
      expectedHref: 'https://www.linkedin.com/in/chandrabhanu-das-773060442',
      expectedTarget: '_blank',
      expectedRel: 'noopener noreferrer',
      expectedAria: 'Priyulabs on LinkedIn',
      colorCheck: (svg) => svg && svg.includes('#0A66C2')
    },
    {
      name: 'Instagram',
      expectedHref: 'https://www.instagram.com/priyulabs/',
      expectedTarget: '_blank',
      expectedRel: 'noopener noreferrer',
      expectedAria: 'Priyulabs on Instagram',
      colorCheck: (svg) => svg && svg.includes('#F58529') && svg.includes('#DD2A7B') && svg.includes('#8134AF') && svg.includes('#515BD4')
    },
    {
      name: 'Email',
      expectedHref: 'mailto:priylabspos@gmail.com?subject=Enquiry%20from%20Priyulabs%20website',
      expectedTarget: null,
      expectedAria: 'Email Priyulabs',
      colorCheck: (svg) => svg && svg.includes('#EA4335')
    }
  ];

  mobileCheck.btnsData.forEach((btn, idx) => {
    const exp = expectedBtns[idx];
    console.log(`\n  Checking Icon [${exp.name}]:`);
    console.log(`    Href: ${btn.href}`);
    console.log(`    Target: ${btn.target}`);
    console.log(`    Rel: ${btn.rel}`);
    console.log(`    Aria-Label: ${btn.ariaLabel}`);
    console.log(`    Size: ${btn.width} x ${btn.height}`);
    console.log(`    BG: ${btn.backgroundColor}`);
    console.log(`    SVG Size: ${btn.svgWidth} x ${btn.svgHeight}`);
    console.log(`    Clickable: ${btn.clickable} (hit: ${btn.hitElement})`);

    const hrefOk = btn.href === exp.expectedHref;
    const targetOk = btn.target === exp.expectedTarget;
    const ariaOk = btn.ariaLabel === exp.expectedAria;
    const sizeOk = btn.width === '44px' && btn.height === '44px';
    const svgSizeOk = btn.svgWidth === '22px' && btn.svgHeight === '22px';
    const bgOk = btn.backgroundColor === 'rgb(255, 255, 255)';
    const colorOk = exp.colorCheck(btn.svgHtml);

    console.log(`    Brand Color Check: ${colorOk ? 'PASS' : 'FAIL'}`);

    if (!hrefOk || !targetOk || !ariaOk || !sizeOk || !svgSizeOk || !bgOk || !btn.clickable || !colorOk) {
      console.error(`    FAIL on icon ${exp.name}!`);
      hasErrors = true;
    } else {
      console.log(`    PASS on icon ${exp.name}`);
    }
  });

  // Verify contact links
  console.log('\n  Checking Contact Column Links:');
  console.log('   ', JSON.stringify(mobileCheck.contactLinks));
  const emailLinkOk = mobileCheck.contactLinks.some(l => l.href && l.href.startsWith('mailto:priylabspos@gmail.com'));
  const tel1Ok = mobileCheck.contactLinks.some(l => l.href && l.href.includes('7873844050'));
  const tel2Ok = mobileCheck.contactLinks.some(l => l.href && l.href.includes('7205045905'));

  if (!emailLinkOk || !tel1Ok || !tel2Ok) {
    console.error('    FAIL on contact links!');
    hasErrors = true;
  } else {
    console.log('    PASS on contact links');
  }

  // Screenshot footer
  await page.screenshot({ path: path.join(outDir, 'footer_mobile_390px.png') });

  console.log('\n--- 2. VERIFYING DESKTOP VIEW (1280px, 1440px, 1920px) ---');
  for (const w of [1280, 1440, 1920]) {
    await page.setViewport({ width: w, height: 900 });
    await new Promise(r => setTimeout(r, 200));

    const deskCheck = await page.evaluate(() => {
      const footSocial = document.querySelector('.foot-social');
      const style = footSocial ? window.getComputedStyle(footSocial) : null;
      return {
        hidden: !footSocial || style.display === 'none' || style.visibility === 'hidden'
      };
    });

    console.log(`  Desktop ${w}px - Foot Social Hidden: ${deskCheck.hidden}`);
    if (!deskCheck.hidden) {
      console.error(`  FAIL: Foot social should be hidden on desktop ${w}px`);
      hasErrors = true;
    } else {
      console.log(`  PASS: Foot social correctly hidden on desktop ${w}px`);
    }
  }

  console.log('\n--- 3. VERIFYING ZERO HORIZONTAL SCROLL (360px, 390px, 430px) ---');
  for (const w of [360, 390, 430]) {
    await page.setViewport({ width: w, height: 800 });
    await new Promise(r => setTimeout(r, 200));

    const scrollCheck = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
      hasHScroll: document.documentElement.scrollWidth > window.innerWidth
    }));

    console.log(`  Mobile ${w}px - scrollWidth: ${scrollCheck.scrollWidth}px vs innerWidth: ${scrollCheck.innerWidth}px - HScroll: ${scrollCheck.hasHScroll ? 'FAIL' : 'PASS'}`);
    if (scrollCheck.hasHScroll) {
      console.error(`  FAIL: Horizontal scroll detected on ${w}px`);
      hasErrors = true;
    }
  }

  await browser.close();

  if (hasErrors) {
    console.error('\nVerification FAILED!');
    process.exit(1);
  } else {
    console.log('\nAll footer social/contact icon verification checks PASSED perfectly!');
    process.exit(0);
  }
}

verify().catch(e => {
  console.error(e);
  process.exit(1);
});
