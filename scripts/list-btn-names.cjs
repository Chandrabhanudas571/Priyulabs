const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    if (file === 'node_modules' || file === '.git' || file === 'scratch' || file === 'apps') return;
    const p = path.join(dir, file);
    const stat = fs.statSync(p);
    if (stat && stat.isDirectory()) results = results.concat(walk(p));
    else if (file.endsWith('.html')) results.push(p);
  });
  return results;
}

const htmlFiles = walk('.');
const standaloneClasses = new Map();

htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const regex = /<([a-z0-9]+)[^>]*class=["']([^"']*)["'][^>]*>/gi;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const cls = match[2].trim();
    if (cls.includes('btn') || cls.includes('cta')) {
      const classes = cls.split(/\s+/);
      classes.forEach(c => {
        if (c.startsWith('btn-') || c.endsWith('-btn') || c.includes('cta')) {
          standaloneClasses.set(c, (standaloneClasses.get(c) || 0) + 1);
        }
      });
    }
  }
});

console.log(
  [...standaloneClasses.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 35)
);
