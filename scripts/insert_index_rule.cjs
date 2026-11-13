const fs = require('fs');

let c = fs.readFileSync('index.html', 'utf8');
const target = '<style id="pl-mobile-home">';
const addition = `<style id="pl-mobile-home">
    /* Hide What's New section completely on mobile (< 768px) */
    @media (max-width: 767px) {
      #whats-new,
      section#whats-new,
      .whats-new-section {
        display: none !important;
      }
    }
`;

if (c.includes(target) && !c.includes("Hide What's New section completely on mobile")) {
  c = c.replace(target, addition);
  fs.writeFileSync('index.html', c, 'utf8');
  console.log('Successfully inserted mobile hide rule into index.html');
} else {
  console.log('Already inserted or target not found');
}

