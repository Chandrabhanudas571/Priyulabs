const fs = require('fs');
const slugs = [
  'restaurants-fine-dining',
  'qsr-fast-food',
  'cafes-chai-bars',
  'cloud-kitchens-catering',
  'bakeries-shops',
  'bars-pubs-breweries',
  'grocery-supermarkets-kirana',
  'electronics-mobile-shops',
  'footwear-leather-stores',
  'jewellery-shops',
  'watch-stores',
  'bookstores-stationery'
];

slugs.forEach(s => {
  const p = s + '/index.html';
  console.log(s, fs.existsSync(p) ? 'HAS SUBDIR INDEX' : 'ROOT ONLY');
});

