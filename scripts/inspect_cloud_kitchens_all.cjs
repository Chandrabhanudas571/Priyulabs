const fs = require('fs');

function inspectFile(f) {
  if (!fs.existsSync(f)) {
    console.log(f, 'DOES NOT EXIST');
    return;
  }
  const content = fs.readFileSync(f, 'utf8');
  console.log('=== File:', f, '===');
  console.log('File size:', content.length);
  console.log('Has business-types-mobile.css:', content.includes('business-types-mobile.css'));
  console.log('Has business-types-mobile.js:', content.includes('business-types-mobile.js'));

  // Look for CSS links
  const links = content.match(/<link[^>]*rel=["']stylesheet["'][^>]*>/gi) || [];
  console.log('CSS links:', links.map(l => l.replace(/\s+/g, ' ')));

  // Look for script tags
  const scripts = content.match(/<script[^>]*src=[^>]*>/gi) || [];
  console.log('Script tags:', scripts.map(s => s.replace(/\s+/g, ' ')));

  // Look for pillar sections
  const secMatches = content.match(/<section[^>]*class=["'][^"']*pillar[^"']*["'][^>]*>/gi) || [];
  console.log('Pillar sections by class:', secMatches);

  const idMatches = content.match(/<section[^>]*id=["'][^"']*pillar[^"']*["'][^>]*>/gi) || [];
  console.log('Pillar sections by id:', idMatches);

  // Look for pillar card classes
  const cards = content.match(/class=["'][^"']*pillar-[^"']*["']/gi) || [];
  const uniqueCardClasses = Array.from(new Set(cards)).slice(0, 10);
  console.log('Sample pillar classes:', uniqueCardClasses);
}

inspectFile('food-beverage/cloud-kitchens/index.html');
inspectFile('cloud-kitchens.html');
inspectFile('cloud-kitchens-catering.html');
inspectFile('food-beverage/cloud-kitchens-catering/index.html');
inspectFile('cloud-kitchens-catering/index.html');
inspectFile('cloud-kitchens/index.html');

