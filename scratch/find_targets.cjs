const fs = require('fs');
const path = require('path');

function getAllHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === 'node_modules' || file === '.git' || file === 'brain') continue;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      getAllHtmlFiles(fullPath, fileList);
    } else if (file.endsWith('.html') && file !== 'index.html' && file !== 'interactive-demo.html') {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const rootDir = 'c:\\Users\\chand\\Downloads\\Antigravity';
const files = getAllHtmlFiles(rootDir);

const report = [];

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const rel = path.relative(rootDir, file);
  
  // Find hero section
  const heroEndIdx = content.search(/<\/section>[\s\S]*?(?:<!--.*?-->[\s\S]*?)?<section/i);
  
  // Find second button in hero
  const heroMatch = content.match(/<div class="[^"]*(?:hero-actions|clean-hero-actions)[^"]*">([\s\S]*?)<\/div>/i);
  
  let secondBtn = null;
  let targetId = null;
  if (heroMatch) {
    const btns = heroMatch[1].match(/<a[^>]*>[\s\S]*?<\/a>|<button[^>]*>[\s\S]*?<\/button>/gi) || [];
    if (btns.length >= 2) {
      secondBtn = btns[1];
      const hrefMatch = secondBtn.match(/href="([^"]*)"/);
      if (hrefMatch) targetId = hrefMatch[1];
    }
  }

  // Find the first section after hero
  const sections = [...content.matchAll(/<section[^>]*id="([^"]*)"[^>]*>/gi)].map(m => m[1]);
  const allSectionTags = [...content.matchAll(/<section([^>]*)>/gi)].map(m => m[1]);

  report.push({
    file: rel,
    secondBtn: secondBtn ? secondBtn.replace(/<[^>]+>/g, '').trim() : null,
    targetId,
    sections,
  });
}

console.log('Processed', report.length, 'HTML files');
const withSecondBtn = report.filter(r => r.secondBtn);
console.log('Files with second hero button:', withSecondBtn.length);
withSecondBtn.slice(0, 30).forEach(r => {
  console.log(`${r.file}: BTN="${r.secondBtn}" TARGET="${r.targetId}" SECTIONS=[${r.sections.join(', ')}]`);
});
