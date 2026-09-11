import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  Scan,
  Cpu,
  Store,
  CreditCard,
  Tv,
  CheckCircle2,
  ArrowRight,
  Zap,
  Tag,
  ShieldCheck,
  Building2,
  FileSpreadsheet,
  Layers,
  Sparkles,
  Smartphone,
  Truck,
  RotateCcw,
  Printer,
  QrCode,
  X,
  Play
} from 'lucide-react';

const pillarsData = [
  {
    id: 'pillar-pos',
    num: '01',
    badge: 'Live Invoicing Terminal',
    metric: '0.8s Barcode & Serial Scan',
    image: '/assets/electronics_imei_scan.jpg',
    alt: 'High speed barcode and serial scanning for electronics and mobile devices',
    title: 'Smart POS — Serial & Dual IMEI Invoicing, Instant GST & Warranty Auto-Push',
    points: [
      {
        icon: Scan,
        text: 'Scan dual-IMEI for smartphones, serial numbers for 4K Smart TVs, and compressor barcodes for inverter ACs.',
      },
      {
        icon: FileSpreadsheet,
        text: 'Auto-populates serialized GST tax invoices with exact HSN codes (8418, 8450, 8528, 8517) and statutory tax splits.',
      },
      {
        icon: ShieldCheck,
        text: 'Instant WhatsApp warranty invoice dispatch directly sends official digital receipt, warranty card, and user manual.',
      },
      {
        icon: Zap,
        text: 'Anti-duplicate validation checks serial numbers against historical sales to prevent billing already-sold appliances.',
      },
    ],
  },
  {
    id: 'pillar-inventory',
    num: '02',
    badge: 'Showroom & Godown Sync',
    metric: 'Real-time Serial Reconciliation',
    image: '/assets/electronics_stock_audit.jpg',
    alt: 'Electronics showroom stock audit and warehouse serial level inventory management',
    title: 'Serial & Warehouse Inventory — Serialized Batch Audits & Reorder Alerts',
    points: [
      {
        icon: Layers,
        text: 'Track individual serialized units across display showroom floors, backroom stock, and remote distribution godowns.',
      },
      {
        icon: Cpu,
        text: 'Multi-variant management tracks screen sizes, energy star ratings (3-Star vs 5-Star), storage, and color variants.',
      },
      {
        icon: Sparkles,
        text: 'Automated distributor reorder triggers send purchase alerts before high-demand festive seasons (Diwali, Summer AC rush).',
      },
      {
        icon: Tag,
        text: 'Instant stock audit mode lets staff reconcile 1,000+ appliance cartons via handheld wireless laser barcode scanners.',
      },
    ],
  },
  {
    id: 'pillar-multistore',
    num: '03',
    badge: 'Unified Enterprise Hub',
    metric: 'Scheduled Delivery & Installation',
    image: '/assets/electronics_appliances_showroom.jpg',
    alt: 'Consumer electronics showroom displaying 4K Smart TVs, refrigerators, washing machines and laptops',
    title: 'Multi-Store & Home Appliance Operations — Delivery, Installation & Extended Care',
    points: [
      {
        icon: Building2,
        text: 'Multi-branch appliance transfers transfer high-value display units between branches with tamper-evident digital gate passes.',
      },
      {
        icon: Truck,
        text: 'Scheduled doorstep delivery and technician installation booking with technician assignment and GPS dispatch tracking.',
      },
      {
        icon: ShieldCheck,
        text: 'Integrated extended warranty and insurance add-ons (Bajaj Allianz, OneAssist, ResQ) with automated commission tracking.',
      },
      {
        icon: Store,
        text: 'Role-based permissions restrict salesperson discount allowances while granting store managers price override approvals.',
      },
    ],
  },
  {
    id: 'pillar-finance',
    num: '04',
    badge: 'Sub-60s EMI Approvals',
    metric: 'Instant Bank & NBFC Cashback',
    image: '/assets/electronics_emi_checkout.jpg',
    alt: 'Customer completing paperless EMI finance approval and split payment checkout at electronics store',
    title: 'Instant Paperless Finance & POS Hub — Zero-Down EMI & Exchange Trade-In',
    points: [
      {
        icon: CreditCard,
        text: 'Direct API integration with Bajaj Finserv, HDB Financial, TVS Credit, and Pine Labs for zero-delay paperless financing.',
      },
      {
        icon: Sparkles,
        text: 'Automated brand cashback calculation and festive OEM spot discounts applied instantly without manual calculation sheets.',
      },
      {
        icon: QrCode,
        text: 'Multi-tender split settlement across credit card swipe, UPI QR code, finance voucher, and cash in a single checkout.',
      },
      {
        icon: RotateCcw,
        text: 'Built-in appliance and old gadget trade-in grading system deducts exchange discount and logs customer identification.',
      },
    ],
  },
];

export function ElectronicsMobileShopsPage() {
  const [activePillar, setActivePillar] = useState(0);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [storeName, setStoreName] = useState('');
  const [phone, setPhone] = useState('');
  const [storeType, setStoreType] = useState('Consumer Electronics Showroom');

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you! Our retail solutions specialist will reach out on WhatsApp within 15 minutes.');
    setDemoModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-emerald-500 selection:text-white">
      {/* ══════════════════════════════════════════════════════════
          1. HERO SECTION (Electronics & Mobile Editorial)
      ══════════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-5 pt-16 pb-14 sm:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/80 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-emerald-800 shadow-xs"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
            CONSUMER ELECTRONICS, HOME APPLIANCES &amp; MOBILE RETAIL OS
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-4xl font-black tracking-tight text-slate-950 sm:text-6xl max-w-4xl mx-auto leading-[1.08]"
          >
            Every Serial &amp; Dual IMEI Tracked. Instant EMI.{' '}
            <span className="text-emerald-600">Zero Warranty Disputes.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 max-w-3xl mx-auto text-base text-slate-600 sm:text-lg leading-relaxed font-normal"
          >
            The specialized retail management engine built for consumer electronics showrooms, home appliance megastores, and mobile shops — engineered for 4K Smart TVs, inverter refrigerators, laptops, and smartphones with sub-second serial scanning, paperless Bajaj/Pine Labs EMI checkout, and automated GST warranty dispatch.
          </motion.p>

          {/* Dual CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="/#cta"
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-7 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-slate-800 hover:-translate-y-0.5"
            >
              Get Started Today
              <ArrowRight size={16} />
            </a>
            <a
              href="#pillars"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-7 py-3.5 text-sm font-bold text-slate-800 transition hover:bg-slate-50 no-underline cursor-pointer"
            >
              <Zap size={16} className="text-emerald-600" />
              See Electronics Billing Speed
            </a>
          </motion.div>

          {/* Square-Style 3-Panel Hero Triptych (Product | Customer | Counter) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-14 max-w-6xl mx-auto overflow-hidden rounded-3xl border border-slate-200 shadow-2xl bg-slate-950 grid grid-cols-1 md:grid-cols-3 h-auto md:h-[500px] relative text-left"
          >
            {/* Panel 1: The Product */}
            <div
              onClick={() => setDemoModalOpen(true)}
              className="group relative h-[320px] md:h-full overflow-hidden border-b-2 md:border-b-0 md:border-r-2 border-white cursor-pointer"
            >
              <img
                src="/assets/electronics_showroom_display.jpg"
                alt="Premium electronics products on display pedestals with flagship smartphones, smartwatches, and gadgets"
                style={{ objectPosition: '50% 65%' }}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Panel 2: The Customer Experience */}
            <div
              onClick={() => setDemoModalOpen(true)}
              className="group relative h-[320px] md:h-full overflow-hidden border-b-2 md:border-b-0 md:border-r-2 border-white cursor-pointer"
            >
              <img
                src="/assets/electronics_tv_appliances.jpg"
                alt="Indian customer family consulting with showroom advisor in consumer electronics and home appliances store"
                style={{ objectPosition: '68% 42%' }}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Panel 3: The Billing Counter & Payment */}
            <div
              onClick={() => setDemoModalOpen(true)}
              className="group relative h-[320px] md:h-full overflow-hidden cursor-pointer"
            >
              <img
                src="/assets/electronics_emi_checkout.jpg"
                alt="Customer tapping credit card on POS payment terminal for instant paperless EMI approval at checkout counter"
                style={{ objectPosition: '58% 50%' }}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-4 right-4 rounded-xl bg-white p-2 shadow-xl flex items-center justify-center">
                <img src="/assets/logo.svg" alt="Priyulabs" className="h-5 w-5" />
              </div>
            </div>
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
              Built for Consumer Electronics &amp; Mobile Realities
            </span>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl text-slate-950">
              The 4 Pillars of High-Velocity Electronics Retail
            </h2>
            <p className="mt-4 text-base text-slate-600 sm:text-lg">
              Engineered to eliminate warranty claim disputes, accelerate paperless consumer finance approvals, and maintain flawless serial-level traceability from wholesale intake to customer delivery.
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
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-slate-950/30" />

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
                    {p.num} {idx === 0 ? 'Smart POS' : idx === 1 ? 'Serial & Stock' : idx === 2 ? 'Multi-Store' : 'Finance & EMI'}
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
          3. HARDWARE & PERIPHERAL COMPATIBILITY (Zero Lock-in)
      ══════════════════════════════════════════════════════════ */}
      <section className="bg-slate-50 py-20 border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-600">
              Zero Hardware Lock-In
            </span>
            <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-4xl text-slate-950">
              Plug-and-Play Electronics Store Counter Hardware
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              Seamless driver-free compatibility with your existing laser barcode guns, PIN pad payment terminals, and wide GST invoice laser printers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-900 mb-4">
                <Scan size={22} />
              </div>
              <h4 className="font-bold text-base text-slate-950 mb-2">2D / QR Barcode Scanners</h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                High-density 2D laser scanners capable of reading tiny dual-IMEI barcodes on smartphone boxes and serialized labels on heavy appliance cartons.
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">Zebra DS2208</span>
                <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">Honeywell Xenon</span>
                <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">TVS Electronics</span>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-900 mb-4">
                <CreditCard size={22} />
              </div>
              <h4 className="font-bold text-base text-slate-950 mb-2">EMI &amp; Card Terminals</h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Direct integration with leading Android EDC smart swipe machines for instant paperless NBFC finance approvals and multi-bank EMI.
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">Pine Labs Plutus</span>
                <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">Paytm EDC</span>
                <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">Mswipe</span>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-900 mb-4">
                <Printer size={22} />
              </div>
              <h4 className="font-bold text-base text-slate-950 mb-2">A4 GST &amp; Thermal Printers</h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Instant printing of full A4 serialized GST invoices with OEM terms for home appliances, or 3-inch thermal receipts for fast accessory sales.
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">HP LaserJet</span>
                <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">Canon</span>
                <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">Epson Thermal</span>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-900 mb-4">
                <Store size={22} />
              </div>
              <h4 className="font-bold text-base text-slate-950 mb-2">Touch POS &amp; Windows PCs</h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Run our lightning-fast desktop client on your existing counter Windows desktop, laptop, or dedicated commercial touchscreen POS terminal.
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">Windows 10/11</span>
                <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">Posiflex</span>
                <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">Sunmi D2</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          4. COMPARISON MATRIX (Why Priyulabs Beats Legacy Software)
      ══════════════════════════════════════════════════════════ */}
      <section className="py-24 border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-600">
              The Technology Upgrade
            </span>
            <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl text-slate-950">
              Why Electronics Retailers Switch to Priyulabs
            </h2>
            <p className="mt-3 text-base text-slate-600">
              See how Priyulabs eliminates the daily bottlenecks caused by generic retail software and legacy desktop billing systems.
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
            <div className="grid grid-cols-12 bg-slate-900 text-white font-bold text-xs uppercase tracking-wider py-4 px-6">
              <div className="col-span-5">Operational Capability</div>
              <div className="col-span-3 text-center text-slate-400">Generic Retail POS</div>
              <div className="col-span-4 text-center text-emerald-400">Priyulabs Electronics OS</div>
            </div>

            <div className="divide-y divide-slate-100 text-sm">
              <div className="grid grid-cols-12 items-center py-4 px-6 hover:bg-slate-50 transition">
                <div className="col-span-5 font-semibold text-slate-900">
                  Dual-IMEI &amp; Serial Barcode Scan
                  <div className="text-xs font-normal text-slate-500">Capture 2 IMEIs and appliance serial in 1 laser swipe</div>
                </div>
                <div className="col-span-3 text-center text-rose-600 font-medium text-xs">Manual Entry (Slow)</div>
                <div className="col-span-4 text-center font-bold text-emerald-600 text-xs">✓ Sub-Second Automated Scan</div>
              </div>

              <div className="grid grid-cols-12 items-center py-4 px-6 hover:bg-slate-50 transition">
                <div className="col-span-5 font-semibold text-slate-900">
                  Paperless Bajaj &amp; NBFC EMI
                  <div className="text-xs font-normal text-slate-500">Zero-down financing OTP verification on counter screen</div>
                </div>
                <div className="col-span-3 text-center text-rose-600 font-medium text-xs">Separate Portal (10+ mins)</div>
                <div className="col-span-4 text-center font-bold text-emerald-600 text-xs">✓ Direct POS API Integration</div>
              </div>

              <div className="grid grid-cols-12 items-center py-4 px-6 hover:bg-slate-50 transition">
                <div className="col-span-5 font-semibold text-slate-900">
                  Automated Digital Warranty Auto-Push
                  <div className="text-xs font-normal text-slate-500">Sends warranty card and tax invoice to customer WhatsApp</div>
                </div>
                <div className="col-span-3 text-center text-rose-600 font-medium text-xs">Paper Only (Disputes)</div>
                <div className="col-span-4 text-center font-bold text-emerald-600 text-xs">✓ WhatsApp e-Warranty Card</div>
              </div>

              <div className="grid grid-cols-12 items-center py-4 px-6 hover:bg-slate-50 transition">
                <div className="col-span-5 font-semibold text-slate-900">
                  Home Delivery &amp; Technician Dispatch
                  <div className="text-xs font-normal text-slate-500">Schedule AC/TV installation with technician tracking</div>
                </div>
                <div className="col-span-3 text-center text-rose-600 font-medium text-xs">Paper Registers</div>
                <div className="col-span-4 text-center font-bold text-emerald-600 text-xs">✓ Automated Dispatch &amp; Tracking</div>
              </div>

              <div className="grid grid-cols-12 items-center py-4 px-6 hover:bg-slate-50 transition">
                <div className="col-span-5 font-semibold text-slate-900">
                  Multi-Branch Serial Transfers
                  <div className="text-xs font-normal text-slate-500">Digital gate passes between showroom and remote godowns</div>
                </div>
                <div className="col-span-3 text-center text-rose-600 font-medium text-xs">Manual Excel Sheets</div>
                <div className="col-span-4 text-center font-bold text-emerald-600 text-xs">✓ Real-time Centralized Hub</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          5. BOTTOM CONVERSION CTA
      ══════════════════════════════════════════════════════════ */}
      <section className="bg-slate-950 py-20 text-white relative overflow-hidden">
        <div className="mx-auto max-w-5xl px-5 sm:px-8 text-center relative z-10">
          <span className="inline-block rounded-full bg-emerald-500/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-400 border border-emerald-500/30">
            Rapid 1-Day Showroom Setup
          </span>
          <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
            Upgrade Your Electronics Showroom Today
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
            Join leading consumer electronics dealerships, multi-brand appliance showrooms, and mobile retail chains growing profitability with Priyulabs.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="/#cta"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-8 py-4 text-sm font-black text-slate-950 shadow-lg shadow-emerald-500/20 hover:bg-emerald-400 transition"
            >
              Get Started Now
              <ArrowRight size={16} />
            </a>
            <button
              onClick={() => setDemoModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-8 py-4 text-sm font-bold text-white hover:bg-slate-800 transition"
            >
              Schedule In-Store Demo
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          DEMO MODAL
      ══════════════════════════════════════════════════════════ */}
      {demoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setDemoModalOpen(false)}
              className="absolute right-4 top-4 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            >
              <X size={20} />
            </button>

            <div className="text-center mb-6">
              <span className="inline-block rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-800">
                Priyulabs Electronics POS Demo
              </span>
              <h3 className="mt-2 text-2xl font-black text-slate-950">
                Request an In-Store Walkthrough
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-slate-600">
                Our retail specialist will demonstrate serial tracking, paperless EMI, and WhatsApp e-warranty billing on your hardware.
              </p>
            </div>

            <form onSubmit={handleDemoSubmit} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Showroom / Shop Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vijay Electronics &amp; Appliances"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-emerald-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  WhatsApp Contact Number
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-emerald-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Store Format
                </label>
                <select
                  value={storeType}
                  onChange={(e) => setStoreType(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-emerald-500 focus:outline-hidden"
                >
                  <option>Consumer Electronics Showroom (TV, Fridge, AC)</option>
                  <option>Multi-Brand Mobile &amp; Gadget Store</option>
                  <option>IT, Laptops &amp; Computer Outlets</option>
                  <option>Multi-Store Electronics Chain</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-slate-900 py-3.5 text-sm font-bold text-white shadow-md hover:bg-slate-800 transition"
              >
                Schedule WhatsApp Demo Walkthrough ↵
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
export default ElectronicsMobileShopsPage;
