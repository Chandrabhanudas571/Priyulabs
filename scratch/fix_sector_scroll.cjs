const fs = require('fs');
const path = require('path');

function getAllHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === 'node_modules' || file === '.git' || file === 'brain') continue;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      getAllHtmlFiles(fullPath, fileList);
    } else if (file.endsWith('.html') && file !== 'index.html' && file !== 'interactive-demo.html' && !file.includes('new-backup')) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const rootDir = 'c:\\Users\\chand\\Downloads\\Antigravity';
const files = getAllHtmlFiles(rootDir);
console.log('Total HTML files to check:', files.length);

let updatedCount = 0;

const smoothScrollScript = `
  <!-- Smooth Internal Hash Scroll Engine (Overrides <base href="/">) -->
  <script>
    (function() {
      function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
          if (anchor.dataset.smoothBound) return;
          anchor.dataset.smoothBound = 'true';
          anchor.addEventListener('click', function(e) {
            var hash = this.getAttribute('href');
            if (hash && hash.length > 1 && !hash.startsWith('#/')) {
              var target = document.querySelector(hash) || 
                           document.getElementById(hash.substring(1)) || 
                           document.getElementById('pillars') || 
                           document.getElementById('matrix-features') || 
                           document.querySelector('.clean-pillars-sec, .pillars-sec, .triptych-sec, .pillars-grid, .clean-container');
              if (target) {
                e.preventDefault();
                e.stopPropagation();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                if (window.history && window.history.pushState) {
                  window.history.pushState(null, null, hash);
                }
              }
            }
          });
        });
      }
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSmoothScroll);
      } else {
        initSmoothScroll();
      }
    })();
  </script>
`;

const scrollMarginCSS = `
    /* Smooth Scroll Margin for Pillar/Feature Cards */
    html {
      scroll-behavior: smooth !important;
    }
    #pillars, #matrix-features, #chair-features, #gym-features, #laundry-features, #features, #what-we-build,
    .clean-pillars-sec, .pillars-sec, .triptych-sec, .pillars-grid {
      scroll-margin-top: 85px !important;
    }
`;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let fileChanged = false;

  // 1. Update hero secondary anchor buttons (e.g. href="#pillars" or href="#matrix-features" or href="#chair-features")
  // Replace: <a href="#..." class="...btn-outline-clean..." ...>
  const heroBtnRegex = /<a\s+([^>]*?href=["'](#[a-zA-Z0-9_-]+)["'][^>]*?class=["'][^"']*(?:btn-outline-clean|btn-ghost|clean-hero-actions|hero-actions)[^"']*["'][^>]*)>/gi;
  if (heroBtnRegex.test(content)) {
    content = content.replace(heroBtnRegex, (match, innerProps, targetHash) => {
      if (match.includes('scrollIntoView')) return match; // already updated
      return `<a ${innerProps} onclick="event.preventDefault(); (document.querySelector('${targetHash}') || document.getElementById('${targetHash.substring(1)}') || document.getElementById('pillars') || document.querySelector('.clean-pillars-sec, .pillars-sec, .triptych-sec, .pillars-grid'))?.scrollIntoView({behavior:'smooth', block:'start'});">`;
    });
    fileChanged = true;
  }

  // Also check if any <a href="#pillars" ...> exists without onclick
  const pillarsBtnRegex = /<a\s+([^>]*?href=["']#(?:pillars|matrix-features|chair-features|gym-features|what-we-build)["'][^>]*)>/gi;
  if (pillarsBtnRegex.test(content)) {
    content = content.replace(pillarsBtnRegex, (match, innerProps) => {
      if (match.includes('scrollIntoView') || match.includes('onclick')) return match;
      const targetHashMatch = match.match(/href=["'](#[^"']+)["']/);
      const targetHash = targetHashMatch ? targetHashMatch[1] : '#pillars';
      return `<a ${innerProps} onclick="event.preventDefault(); (document.querySelector('${targetHash}') || document.getElementById('${targetHash.substring(1)}') || document.getElementById('pillars') || document.querySelector('.clean-pillars-sec, .pillars-sec, .triptych-sec, .pillars-grid'))?.scrollIntoView({behavior:'smooth', block:'start'});">`;
    });
    fileChanged = true;
  }

  // 2. Add scroll margin CSS if not already present
  if (!content.includes('scroll-margin-top: 85px')) {
    if (content.includes('</style>')) {
      content = content.replace('</style>', `${scrollMarginCSS}\n  </style>`);
      fileChanged = true;
    }
  }

  // 3. Add smoothScrollScript before </body> if not present
  if (!content.includes('Smooth Internal Hash Scroll Engine')) {
    if (content.includes('</body>')) {
      content = content.replace('</body>', `${smoothScrollScript}\n</body>`);
      fileChanged = true;
    }
  }

  if (fileChanged) {
    fs.writeFileSync(file, content, 'utf8');
    updatedCount++;
  }
}

console.log(`Successfully updated ${updatedCount} sector files.`);
