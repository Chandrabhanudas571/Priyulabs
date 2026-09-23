const fs = require('fs');

function checkFile(f) {
  if (!fs.existsSync(f)) return;
  const text = fs.readFileSync(f, 'utf8');
  ['foot-version', 'version-pulse', 'national-emblems'].forEach(term => {
    if (text.includes(term)) {
      const idx = text.indexOf(term);
      console.log(`Found ${term} in ${f} at index ${idx}`);
      console.log(text.substring(Math.max(0, idx - 100), Math.min(text.length, idx + 200)));
    }
  });
}

['pos.html', 'complete-management-system.html', 'style.css', 'index.html'].forEach(checkFile);
