const fs = require('fs');
const c = fs.readFileSync('index.html', 'utf8');
const m = c.match(/<style id="pl-mobile-home">[\s\S]*?<\/style>/);
if (m) console.log(m[0]);

