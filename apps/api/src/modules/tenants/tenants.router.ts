import { Router } from 'express';
import type { SectorDetailDto } from '@priyulabs/contracts';

export const tenantsRouter = Router();

export const sectorsData: Record<string, SectorDetailDto> = {
  pos: {
    key: 'pos',
    emoji: '🖥️',
    badge: 'Next-Gen Point of Sale (POS)',
    title: 'Point of Sale (POS)',
    eyebrow: 'PRIYULABS NEXT-GEN RETAIL POS',
    headline: 'Keep the lines moving and checkout blazing fast',
    heroDesc: 'Empower your cashiers with lightning-fast POS billing, offline mode capability, and seamless hardware integration.',
    image: 'pos_billing_preview.jpg',
    before: [
      'Clunky legacy desktop software freezing during peak billing rush hours',
      'No internet outage protection — store stops billing when Wi-Fi drops',
      'Disconnected card swipe machines requiring manual price re-typing on EDC',
    ],
    after: [
      'Sub-second billing response designed for high-speed retail counters',
      '100% Offline-First Engine: Keep billing without internet; automatically syncs when reconnected',
      'Bi-Directional EDC & UPI Push: Send exact invoice amounts directly to Pine Labs, Paytm & UPI QR screens with zero cashier theft',
    ],
    techUpgrades: ['⚡ Sub-Second POS Billing', '📦 Vision AI Stock Detection', '🛡️ Expiry Shield Alerts', '💳 Bi-Directional EDC Sync', '📱 Dual Customer Screen'],
    roi: '🚀 3x Faster Customer Checkout • 0% Dead-Stock Write-Offs • 100% Cash Reconciliation',
  },
  supermarket: {
    key: 'supermarket',
    emoji: '🛒',
    badge: 'High-Volume Retail & Grocery POS',
    title: 'Supermarkets, Grocery & Kirana',
    eyebrow: 'PRIYULABS FOR SUPERMARKETS & KIRANA',
    headline: 'Vision AI Stock Detection & Expiry Shield for high-volume grocery & Kirana',
    heroDesc: 'Cut expired-stock losses to zero with Vision AI Stock Detection — snap a wholesale invoice, auto-log every item, and shield shelves from pre-expiry losses.',
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
    techUpgrades: ['📦 Vision AI Stock Detection', '🛡️ Expiry Shield Alerts', '📷 Invoice OCR Auto-Log', '⚖️ Weighing Scale Sync', '📅 FEFO Batch Tracking'],
    roi: '⚡ 80% Faster Billing Queue • 0% Expired Stock Losses • 100% Cash Accuracy',
  },
  cafe: {
    key: 'cafe',
    emoji: '☕',
    badge: 'Food & Beverage Operations OS',
    title: 'Cafes, Bakeries & QSR Restaurants',
    eyebrow: 'PRIYULABS FOR COFFEE SHOPS & CAFES',
    headline: 'A fast, reliable POS to ease your daily grind',
    heroDesc: 'Streamline counter & table ordering, print instant kitchen KOTs, offer self-order QR menus, and track recipe ingredient stock automatically.',
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
    techUpgrades: ['📱 Touchscreen Kiosk', '📲 Table QR Ordering', '🖥️ Kitchen KDS & KOT', '📊 Recipe ERP'],
    roi: '🍽️ 35% Higher Table Turnover • 100% KOT Delivery Accuracy • 0% Raw Waste',
  },
  bakery: {
    key: 'bakery',
    emoji: '🎂',
    badge: 'Bakery & Confectionery Operations OS',
    title: 'Bakeries, Cake Shops & Confectionery',
    eyebrow: 'PRIYULABS FOR BAKERIES & CONFECTIONERY',
    headline: 'Smart Bakery POS, Custom Cake Booking & Weight Scale Billing',
    heroDesc: 'Streamline advance custom cake orders, weight-based pastry checkout, raw material batch tracking, and thermal expiry labeling in one system.',
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
    techUpgrades: ['🎂 Custom Cake Order POS', '⚖️ Weigh-Scale Auto Sync', '📊 Recipe Batch ERP', '🏷️ Thermal Expiry Labeling', '🎥 Live Demo Video'],
    roi: '🎂 45% Faster Billing • 100% Advance Order Delivery Accuracy • 0% Recipe Waste',
  },
  apparel: {
    key: 'apparel',
    emoji: '🛍️',
    badge: 'Multi-Variant Fashion ERP',
    title: 'Apparel, Footwear & Fashion Boutiques',
    eyebrow: 'PRIYULABS FOR APPAREL & FASHION',
    headline: 'Multi-variant size & color matrix software built for boutiques',
    heroDesc: 'Print custom barcode tags, manage sizes & colors in one matrix screen, and launch a 1-click WhatsApp catalog for repeat customer sales.',
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
    techUpgrades: ['🏷️ Barcode Tag Generator', '🎨 Size-Color Matrix', '💬 WhatsApp Catalog', '🔄 Returns & Exchanges'],
    roi: '👗 60% Faster Stock Take • +22% Repeat WhatsApp Sales • Zero Mismatched Returns',
  },
  pharmacy: {
    key: 'pharmacy',
    emoji: '💊',
    badge: 'Medical Store & Chemist POS',
    title: 'Pharmacies, Chemists & Medical Stores',
    eyebrow: 'PRIYULABS FOR PHARMACIES & CHEMISTS',
    headline: 'Batch-wise FEFO expiry tracking, drug substitute finder & Schedule H logs',
    heroDesc: 'Maintain Schedule H/X compliance logs, locate generic salt substitutes in seconds, and eliminate medicine expiry losses with FEFO dispatch alerts.',
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
    techUpgrades: ['🔬 AI Drug Salt Finder', '🛡️ FEFO Expiry Protection', '📋 Schedule H Auto-Log', '📦 Batch Strips & Loose Tabs'],
    roi: '💊 0% Expired Medicine Losses • 100% Drug Compliance • 15% Higher Prescription Fulfillment',
  },
  electronics: {
    key: 'electronics',
    emoji: '⚡',
    badge: 'Hardware & Mobile Store POS',
    title: 'Electronics, Mobile & Appliance Stores',
    eyebrow: 'PRIYULABS FOR ELECTRONICS & APPLIANCES',
    headline: 'Serial number & IMEI warranty tracker with 0% interest EMI billing',
    heroDesc: 'Track individual device IMEIs, register instant manufacturer warranties, and process Pine Labs 0% cost EMI schemes directly at the billing counter.',
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
    techUpgrades: ['📱 IMEI / Serial Scan', '💳 Brand EMI Integration', '🧾 WhatsApp e-Invoice', '🛡️ Warranty Auto-Vault'],
    roi: '⚡ 100% IMEI Reconciliation • +30% High-Value Appliance EMI Conversions • Zero Warranty Disputes',
  },
  specialty: {
    key: 'specialty',
    emoji: '💄',
    badge: 'Specialty Retail & Cosmetics OS',
    title: 'Cosmetics, Beauty Salons & Luxury Gifts',
    eyebrow: 'PRIYULABS FOR COSMETICS & BEAUTY',
    headline: 'Delight repeat customers with loyalty points & bundle kits',
    heroDesc: 'Drive repeat store visits with automated VIP loyalty cashback, bundled gift hamper checkout, and tester batch inventory controls.',
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
    techUpgrades: ['🎁 Combo Kit Bundler', '💎 Mobile Loyalty Wallet', '🧴 Tester Consumption ERP', '📅 Skin Tone / Shade Matrix'],
    roi: '💄 +40% Customer Retention • 0% Floor Tester Pilferage • 2.2x Higher Gift Season Basket Size',
  },
};

tenantsRouter.get('/sectors', (_req, res) => {
  res.json({
    count: Object.keys(sectorsData).length,
    sectors: sectorsData,
  });
});

tenantsRouter.get('/sectors/:key', (req, res) => {
  const sector = sectorsData[req.params.key];
  if (!sector) {
    return res.status(404).json({ error: 'Sector not found' });
  }
  return res.json(sector);
});
