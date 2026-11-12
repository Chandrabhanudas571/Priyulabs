const fs = require('fs');
const path = require('path');

const pages = [
  'all-business-types.html',
  'business-types.html',
  'restaurants-fine-dining.html',
  'qsr-fast-food.html',
  'cafes-chai-bars.html',
  'cloud-kitchens-catering.html',
  'bakeries-shops.html',
  'bars-pubs-breweries.html',
  'grocery-supermarkets-kirana.html',
  'electronics-mobile-shops.html',
  'footwear-leather-stores.html',
  'jewellery-shops.html',
  'watch-stores.html',
  'bookstores-stationery.html',
  'beauty-fashion/apparel/index.html',
  'beauty-fashion/salons/index.html',
  'beauty-fashion/cosmetics/index.html',
  'services/gyms/index.html',
  'services/dry-cleaners/index.html'
];

console.log('--- Checking base href, google fonts, stylesheets ---');
pages.forEach(p => {
  const full = path.resolve(__dirname, '..', p);
  if (!fs.existsSync(full)) {
    console.log(p, 'MISSING');
    return;
  }
  const content = fs.readFileSync(full, 'utf8');
  const hasBase = content.includes('<base href="/"') || content.includes("<base href='/'");
  const hasFraunces = content.includes('Fraunces');
  const links = (content.match(/<link[^>]*rel=["']stylesheet["'][^>]*>/gi) || []).map(l => {
    const m = l.match(/href=["']([^"']*)["']/i);
    return m ? m[1] : l;
  });
  console.log(p, { hasBase, hasFraunces, linksCount: links.length, stylesheets: links.filter(l => !l.includes('fonts.googleapis')) });
});

