const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
const sectorPages = [];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const hasCleanPillars = content.includes('clean-pillars-sec');
  const hasStickyPillars = content.includes('pillars-sec') || content.includes('sticky-scroll-stage');
  const hasPillars = hasCleanPillars || hasStickyPillars || content.includes('id="pillars"');
  if (hasPillars) {
    sectorPages.push({
      file: f,
      template: hasCleanPillars ? 'Clean (pillar-row)' : (hasStickyPillars ? 'Sticky (sticky-scroll-stage)' : 'Other'),
      hasCss: content.includes('business-types-mobile.css'),
      hasJs: content.includes('business-types-mobile.js')
    });
  }
});

console.log('Sector pages in root directory:');
console.table(sectorPages);

