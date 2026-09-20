const fs = require('fs');
const path = require('path');

function walk(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === 'node_modules' || file === '.git' || file === 'apps' || file === 'scratch') continue;
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      walk(filePath, fileList);
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const allFiles = walk('.');

const SECTOR_NAME_MAP = {
  'restaurants-fine-dining': 'Restaurants & Fine Dining',
  'restaurants': 'Restaurants & Fine Dining',
  'fine-dine': 'Restaurants & Fine Dining',
  'qsr-fast-food': 'QSR, Fast Food & Takeaway',
  'qsr': 'QSR, Fast Food & Takeaway',
  'cafes-chai-bars': 'Cafes & Chai Bars',
  'cafes': 'Cafes & Chai Bars',
  'cloud-kitchens-catering': 'Cloud Kitchens & Catering',
  'cloud-kitchens': 'Cloud Kitchens & Catering',
  'bakeries-patisseries': 'Bakeries & Patisseries',
  'bakeries-shops': 'Bakeries & Patisseries',
  'bakeries-sweet-shops': 'Bakeries & Patisseries',
  'bakeries': 'Bakeries & Patisseries',
  'bars-pubs-breweries': 'Bars, Pubs & Breweries',
  'bars-pubs': 'Bars, Pubs & Breweries',
  'grocery-supermarkets-kirana': 'Grocery, Supermarkets & Kirana',
  'grocery': 'Grocery, Supermarkets & Kirana',
  'supermarkets': 'Grocery, Supermarkets & Kirana',
  'electronics-mobile-shops': 'Electronics & Mobile Shops',
  'electronics': 'Electronics & Mobile Shops',
  'mobile-shops': 'Electronics & Mobile Shops',
  'footwear-leather-stores': 'Footwear & Leather Stores',
  'footwear': 'Footwear & Leather Stores',
  'leather': 'Footwear & Leather Stores',
  'jewellery-shops': 'Jewellery Showrooms & Bullion',
  'jewellery': 'Jewellery Showrooms & Bullion',
  'jewelry': 'Jewellery Showrooms & Bullion',
  'watch-stores': 'Watch Stores & Horology Boutiques',
  'watches': 'Watch Stores & Horology Boutiques',
  'bookstores-stationery': 'Bookstores & Stationery Outlets',
  'bookstores': 'Bookstores & Stationery Outlets',
  'apparel-boutiques': 'Clothing Brands & Apparel Boutiques',
  'apparel': 'Clothing Brands & Apparel Boutiques',
  'clothing': 'Clothing Brands & Apparel Boutiques',
  'salons-spas': 'Salons, Spas & Beauty Parlors',
  'salons': 'Salons, Spas & Beauty Parlors',
  'cosmetics-skincare': 'Cosmetics & Skincare Stores',
  'cosmetics': 'Cosmetics & Skincare Stores',
  'fitness-gyms': 'Gyms, Fitness Studios & Yoga',
  'gyms': 'Gyms, Fitness Studios & Yoga',
  'dry-cleaners': 'Dry Cleaners & Laundry Shops',
  'laundry': 'Dry Cleaners & Laundry Shops',
  'food-beverage': 'Restaurants & Fine Dining',
  'complete-management-system': 'Complete Management System',
  'digital-marketing': 'Digital Marketing & Ads',
  'pos': 'Smart POS',
  'website-builder': 'Custom Website Building'
};

function getSectorForFile(filePath) {
  const norm = filePath.replace(/\\/g, '/').toLowerCase();
  for (const [key, val] of Object.entries(SECTOR_NAME_MAP)) {
    if (norm.includes(key)) {
      return val;
    }
  }
  return '';
}

const ROUTER_SCRIPT = `
  <!-- Smooth Redirection to Landing Page Free Trial Onboarding Form -->
  <script id="landing-trial-router">
    function goToLandingTrial(e, sector) {
      if (e && e.preventDefault) e.preventDefault();

      const query = sector ? ('?bType=' + encodeURIComponent(sector)) : '';
      let target = 'index.html' + query + '#contact';

      if (window.location.protocol === 'file:') {
        const p = window.location.pathname.replace(/\\\\/g, '/');
        const idx = p.indexOf('/Antigravity/');
        if (idx !== -1) {
          const rel = p.substring(idx + '/Antigravity/'.length);
          const depth = rel.split('/').length - 1;
          target = (depth > 0 ? '../'.repeat(depth) : '') + 'index.html' + query + '#contact';
        } else {
          // Fallback relative
          const parts = p.split('/');
          const fileName = parts.pop();
          if (parts.length > 0) {
            target = 'index.html' + query + '#contact';
          }
        }
      } else {
        // Web server (http://, https://)
        target = '/index.html' + query + '#contact';
      }

      window.location.href = target;
    }
  </script>
`;

let modifiedFiles = 0;
let updatedButtons = 0;

for (const file of allFiles) {
  const norm = file.replace(/\\/g, '/');
  if (norm.endsWith('index.html') || norm.endsWith('.new-backup')) continue;

  let content = fs.readFileSync(file, 'utf8');
  const sector = getSectorForFile(file);
  let changed = false;

  // 1. Inject or replace ROUTER_SCRIPT before </body>
  content = content.replace(/<!-- Smooth Redirection to Landing Page Free Trial[\s\S]*?<\/script>/gi, '');
  content = content.replace(/<script id="landing-trial-router">[\s\S]*?<\/script>/gi, '');

  if (content.includes('</body>')) {
    content = content.replace('</body>', `${ROUTER_SCRIPT}\n</body>`);
    changed = true;
  }

  // 2. Update any <a ... href="/#free-trial" ...> to call goToLandingTrial
  // Also match href="/#contact", href="#free-trial" if not on index.html
  const regex = /<a\s+([^>]*?)href=["'](?:(?:\/)?#free-trial|(?:\/)?#contact|(?:\/)?index\.html#free-trial|(?:\/)?index\.html#contact)["']([^>]*?)>/gi;

  const newContent = content.replace(regex, (match, p1, p2) => {
    updatedButtons++;
    changed = true;
    const cleanP1 = p1.replace(/onclick=["'][^"']*["']/gi, '').trim();
    const cleanP2 = p2.replace(/onclick=["'][^"']*["']/gi, '').trim();
    const onclickAttr = sector ? `onclick="goToLandingTrial(event, '${sector}')"` : `onclick="goToLandingTrial(event)"`;
    const targetHref = sector ? `/index.html?bType=${encodeURIComponent(sector)}#contact` : `/index.html#contact`;
    
    return `<a ${cleanP1 ? cleanP1 + ' ' : ''}href="${targetHref}" ${onclickAttr}${cleanP2 ? ' ' + cleanP2 : ''}>`;
  });

  if (newContent !== content) {
    content = newContent;
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    modifiedFiles++;
  }
}

console.log(`Updated ${updatedButtons} trial buttons across ${modifiedFiles} sector files!`);
