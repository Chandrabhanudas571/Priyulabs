/**
 * Priyulabs Business Types - Shared Mobile Interactive Enhancements
 * Pure Vanilla JS, lightweight, no external dependencies.
 * Strictly operates on mobile viewports (<= 767px).
 */
(function initBusinessTypesMobile() {
  function setup() {
    if (window.innerWidth > 767) return;

    // -------------------------------------------------------------
    // Interactive Swipe Indicators for Feature Grids & Showcases
    // -------------------------------------------------------------
    const swipeTrackSelectors = [
      '.cards-grid-6',
      '.clean-grid-6',
      '.clean-feature-grid',
      '.matrix-grid',
      '.features-grid',
      '.features-6-grid',
      '.hardware-grid',
      '.hero-triptych',
      '.hero-triptych-frame'
    ];

    const tracks = document.querySelectorAll(swipeTrackSelectors.join(', '));

    tracks.forEach((track) => {
      const items = Array.from(track.children).filter(el => !el.classList.contains('pl-swipe-hint-bar'));
      if (items.length <= 1) return;

      // Check if already injected
      const existingBar = track.nextElementSibling;
      if (existingBar && existingBar.classList.contains('pl-swipe-hint-bar')) return;

      const bar = document.createElement('div');
      bar.className = 'pl-swipe-hint-bar';

      // Left: Animated swipe label with pulsing arrow
      const hintLabel = document.createElement('div');
      hintLabel.className = 'pl-swipe-hint-label';
      hintLabel.innerHTML = `<span>Swipe to explore</span> <span class="pl-swipe-hint-arrow">→</span>`;

      // Right: Active dot indicators
      const dotsWrap = document.createElement('div');
      dotsWrap.className = 'pl-swipe-dots';

      const dots = [];
      items.forEach((item, idx) => {
        const dot = document.createElement('span');
        dot.className = `pl-swipe-dot ${idx === 0 ? 'active' : ''}`;
        dot.setAttribute('data-index', idx);
        dot.style.cursor = 'pointer';

        dot.addEventListener('click', () => {
          item.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
        });

        dotsWrap.appendChild(dot);
        dots.push(dot);
      });

      bar.appendChild(hintLabel);
      bar.appendChild(dotsWrap);

      // Insert right after track
      track.parentNode.insertBefore(bar, track.nextSibling);

      // Scroll listener to update active dot
      let ticking = false;
      track.addEventListener('scroll', () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            const scrollLeft = track.scrollLeft;
            const cardWidth = items[0].offsetWidth || (track.clientWidth * 0.84);
            const activeIdx = Math.min(
              Math.max(Math.round(scrollLeft / (cardWidth + 14)), 0),
              items.length - 1
            );

            dots.forEach((d, i) => {
              d.classList.toggle('active', i === activeIdx);
            });
            ticking = false;
          });
          ticking = true;
        }
      }, { passive: true });
    });

    // -------------------------------------------------------------
    // Staggered Entrance Animation on Scroll
    // -------------------------------------------------------------
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });

      document.querySelectorAll('.matrix-card, .clean-card, .triptych-card, .triptych-panel').forEach(card => {
        card.style.transition = 'opacity 0.45s ease-out, transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)';
        observer.observe(card);
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }

  window.addEventListener('resize', () => {
    setup();
  });
})();
