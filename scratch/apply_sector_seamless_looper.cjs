const fs = require('fs');
const path = require('path');

function walk(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === 'node_modules' || file === '.git' || file === 'apps' || file === 'scratch') continue;
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      walk(filePath, fileList);
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const allFiles = walk('.');

// Filter to sector and business type pages (and we can include solutions and hubs too so everything is consistently live wallpaper)
// Excluding index.html.new-backup or any scratch files
const targetFiles = allFiles.filter(f => {
  const norm = f.replace(/\\/g, '/');
  if (norm.endsWith('.new-backup')) return false;
  if (norm === 'index.html' || norm === 'dist/index.html') return false; // Already has it
  return (
    norm.includes('food-beverage') ||
    norm.includes('retail') ||
    norm.includes('fashion-beauty') ||
    norm.includes('beauty-fashion') ||
    norm.includes('wellness') ||
    norm.includes('services') ||
    norm.includes('business-types') ||
    norm.includes('all-business-types') ||
    norm.includes('restaurants') ||
    norm.includes('qsr') ||
    norm.includes('cafes') ||
    norm.includes('cloud-kitchens') ||
    norm.includes('bakeries') ||
    norm.includes('bars-pubs') ||
    norm.includes('grocery') ||
    norm.includes('electronics') ||
    norm.includes('footwear') ||
    norm.includes('jewellery') ||
    norm.includes('jewelry') ||
    norm.includes('watches') ||
    norm.includes('watch-stores') ||
    norm.includes('bookstores') ||
    norm.includes('apparel') ||
    norm.includes('salons') ||
    norm.includes('cosmetics') ||
    norm.includes('gyms') ||
    norm.includes('fitness') ||
    norm.includes('dry-cleaners') ||
    norm.includes('laundry') ||
    norm.includes('hospitality') ||
    norm.includes('complete-management-system') ||
    norm.includes('digital-marketing') ||
    norm.includes('solutions') ||
    norm.includes('pos.html') ||
    norm.includes('website-builder')
  );
});

console.log('Total target files to update:', targetFiles.length);

const CSS_SNIPPET = `
  <style id="seamless-wallpaper-style">
    /* Global Fluid Live Video Background (Live Wallpaper Engine) */
    body {
      background-color: transparent !important;
    }

    .global-fluid-bg {
      position: fixed !important;
      inset: 0 !important;
      width: 100vw !important;
      height: 100vh !important;
      z-index: -2 !important;
      overflow: hidden !important;
      background: #FAF6EE !important;
      pointer-events: none !important;
    }

    .global-fluid-bg video {
      position: absolute !important;
      top: 50% !important;
      left: 50% !important;
      min-width: 100% !important;
      min-height: 100% !important;
      width: auto !important;
      height: auto !important;
      transform: translate(-50%, -50%) !important;
      object-fit: cover !important;
      opacity: 0 !important;
      transition: opacity 0.35s ease-in-out !important;
      filter: saturate(1.1) brightness(1.02) !important;
      pointer-events: none !important;
      will-change: opacity !important;
    }

    .global-fluid-bg video.is-active {
      opacity: 0.85 !important;
    }

    .global-fluid-mask {
      position: fixed !important;
      inset: 0 !important;
      width: 100vw !important;
      height: 100vh !important;
      background: radial-gradient(circle at 45% 25%, rgba(250, 246, 238, 0.3) 0%, rgba(240, 245, 241, 0.52) 100%) !important;
      z-index: -1 !important;
      pointer-events: none !important;
    }
  </style>
`;

const HTML_SNIPPET = `
<div class="global-fluid-bg">
  <video class="bg-vid bg-vid-1 is-active" autoplay muted playsinline preload="auto">
    <source src="backgroundvideo1.mp4" type="video/mp4">
    <source src="./backgroundvideo1.mp4" type="video/mp4">
    <source src="../backgroundvideo1.mp4" type="video/mp4">
    <source src="../../backgroundvideo1.mp4" type="video/mp4">
    <source src="/backgroundvideo1.mp4" type="video/mp4">
  </video>
  <video class="bg-vid bg-vid-2" muted playsinline preload="auto">
    <source src="backgroundvideo1.mp4" type="video/mp4">
    <source src="./backgroundvideo1.mp4" type="video/mp4">
    <source src="../backgroundvideo1.mp4" type="video/mp4">
    <source src="../../backgroundvideo1.mp4" type="video/mp4">
    <source src="/backgroundvideo1.mp4" type="video/mp4">
  </video>
</div>
<div class="global-fluid-mask"></div>
`;

const JS_SNIPPET = `
  <!-- Seamless Gapless Live Wallpaper Looper Engine (Zero-Pause Double Buffering) -->
  <script id="seamless-video-looper-script">
    (function initSeamlessVideoLooper() {
      const container = document.querySelector('.global-fluid-bg');
      if (!container) return;
      const vids = container.querySelectorAll('video');
      if (!vids || vids.length === 0) return;

      vids.forEach((v) => {
        v.muted = true;
        v.defaultMuted = true;
        v.playsInline = true;
        v.setAttribute('playsinline', '');
        v.setAttribute('webkit-playsinline', '');
      });

      if (vids.length === 1) {
        vids[0].classList.add('is-active');
        vids[0].play().catch(() => { });
        return;
      }

      let activeIdx = 0;
      let swapping = false;

      const activeVid = () => vids[activeIdx];
      const nextVid = () => vids[1 - activeIdx];

      const triggerSwap = () => {
        if (swapping) return;
        swapping = true;

        const current = activeVid();
        const incoming = nextVid();

        try {
          incoming.currentTime = 0;
        } catch (e) { }

        const playPromise = incoming.play();

        const executeTransition = () => {
          incoming.classList.add('is-active');
          current.classList.remove('is-active');

          setTimeout(() => {
            try {
              current.pause();
              current.currentTime = 0;
            } catch (err) { }
            activeIdx = 1 - activeIdx;
            swapping = false;
          }, 350);
        };

        if (playPromise !== undefined) {
          playPromise.then(executeTransition).catch(() => {
            executeTransition();
          });
        } else {
          executeTransition();
        }
      };

      const checkTime = () => {
        const current = activeVid();
        if (current && current.duration && !swapping) {
          const remaining = current.duration - current.currentTime;
          if (remaining <= 0.35 && current.currentTime > 0.5) {
            triggerSwap();
          }
        }
        requestAnimationFrame(checkTime);
      };

      vids.forEach((v) => {
        v.addEventListener('timeupdate', () => {
          if (v === activeVid() && v.duration && !swapping) {
            const remaining = v.duration - v.currentTime;
            if (remaining <= 0.35 && v.currentTime > 0.5) {
              triggerSwap();
            }
          }
        });

        v.addEventListener('ended', () => {
          if (v === activeVid()) {
            triggerSwap();
          }
        });
      });

      const startLooper = () => {
        vids[0].classList.add('is-active');
        const p = vids[0].play();
        if (p !== undefined) {
          p.catch(() => {
            const unlock = () => {
              vids[0].play().catch(() => { });
              window.removeEventListener('click', unlock);
              window.removeEventListener('scroll', unlock);
              window.removeEventListener('touchstart', unlock);
            };
            window.addEventListener('click', unlock, { passive: true, once: true });
            window.addEventListener('scroll', unlock, { passive: true, once: true });
            window.addEventListener('touchstart', unlock, { passive: true, once: true });
          });
        }
        requestAnimationFrame(checkTime);
      };

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startLooper);
      } else {
        startLooper();
      }
    })();
  </script>
`;

let updatedCount = 0;

for (const file of targetFiles) {
  let html = fs.readFileSync(file, 'utf8');

  // 1. Remove any old style block with id seamless-wallpaper-style
  html = html.replace(/<style id="seamless-wallpaper-style">[\s\S]*?<\/style>/gi, '');

  // Add the CSS before </head>
  if (html.includes('</head>')) {
    html = html.replace('</head>', `${CSS_SNIPPET}\n</head>`);
  }

  // 2. Handle HTML video markup:
  // Remove existing <div class="global-fluid-bg">...</div> and <div class="global-fluid-mask"></div>
  // Be careful to match non-greedy
  html = html.replace(/<div class="global-fluid-bg">[\s\S]*?<\/div>\s*(<div class="global-fluid-mask"><\/div>)?/gi, '');
  html = html.replace(/<div class="global-fluid-mask"><\/div>/gi, '');

  // Now insert HTML_SNIPPET immediately after <body...>
  const bodyMatch = html.match(/<body[^>]*>/i);
  if (bodyMatch) {
    const bodyTag = bodyMatch[0];
    html = html.replace(bodyTag, `${bodyTag}\n${HTML_SNIPPET}\n`);
  }

  // 3. Handle JS looper script:
  // Remove existing initSeamlessVideoLooper script if any
  html = html.replace(/<!-- Seamless Gapless Live Wallpaper Looper Engine[\s\S]*?<\/script>/gi, '');
  html = html.replace(/<script id="seamless-video-looper-script">[\s\S]*?<\/script>/gi, '');
  // Also remove standalone function initSeamlessVideoLooper if wrapped in other script
  html = html.replace(/<script>\s*\(function initSeamlessVideoLooper\(\)[\s\S]*?<\/script>/gi, '');

  // Insert JS_SNIPPET before </body>
  if (html.includes('</body>')) {
    html = html.replace('</body>', `${JS_SNIPPET}\n</body>`);
  }

  fs.writeFileSync(file, html, 'utf8');
  updatedCount++;
}

console.log(`Successfully updated ${updatedCount} files with seamless live video wallpaper!`);
