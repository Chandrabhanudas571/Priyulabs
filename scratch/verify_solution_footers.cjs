const fs = require('fs');

const sampleFiles = [
  'solutions.html',
  'solutions/index.html',
  'pos.html',
  'complete-management-system.html',
  'website-builder.html',
  'digital-marketing.html',
  'solutions/barcode/index.html',
  'solutions/inventory/index.html',
  'dist/solutions.html',
  'dist/pos.html'
];

sampleFiles.forEach(f => {
  if (fs.existsSync(f)) {
    const text = fs.readFileSync(f, 'utf8');
    const m = text.match(/<footer[\s\S]*?<\/footer>/i);
    console.log('====================================');
    console.log('FILE:', f);
    if (m) {
      const hasLogo = m[0].includes('PriyuLabs');
      const hasMakeInIndia = m[0].includes('MAKE IN INDIA');
      const hasMsme = m[0].includes('UDYAM-OD-19-0177979');
      const hasVersion = m[0].includes('v2.4.68');
      const has4Col = m[0].includes('foot-grid');
      console.log(`Length: ${m[0].length} | Logo: ${hasLogo} | MakeInIndia: ${hasMakeInIndia} | MSME: ${hasMsme} | Version: ${hasVersion} | 4-Col Grid: ${has4Col}`);
    } else {
      console.log('NO FOOTER FOUND!');
    }
  } else {
    console.log('File does not exist:', f);
  }
});
