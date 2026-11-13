const fs = require('fs');

const files = [
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
// Requires class containing m-drawer-link OR drawer-link OR drawer-nav-item
// And does not cross across another <a
const drawerRegex = /\s*<a\b(?![^>]*<a\b)[^>]*class="[^"]*(?:m-drawer-link|drawer-link|drawer-nav-item)[^"]*"[^>]*>(?:(?!<a\b|<\/a>)[\s\S])*?What's\s*new(?:(?!<a\b|<\/a>)[\s\S])*?<\/a>\s*/i;

let matchedCount = 0;
files.forEach(fp => {
  if (!fs.existsSync(fp)) {
    console.log('MISSING:', fp);
    return;
  }
  const content = fs.readFileSync(fp, 'utf8');
  const match = content.match(drawerRegex);
  if (match) {
    matchedCount++;
    console.log(`\n=== OK: ${fp} ===`);
    console.log(match[0].trim());
  } else {
    console.log(`\nFAILED TO MATCH: ${fp}`);
  }
});

console.log(`\nMatched ${matchedCount} / ${files.length} files.`);
