const fs = require('fs');
const path = require('path');

const filePath = 'c:\\Users\\chand\\Downloads\\Antigravity\\index.html';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Fix CSS around footer
const cssTarget = `  margin-top: 14px;
}

      margin-top: 48px;`;

const cssReplacement = `  margin-top: 14px;
}

    /* ---------- Footer ---------- */
    footer {
      padding: 64px 0 32px;
      border-top: 1px solid var(--line);
      margin-top: 80px;
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

    .foot-grid h5 {
      font-size: 14px;
      margin-bottom: 16px;
      color: var(--ink-soft);
      font-weight: 600;
    }

    .foot-grid ul {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .foot-grid a {
      font-size: 14.5px;
      color: var(--ink-soft);
      transition: color .2s;
    }

    .foot-grid a:hover {
      color: var(--accent);
    }

    .foot-bottom {
      margin-top: 48px;`;

if (content.includes(cssTarget)) {
  content = content.replace(cssTarget, cssReplacement);
  console.log('Updated footer CSS successfully.');
} else {
  console.log('cssTarget not found, checking alternative...');
}

// 2. Update HTML footer to include Business Types column
const oldFooterHTML = `<div class="foot-grid">
        <div>
          <div class="logo"><img src="assets/logo.svg" alt="PriyuLabs" style="height:28px; width:28px; object-fit:contain; border-radius:7px; display:inline-block;" /><span>PriyuLabs</span></div>
          <p style="margin-top:14px; color:var(--ink-soft); font-size:14.5px; max-width:280px;">India's AI retail OS —
            POS billing, inventory, staff HRMS and GST, built for Bharat.</p>
        </div>
        <div>
          <h5>Solutions</h5>
          <ul>
            <li><a href="digital-marketing.html">Digital Marketing</a></li>
            <li><a href="#solutions">Smart POS</a></li>
            <li><a href="#solutions">Management System</a></li>
            <li><a href="#solutions">Website Building</a></li>
          </ul>
        </div>
        <div>
          <h5>Contact</h5>
          <ul>
            <li><a href="mailto:priylabspos@gmail.com">priylabspos@gmail.com</a></li>
            <li><a href="tel:+917849074050">+91 78490 74050</a></li>
            <li><a href="#">Basisthanagar, Bhubaneswar, Odisha</a></li>
          </ul>
        </div>
      </div>`;

const newFooterHTML = `<div class="foot-grid">
        <div>
          <div class="logo"><img src="assets/logo.svg" alt="PriyuLabs" style="height:28px; width:28px; object-fit:contain; border-radius:7px; display:inline-block;" /><span>PriyuLabs</span></div>
          <p style="margin-top:14px; color:var(--ink-soft); font-size:14.5px; max-width:280px;">India's AI retail OS —
            POS billing, inventory, staff HRMS and GST, built for Bharat.</p>
        </div>
        <div>
          <h5>Solutions</h5>
          <ul>
            <li><a href="/pos">Smart POS</a></li>
            <li><a href="/complete-management-system">Management System</a></li>
            <li><a href="/website-builder">Website Building</a></li>
            <li><a href="/digital-marketing">Digital Marketing</a></li>
          </ul>
        </div>
        <div>
          <h5>Business Types</h5>
          <ul>
            <li><a href="/restaurants-fine-dining">Restaurants &amp; Cafes</a></li>
            <li><a href="/grocery-supermarkets-kirana">Grocery &amp; Supermarkets</a></li>
            <li><a href="/beauty-fashion/apparel">Clothing &amp; Boutiques</a></li>
            <li><a href="/electronics-mobile-shops">Electronics &amp; Mobiles</a></li>
            <li><a href="/beauty-fashion/salons">Salons &amp; Spas</a></li>
            <li><a href="/footwear-leather-stores">Footwear &amp; Leather</a></li>
          </ul>
        </div>
        <div>
          <h5>Contact</h5>
          <ul>
            <li><a href="mailto:priylabspos@gmail.com">priylabspos@gmail.com</a></li>
            <li><a href="tel:+917849074050">+91 78490 74050</a></li>
            <li><a href="#">Basisthanagar, Bhubaneswar, Odisha</a></li>
          </ul>
        </div>
      </div>`;

if (content.includes(oldFooterHTML)) {
  content = content.replace(oldFooterHTML, newFooterHTML);
  console.log('Updated footer HTML successfully with Business Types.');
} else {
  console.log('oldFooterHTML exact match not found, looking for partial match...');
  const footGridStart = content.indexOf('<div class="foot-grid">');
  const footGridEnd = content.indexOf('<div class="foot-bottom">');
  if (footGridStart !== -1 && footGridEnd !== -1) {
    content = content.slice(0, footGridStart) + newFooterHTML + '\n      ' + content.slice(footGridEnd);
    console.log('Replaced foot-grid block successfully via indices.');
  }
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('index.html saved.');
