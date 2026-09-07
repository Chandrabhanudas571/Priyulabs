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
let isTicking = false;

window.addEventListener('scroll', () => {
  if (!isTicking) {
    window.requestAnimationFrame(() => {
      if (navbar) {
        if (window.scrollY > 40) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }
      isTicking = false;
    });
    isTicking = true;
  }
}, { passive: true });

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
  const suffix = el.dataset.suffix !== undefined ? el.dataset.suffix : (target === 100 ? '+' : (target === 10 ? ' min' : (target === 0 ? '%' : '')));
  const duration = 1600;
  const step = Math.max(1, target / (duration / 20));
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current) + suffix;
  }, 20);
}

// ─── SQUARE-STYLE STAGGERED SCROLL REVEAL & COUNTERS OBSERVER ──
function initSquareScrollReveal() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.stat-number').forEach(el => {
      if (!el.classList.contains('counted')) {
        el.classList.add('counted');
        animateCounter(el);
      }
    });
    return;
  }

  // Grid / multi-card containers with staggered micro-delays
  const staggerContainers = document.querySelectorAll(`
    .pvs-grid,
    .trust-grid,
    .hero-stats,
    .hero-service-badges,
    .comp-grid-full,
    .upgrades-cards-wrap,
    .trust-stats-mini
  `);

  staggerContainers.forEach(container => {
    const children = Array.from(container.children).filter(el => !el.classList.contains('stat-divider') && !el.classList.contains('pvs-vs'));
    children.forEach((child, index) => {
      child.classList.add('reveal-item');
      child.style.transitionDelay = `${Math.min(index * 0.07, 0.42)}s`;
    });
  });

  // Standalone section blocks, headers and showcase elements
  const standaloneTargets = document.querySelectorAll(`
    .section-header,
    .hero-badge,
    .hero-title,
    .hero-desc,
    .hero-buttons,
    .hero-service-badges,
    .hero-spotlight-card,
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
          if (!st.classList.contains('counted')) {
            st.classList.add('counted');
            animateCounter(st);
          }
        });

        if (entry.target.classList.contains('stat-number') && !entry.target.classList.contains('counted')) {
          entry.target.classList.add('counted');
          animateCounter(entry.target);
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

// ─── HERO SPOTLIGHT TICKER ─────────────────────────────────────────
let spotlightIdx = 0;
let spotlightTimer = null;

function setSpotlightIndex(idx) {
  const items = document.querySelectorAll('#heroSpotlightTicker .ticker-item');
  const dots = document.querySelectorAll('#spotlightDots .s-dot');
  if (!items.length) return;
  spotlightIdx = (idx + items.length) % items.length;
  items.forEach((item, i) => {
    item.classList.toggle('active', i === spotlightIdx);
  });
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === spotlightIdx);
  });
}

function initHeroSpotlight() {
  const ticker = document.getElementById('heroSpotlightTicker');
  if (!ticker) return;
  if (spotlightTimer) clearInterval(spotlightTimer);
  spotlightTimer = setInterval(() => {
    const items = document.querySelectorAll('#heroSpotlightTicker .ticker-item');
    if (items.length > 0) {
      setSpotlightIndex((spotlightIdx + 1) % items.length);
    }
  }, 4200);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initSquareScrollReveal();
    initHeroSpotlight();
  });
} else {
  initSquareScrollReveal();
  initHeroSpotlight();
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

// ─── PRIYULABS INTERACTIVE 6-SERVICE DEMO PLAYGROUND ENGINE ────
const demoModal = document.getElementById('demoModal');

function openDemoModal(tab = 'pos') {
  if (demoModal) {
    demoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    switchDemoTab(tab);
    initDemoPlaygrounds();
  } else {
    window.location.href = 'index.html#demoModal';
  }
}

function closeDemoModal() {
  if (demoModal) {
    demoModal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Switch Demo Tabs across all 6 services
function switchDemoTab(tabKey) {
  const aliasMap = {
    'voice': 'pos',
    'payments': 'pos',
    'vision': 'erp',
    'superapp': 'erp',
    'gst': 'bundle'
  };
  const targetTab = aliasMap[tabKey] || tabKey;

  document.querySelectorAll('.demo-tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.tab === targetTab);
  });
  document.querySelectorAll('.demo-panel').forEach(panel => {
    panel.classList.toggle('active', panel.id === `tab-${targetTab}`);
  });
}

// ─── TAB 1: SMART POS BILLING ENGINE ───────────────────────────
const posProducts = [
  { id: 'p1', name: 'Caramel Cold Frappe', price: 140, cat: 'cafe', emoji: '☕', tax: 0.05 },
  { id: 'p2', name: 'Veg Supreme Burger', price: 160, cat: 'cafe', emoji: '🍔', tax: 0.05 },
  { id: 'p3', name: 'Farmhouse Pizza 8"', price: 280, cat: 'cafe', emoji: '🍕', tax: 0.05 },
  { id: 'p4', name: 'Fortune Mustard Oil 1L', price: 145, cat: 'grocery', emoji: '🧴', tax: 0.05 },
  { id: 'p5', name: 'Basmati Rice Royal 5kg', price: 420, cat: 'grocery', emoji: '🌾', tax: 0.05 },
  { id: 'p6', name: 'Maggi Noodles 4-Pack', price: 60, cat: 'grocery', emoji: '🍜', tax: 0.05 },
  { id: 'p7', name: 'Cotton Casual Shirt (M)', price: 799, cat: 'fashion', emoji: '👔', tax: 0.12 },
  { id: 'p8', name: 'Designer Silk Saree', price: 1499, cat: 'fashion', emoji: '👗', tax: 0.12 }
];

let posCart = [
  { id: 'p2', name: 'Veg Supreme Burger', price: 160, emoji: '🍔', qty: 2, tax: 0.05 },
  { id: 'p1', name: 'Caramel Cold Frappe', price: 140, emoji: '☕', qty: 1, tax: 0.05 }
];

function filterPosProducts(cat, btnEl) {
  if (btnEl) {
    document.querySelectorAll('.pos-cat-btn').forEach(b => b.classList.remove('active'));
    btnEl.classList.add('active');
  }
  renderPosProducts(cat);
}

function renderPosProducts(filterCat = 'all') {
  const grid = document.getElementById('posProductGrid');
  if (!grid) return;
  const filtered = filterCat === 'all' ? posProducts : posProducts.filter(p => p.cat === filterCat);
  grid.innerHTML = filtered.map(p => `
    <div class="pos-item-card" onclick="addPosToCart('${p.id}')">
      <div class="pic-emoji">${p.emoji}</div>
      <div class="pic-info">
        <strong>${p.name}</strong>
        <small>₹${p.price}</small>
      </div>
      <button class="pic-add-btn">+ Add</button>
    </div>
  `).join('');
}

function addPosToCart(productId) {
  const prod = posProducts.find(p => p.id === productId);
  if (!prod) return;
  const existing = posCart.find(item => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    posCart.push({ ...prod, qty: 1 });
  }
  renderPosCart();
  showToast(`⚡ Added ${prod.name} to POS bill!`);
}

function updatePosQty(productId, delta) {
  const item = posCart.find(i => i.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    posCart = posCart.filter(i => i.id !== productId);
  }
  renderPosCart();
}

function removePosItem(productId) {
  posCart = posCart.filter(i => i.id !== productId);
  renderPosCart();
}

function clearPosCart() {
  posCart = [];
  renderPosCart();
  showToast('🗑️ Cart cleared.');
}

function renderPosCart() {
  const list = document.getElementById('posCartList');
  const subtotalEl = document.getElementById('posSubtotal');
  const taxEl = document.getElementById('posTax');
  const totalEl = document.getElementById('posGrandTotal');
  const successBox = document.getElementById('posPaySuccess');

  if (successBox) successBox.style.display = 'none';

  if (!list) return;

  if (posCart.length === 0) {
    list.innerHTML = `<div class="pos-empty-cart">🛒 Cart is empty. Click any product on left to start billing.</div>`;
    if (subtotalEl) subtotalEl.textContent = '₹0.00';
    if (taxEl) taxEl.textContent = '₹0.00';
    if (totalEl) totalEl.textContent = '₹0.00';
    return;
  }

  let subtotal = 0;
  let tax = 0;

  list.innerHTML = posCart.map(item => {
    const itemSub = item.price * item.qty;
    const itemTax = itemSub * (item.tax || 0.05);
    subtotal += itemSub;
    tax += itemTax;

    return `
      <div class="pos-cart-row">
        <div class="pcr-left">
          <span class="pcr-emoji">${item.emoji}</span>
          <div>
            <strong>${item.name}</strong>
            <small>₹${item.price} each</small>
          </div>
        </div>
        <div class="pcr-right">
          <div class="pcr-qty-ctrl">
            <button onclick="updatePosQty('${item.id}', -1)">−</button>
            <span>${item.qty}</span>
            <button onclick="updatePosQty('${item.id}', 1)">+</button>
          </div>
          <strong class="pcr-price">₹${itemSub.toFixed(2)}</strong>
          <button class="pcr-del" onclick="removePosItem('${item.id}')" title="Remove">×</button>
        </div>
      </div>
    `;
  }).join('');

  const grandTotal = subtotal + tax;
  if (subtotalEl) subtotalEl.textContent = `₹${subtotal.toFixed(2)}`;
  if (taxEl) taxEl.textContent = `₹${tax.toFixed(2)}`;
  if (totalEl) totalEl.textContent = `₹${grandTotal.toFixed(2)}`;
}

function runPosVoicePreset(phrase) {
  showToast(`🎙️ Voice parsing: "${phrase}"`);
  const status = document.getElementById('posStatusBar');
  if (status) {
    status.innerHTML = `<span class="status-indicator" style="background:#f59e0b"></span> 🗣️ AI Parsing: "${phrase}"...`;
  }
  setTimeout(() => {
    if (phrase.includes('burger')) {
      addPosToCart('p2');
      addPosToCart('p1');
    } else {
      addPosToCart('p5');
      addPosToCart('p4');
    }
    if (status) {
      status.innerHTML = `<span class="status-indicator" style="background:#10b981"></span> ✅ AI Voice Bill Generated in 0.3s!`;
    }
  }, 400);
}

function simulateBarcodeScan() {
  const randomProduct = posProducts[Math.floor(Math.random() * posProducts.length)];
  addPosToCart(randomProduct.id);
  showToast(`📷 Barcode Scanned (EAN-890123): Added ${randomProduct.name}!`);
}

function executePosPayment() {
  if (posCart.length === 0) {
    showToast('⚠️ Please add at least one item to cart first.');
    return;
  }
  const totalEl = document.getElementById('posGrandTotal');
  const paidAmt = document.getElementById('posPaidAmt');
  const successBox = document.getElementById('posPaySuccess');
  const payBtn = document.getElementById('btnPosPay');

  if (payBtn) payBtn.textContent = '⏳ Transmitting to Payment Terminal...';

  setTimeout(() => {
    if (paidAmt && totalEl) paidAmt.textContent = totalEl.textContent.replace('₹', '');
    if (successBox) successBox.style.display = 'block';
    if (payBtn) payBtn.textContent = '💳 Pay via UPI QR / Pine Labs ⚡';
    showToast(`✅ Payment Approved! Invoice #PR-${Math.floor(1000 + Math.random() * 9000)} generated.`);
  }, 600);
}

function printPosInvoice() {
  showToast('🖨️ Thermal Print signal sent (2-inch ESC/POS). Receipt Printed!');
}

function resetPosCart() {
  posCart = [];
  renderPosCart();
  showToast('✨ POS ready for new customer checkout.');
}

// ─── TAB 2: ERP & STAFF HRMS ENGINE ────────────────────────────
let erpStockData = [
  { id: 's1', name: 'Fortune Sunlite Refined Oil 1L', stock: 48, min: 10, status: 'In Stock' },
  { id: 's2', name: 'Aashirvaad Chakki Atta 10kg', stock: 18, min: 8, status: 'In Stock' },
  { id: 's3', name: 'Tata Tea Gold 500g', stock: 4, min: 6, status: 'Low Stock' },
  { id: 's4', name: 'Dove Daily Shine Shampoo 180ml', stock: 3, min: 5, status: 'Low Stock' },
  { id: 's5', name: 'Cadbury Dairy Milk Silk 60g', stock: 32, min: 12, status: 'In Stock' }
];

function renderErpStock() {
  const tbody = document.getElementById('erpStockRows');
  if (!tbody) return;
  tbody.innerHTML = erpStockData.map(item => {
    const isLow = item.stock <= item.min;
    return `
      <tr>
        <td><strong>${item.name}</strong></td>
        <td><span class="stock-qty-badge ${isLow ? 'low' : ''}">${item.stock} Units</span></td>
        <td>
          <span class="status-pill ${isLow ? 'pill-warning' : 'pill-success'}">
            ${isLow ? '⚠️ Low Stock Alert' : '✅ Healthy'}
          </span>
        </td>
        <td>
          <button class="btn-restock" onclick="reorderErpItem('${item.id}')">
            ${isLow ? '⚡ Quick Reorder' : '+ Add Stock'}
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

function simulateErpScanInvoice() {
  const toast = document.getElementById('erpToastMsg');
  if (toast) {
    toast.innerHTML = `<span>⏳ Priyulabs Vision AI scanning wholesale tax invoice...</span>`;
  }
  setTimeout(() => {
    erpStockData.forEach(item => {
      item.stock += 25;
      item.status = 'In Stock';
    });
    renderErpStock();
    if (toast) {
      toast.innerHTML = `<span style="color:#059669">✅ Wholesale Invoice parsed! 5 SKUs updated with +125 units added to cloud ERP.</span>`;
    }
    showToast('📷 Vision AI OCR auto-logged 5 invoice items into ERP!');
  }, 700);
}

function simulateErpSale() {
  erpStockData.forEach(item => {
    item.stock = Math.max(1, item.stock - Math.floor(Math.random() * 8 + 4));
  });
  renderErpStock();
  showToast('📉 High-volume sale simulated! Low stock alerts triggered.');
}

function reorderErpItem(id) {
  const item = erpStockData.find(s => s.id === id);
  if (!item) return;
  item.stock += 30;
  renderErpStock();
  showToast(`📦 Restocked +30 units of ${item.name}! Purchase order auto-sent.`);
}

function simulateHrmsCheckIn() {
  const camStatus = document.getElementById('hrmsCamStatus');
  const camBox = document.getElementById('hrmsCamBox');
  if (camBox) camBox.classList.add('scanning');
  if (camStatus) camStatus.innerHTML = `<span>🔍 Scanning Face & GPS Location (Store #104)...</span>`;

  setTimeout(() => {
    if (camBox) {
      camBox.classList.remove('scanning');
      camBox.classList.add('verified');
    }
    if (camStatus) {
      camStatus.innerHTML = `<span style="color:#10b981;font-weight:700;">✅ Rahul Sharma Clocked In at 09:02 AM • Geofence Match (0.01m)</span>`;
    }
    showToast('🤳 Facial Biometric Attendance verified! Auto-logged into Payroll.');
  }, 800);
}

// ─── TAB 3: CUSTOM WEBSITE & STOREFRONT ENGINE ──────────────────
const wsIndustryTemplates = {
  restaurant: {
    headline: 'Fresh Artisanal Meals Delivered To Your Door',
    sub: 'Order directly & get 20% flat discount on all combos today!',
    catalog: [
      { name: 'Gourmet Truffle Burger', price: '₹249', img: '🍔' },
      { name: 'Wood-Fired Margherita', price: '₹349', img: '🍕' },
      { name: 'Iced Hazelnut Latte', price: '₹179', img: '☕' }
    ]
  },
  fashion: {
    headline: 'Contemporary Indian & Western Couture Collection',
    sub: 'Shop trendy fashion with same-day local delivery & easy exchange.',
    catalog: [
      { name: 'Pure Linen Floral Kurti', price: '₹1,299', img: '👗' },
      { name: 'Slim Fit Cotton Blazer', price: '₹2,499', img: '🧥' },
      { name: 'Handcrafted Leather Tote', price: '₹1,899', img: '👜' }
    ]
  },
  grocery: {
    headline: 'Fresh Farm Groceries & Supermarket Essentials',
    sub: 'Order in 30 seconds on WhatsApp with free home delivery.',
    catalog: [
      { name: 'Organic Cold-Pressed Oil', price: '₹280', img: '🧴' },
      { name: 'Himalayan Organic Ghee', price: '₹650', img: '🧈' },
      { name: 'Dry Fruits Festive Pack', price: '₹890', img: '🥜' }
    ]
  },
  clinic: {
    headline: 'Specialized Healthcare & Instant Doctor Appointments',
    sub: 'Book clinic visits & order prescription medicines online.',
    catalog: [
      { name: 'General Physician Consult', price: '₹500', img: '🩺' },
      { name: 'Full Body Health Checkup', price: '₹1,499', img: '🧪' },
      { name: 'Immunity Care Booster Kit', price: '₹750', img: '💊' }
    ]
  }
};

let currentWsIndustry = 'restaurant';
let currentWsColor = '#b76e79';

function setWsIndustry(ind, btnEl) {
  currentWsIndustry = ind;
  if (btnEl) {
    document.querySelectorAll('.ws-ind-btn').forEach(b => b.classList.remove('active'));
    btnEl.classList.add('active');
  }
  updateWsPreview();
  showToast(`🌐 Switched website template to ${ind.toUpperCase()}!`);
}

function setWsColor(color, bg, btnEl) {
  currentWsColor = color;
  if (btnEl) {
    document.querySelectorAll('.ws-swatch').forEach(b => b.classList.remove('active'));
    btnEl.classList.add('active');
  }
  const siteHeader = document.getElementById('wsSiteHeader');
  const siteHero = document.getElementById('wsSiteHero');
  if (siteHeader) siteHeader.style.background = color;
  if (siteHero) siteHero.style.background = `linear-gradient(135deg, ${color} 0%, #2b1118 100%)`;
  showToast('🎨 Updated website brand theme color!');
}

function setWsDevice(device) {
  const frame = document.getElementById('wsPreviewFrame');
  const btnM = document.getElementById('wsBtnMobile');
  const btnD = document.getElementById('wsBtnDesktop');
  if (device === 'desktop') {
    if (frame) frame.classList.add('desktop-mode');
    if (btnD) btnD.classList.add('active');
    if (btnM) btnM.classList.remove('active');
  } else {
    if (frame) frame.classList.remove('desktop-mode');
    if (btnM) btnM.classList.add('active');
    if (btnD) btnD.classList.remove('active');
  }
}

function updateWsPreview() {
  const brandInput = document.getElementById('wsInputBrand');
  const brandName = brandInput ? brandInput.value : 'Priyulabs Store';
  const logoEl = document.getElementById('wsSiteLogo');
  const urlEl = document.getElementById('wsBrowserUrl');
  const headlineEl = document.getElementById('wsHeroHeadline');
  const subEl = document.getElementById('wsHeroSub');
  const catalogEl = document.getElementById('wsSiteCatalog');

  if (logoEl) logoEl.textContent = `✨ ${brandName}`;
  if (urlEl) {
    const slug = brandName.toLowerCase().replace(/[^a-z0-9]/g, '');
    urlEl.textContent = `https://${slug || 'mystore'}.priyulabs.store`;
  }

  const tmpl = wsIndustryTemplates[currentWsIndustry] || wsIndustryTemplates.restaurant;
  if (headlineEl) headlineEl.textContent = tmpl.headline;
  if (subEl) subEl.textContent = tmpl.sub;

  if (catalogEl) {
    catalogEl.innerHTML = tmpl.catalog.map(item => `
      <div class="ws-prod-card">
        <span class="wpc-img">${item.img}</span>
        <div class="wpc-details">
          <strong>${item.name}</strong>
          <span>${item.price}</span>
        </div>
        <button class="wpc-btn" onclick="showToast('🛍️ Added ${item.name} to cart!')">+ Add</button>
      </div>
    `).join('');
  }
}

function simulateWsOrder() {
  const brandInput = document.getElementById('wsInputBrand');
  const brand = brandInput ? brandInput.value : 'Your Store';
  showToast(`📲 Generated WhatsApp Order: "Hi ${brand}, I would like to order items from your online menu!"`);
}

// ─── TAB 4: DIGITAL MARKETING & ADS ROI ENGINE ─────────────────
let mktGoal = 'footfall';

function setMktGoal(goal, btnEl) {
  mktGoal = goal;
  if (btnEl) {
    document.querySelectorAll('.mkt-goal-btn').forEach(b => b.classList.remove('active'));
    btnEl.classList.add('active');
  }
  updateMktCalculation();
}

function updateMktCalculation() {
  const slider = document.getElementById('mktBudgetSlider');
  if (!slider) return;
  const budget = parseInt(slider.value, 10);
  const display = document.getElementById('mktBudgetDisplay');
  const reachEl = document.getElementById('mktReach');
  const leadsEl = document.getElementById('mktLeads');
  const revEl = document.getElementById('mktRevenue');

  if (display) display.textContent = `₹${budget.toLocaleString('en-IN')} / month`;

  const multiplier = mktGoal === 'footfall' ? 4.8 : mktGoal === 'online' ? 3.6 : 4.2;
  const reach = Math.round(budget * multiplier);
  const leads = Math.round(budget * 0.042);
  const rev = Math.round(budget * 3.85);

  if (reachEl) reachEl.textContent = `${reach.toLocaleString('en-IN')}+`;
  if (leadsEl) leadsEl.textContent = `${leads}+`;
  if (revEl) revEl.textContent = `₹${rev.toLocaleString('en-IN')}`;
}

function setWaTemplate(type) {
  const promoText = document.getElementById('waPromoText');
  if (!promoText) return;

  if (type === 'festive') {
    promoText.textContent = 'Namaste! Special 40% FESTIVE DISCOUNT across all categories this weekend. Show this message at counter or order online!';
  } else if (type === 'vip') {
    promoText.textContent = 'Hello VIP Member! You have an exclusive ₹500 Cashback voucher waiting on your next bill above ₹1,999. Valid till Sunday.';
  } else {
    promoText.textContent = 'BUY 1 GET 1 FREE FLASH SALE! Buy any item today and get another item completely free. Hurry, offer valid till midnight!';
  }
  showToast(`📣 WhatsApp broadcast template updated: ${type.toUpperCase()}!`);
}

// ─── TAB 5: LOGO & BRAND STUDIO ENGINE ─────────────────────────
let currentBrandIcon = '👑';
let currentBrandTheme = 'rosegold';

function setBrandIcon(icon, btnEl) {
  currentBrandIcon = icon;
  if (btnEl) {
    document.querySelectorAll('.brand-ic-btn').forEach(b => b.classList.remove('active'));
    btnEl.classList.add('active');
  }
  updateBrandEngine();
  showToast(`🎯 Logo icon changed to ${icon}!`);
}

function setBrandTheme(theme, btnEl) {
  currentBrandTheme = theme;
  if (btnEl) {
    document.querySelectorAll('.brand-st-btn').forEach(b => b.classList.remove('active'));
    btnEl.classList.add('active');
  }
  const grid = document.getElementById('brandMockupsGrid');
  if (grid) {
    grid.className = `brand-mockups-grid theme-${theme}`;
  }
  showToast(`✨ Brand theme switched to ${theme.toUpperCase()}!`);
}

function updateBrandEngine() {
  const nameInput = document.getElementById('brandNameInput');
  const tagInput = document.getElementById('brandTaglineInput');
  const name = nameInput ? nameInput.value || 'Crown Royale' : 'Crown Royale';
  const tag = tagInput ? tagInput.value || 'Luxury & Trust Since 2024' : 'Luxury & Trust Since 2024';

  document.querySelectorAll('.b-dyn-name').forEach(el => el.textContent = name);
  document.querySelectorAll('.b-dyn-tag').forEach(el => el.textContent = tag);
  document.querySelectorAll('.b-dyn-icon').forEach(el => el.textContent = currentBrandIcon);
}

// ─── TAB 6: ALL-IN-ONE BUNDLE ENGINE ───────────────────────────
function updateBundleCalc() {
  const checkboxes = document.querySelectorAll('.bundle-check-item input[type="checkbox"]');
  let total = 0;
  let count = 0;

  checkboxes.forEach(cb => {
    if (cb.checked) {
      total += parseInt(cb.dataset.price, 10);
      count++;
    }
  });

  const origPriceEl = document.getElementById('bundleOriginalPrice');
  const discountEl = document.getElementById('bundleDiscount');
  const finalPriceEl = document.getElementById('bundleFinalPrice');

  let discount = 0;
  let finalPrice = total;

  if (count >= 5) {
    discount = 28000;
    finalPrice = 24999;
  } else if (count >= 3) {
    discount = Math.round(total * 0.35);
    finalPrice = total - discount;
  } else if (count >= 2) {
    discount = Math.round(total * 0.20);
    finalPrice = total - discount;
  }

  if (origPriceEl) origPriceEl.textContent = `₹${total.toLocaleString('en-IN')}`;
  if (discountEl) discountEl.textContent = `-₹${discount.toLocaleString('en-IN')} (${count >= 5 ? '53%' : count >= 3 ? '35%' : '20%'} OFF)`;
  if (finalPriceEl) finalPriceEl.textContent = `₹${finalPrice.toLocaleString('en-IN')}`;
}

function launchCustomBundleWhatsApp() {
  const selected = [];
  document.querySelectorAll('.bundle-check-item input[type="checkbox"]:checked').forEach(cb => {
    selected.push(cb.dataset.name);
  });
  const finalPrice = document.getElementById('bundleFinalPrice')?.textContent || '₹24,999';
  const msg = encodeURIComponent(`Hello Priyulabs! I am interested in the All-in-One Business Stack with: ${selected.join(', ')} (Estimated Package: ${finalPrice}). Please share the proposal!`);
  window.open(`https://wa.me/917849074050?text=${msg}`, '_blank');
}

function initDemoPlaygrounds() {
  renderPosProducts('all');
  renderPosCart();
  renderErpStock();
  updateWsPreview();
  updateMktCalculation();
  updateBrandEngine();
  updateBundleCalc();
}

// ─── POLICY MODAL (MSME UDYAM-OD-19-0177979) ────────────
const policyModal = document.getElementById('policyModal');
const policyModalTitle = document.getElementById('policyModalTitle');
const policyModalContent = document.getElementById('policyModalContent');

const policies = {
  about: {
    title: 'About Us – Priyulabs',
    content: `
      <h4>Our Mission</h4>
      <p><strong>Priyulabs</strong> (PriyuLabs Technologies Pvt. Ltd.) is an Indian SaaS startup registered under <strong>MSME (UDYAM-OD-19-0177979)</strong>. Our goal is to empower 1.2+ Crore local retail merchants, supermarkets, cafes, and apparel stores with AI-powered retail operating systems.</p>
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
  pos: {
    emoji: '🖥️',
    badge: 'Next-Gen Point of Sale (POS)',
    title: 'Point of Sale (POS)',
    eyebrow: 'PRIYULABS NEXT-GEN RETAIL POS',
    headline: 'Keep the lines moving and checkout blazing fast',
    heroDesc: 'Empower your cashiers with lightning-fast POS billing, offline mode capability, and seamless hardware integration.',
    image: 'assets/pos_billing_preview.jpg',
    before: [
      'Clunky legacy desktop software freezing during peak billing rush hours',
      'No internet outage protection — store stops billing when Wi-Fi drops',
      'Disconnected card swipe machines requiring manual price re-typing on EDC'
    ],
    after: [
      '<strong>Vision AI Stock Detection & Expiry Shield:</strong> Snap a wholesaler invoice — AI auto-extracts items (name, qty, batch, MRP) and logs stock in under 2 seconds with zero manual entry',
      '<strong>100% Offline-First Engine:</strong> Keep billing without internet; automatically syncs to cloud when reconnected',
      '<strong>Bi-Directional EDC & UPI Push:</strong> Send exact invoice amounts directly to Pine Labs, Paytm & UPI QR screens with zero cashier theft'
    ],
    techUpgrades: ['⚡ Sub-Second POS Billing', '📦 Vision AI Stock Detection', '🛡️ Expiry Shield Alerts', '💳 Bi-Directional EDC Sync', '📱 Dual Customer Screen'],
    roi: '🚀 <strong>Proven Impact:</strong> 3x Faster Customer Checkout • 0% Dead-Stock Write-Offs • 100% Cash Reconciliation'
  },
  supermarket: {
    emoji: '🛒',
    badge: 'High-Volume Retail & Grocery POS',
    title: 'Supermarkets, Grocery & Kirana',
    eyebrow: 'PRIYULABS FOR SUPERMARKETS & KIRANA',
    headline: 'Vision AI Stock Detection & Expiry Shield for high-volume grocery & Kirana',
    heroDesc: 'Cut expired-stock losses to zero with Vision AI Stock Detection — snap a wholesale invoice, auto-log every item, and shield shelves across Kirana, Pharmacy & Supermarket from pre-expiry losses.',
    image: 'assets/sector_supermarket.jpg',
    before: [
      'Manual barcode searching & keyboard price typing creating long 10-minute billing queues',
      'Manual weighing on separate scales, then calculating loose item prices on a handheld calculator',
      'Stock expiry losses: Expired packets sitting unnoticed on back shelves causing customer loss'
    ],
    after: [
      '<strong>Vision AI Stock Detection & Expiry Shield:</strong> Snap wholesaler invoices to auto-log stock & get pre-expiry alerts 7–30 days before expiry across Kirana, Pharmacy & Supermarket',
      '<strong>Direct Weighing Scale Sync:</strong> Weight transfers automatically from digital scale straight into POS bill',
      '<strong>Invoice OCR Auto-Stock Logging:</strong> AI extracts every line item (name, qty, batch, MRP) from wholesale bill photos in under 2 seconds'
    ],
    techUpgrades: ['📦 Vision AI Stock Detection', '🛡️ Expiry Shield Alerts', '📷 Invoice OCR Auto-Log', '⚖️ Weighing Scale Sync', '📅 FEFO Batch Tracking'],
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

window.sectorDetailsData = sectorDetailsData;

function openSectorModal(key) {
  window.location.href = `solutions.html?sector=${key}`;
}

function closeSectorModal() {
  if (sectorModal) {
    sectorModal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// ─── CTA LEAD FORM SUBMISSION (GOOGLE APPS SCRIPT WEB APP) ────────
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwPl-7pp-g-VOMUDpP900zdOB8DhA8gS6sOrKwUeTTNclUtggc3UKg7_G2rJl3VjyRlMA/exec";

const leadForm = document.getElementById('leadForm');
if (leadForm) {
  leadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const button = document.getElementById('submitLeadBtn');
    const statusMsg = document.getElementById('formStatusMsg');

    if (button) {
      button.textContent = "Submitting...";
      button.disabled = true;
      button.style.opacity = '0.85';
    }

    if (statusMsg) {
      statusMsg.style.display = 'none';
      statusMsg.textContent = '';
    }

    fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      body: new FormData(leadForm),
      mode: "no-cors"
    })
      .then(() => {
        if (button) {
          button.disabled = false;
          button.innerHTML = "Submit & Get Early Access 🚀";
          button.style.opacity = '1';
        }
        const successText = "Thank you! Your details have been submitted successfully. Our team will contact you within 15 minutes.";
        if (statusMsg) {
          statusMsg.style.display = 'block';
          statusMsg.style.background = '#d1fae5';
          statusMsg.style.color = '#065f46';
          statusMsg.style.border = '1px solid #10b981';
          statusMsg.textContent = successText;
        }
        if (typeof showToast === 'function') {
          showToast(successText);
        }
        leadForm.reset();
      })
      .catch(err => {
        console.error('Google Sheet Submission Error:', err);
        if (button) {
          button.disabled = false;
          button.innerHTML = "Submit & Get Early Access 🚀";
          button.style.opacity = '1';
        }
        const errorText = "Something went wrong. Please try again.";
        if (statusMsg) {
          statusMsg.style.display = 'block';
          statusMsg.style.background = '#fee2e2';
          statusMsg.style.color = '#991b1b';
          statusMsg.style.border = '1px solid #ef4444';
          statusMsg.textContent = errorText;
        }
        if (typeof showToast === 'function') {
          showToast(errorText);
        }
      });
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

// ─── CAROUSEL & SLIDER CONTROLS ─────────────────────────────────
function scrollCarousel(target, direction) {
  let container = typeof target === 'string' ? (document.getElementById(target) || document.querySelector(`.${target}`)) : target;
  if (!container) return;

  const firstChild = container.querySelector('.attr-card, .serve-card, .test-card, .sq-photo-card, .hw-item, .niche-chip, .sector-pick-btn');
  const scrollAmount = firstChild ? (firstChild.offsetWidth + 16) * direction : container.clientWidth * 0.75 * direction;

  container.scrollBy({
    left: scrollAmount,
    behavior: 'smooth'
  });
}
window.scrollCarousel = scrollCarousel;

// Robust Drag-to-Scroll for Mouse & Pure Native Touch Gestures
function initCarouselDragScroll() {
  const carousels = document.querySelectorAll('.attr-grid, .serve-grid, .test-grid, .sq-hero-photo-strip, .hw-logos, .niche-chips-wrap, .sector-picker-bar');

  carousels.forEach(slider => {
    if (slider.dataset.dragBound) return;
    slider.dataset.dragBound = 'true';

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    // Prevent default ghost image drag
    slider.querySelectorAll('img').forEach(img => {
      img.setAttribute('draggable', 'false');
      img.addEventListener('dragstart', (e) => e.preventDefault());
    });

    // MOUSE DRAG HANDLERS (Desktop / Laptop Mouse Navigation)
    slider.addEventListener('mousedown', (e) => {
      if (e.target.closest('button, a, input, select, textarea')) return;
      isDown = true;
      slider.classList.add('is-dragging');
      slider.style.scrollSnapType = 'none';
      slider.style.scrollBehavior = 'auto';
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
      if (!isDown) return;
      isDown = false;
      slider.classList.remove('is-dragging');
      slider.style.scrollSnapType = '';
      slider.style.scrollBehavior = '';
    });

    slider.addEventListener('mouseup', () => {
      if (!isDown) return;
      isDown = false;
      slider.classList.remove('is-dragging');
      slider.style.scrollSnapType = '';
      slider.style.scrollBehavior = '';
    });

    slider.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 1.5;
      slider.scrollLeft = scrollLeft - walk;
    });

    // MOUSE WHEEL (Allows horizontal scroll with wheel when hovering carousel)
    slider.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && !e.shiftKey) {
        slider.scrollLeft += e.deltaY * 0.8;
      }
    }, { passive: true });

    // ── TOUCH SWIPE HANDLERS (Mobile & Tablet Native Swipe) ──
    let touchStartX = 0;
    let touchStartScrollLeft = 0;
    let isSwiping = false;

    slider.addEventListener('touchstart', (e) => {
      if (e.target.closest('button, a, input, select, textarea')) return;
      touchStartX = e.touches[0].clientX;
      touchStartScrollLeft = slider.scrollLeft;
      isSwiping = true;
      slider.style.scrollSnapType = 'none';
      slider.style.scrollBehavior = 'auto';
      slider.classList.add('is-dragging');
    }, { passive: true });

    slider.addEventListener('touchmove', (e) => {
      if (!isSwiping) return;
      const touchCurrentX = e.touches[0].clientX;
      const diff = touchStartX - touchCurrentX;
      slider.scrollLeft = touchStartScrollLeft + diff;
    }, { passive: true });

    slider.addEventListener('touchend', () => {
      if (!isSwiping) return;
      isSwiping = false;
      slider.classList.remove('is-dragging');
      slider.style.scrollSnapType = '';
      slider.style.scrollBehavior = '';
    }, { passive: true });

    slider.addEventListener('touchcancel', () => {
      isSwiping = false;
      slider.classList.remove('is-dragging');
      slider.style.scrollSnapType = '';
      slider.style.scrollBehavior = '';
    }, { passive: true });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCarouselDragScroll);
} else {
  initCarouselDragScroll();
}
window.initCarouselDragScroll = initCarouselDragScroll;

// ─── VIDEO INTERACTION & TOUCH HANDLER (SAFE PLAY/PAUSE) ────────
function initVideoTouchProtection() {
  const videoElements = document.querySelectorAll('video, .card-video-wrap, .sol-video-wrapper');
  videoElements.forEach(wrapper => {
    const vid = wrapper.tagName === 'VIDEO' ? wrapper : wrapper.querySelector('video');
    if (vid && !vid.dataset.bound) {
      vid.dataset.bound = 'true';
      vid.addEventListener('click', (e) => {
        // Prevent anchor link navigation if video is inside a card
        e.stopPropagation();
        if (vid.paused) {
          vid.play().catch(() => { });
        } else {
          vid.pause();
        }
      });
    }
  });
}

document.addEventListener('DOMContentLoaded', initVideoTouchProtection);
initVideoTouchProtection();
window.initVideoTouchProtection = initVideoTouchProtection;

// ─── SECTOR PICKER & CONTENT PANEL TOGGLE ──────────────────────
function initSectorPicker() {
  const sectorBtns = document.querySelectorAll('.sector-pick-btn');
  if (!sectorBtns.length) return;

  sectorBtns.forEach(btn => {
    if (btn.dataset.sectorBound) return;
    btn.dataset.sectorBound = 'true';

    btn.addEventListener('click', (e) => {
      e.preventDefault();

      const sectorKey = btn.getAttribute('data-sector') || btn.dataset.sector;

      // Toggle .active class among sector pick buttons
      sectorBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Activate respective sector content panel via global selectSectorView if available
      if (typeof window.selectSectorView === 'function' && sectorKey) {
        window.selectSectorView(sectorKey);
      } else if (typeof selectSectorView === 'function' && sectorKey) {
        selectSectorView(sectorKey);
      }

      // Toggle .active class on sector content panel elements
      const sectorPanels = document.querySelectorAll('.sector-panel, .sector-tab-content, [data-sector-panel]');
      sectorPanels.forEach(panel => {
        const pKey = panel.getAttribute('data-sector') || panel.getAttribute('data-sector-panel') || panel.id.replace(/^(tab-|sector-)/, '');
        if (pKey === sectorKey) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSectorPicker);
} else {
  initSectorPicker();
}

// ─── GLOBAL WINDOW EXPORTS FOR MOBILE & DESKTOP EVENT HANDLERS ───
window.openDemoModal = openDemoModal;
window.closeDemoModal = closeDemoModal;
window.switchDemoTab = switchDemoTab;
window.filterPosProducts = filterPosProducts;
window.addPosToCart = addPosToCart;
window.updatePosQty = updatePosQty;
window.removePosItem = removePosItem;
window.clearPosCart = clearPosCart;
window.runPosVoicePreset = runPosVoicePreset;
window.simulateBarcodeScan = simulateBarcodeScan;
window.executePosPayment = executePosPayment;
window.printPosInvoice = printPosInvoice;
window.resetPosCart = resetPosCart;
window.simulateErpScanInvoice = simulateErpScanInvoice;
window.simulateErpSale = simulateErpSale;
window.reorderErpItem = reorderErpItem;
window.simulateHrmsCheckIn = simulateHrmsCheckIn;
window.setWsIndustry = setWsIndustry;
window.setWsColor = setWsColor;
window.setWsDevice = setWsDevice;
window.updateWsPreview = updateWsPreview;
window.simulateWsOrder = simulateWsOrder;
window.setMktGoal = setMktGoal;
window.updateMktCalculation = updateMktCalculation;
window.setWaTemplate = setWaTemplate;
window.setBrandIcon = setBrandIcon;
window.setBrandTheme = setBrandTheme;
window.updateBrandEngine = updateBrandEngine;
window.updateBundleCalc = updateBundleCalc;
window.launchCustomBundleWhatsApp = launchCustomBundleWhatsApp;
window.initDemoPlaygrounds = initDemoPlaygrounds;
window.runSimVoice = runPosVoicePreset;
window.simulatePinePush = executePosPayment;
window.simulateVisionScan = simulateErpScanInvoice;
window.simulateGstDownload = function() { showToast('📥 GST JSON generated!'); };
window.simulateVoicePOS = simulateVoicePOS;
window.openPolicyModal = openPolicyModal;
window.closePolicyModal = closePolicyModal;
window.openSectorModal = openSectorModal;
window.closeSectorModal = closeSectorModal;
window.switchMegaTab = switchMegaTab;
window.switchHeroEcosystem = switchHeroEcosystem;
window.showToast = showToast;
window.toggleBakeryFullscreen = toggleBakeryFullscreen;
window.handleLeadSubmit = handleLeadSubmit;
window.initSectorPicker = initSectorPicker;
window.setSpotlightIndex = setSpotlightIndex;
window.initHeroSpotlight = initHeroSpotlight;

console.log('%c Priyulabs – India’s Smartest AI Retail OS Loaded Successfully! 🇮🇳 ',
  'background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; font-size: 14px; padding: 8px 16px; border-radius: 8px; font-weight: bold;');
