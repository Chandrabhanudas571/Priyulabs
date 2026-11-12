const fs = require('fs');
const r = fs.readFileSync('restaurants-fine-dining.html', 'utf8');
const g = fs.readFileSync('grocery-supermarkets-kirana.html', 'utf8');
const a = fs.readFileSync('beauty-fashion/apparel/index.html', 'utf8');

function inspectStructure(html, name) {
  console.log('=== ' + name + ' ===');
  const sections = html.match(/<section\b[^>]*class="([^"]+)"[^>]*>/g) || [];
  console.log('Sections:', sections.map(s => s.match(/class="([^"]+)"/)[1]));
  const heroH1 = html.match(/<h1[\s\S]*?<\/h1>/);
  console.log('H1:', heroH1 ? heroH1[0].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ') : 'None');
  const eyebrow = html.match(/class="[^"]*(?:eyebrow|kicker|badge)[^"]*"[^>]*>([\s\S]*?)<\/(?:span|div|p)>/);
  console.log('Eyebrow:', eyebrow ? eyebrow[1].replace(/<[^>]+>/g, '').trim() : 'None');
}

inspectStructure(r, 'restaurants-fine-dining.html');
inspectStructure(g, 'grocery-supermarkets-kirana.html');
inspectStructure(a, 'beauty-fashion/apparel/index.html');

