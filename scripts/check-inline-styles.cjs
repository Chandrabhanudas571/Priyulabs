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
const pagesWithInlineBtnStyles = [];

for (const f of htmlFiles) {
  const content = fs.readFileSync(f, 'utf8');
  const styleMatches = content.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi);
  for (const sm of styleMatches) {
    const styleContent = sm[1];
    if (/\.(btn|cta|submit|hero-wa|m-nav-trial)/i.test(styleContent)) {
      pagesWithInlineBtnStyles.push(f);
      break;
    }
  }
}

console.log('Pages with inline <style> button definitions:', pagesWithInlineBtnStyles.length);
console.log('First 20:', pagesWithInlineBtnStyles.slice(0, 20));
