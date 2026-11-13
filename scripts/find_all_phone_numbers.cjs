const fs = require('fs');
const path = require('path');

function getAllFiles(dir, list = []) {
  fs.readdirSync(dir).forEach(f => {
    if (f === 'node_modules' || f === '.git' || f === 'brain' || f === 'test-artifacts' || f.startsWith('.')) return;
    const fp = path.join(dir, f);
    if (fs.statSync(fp).isDirectory()) getAllFiles(fp, list);
    else if (f.endsWith('.html') || f.endsWith('.js') || f.endsWith('.cjs')) list.push(fp);
  });
  return list;
}

const files = getAllFiles('.');
const telSet = new Set();
const waSet = new Set();

files.forEach(f => {
  const c = fs.readFileSync(f, 'utf8');
  (c.match(/tel:[^"'>\s]+/g) || []).forEach(t => telSet.add(t));
  (c.match(/wa\.me\/[0-9]+/g) || []).forEach(w => waSet.add(w));
});

console.log('Unique tel: links across codebase:', Array.from(telSet));
console.log('Unique wa.me links across codebase:', Array.from(waSet));

