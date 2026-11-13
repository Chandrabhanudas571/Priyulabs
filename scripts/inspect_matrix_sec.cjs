const fs = require('fs');
const content = fs.readFileSync('apparel-boutiques/index.html', 'utf8');
const match = content.match(/<section[^>]*class=["'][^"']*matrix-sec[^"']*["'][^>]*>([\s\S]*?)<\/section>/i);
if (match) {
  console.log('Matrix Section snippet:');
  console.log(match[0].slice(0, 1500));
}

