const fs = require('fs');
const path = require('path');

function getHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git') {
        results = results.concat(getHtmlFiles(full));
      }
    } else if (file.endsWith('.html')) {
      results.push(full);
    }
  });
  return results;
}

const files = getHtmlFiles('.');
const withCleanNav = files.filter(f => {
  const content = fs.readFileSync(f, 'utf8');
  return content.includes('clean-nav-links');
});

console.log('Total html files:', files.length);
console.log('Files with clean-nav-links:', withCleanNav.length);

const sample = withCleanNav.slice(0, 5);
sample.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const match = content.match(/<ul[^>]*class=["'][^"']*clean-nav-links[^"']*["'][^>]*>([\s\S]*?)<\/ul>/);
  if (match) {
    console.log('---', f, '---');
    console.log(match[0].slice(0, 300));
  }
});
