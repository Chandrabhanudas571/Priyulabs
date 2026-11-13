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
const drawerFiles = [];

files.forEach(f => {
  const c = fs.readFileSync(f, 'utf8');
  if (c.includes('m-drawer-link') && /What's\s*new/i.test(c)) {
    drawerFiles.push(f);
  }
});

console.log('Files with Whats New in mobile drawer (', drawerFiles.length, '):');
drawerFiles.forEach(f => console.log(' - ' + f));

