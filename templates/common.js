/**
 * PriyuLabs Shared HTML & UI Components Generator
 * Generates SEO meta tags, navigation headers, the 3-level sliding mobile drawer,
 * footers, and the WhatsApp floating button.
 */
const menuData = require('../data/menuData.js');

function renderDrawerHtml() {
  const { businessTypes } = menuData;

  // Level 2 Category Lists
  let btypesCatHtml = businessTypes.map(cat => `
    <button type="button" class="m-drawer-link" onclick="mDrillGoLevel3('business-types', '${cat.categorySlug}', '${escapeHtml(cat.categoryTitle)}')">
      <span>${escapeHtml(cat.categoryTitle)}</span>
      <span class="m-drawer-arrow">&rarr;</span>
    </button>
  `).join('') + `
    <a href="all-business-types.html" class="m-drawer-link" onclick="handleDrawerSectorClick(event, this.href)">
      <span>All Business Types</span>
      <span class="m-drawer-arrow">&rarr;</span>
    </a>
  `;

  // 4 Core Solutions matching desktop dropdown
  const solutionsList = [
    {
      title: 'Smart POS',
      desc: 'Fast billing, AI voice checkout & offline mode',
      url: '/pos'
    },
    {
      title: 'Complete Management System',
      desc: 'Inventory ERP, Staff HRMS & 1-Click GST sync',
      url: '/complete-management-system'
    },
    {
      title: 'Custom Website Building',
      desc: 'E-Commerce stores, web apps & 5-day delivery',
      url: '/website-builder'
    },
    {
      title: 'Digital Marketing & Ads',
      desc: 'Meta Ads, Google Local SEO & WhatsApp Commerce',
      url: '/digital-marketing'
    }
  ];

  let solCatHtml = solutionsList.map(sol => `
    <a href="${sol.url}" class="m-drawer-link m-drawer-card-link" onclick="handleDrawerSectorClick(event, this.href)">
      <div class="m-drawer-card-content">
        <strong class="m-drawer-card-title">${escapeHtml(sol.title)}</strong>
        <span class="m-drawer-card-desc">${escapeHtml(sol.desc)}</span>
      </div>
      <span class="m-drawer-arrow">&rarr;</span>
    </a>
  `).join('');

  // Level 3 Sector Lists (Pre-rendered as real <a> tags for SEO crawling)
  let level3GroupsHtml = '';

  businessTypes.forEach(cat => {
    const itemsHtml = cat.sectors.map(sec => `
      <a href="${sec.url || `/business-types/${cat.categorySlug}/${sec.slug}`}" class="m-drawer-link${sec.isPrimary ? ' highlight' : ''}" onclick="handleDrawerSectorClick(event, this.href)">
        <span>${escapeHtml(sec.title)}</span>
        <span class="m-drawer-arrow">&rarr;</span>
      </a>
    `).join('');

    level3GroupsHtml += `
      <div class="m-drill-group" id="mDrillGroup-business-types-${cat.categorySlug}" style="display: none;">
        ${itemsHtml}
      </div>
    `;
  });

  return `
  <!-- Mobile Navigation Drawer (3-Level Horizontal Drill-Down) -->
  <div class="m-drawer-backdrop drawer-backdrop" id="drawerBackdrop" onclick="closeMobileNav()"></div>
  <aside class="m-drawer mobile-drawer" id="mobileDrawer" role="dialog" aria-modal="true" aria-label="Mobile Navigation Menu">
    <div class="m-drawer-header">
      <a href="/" class="m-nav-logo" onclick="closeMobileNav()">
        <img src="assets/logo.svg" alt="PriyuLabs" onerror="this.onerror=null; this.src='assets/logo.svg';" />
        <span>PriyuLabs</span>
      </a>
      <button class="m-drawer-close drawer-close" id="drawerCloseBtn" aria-label="Close navigation menu" onclick="closeMobileNav()">
        <span id="mDrawerCloseBtn" style="display:inline-block; pointer-events:auto;">✕</span>
      </button>
    </div>

    <div class="m-drawer-body">
      <div class="m-drill-viewport">
        <div class="m-drill-track" id="mDrillTrack">

          <!-- LEVEL 1: Main 4-Item Menu -->
          <div class="m-drill-panel" id="mDrillPanel1">
            <button type="button" class="m-drawer-link" onclick="mDrillGoLevel2('business-types', 'Business Types')">
              <span>Business Types</span>
              <span class="m-drawer-arrow">&rarr;</span>
            </button>
            <button type="button" class="m-drawer-link" onclick="mDrillGoLevel2('solutions', 'Solutions')">
              <span>Solutions</span>
              <span class="m-drawer-arrow">&rarr;</span>
            </button>
            <a href="/#contact" class="m-drawer-link" onclick="handleDrawerNavClick(event, 'contact')">
              <span>Pricing</span>
              <span class="m-drawer-arrow">&rarr;</span>
            </a>
            <a href="/#whats-new" class="m-drawer-link" onclick="handleDrawerNavClick(event, 'whats-new')">
              <span>What's New</span>
              <span class="m-drawer-arrow">&rarr;</span>
            </a>
          </div>

          <!-- LEVEL 2: 4 Main Categories -->
          <div class="m-drill-panel" id="mDrillPanel2">
            <div class="m-drill-header">
              <button type="button" class="m-drill-back-btn" onclick="mDrillGoBack(1)" aria-label="Back to main menu">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
                <span>Back</span>
              </button>
              <div class="m-drill-title" id="mDrillTitleLevel2">Business Types</div>
            </div>

            <div class="m-drill-group" id="mDrillGroup-categories-business-types" style="display: none;">
              ${btypesCatHtml}
            </div>

            <div class="m-drill-group" id="mDrillGroup-categories-solutions" style="display: none;">
              ${solCatHtml}
            </div>
          </div>

          <!-- LEVEL 3: Sectors / Solutions List -->
          <div class="m-drill-panel" id="mDrillPanel3">
            <div class="m-drill-header">
              <button type="button" class="m-drill-back-btn" onclick="mDrillGoBack(2)" aria-label="Back to categories">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
                <span>Back</span>
              </button>
              <div class="m-drill-title" id="mDrillTitleLevel3">Category</div>
            </div>

            ${level3GroupsHtml}
          </div>

        </div>
      </div>
    </div>

    <div class="m-drawer-footer">
      <a href="https://wa.me/917873844050?text=Hi%20Priyulabs,%20I%20want%20to%20book%20a%2010-min%20demo." target="_blank" rel="noopener noreferrer" class="m-drawer-cta-primary" onclick="closeMobileNav()">Book a 10-Min Demo</a>
      <a href="https://wa.me/917849074050?text=Hi%20Priyulabs,%20I%20want%20to%20learn%20more%20about%20your%20retail%20operating%20system." target="_blank" rel="noopener noreferrer" class="m-drawer-cta-wa">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.074-2.18-.54-1.898-.782-3.118-2.73-3.212-2.857-.094-.127-.775-1.029-.775-1.961 0-.932.489-1.391.663-1.583.174-.192.38-.24.507-.24.127 0 .254.001.363.007.119.006.279-.045.437.334.164.394.561 1.366.611 1.467.05.101.082.22.016.353-.067.133-.1.216-.198.33-.099.115-.208.257-.297.345-.101.099-.207.207-.089.41.118.203.525.867 1.127 1.403.774.689 1.427.902 1.63.1.203.101.323.089.444-.051.121-.14.52-.607.66-.814.14-.207.279-.172.47-.101.191.071 1.213.571 1.421.674.208.103.346.155.397.243.05.088.05.512-.094.917z"/>
        </svg>
        WhatsApp Support
      </a>
    </div>
  </aside>
  `;
}

function renderDrawerCss() {
  return `
    /* ========================================================
       MOBILE 3-LEVEL DRILL-DOWN DRAWER STYLES (MOBILE ONLY)
       ======================================================== */
    @media (max-width: 767px) {
    .m-drawer-backdrop {
      position: fixed !important;
      inset: 0 !important;
      background: rgba(42, 36, 25, 0.6) !important;
      z-index: 1001 !important;
      opacity: 0 !important;
      pointer-events: none !important;
      transition: opacity 0.3s ease !important;
      backdrop-filter: blur(4px) !important;
      -webkit-backdrop-filter: blur(4px) !important;
    }
    .m-drawer-backdrop.is-open,
    .m-drawer-backdrop.open {
      display: block !important;
      opacity: 1 !important;
      pointer-events: auto !important;
    }

    .m-drawer {
      position: fixed !important;
      top: 0 !important;
      right: 0 !important;
      width: min(340px, 86vw) !important;
      height: 100% !important;
      background: var(--bg, #FAF6EE) !important;
      z-index: 1002 !important;
      transform: translateX(100%) !important;
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
      display: flex !important;
      flex-direction: column !important;
      box-shadow: -10px 0 30px rgba(0, 0, 0, 0.15) !important;
      box-sizing: border-box !important;
      overflow: hidden !important;
    }
    .m-drawer.is-open,
    .m-drawer.open {
      transform: translateX(0) !important;
    }
    .m-drawer:not(.is-open):not(.open) {
      box-shadow: none !important;
    }

    .m-drawer-header {
      display: flex !important;
      align-items: center !important;
      justify-content: space-between !important;
      padding: 16px 20px !important;
      border-bottom: 1px solid var(--line, #E3D9C1) !important;
      background: var(--bg, #FAF6EE) !important;
      flex-shrink: 0 !important;
    }
    .m-nav-logo {
      display: inline-flex !important;
      align-items: center !important;
      gap: 10px !important;
      text-decoration: none !important;
    }
    .m-nav-logo img {
      width: 28px !important;
      height: 28px !important;
      object-fit: contain !important;
    }
    .m-nav-logo span {
      font-family: 'Fraunces', serif !important;
      font-size: 20px !important;
      font-weight: 600 !important;
      color: var(--ink, #2A2419) !important;
    }

    .m-drawer-close {
      width: 44px !important;
      height: 44px !important;
      border-radius: 50% !important;
      background: var(--bg-alt, #F1EAD9) !important;
      border: 1px solid var(--line, #E3D9C1) !important;
      color: var(--ink, #2A2419) !important;
      font-size: 18px !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      cursor: pointer !important;
      touch-action: manipulation !important;
      transition: background 0.15s ease, transform 0.15s ease !important;
    }
    .m-drawer-close:hover {
      background: var(--line, #E3D9C1) !important;
      transform: scale(1.05) !important;
    }

    .m-drawer-body {
      flex: 1 !important;
      overflow: hidden !important;
      padding: 0 !important;
      position: relative !important;
      display: flex !important;
      flex-direction: column !important;
    }

    .m-drill-viewport {
      width: 100% !important;
      height: 100% !important;
      overflow: hidden !important;
      position: relative !important;
    }

    .m-drill-track {
      display: flex !important;
      width: 300% !important;
      height: 100% !important;
      transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
      will-change: transform !important;
    }

    .m-drill-panel {
      width: 33.33333% !important;
      height: 100% !important;
      overflow-y: auto !important;
      -webkit-overflow-scrolling: touch !important;
      padding: 20px 20px 24px !important;
      box-sizing: border-box !important;
      display: flex !important;
      flex-direction: column !important;
      gap: 14px !important;
    }

    .m-drill-header {
      display: flex !important;
      align-items: center !important;
      justify-content: space-between !important;
      padding-bottom: 14px !important;
      margin-bottom: 8px !important;
      border-bottom: 1px solid var(--line, #E3D9C1) !important;
      flex-shrink: 0 !important;
      gap: 10px !important;
    }

    .m-drill-back-btn {
      display: inline-flex !important;
      align-items: center !important;
      gap: 6px !important;
      background: transparent !important;
      border: none !important;
      font-size: 15px !important;
      font-weight: 600 !important;
      color: var(--accent, #3F5D42) !important;
      cursor: pointer !important;
      padding: 6px 8px 6px 0 !important;
      touch-action: manipulation !important;
      font-family: inherit !important;
      transition: transform 0.15s ease !important;
      flex-shrink: 0 !important;
    }
    .m-drill-back-btn:hover {
      transform: translateX(-2px) !important;
    }

    .m-drill-title {
      font-family: 'Fraunces', serif !important;
      font-size: 16px !important;
      font-weight: 600 !important;
      color: var(--ink, #2A2419) !important;
      white-space: nowrap !important;
      overflow: hidden !important;
      text-overflow: ellipsis !important;
      text-align: right !important;
      flex: 1 !important;
    }

    .m-drill-group {
      display: none !important;
      flex-direction: column !important;
      gap: 12px !important;
      width: 100% !important;
    }

    .m-drill-group.is-active {
      display: flex !important;
    }

    .m-drawer-link {
      display: flex !important;
      align-items: center !important;
      justify-content: space-between !important;
      min-height: 58px !important;
      padding: 16px 20px !important;
      font-size: 16.5px !important;
      font-weight: 600 !important;
      color: var(--ink, #2A2419) !important;
      background: var(--panel, #FFFFFF) !important;
      border: 1px solid var(--line, #E3D9C1) !important;
      border-radius: 14px !important;
      text-decoration: none !important;
      touch-action: manipulation !important;
      box-shadow: 0 2px 8px rgba(42, 36, 25, 0.04) !important;
      transition: background 0.2s ease, transform 0.15s ease, border-color 0.2s ease, box-shadow 0.2s ease !important;
      cursor: pointer !important;
      font-family: inherit !important;
      width: 100% !important;
      box-sizing: border-box !important;
      text-align: left !important;
    }

    .m-drawer-link:hover,
    .m-drawer-link:active {
      background: var(--accent-soft, #E7EEE4) !important;
      border-color: var(--accent, #3F5D42) !important;
      transform: translateX(2px) !important;
      box-shadow: 0 4px 12px rgba(63, 93, 66, 0.1) !important;
    }

    .m-drawer-card-link {
      display: flex !important;
      align-items: center !important;
      justify-content: space-between !important;
      padding: 14px 18px !important;
      min-height: 66px !important;
      gap: 12px !important;
      text-decoration: none !important;
    }
    .m-drawer-card-content {
      display: flex !important;
      flex-direction: column !important;
      gap: 3px !important;
      flex: 1 !important;
      min-width: 0 !important;
      text-align: left !important;
    }
    .m-drawer-card-title {
      font-size: 15.5px !important;
      font-weight: 700 !important;
      color: var(--ink, #2A2419) !important;
      line-height: 1.3 !important;
      word-wrap: break-word !important;
      overflow-wrap: break-word !important;
      white-space: normal !important;
    }
    .m-drawer-card-desc {
      font-size: 13px !important;
      font-weight: 400 !important;
      color: var(--ink-soft, #6E6554) !important;
      line-height: 1.35 !important;
      word-wrap: break-word !important;
      overflow-wrap: break-word !important;
      white-space: normal !important;
    }

    .m-drawer-arrow {
      font-size: 18px !important;
      color: var(--accent, #3F5D42) !important;
      font-weight: 500 !important;
      flex-shrink: 0 !important;
      margin-left: 8px !important;
    }

    .m-drawer-footer {
      padding: 16px 20px !important;
      border-top: 1px solid var(--line, #E3D9C1) !important;
      display: flex !important;
      flex-direction: column !important;
      gap: 10px !important;
      background: var(--bg, #FAF6EE) !important;
      flex-shrink: 0 !important;
    }

    .m-drawer-cta-primary {
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      width: 100% !important;
      padding: 14px 20px !important;
      background: var(--accent, #3F5D42) !important;
      color: #FFFFFF !important;
      font-size: 15px !important;
      font-weight: 600 !important;
      border-radius: 12px !important;
      text-decoration: none !important;
      box-shadow: 0 4px 14px rgba(63, 93, 66, 0.25) !important;
      transition: background 0.2s ease, transform 0.15s ease !important;
      box-sizing: border-box !important;
    }
    .m-drawer-cta-primary:hover {
      background: #334b35 !important;
      transform: translateY(-1px) !important;
    }

    .m-drawer-cta-wa {
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      gap: 8px !important;
      width: 100% !important;
      padding: 14px 20px !important;
      background: #25D366 !important;
      color: #FFFFFF !important;
      font-size: 15px !important;
      font-weight: 600 !important;
      border-radius: 12px !important;
      text-decoration: none !important;
      box-shadow: 0 4px 14px rgba(37, 211, 102, 0.25) !important;
      transition: background 0.2s ease, transform 0.15s ease !important;
      box-sizing: border-box !important;
    }
    .m-drawer-cta-wa:hover {
      background: #20BA5A !important;
      transform: translateY(-1px) !important;
    }
    }

    @media (min-width: 768px) {
      .m-drawer,
      .m-drawer-backdrop {
        display: none !important;
      }
    }
  `;
}

function renderDrawerScript() {
  return `
    <script>
      (function() {
        var currentDrillLevel = 1;
        var currentFlowType = null;
        var currentCategorySlug = null;

        function setTrackTransform(level) {
          var track = document.getElementById('mDrillTrack');
          if (!track) return;
          if (level === 1) track.style.transform = 'translateX(0%)';
          else if (level === 2) track.style.transform = 'translateX(-33.33333%)';
          else if (level === 3) track.style.transform = 'translateX(-66.66667%)';
          currentDrillLevel = level;
        }

        window.mDrillGoLevel2 = function(flowType, title) {
          currentFlowType = flowType;
          var titleEl = document.getElementById('mDrillTitleLevel2');
          if (titleEl) titleEl.textContent = title;

          var btypesGroup = document.getElementById('mDrillGroup-categories-business-types');
          var solGroup = document.getElementById('mDrillGroup-categories-solutions');

          if (btypesGroup) {
            if (flowType === 'business-types') btypesGroup.classList.add('is-active');
            else btypesGroup.classList.remove('is-active');
          }
          if (solGroup) {
            if (flowType === 'solutions') solGroup.classList.add('is-active');
            else solGroup.classList.remove('is-active');
          }

          setTrackTransform(2);
          try {
            window.history.pushState({ priyuDrillLevel: 2, flow: flowType }, '');
          } catch(e) {}
        };

        window.mDrillGoLevel3 = function(flowType, categorySlug, categoryTitle) {
          currentFlowType = flowType;
          currentCategorySlug = categorySlug;

          // Normalise category slugs
          if (categorySlug === 'fnb') categorySlug = 'food-beverage';
          if (categorySlug === 'beauty' || categorySlug === 'beauty-wellness') categorySlug = 'beauty-fashion';
          if (categorySlug === 'retail-shops') categorySlug = 'retail';
          if (categorySlug === 'education-services') categorySlug = 'services';

          var titleEl = document.getElementById('mDrillTitleLevel3');
          if (titleEl) titleEl.textContent = categoryTitle;

          // Hide all level 3 groups
          var allGroups = document.querySelectorAll('#mDrillPanel3 .m-drill-group');
          for (var i = 0; i < allGroups.length; i++) {
            allGroups[i].classList.remove('is-active');
          }

          var targetGroup = document.getElementById('mDrillGroup-' + flowType + '-' + categorySlug);
          if (targetGroup) {
            targetGroup.classList.add('is-active');
          }

          setTrackTransform(3);
          try {
            window.history.pushState({ priyuDrillLevel: 3, flow: flowType, cat: categorySlug }, '');
          } catch(e) {}
        };

        window.mDrillGoBack = function(targetLevel) {
          setTrackTransform(targetLevel);
        };

        window.mDrillReset = function() {
          setTrackTransform(1);
          currentFlowType = null;
          currentCategorySlug = null;
          var allGroups = document.querySelectorAll('.m-drill-group');
          for (var i = 0; i < allGroups.length; i++) {
            allGroups[i].classList.remove('is-active');
          }
        };

        window.handleDrawerSectorClick = function(event, url) {
          if (window.closeMobileNav) {
            window.closeMobileNav();
          }
          // Native navigation via <a> href
        };

        // Phone Back Button (Popstate)
        window.addEventListener('popstate', function(e) {
          var drawer = document.getElementById('mobileDrawer');
          var isOpen = drawer && (drawer.classList.contains('is-open') || drawer.classList.contains('open'));
          if (!isOpen) return;

          if (currentDrillLevel === 3) {
            setTrackTransform(2);
          } else if (currentDrillLevel === 2) {
            setTrackTransform(1);
          } else if (currentDrillLevel === 1) {
            if (window.closeMobileNav) window.closeMobileNav();
          }
        });

        // Dynamic Single Source of Truth sync from Desktop mega-menu
        function syncMobileSectorsFromDesktop() {
          var mapping = [
            { catSlug: 'food-beverage', altSlug: 'fnb', desktopTabId: 'tab-fnb' },
            { catSlug: 'retail', altSlug: 'retail', desktopTabId: 'tab-retail' },
            { catSlug: 'beauty-fashion', altSlug: 'beauty', desktopTabId: 'tab-beauty' },
            { catSlug: 'services', altSlug: 'services', desktopTabId: 'tab-services' }
          ];
          mapping.forEach(function(item) {
            var desktopTab = document.getElementById(item.desktopTabId);
            var targetGroup = document.getElementById('mDrillGroup-business-types-' + item.catSlug) ||
                              document.getElementById('mDrillGroup-business-types-' + item.altSlug);
            if (desktopTab && targetGroup) {
              var desktopLinks = desktopTab.querySelectorAll('a.sq-disc-item');
              if (desktopLinks.length > 0) {
                var html = '';
                for (var i = 0; i < desktopLinks.length; i++) {
                  var link = desktopLinks[i];
                  var text = link.textContent.trim().replace(/\s+/g, ' ');
                  var href = link.getAttribute('href');
                  var isPrimary = link.classList.contains('sq-disc-primary');
                  html += '<a href="' + href + '" class="m-drawer-link' + (isPrimary ? ' highlight' : '') + '" onclick="handleDrawerSectorClick(event, this.href)">' +
                    '<span>' + text + '</span>' +
                    '<span class="m-drawer-arrow">&rarr;</span>' +
                    '</a>\n';
                }
                targetGroup.innerHTML = html;
              }
            }
          });
        }
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', syncMobileSectorsFromDesktop);
        } else {
          syncMobileSectorsFromDesktop();
        }

        // Ensure drawer closes and resets properly
        var origClose = window.closeMobileNav;
        window.closeMobileNav = function() {
          if (origClose) origClose();
          setTimeout(function() {
            window.mDrillReset();
          }, 280);
        };
      })();
    </script>
  `;
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

module.exports = {
  renderDrawerHtml,
  renderDrawerCss,
  renderDrawerScript,
  escapeHtml
};
