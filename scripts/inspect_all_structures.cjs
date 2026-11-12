const fs = require('fs');
const path = require('path');

const sampleFiles = [
  // Directory
  'all-business-types.html',
  'business-types.html',
  // Food & Beverage
  'restaurants-fine-dining.html',
  'qsr-fast-food.html',
  // Retail
  'grocery-supermarkets-kirana.html',
  'electronics-mobile-shops.html',
  'footwear-leather-stores.html',
  'jewellery-shops.html',
  // Beauty & Fashion
  'beauty-fashion/apparel/index.html',
  'beauty-fashion/salons/index.html',
  'beauty-fashion/cosmetics/index.html',
  // Services
  'services/gyms/index.html',
  'services/dry-cleaners/index.html'
];

sampleFiles.forEach(f => {
  const fullPath = path.resolve(__dirname, '..', f);
  if (!fs.existsSync(fullPath)) {
    console.log(f, 'FILE NOT FOUND');
    return;
  }
  const content = fs.readFileSync(fullPath, 'utf8');
  const heroMatch = content.match(/<section[^>]*class=["']([^"']*hero[^"']*)["']/i);
  const h1Match = content.match(/<h1[^>]*class=["']([^"']*)["'][^>]*>([\s\S]*?)<\/h1>/i);
  const badgeMatch = content.match(/class=["']([^"']*(?:badge|pill|eyebrow)[^"']*)["'][^>]*>([\s\S]*?)<\/(?:span|div)>/i);
  const buttons = content.match(/<a[^>]*class=["']([^"']*(?:btn|cta)[^"']*)["']/gi);

  console.log(`\n=== ${f} ===`);
  console.log(`Hero Section: ${heroMatch ? heroMatch[1] : 'NONE'}`);
  console.log(`H1 Class: ${h1Match ? h1Match[1] : 'NONE'} | Text: ${h1Match ? h1Match[2].replace(/\s+/g, ' ').trim().slice(0, 40) : 'NONE'}`);
  console.log(`Badge/Eyebrow: ${badgeMatch ? badgeMatch[1] : 'NONE'} | Text: ${badgeMatch ? badgeMatch[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim() : 'NONE'}`);
  console.log(`CTA Buttons found: ${buttons ? buttons.length : 0}`);
});

