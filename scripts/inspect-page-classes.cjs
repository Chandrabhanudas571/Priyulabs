const fs = require('fs');

const page = process.argv[2] || 'pos.html';
const content = fs.readFileSync(page, 'utf8');
const regex = /<([a-z0-9]+)[^>]*class=["']([^"']*)["'][^>]*>/gi;
let match;
const tags = [];
while ((match = regex.exec(content)) !== null) {
  const tag = match[1].toLowerCase();
  const cls = match[2];
  if (tag === 'button' || cls.includes('btn') || cls.includes('cta')) {
    tags.push({ tag, cls, snippet: match[0].substring(0, 100) });
  }
}

console.log(`=== ${page} (${tags.length} button/CTA elements) ===`);
const uniqueClasses = new Set();
tags.forEach(t => t.cls.split(/\s+/).filter(Boolean).forEach(c => uniqueClasses.add(c)));
console.log('Classes:', [...uniqueClasses]);
console.log('Sample elements:');
tags.slice(0, 15).forEach(t => console.log('  ', t.snippet));
