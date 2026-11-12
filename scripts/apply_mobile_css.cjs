const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

function applyToFiles(fileList) {
  fileList.forEach(relPath => {
    const fullPath = path.join(rootDir, relPath);
    if (!fs.existsSync(fullPath)) {
      console.log(`[SKIP] Not found: ${relPath}`);
      return;
    }

    let html = fs.readFileSync(fullPath, 'utf8');
    // Upgrade static <base href="/"> to smart base tag if present
    const smartBase = `<script>if (window.location.protocol !== 'file:') { const b = document.createElement('base'); b.href = '/'; document.head.appendChild(b); }</script>\n  <noscript><base href="/"></noscript>`;
    if (html.includes('<base href="/">') || html.includes('<base href="/" />') || html.includes("<base href='/'>")) {
      html = html.replace(/<base\s+href=["']\/["']\s*\/?>/i, smartBase);
    }

    const depth = relPath.split('/').length - 1;
    const relPrefix = depth > 0 ? '../'.repeat(depth) : '';
    const cssHref = relPrefix + 'assets/css/business-types-mobile.css';
    const jsHref = relPrefix + 'assets/js/business-types-mobile.js';
    const fontTag = html.includes('family=Fraunces') ? '' : '  <link rel="preconnect" href="https://fonts.googleapis.com" />\n  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />\n  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&display=swap" rel="stylesheet" />\n';
    const linkTag = `${fontTag}  <!-- Shared Business Types Mobile Design System -->\n  <link rel="stylesheet" href="${cssHref}" />\n`;
    const scriptTag = `  <script src="${jsHref}" defer></script>\n`;

    // Ensure CSS link is present
    if (!html.includes('business-types-mobile.css') && html.includes('</head>')) {
      html = html.replace('</head>', `${linkTag}</head>`);
    } else if (html.includes('business-types-mobile.css')) {
      html = html.replace(/<link\s+rel=["']stylesheet["']\s+href=["'][^"']*business-types-mobile\.css["']\s*\/?>/i, `<link rel="stylesheet" href="${cssHref}" />`);
      if (!html.includes('family=Fraunces') && html.includes('</head>')) {
        html = html.replace('</head>', `${fontTag}</head>`);
      }
    }

    // Ensure JS script is present before </body>
    if (!html.includes('business-types-mobile.js') && html.includes('</body>')) {
      html = html.replace('</body>', `${scriptTag}</body>`);
    } else if (html.includes('business-types-mobile.js')) {
      html = html.replace(/<script\s+src=["'][^"']*business-types-mobile\.js["'][^>]*><\/script>/i, `<script src="${jsHref}" defer></script>`);
    }

    fs.writeFileSync(fullPath, html, 'utf8');
    console.log(`[UPDATED ASSETS] Synced CSS & JS in: ${relPath}`);
  });
}

// Export or run with CLI args
if (require.main === module) {
  const targetCategory = process.argv[2] || 'fb';
  let targetFiles = [];

  if (targetCategory === 'directory' || targetCategory === 'fb' || targetCategory === 'batch1') {
    targetFiles = [
      'all-business-types.html',
      'business-types.html',
      'restaurants-fine-dining.html',
      'restaurants-fine-dining/index.html',
      'qsr-fast-food.html',
      'qsr-fast-food/index.html',
      'cafes-chai-bars.html',
      'cafes-chai-bars/index.html',
      'cloud-kitchens-catering.html',
      'cloud-kitchens-catering/index.html',
      'bakeries-shops.html',
      'bakeries-shops/index.html',
      'bars-pubs-breweries.html',
      'bars-pubs-breweries/index.html'
    ];
  } else if (targetCategory === 'retail' || targetCategory === 'batch2') {
    targetFiles = [
      'grocery-supermarkets-kirana.html',
      'grocery-supermarkets-kirana/index.html',
      'electronics-mobile-shops.html',
      'electronics-mobile-shops/index.html',
      'footwear-leather-stores.html',
      'footwear-leather-stores/index.html',
      'jewellery-shops.html',
      'jewellery-shops/index.html',
      'watch-stores.html',
      'watch-stores/index.html',
      'bookstores-stationery.html',
      'bookstores-stationery/index.html'
    ];
  } else if (targetCategory === 'beauty-services' || targetCategory === 'batch3') {
    targetFiles = [
      'beauty-fashion/apparel/index.html',
      'apparel-boutiques.html',
      'beauty-fashion/salons/index.html',
      'salons-spas.html',
      'beauty-fashion/cosmetics/index.html',
      'services/gyms/index.html',
      'gyms.html',
      'services/dry-cleaners/index.html',
      'dry-cleaners.html'
    ];
  }

  applyToFiles(targetFiles);
}

module.exports = { applyToFiles };
