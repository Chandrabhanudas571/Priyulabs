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
const buttonTags = {};
const linkBtnClasses = {};
const allButtonsFound = [];

for (const filePath of htmlFiles) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // button tags
  const btnMatches = content.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/gi);
  for (const m of btnMatches) {
    const attrs = m[1];
    const text = m[2].replace(/<[^>]+>/g, '').trim();
    const classMatch = attrs.match(/class=["']([^"']*)["']/i);
    const cls = classMatch ? classMatch[1] : '[no-class]';
    cls.split(/\s+/).forEach(c => {
      buttonTags[c] = (buttonTags[c] || 0) + 1;
    });
    if (allButtonsFound.length < 50) {
      allButtonsFound.push({ file: filePath, tag: 'button', cls, text: text.slice(0, 30) });
    }
  }

  // a tags with btn or cta
  const aMatches = content.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi);
  for (const m of aMatches) {
    const attrs = m[1];
    const text = m[2].replace(/<[^>]+>/g, '').trim();
    const classMatch = attrs.match(/class=["']([^"']*)["']/i);
    if (classMatch) {
      const cls = classMatch[1];
      if (/btn|cta|glow/i.test(cls)) {
        cls.split(/\s+/).forEach(c => {
          linkBtnClasses[c] = (linkBtnClasses[c] || 0) + 1;
        });
        if (allButtonsFound.length < 100) {
          allButtonsFound.push({ file: filePath, tag: 'a', cls, text: text.slice(0, 30) });
        }
      }
    }
  }
}

console.log('=== Total HTML Files scanned:', htmlFiles.length);
console.log('\n=== Top Button Tag Classes ===');
console.log(Object.entries(buttonTags).sort((a,b) => b[1] - a[1]).slice(0, 30));
console.log('\n=== Top Link Button/CTA Classes ===');
console.log(Object.entries(linkBtnClasses).sort((a,b) => b[1] - a[1]).slice(0, 30));
