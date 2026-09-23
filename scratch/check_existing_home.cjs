const fs = require('fs');
const path = require('path');

function walk(d) {
  let count = 0;
  fs.readdirSync(d).forEach(f => {
    const full = path.join(d, f);
    if (fs.statSync(full).isDirectory()) {
      if (f !== 'node_modules' && f !== '.git' && f !== '.system_generated') {
        count += walk(full);
      }
    } else if (f.endsWith('.html')) {
      const text = fs.readFileSync(full, 'utf8');
      const m = text.match(/<ul[^>]*class=["'][^"']*clean-nav-links[^"']*["'][^>]*>([\s\S]*?)<\/ul>/);
      if (m && m[1].includes('>Home<')) {
        console.log('Already has Home:', full);
        count++;
      }
    }
  });
  return count;
}

console.log('Total files already having Home in clean-nav-links:', walk('.'));
