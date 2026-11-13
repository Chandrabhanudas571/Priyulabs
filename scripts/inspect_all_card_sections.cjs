const fs = require('fs');

const sampleFiles = [
  'apparel-boutiques/index.html',
  'cloud-kitchens-catering.html',
  'grocery-supermarkets-kirana.html',
  'cafes-chai-bars.html',
  'electronics-mobile-shops.html',
  'salons-spas.html',
  'restaurants-fine-dining.html'
];

sampleFiles.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  console.log('=== File:', f, '===');
  const grids = content.match(/class=["'][^"']*(grid|cards|matrix|features|triptych|stream)[^"']*["']/gi) || [];
  const unique = Array.from(new Set(grids)).slice(0, 8);
  console.log('Grids/Card sets:', unique);
});

