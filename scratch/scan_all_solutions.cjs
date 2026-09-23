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

const solFiles = ['solutions.html', 'dist/solutions.html'].concat(getFiles('solutions')).concat(getFiles('dist/solutions'));

console.log('Total solutions files:', solFiles.length);
solFiles.forEach(f => {
  const text = fs.readFileSync(f, 'utf8');
  const hasFooter = text.includes('<footer');
  const hasMakeInIndia = text.includes('Make in India') || text.includes('Made in india');
  console.log(f, '-> has <footer>:', hasFooter, '| has MakeInIndia:', hasMakeInIndia);
});
