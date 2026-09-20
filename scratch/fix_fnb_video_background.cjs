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

const CSS_SNIPPET = `
  <style id="seamless-wallpaper-style">
    /* Global Fluid Live Video Background (Live Wallpaper Engine) */
    html, body {
      background-color: transparent !important;
      background: transparent !important;
    }

    /* Section background transparency so live wallpaper shows through */
    .clean-hero-sec,
    .clean-pillars-sec,
    .clean-features-sec,
    .clean-grid-sec,
    .clean-metrics-sec,
    .clean-cta-sec,
    .bottom-cta-sec,
    .pillars-sec,
    .features-sec,
    .metrics-sec,
    .clean-container,
    .hero-sec,
    .hub-hero,
    .matrix-sec,
    .sectors-stream-container,
    .sector-row,
    main {
      background: transparent !important;
      background-color: transparent !important;
    }

    /* Keep Nav and Header translucent with blur */
    .clean-nav-header,
    .navbar,
    header.clean-subnav,
    header {
      background: rgba(255, 255, 255, 0.85) !important;
      backdrop-filter: blur(16px) !important;
      -webkit-backdrop-filter: blur(16px) !important;
    }

    /* Keep Cards legible and clean with glassmorphism */
    .clean-hero-visual-frame {
      background: rgba(255, 255, 255, 0.88) !important;
      backdrop-filter: blur(12px) !important;
      -webkit-backdrop-filter: blur(12px) !important;
    }

    .clean-feat-card,
    .pillar-img-frame,
    .clean-hero-media-wrap,
    .deal-card {
      background: rgba(255, 255, 255, 0.92) !important;
      backdrop-filter: blur(8px) !important;
      -webkit-backdrop-filter: blur(8px) !important;
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

// First: generate a full, beautiful food-beverage.html page based on restaurants-fine-dining.html
let rfdContent = fs.readFileSync('restaurants-fine-dining.html', 'utf8');

// Modify rfdContent to represent the entire Food & Beverage Operating System Hub
let fnbContent = rfdContent
  .replace(/<title>.*?<\/title>/i, '<title>Food &amp; Beverage Operating System | Priyulabs</title>')
  .replace(/Hospitality at its finest\.\s*<br\s*\/?>\s*<span class="muted-title">Operations at full speed\.<\/span>/i, 'Food &amp; Beverage Ecosystem.<br /><span class="muted-title">Operations at full speed.</span>')
  .replace(/RESTAURANTS &amp; FINE DINING/i, 'FOOD &amp; BEVERAGE ECOSYSTEM')
  .replace(/From split-second table-side billing to intelligent kitchen automation and automated diner growth — an all-in-one platform built to elevate every dining service\./i, 'From split-second table billing and multi-station KDS to central kitchen recipe costing and automated diner loyalty — the complete retail engine engineered for modern restaurants, cafes, QSRs, bakeries, and cloud kitchens.');

// Save food-beverage.html and food-beverage/index.html
fs.writeFileSync('food-beverage.html', fnbContent, 'utf8');
if (!fs.existsSync('food-beverage')) {
  fs.mkdirSync('food-beverage', { recursive: true });
}
fs.writeFileSync('food-beverage/index.html', fnbContent, 'utf8');

if (fs.existsSync('dist')) {
  fs.writeFileSync('dist/food-beverage.html', fnbContent, 'utf8');
  if (!fs.existsSync('dist/food-beverage')) {
    fs.mkdirSync('dist/food-beverage', { recursive: true });
  }
  fs.writeFileSync('dist/food-beverage/index.html', fnbContent, 'utf8');
}

console.log('Successfully generated food-beverage.html and food-beverage/index.html!');

// Now update CSS_SNIPPET across all HTML files
const reWalk = walk('.');
let updated = 0;

for (const file of reWalk) {
  const norm = file.replace(/\\/g, '/');
  if (norm.endsWith('.new-backup')) continue;
  if (norm === 'index.html' || norm === 'dist/index.html') continue; // keep landing page as is

  let html = fs.readFileSync(file, 'utf8');

  // Replace seamless-wallpaper-style
  if (html.includes('<style id="seamless-wallpaper-style">')) {
    html = html.replace(/<style id="seamless-wallpaper-style">[\s\S]*?<\/style>/gi, CSS_SNIPPET);
  } else if (html.includes('</head>')) {
    html = html.replace('</head>', `${CSS_SNIPPET}\n</head>`);
  }

  // Ensure dual video markup is present
  if (!html.includes('bg-vid-1')) {
    html = html.replace(/<div class="global-fluid-bg">[\s\S]*?<\/div>\s*(<div class="global-fluid-mask"><\/div>)?/gi, '');
    html = html.replace(/<div class="global-fluid-mask"><\/div>/gi, '');
    const bodyMatch = html.match(/<body[^>]*>/i);
    if (bodyMatch) {
      const bodyTag = bodyMatch[0];
      html = html.replace(bodyTag, `${bodyTag}\n${HTML_SNIPPET}\n`);
    }
  }

  // Ensure looper script is present
  if (!html.includes('initSeamlessVideoLooper')) {
    if (html.includes('</body>')) {
      html = html.replace('</body>', `${JS_SNIPPET}\n</body>`);
    }
  }

  fs.writeFileSync(file, html, 'utf8');
  updated++;
}

console.log(`Updated ${updated} files with enhanced transparency CSS and live wallpaper!`);
