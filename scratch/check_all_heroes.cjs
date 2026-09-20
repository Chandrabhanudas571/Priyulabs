const fs = require('fs');
const path = require('path');

function getAllHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === 'node_modules' || file === '.git' || file === 'brain' || file === 'dist') continue;
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
  
  // Find buttons or links with hash href or in hero
  const heroMatch = content.match(/<div class="[^"]*(?:hero-actions|clean-hero-actions)[^"]*">([\s\S]*?)<\/div>/i);
  if (heroMatch) {
    console.log(`\n=== ${rel} ===`);
    const links = heroMatch[1].match(/<a[^>]*>[\s\S]*?<\/a>|<button[^>]*>[\s\S]*?<\/button>/gi) || [];
    links.forEach(l => {
      const text = l.replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ');
      const hrefMatch = l.match(/href="([^"]*)"/);
      const onclickMatch = l.match(/onclick="([^"]*)"/);
      console.log(`  Tag: ${hrefMatch ? 'href=' + hrefMatch[1] : ''} ${onclickMatch ? 'onclick=' + onclickMatch[1] : ''} | Text: "${text}"`);
    });
  }
}
