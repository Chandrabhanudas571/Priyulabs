const fs = require('fs');
const path = require('path');

function getHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      if (!['node_modules', '.git', 'test-artifacts', 'backup-images', 'backup-media', 'dist'].includes(file)) {
        results = results.concat(getHtmlFiles(full));
      }
    } else if (file.endsWith('.html')) {
      results.push(full);
    }
  });
  return results;
}

const all = getHtmlFiles('.');
let bareBaseFiles = [];
all.forEach(f => {
  const c = fs.readFileSync(f, 'utf8');
  if (c.includes('<base href="/"') && !c.includes("protocol !== 'file:'")) {
    bareBaseFiles.push(f);
  }
});

console.log('Files with bare <base href="/"> without file protocol guard:', bareBaseFiles.length);
console.log('Sample:', bareBaseFiles.slice(0, 10));

