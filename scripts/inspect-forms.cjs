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
const forms = [];

for (const f of htmlFiles) {
  const content = fs.readFileSync(f, 'utf8');
  const formMatches = content.matchAll(/<form\b([\s\S]*?)<\/form>/gi);
  for (const fm of formMatches) {
    const formHtml = fm[0];
    const submitMatches = formHtml.matchAll(/<(button|input)\b([^>]*)>([\s\S]*?<\/(?:button)>)?/gi);
    for (const sm of submitMatches) {
      const full = sm[0];
      const tag = sm[1];
      const attrs = sm[2];
      if (/type=["']submit["']/i.test(attrs) || /btn|cta|submit/i.test(attrs) || tag === 'button') {
        const clsMatch = attrs.match(/class=["']([^"']*)["']/i);
        const text = sm[3] ? sm[3].replace(/<[^>]+>/g, '').trim() : '';
        forms.push({ file: f, tag, cls: clsMatch ? clsMatch[1] : '', text });
      }
    }
  }
}

console.log('Total Form Submit buttons found:', forms.length);
const classSet = {};
for (const item of forms) {
  for (const c of item.cls.split(/\s+/).filter(Boolean)) {
    classSet[c] = (classSet[c] || 0) + 1;
  }
}
console.log('Top classes in forms:', Object.entries(classSet).sort((a,b) => b[1] - a[1]));
console.log('Sample form buttons:', forms.slice(0, 15));
