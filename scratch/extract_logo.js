const fs = require('fs');
const svg = fs.readFileSync('assets/logo.svg', 'utf8');
const match = svg.match(/data:image\/png;base64,([^"]+)/);
if (match) {
  const buf = Buffer.from(match[1], 'base64');
  fs.writeFileSync('scratch/extracted_logo.png', buf);
  console.log('Saved extracted_logo.png, size:', buf.length);
} else {
  console.log('No base64 found');
}
