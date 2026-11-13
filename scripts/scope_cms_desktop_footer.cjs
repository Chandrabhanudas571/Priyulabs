const fs = require('fs');

['complete-management-system/index.html', 'complete-management-system.html'].forEach(f => {
  if (!fs.existsSync(f)) return;
  let c = fs.readFileSync(f, 'utf8');
  
  c = c.replace(
    /\/\* ---------- Bold & Distinct Standout Footer ---------- \*\/\s*footer\s*\{\s*padding:\s*72px 0 36px !important;\s*border-top:\s*2px solid #D4C3A3 !important;\s*margin-top:\s*80px !important;\s*background:\s*#F1E8D5 !important;/g,
    '/* ---------- Bold & Distinct Standout Footer (Desktop >= 768px) ---------- */\n    @media (min-width: 768px) {\n      footer {\n        padding: 72px 0 36px !important;\n        border-top: 2px solid #D4C3A3 !important;\n        margin-top: 80px !important;\n        background: #F1E8D5 !important;'
  );

  // Close the desktop media query before .foot-grid or adjust
  c = c.replace(
    /box-shadow:\s*0 -16px 40px rgba\(42, 36, 25, 0\.08\) !important;\s*position:\s*relative !important;\s*z-index:\s*10 !important;\s*color:\s*#1A150D !important;\s*\}/g,
    'box-shadow: 0 -16px 40px rgba(42, 36, 25, 0.08) !important;\n        position: relative !important;\n        z-index: 10 !important;\n        color: #1A150D !important;\n      }\n    }'
  );

  fs.writeFileSync(f, c, 'utf8');
  console.log('Scoped desktop footer in', f);
});

