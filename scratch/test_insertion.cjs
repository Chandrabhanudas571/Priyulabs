const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const full = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath = full).isDirectory();
    if (isDirectory) {
      if (f !== 'node_modules' && f !== '.git' && f !== '.system_generated') {
        walkDir(full, callback);
      }
    } else {
      callback(full);
    }
  });
}

let matchedCount = 0;
let navHasHomeCount = 0;
let errors = [];

walkDir('.', (filePath) => {
  if (filePath.endsWith('.html')) {
    const text = fs.readFileSync(filePath, 'utf8');
    if (text.includes('clean-nav-links')) {
      const ulFullRegex = /<ul[^>]*class=["'][^"']*clean-nav-links[^"']*["'][^>]*>([\s\S]*?)<\/ul>/i;
      const m = text.match(ulFullRegex);
      if (m) {
        if (m[1].includes('>Home<') || m[1].includes('> Home <') || m[1].includes('>Home </a>')) {
          navHasHomeCount++;
        } else {
          matchedCount++;
        }
      } else {
        errors.push(filePath);
      }
    }
  }
});

console.log('clean-nav-links without Home (will be updated):', matchedCount);
console.log('clean-nav-links that already have Home:', navHasHomeCount);
console.log('Errors:', errors);
