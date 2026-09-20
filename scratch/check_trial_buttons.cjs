const fs = require('fs');
const path = require('path');

function walk(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === 'node_modules' || file === '.git' || file === 'apps' || file === 'scratch') continue;
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      walk(filePath, fileList);
    } else if (file.endsWith('.html') && file !== 'index.html' && !file.includes('new-backup')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const files = walk('.');
console.log('Total sector & other HTML files:', files.length);

let hrefMap = {};
let sampleFiles = [];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  // Look for links with Start Free Trial or Get Started or Free Trial
  const regex = /<a[^>]*href=["']([^"']*)["'][^>]*>[\s\S]*?(?:Start\s*(?:Your\s*)?Free\s*Trial|Get\s*Started)[\s\S]*?<\/a>/gi;
  let m;
  while ((m = regex.exec(content)) !== null) {
    const href = m[1];
    hrefMap[href] = (hrefMap[href] || 0) + 1;
    if (sampleFiles.length < 10) {
      sampleFiles.push({ file: f, href, fullTag: m[0].replace(/\s+/g, ' ').slice(0, 100) });
    }
  }
});

console.log('Href distribution:', hrefMap);
console.log('Samples:', sampleFiles);
