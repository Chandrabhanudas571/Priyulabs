const fs = require('fs');

const sampleFiles = [
  'pos.html',
  'digital-marketing.html',
  'all-business-types.html',
  'retail.html',
  'solutions/inventory/index.html'
];

sampleFiles.forEach(f => {
  if (fs.existsSync(f)) {
    const content = fs.readFileSync(f, 'utf8');
    const links = content.match(/<link[^>]+rel=["']stylesheet["'][^>]*>/gi) || [];
    console.log(`=== ${f} ===`);
    links.forEach(l => console.log('  ', l));
  }
});
