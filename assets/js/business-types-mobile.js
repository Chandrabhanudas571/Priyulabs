/**
 * Priyulabs Business Types - Shared Mobile Interactive Enhancements
 * Pure Vanilla JS, lightweight, no external dependencies.
 * Strictly operates on mobile viewports (<= 767px).
 */
(function initBusinessTypesMobile() {
  function setup() {
    if (window.innerWidth > 767) return;

    // -------------------------------------------------------------
    // 1. PILLAR CAROUSEL SETUP (Dots, Counter & IntersectionObserver)
    // -------------------------------------------------------------
    const pillarSec = document.querySelector('.clean-pillars-sec, .pillars-sec');
    if (!pillarSec) return;

    // Find the card container
    const container = pillarSec.querySelector('.clean-container, .pillars-container, .sticky-scroll-stage');
    if (!container) return;

    // Find all pillar cards or rows
    const cards = Array.from(pillarSec.querySelectorAll('.pillar-row, .pillar-scroll-step, .pillar-card'));
    if (cards.length <= 1) return; // 1 pillar renders as a normal card

    // Accessibility attributes on carousel container
    container.setAttribute('role', 'region');
    container.setAttribute('aria-label', 'Pillars');
    container.setAttribute('tabindex', '0');

    // Arrow key navigation
    container.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        container.scrollBy({ left: container.clientWidth * 0.86, behavior: 'smooth' });
      } else if (e.key === 'ArrowLeft') {
        container.scrollBy({ left: -container.clientWidth * 0.86, behavior: 'smooth' });
      }
    });

    // Progressive enhancement: Wrap "How it works" in <details>
    cards.forEach((card, idx) => {
      card.setAttribute('data-pillar-card-idx', idx);
      
      const bodyText = card.querySelector('.pillar-body-text, .pillar-desc');
      if (bodyText && !card.querySelector('.pl-how-details')) {
        const textContent = bodyText.innerHTML.replace(/<strong>How It Works:?<\/strong>/i, '').trim();
        const details = document.createElement('details');
        details.className = 'pl-how-details';
        details.innerHTML = `
          <summary class="pl-how-summary">
            <span>How it works</span>
            <svg class="pl-how-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </summary>
          <div class="pl-how-content">${textContent}</div>
        `;
        bodyText.parentNode.insertBefore(details, bodyText);
        bodyText.style.display = 'none'; // Keep in DOM for fallback/SEO
      }
    });

    // Check if nav already exists
    let navWrap = pillarSec.querySelector('.pl-carousel-nav');
    if (!navWrap) {
      navWrap = document.createElement('div');
      navWrap.className = 'pl-carousel-nav';
      navWrap.setAttribute('role', 'tablist');
      navWrap.setAttribute('aria-label', 'Pillar navigation');

      const dotsContainer = document.createElement('div');
      dotsContainer.className = 'pl-dots-track';

      const counter = document.createElement('div');
      counter.className = 'pl-counter-badge';
      counter.textContent = `1 / ${cards.length}`;

      cards.forEach((card, i) => {
        const dotBtn = document.createElement('button');
        dotBtn.type = 'button';
        dotBtn.className = `pl-dot-btn ${i === 0 ? 'active' : ''}`;
        dotBtn.setAttribute('role', 'tab');
        dotBtn.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
        dotBtn.setAttribute('aria-label', `Go to pillar ${i + 1}`);
        
        const dotPill = document.createElement('span');
        dotPill.className = 'pl-dot-pill';
        dotBtn.appendChild(dotPill);

        dotBtn.addEventListener('click', () => {
          card.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
        });

        dotsContainer.appendChild(dotBtn);
      });

      navWrap.appendChild(dotsContainer);
      navWrap.appendChild(counter);

      // Insert right after container
      container.parentNode.insertBefore(navWrap, container.nextSibling);

      // IntersectionObserver for active dot and counter
      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
              const activeIdx = parseInt(entry.target.getAttribute('data-pillar-card-idx') || '0', 10);
              const allDots = navWrap.querySelectorAll('.pl-dot-btn');
              allDots.forEach((btn, idx) => {
                const isActive = idx === activeIdx;
                btn.classList.toggle('active', isActive);
                btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
              });
              counter.textContent = `${activeIdx + 1} / ${cards.length}`;
            }
          });
        }, {
          root: container,
          threshold: 0.55
        });

        cards.forEach(card => observer.observe(card));
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }

  // Handle orientation change or resize
  window.addEventListener('resize', () => {
    setup();
  });
})();
