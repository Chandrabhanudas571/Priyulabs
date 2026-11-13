const fs = require('fs');
const path = require('path');

function getHtmlFiles(dir, list = []) {
  fs.readdirSync(dir).forEach(f => {
    if (f === 'node_modules' || f === '.git' || f === 'brain' || f === 'test-artifacts' || f.startsWith('.')) return;
    const fp = path.join(dir, f);
    if (fs.statSync(fp).isDirectory()) getHtmlFiles(fp, list);
    else if (f.endsWith('.html')) list.push(fp);
  });
  return list;
}

const files = getHtmlFiles('.');
let count = 0;

files.forEach(f => {
  let c = fs.readFileSync(f, 'utf8');
  let changed = false;

  // 1. Remove inline style on .foot-grid if it sets grid-template-columns: 1.3fr ...
  if (/<div class="foot-grid" style="display:\s*grid;\s*grid-template-columns:\s*1\.3fr[^"]*"/i.test(c)) {
    c = c.replace(/<div class="foot-grid" style="display:\s*grid;\s*grid-template-columns:\s*1\.3fr[^"]*"/gi, '<div class="foot-grid"');
    changed = true;
  }

  // 2. Remove inline style on priyulabs-universal-footer if it sets padding: 72px ...
  if (/<footer class="priyulabs-universal-footer" style="padding:\s*72px[^"]*"/i.test(c)) {
    c = c.replace(/<footer class="priyulabs-universal-footer" style="padding:\s*72px[^"]*"/gi, '<footer class="priyulabs-universal-footer"');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(f, c, 'utf8');
    count++;
  }
});

console.log('Cleaned inline footer styles on', count, 'files.');

