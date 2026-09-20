const fs = require('fs');
const path = require('path');

function walk(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === 'node_modules' || file === '.git' || file === 'apps' || file === 'scratch') continue;
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      walk(filePath, fileList);
    } else if (file.endsWith('.html') && !file.includes('new-backup')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const allFiles = walk('.');
let modified = 0;

for (const file of allFiles) {
  const norm = file.replace(/\\/g, '/');
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  if (norm === 'index.html') {
    // Already updated above
    continue;
  }

  // Determine depth relative to root
  let relPrefix = '/index.html#core-capabilities';
  if (norm.includes('/')) {
    const depth = norm.split('/').length - 1;
    relPrefix = '../'.repeat(depth) + 'index.html#core-capabilities';
  }

  // Update <a ...>What's new</a>
  const regex = /<a\s+([^>]*?)href=["'][^"']*["']([^>]*?)>([\s\S]*?What['’]s new[\s\S]*?)<\/a>/gi;
  const newContent = content.replace(regex, (match, p1, p2, text) => {
    changed = true;
    const cleanP1 = p1.replace(/onclick=["'][^"']*["']/gi, '').trim();
    const cleanP2 = p2.replace(/onclick=["'][^"']*["']/gi, '').trim();
    return `<a ${cleanP1 ? cleanP1 + ' ' : ''}href="/index.html#core-capabilities"${cleanP2 ? ' ' + cleanP2 : ''}>${text}</a>`;
  });

  if (changed) {
    fs.writeFileSync(file, newContent, 'utf8');
    modified++;
  }
}

// Also sync index.html to dist/index.html
fs.copyFileSync('index.html', 'dist/index.html');

console.log(`Updated What's new links in ${modified} files and synced dist/index.html!`);
