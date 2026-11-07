const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');
const styleCss = fs.readFileSync('style.css', 'utf8');

// Find broad rules in style.css that match tags like body, h1, h2, h3, a, p, header, nav
const dangerousSelectors = [
  'body', 'h1', 'h2', 'h3', 'p', 'header', 'nav', 'footer', 'main', 'section'
];

for (const sel of dangerousSelectors) {
  const reg = new RegExp(`(^|\\n)\\s*${sel}\\s*\\{([^}]+)\\}`, 'g');
  let m;
  while ((m = reg.exec(styleCss)) !== null) {
    console.log(`Found style.css rule for <${sel}>:`, m[2].replace(/\s+/g, ' ').slice(0, 100));
  }
}
