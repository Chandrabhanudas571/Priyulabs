const fs = require('fs');
const path = require('path');

function getHtmlFiles(dir, list = []) {
  fs.readdirSync(dir).forEach(f => {
    if (f === 'node_modules' || f === '.git' || f === 'brain' || f === 'test-artifacts' || f.startsWith('.')) return;
    const fp = path.join(dir, f);
    if (fs.statSync(fp).isDirectory()) getHtmlFiles(fp, list);
    else if (f.endsWith('.html')) list.push(fp);
  });
  return list;
}

const files = getHtmlFiles('.');
const missingStylesheets = [];

files.forEach(f => {
  const c = fs.readFileSync(f, 'utf8');
  const hasStyleCss = /style\.css/i.test(c);
  const hasMobileCss = /business-types-mobile\.css/i.test(c);
  if (!hasStyleCss && !hasMobileCss) {
    missingStylesheets.push(f);
  }
});

console.log('Files missing both style.css and business-types-mobile.css (', missingStylesheets.length, '):');
console.log(missingStylesheets);

