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
const flexFootGridFiles = [];
const inlineFootGridFiles = [];
const inlineFooterFiles = [];

files.forEach(f => {
  const c = fs.readFileSync(f, 'utf8');
  if (/\.foot-grid\s*\{[^}]*display:\s*flex/i.test(c)) {
    flexFootGridFiles.push(f);
  }
  if (/<div[^>]*class=["'][^"']*foot-grid[^"']*["'][^>]*style=/i.test(c)) {
    inlineFootGridFiles.push(f);
  }
  if (/<footer[^>]*style=/i.test(c)) {
    inlineFooterFiles.push(f);
  }
});

console.log('flexFootGridFiles (', flexFootGridFiles.length, '):', flexFootGridFiles);
console.log('inlineFootGridFiles (', inlineFootGridFiles.length, '):', inlineFootGridFiles);
console.log('inlineFooterFiles (', inlineFooterFiles.length, '):', inlineFooterFiles.slice(0, 10));

