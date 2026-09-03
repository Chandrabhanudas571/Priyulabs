export interface SectorInfo {
  id: string;
  category: 'fnb' | 'retail' | 'beauty' | 'services';
  title: string;
  badge: string;
  eyebrow: string;
  headline: string;
  desc: string;
  image: string;
  videoUrl?: string;
  before: string[];
  after: string[];
  techUpgrades: string[];
  roi: string;
}

export const sectorsList: SectorInfo[] = [
  {
    id: 'supermarket',
    category: 'retail',
    title: 'Supermarkets, Grocery & Kirana',
    badge: 'High-Volume Retail & Kirana POS',
    eyebrow: 'PRIYULABS FOR SUPERMARKETS & KIRANA',
    headline: 'Vision AI Stock Detection & Expiry Shield for high-volume grocery',
    desc: 'Cut expired-stock losses to zero with Vision AI Stock Detection — snap a wholesale invoice, auto-log every item, and shield shelves from pre-expiry losses.',
    image: 'sector_supermarket.jpg',
    before: [
      'Manual barcode searching & keyboard price typing creating long 10-minute billing queues',
      'Manual weighing on separate scales, then calculating loose item prices on a handheld calculator',
      'Stock expiry losses: Expired packets sitting unnoticed on back shelves causing customer loss',
    ],
    after: [
      'Vision AI Stock Detection & Expiry Shield: Snap wholesaler invoices to auto-log stock & get pre-expiry alerts 7–30 days before expiry',
      'Direct Weighing Scale Sync: Weight transfers automatically from digital scale straight into POS bill',
      'Invoice OCR Auto-Stock Logging: AI extracts every line item (name, qty, batch, MRP) from wholesale bill photos in under 2 seconds',
    ],
    techUpgrades: ['Vision AI Stock Detection', 'Expiry Shield Alerts', 'Invoice OCR Auto-Log', 'Weighing Scale Sync', 'FEFO Batch Tracking'],
    roi: '80% Faster Billing Queue • 0% Expired Stock Losses • 100% Cash Accuracy',
  },
  {
    id: 'cafe',
    category: 'fnb',
    title: 'Cafes & QSR Restaurants',
    badge: 'Food & Beverage Operations OS',
    eyebrow: 'PRIYULABS FOR COFFEE SHOPS & CAFES',
    headline: 'A fast, reliable POS to ease your daily grind',
    desc: 'Streamline counter & table ordering, print instant kitchen KOTs, offer self-order QR menus, and track recipe ingredient stock automatically.',
    image: 'sector_cafe.jpg',
    before: [
      'Physical paper menu cards on tables (slow order taking, re-printing costs on menu changes)',
      'Waiters running back & forth writing handwritten paper KOT notes to pass to the chef',
      'Raw ingredient wastage (cheese, milk, coffee beans) tracked vaguely on loose paper notebooks',
    ],
    after: [
      'QR Menu & Self-Order Kiosk: Guests scan QR on table or use interactive Touch Kiosk to order & pay',
      'Instant KDS & Thermal KOT: Orders directly print in kitchen or appear on Chef Display Screen',
      'Recipe Ingredient ERP: Every dish sold automatically deducts exact raw milk, cheese & coffee stock',
    ],
    techUpgrades: ['Touchscreen Kiosk', 'Table QR Ordering', 'Kitchen KDS & KOT', 'Recipe ERP'],
    roi: '35% Higher Table Turnover • 100% KOT Delivery Accuracy • 0% Raw Waste',
  },
  {
    id: 'bakery',
    category: 'fnb',
    title: 'Bakeries & Confectionery',
    badge: 'Bakery & Confectionery Operations OS',
    eyebrow: 'PRIYULABS FOR BAKERIES & CONFECTIONERY',
    headline: 'Smart Bakery POS, Custom Cake Booking & Weight Scale Billing',
    desc: 'Streamline advance custom cake orders, weight-based pastry checkout, raw material batch tracking, and thermal expiry labeling in one system.',
    image: 'hero_retail.jpg',
    videoUrl: 'bakery-demo.mp4',
    before: [
      'Advance custom cake orders written on paper slips, lost or misplaced during busy rush hours',
      'Weight-based billing for loose pastries and sweets calculated manually, causing cashier mistakes',
      'High raw material inventory wastage tracked loosely without recipe deduction',
    ],
    after: [
      'Advance Custom Cake Booking: Log delivery dates, photo reference tags & advance token payments directly on POS',
      'Auto Weighing Scale POS Sync: Place pastries on scale for instant total calculation in under 1 second',
      'Recipe Raw Material ERP: Auto-deduct exact flour, butter, chocolate & cream stock per batch produced',
    ],
    techUpgrades: ['Custom Cake Order POS', 'Weigh-Scale Auto Sync', 'Recipe Batch ERP', 'Thermal Expiry Labeling', 'Live Demo Video'],
    roi: '45% Faster Billing • 100% Advance Order Delivery Accuracy • 0% Recipe Waste',
  },
  {
    id: 'apparel',
    category: 'beauty',
    title: 'Apparel & Fashion Boutiques',
    badge: 'Multi-Variant Fashion ERP',
    eyebrow: 'PRIYULABS FOR APPAREL & FASHION',
    headline: 'Multi-variant size & color matrix software built for boutiques',
    desc: 'Print custom barcode tags, manage sizes & colors in one matrix screen, and launch a 1-click WhatsApp catalog for repeat customer sales.',
    image: 'sector_fashion.jpg',
    before: [
      'Handwritten paper tags falling off garments causing price confusion & billing delays',
      'Inventory confusion over sizes (S, M, L, XL) & colors leading to missed customer sales',
      'Boutique store limited to walk-in buyers without any digital WhatsApp customer re-engagement',
    ],
    after: [
      '1-Click Barcode Tag Printer: Print custom barcode price tags with size, color & brand in 1 tap',
      'Multi-Variant Stock Matrix: Complete stock visibility across sizes, colors & categories in 1 screen',
      'WhatsApp Digital Catalog: Send interactive digital product catalog directly to VIP customers',
    ],
    techUpgrades: ['Barcode Tag Generator', 'Size-Color Matrix', 'WhatsApp Catalog', 'Returns & Exchanges'],
    roi: '60% Faster Stock Take • +22% Repeat WhatsApp Sales • Zero Mismatched Returns',
  },
  {
    id: 'pharmacy',
    category: 'services',
    title: 'Pharmacies & Chemists',
    badge: 'Medical Store & Chemist POS',
    eyebrow: 'PRIYULABS FOR PHARMACIES & CHEMISTS',
    headline: 'Batch-wise FEFO expiry tracking, drug substitute finder & Schedule H logs',
    desc: 'Maintain Schedule H/X compliance logs, locate generic salt substitutes in seconds, and eliminate medicine expiry losses with FEFO dispatch alerts.',
    image: 'sector_pharmacy.jpg',
    before: [
      'Returning customers turning away when a branded medicine is out of stock without substitute lookup',
      'Expired medicine blisters gathering dust on shelves causing direct financial loss',
      'Tedious manual register entry for doctor prescription details and Schedule H compliance',
    ],
    after: [
      'AI Salt & Substitute Finder: Instant generic and alternate brand recommendations when out of stock',
      'FEFO Batch Tracking: POS always pulls closest-to-expiry batch first during billing',
      '1-Click Schedule H Compliance: Doctor name, patient number & prescription log generated automatically',
    ],
    techUpgrades: ['AI Drug Salt Finder', 'FEFO Expiry Protection', 'Schedule H Auto-Log', 'Batch Strips & Loose Tabs'],
    roi: '0% Expired Medicine Losses • 100% Drug Compliance • 15% Higher Prescription Fulfillment',
  },
  {
    id: 'electronics',
    category: 'services',
    title: 'Electronics & Mobile Shops',
    badge: 'Hardware & Mobile Store POS',
    eyebrow: 'PRIYULABS FOR ELECTRONICS & APPLIANCES',
    headline: 'Serial number & IMEI warranty tracker with 0% interest EMI billing',
    desc: 'Track individual device IMEIs, register instant manufacturer warranties, and process Pine Labs 0% cost EMI schemes directly at the billing counter.',
    image: 'sector_electronics.jpg',
    before: [
      'Customer disputes over warranty dates and missing original invoice proof',
      'Cashier confusion when activating brand bank EMI schemes and cashbacks',
      'Lost serialized stock without tracking individual IMEI/serial numbers',
    ],
    after: [
      'IMEI & Serial Barcode Scan: Every device sold captures IMEI in 0.5 seconds on the bill',
      'Integrated Brand EMI: Instant Pine Labs & Paytm brand EMI calculations on customer swipe',
      'WhatsApp Digital Warranty: Bill and warranty card delivered directly to customer WhatsApp',
    ],
    techUpgrades: ['IMEI / Serial Scan', 'Brand EMI Integration', 'WhatsApp e-Invoice', 'Warranty Auto-Vault'],
    roi: '100% IMEI Reconciliation • +30% High-Value Appliance EMI Conversions • Zero Warranty Disputes',
  },
  {
    id: 'specialty',
    category: 'beauty',
    title: 'Cosmetics & Beauty Salons',
    badge: 'Specialty Retail & Cosmetics OS',
    eyebrow: 'PRIYULABS FOR COSMETICS & BEAUTY',
    headline: 'Delight repeat customers with loyalty points & bundle kits',
    desc: 'Drive repeat store visits with automated VIP loyalty cashback, bundled gift hamper checkout, and tester batch inventory controls.',
    image: 'sector_cosmetics.jpg',
    before: [
      'Paper loyalty punch cards lost or forgotten by shoppers',
      'High tester & sample bottle pilferage with no internal consumption tracking',
      'Inability to bundle varied cosmetic items into a holiday gift basket at discounted pricing',
    ],
    after: [
      'Mobile Number Loyalty Wallet: Automatic SMS cashback points on every purchase',
      'Tester Stock Quarantine: Dedicated internal consumption tracking for floor tester products',
      'Dynamic Gift Hamper Kits: Create multi-item bundles in 1 tap with promotional combo pricing',
    ],
    techUpgrades: ['Combo Kit Bundler', 'Mobile Loyalty Wallet', 'Tester Consumption ERP', 'Skin Tone / Shade Matrix'],
    roi: '+40% Customer Retention • 0% Floor Tester Pilferage • 2.2x Higher Gift Season Basket Size',
  },
  {
    id: 'pos',
    category: 'retail',
    title: 'General Retail Counter POS',
    badge: 'Universal Counter Billing',
    eyebrow: 'PRIYULABS HIGH SPEED POS ENGINE',
    headline: 'Keep lines moving with sub-second checkout and 100% offline uptime',
    desc: 'High-speed barcode scanner sync, multi-payment support, and automatic cloud reconciliation for fast-paced checkout lanes.',
    image: 'pos_billing_preview.jpg',
    before: [
      'Billing lag and freezes when handling large 50+ item shopping baskets',
      'Cash discrepancy between POS software and cash drawer at end-of-day count',
      'Store shutdown when local internet ISP experiences unexpected downtime',
    ],
    after: [
      'Sub-second billing latency even with 100+ item transactions',
      'Real-time cash reconciliation with digital till count and shift management',
      'Continuous offline operations with automatic cloud syncing upon reconnect',
    ],
    techUpgrades: ['Sub-Second Engine', 'Offline-First Local Cache', 'Till Count Reconciliation', 'Thermal Receipt Printer'],
    roi: '3x Faster Billing • Zero Discrepancies • 100% Outage Protection',
  },
];
