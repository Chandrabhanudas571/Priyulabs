const fs = require('fs');
const path = require('path');

const targetFiles = [
  'index.html',
  'templates/common.js',
  'solutions/billing-pos/gst-billing/index.html',
  'solutions/billing-pos/qr-upi-payments/index.html',
  'solutions/billing-pos/smart-pos/index.html',
  'solutions/billing-pos/table-order-management/index.html',
  'solutions/growth-marketing/customer-crm/index.html',
  'solutions/growth-marketing/loyalty-offers/index.html',
  'solutions/growth-marketing/website-ads/index.html',
  'solutions/growth-marketing/whatsapp-campaigns/index.html',
  'solutions/inventory/low-stock-alerts/index.html',
  'solutions/inventory/stock-tracking/index.html',
  'solutions/inventory/supplier-management/index.html',
  'solutions/staff-payroll/attendance/index.html',
  'solutions/staff-payroll/payroll/index.html',
  'solutions/staff-payroll/shifts-scheduling/index.html',
  'pos.html',
  'pos/index.html',
  'dist/pos.html',
  'dist/pos/index.html',
  'business-types.html',
  'business-types/index.html',
  'dist/business-types.html',
  'dist/business-types/index.html',
  'complete-management-system.html',
  'complete-management-system/index.html',
  'dist/complete-management-system.html',
  'dist/complete-management-system/index.html',
  'management.html',
  'management/index.html',
  'dist/management.html',
  'solutions.html',
  'solutions/index.html',
  'dist/solutions.html',
  'dist/solutions/index.html',
  'hospitality.html',
  'hospitality/index.html',
  'dist/hospitality.html'
];

// Regex matching ONLY mobile drawer link:
const drawerRegex = /\s*<a\b(?![^>]*<a\b)[^>]*class="[^"]*(?:m-drawer-link|drawer-link|drawer-nav-item)[^"]*"[^>]*>(?:(?!<a\b|<\/a>)[\s\S])*?What's\s*new(?:(?!<a\b|<\/a>)[\s\S])*?<\/a>\s*/i;

console.log('--- Step 1: Removing What\'s New link from mobile drawers ---');

let modifiedCount = 0;
targetFiles.forEach(fp => {
  if (!fs.existsSync(fp)) {
    console.warn('File not found:', fp);
    return;
  }
  let content = fs.readFileSync(fp, 'utf8');
  if (drawerRegex.test(content)) {
    // Replace with a clean newline so siblings remain nicely spaced
    content = content.replace(drawerRegex, '\n            ');
    fs.writeFileSync(fp, content, 'utf8');
    modifiedCount++;
    console.log(`Updated drawer in: ${fp}`);
  } else {
    console.warn(`Drawer regex did not match in: ${fp}`);
  }
});

console.log(`\nUpdated mobile drawer in ${modifiedCount} files.`);

console.log('\n--- Step 2: Adding mobile hide rule for #whats-new section ---');

const cssSnippet = `
/* Hide What's New section completely on mobile viewports (< 768px) */
@media (max-width: 767px) {
  #whats-new,
  section#whats-new,
  .whats-new-section {
    display: none !important;
  }
}
`;

const cssFiles = [
  'style.css',
  'dist/style.css',
  'dist/assets/index-CbaleEHg.css'
];

cssFiles.forEach(cfp => {
  if (fs.existsSync(cfp)) {
    let c = fs.readFileSync(cfp, 'utf8');
    if (!c.includes('#whats-new {') && !c.includes('#whats-new,') && !c.includes('/* Hide What\'s New section completely on mobile')) {
      c += '\n' + cssSnippet;
      fs.writeFileSync(cfp, c, 'utf8');
      console.log(`Added mobile hide rule to: ${cfp}`);
    } else {
      console.log(`Already contains rule or skipped: ${cfp}`);
    }
  }
});

const btypeCss = 'assets/css/business-types-mobile.css';
if (fs.existsSync(btypeCss)) {
  let c = fs.readFileSync(btypeCss, 'utf8');
  if (!c.includes('/* Hide What\'s New section completely on mobile')) {
    // It is already inside @media (max-width: 767px) or has media query wrapper
    const insertRule = `
/* Hide What's New section completely on mobile */
@media (max-width: 767px) {
  #whats-new,
  section#whats-new,
  .whats-new-section {
    display: none !important;
  }
}
`;
    c += '\n' + insertRule;
    fs.writeFileSync(btypeCss, c, 'utf8');
    console.log(`Added mobile hide rule to: ${btypeCss}`);
  }
}

console.log('\nAll drawer items removed and CSS rules added successfully.');

