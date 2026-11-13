const fs = require('fs');
const path = require('path');

function getAllFiles(dir, list = []) {
  fs.readdirSync(dir).forEach(f => {
    if (f === 'node_modules' || f === '.git' || f === 'brain' || f === 'test-artifacts' || f.startsWith('.')) return;
    const fp = path.join(dir, f);
    if (fs.statSync(fp).isDirectory()) getAllFiles(fp, list);
    else if (f.endsWith('.html') || f.endsWith('.js')) list.push(fp);
  });
  return list;
}

const files = getAllFiles('.');
const results = [];

files.forEach(f => {
  const c = fs.readFileSync(f, 'utf8');
  const lines = c.split('\n');
  lines.forEach((line, idx) => {
    if (/What's\s*new/i.test(line)) {
      // check context around this line
      const start = Math.max(0, idx - 5);
      const end = Math.min(lines.length - 1, idx + 5);
      const snippet = lines.slice(start, end + 1).join('\n');
      if (snippet.includes('drawer') || snippet.includes('m-drill') || snippet.includes('m-drawer')) {
        results.push({ file: f, line: idx + 1, text: line.trim() });
      }
    }
  });
});

console.log('Total drawer occurrences:', results.length);
results.forEach(r => console.log(`${r.file}:${r.line} -> ${r.text}`));

