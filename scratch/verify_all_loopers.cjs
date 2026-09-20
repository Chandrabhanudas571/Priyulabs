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

const all = walk('.');
const targets = all.filter(f => {
  const norm = f.replace(/\\/g, '/');
  if (norm.endsWith('.new-backup')) return false;
  return (
    norm.includes('food-beverage') ||
    norm.includes('retail') ||
    norm.includes('fashion-beauty') ||
    norm.includes('beauty-fashion') ||
    norm.includes('wellness') ||
    norm.includes('services') ||
    norm.includes('business-types') ||
    norm.includes('all-business-types') ||
    norm.includes('restaurants') ||
    norm.includes('qsr') ||
    norm.includes('cafes') ||
    norm.includes('cloud-kitchens') ||
    norm.includes('bakeries') ||
    norm.includes('bars-pubs') ||
    norm.includes('grocery') ||
    norm.includes('electronics') ||
    norm.includes('footwear') ||
    norm.includes('jewellery') ||
    norm.includes('jewelry') ||
    norm.includes('watches') ||
    norm.includes('watch-stores') ||
    norm.includes('bookstores') ||
    norm.includes('apparel') ||
    norm.includes('salons') ||
    norm.includes('cosmetics') ||
    norm.includes('gyms') ||
    norm.includes('fitness') ||
    norm.includes('dry-cleaners') ||
    norm.includes('laundry') ||
    norm.includes('hospitality') ||
    norm.includes('complete-management-system') ||
    norm.includes('digital-marketing') ||
    norm.includes('solutions') ||
    norm.includes('pos.html') ||
    norm.includes('website-builder') ||
    norm === 'index.html' ||
    norm === 'dist/index.html'
  );
});

let missingBg = [];
let missingLooper = [];
let singleVidOnly = [];

targets.forEach(f => {
  const s = fs.readFileSync(f, 'utf8');
  if (!s.includes('global-fluid-bg')) missingBg.push(f);
  if (!s.includes('initSeamlessVideoLooper')) missingLooper.push(f);
  const vids = (s.match(/bg-vid/g) || []).length;
  if (vids < 2) singleVidOnly.push({ file: f, vids });
});

console.log('Total verified targets:', targets.length);
console.log('Missing global-fluid-bg:', missingBg.length);
console.log('Missing initSeamlessVideoLooper:', missingLooper.length);
console.log('Files with fewer than 2 bg-vids:', singleVidOnly.length);
if (singleVidOnly.length > 0) {
  console.log('Sample fewer than 2:', singleVidOnly.slice(0, 5));
}
