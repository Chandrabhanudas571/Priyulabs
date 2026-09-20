const fs = require('fs');

const filePath = 'c:\\Users\\chand\\Downloads\\Antigravity\\index.html';
let content = fs.readFileSync(filePath, 'utf8');

// Replace CSS
const oldCssRegex = /\/\* ---------- Footer ---------- \*\/[\s\S]*?\.foot-bottom\s*\{[\s\S]*?gap:\s*10px;\s*\}/;

const newCss = `/* ---------- Bold & Distinct Standout Footer ---------- */
    footer {
      padding: 72px 0 36px;
      border-top: 2px solid #D4C3A3;
      margin-top: 80px;
      background: #F1E8D5 !important;
      box-shadow: 0 -16px 40px rgba(42, 36, 25, 0.08);
      position: relative;
      z-index: 10;
    }

    .foot-grid {
      display: grid;
      grid-template-columns: 1.3fr 1fr 1.1fr 1fr;
      gap: 36px;
    }

    @media(max-width:860px) {
      .foot-grid {
        grid-template-columns: 1fr 1fr;
        gap: 28px;
      }
    }

    @media(max-width:540px) {
      .foot-grid {
        grid-template-columns: 1fr;
      }
    }

    .foot-grid .logo {
      font-size: 24px;
      font-weight: 700;
      color: #1A150D;
    }

    .foot-brand-desc {
      margin-top: 14px;
      color: #383023;
      font-size: 14.5px;
      font-weight: 500;
      line-height: 1.6;
      max-width: 290px;
    }

    .foot-grid h5 {
      font-family: 'Fraunces', serif;
      font-size: 17px;
      margin-bottom: 18px;
      color: #1A150D;
      font-weight: 700;
      letter-spacing: -0.01em;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .foot-grid h5::after {
      content: '';
      display: inline-block;
      width: 16px;
      height: 2.5px;
      background: #B8863B;
      border-radius: 2px;
    }

    .foot-grid ul {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .foot-grid a {
      font-size: 14.5px;
      font-weight: 600;
      color: #383023;
      transition: all .2s ease;
      display: inline-block;
    }

    .foot-grid a:hover {
      color: #263B28;
      transform: translateX(4px);
    }

    .foot-address {
      font-size: 14.5px;
      font-weight: 600;
      color: #383023;
      line-height: 1.4;
    }

    .foot-bottom {
      margin-top: 52px;
      padding-top: 24px;
      border-top: 1.5px solid #D4C3A3;
      font-size: 13.5px;
      font-weight: 600;
      color: #4A4030;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 12px;
    }`;

if (oldCssRegex.test(content)) {
  content = content.replace(oldCssRegex, newCss);
  console.log('Replaced footer CSS with bold styles.');
} else {
  console.log('oldCssRegex did not match.');
}

// Update HTML brand desc and address classes
content = content.replace(
  '<p style="margin-top:14px; color:var(--ink-soft); font-size:14.5px; max-width:280px;">India\'s AI retail OS —',
  '<p class="foot-brand-desc">India\'s AI retail OS —'
);

content = content.replace(
  '<li><a href="#">Basisthanagar, Bhubaneswar, Odisha</a></li>',
  '<li class="foot-address">Basisthanagar, Bhubaneswar, Odisha</li>'
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('index.html updated successfully.');
