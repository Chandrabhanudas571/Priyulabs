const fs = require('fs');
const path = require('path');

function getFiles(dir) {
  let list = [];
  if (!fs.existsSync(dir)) return list;
  fs.readdirSync(dir).forEach(f => {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) list = list.concat(getFiles(full));
    else if (f.endsWith('.html')) list.push(full);
  });
  return list;
}

getFiles('solutions').forEach(f => {
  const text = fs.readFileSync(f, 'utf8');
  const titleMatch = text.match(/<title>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : 'No title';
  console.log(f, `(${text.length} bytes, ${text.split('\n').length} lines) -> Title: ${title}`);
});
