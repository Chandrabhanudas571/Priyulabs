const fs = require('fs');

const samplePages = [
  'index.html',
  'pos.html',
  'cloud-kitchens-catering.html',
  'grocery-supermarkets-kirana.html',
  'apparel-boutiques/index.html',
  'cafes-chai-bars.html',
  'restaurants-fine-dining.html',
  'electronics-mobile-shops.html',
  'all-business-types.html'
];

samplePages.forEach(p => {
  if (!fs.existsSync(p)) return;
  const content = fs.readFileSync(p, 'utf8');
  const footerMatch = content.match(/<footer[^>]*>([\s\S]*?)<\/footer>/i);
  console.log('=== PAGE:', p, '===');
  if (footerMatch) {
    const tag = content.match(/<footer[^>]*>/i)[0];
    console.log('Footer Tag:', tag);
    const classes = Array.from(footerMatch[0].matchAll(/class=["']([^"']+)["']/g)).map(m => m[1]);
    console.log('Sample classes inside footer:', Array.from(new Set(classes.flatMap(c => c.split(/\s+/)))).slice(0, 10));
  } else {
    console.log('NO FOOTER FOUND');
  }
});

