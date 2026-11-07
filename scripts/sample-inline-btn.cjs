const fs = require('fs');

const sampleFiles = [
  'index.html',
  'complete-management-system.html',
  'website-builder.html',
  'digital-marketing.html',
  'pos.html',
  'solutions.html',
  'retail\\supermarkets\\index.html',
  'bars-pubs\\index.html'
];

for (const sf of sampleFiles) {
  if (!fs.existsSync(sf)) continue;
  const content = fs.readFileSync(sf, 'utf8');
  console.log(`\n=== File: ${sf} ===`);
  const styleMatches = content.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi);
  for (const sm of styleMatches) {
    const text = sm[1];
    const btnMatches = text.matchAll(/([.#][a-zA-Z0-9_-]*(?:btn|cta|action|submit)[a-zA-Z0-9_-]*)\s*\{([^}]*)\}/gi);
    for (const bm of btnMatches) {
      console.log(`  Selector: ${bm[1]} -> ${bm[2].replace(/\s+/g, ' ').slice(0, 100)}`);
    }
  }
}
