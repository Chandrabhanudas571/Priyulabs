const fs = require('fs');
const c = fs.readFileSync('index.html', 'utf8');
const links = c.match(/<link[^>]*rel=["']stylesheet["'][^>]*>/g) || [];
console.log('CSS links in index.html:');
links.forEach(l => console.log('  ' + l));

