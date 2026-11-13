const fs = require('fs');
const path = require('path');

function getHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      if (!['node_modules', '.git', 'test-artifacts', 'backup-images', 'backup-media', 'dist'].includes(file)) {
        results = results.concat(getHtmlFiles(full));
      }
    } else if (file.endsWith('.html')) {
      results.push(full);
    }
  });
  return results;
}

const allHtml = getHtmlFiles('.');

// Filter for sector and business types pages
const sectorPatterns = [
  'food-beverage', 'retail', 'beauty-fashion', 'services',
  'cloud-kitchen', 'cafe', 'restaurant', 'bakery', 'bakeries', 'bar', 'qsr',
  'grocery', 'supermarket', 'kirana', 'electronic', 'footwear', 'jewel',
  'bookstore', 'stationery', 'watch', 'apparel', 'boutique', 'cosmetic',
  'salon', 'spa', 'gym', 'fitness', 'dry-clean', 'laundry', 'business-type'
];

const targetFiles = allHtml.filter(f => {
  const norm = f.replace(/\\/g, '/').toLowerCase();
  return sectorPatterns.some(p => norm.includes(p));
});

console.log(`Found ${targetFiles.length} target sector/business-types pages to check/link.`);

const VERSION = '20261113v2';
let updatedCount = 0;

targetFiles.forEach(fileRel => {
  const norm = fileRel.replace(/\\/g, '/').replace(/^\.\//, '');
  const segments = norm.split('/');
  const depth = segments.length - 1; // 0 for root, 1 for sub/index.html, 2 for cat/sub/index.html
  const relPrefix = depth === 0 ? '' : (depth === 1 ? '../' : '../../');

  const cssPath = `${relPrefix}assets/css/business-types-mobile.css?v=${VERSION}`;
  const jsPath = `${relPrefix}assets/js/business-types-mobile.js?v=${VERSION}`;

  let content = fs.readFileSync(fileRel, 'utf8');
  let changed = false;

  // 1. CSS Link
  const hasCss = content.includes('business-types-mobile.css');
  if (hasCss) {
    // Update existing href to include correct prefix and ?v=
    const newContent = content.replace(
      /<link[^>]*href=["'][^"']*business-types-mobile\.css[^"']*["'][^>]*>/gi,
      `<link rel="stylesheet" href="${cssPath}" />`
    );
    if (newContent !== content) {
      content = newContent;
      changed = true;
    }
  } else {
    // Insert before </head>
    if (content.includes('</head>')) {
      content = content.replace('</head>', `  <link rel="stylesheet" href="${cssPath}" />\n</head>`);
      changed = true;
    }
  }

  // 2. JS Script
  const hasJs = content.includes('business-types-mobile.js');
  if (hasJs) {
    // Update existing src
    const newContent = content.replace(
      /<script[^>]*src=["'][^"']*business-types-mobile\.js[^"']*["'][^>]*><\/script>/gi,
      `<script src="${jsPath}" defer></script>`
    );
    if (newContent !== content) {
      content = newContent;
      changed = true;
    }
  } else {
    // Insert before </body>
    if (content.includes('</body>')) {
      content = content.replace('</body>', `  <script src="${jsPath}" defer></script>\n</body>`);
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(fileRel, content, 'utf8');
    updatedCount++;
    console.log(`Updated: ${norm}`);
  }
});

console.log(`\nSuccessfully processed ${targetFiles.length} files. Updated ${updatedCount} files.`);

