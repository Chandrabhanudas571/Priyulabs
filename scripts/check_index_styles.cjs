const fs = require('fs');
const c = fs.readFileSync('index.html', 'utf8');
const styles = c.match(/<style[^>]*>[\s\S]*?<\/style>/g) || [];
console.log('Number of <style> tags in index.html:', styles.length);
styles.forEach((s, i) => {
  console.log(`Style tag ${i+1}: length ${s.length}, snippet: ${s.substring(0, 100).replace(/\s+/g, ' ')}...`);
});

