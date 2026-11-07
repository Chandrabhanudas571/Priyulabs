const fs = require('fs');

const pages = [
  'complete-management-system.html',
  'website-builder.html',
  'digital-marketing.html',
  'pos.html',
  'solutions.html',
  'retail/supermarkets/index.html'
];

for (const p of pages) {
  if (!fs.existsSync(p)) continue;
  const content = fs.readFileSync(p, 'utf8');
  const linkPos = content.indexOf('style.css');
  const stylePos = content.indexOf('<style');
  console.log(`${p}: style.css index = ${linkPos}, <style> index = ${stylePos}`);
}
