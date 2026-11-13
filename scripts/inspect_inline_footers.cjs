const fs = require('fs');
['complete-management-system/index.html', 'complete-management-system.html', 'digital-marketing/index.html', 'website-builder/index.html'].forEach(p => {
  if (!fs.existsSync(p)) return;
  const c = fs.readFileSync(p, 'utf8');
  const m = c.match(/<footer[^>]*>/i);
  console.log(p, '->', m ? m[0] : 'no footer');
});

