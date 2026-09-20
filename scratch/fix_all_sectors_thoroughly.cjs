const fs = require('fs');
const path = require('path');

const rootDir = 'c:\\Users\\chand\\Downloads\\Antigravity';
const rootIndex = path.normalize(path.join(rootDir, 'index.html'));
const rootDemo = path.normalize(path.join(rootDir, 'interactive-demo.html'));

function getAllHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === 'node_modules' || file === '.git' || file === 'brain') continue;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      getAllHtmlFiles(fullPath, fileList);
    } else if (file.endsWith('.html')) {
      const norm = path.normalize(fullPath);
      // ONLY skip the ROOT index.html and ROOT interactive-demo.html
      if (norm !== rootIndex && norm !== rootDemo && !file.includes('new-backup')) {
        fileList.push(fullPath);
      }
    }
  }
  return fileList;
}

const htmlFiles = getAllHtmlFiles(rootDir);
console.log('Total sector HTML files found (including subdirectories):', htmlFiles.length);

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

let htmlUpdated = 0;

for (const file of htmlFiles) {
  let content = fs.readFileSync(file, 'utf8');
  let fileChanged = false;

  // 1. Update any anchor with href starting with '#' that represents a hero feature/pillar button
  // Look for href="#pillars", href="#matrix-features", href="#chair-features", href="#gym-features", etc.
  const targetPattern = /<a\s+([^>]*?href=["'](#[a-zA-Z0-9_-]+)["'][^>]*)>/gi;
  content = content.replace(targetPattern, (match, innerProps, hash) => {
    // Only target internal navigation anchors (not social or external)
    if (match.includes('scrollIntoView')) return match;
    if (hash === '#' || hash === '#contact' || hash === '#leadForm' || hash === '#cms-lead-form' || hash === '#pos-lead-form') return match;
    
    fileChanged = true;
    return `<a ${innerProps} onclick="event.preventDefault(); (document.querySelector('${hash}') || document.getElementById('${hash.substring(1)}') || document.getElementById('pillars') || document.querySelector('.clean-pillars-sec, .pillars-sec, .triptych-sec, .pillars-grid'))?.scrollIntoView({behavior:'smooth', block:'start'});">`;
  });

  // 2. Add scroll margin CSS if not present
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
    htmlUpdated++;
  }
}

console.log(`Updated ${htmlUpdated} HTML files.`);

// 4. Also update React components in apps/web/src/features/marketing/*.tsx
const reactDir = path.join(rootDir, 'apps', 'web', 'src', 'features', 'marketing');
let reactUpdated = 0;

if (fs.existsSync(reactDir)) {
  const reactFiles = fs.readdirSync(reactDir).filter(f => f.endsWith('.tsx'));
  for (const rf of reactFiles) {
    const rPath = path.join(reactDir, rf);
    let rContent = fs.readFileSync(rPath, 'utf8');
    let rChanged = false;

    // Look for <a href="#pillars" or href="#matrix-features" without onClick
    const rPattern = /<a\s+([^>]*?href=["'](#[a-zA-Z0-9_-]+)["'][^>]*)>/gi;
    rContent = rContent.replace(rPattern, (match, innerProps, hash) => {
      if (match.includes('onClick') || hash === '#' || hash === '#free-trial') return match;
      rChanged = true;
      return `<a ${innerProps} onClick={(e) => { e.preventDefault(); (document.querySelector('${hash}') || document.getElementById('${hash.substring(1)}') || document.getElementById('pillars') || document.querySelector('.clean-pillars-sec, .pillars-sec, .triptych-sec, .pillars-grid'))?.scrollIntoView({ behavior: 'smooth' }); }}>`;
    });

    if (rChanged) {
      fs.writeFileSync(rPath, rContent, 'utf8');
      reactUpdated++;
    }
  }
}

console.log(`Updated ${reactUpdated} React components.`);
