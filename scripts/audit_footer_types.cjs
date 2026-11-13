const fs = require('fs');
const path = require('path');

function getAllHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === 'node_modules' || file === '.git' || file === 'brain' || file === 'test-artifacts' || file.startsWith('.')) continue;
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllHtmlFiles(filePath, fileList);
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const htmlFiles = getAllHtmlFiles('.');
console.log('Total HTML files found:', htmlFiles.length);

const footerTypes = {};
htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const m = content.match(/<footer([\s\S]*?)<\/footer>/i);
  if (!m) {
    footerTypes['NO_FOOTER'] = (footerTypes['NO_FOOTER'] || []).concat(file);
    return;
  }
  const tagOpen = m[0].match(/<footer[^>]*>/i)[0];
  const typeKey = tagOpen.replace(/\s+style="[^"]*"/i, '').trim();
  footerTypes[typeKey] = (footerTypes[typeKey] || []).concat(file);
});

for (const [key, files] of Object.entries(footerTypes)) {
  console.log(key, 'count:', files.length, 'example:', files[0]);
}

