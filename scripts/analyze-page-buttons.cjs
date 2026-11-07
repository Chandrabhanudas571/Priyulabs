const fs = require('fs');

const pages = [
  'index.html',
  'complete-management-system.html',
  'website-builder.html',
  'digital-marketing.html',
  'pos.html',
  'solutions.html'
];

for (const page of pages) {
  if (!fs.existsSync(page)) continue;
  const content = fs.readFileSync(page, 'utf8');
  console.log(`\n=================== PAGE: ${page} ===================`);
  
  // Find all elements that are buttons or links with classes
  const btnRegex = /<(button|a|input)[^>]*>/gi;
  let m;
  const found = [];
  while ((m = btnRegex.exec(content)) !== null) {
    const fullTag = m[0];
    const tagType = m[1].toLowerCase();
    const classMatch = fullTag.match(/class=["']([^"']*)["']/i);
    const cls = classMatch ? classMatch[1] : '';
    const typeMatch = fullTag.match(/type=["']([^"']*)["']/i);
    const type = typeMatch ? typeMatch[1] : '';
    
    const isButton = tagType === 'button' || type === 'submit' || /btn|cta|action|submit|tab/i.test(cls);
    if (isButton) {
      found.push({ tag: tagType, type, cls, snippet: fullTag.slice(0, 100) });
    }
  }
  
  console.log(`Total button-like elements: ${found.length}`);
  const classCounts = {};
  for (const item of found) {
    for (const c of item.cls.split(/\s+/).filter(Boolean)) {
      classCounts[c] = (classCounts[c] || 0) + 1;
    }
  }
  console.log('Top classes:', Object.entries(classCounts).sort((a,b) => b[1] - a[1]).slice(0, 15));
}
