const fs = require('fs');

['complete-management-system/index.html', 'complete-management-system.html'].forEach(file => {
  if (!fs.existsSync(file)) return;
  let c = fs.readFileSync(file, 'utf8');
  
  c = c.replace(
    /\.foot-grid\s*\{\s*display:\s*flex\s*!important;\s*flex-direction:\s*column\s*!important;\s*gap:\s*28px\s*!important;\s*\}/g,
    '.foot-grid { display: grid !important; grid-template-columns: 1fr 1fr !important; gap: 24px 16px !important; align-items: start !important; }\n      .foot-grid > div:first-child { grid-column: 1 / -1 !important; }'
  );

  fs.writeFileSync(file, c, 'utf8');
  console.log('Fixed', file);
});

