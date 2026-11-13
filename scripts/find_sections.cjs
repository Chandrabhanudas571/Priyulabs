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
files.forEach(f => {
  const c = fs.readFileSync(f, 'utf8');
  if (c.includes('whats-new')) {
    console.log('whats-new in: ' + f);
  }
});

