const fs = require('fs');

function inspectGrocery(f) {
  if (!fs.existsSync(f)) {
    console.log(f, 'NOT FOUND');
    return;
  }
  const content = fs.readFileSync(f, 'utf8');
  console.log('===', f, '===');
  console.log('Size:', content.length);
  console.log('Has business-types-mobile.css:', content.includes('business-types-mobile.css'));
  console.log('Has business-types-mobile.js:', content.includes('business-types-mobile.js'));

  // Look for pillars section
  const sec = content.match(/<section[^>]*id=["']pillars["'][^>]*>[\s\S]*?<\/section>/i) ||
              content.match(/<section[^>]*class=["'][^"']*pillar[^"']*["'][^>]*>[\s\S]*?<\/section>/i);
  if (sec) {
    console.log('Pillars section found, length:', sec[0].length);
    // Find all classes in section
    const classes = Array.from(sec[0].matchAll(/class=["']([^"']+)["']/g)).map(m => m[1]);
    const unique = Array.from(new Set(classes.flatMap(c => c.split(/\s+/))));
    console.log('Classes inside pillars:', unique.filter(c => c.includes('pillar') || c.includes('card') || c.includes('tab') || c.includes('container') || c.includes('sec')));
  } else {
    console.log('No pillars section found!');
  }
}

inspectGrocery('grocery-supermarkets-kirana.html');
inspectGrocery('retail/grocery/index.html');
inspectGrocery('retail/grocery.html');
inspectGrocery('grocery.html');
inspectGrocery('grocery/index.html');

