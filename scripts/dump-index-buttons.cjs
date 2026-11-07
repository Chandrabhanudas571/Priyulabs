const fs = require('fs');

const content = fs.readFileSync('index.html', 'utf8');
console.log('=================== index.html ===================');
const regex = /<(button|a|input)[^>]*>([\s\S]*?<\/(?:button|a)>)?/gi;
let m;
while ((m = regex.exec(content)) !== null) {
  const full = m[0];
  const tag = m[1].toLowerCase();
  const classMatch = full.match(/class=["']([^"']*)["']/i);
  const typeMatch = full.match(/type=["']([^"']*)["']/i);
  const idMatch = full.match(/id=["']([^"']*)["']/i);
  const cls = classMatch ? classMatch[1] : '';
  const text = m[2] ? m[2].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ') : '';
  
  if (tag === 'button' || (tag === 'input' && /submit|button/i.test(typeMatch ? typeMatch[1] : '')) || /btn|cta|button|action|trial|demo/i.test(cls)) {
    console.log(`[${tag}] id="${idMatch?idMatch[1]:''}" class="${cls}" text="${text.slice(0, 50)}"`);
  }
}
