const fs = require('fs');

function inspectFooter(filePath) {
  if (!fs.existsSync(filePath)) return;
  const text = fs.readFileSync(filePath, 'utf8');
  const footerMatch = text.match(/<footer[\s\S]*?<\/footer>/i);
  console.log('====================================');
  console.log('FILE:', filePath);
  if (footerMatch) {
    console.log(footerMatch[0].slice(0, 600));
    console.log('... [length: ' + footerMatch[0].length + ' bytes] ...');
    console.log(footerMatch[0].slice(-300));
  } else {
    console.log('NO <footer> FOUND!');
  }
}

inspectFooter('solutions.html');
inspectFooter('solutions/index.html');
inspectFooter('solutions/barcode/index.html');
inspectFooter('solutions/inventory/index.html');
inspectFooter('solutions/gst/index.html');
inspectFooter('pos.html');
