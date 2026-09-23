const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const full = path.join(dir, f);
    let isDirectory = fs.statSync(full).isDirectory();
    if (isDirectory) {
      if (f !== 'node_modules' && f !== '.git' && f !== '.system_generated' && f !== 'scratch') {
        walkDir(full, callback);
      }
    } else {
      callback(full);
    }
  });
}

const homeCleanLi = `<li>
          <a href="/" class="clean-nav-link" onclick="if(window.location.protocol==='file:'){event.preventDefault();const p=window.location.pathname.replace(/\\\\/g,'/');const idx=p.indexOf('/Antigravity/');if(idx!==-1){const rel=p.substring(idx+13);const d=rel.split('/').length-1;window.location.href=(d>0?'../'.repeat(d):'')+'index.html';}else{window.location.href='index.html';}}">Home</a>
        </li>
        `;

const homeNavLi = `<li>
          <a href="/" class="nav-link-title" onclick="if(window.location.protocol==='file:'){event.preventDefault();const p=window.location.pathname.replace(/\\\\/g,'/');const idx=p.indexOf('/Antigravity/');if(idx!==-1){const rel=p.substring(idx+13);const d=rel.split('/').length-1;window.location.href=(d>0?'../'.repeat(d):'')+'index.html';}else{window.location.href='index.html';}}">Home</a>
        </li>
        `;

let updatedCleanNavCount = 0;
let updatedBusinessTypesCount = 0;
const modifiedFiles = [];

walkDir('.', (filePath) => {
  if (!filePath.endsWith('.html')) return;

  let text = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // 1. Sector pages with clean-nav-links
  if (text.includes('clean-nav-links')) {
    const ulMatch = text.match(/<ul[^>]*class=["'][^"']*clean-nav-links[^"']*["'][^>]*>([\s\S]*?)<\/ul>/i);
    if (ulMatch && !ulMatch[1].includes('>Home<') && !ulMatch[1].includes('> Home <') && !ulMatch[1].includes('>Home </a>')) {
      text = text.replace(/(<ul[^>]*class=["'][^"']*clean-nav-links[^"']*["'][^>]*>\s*)/i, (match, p1) => p1 + homeCleanLi);
      changed = true;
      updatedCleanNavCount++;
    }
  }

  // 2. Business types directory pages (business-types.html, all-business-types.html, etc.)
  const baseName = path.basename(filePath);
  if (baseName === 'business-types.html' || baseName === 'all-business-types.html') {
    const navLinksMatch = text.match(/<ul[^>]*class=["'][^"']*nav-links[^"']*["'][^>]*>([\s\S]*?)<\/ul>/i);
    if (navLinksMatch && !navLinksMatch[1].includes('>Home<')) {
      text = text.replace(/(<ul[^>]*class=["'][^"']*nav-links[^"']*["'][^>]*>\s*)/i, (match, p1) => p1 + homeNavLi);
      changed = true;
      updatedBusinessTypesCount++;
    }

    // Add to mobile drawer if present
    if (text.includes('class="drawer-nav-list"') && !text.includes('drawer-link"><span>Home</span>')) {
      const homeDrawerLink = `<a href="/" class="drawer-nav-item drawer-link" onclick="if(window.location.protocol==='file:'){event.preventDefault();window.location.href='index.html';}else{closeMobileDrawer();}">
              <span>Home</span>
            </a>\n            `;
      text = text.replace(/(<nav class="drawer-nav-list">\s*)/i, (match, p1) => p1 + homeDrawerLink);
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, text, 'utf8');
    modifiedFiles.push(filePath);
  }
});

console.log(`Successfully updated ${updatedCleanNavCount} clean-nav sector pages.`);
console.log(`Successfully updated ${updatedBusinessTypesCount} business types directory pages.`);
console.log(`Total HTML files updated: ${modifiedFiles.length}`);
