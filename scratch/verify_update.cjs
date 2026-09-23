const fs = require('fs');

const sampleFiles = [
  'bakeries.html',
  'qsr-fast-food.html',
  'retail/grocery.html',
  'dist/qsr-fast-food.html',
  'business-types.html'
];

sampleFiles.forEach(f => {
  if (fs.existsSync(f)) {
    const text = fs.readFileSync(f, 'utf8');
    const mClean = text.match(/<ul[^>]*class=["'][^"']*clean-nav-links[^"']*["'][^>]*>([\s\S]*?)<\/ul>/i);
    const mNav = text.match(/<ul[^>]*class=["'][^"']*nav-links[^"']*["'][^>]*>([\s\S]*?)<\/ul>/i);
    console.log('====================================');
    console.log('FILE:', f);
    if (mClean) {
      console.log('CLEAN NAV:');
      console.log(mClean[0].slice(0, 450));
    }
    if (mNav) {
      console.log('REGULAR NAV:');
      console.log(mNav[0].slice(0, 350));
    }
  }
});
