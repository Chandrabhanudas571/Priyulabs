const fs = require('fs');
const path = require('path');

function checkBase(f) {
  if (!fs.existsSync(f)) return;
  const text = fs.readFileSync(f, 'utf8');
  const baseMatch = text.match(/<base[^>]*>/i);
  console.log(f, '->', baseMatch ? baseMatch[0] : 'NO <base> tag');
}

checkBase('solutions.html');
checkBase('solutions/index.html');
checkBase('solutions/barcode/index.html');
checkBase('solutions/inventory/index.html');
checkBase('pos.html');
checkBase('complete-management-system.html');
checkBase('website-builder.html');
checkBase('digital-marketing.html');
