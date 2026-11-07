const fs = require('fs');
const content = fs.readFileSync('pos.html', 'utf8');
const lines = content.split('\n');
lines.forEach((line, i) => {
  if (line.includes('<button') || line.includes('onclick=') || line.includes('type="submit"') || line.includes('btn') || line.includes('nav-cta')) {
    console.log(`${i + 1}: ${line.trim().substring(0, 100)}`);
  }
});
