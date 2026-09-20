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

const sectorList = [];

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const rel = path.relative(rootDir, file);
  
  // Look for any anchor with href starting with '#' inside hero actions or btn-outline-clean
  const hashAnchors = [...content.matchAll(/<a[^>]*href="(#[^"]*)"[^>]*>([\s\S]*?)<\/a>/gi)];
  
  if (hashAnchors.length > 0) {
    const heroAnchors = hashAnchors.filter(a => {
      const tag = a[0];
      return tag.includes('btn-outline-clean') || tag.includes('hero') || a[2].includes('Features') || a[2].includes('Speed') || a[2].includes('See') || a[2].includes('View');
    });
    
    sectorList.push({
      file: rel,
      anchors: hashAnchors.map(a => ({ href: a[1], text: a[2].replace(/<[^>]+>/g, '').trim() }))
    });
  }
}

console.log('Sector files with hash links:', sectorList.length);
sectorList.forEach(s => {
  console.log(s.file, ':', s.anchors.map(a => `${a.href} (${a.text})`).join(' | '));
});
