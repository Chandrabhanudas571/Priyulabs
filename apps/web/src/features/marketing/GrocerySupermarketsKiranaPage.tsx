import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  Scan,
  Scale,
  Boxes,
  Truck,
  TrendingUp,
  Tag,
  FileText,
  BookOpen,
  Users,
  Store,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  Clock,
  Printer,
  QrCode,
  ShieldCheck,
  Zap,
  Sparkles,
  Monitor,
} from 'lucide-react';

const fadeAnim = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.4 },
};

export function GrocerySupermarketsKiranaPage() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [storeName, setStoreName] = useState('');
  const [storePhone, setStorePhone] = useState('');
  const [storeType, setStoreType] = useState('Supermarket (2+ Billing Counters)');
  const [activePillar, setActivePillar] = useState(0);

  const pillarsData = [
    {
      id: 'pillar-pos',
      num: '01',
      tabLabel: 'POS',
      badge: 'Pillar 01 • Smart POS',
      title: 'Take payments seamlessly & bill ultra-fast',
      image: '/assets/grocery_weighing_scale.jpg',
      alt: 'Certified electronic weighing scale integrated with supermarket POS for loose dal and grains',
      metric: 'Under 1.5s Per Line-Item Checkout',
      points: [
        { icon: Scan, text: 'Scan any barcode in sub-seconds — even wrinkled pouches and curved bottles.' },
        { icon: Scale, text: 'Connect your existing certified electronic weighing scales with zero lock-in.' },
        { icon: ShieldCheck, text: 'Keep billing without interruption during internet dropouts with offline mode.' },
        { icon: QrCode, text: 'Show dynamic UPI QR codes on the customer screen with instant voice alerts.' },
      ],
    },
    {
      id: 'pillar-inventory',
      num: '02',
      tabLabel: 'Inventory',
      badge: 'Pillar 02 • Inventory System',
      title: 'Keep inventory in check',
      image: '/assets/grocery_aisle_inventory.jpg',
      alt: 'Supermarket FMCG grocery aisle inventory stock audit',
      metric: '99.2% Accurate Stock Reconciliation',
      points: [
        { icon: Boxes, text: 'Auto-generate supplier purchase orders before fast-selling items run out.' },
        { icon: Clock, text: 'Get batch-wise alerts 30 and 60 days before expiry to eliminate losses.' },
        { icon: TrendingUp, text: 'Track real-time profit margins across loose grains and packaged goods.' },
        { icon: Tag, text: 'Repackage 50 kg bulk commodity sacks into custom-labeled retail packs.' },
      ],
    },
    {
      id: 'pillar-quick-commerce',
      num: '03',
      tabLabel: 'Store',
      badge: 'Pillar 03 • Local Quick Commerce',
      title: 'WhatsApp store & neighborhood delivery',
      image: '/assets/grocery_quick_delivery.jpg',
      alt: 'Local supermarket quick commerce delivery packing',
      metric: 'Direct Neighborhood Quick-Delivery',
      points: [
        { icon: Store, text: 'Take direct grocery orders from neighborhood homes with 0% commissions.' },
        { icon: MessageCircle, text: 'Share daily fresh vegetable rates and grocery lists via 1-click WhatsApp.' },
        { icon: Truck, text: 'Automate recurring morning milk, bread, and egg subscription drops.' },
        { icon: CheckCircle2, text: 'Manage live order dispatch with rider routing and automated SMS alerts.' },
      ],
    },
    {
      id: 'pillar-marketing',
      num: '04',
      tabLabel: 'Khata',
      badge: 'Pillar 04 • Marketing & Khata',
      title: 'Customer khata & loyalty rewards',
      image: '/assets/grocery_upi_checkout.jpg',
      alt: 'Customer scanning UPI QR code at supermarket checkout with loyalty rewards',
      metric: '+32% Monthly Customer Basket Spend',
      points: [
        { icon: BookOpen, text: 'Track customer credit in a digital khata with automatic WhatsApp reminders.' },
        { icon: Zap, text: 'Apply instant "Buy 2 Get 1" and bill-level savings right at checkout.' },
        { icon: Users, text: 'Run hyper-local ads targeting households within a 2 km store radius.' },
        { icon: Sparkles, text: 'Reward repeat grocery shoppers with points redeemable on monthly ration.' },
      ],
    },
  ];

    const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hello Priyulabs! I would like to schedule a 15-minute Supermarket & Kirana demo for ${storeName} (${storeType}). My phone is ${storePhone}.`;
    window.open(`https://wa.me/917873844050?text=${encodeURIComponent(msg)}`, '_blank');
    setDemoModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-emerald-500 selection:text-white">
      {/* ══════════════════════════════════════════════════════════
          1. HERO SECTION (High-Throughput Retail Focus)
      ══════════════════════════════════════════════════════════ */}
      <section className="relative px-5 pt-12 pb-16 sm:px-8 lg:pt-16 lg:pb-24">
        <div className="mx-auto max-w-6xl text-center">
          {/* Badge Pill */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-bold tracking-wide uppercase text-emerald-800"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            GROCERY, SUPERMARKETS &amp; SMART KIRANA
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-4xl font-black tracking-tight sm:text-6xl lg:text-7xl leading-[1.12]"
          >
            Thousands of SKUs. Split-Second Barcode Scans.{' '}
            <br className="hidden sm:inline" />
            <span className="text-emerald-600">Zero Inventory Leaks.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-6 max-w-3xl text-lg text-slate-600 sm:text-xl leading-relaxed"
          >
            The unified retail engine built for high-footfall grocery stores and modern Kiranas — engineered for lightning-speed barcode billing, integrated weighing scales, and automated wholesale stock reorders.
          </motion.p>

          {/* Dual CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <a href="/#free-trial"
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-7 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-slate-800 hover:-translate-y-0.5"
            >
              Get Started Today
              <ArrowRight size={16} />
            </a>
            <a href="#pillars"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-7 py-3.5 text-sm font-bold text-slate-800 transition hover:bg-slate-50 no-underline cursor-pointer"
             onClick={(e) => { e.preventDefault(); (document.querySelector('#pillars') || document.getElementById('pillars') || document.getElementById('pillars') || document.querySelector('.clean-pillars-sec, .pillars-sec, .triptych-sec, .pillars-grid'))?.scrollIntoView({ behavior: 'smooth' }); }}>
              <Zap size={16} className="text-emerald-600" />
              See Supermarket Billing Speed
            </a>
          </motion.div>

                    {/* Hero Showcase: High-Throughput Retail POS Dashboard */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-14 overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200 bg-white shadow-2xl text-left"
          >
            <img
              src="/grocerry bussiness type front image.png"
              alt="PriyuLabs Grocery & Supermarkets Retail Engine Counter POS"
              className="w-full h-auto block object-contain"
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.dataset.retry) {
                  target.dataset.retry = '1';
                  target.src = '/assets/grocerry bussiness type front image.png';
                }
              }}
              loading="eager"
            />
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          2. THE 4 PILLARS (Sticky Visual + Scrollable 4 Points)
      ══════════════════════════════════════════════════════════ */}
      <section className="py-24 border-b border-slate-200 bg-white" id="pillars">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block rounded-full bg-emerald-50 border border-emerald-200 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-800">
              Built for High-Footfall Retail Realities
            </span>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl text-slate-950">
              The 4 Pillars of Modern Grocery Operations
            </h2>
            <p className="mt-4 text-base text-slate-600 sm:text-lg">
              Engineered to eliminate rush-hour billing bottlenecks, stop shrinkage on loose grains, and win neighborhood customers back from quick-commerce apps.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Sticky Showcase */}
            <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
              <div className="relative h-[420px] sm:h-[480px] lg:h-[520px] rounded-3xl overflow-hidden border border-slate-200 bg-slate-950 shadow-xl">
                {pillarsData.map((pillar, idx) => (
                  <div
                    key={pillar.id}
                    className={`absolute inset-0 transition-all duration-500 ease-out ${
                      activePillar === idx
                        ? 'opacity-100 scale-100 pointer-events-auto z-10'
                        : 'opacity-0 scale-95 pointer-events-none z-0'
                    }`}
                  >
                    <img
                      src={pillar.image}
                      alt={pillar.alt}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-slate-950/30"></div>
                    
                    {/* Top Pill */}
                    <div className="absolute top-4 left-4 rounded-full bg-slate-950/85 backdrop-blur-md px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white border border-white/20 flex items-center gap-1.5 shadow-lg">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {pillar.badge}
                    </div>

                    {/* Bottom Metric Pill */}
                    <div className="absolute bottom-5 left-5 right-5 flex justify-between items-center">
                      <span className="rounded-full bg-white px-4 py-2 text-xs font-bold text-slate-900 shadow-xl flex items-center gap-2 border border-slate-100">
                        ⚡ {pillar.metric}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Fast Jump Tabs */}
              <div className="flex gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-1.5">
                {pillarsData.map((p, idx) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      setActivePillar(idx);
                      document.getElementById(p.id)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }}
                    className={`flex-1 rounded-xl py-2 px-1 text-xs font-bold transition duration-200 text-center ${
                      activePillar === idx
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'text-slate-600 hover:bg-slate-200/60 hover:text-slate-900'
                    }`}
                  >
                    {p.num} {idx === 0 ? 'POS' : idx === 1 ? 'Inventory' : idx === 2 ? 'Store' : 'Khata'}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Scrollable Clean Steps (Square-style minimal 4 points) */}
            <div className="lg:col-span-7 space-y-12">
              {pillarsData.map((pillar, idx) => (
                <motion.div
                  key={pillar.id}
                  id={pillar.id}
                  onViewportEnter={() => setActivePillar(idx)}
                  viewport={{ amount: 0.4 }}
                  className={`min-h-[460px] flex flex-col justify-center py-8 transition-opacity duration-300 ${
                    activePillar === idx ? 'opacity-100' : 'opacity-35 hover:opacity-75'
                  }`}
                >
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950">
                    {pillar.title}
                  </h3>
                  <div className="h-px bg-slate-200 my-6 w-full" />

                  {/* Exactly 4 Clean 1-Line Points */}
                  <div className="space-y-5">
                    {pillar.points.map((pt, pIdx) => {
                      const IconComp = pt.icon;
                      return (
                        <div key={pIdx} className="flex items-center gap-4">
                          <div className="text-slate-900 shrink-0">
                            <IconComp size={20} className="stroke-[2.2]" />
                          </div>
                          <p className="text-sm sm:text-base font-medium text-slate-800 leading-normal">
                            {pt.text}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* ══════════════════════════════════════════════════════════
          3. DEDICATED HARDWARE & RETAIL WORKFLOW INTEGRATION BAR
      ══════════════════════════════════════════════════════════ */}
      <section className="bg-slate-50 py-20 border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-600">
              Zero Hardware Lock-In
            </span>
            <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-4xl text-slate-950">
              Plug-and-Play Retail Counter Hardware
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              Seamless driver-free compatibility with your existing billing computers, laser scanners, and counter printers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-900 mb-4">
                <Scan size={22} />
              </div>
              <h4 className="font-bold text-base text-slate-950 mb-2">Barcode Scanners</h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                1D/2D omnidirectional hands-free table scanners and wireless handheld laser guns for instant cart loading.
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">TVS</span>
                <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">Honeywell</span>
                <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">Zebra</span>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-900 mb-4">
                <Monitor size={22} />
              </div>
              <h4 className="font-bold text-base text-slate-950 mb-2">Touch POS &amp; Billing Terminals</h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Deploy on any standard Windows PC, desktop, laptop, or heavy-duty touchscreen POS counter machine with plug-and-play setup.
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">Windows PC</span>
                <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">Touch POS</span>
                <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">Posiflex</span>
                <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">Sunmi</span>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-900 mb-4">
                <Tag size={22} />
              </div>
              <h4 className="font-bold text-base text-slate-950 mb-2">Label &amp; Barcode Printers</h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Direct thermal barcode sticker printers for packaging loose dals, dry spices, and fresh items.
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">TSC</span>
                <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">TVS</span>
                <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">Zebra</span>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-900 mb-4">
                <Printer size={22} />
              </div>
              <h4 className="font-bold text-base text-slate-950 mb-2">Cash Drawers &amp; Printers</h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Auto-kick cash drawer integration and 2-inch/3-inch ultra-fast thermal receipt printers with cutters.
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">Epson</span>
                <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">Rugtek</span>
                <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">NGX</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          4. CORE SUPERMARKET FEATURES (Sharp Retail Matrix)
      ══════════════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-600">
              Full-Stack Retail Matrix
            </span>
            <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-5xl text-slate-950">
              Engineered Specifically for Grocery Store Realities
            </h2>
            <p className="mt-4 text-base text-slate-600 sm:text-lg">
              Everything from bulk sack breakdown and GST ITC filing to customer khata ledger management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-xs hover:border-slate-300 transition">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 mb-5">
                <Boxes size={22} />
              </div>
              <h3 className="font-extrabold text-lg text-slate-950 mb-2">Loose Commodity Repackaging</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Convert 50 kg bulk sacks into 1 kg retail packs with auto-generated barcode labels, expiry dates, and lot numbers.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-xs hover:border-slate-300 transition">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 mb-5">
                <FileText size={22} />
              </div>
              <h3 className="font-extrabold text-lg text-slate-950 mb-2">HSN &amp; Dynamic GST Invoicing</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Pre-configured Indian tax slabs (0%, 5%, 12%, 18%) with auto-calculated input tax credit reports ready for monthly filing.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-xs hover:border-slate-300 transition">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 mb-5">
                <BookOpen size={22} />
              </div>
              <h3 className="font-extrabold text-lg text-slate-950 mb-2">Udhar / Store Credit Ledger</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Digital Khatabook for loyal customer khata tracking with automated payment reminder SMS and WhatsApp payment links.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-xs hover:border-slate-300 transition">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 mb-5">
                <Tag size={22} />
              </div>
              <h3 className="font-extrabold text-lg text-slate-950 mb-2">BOGO &amp; Volume Pricing Engine</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Easy creation of promotional schemes (e.g., Buy 2 Get 1 Free, flat ₹20 off above ₹999) that auto-apply at barcode scan.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-xs hover:border-slate-300 transition">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 mb-5">
                <Users size={22} />
              </div>
              <h3 className="font-extrabold text-lg text-slate-950 mb-2">Multi-Cashier Shift Handover</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Blind till audits at shift close to prevent cashier cash discrepancies. Cashiers count physical cash without viewing system figures.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-xs hover:border-slate-300 transition">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 mb-5">
                <Store size={22} />
              </div>
              <h3 className="font-extrabold text-lg text-slate-950 mb-2">Central Warehouse &amp; Branch Sync</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Seamless stock transfers and consolidated sales reports across multiple supermarket outlets with real-time godown tracking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          5. STANDARDIZED WHITE EDITORIAL TRUST CTA
      ══════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-slate-50/60 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex justify-center">
          <div className="max-w-[1180px] w-full min-h-[500px] rounded-[28px] overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-center gap-10 p-8 md:p-14 bg-white border border-slate-200 shadow-sm relative dark:bg-slate-900 dark:border-slate-800">
            {/* Background Visual Layers */}
            <div
              className="absolute inset-0 bg-cover bg-right opacity-100 z-1"
              style={{ backgroundImage: `url('${'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=1600&q=80'}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 lg:via-white/80 to-white/40 lg:to-transparent z-2 dark:from-slate-900 dark:via-slate-900/90 lg:dark:via-slate-900/80 dark:to-slate-900/40" />

            {/* Left Content Column */}
            <div className="lg:col-span-7 z-10 flex flex-col justify-center text-left">
              <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50/90 px-3.5 py-1 text-[11px] font-bold tracking-wider text-orange-800 uppercase w-max mb-4 dark:border-orange-900/40 dark:bg-orange-950/40 dark:text-orange-300">
                SUPERMARKET &amp; FMCG RETAIL OS
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-slate-900 tracking-tight leading-[1.18] dark:text-white">
                Clear Peak Rush Checkout in <span className="text-orange-600">Seconds Flat</span>
              </h2>
              <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl dark:text-slate-300">
                Handle split barcode scanning, direct digital weighing scale integration, loose grain gram-level inventory tracking, and local neighborhood WhatsApp deliveries with Priyulabs.
              </p>

              {/* Action Buttons with Working Routing */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center', marginBottom: '28px' }}>
                {/* Start Free Trial (Redirects to Home page trial section) */}
                <a
                  href="/#free-trial"
                  style={{ background: '#ea580c', color: '#ffffff', fontWeight: 600, fontSize: '14px', padding: '13px 26px', borderRadius: '14px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 12px rgba(234, 88, 12, 0.25)', transition: 'all 0.2s ease' }}
                >
                  Start Free Trial
                  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </a>

                {/* Chat on WhatsApp (Official Number: 7873844050) */}
                <a
                  href="https://wa.me/917873844050?text=Hi%20Priyulabs%2C%20I%20want%20to%20get%20started%20with%20a%20free%20trial"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ background: '#ffffff', color: '#0f172a', fontWeight: 600, fontSize: '14px', padding: '12px 22px', borderRadius: '14px', textDecoration: 'none', border: '1px solid #cbd5e1', display: 'inline-flex', alignItems: 'center', gap: '8px', boxShadow: '0 2px 6px rgba(0, 0, 0, 0.03)', transition: 'all 0.2s ease' }}
                >
                  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
                  Chat on WhatsApp
                </a>
              </div>

              {/* Left Bottom Trust Strip */}
              <div className="flex flex-wrap gap-5 text-[13px] font-semibold text-slate-700 mt-6 dark:text-slate-300">
                <span className="inline-flex items-center gap-2">
                  <svg width="15" height="15" fill="none" stroke="#ea580c" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Complete Setup
                </span>
                <span className="inline-flex items-center gap-2">
                  <svg width="15" height="15" fill="none" stroke="#ea580c" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Easy to access
                </span>
                <span className="inline-flex items-center gap-2">
                  <svg width="15" height="15" fill="none" stroke="#ea580c" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  24/7 Service
                </span>
              </div>
            </div>

            {/* Right Trust Stack (3-Card Verified Column) */}
            <div className="lg:col-span-5 flex flex-col gap-3.5 z-10 text-left">
              {/* Card 1 (National) */}
              <div className="rounded-2xl border border-slate-200/90 bg-white/95 backdrop-blur-md p-4 sm:p-5 shadow-xs flex items-center justify-between gap-4 dark:border-slate-800 dark:bg-slate-900/95">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#1e293b] text-white flex items-center justify-center shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="8" r="6" />
                      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white">Made in India</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Engineered for Indian Businesses</div>
                  </div>
                </div>
                <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-[11px] font-bold tracking-wider text-blue-700 uppercase shrink-0 dark:border-blue-900/40 dark:bg-blue-950/40 dark:text-blue-300">
                  National
                </span>
              </div>

              {/* Card 2 (Verified) */}
              <div className="rounded-2xl border border-slate-200/90 bg-white/95 backdrop-blur-md p-4 sm:p-5 shadow-xs flex items-center justify-between gap-4 dark:border-slate-800 dark:bg-slate-900/95">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#059669] text-white flex items-center justify-center shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#059669] dark:text-emerald-400">SECURE</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">SSL 256-Bit Bank Encryption</div>
                  </div>
                </div>
                <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold tracking-wider text-emerald-700 uppercase shrink-0 dark:border-emerald-900/40 dark:bg-emerald-950/40 dark:text-emerald-300">
                  Verified
                </span>
              </div>

              {/* Card 3 (Certified) */}
              <div className="rounded-2xl border border-slate-200/90 bg-white/95 backdrop-blur-md p-4 sm:p-5 shadow-xs flex items-center justify-between gap-4 dark:border-slate-800 dark:bg-slate-900/95">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#2563eb] text-white flex items-center justify-center shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white">Trusted by MSME's</div>
                    <div className="text-xs font-mono text-slate-500 dark:text-slate-400">Udyam: UDYAM-OD-19-0177979</div>
                  </div>
                </div>
                <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-[11px] font-bold tracking-wider text-amber-800 uppercase shrink-0 dark:border-amber-900/40 dark:bg-amber-950/40 dark:text-amber-300">
                  Certified
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          DEMO MODAL
      ══════════════════════════════════════════════════════════ */}
      {demoModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-xs"
          onClick={() => setDemoModalOpen(false)}
        >
          <div
            className="relative w-full max-w-md rounded-2xl bg-white p-7 text-left shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setDemoModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-lg"
            >
              ✕
            </button>
            <div className="text-[11px] font-black uppercase tracking-wider text-emerald-600">
              PRIYULABS RETAIL SUITE
            </div>
            <h3 className="mt-1 text-2xl font-black text-slate-950">
              Schedule a 15-Minute Retail Demo
            </h3>
            <p className="mt-1 text-xs text-slate-600 leading-relaxed">
              See how Priyulabs automates sub-second barcode scans, digital scale sync, and supplier reordering for your supermarket or Kirana.
            </p>

            <form onSubmit={handleDemoSubmit} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Store / Supermarket Name
                </label>
                <input
                  type="text"
                  required
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  placeholder="e.g. Balaji Supermarket"
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm font-medium text-slate-900 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  WhatsApp / Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={storePhone}
                  onChange={(e) => setStorePhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm font-medium text-slate-900 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Store Type
                </label>
                <select
                  value={storeType}
                  onChange={(e) => setStoreType(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm font-medium text-slate-900 focus:border-emerald-500 focus:outline-none bg-white"
                >
                  <option>Supermarket (2+ Billing Counters)</option>
                  <option>Modern Kirana &amp; Grocery Store</option>
                  <option>Wholesale &amp; Retail Grain Mart</option>
                  <option>Multi-Branch Retail Chain</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-slate-950 py-3 text-sm font-bold text-white shadow-md transition hover:bg-slate-800"
              >
                Confirm Walkthrough on WhatsApp &rarr;
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
