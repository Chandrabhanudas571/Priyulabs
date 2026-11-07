const fs = require('fs');
const path = require('path');

function getHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === 'node_modules' || file === '.git' || file === 'scratch') continue;
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      getHtmlFiles(filePath, fileList);
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const htmlFiles = getHtmlFiles('.');
const withoutStyleCss = [];
const withStyleCss = [];

for (const f of htmlFiles) {
  const content = fs.readFileSync(f, 'utf8');
  if (content.includes('style.css')) {
    withStyleCss.push(f);
  } else {
    withoutStyleCss.push(f);
  }
}

console.log('HTML files WITH style.css:', withStyleCss.length);
console.log('HTML files WITHOUT style.css:', withoutStyleCss.length);
console.log('Files without style.css:\n', withoutStyleCss.join('\n'));
