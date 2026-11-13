const fs = require('fs');

function inspectExample(name, file) {
  console.log(`\n================== ${name} (${file}) ==================`);
  if (!fs.existsSync(file)) {
    console.log('File not found');
    return;
  }
  const content = fs.readFileSync(file, 'utf8');
  const m = content.match(/<footer([\s\S]*?)<\/footer>/i);
  if (m) {
    console.log(m[0].slice(0, 1500));
  } else {
    console.log('No footer');
  }
}

inspectExample('site-footer', 'apparel/index.html');
inspectExample('footer', 'bakeries/index.html');
inspectExample('hub-footer', 'all-business-types.html');
inspectExample('priyulabs-universal-footer', 'digital-marketing/index.html');
inspectExample('footer-plain', 'complete-management-system/index.html');


