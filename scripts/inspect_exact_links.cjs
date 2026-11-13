const fs = require('fs');

const files = [
  'business-types/index.html',
  'business-types.html',
  'complete-management-system/index.html',
  'complete-management-system.html',
  'dist/business-types/index.html',
  'dist/business-types.html',
  'dist/complete-management-system/index.html',
  'dist/complete-management-system.html',
  'dist/hospitality.html',
  'dist/management.html',
  'dist/solutions/index.html',
  'dist/solutions.html',
  'hospitality/index.html',
  'hospitality.html',
  'index.html',
  'management/index.html',
  'management.html',
  'pos/index.html',
  'pos.html',
  'solutions/billing-pos/gst-billing/index.html',
  'solutions/billing-pos/qr-upi-payments/index.html',
  'solutions/billing-pos/smart-pos/index.html',
  'solutions/billing-pos/table-order-management/index.html',
  'solutions/growth-marketing/customer-crm/index.html',
  'solutions/growth-marketing/loyalty-offers/index.html',
  'solutions/growth-marketing/website-ads/index.html',
  'solutions/growth-marketing/whatsapp-campaigns/index.html',
  'solutions/index.html',
  'solutions/inventory/low-stock-alerts/index.html',
  'solutions/inventory/stock-tracking/index.html',
  'solutions/inventory/supplier-management/index.html',
  'solutions/staff-payroll/attendance/index.html',
  'solutions/staff-payroll/payroll/index.html',
  'solutions/staff-payroll/shifts-scheduling/index.html',
  'solutions.html',
  'templates/common.js'
];

files.forEach(fp => {
  if (!fs.existsSync(fp)) return;
  const c = fs.readFileSync(fp, 'utf8');
  // Match any <a> tag that contains What's new/What's New in drawer
  const m = c.match(/<a[^>]*class="[^"]*(?:drawer-link|m-drawer-link)[^"]*"[^>]*>[\s\S]*?What's\s*new[\s\S]*?<\/a>/i);
  if (m) {
    console.log(`=== ${fp} ===\n${m[0]}\n`);
  } else {
    // try reversed attribute order or simpler match
    const m2 = c.match(/<a[^>]*>[\s\S]*?What's\s*new[\s\S]*?<\/a>/i);
    if (m2) {
      console.log(`=== (fallback) ${fp} ===\n${m2[0]}\n`);
    } else {
      console.log(`=== NOT MATCHED: ${fp} ===`);
    }
  }
});

