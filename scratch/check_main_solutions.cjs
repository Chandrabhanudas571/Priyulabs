const fs = require('fs');

const mainSolPages = [
  'pos.html',
  'complete-management-system.html',
  'website-builder.html',
  'digital-marketing.html',
  'dist/pos.html',
  'dist/complete-management-system.html',
  'dist/website-builder.html',
  'dist/digital-marketing.html',
  'pos/index.html',
  'complete-management-system/index.html',
  'website-builder/index.html',
  'digital-marketing/index.html',
  'dist/pos/index.html',
  'dist/complete-management-system/index.html',
  'dist/website-builder/index.html',
  'dist/digital-marketing/index.html',
];

mainSolPages.forEach(f => {
  if (fs.existsSync(f)) {
    const text = fs.readFileSync(f, 'utf8');
    const hasFooter = text.includes('<footer');
    const hasMakeInIndia = text.includes('Make in India') || text.includes('Made in india');
    console.log(f, '-> has <footer>:', hasFooter, '| has MakeInIndia:', hasMakeInIndia);
  }
});
