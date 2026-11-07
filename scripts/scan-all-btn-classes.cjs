const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    if (file === 'node_modules' || file === '.git' || file === 'scratch' || file === 'apps') return;
    const p = path.join(dir, file);
    const stat = fs.statSync(p);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(p));
    } else if (file.endsWith('.html')) {
      results.push(p);
    }
  });
  return results;
}

const htmlFiles = walk('.');
const btnClasses = new Map();

htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  // Match buttons, a tags with class containing btn
  const regex = /<([a-z0-9]+)[^>]*class=["']([^"']*)["'][^>]*>/gi;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const tag = match[1].toLowerCase();
    const cls = match[2];
    if (tag === 'button' || cls.includes('btn') || cls.includes('cta')) {
      cls.split(/\s+/).forEach(c => {
        if (c) {
          btnClasses.set(c, (btnClasses.get(c) || 0) + 1);
        }
      });
    }
  }
});

console.log('Top button/cta classes found across project:');
const sorted = [...btnClasses.entries()].sort((a, b) => b[1] - a[1]);
console.log(sorted.slice(0, 40));
