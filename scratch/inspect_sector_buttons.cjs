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
console.log('Total sector html files found:', files.length);

const results = [];
for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  // Look for hero actions or btn-outline-clean or See ... Features
  const heroMatch = content.match(/<div class="[^"]*hero-actions[^"]*">([\s\S]*?)<\/div>/i);
  const btnOutlineMatch = content.match(/<a[^>]*class="[^"]*btn-outline-clean[^"]*"[^>]*>([\s\S]*?)<\/a>/i);
  
  if (heroMatch || btnOutlineMatch) {
    results.push({
      file: path.relative(rootDir, file),
      heroButtons: heroMatch ? heroMatch[1].trim().replace(/\s+/g, ' ') : null,
      btnOutline: btnOutlineMatch ? btnOutlineMatch[0].trim().replace(/\s+/g, ' ') : null,
    });
  }
}

console.log('Files with matching buttons:', results.length);
results.slice(0, 15).forEach(r => {
  console.log('FILE:', r.file);
  if (r.btnOutline) console.log('  BTN:', r.btnOutline.slice(0, 120));
});
