const fs = require('fs');

const files = [
  'complete-management-system.html',
  'pos.html',
  'website-builder.html',
  'digital-marketing.html',
  'solutions.html',
  'solutions/index.html',
  'solutions/barcode/index.html'
];

files.forEach(f => {
  if (!fs.existsSync(f)) return;
  const text = fs.readFileSync(f, 'utf8');
  const headerMatch = text.match(/<header[^>]*>[\s\S]*?<\/header>/i) || text.match(/<nav[^>]*class=["'][^"']*navbar[^"']*["'][^>]*>[\s\S]*?<\/nav>/i);
  console.log('====================================');
  console.log('FILE:', f);
  if (headerMatch) {
    console.log(headerMatch[0].slice(0, 200));
  } else {
    console.log('NO HEADER OR NAVBAR MATCH');
  }
});
