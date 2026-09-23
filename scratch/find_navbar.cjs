const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      if (f !== 'node_modules' && f !== '.git' && f !== '.system_generated') {
        walkDir(dirPath, callback);
      }
    } else {
      callback(dirPath);
    }
  });
}

const patterns = new Set();
walkDir('.', (filePath) => {
  if (filePath.endsWith('.html')) {
    const text = fs.readFileSync(filePath, 'utf8');
    if (text.includes('clean-nav-links')) {
      const match = text.match(/<ul[^>]*class=["'][^"']*clean-nav-links[^"']*["'][^>]*>([\s\S]*?)<\/ul>/);
      if (match) {
        // extract first <li> inside <ul>
        const liMatch = match[1].match(/\s*<li>[\s\S]*?<\/li>/);
        if (liMatch) {
          patterns.add(liMatch[0].trim());
        }
      }
    }
  }
});

console.log('Unique first <li> patterns:', patterns.size);
Array.from(patterns).forEach((p, i) => {
  console.log(`\n--- Pattern ${i + 1} ---`);
  console.log(p);
});
