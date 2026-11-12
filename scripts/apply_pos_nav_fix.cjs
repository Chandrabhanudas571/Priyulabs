const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

const mobileNavStyle = `  <style id="pos-mobile-nav-style">
    /* ══════════════════════════════════════════════════════════
       MOBILE NAVBAR & HAMBURGER (Strictly Mobile-Only <= 767px)
    ══════════════════════════════════════════════════════════ */
    @media (max-width: 767px) {
      header,
      header#navbar,
      nav.navbar {
        height: 64px !important;
        min-height: 64px !important;
        padding: 0 !important;
        background: rgba(250, 246, 238, 0.94) !important;
        backdrop-filter: blur(14px) !important;
        -webkit-backdrop-filter: blur(14px) !important;
        border-bottom: 1px solid rgba(0, 0, 0, 0.06) !important;
        box-shadow: 0 1px 4px rgba(42, 36, 25, 0.04) !important;
        transition: background 0.25s ease, border-color 0.25s ease !important;
      }

      body {
        padding-top: 64px !important;
      }

      .nav {
        height: 64px !important;
        padding: 0 16px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
        max-width: 100% !important;
        margin: 0 !important;
      }

      .logo {
        display: inline-flex !important;
        align-items: center !important;
        gap: 8px !important;
        flex-shrink: 0 !important;
        text-decoration: none !important;
      }

      .logo img {
        height: 28px !important;
        width: 28px !important;
        object-fit: contain !important;
        flex-shrink: 0 !important;
      }

      .logo-text-group {
        display: flex !important;
        flex-direction: column !important;
        line-height: 1.15 !important;
      }

      .logo-title {
        font-family: 'Fraunces', Georgia, serif !important;
        font-size: 16px !important;
        font-weight: 700 !important;
        color: var(--ink, #2A2419) !important;
        letter-spacing: 0.01em !important;
        line-height: 1.1 !important;
      }

      .logo-subtitle {
        font-family: 'Inter', -apple-system, sans-serif !important;
        font-size: 8px !important;
        font-weight: 700 !important;
        color: var(--gold, #B8863B) !important;
        letter-spacing: 0.06em !important;
        margin-top: 1px !important;
        line-height: 1 !important;
        white-space: nowrap !important;
      }

      .nav-links {
        display: none !important;
      }

      .nav-right-actions {
        display: flex !important;
        align-items: center !important;
        gap: 8px !important;
        flex-shrink: 0 !important;
      }

      /* Hide bulky secondary button on mobile to avoid overcrowding */
      .nav-cta-ghost {
        display: none !important;
      }

      /* Sleek pill CTA button matching reference */
      .nav-cta {
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        height: 38px !important;
        min-height: 38px !important;
        padding: 0 14px !important;
        background: #1b4332 !important;
        color: #FFFFFF !important;
        border-radius: 9999px !important;
        font-family: 'Inter', -apple-system, sans-serif !important;
        font-size: 13px !important;
        font-weight: 600 !important;
        line-height: 38px !important;
        white-space: nowrap !important;
        text-decoration: none !important;
        border: none !important;
        box-shadow: 0 2px 8px rgba(27, 67, 50, 0.22) !important;
        touch-action: manipulation !important;
        transition: background 0.2s ease, transform 0.15s ease !important;
      }

      .nav-cta:hover,
      .nav-cta:active {
        background: #143527 !important;
        transform: translateY(-1px) !important;
      }

      /* Accessible 38x38px hamburger button with 3 horizontal bars */
      .hamburger {
        display: flex !important;
        flex-direction: column !important;
        justify-content: center !important;
        align-items: center !important;
        gap: 4.5px !important;
        width: 38px !important;
        height: 38px !important;
        min-width: 38px !important;
        min-height: 38px !important;
        background: transparent !important;
        border: none !important;
        cursor: pointer !important;
        padding: 0 !important;
        border-radius: 8px !important;
        touch-action: manipulation !important;
        box-sizing: border-box !important;
        flex-shrink: 0 !important;
      }

      .hamburger span {
        display: block !important;
        width: 20px !important;
        height: 2px !important;
        background: var(--ink, #2A2419) !important;
        border-radius: 2px !important;
        pointer-events: none !important;
        transition: transform 0.25s ease, opacity 0.25s ease !important;
      }

      .hamburger.active span:nth-child(1) {
        transform: translateY(6.5px) rotate(45deg) !important;
      }

      .hamburger.active span:nth-child(2) {
        opacity: 0 !important;
        transform: scaleX(0) !important;
      }

      .hamburger.active span:nth-child(3) {
        transform: translateY(-6.5px) rotate(-45deg) !important;
      }

      .pos-hero {
        padding-top: 28px !important;
      }

      /* ─── FULL-SCREEN MOBILE DRILLDOWN DRAWER (WARM MASTER THEME) ─── */
      .drawer-backdrop {
        position: fixed !important;
        inset: 0 !important;
        background: rgba(42, 36, 25, 0.55) !important;
        z-index: 10001 !important;
        opacity: 0 !important;
        visibility: hidden !important;
        pointer-events: none !important;
        transition: opacity 0.28s ease, visibility 0.28s !important;
        backdrop-filter: blur(4px) !important;
        -webkit-backdrop-filter: blur(4px) !important;
      }

      .drawer-backdrop.open,
      .drawer-backdrop.is-open {
        opacity: 1 !important;
        visibility: visible !important;
        pointer-events: auto !important;
      }

      .mobile-drawer {
        display: flex !important;
        flex-direction: column !important;
        position: fixed !important;
        top: 0 !important;
        right: 0 !important;
        width: 100vw !important;
        max-width: 100vw !important;
        height: 100vh !important;
        height: 100dvh !important;
        background: #FAF6EE !important;
        color: #2A2419 !important;
        z-index: 10002 !important;
        opacity: 0 !important;
        visibility: hidden !important;
        pointer-events: none !important;
        transform: translateX(100%) !important;
        transition: opacity 0.28s cubic-bezier(0.16, 1, 0.3, 1), transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.28s !important;
        box-sizing: border-box !important;
        overflow: hidden !important;
      }

      .mobile-drawer.open,
      .mobile-drawer.is-open {
        opacity: 1 !important;
        visibility: visible !important;
        pointer-events: auto !important;
        transform: translateX(0) !important;
      }

      .drawer-header {
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
        height: 60px !important;
        padding: 0 16px !important;
        border-bottom: 1px solid var(--line, #E3D9C1) !important;
        background: #FAF6EE !important;
        flex-shrink: 0 !important;
        z-index: 10 !important;
      }

      .drawer-back-btn {
        display: flex !important;
        align-items: center !important;
        gap: 6px !important;
        background: none !important;
        border: none !important;
        color: #3F5D42 !important;
        font-size: 15px !important;
        font-weight: 600 !important;
        cursor: pointer !important;
        padding: 8px !important;
        border-radius: 8px !important;
        opacity: 0 !important;
        pointer-events: none !important;
        transform: translateX(-6px) !important;
        transition: opacity 0.2s ease, transform 0.2s ease !important;
      }

      .drawer-back-btn.visible {
        opacity: 1 !important;
        pointer-events: auto !important;
        transform: translateX(0) !important;
      }

      .drawer-header-title {
        font-family: 'Fraunces', Georgia, serif !important;
        font-size: 17px !important;
        font-weight: 700 !important;
        color: #2A2419 !important;
        text-align: center !important;
        flex: 1 !important;
        white-space: nowrap !important;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
        padding: 0 8px !important;
      }

      .drawer-close-btn {
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        width: 40px !important;
        height: 40px !important;
        background: #F1EAD9 !important;
        border: 1px solid #E3D9C1 !important;
        border-radius: 50% !important;
        color: #2A2419 !important;
        cursor: pointer !important;
        transition: background 0.15s ease, transform 0.15s ease !important;
      }

      .drawer-close-btn:active {
        transform: scale(0.92) !important;
      }

      .drawer-viewport {
        position: relative !important;
        flex: 1 !important;
        width: 100% !important;
        overflow: hidden !important;
      }

      .drawer-panel {
        position: absolute !important;
        inset: 0 !important;
        width: 100% !important;
        height: 100% !important;
        display: flex !important;
        flex-direction: column !important;
        opacity: 0 !important;
        visibility: hidden !important;
        pointer-events: none !important;
        transform: translateX(100%) !important;
        transition: transform 0.32s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.28s ease, visibility 0.32s !important;
      }

      .drawer-panel.active {
        opacity: 1 !important;
        visibility: visible !important;
        pointer-events: auto !important;
        transform: translateX(0) !important;
      }

      .drawer-panel.parent-out {
        transform: translateX(-30%) !important;
        opacity: 0 !important;
        visibility: hidden !important;
        pointer-events: none !important;
      }

      .drawer-panel-scroll {
        flex: 1 !important;
        overflow-y: auto !important;
        -webkit-overflow-scrolling: touch !important;
        padding: 20px 16px 40px !important;
      }

      .drawer-panel-eyebrow {
        font-size: 11.5px !important;
        font-weight: 700 !important;
        text-transform: uppercase !important;
        letter-spacing: 0.08em !important;
        color: #8C8270 !important;
        margin-bottom: 14px !important;
        padding-left: 4px !important;
      }

      .drawer-nav-list {
        display: flex !important;
        flex-direction: column !important;
        gap: 6px !important;
      }

      .drawer-nav-item {
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
        width: 100% !important;
        padding: 14px 14px !important;
        font-family: 'Fraunces', Georgia, serif !important;
        font-size: 18px !important;
        font-weight: 600 !important;
        color: #2A2419 !important;
        text-decoration: none !important;
        background: transparent !important;
        border: none !important;
        border-radius: 12px !important;
        text-align: left !important;
        cursor: pointer !important;
        transition: background 0.15s ease, transform 0.12s ease !important;
        box-sizing: border-box !important;
      }

      .drawer-nav-item:active {
        background: #F1EAD9 !important;
        transform: scale(0.985) !important;
      }

      .drawer-chevron {
        font-size: 20px !important;
        font-weight: 400 !important;
        color: #8C8270 !important;
        line-height: 1 !important;
      }

      .drawer-nav-list.compact .drawer-nav-item {
        font-family: 'Inter', -apple-system, sans-serif !important;
        font-size: 15px !important;
        padding: 12px 10px !important;
        border-bottom: 1px solid rgba(0, 0, 0, 0.05) !important;
        border-radius: 8px !important;
      }

      .drawer-nav-item.strong,
      .drawer-nav-item.highlight {
        color: #3F5D42 !important;
        font-weight: 700 !important;
      }

      .drawer-divider {
        height: 1px !important;
        background: #E3D9C1 !important;
        margin: 20px 0 16px !important;
      }

      .drawer-utility-links {
        display: flex !important;
        flex-direction: column !important;
        gap: 10px !important;
        padding: 0 6px !important;
        margin-bottom: 24px !important;
      }

      .drawer-sublink {
        font-size: 14px !important;
        font-weight: 600 !important;
        color: #6B6152 !important;
        text-decoration: none !important;
        background: none !important;
        border: none !important;
        text-align: left !important;
        cursor: pointer !important;
        padding: 6px 0 !important;
      }

      .drawer-sublink:hover,
      .drawer-sublink:active {
        color: #3F5D42 !important;
      }

      .drawer-bottom-cta {
        padding: 0 4px !important;
      }

      .drawer-btn-cta {
        width: 100% !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        padding: 14px !important;
        font-size: 15px !important;
        font-weight: 700 !important;
        border-radius: 12px !important;
        background: #1b4332 !important;
        color: #FFFFFF !important;
        text-decoration: none !important;
        box-shadow: 0 4px 12px rgba(27, 67, 50, 0.25) !important;
      }

      .drawer-solution-cards {
        display: flex !important;
        flex-direction: column !important;
        gap: 10px !important;
      }

      .drawer-sol-card {
        display: flex !important;
        align-items: flex-start !important;
        gap: 12px !important;
        padding: 14px !important;
        background: #F1EAD9 !important;
        border: 1px solid #E3D9C1 !important;
        border-radius: 14px !important;
        text-decoration: none !important;
        transition: background 0.15s ease, transform 0.12s ease !important;
      }

      .drawer-sol-card:active {
        transform: scale(0.98) !important;
        background: #E7EEE4 !important;
      }

      .drawer-sol-icon {
        color: #3F5D42 !important;
        flex-shrink: 0 !important;
        padding-top: 2px !important;
      }

      .drawer-sol-info {
        display: flex !important;
        flex-direction: column !important;
        gap: 2px !important;
      }

      .drawer-sol-info strong {
        font-family: 'Fraunces', Georgia, serif !important;
        font-size: 15px !important;
        font-weight: 700 !important;
        color: #2A2419 !important;
      }

      .drawer-sol-info span {
        font-size: 12.5px !important;
        color: #6B6152 !important;
        line-height: 1.35 !important;
      }
    }

    /* Desktop (min-width: 768px): Hamburger & Drawer 100% Hidden */
    @media (min-width: 768px) {
      .hamburger,
      .drawer-backdrop,
      .mobile-drawer {
        display: none !important;
      }
      .nav-cta-ghost {
        display: inline-flex !important;
      }
    }
  </style>`;

const hamburgerMarkup = `      <!-- Action Buttons -->
      <div class="nav-right-actions">
        <a href="/interactive-demo"
          onclick="if(location.protocol==='file:'){location.href='interactive-demo.html';return false;}"
          class="nav-cta-ghost">&#10022; Interactive Demo</a>
        <a href="/index.html#contact" class="nav-cta" onclick="goToFreeTrial(event)">Start Free Trial</a>
        <button class="hamburger" id="hamburger" aria-label="Toggle menu">
          <span></span><span></span><span></span>
        </button>
      </div>`;

const drawerMarkup = `  <!-- ══════════════════════════════════════════════════════════
       FULL-SCREEN SQUARE-STYLE MOBILE DRILLDOWN DRAWER
  ══════════════════════════════════════════════════════════ -->
  <div class="drawer-backdrop m-drawer-backdrop" id="drawerBackdrop" aria-hidden="true" onclick="closeMobileDrawer && closeMobileDrawer()"></div>
  <div class="mobile-drawer" id="mobileDrawer" aria-hidden="true">
    <!-- Top Header Bar inside Drawer -->
    <div class="drawer-header">
      <button type="button" class="drawer-back-btn" id="drawerBackBtn" aria-label="Go back to previous menu">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
          stroke-linecap="round" stroke-linejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        <span class="drawer-back-text">Back</span>
      </button>
      <div class="drawer-header-title" id="drawerHeaderTitle">Menu</div>
      <button type="button" class="drawer-close-btn" id="drawerCloseBtn" aria-label="Close navigation menu">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>

    <!-- Sliding Viewport Container -->
    <div class="drawer-viewport" id="drawerViewport">

      <!-- ════ LEVEL 1: MAIN MENU ════ -->
      <div class="drawer-panel drawer-panel-main active" id="drawerPanelMain" data-level="1" data-title="Menu">
        <div class="drawer-panel-scroll">
          <nav class="drawer-nav-list">
            <button type="button" class="drawer-nav-item drawer-drill-trigger" data-target="drawerPanelBusiness">
              <span>Business types</span>
              <span class="drawer-chevron">›</span>
            </button>
            <button type="button" class="drawer-nav-item drawer-drill-trigger" data-target="drawerPanelSolutions">
              <span>Solutions</span>
              <span class="drawer-chevron">›</span>
            </button>
            <a href="/index.html#contact" class="drawer-nav-item drawer-link" onclick="closeMobileDrawer && closeMobileDrawer()">
              <span>Pricing</span>
            </a>
            <a href="#pos-billing" class="drawer-nav-item drawer-link" onclick="closeMobileDrawer && closeMobileDrawer(); document.getElementById('pos-billing')?.scrollIntoView({behavior:'smooth'});">
              <span>What's new</span>
            </a>
          </nav>

          <div class="drawer-divider"></div>

          <!-- Lower Utility Links & CTA -->
          <div class="drawer-utility-links">
            <a href="all-business-types.html" class="drawer-sublink" onclick="closeMobileDrawer && closeMobileDrawer()">All Business Types Directory</a>
            <a href="/interactive-demo" class="drawer-sublink" onclick="closeMobileDrawer && closeMobileDrawer()">✨ Interactive Demo</a>
            <a href="/index.html#contact" class="drawer-sublink" onclick="closeMobileDrawer && closeMobileDrawer()">Support &amp; Contact</a>
          </div>

          <div class="drawer-bottom-cta">
            <a href="/index.html#contact" class="drawer-btn-cta" onclick="closeMobileDrawer && closeMobileDrawer(); goToFreeTrial(event);">Start Free Trial →</a>
          </div>
        </div>
      </div>

      <!-- ════ LEVEL 2: BUSINESS TYPES ════ -->
      <div class="drawer-panel" id="drawerPanelBusiness" data-level="2" data-parent="drawerPanelMain" data-title="Business types">
        <div class="drawer-panel-scroll">
          <div class="drawer-panel-eyebrow">Select Industry Category</div>
          <nav class="drawer-nav-list">
            <button type="button" class="drawer-nav-item drawer-drill-trigger" data-target="drawerPanelFnb">
              <span>☕ Food &amp; Beverage</span>
              <span class="drawer-chevron">›</span>
            </button>
            <button type="button" class="drawer-nav-item drawer-drill-trigger" data-target="drawerPanelRetail">
              <span>🛒 Retail</span>
              <span class="drawer-chevron">›</span>
            </button>
            <button type="button" class="drawer-nav-item drawer-drill-trigger" data-target="drawerPanelBeauty">
              <span>👗 Beauty &amp; Fashion</span>
              <span class="drawer-chevron">›</span>
            </button>
            <button type="button" class="drawer-nav-item drawer-drill-trigger" data-target="drawerPanelServices">
              <span>💊 Services</span>
              <span class="drawer-chevron">›</span>
            </button>
            <a href="all-business-types.html" class="drawer-nav-item drawer-link highlight" onclick="closeMobileDrawer && closeMobileDrawer()">
              <span>✨ View All Business Types</span>
            </a>
          </nav>
        </div>
      </div>

      <!-- ════ LEVEL 2: SOLUTIONS ════ -->
      <div class="drawer-panel" id="drawerPanelSolutions" data-level="2" data-parent="drawerPanelMain" data-title="Solutions">
        <div class="drawer-panel-scroll">
          <div class="drawer-panel-eyebrow">Core Products &amp; Services</div>
          <nav class="drawer-solution-cards">
            <a href="/pos" class="drawer-sol-card" onclick="closeMobileDrawer && closeMobileDrawer();">
              <div class="drawer-sol-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                  <rect width="20" height="14" x="2" y="3" rx="2" />
                  <path d="M8 21h8" />
                  <path d="M12 17v4" />
                </svg>
              </div>
              <div class="drawer-sol-info">
                <strong>Smart POS</strong>
                <span>Fast billing, AI voice checkout &amp; offline mode</span>
              </div>
            </a>
            <a href="/complete-management-system" class="drawer-sol-card" onclick="closeMobileDrawer && closeMobileDrawer();">
              <div class="drawer-sol-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" x2="18" y1="20" y2="10" />
                  <line x1="12" x2="12" y1="20" y2="4" />
                  <line x1="6" x2="6" y1="20" y2="14" />
                </svg>
              </div>
              <div class="drawer-sol-info">
                <strong>Complete Management System</strong>
                <span>Inventory ERP, Staff HRMS &amp; 1-Click GST sync</span>
              </div>
            </a>
            <a href="/website-builder" class="drawer-sol-card" onclick="closeMobileDrawer && closeMobileDrawer();">
              <div class="drawer-sol-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                  <path d="M2 12h20" />
                </svg>
              </div>
              <div class="drawer-sol-info">
                <strong>Custom Website Building</strong>
                <span>E-Commerce stores, web apps &amp; 5-day delivery</span>
              </div>
            </a>
            <a href="/digital-marketing" class="drawer-sol-card" onclick="closeMobileDrawer && closeMobileDrawer();">
              <div class="drawer-sol-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                  <path d="m3 11 19-9-9 19-2-8-8-2z" />
                </svg>
              </div>
              <div class="drawer-sol-info">
                <strong>Digital Marketing &amp; Ads</strong>
                <span>Meta Ads, Google Local SEO &amp; WhatsApp Commerce</span>
              </div>
            </a>
          </nav>
        </div>
      </div>

      <!-- ════ LEVEL 3: FOOD & BEVERAGE ════ -->
      <div class="drawer-panel" id="drawerPanelFnb" data-level="3" data-parent="drawerPanelBusiness" data-title="Food &amp; Beverage">
        <div class="drawer-panel-scroll">
          <div class="drawer-panel-eyebrow">Food &amp; Beverage Outlets</div>
          <nav class="drawer-nav-list compact">
            <a href="/restaurants-fine-dining" class="drawer-nav-item drawer-link strong" onclick="closeMobileDrawer && closeMobileDrawer();">Overview &amp; Features</a>
            <a href="/restaurants-fine-dining" class="drawer-nav-item drawer-link" onclick="closeMobileDrawer && closeMobileDrawer();">Restaurants &amp; Fine Dining</a>
            <a href="/qsr-fast-food" class="drawer-nav-item drawer-link" onclick="closeMobileDrawer && closeMobileDrawer();">QSR, Fast Food &amp; Takeaway</a>
            <a href="/cafes-chai-bars" class="drawer-nav-item drawer-link" onclick="closeMobileDrawer && closeMobileDrawer();">Cafes &amp; Chai Bars</a>
            <a href="/cloud-kitchens-catering" class="drawer-nav-item drawer-link" onclick="closeMobileDrawer && closeMobileDrawer();">Cloud Kitchens &amp; Catering</a>
            <a href="/bakeries-shops" class="drawer-nav-item drawer-link" onclick="closeMobileDrawer && closeMobileDrawer();">Bakeries &amp; Patisseries</a>
            <a href="/bars-pubs-breweries" class="drawer-nav-item drawer-link" onclick="closeMobileDrawer && closeMobileDrawer();">Bars, Pubs &amp; Breweries</a>
          </nav>
        </div>
      </div>

      <!-- ════ LEVEL 3: RETAIL ════ -->
      <div class="drawer-panel" id="drawerPanelRetail" data-level="3" data-parent="drawerPanelBusiness" data-title="Retail">
        <div class="drawer-panel-scroll">
          <div class="drawer-panel-eyebrow">Retail Outlets</div>
          <nav class="drawer-nav-list compact">
            <a href="/grocery-supermarkets-kirana" class="drawer-nav-item drawer-link strong" onclick="closeMobileDrawer && closeMobileDrawer();">Overview &amp; Features</a>
            <a href="/grocery-supermarkets-kirana" class="drawer-nav-item drawer-link" onclick="closeMobileDrawer && closeMobileDrawer();">Grocery, Supermarkets &amp; Kirana</a>
            <a href="/electronics-mobile-shops" class="drawer-nav-item drawer-link" onclick="closeMobileDrawer && closeMobileDrawer();">Electronics &amp; Mobile Shops</a>
            <a href="/footwear-leather-stores" class="drawer-nav-item drawer-link" onclick="closeMobileDrawer && closeMobileDrawer();">Footwear &amp; Leather Stores</a>
            <a href="/jewellery-shops" class="drawer-nav-item drawer-link" onclick="closeMobileDrawer && closeMobileDrawer();">Jewellery Showrooms &amp; Bullion</a>
            <a href="/watch-stores" class="drawer-nav-item drawer-link" onclick="closeMobileDrawer && closeMobileDrawer();">Watch Stores &amp; Horology</a>
            <a href="/bookstores-stationery" class="drawer-nav-item drawer-link" onclick="closeMobileDrawer && closeMobileDrawer();">Bookstores &amp; Stationery</a>
          </nav>
        </div>
      </div>

      <!-- ════ LEVEL 3: BEAUTY & FASHION ════ -->
      <div class="drawer-panel" id="drawerPanelBeauty" data-level="3" data-parent="drawerPanelBusiness" data-title="Beauty &amp; Fashion">
        <div class="drawer-panel-scroll">
          <div class="drawer-panel-eyebrow">Beauty &amp; Fashion Stores</div>
          <nav class="drawer-nav-list compact">
            <a href="/beauty-fashion/apparel" class="drawer-nav-item drawer-link strong" onclick="closeMobileDrawer && closeMobileDrawer();">Overview &amp; Features</a>
            <a href="/beauty-fashion/apparel" class="drawer-nav-item drawer-link" onclick="closeMobileDrawer && closeMobileDrawer();">Clothing Brands &amp; Boutiques</a>
            <a href="/beauty-fashion/salons" class="drawer-nav-item drawer-link" onclick="closeMobileDrawer && closeMobileDrawer();">Salons, Spas &amp; Beauty Parlors</a>
            <a href="/beauty-fashion/cosmetics" class="drawer-nav-item drawer-link" onclick="closeMobileDrawer && closeMobileDrawer();">Cosmetics &amp; Skincare Stores</a>
          </nav>
        </div>
      </div>

      <!-- ════ LEVEL 3: SERVICES ════ -->
      <div class="drawer-panel" id="drawerPanelServices" data-level="3" data-parent="drawerPanelBusiness" data-title="Services">
        <div class="drawer-panel-scroll">
          <div class="drawer-panel-eyebrow">Services &amp; Professional Businesses</div>
          <nav class="drawer-nav-list compact">
            <a href="/services/gyms" class="drawer-nav-item drawer-link strong" onclick="closeMobileDrawer && closeMobileDrawer();">Overview &amp; Features</a>
            <a href="/services/gyms" class="drawer-nav-item drawer-link" onclick="closeMobileDrawer && closeMobileDrawer();">Gyms, Fitness &amp; Yoga</a>
            <a href="/services/dry-cleaners" class="drawer-nav-item drawer-link" onclick="closeMobileDrawer && closeMobileDrawer();">Dry Cleaners &amp; Laundry</a>
          </nav>
        </div>
      </div>

    </div>
  </div>`;

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Smart base tag
  content = content.replace(
    '<base href="/">',
    `<script>if (window.location.protocol !== 'file:') { const b = document.createElement('base'); b.href = '/'; document.head.appendChild(b); }</script><noscript><base href="/"></noscript>`
  );

  // 2. Add pos-mobile-nav-style before </head> if not already there
  if (!content.includes('id="pos-mobile-nav-style"')) {
    content = content.replace('</head>', `${mobileNavStyle}\n</head>`);
  }

  // 3. Update .nav-right-actions to include hamburger button
  const oldActionsRegex = /<div class="nav-right-actions">[\s\S]*?<\/div>\s*<\/div>\s*<\/header>/;
  const newHeaderClose = `${hamburgerMarkup}\n    </div>\n  </header>`;
  content = content.replace(oldActionsRegex, newHeaderClose);

  // 4. Insert drawerMarkup right after </header> if not present
  if (!content.includes('id="mobileDrawer"')) {
    content = content.replace('</header>', `</header>\n\n${drawerMarkup}`);
  }

  // 5. Add script.js before </body> if not present
  if (!content.includes('src="script.js"')) {
    content = content.replace('</body>', `  <script src="script.js" defer></script>\n</body>`);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Successfully updated ${path.basename(filePath)}`);
}

processFile(path.join(rootDir, 'pos.html'));
processFile(path.join(rootDir, 'pos/index.html'));
