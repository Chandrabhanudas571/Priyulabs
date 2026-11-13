const fs = require('fs');
const path = require('path');

function getAllFiles(dir, list = []) {
  fs.readdirSync(dir).forEach(f => {
    if (f === 'node_modules' || f === '.git' || f === 'brain' || f === 'test-artifacts' || f.startsWith('.')) return;
    const fp = path.join(dir, f);
    if (fs.statSync(fp).isDirectory()) getAllFiles(fp, list);
    else if (f.endsWith('.html') || f.endsWith('.js') || f.endsWith('.cjs') || f.endsWith('.json')) list.push(fp);
  });
  return list;
}

const files = getAllFiles('.');
let totalUpdatedFiles = 0;
let totalReplacements = 0;

files.forEach(f => {
  let c = fs.readFileSync(f, 'utf8');
  let original = c;

  // Replace typo 7873844050 -> 7873844050
  if (c.includes('7873844050')) {
    const count = (c.match(/7873844050/g) || []).length;
    c = c.replaceAll('7873844050', '7873844050');
    totalReplacements += count;
  }

  // Replace old 7873844050 -> 7873844050
  if (c.includes('7873844050')) {
    const count = (c.match(/7873844050/g) || []).length;
    c = c.replaceAll('7873844050', '7873844050');
    totalReplacements += count;
  }

  // Replace spaced variant +91 78738 44050 if present
  if (c.includes('78738 44050')) {
    const count = (c.match(/78738 44050/g) || []).length;
    c = c.replaceAll('78738 44050', '78738 44050');
    totalReplacements += count;
  }

  if (c !== original) {
    fs.writeFileSync(f, c, 'utf8');
    totalUpdatedFiles++;
    console.log('Updated:', f);
  }
});

console.log(`\nDONE: Replaced numbers in ${totalUpdatedFiles} files with ${totalReplacements} total replacements.`);
