const fs = require('fs');
const path = require('path');

const pages = [
  'all-business-types.html',
  'business-types.html',
  'restaurants-fine-dining.html',
  'qsr-fast-food.html',
  'cafes-chai-bars.html',
  'cloud-kitchens-catering.html',
  'bakeries-shops.html',
  'bars-pubs-breweries.html',
  'grocery-supermarkets-kirana.html',
  'electronics-mobile-shops.html',
  'footwear-leather-stores.html',
  'jewellery-shops.html',
  'watch-stores.html',
  'bookstores-stationery.html',
  'beauty-fashion/apparel/index.html',
  'beauty-fashion/salons/index.html',
  'beauty-fashion/cosmetics/index.html',
  'services/gyms/index.html',
  'services/dry-cleaners/index.html'
];

console.log('--- Inspecting Pillars & Final CTA markup ---');
pages.forEach(p => {
  const full = path.resolve(__dirname, '..', p);
  if (!fs.existsSync(full)) return;
  const content = fs.readFileSync(full, 'utf8');
  
  // Pillars
  const pillarSection = content.match(/<section[^>]*id=["'](?:pillars|matrix-features|chair-features|gym-features|laundry-features|features|what-we-build)[^"']*["'][^>]*>/i)
                     || content.match(/<section[^>]*class=["'][^"']*(?:pillar|clean-pillar)[^"']*["'][^>]*>/i);
  
  // Count pillar cards / rows
  const pillarRows = content.match(/class=["'][^"']*(?:pillar-row|pillar-card|clean-pillar-card)[^"']*["']/gi);
  
  // Final CTA
  const hasNational = content.includes('National') || content.includes('NATIONAL');
  const finalCta = content.match(/class=["'][^"']*(?:clean-cta|bottom-cta|cta-box|cta-card|cta-sec)[^"']*["']/gi)
                || content.match(/Turn Every Dining Table|high-margin|Engineered for/i);

  console.log(p, {
    pillarSec: pillarSection ? pillarSection[0].slice(0, 50) : 'NONE',
    pillarCount: pillarRows ? pillarRows.length : 0,
    hasNational,
    hasFinalCta: !!finalCta
  });
});
