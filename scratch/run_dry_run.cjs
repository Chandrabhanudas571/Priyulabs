const fs = require('fs');

const homeLi = `<li>
          <a href="/" class="clean-nav-link" onclick="if(window.location.protocol==='file:'){event.preventDefault();const p=window.location.pathname.replace(/\\\\/g,'/');const idx=p.indexOf('/Antigravity/');if(idx!==-1){const rel=p.substring(idx+13);const d=rel.split('/').length-1;window.location.href=(d>0?'../'.repeat(d):'')+'index.html';}else{window.location.href='index.html';}}">Home</a>
        </li>
        `;

['bakeries.html', 'qsr-fast-food.html'].forEach(f => {
  const text = fs.readFileSync(f, 'utf8');
  const updated = text.replace(/(<ul[^>]*class=["'][^"']*clean-nav-links[^"']*["'][^>]*>\s*)/, (m, p1) => p1 + homeLi);
  const m = updated.match(/<ul[^>]*class=["'][^"']*clean-nav-links[^"']*["'][^>]*>([\s\S]*?)<\/ul>/);
  console.log('===', f, '===');
  console.log(m[0].slice(0, 450));
});
