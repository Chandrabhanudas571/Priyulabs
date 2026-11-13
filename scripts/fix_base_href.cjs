const fs = require('fs');
const path = require('path');

function getHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      if (!['node_modules', '.git', 'test-artifacts', 'backup-images', 'backup-media', 'dist'].includes(file)) {
        results = results.concat(getHtmlFiles(full));
      }
    } else if (file.endsWith('.html')) {
      results.push(full);
    }
  });
  return results;
}

const all = getHtmlFiles('.');
let count = 0;

const SAFE_BASE = `<script>if (window.location.protocol !== 'file:') { const b = document.createElement('base'); b.href = '/'; document.head.appendChild(b); }</script>\n  <noscript><base href="/"></noscript>`;

all.forEach(f => {
  let c = fs.readFileSync(f, 'utf8');
  if (c.includes('<base href="/">') && !c.includes("protocol !== 'file:'")) {
    c = c.replace(/<base href=["']\/["']\s*\/?>/gi, SAFE_BASE);
    fs.writeFileSync(f, c, 'utf8');
    count++;
  }
});

console.log(`Updated ${count} files to use protocol-guarded base href.`);

