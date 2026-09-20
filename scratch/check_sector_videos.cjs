const fs = require('fs');
const path = require('path');

function walk(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === 'node_modules' || file === '.git' || file === 'dist' || file === 'apps') continue;
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

const allHtml = walk('.');
console.log('Total non-dist non-apps HTML files:', allHtml.length);

const sectorPatterns = [
  'restaurant', 'qsr', 'cafe', 'cloud-kitchen', 'baker', 'bar',
  'grocery', 'electronic', 'footwear', 'jewel', 'watch', 'bookstore',
  'apparel', 'salon', 'cosmetic', 'gym', 'dry-clean', 'laundry',
  'fitness', 'business-type', 'retail', 'food-beverage', 'hospitality'
];

const sectorFiles = allHtml.filter(f => {
  const lower = f.toLowerCase();
  return sectorPatterns.some(p => lower.includes(p));
});

console.log('Sector files found:', sectorFiles.length);
sectorFiles.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const hasFluidBg = content.includes('global-fluid-bg');
  const hasLooper = content.includes('initSeamlessVideoLooper');
  const vidMatches = content.match(/<video[\s\S]*?<\/video>/gi) || [];
  console.log(`${f} => fluidBg:${hasFluidBg}, looper:${hasLooper}, videoTags:${vidMatches.length}`);
});
