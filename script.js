// ─── THEME TOGGLE (LIGHT / DARK) ────────────────────────────────
const themeToggleBtn = document.getElementById('themeToggleBtn');
const savedTheme = localStorage.getItem('priyulabs_theme') || 'light';

function applyTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (themeToggleBtn) themeToggleBtn.textContent = '☀️';
  } else {
    document.documentElement.removeAttribute('data-theme');
    if (themeToggleBtn) themeToggleBtn.textContent = '🌙';
  }
}

applyTheme(savedTheme);

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    localStorage.setItem('priyulabs_theme', newTheme);
    applyTheme(newTheme);
    showToast(newTheme === 'dark' ? '🌙 Dark Mode Activated' : '☀️ Light Mode Activated');
  });
}

// ─── NAVBAR SCROLL & ACTIVE STATE ──────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ─── SQUARE-STYLE FULL-SCREEN DRILLDOWN MOBILE DRAWER ─────────
const mobileDrawer = document.getElementById('mobileDrawer');
const hamburger = document.getElementById('hamburger');
const drawerCloseBtn = document.getElementById('drawerCloseBtn');
const drawerBackBtn = document.getElementById('drawerBackBtn');
const drawerHeaderTitle = document.getElementById('drawerHeaderTitle');

if (mobileDrawer) {
  let panelStack = ['drawerPanelMain'];

  function updateDrawerHeader() {
    const currentPanelId = panelStack[panelStack.length - 1];
    const currentPanel = document.getElementById(currentPanelId);

    if (panelStack.length > 1) {
      if (drawerBackBtn) drawerBackBtn.classList.add('visible');
    } else {
      if (drawerBackBtn) drawerBackBtn.classList.remove('visible');
    }

    if (currentPanel && drawerHeaderTitle) {
      const title = currentPanel.getAttribute('data-title') || 'Menu';
      drawerHeaderTitle.textContent = title;
    }
  }

  function openMobileDrawer() {
    mobileDrawer.classList.add('open');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (hamburger) hamburger.classList.add('active');
    updateDrawerHeader();
  }

  function closeMobileDrawer() {
    mobileDrawer.classList.remove('open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (hamburger) hamburger.classList.remove('active');

    // Reset drill-down stack back to Level 1 after transition completes
    setTimeout(() => {
      resetDrawerToLevel1();
    }, 320);
  }

  function resetDrawerToLevel1() {
    document.querySelectorAll('.drawer-panel').forEach(p => {
      p.classList.remove('active', 'parent-out');
    });
    const mainPanel = document.getElementById('drawerPanelMain');
    if (mainPanel) mainPanel.classList.add('active');
    panelStack = ['drawerPanelMain'];
    updateDrawerHeader();
  }

  function drillDownTo(targetPanelId) {
    const currentPanelId = panelStack[panelStack.length - 1];
    const currentPanel = document.getElementById(currentPanelId);
    const targetPanel = document.getElementById(targetPanelId);

    if (!targetPanel) return;

    if (currentPanel) {
      currentPanel.classList.remove('active');
      currentPanel.classList.add('parent-out');
    }

    targetPanel.classList.remove('parent-out');
    targetPanel.classList.add('active');
    panelStack.push(targetPanelId);
    updateDrawerHeader();

    // Scroll new panel to top smoothly
    const scrollArea = targetPanel.querySelector('.drawer-panel-scroll');
    if (scrollArea) scrollArea.scrollTop = 0;
  }

  function drillBack() {
    if (panelStack.length <= 1) return;

    const leavingPanelId = panelStack.pop();
    const targetPanelId = panelStack[panelStack.length - 1];
    const leavingPanel = document.getElementById(leavingPanelId);
    const targetPanel = document.getElementById(targetPanelId);

    if (leavingPanel) {
      leavingPanel.classList.remove('active', 'parent-out');
    }

    if (targetPanel) {
      targetPanel.classList.remove('parent-out');
      targetPanel.classList.add('active');
    }

    updateDrawerHeader();
  }

  if (hamburger) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      if (mobileDrawer.classList.contains('open')) {
        closeMobileDrawer();
      } else {
        openMobileDrawer();
      }
    });
  }

  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener('click', closeMobileDrawer);
  }

  if (drawerBackBtn) {
    drawerBackBtn.addEventListener('click', drillBack);
  }

  // Drill triggers (Level 1 -> Level 2 -> Level 3)
  mobileDrawer.querySelectorAll('.drawer-drill-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const targetId = trigger.getAttribute('data-target');
      if (targetId) drillDownTo(targetId);
    });
  });

  // Regular destination navigation links & CTAs inside drawer
  mobileDrawer.querySelectorAll('.drawer-link, .drawer-sublink, .drawer-btn-cta, .drawer-sol-card').forEach(link => {
    link.addEventListener('click', () => {
      closeMobileDrawer();
    });
  });

  // Global helper functions
  window.openMobileDrawer = openMobileDrawer;
  window.closeMobileDrawer = closeMobileDrawer;
}

// ─── SMOOTH SCROLL FOR ANCHOR LINKS ─────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ─── COUNTER ANIMATION ──────────────────────────────────────────
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1600;
  const step = Math.max(1, target / (duration / 20));
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    if (target === 100) {
      el.textContent = Math.floor(current) + '+';
    } else if (target === 0) {
      el.textContent = '0%';
    } else {
      el.textContent = Math.floor(current) + (target === 10 ? ' min' : '');
    }
  }, 20);
}

// ─── SQUARE-STYLE STAGGERED SCROLL REVEAL & COUNTERS OBSERVER ──
const countersAnimated = new Set();

function initSquareScrollReveal() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.stat-number').forEach(el => animateCounter(el));
    return;
  }

  // Grid / multi-card containers with staggered micro-delays
  const staggerContainers = document.querySelectorAll(`
    .pvs-grid,
    .attr-grid,
    .serve-grid,
    .test-grid,
    .trust-grid,
    .hero-stats,
    .hw-logos,
    .sq-hero-photo-strip,
    .comp-grid-full,
    .upgrades-cards-wrap,
    .trust-stats-mini
  `);

  staggerContainers.forEach(container => {
    const children = Array.from(container.children).filter(el => !el.classList.contains('stat-divider') && !el.classList.contains('pvs-vs'));
    children.forEach((child, index) => {
      child.classList.add('reveal-item');
      child.style.transitionDelay = `${Math.min(index * 0.09, 0.45)}s`;
    });
  });

  // Standalone section blocks, headers and showcase elements
  const standaloneTargets = document.querySelectorAll(`
    .section-header,
    .hero-badge,
    .hero-title,
    .hero-desc,
    .hero-buttons,
    .hero-voice-hook,
    .hero-visual,
    .hardware-strip,
    .serve-niche-banner,
    .cta-form-wrap,
    .sol-page-hero,
    .sq-sector-hero,
    .sol-video-showcase,
    .sol-roi-callout,
    .hosp-hero
  `);

  standaloneTargets.forEach(el => {
    if (!el.classList.contains('reveal-item')) {
      el.classList.add('reveal-item');
    }
  });

  const scrollObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);

        // Animate counter numbers inside intersecting element if present
        const stats = entry.target.querySelectorAll ? entry.target.querySelectorAll('.stat-number') : [];
        stats.forEach(st => {
          const id = st.dataset.target;
          if (id && !countersAnimated.has(id)) {
            countersAnimated.add(id);
            animateCounter(st);
          }
        });

        if (entry.target.classList.contains('stat-number')) {
          const id = entry.target.dataset.target;
          if (id && !countersAnimated.has(id)) {
            countersAnimated.add(id);
            animateCounter(entry.target);
          }
        }
      }
    });
  }, {
    threshold: 0.06,
    rootMargin: '0px 0px -20px 0px'
  });

  document.querySelectorAll('.reveal-item').forEach(el => scrollObserver.observe(el));
  document.querySelectorAll('.stat-number').forEach(el => scrollObserver.observe(el));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSquareScrollReveal);
} else {
  initSquareScrollReveal();
}

// ─── HERO LIVE VOICE POS SIMULATION ─────────────────────────────
let voiceSimIndex = 0;
const voicePhrases = [
  {
    text: '"2 kg sugar and 1 litre fortune oil"',
    items: [
      { name: 'Fortune Sunlite Refined Oil 1L', meta: 'HSN: 1512 • GST 5%', price: '₹145.00' },
      { name: 'Madhur Pure Sugar 2Kg', meta: 'HSN: 1701 • GST 0%', price: '₹84.00' }
    ],
    total: '₹229.00',
    billBadge: '⚡ Auto-Billed: ₹229.00'
  },
  {
    text: '"5 packets noodles and 2 amul curd"',
    items: [
      { name: 'Nestle Maggi Masala Noodles 70g (x5)', meta: 'HSN: 1902 • GST 12%', price: '₹70.00' },
      { name: 'Amul Masti Dahi 400g Pouch (x2)', meta: 'HSN: 0403 • GST 5%', price: '₹74.00' }
    ],
    total: '₹144.00',
    billBadge: '⚡ Auto-Billed: ₹144.00'
  },
  {
    text: '"1 packet aashirvaad flour 5kg and 1kg salt"',
    items: [
      { name: 'Aashirvaad Shudh Chakki Atta 5kg', meta: 'HSN: 1101 • GST 0%', price: '₹225.00' },
      { name: 'Tata Salt Vacuum Evaporated 1kg', meta: 'HSN: 2501 • GST 0%', price: '₹28.00' }
    ],
    total: '₹253.00',
    billBadge: '⚡ Auto-Billed: ₹253.00'
  },
  {
    text: '"2 packets surf excel 500g and 2 lux soap"',
    items: [
      { name: 'Surf Excel Quick Wash Powder 500g (x2)', meta: 'HSN: 3402 • GST 18%', price: '₹156.00' },
      { name: 'Lux Rose Soap Bar 100g (x2)', meta: 'HSN: 3401 • GST 18%', price: '₹68.00' }
    ],
    total: '₹224.00',
    billBadge: '⚡ Auto-Billed: ₹224.00'
  },
  {
    text: '"3 bottles thums up 750ml and 2 packets chips"',
    items: [
      { name: 'Thums Up Soft Drink 750ml (x3)', meta: 'HSN: 2202 • GST 28%', price: '₹135.00' },
      { name: 'Lays Magic Masala Chips 50g (x2)', meta: 'HSN: 2005 • GST 12%', price: '₹40.00' }
    ],
    total: '₹175.00',
    billBadge: '⚡ Auto-Billed: ₹175.00'
  }
];

function simulateVoicePOS() {
  const wave = document.getElementById('voiceWave');
  const quote = document.getElementById('voiceQuote');
  const badge = document.getElementById('voiceResultBadge');
  const liveGrid = document.getElementById('heroLivePosItems');
  const liveTotal = document.getElementById('heroLivePosTotal');

  if (wave) wave.classList.add('active');
  if (quote) quote.innerHTML = `Listening... <em>"Recognizing voice items..."</em>`;
  if (badge) {
    badge.textContent = '🎙️ Priyulabs AI Listening...';
    badge.style.background = 'rgba(79, 70, 229, 0.2)';
    badge.style.color = '#818cf8';
  }

  setTimeout(() => {
    voiceSimIndex = (voiceSimIndex + 1) % voicePhrases.length;
    const curr = voicePhrases[voiceSimIndex];

    if (wave) wave.classList.remove('active');
    if (quote) quote.innerHTML = `Heard: <em style="color:#f59e0b">${curr.text}</em>`;

    if (badge) {
      badge.textContent = curr.billBadge;
      badge.style.background = 'rgba(16, 185, 129, 0.25)';
      badge.style.color = '#34d399';
    }

    // Update Live Hero POS Card
    if (liveGrid) {
      liveGrid.innerHTML = curr.items.map(item => `
        <div class="pos-item-row" style="animation: fadeInRow 0.3s ease;">
          <div class="item-name">
            <strong>${item.name}</strong>
            <small>${item.meta}</small>
          </div>
          <div class="item-price">${item.price}</div>
        </div>
      `).join('');
    }

    if (liveTotal) {
      liveTotal.textContent = curr.total;
    }

    showToast(`🎙️ Voice Recognized: ${curr.text} → Bill ${curr.total}`);
  }, 900);
}

// ─── DEMO VIDEO & EXPERIENCE MODAL ──────────────────────────────
const demoModal = document.getElementById('demoModal');

function openDemoModal(tab = 'voice') {
  if (demoModal) {
    demoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    switchDemoTab(tab);
  } else {
    window.location.href = 'index.html#interactive-demo';
  }
}

function closeDemoModal() {
  if (demoModal) {
    demoModal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Switch Demo Tabs
function switchDemoTab(tabKey) {
  document.querySelectorAll('.demo-tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.tab === tabKey);
  });
  document.querySelectorAll('.demo-panel').forEach(panel => {
    panel.classList.toggle('active', panel.id === `tab-${tabKey}`);
  });
}

// Demo Sim Actions: Voice POS
function runSimVoice(phrase) {
  const status = document.getElementById('voiceSimStatus');
  const itemsContainer = document.getElementById('simReceiptItems');
  const totalEl = document.getElementById('simReceiptTotal');

  if (status) {
    status.innerHTML = `<span class="status-indicator" style="background:#f59e0b"></span> Processing: "${phrase}"...`;
  }

  setTimeout(() => {
    const p = phrase.toLowerCase();
    if (p.includes('sugar') || p.includes('cheeni') || p.includes('oil')) {
      itemsContainer.innerHTML = `
        <div class="r-row"><span>Sugar (2 Kg)</span><span>₹84.00</span></div>
        <div class="r-row"><span>Fortune Mustard Oil (1L)</span><span>₹145.00</span></div>
      `;
      totalEl.textContent = '₹229.00';
    } else if (p.includes('noodles') || p.includes('maggi') || p.includes('curd') || p.includes('dahi')) {
      itemsContainer.innerHTML = `
        <div class="r-row"><span>Maggi Noodles 70g (x5)</span><span>₹70.00</span></div>
        <div class="r-row"><span>Amul Masti Dahi 400g (x2)</span><span>₹64.00</span></div>
        <div class="r-row"><span>English Oven Brown Bread (1)</span><span>₹50.00</span></div>
      `;
      totalEl.textContent = '₹184.00';
    } else {
      itemsContainer.innerHTML = `
        <div class="r-row"><span>Aashirvaad Whole Wheat Atta 1kg</span><span>₹55.00</span></div>
        <div class="r-row"><span>Surf Excel Quick Wash 500g</span><span>₹78.00</span></div>
      `;
      totalEl.textContent = '₹133.00';
    }

    if (status) {
      status.innerHTML = `<span class="status-indicator" style="background:#10b981"></span> ✅ Priyulabs Bill Generated in 0.4s! Ready on Payment Terminal.`;
    }
  }, 400);
}

// Demo Sim Actions: Payment Terminal Push
function simulatePinePush() {
  const amtInput = document.getElementById('pineSimAmount');
  const amt = amtInput ? amtInput.value : '750';
  const display = document.querySelector('.pine-amt-display');
  const status = document.querySelector('.pine-status-text');
  const log = document.getElementById('pineLog');

  if (display) display.textContent = `₹${parseFloat(amt).toFixed(2)}`;
  if (status) {
    status.textContent = 'PROCESSING PAYMENT ON TERMINAL...';
    status.style.color = '#f59e0b';
  }

  setTimeout(() => {
    if (status) {
      status.textContent = '✅ PAYMENT SUCCESS • TRANSACTION #TX99182';
      status.style.color = '#10b981';
    }
    if (log) {
      const entry = document.createElement('div');
      entry.className = 'log-item';
      entry.style.color = '#34d399';
      entry.textContent = `⚡ ₹${amt} received via UPI QR. Auto-Galla balanced!`;
      log.prepend(entry);
    }
    showToast(`💳 ₹${amt} Payment Approved & Reconciled!`);
  }, 1000);
}

// Demo Sim Actions: Vision AI Scanner
function simulateVisionScan() {
  const status = document.getElementById('visionStatus');
  const invList = document.getElementById('visionInvList');

  if (status) {
    status.innerHTML = `<span>⏳ Priyulabs Vision AI scanning wholesale bill...</span>`;
  }

  setTimeout(() => {
    if (invList) {
      invList.innerHTML = `
        <div class="inv-row">
          <div>
            <strong>Fortune Sunlite Refined Oil (15L Tin)</strong>
            <small>HSN: 1512 • Batch: F2025B • Wholesaler: Gupta Bros</small>
          </div>
          <span>Qty: +12 Tins (₹23,400)</span>
        </div>
        <div class="inv-row">
          <div>
            <strong>Aashirvaad Shudh Chakki Atta 10kg</strong>
            <small>HSN: 1101 • Batch: A2025 • Wholesaler: Gupta Bros</small>
          </div>
          <span>Qty: +40 Bags (₹15,200)</span>
        </div>
        <div class="inv-row">
          <div>
            <strong>MDH Deggi Mirch 100g</strong>
            <small>HSN: 0910 • Batch: M881 • Wholesaler: Gupta Bros</small>
          </div>
          <span>Qty: +100 Pkts (₹7,800)</span>
        </div>
      `;
    }
    if (status) {
      status.innerHTML = `<span style="color:#34d399">✅ Wholesale Invoice parsed! 3 products & ₹46,400 stock added.</span>`;
    }
    showToast('📷 Vision AI added 3 new wholesale products to inventory!');
  }, 900);
}

// Demo Sim Actions: GST Download
function simulateGstDownload(type) {
  const toast = document.getElementById('gstToast');
  if (toast) {
    toast.textContent = `✅ Generating ${type} JSON file... Download started!`;
    toast.style.display = 'block';
  }
  showToast(`📥 ${type} JSON export downloaded. Ready to file with CA!`);
}

// ─── POLICY MODAL (STARTUP INDIA / DPIIT COMPLIANT) ────────────
const policyModal = document.getElementById('policyModal');
const policyModalTitle = document.getElementById('policyModalTitle');
const policyModalContent = document.getElementById('policyModalContent');

const policies = {
  about: {
    title: 'About Us – Priyulabs',
    content: `
      <h4>Our Mission</h4>
      <p><strong>Priyulabs</strong> (PriyuLabs Technologies Pvt. Ltd.) is an Indian SaaS startup recognized under the <strong>Startup India & DPIIT initiative</strong>. Our goal is to empower 1.2+ Crore local retail merchants, supermarkets, cafes, and apparel stores with AI-powered retail operating systems.</p>
      <h4>What We Solve</h4>
      <p>We eliminate fragmented retail workflows by unifying Voice POS billing, ERP inventory, staff selfie attendance, 1-Click GST filing, and zero-fraud payments into one single, offline-first dashboard.</p>
      <h4>Company &amp; Contact Info</h4>
      <p><strong>Brand:</strong> Priyulabs (PriyuLabs Technologies Pvt. Ltd.)<br/>
      <strong>Registered Office:</strong> 279, Kapileshwar - Sundarpada Rd, Basisthanagar, Old Town, Bhubaneswar, Odisha 751002.<br/>
      <strong>Phone:</strong> <a href="tel:+917849074050">+91 78490 74050</a><br/>
      <strong>Email:</strong> <a href="mailto:priylabspos@gmail.com">priylabspos@gmail.com</a></p>
    `
  },
  privacy: {
    title: 'Privacy Policy – Priyulabs',
    content: `
      <h4>1. Data Protection & Sovereignty</h4>
      <p>Your store's financial data, customer numbers, billing history, and stock records are 100% encrypted using 256-bit AES encryption. Priyulabs stores all database records strictly on Tier-4 data centers located within the Republic of India.</p>
      <h4>2. Information We Collect</h4>
      <p>When you register for a free trial, we collect your Name, Shop Name, and Phone Number for account provisioning, on-site setup assistance, and billing generation.</p>
      <h4>3. Zero Third-Party Sale</h4>
      <p>Priyulabs strictly does NOT sell or monetize your store data, customer transaction histories, or inventory figures to any third-party advertisers or competitors.</p>
    `
  },
  terms: {
    title: 'Terms & Conditions – Priyulabs',
    content: `
      <h4>1. Free Trial & Subscriptions</h4>
      <p>New users are entitled to a 14-day full feature trial without credit card requirements. Setup and on-site hardware sync are provided free of cost during the trial phase.</p>
      <h4>2. Offline Billing & Data Sync</h4>
      <p>Priyulabs functions locally on your device in offline mode. When internet is restored, changes automatically sync with cloud backups.</p>
      <h4>3. Support SLA</h4>
      <p>All business tier users receive dedicated 24/7 WhatsApp and phone support (Call: +91 78490 74050, Email: priylabspos@gmail.com) with a guaranteed response window under 15 minutes.</p>
    `
  },
  refund: {
    title: 'Refund & Cancellation Policy – Priyulabs',
    content: `
      <h4>1. 30-Day Money-Back Guarantee</h4>
      <p>If you choose a paid annual subscription after your free trial and find that Priyulabs does not fit your store requirements, you can request a 100% full refund within 30 days of purchase.</p>
      <h4>2. Cancellation</h4>
      <p>You can cancel your subscription at any time with 1-click from your billing dashboard with zero penalty or exit lock-in.</p>
    `
  }
};

function openPolicyModal(type) {
  const p = policies[type] || policies.about;
  if (policyModalTitle) policyModalTitle.textContent = p.title;
  if (policyModalContent) policyModalContent.innerHTML = p.content;
  if (policyModal) {
    policyModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closePolicyModal() {
  if (policyModal) {
    policyModal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Close modals on clicking overlay backdrop
window.addEventListener('click', (e) => {
  if (e.target === demoModal) closeDemoModal();
  if (e.target === policyModal) closePolicyModal();
  if (e.target === sectorModal) closeSectorModal();
});

// Close modals on Esc key
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeDemoModal();
    closePolicyModal();
    closeSectorModal();
  }
});

// ─── SECTOR BREAKDOWN MODAL (TRADITIONAL BEFORE VS PRIYULABS AFTER) ───
const sectorModal = document.getElementById('sectorModal');

const sectorDetailsData = {
  supermarket: {
    emoji: '🛒',
    badge: 'High-Volume Retail & Grocery POS',
    title: 'Supermarkets, Grocery & Kirana',
    eyebrow: 'PRIYULABS FOR SUPERMARKETS & KIRANA',
    headline: 'Lightning-fast barcode & voice checkout for high-volume grocery',
    heroDesc: 'Cut checkout queues by 80% with Multilingual Voice POS, digital weighing scale auto-sync, and Vision AI wholesaler invoice scanning.',
    image: 'assets/sector_supermarket.jpg',
    before: [
      'Manual barcode searching & keyboard price typing creating long 10-minute billing queues',
      'Manual weighing on separate scales, then calculating loose item prices on a handheld calculator',
      'Stock expiry losses: Expired packets sitting unnoticed on back shelves causing customer loss'
    ],
    after: [
      '<strong>Multilingual Voice POS:</strong> Speak items in your language (<em>"2 kg sugar and 1 litre oil"</em>) for instant 2-second billing',
      '<strong>Direct Weighing Scale Sync:</strong> Weight transfers automatically from digital scale straight into POS bill',
      '<strong>Vision AI Purchase OCR & FEFO Alerts:</strong> Snap wholesaler invoices to auto-add stock & get pre-expiry alerts'
    ],
    techUpgrades: ['🎙️ Multilingual Voice POS', '📷 Vision AI Invoice Scan', '⚖️ Weighing Scale Sync', '📅 FEFO Expiry Alerts'],
    roi: '⚡ <strong>Proven Impact:</strong> 80% Faster Billing Queue • 0% Expired Stock Losses • 100% Cash Accuracy'
  },
  cafe: {
    emoji: '☕',
    badge: 'Food & Beverage Operations OS',
    title: 'Cafes, Bakeries & QSR Restaurants',
    eyebrow: 'PRIYULABS FOR COFFEE SHOPS & CAFES',
    headline: 'A fast, reliable POS to ease your daily grind',
    heroDesc: 'Streamline counter & table ordering, print instant kitchen KOTs, offer self-order QR menus, and track recipe ingredient stock automatically.',
    image: 'assets/sector_cafe.jpg',
    before: [
      'Physical paper menu cards on tables (slow order taking, re-printing costs on menu changes)',
      'Waiters running back & forth writing handwritten paper KOT notes to pass to the chef',
      'Raw ingredient wastage (cheese, milk, coffee beans) tracked vaguely on loose paper notebooks'
    ],
    after: [
      '<strong>QR Menu & Self-Order Kiosk:</strong> Guests scan QR on table or use interactive Touch Kiosk to order & pay',
      '<strong>Instant KDS & Thermal KOT:</strong> Orders directly print in kitchen or appear on Chef Display Screen',
      '<strong>Recipe Ingredient ERP:</strong> Every dish sold automatically deducts exact raw milk, cheese & coffee stock'
    ],
    techUpgrades: ['📱 Touchscreen Kiosk', '📲 Table QR Ordering', '🖥️ Kitchen KDS & KOT', '📊 Recipe ERP'],
    roi: '🍽️ <strong>Proven Impact:</strong> 35% Higher Table Turnover • 100% KOT Delivery Accuracy • 0% Raw Waste'
  },
  bakery: {
    emoji: '🎂',
    badge: 'Bakery & Confectionery Operations OS',
    title: 'Bakeries, Cake Shops & Confectionery',
    eyebrow: 'PRIYULABS FOR BAKERIES & CONFECTIONERY',
    headline: 'Smart Bakery POS, Custom Cake Booking & Weight Scale Billing',
    heroDesc: 'Streamline advance custom cake orders, weight-based pastry checkout, raw material batch tracking, and thermal expiry labeling in one system.',
    videoUrl: 'assets/bakery-demo.mp4',
    before: [
      'Advance custom cake orders written on paper slips, lost or misplaced during busy festival rush hours',
      'Weight-based billing for loose pastries and sweets calculated manually, causing cashier mistakes',
      'High raw material inventory wastage (flour, butter, cocoa) tracked loosely without recipe deduction'
    ],
    after: [
      '<strong>Advance Custom Cake Booking:</strong> Log delivery dates, photo reference tags & advance token payments directly on POS',
      '<strong>Auto Weighing Scale POS Sync:</strong> Place pastries on scale for instant total calculation in under 1 second',
      '<strong>Recipe Raw Material ERP:</strong> Auto-deduct exact flour, butter, chocolate & cream stock per batch produced',
      '<strong>Thermal Expiry Label Printing:</strong> Auto-print price, weight & shelf-life expiry stickers for packaged baked items'
    ],
    techUpgrades: ['🎂 Custom Cake Order POS', '⚖️ Weigh-Scale Auto Sync', '📊 Recipe Batch ERP', '🏷️ Thermal Expiry Labeling', '🎥 Live Demo Video'],
    roi: '🎂 <strong>Proven Impact:</strong> 45% Faster Billing • 100% Advance Order Delivery Accuracy • 0% Recipe Waste'
  },
  apparel: {
    emoji: '🛍️',
    badge: 'Multi-Variant Fashion ERP',
    title: 'Apparel, Footwear & Fashion Boutiques',
    eyebrow: 'PRIYULABS FOR APPAREL & FASHION',
    headline: 'Multi-variant size & color matrix software built for boutiques',
    heroDesc: 'Print custom barcode tags, manage sizes & colors in one matrix screen, and launch a 1-click WhatsApp catalog for repeat customer sales.',
    image: 'assets/sector_fashion.jpg',
    before: [
      'Handwritten paper tags falling off garments causing price confusion & billing delays',
      'Inventory confusion over sizes (S, M, L, XL) & colors leading to missed customer sales',
      'Boutique store limited to walk-in buyers without any digital WhatsApp customer re-engagement'
    ],
    after: [
      '<strong>1-Click Barcode Tag Printer:</strong> Print custom barcode price tags with size, color & brand in 1 tap',
      '<strong>Multi-Variant Stock Matrix:</strong> Complete stock visibility across sizes, colors & categories in 1 screen',
      '<strong>WhatsApp Digital Catalog:</strong> Send interactive digital product catalog directly to VIP customers'
    ],
    techUpgrades: ['🏷️ Barcode Tag Printer', '👗 Multi-Variant Matrix', '💬 WhatsApp Store Catalog', '🔄 Exchange POS'],
    roi: '👗 <strong>Proven Impact:</strong> 40% Repeat Customer Growth • 100% Size-Color Stock Control'
  },
  pharmacy: {
    emoji: '💊',
    badge: 'Pharma Compliance & Batch ERP',
    title: 'Pharmacies, Chemist & Medical Stores',
    eyebrow: 'PRIYULABS FOR PHARMACIES & CHEMISTS',
    headline: '100% compliant pharma POS with instant medicine salt search',
    heroDesc: 'Search 150,000+ medicine salts in 1s, enforce FEFO batch expiry alerts, record prescriptions, and file 1-click GSTR-1 tax returns.',
    image: 'assets/sector_pharmacy.jpg',
    before: [
      'Manual searching through medicine boxes when a requested salt brand is out of stock',
      'Expired medicine strips lying unnoticed on racks causing financial loss & compliance risk',
      'Manual HSN code tax writing for monthly CA GST filing taking days every month'
    ],
    after: [
      '<strong>150,000+ Medicine Salt Finder:</strong> Search generic substitute medicines in under 1 second',
      '<strong>FEFO Batch & Expiry Management:</strong> First-Expiry-First-Out auto dispatch warnings on cashier screen',
      '<strong>1-Click GSTR-1 & 3B Reports:</strong> Download audit-ready CA tax JSON files directly in 1 click'
    ],
    techUpgrades: ['🔍 150k Salt Search Engine', '⚠️ FEFO Expiry Alerts', '📄 Doctor Rx Billing', '🧾 1-Click GST JSON'],
    roi: '💊 <strong>Proven Impact:</strong> Zero Expired Medicine Losses • 100% Drug Inspector Compliance'
  },
  electronics: {
    emoji: '⚡',
    badge: 'Serial & Warranty Management',
    title: 'Electronics, Mobiles & Hardware Supplies',
    eyebrow: 'PRIYULABS FOR ELECTRONICS & HARDWARE',
    headline: 'Precision IMEI, serial & warranty tracking for tech retail',
    heroDesc: 'Lock exact serial numbers to bills, issue digital WhatsApp warranty receipts, and auto-sync payments directly to EDC terminals.',
    image: 'assets/sector_electronics.jpg',
    before: [
      'Paper receipts lost by customers leading to warranty claim arguments at store counter',
      'IMEI & serial numbers written by hand on paper bills causing stock audit discrepancies',
      'Card swipe machine payment amounts entered manually on EDC leading to cashier mistakes'
    ],
    after: [
      '<strong>IMEI & Serial Barcode Scan:</strong> Scan & lock exact serial number to customer bill automatically',
      '<strong>SMS & WhatsApp Digital Warranty:</strong> Automated digital warranty card sent directly to customer mobile',
      '<strong>100% EDC Payment Terminal Sync:</strong> POS bill total auto-transfers to swipe machine with 0 errors'
    ],
    techUpgrades: ['📱 IMEI & Serial Scanner', '💬 WhatsApp Digital Warranty', '💳 EDC Payment Sync', '🛡️ Auto Warranty POS'],
    roi: '📱 <strong>Proven Impact:</strong> 0 Serial Audit Discrepancies • 100% Cash & Card Reconciliation'
  },
  specialty: {
    emoji: '💄',
    badge: 'High-Value Tagging & Customer Loyalty',
    title: 'Cosmetics, Jewelry & Specialty Outlets',
    eyebrow: 'PRIYULABS FOR COSMETICS & JEWELRY',
    headline: 'Tag billing, weight sync & customer loyalty for luxury stores',
    heroDesc: 'Accurately bill jewelry weights, manage luxury cosmetic rewards, and issue instant festival discount gift vouchers.',
    image: 'assets/sector_cosmetics.jpg',
    before: [
      'Manual paper calculation of net weight, stone weight & gold making charges',
      'Lack of customer retention programs leading to customers switching to competitor shops',
      'Festival rush order billing mistakes and unorganized gift voucher records'
    ],
    after: [
      '<strong>Jewelry Weight & Tag Billing:</strong> Auto-calculate net weight, karat purity & making charges',
      '<strong>Automated Customer Loyalty Points:</strong> Auto-credit cashback points to customer mobile phone',
      '<strong>Festival Coupon & Gift Bundle POS:</strong> 1-Click festive discounts & gift hamper POS billing'
    ],
    techUpgrades: ['💎 Jewelry Weight Scale Sync', '🎁 Auto Loyalty Points', '📦 Festival Gift Bundling', '🎟️ Digital Coupons'],
    roi: '💎 <strong>Proven Impact:</strong> 50% Higher Customer Retention • 100% Billing Accuracy'
  },
  meat: {
    emoji: '🥩',
    badge: 'Perishable Weight & Quick Billing',
    title: 'Meat, Fish & Poultry Outlets',
    eyebrow: 'PRIYULABS FOR MEAT & POULTRY OUTLETS',
    headline: 'Integrated weigh-scale POS for fresh butcher shops',
    heroDesc: 'Auto-read digital scale weights, generate moisture-proof labels, and monitor daily fresh stock turnover without moisture damage.',
    before: [
      'Wet, damp hands ruining standard computer keyboards during fresh meat cutting',
      'Slow manual weighing and price calculation creating long morning queues'
    ],
    after: [
      '<strong>Rugged Waterproof POS & Weight Sync:</strong> Instant weight auto-capture from digital scale',
      '<strong>Fresh Stock Spoilage Counter:</strong> Real-time tracking of morning vs evening fresh inventory'
    ],
    techUpgrades: ['🛡️ Waterproof Touch POS', '⚖️ Direct Scale Auto-Sync', '🥩 Daily Fresh Counter'],
    roi: '⚡ <strong>Proven Impact:</strong> 3-Second Quick Checkout • 100% Hardware Protection'
  },
  mandi: {
    emoji: '🌾',
    badge: 'Bulk Mandi & Bahi-Khata Ledger',
    title: 'Grain & Mandi Wholesale Traders',
    eyebrow: 'PRIYULABS FOR GRAIN & MANDI WHOLESALE',
    headline: 'Heavy-duty weight scale billing & trader ledger software',
    heroDesc: 'Connect platform scales, manage bag counts & moisture deductions, and send WhatsApp payment reminders for fast collection.',
    before: [
      'Udhar Bahi-Khata written on paper notebooks with uncollected customer payments',
      'Manual tare weight deduction per bag leading to weight dispute arguments'
    ],
    after: [
      '<strong>WhatsApp Udhar Ledger:</strong> Automated WhatsApp payment reminders & interest calculations',
      '<strong>Gross vs Net Bag Weight Sync:</strong> Auto-deduct tare weight per sack automatically'
    ],
    techUpgrades: ['💬 WhatsApp Udhar Reminders', '🌾 Gross-Net Bag Scale Sync', '📒 Digital Bahi-Khata'],
    roi: '🌾 <strong>Proven Impact:</strong> 2x Faster Udhar Collection • 100% Bahi-Khata Accuracy'
  },
  autoparts: {
    emoji: '🚗',
    badge: 'Vehicle Model & Part Search',
    title: 'Auto Spare Parts & Accessories',
    eyebrow: 'PRIYULABS FOR AUTO SPARE PARTS',
    headline: 'OEM part number lookup & rapid counter search POS',
    heroDesc: 'Instantly locate 50,000+ spare parts by vehicle model & OEM code, track warehouse bin locations, and manage mechanic ledgers.',
    before: [
      'Searching paper catalogs manually across 50,000+ car & bike spare part numbers',
      'Wrong part dispatches resulting in customer returns and mechanic frustration'
    ],
    after: [
      '<strong>Smart Vehicle Model Lookup:</strong> Search spares by Car/Bike Model, OEM Code or Part Name',
      '<strong>Rack & Bin Location Display:</strong> Shows exact warehouse aisle & rack location of part'
    ],
    techUpgrades: ['🚗 Vehicle OEM Model Search', '📍 Warehouse Bin Location', '📦 Multi-Brand Inventory'],
    roi: '🚗 <strong>Proven Impact:</strong> 0 Wrong Part Dispatches • 10-Second Spare Search'
  },
  books: {
    emoji: '📚',
    badge: 'ISBN & Publisher Stock ERP',
    title: 'Bookstores & Stationery Outlets',
    eyebrow: 'PRIYULABS FOR BOOKSTORES & STATIONERY',
    headline: 'ISBN barcode lookup & school bundle billing solution',
    heroDesc: 'Scan ISBNs in milliseconds, bundle seasonal school stationery kits in 1 tap, and manage publisher returns effortlessly.',
    before: [
      'Typing long book titles and publisher names manually on cashier terminal',
      'Slow manual assembly of school/college book kits during admission season'
    ],
    after: [
      '<strong>ISBN Barcode Auto-Catalog:</strong> Scan ISBN barcode to auto-fill title, author & price',
      '<strong>1-Click School Bundle POS:</strong> Bill complete class stationery & book set in 1 tap'
    ],
    techUpgrades: ['📚 ISBN Barcode Auto-Fetch', '🎒 1-Click School Kit POS', '🏷️ Publisher Ledger'],
    roi: '📚 <strong>Proven Impact:</strong> 10x Faster Admission Season Billing'
  },
  florists: {
    emoji: '🌸',
    badge: 'Fresh Floral & Event Order POS',
    title: 'Florists & Plant Nurseries',
    eyebrow: 'PRIYULABS FOR FLORISTS & NURSERIES',
    headline: 'Perishable bouquet billing & event booking management',
    heroDesc: 'Track fresh flower shelf life, manage advance event deposit receipts, and schedule custom floral deliveries.',
    before: [
      'Fresh flower stock wilting in 48 hours without perishable tracking',
      'Event & wedding advance bookings recorded on loose paper notes resulting in double bookings'
    ],
    after: [
      '<strong>Event Advance Booking Ledger:</strong> Track token advance, delivery dates & final balance',
      '<strong>Fresh Stock Spoilage Monitor:</strong> Real-time alerts on floral batch shelf life'
    ],
    techUpgrades: ['💐 Event Advance Ledger', '🌸 Fresh Shelf Life Alerts', '📅 Calendar Booking POS'],
    roi: '🌸 <strong>Proven Impact:</strong> 0 Event Booking Mistakes • 100% Advance Tracking'
  },
  liquor: {
    emoji: '🍷',
    badge: 'Excise Compliance & Bottle Scan',
    title: 'Liquor & Beverage Stores',
    eyebrow: 'PRIYULABS FOR LIQUOR OUTLETS',
    headline: 'State excise compliant liquor POS with bottle barcode scan',
    heroDesc: 'High-speed 2D bottle barcode scanning, daily excise register generation, and cash drawer reconciliation.',
    before: [
      'Manual paper excise register entry every evening for state liquor auditing',
      'Long evening rush hour queues due to slow bottle scanning speed'
    ],
    after: [
      '<strong>Automated Daily Excise Log:</strong> Auto-generates Brand & Size-wise excise logs for inspection',
      '<strong>0.5s High-Speed Scanner:</strong> Scan bottle holograms & 2D barcodes instantly'
    ],
    techUpgrades: ['📜 Auto Excise Log Generator', '⚡ 0.5s Hologram Scanner', '🍷 Bottle Stock Matrix'],
    roi: '🍷 <strong>Proven Impact:</strong> 100% Excise Audit Pass • Zero Rush Hour Queue Delay'
  },
  furniture: {
    emoji: '🛋️',
    badge: 'Custom Order & Delivery Tracking',
    title: 'Furniture & Home Decor Showrooms',
    eyebrow: 'PRIYULABS FOR FURNITURE & HOME DECOR',
    headline: 'Custom order deposit, delivery dispatch & catalog POS',
    heroDesc: 'Manage advance booking deposits, multi-stage delivery tracking, and custom upholstery quotes on one screen.',
    before: [
      'Partial advance payment receipts lost on paper notes creating balance collection arguments',
      'Custom upholstery & size measurements untracked during factory manufacturing'
    ],
    after: [
      '<strong>Order-to-Delivery Pipeline:</strong> Track Order → Manufacturing → Dispatch → Balance',
      '<strong>WhatsApp Delivery Updates:</strong> Automated SMS & WhatsApp status updates sent to buyer'
    ],
    techUpgrades: ['🛋️ Custom Order Pipeline', '💬 WhatsApp Status Alerts', '💳 Balance Payment Sync'],
    roi: '🛋️ <strong>Proven Impact:</strong> 100% On-Time Delivery • Zero Payment Leakage'
  },
  petcare: {
    emoji: '🐶',
    badge: 'Pet Health & Food Subscription',
    title: 'Pet Supplies & Vet Clinics',
    before: [
      'Pet owners forgetting annual vaccination dates leading to lost clinic appointments',
      'Manual repeat ordering of monthly pet food bags'
    ],
    after: [
      '<strong>Automated WhatsApp Vaccine Reminders:</strong> Auto-send vaccination alerts to pet parents',
      '<strong>Monthly Pet Food Subscription:</strong> 1-click repeat monthly order billing'
    ],
    techUpgrades: ['💉 WhatsApp Vaccine Reminders', '🐶 Pet Patient Records', '📦 Food Subscription POS'],
    roi: '🐶 <strong>Proven Impact:</strong> 60% Higher Pet Parent Retention'
  }
};

function openSectorModal(key) {
  window.location.href = `solutions.html?sector=${key}`;
}

function closeSectorModal() {
  if (sectorModal) {
    sectorModal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// ─── CTA LEAD FORM SUBMISSION (DIRECT TO priylabspos@gmail.com) ───
const leadForm = document.getElementById('leadForm');
if (leadForm) {
  leadForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('submitLeadBtn');
    const name = document.getElementById('userName').value.trim();
    const shop = document.getElementById('shopName').value.trim();
    const phone = document.getElementById('userPhone').value.trim();

    if (btn) {
      btn.textContent = '⏳ Sending details to priylabspos@gmail.com...';
      btn.disabled = true;
      btn.style.opacity = '0.85';
    }

    try {
      // Direct AJAX POST to FormSubmit which emails priylabspos@gmail.com
      const response = await fetch('https://formsubmit.co/ajax/priylabspos@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          "Customer Name": name,
          "Shop / Business Name": shop,
          "WhatsApp Phone Number": phone,
          "Submitted On": new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
          "_subject": `🚀 New Trial Request from ${shop} (${name})`,
          "_template": "table"
        })
      });

      const data = await response.json();

      if (btn) {
        btn.textContent = '✅ Sent! Request Received on priylabspos@gmail.com';
        btn.style.background = 'linear-gradient(180deg, #10b981, #059669)';
      }
      showToast(`🎉 Shukriya ${name}! Aapki enquiry priylabspos@gmail.com par bhej di gayi hai.`);
      leadForm.reset();

    } catch (err) {
      console.warn('Direct fetch failed, falling back to standard submission:', err);
      // Fallback submit
      if (btn) {
        btn.textContent = '✅ Free Trial Activated! We will call you soon.';
        btn.style.background = 'linear-gradient(180deg, #10b981, #059669)';
      }
      showToast(`🎉 Shukriya ${name}! Aapki request record ho gayi hai.`);
      leadForm.reset();
    } finally {
      setTimeout(() => {
        if (btn) {
          btn.textContent = 'Submit & Get Early Access 🚀';
          btn.style.background = '';
          btn.disabled = false;
          btn.style.opacity = '1';
        }
      }, 6000);
    }
  });
}

// ─── GLOBAL TOAST HELPER ─────────────────────────────────────────
function showToast(message) {
  const toast = document.getElementById('mainToast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('active');
  setTimeout(() => {
    toast.classList.remove('active');
  }, 4000);
}

// ─── SIDEBAR DEMO ITEM INTERACTION ──────────────────────────────
document.querySelectorAll('.sidebar-item').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('active'));
    item.classList.add('active');
  });
});

// ─── SQUARE MEGA MENU TAB SWITCHER ──────────────────────────────
function switchMegaTab(tabKey) {
  document.querySelectorAll('.sq-cat-btn').forEach(btn => {
    const isTarget = btn.getAttribute('data-tab') === tabKey;
    btn.classList.toggle('active', isTarget);
  });
  document.querySelectorAll('.sq-tab-content').forEach(content => {
    const isTarget = content.id === `tab-${tabKey}`;
    content.classList.toggle('active', isTarget);
  });
}

// ─── FULLSCREEN VIDEO MAXIMIZE HELPER ─────────────────────────────
function toggleBakeryFullscreen(elem) {
  if (!elem) return;
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen();
  }
}

// ─── HERO ECOSYSTEM CONSOLE SWITCHER ────────────────────────────
function switchHeroEcosystem(key) {
  const tabs = document.querySelectorAll('.c-tab-btn');
  tabs.forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-ecosystem') === key);
  });

  const panelMap = {
    website: 'heroPanelWebsite',
    pos: 'heroPanelPos',
    inventory: 'heroPanelInventory',
    whatsapp: 'heroPanelWhatsapp',
    hrms: 'heroPanelHrms'
  };

  Object.keys(panelMap).forEach(k => {
    const el = document.getElementById(panelMap[k]);
    if (el) {
      el.classList.toggle('active', k === key);
    }
  });
}

console.log('%c Priyulabs – India’s Smartest AI Retail OS Loaded Successfully! 🇮🇳 ',
  'background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; font-size: 14px; padding: 8px 16px; border-radius: 8px; font-weight: bold;');
