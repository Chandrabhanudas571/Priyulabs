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

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const rel = path.relative(rootDir, file);
  
  // Find second button in hero
  const heroMatch = content.match(/<div class="[^"]*(?:hero-actions|clean-hero-actions)[^"]*">([\s\S]*?)<\/div>/i);
  if (heroMatch) {
    const btns = heroMatch[1].match(/<a[^>]*>[\s\S]*?<\/a>|<button[^>]*>[\s\S]*?<\/button>/gi) || [];
    if (btns.length >= 2) {
      const secondBtn = btns[1];
      const hrefMatch = secondBtn.match(/href="([^"]*)"/);
      if (hrefMatch && hrefMatch[1].startsWith('#')) {
        const id = hrefMatch[1].slice(1);
        const hasId = content.includes(`id="${id}"`) || content.includes(`id='${id}'`);
        console.log(`${rel}: href="#${id}" target exists? ${hasId}`);
      }
    }
  }
}
