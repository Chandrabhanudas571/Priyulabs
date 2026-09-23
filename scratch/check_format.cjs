const fs = require('fs');
['qsr-fast-food.html', 'bakeries.html', 'retail/grocery.html', 'apparel/index.html'].forEach(f => {
  if (fs.existsSync(f)) {
    const text = fs.readFileSync(f, 'utf8');
    const m = text.match(/<ul[^>]*class=["'][^"']*clean-nav-links[^"']*["'][^>]*>([\s\S]*?)<\/ul>/);
    if (m) {
      console.log('===', f, '===');
      console.log(m[0].slice(0, 180));
    }
  }
});
