const fs = require('fs');
const content = fs.readFileSync('grocery-supermarkets-kirana.html', 'utf8');
const match = content.match(/<section[^>]*class=["'][^"']*pillars-sec[^"']*["'][^>]*>([\s\S]*?)<\/section>/i);
if (match) {
  console.log(match[0].slice(0, 2000));
}

