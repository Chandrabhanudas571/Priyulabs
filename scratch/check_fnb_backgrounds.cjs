const fs = require('fs');

const fnbFiles = [
  'restaurants-fine-dining.html',
  'qsr-fast-food.html',
  'cafes-chai-bars.html',
  'cloud-kitchens-catering.html',
  'bakeries-patisseries.html',
  'bakeries-shops.html',
  'bakeries.html',
  'bars-pubs-breweries.html',
  'bars-pubs.html',
  'food-beverage.html'
];

fnbFiles.forEach(f => {
  if (!fs.existsSync(f)) return;
  const s = fs.readFileSync(f, 'utf8');
  console.log(`\n=== Checking ${f} ===`);
  const lines = s.split('\n');
  lines.forEach((l, i) => {
    if ((l.includes('section') || l.includes('hero') || l.includes('body') || l.includes('wrap') || l.includes('main')) && l.includes('{')) {
      // Look ahead 5 lines for background
      for (let j = i; j < Math.min(lines.length, i + 8); j++) {
        if (lines[j].includes('background') && !lines[j].includes('transparent') && !lines[j].includes('button') && !lines[j].includes('badge') && !lines[j].includes('btn') && !lines[j].includes('card') && !lines[j].includes('dot') && !lines[j].includes('icon')) {
          console.log(`  Line ${j+1}: [${lines[i].trim()}] -> ${lines[j].trim()}`);
          break;
        }
      }
    }
  });
});
