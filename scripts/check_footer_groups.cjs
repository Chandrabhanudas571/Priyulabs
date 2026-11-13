const fs = require('fs');
const path = require('path');

function getAllHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === 'node_modules' || file === '.git' || file === 'brain' || file === 'test-artifacts' || file.startsWith('.')) continue;
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllHtmlFiles(filePath, fileList);
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const htmlFiles = getAllHtmlFiles('.');
const siteFooterFiles = [];
const footerFiles = [];

htmlFiles.forEach(f => {
  const c = fs.readFileSync(f, 'utf8');
  if (/<footer[^>]*class=["'][^"']*site-footer/i.test(c)) siteFooterFiles.push(f);
  if (/<footer[^>]*class=["'][^"']*footer["']/i.test(c) || /<footer\s+class="footer\s+/i.test(c)) footerFiles.push(f);
});

console.log('siteFooterFiles count:', siteFooterFiles.length);
console.log('sample siteFooterFiles:', siteFooterFiles.slice(0, 10));

console.log('\nfooterFiles count:', footerFiles.length);
console.log('sample footerFiles:', footerFiles.slice(0, 10));

