import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  Scale,
  ShieldCheck,
  Gem,
  Coins,
  ArrowRight,
  Zap,
  Sparkles,
  RotateCcw,
  Printer,
  QrCode,
  X,
  Watch,
  Eye,
  Calendar,
  Layers,
  FileSpreadsheet,
  CheckCircle2,
  SlidersHorizontal,
  Smartphone,
  Tag
} from 'lucide-react';

const pillarsData = [
  {
    id: 'pillar-pos',
    num: '01',
    badge: 'Precision Invoicing',
    metric: 'Sub-0.001g Precision Scale Integration',
    image: '/assets/jewellery_pos_scale.jpg',
    alt: 'Showroom attendant placing gold necklace on precision balance at jewellery billing counter',
    title: 'Smart POS — Weight-Scale Sync, Making Charges & Purity Invoicing',
    points: [
      {
        icon: Scale,
        text: 'Direct RS-232/USB milligram-precision scale sync with automatic Gross-to-Net stone weight tare.',
      },
      {
        icon: Coins,
        text: 'Flexible making charge structures: fixed per gram, percentage of metal value, or piece-rate flat cost.',
      },
      {
        icon: ShieldCheck,
        text: 'Full HUID / BIS Hallmarking and diamond certification (GIA/IGI) tag attachment on legal GST invoices.',
      },
      {
        icon: Zap,
        text: '100% offline continuous operation ensures billing counters never freeze during internet drops.',
      },
    ],
  },
  {
    id: 'pillar-vault',
    num: '02',
    badge: 'Vault Reconciliation',
    metric: '100% Daily Vault Reconciliation',
    image: '/assets/jewellery_vault_audit.jpg',
    alt: 'Store manager and security officer auditing gold and diamond trays in showroom vault with RFID scanner wand',
    title: 'Complete Management System — Vault Audit, Karigar Ledger & Old Gold',
    points: [
      {
        icon: ShieldCheck,
        text: 'Complete metal reconciliation: track gold, silver, and platinum balances across vault counters and display trays.',
      },
      {
        icon: RotateCcw,
        text: 'Inward old gold with melting loss, chemical purity testing, and automated customer credit note calculation.',
      },
      {
        icon: Layers,
        text: 'Karigar / Artisan job-work ledger: track raw metal issued, finished ornaments returned, and wastage allowance.',
      },
      {
        icon: Zap,
        text: 'Daily morning and night vault tray audits using wireless RFID scanning guns.',
      },
    ],
  },
  {
    id: 'pillar-catalog',
    num: '03',
    badge: 'VIP Digital Lounge',
    metric: '3.2x Direct Showroom VIP Appointments',
    image: '/assets/jewellery_digital_catalog.jpg',
    alt: 'VIP clients in luxury salon reviewing digital jewelry catalog and luxury watch collections on tablet',
    title: 'Custom Website & Digital Showroom — High-Trust Showcase & Video Shopping',
    points: [
      {
        icon: Gem,
        text: 'Elegant, high-resolution digital storefront displaying real-time showroom collections with live price updates based on daily metal rates.',
      },
      {
        icon: Eye,
        text: '"Book a Private Showroom Viewing" or "Schedule WhatsApp Video Call Walkthrough" for high-ticket clients.',
      },
      {
        icon: Watch,
        text: 'Luxury watch catalog with serial authenticity validation and extended warranty registration.',
      },
      {
        icon: Calendar,
        text: 'Secure advance booking portal for auspicious days (Akshaya Tritiya, Dhanteras, Wedding seasons).',
      },
    ],
  },
  {
    id: 'pillar-scheme',
    num: '04',
    badge: 'Gold Savings Scheme',
    metric: '45% Higher Gold Scheme Enrollments',
    image: '/assets/jewellery_gold_scheme.jpg',
    alt: 'Customer reviewing monthly Swarna Nidhi gold savings passbook and smartphone UPI installment confirmation',
    title: 'Digital Marketing & Gold Schemes — 11-Month Monthly Kitty & Festival Ads',
    points: [
      {
        icon: Coins,
        text: 'Built-in Digi-Gold / Swarna Nidhi monthly savings scheme module with automated UPI installment collection reminders.',
      },
      {
        icon: Sparkles,
        text: 'Hyper-local geo-targeted Meta & Google ads targeting high-income wedding households within a 10 km radius.',
      },
      {
        icon: Smartphone,
        text: 'Automated WhatsApp triggers for client wedding anniversaries, birthdays, and customized festive bullion offers.',
      },
      {
        icon: ShieldCheck,
        text: 'VIP rewards and loyalty points redeemable on diamond jewellery making charges and luxury watch servicing.',
      },
    ],
  },
];

const hardwareList = [
  {
    title: 'Milligram High-Precision Balances',
    desc: 'Seamless zero-error RS-232 & USB integration with certified lab-grade weighing balances. Instant stone weight tare.',
    models: 'Essae, Citizen, Sartorius, Ohaus Certified Scales',
    tag: 'Lab-Grade 0.001g Precision',
  },
  {
    title: 'RFID & Micro-Tag Scanners',
    desc: 'Handheld RFID wands and 2D micro-barcode readers for dumbbell jewellery tags and watch strap barcode labels.',
    models: 'Zebra, Honeywell, Chainway, Newland Micro-Scanners',
    tag: 'Instant Tray Bulk Scans',
  },
  {
    title: 'Specialized Dumbbell Tag Printers',
    desc: 'High-definition 300 DPI thermal transfer printers designed for non-tear jewellery labels and fine watch tags.',
    models: 'Argox, TSC, Citizen, Zebra Thermal Printers',
    tag: 'Heat & Sonic-Proof Tags',
  },
  {
    title: 'Touch Showroom POS & Cash Drawers',
    desc: 'Sleek countertop terminals with multi-tier cashier authorization, high-speed receipt printing, and secure cash drawers.',
    models: 'Posiflex, Sunmi, Epson, TVS Counter POS',
    tag: 'Multi-Cashier Dual Auth',
  },
];

const sectorMatrix = [
  {
    title: 'Live Daily Metal Rate Ticker',
    desc: 'Update 24K, 22K, 18K gold and silver rates once, and all showroom prices auto-calculate instantly across counters and digital screens.',
    badge: 'Real-Time Sync',
  },
  {
    title: 'Gross, Stone & Net Breakdown',
    desc: 'Clear line-item invoice transparency separating metal weight, stone weight, diamond carats, and making fees on every bill.',
    badge: '100% Tax Transparency',
  },
  {
    title: 'HUID & BIS Hallmarking Compliance',
    desc: 'Print mandatory 6-digit alphanumeric HUID stamps directly on customer tax invoices with automated BIS portal verification.',
    badge: 'Legal BIS Ready',
  },
  {
    title: 'Karigar Issue & Wastage Ledger',
    desc: 'Keep tabs on raw gold issued to goldsmiths and calculate fine gold return margins accurately with defined loss allowances.',
    badge: 'Zero Gold Leakage',
  },
  {
    title: 'Old Gold Purchase & Exchange',
    desc: 'Automated purity slip generation, melting deduction rules, and KYC documentation upload for frictionless customer trade-ins.',
    badge: 'Instant Valuation Slip',
  },
  {
    title: '11+1 Monthly Jewellery Kitty Scheme',
    desc: 'Manage monthly customer gold plan subscriptions with automated payment links, bank mandates, and maturity passbooks.',
    badge: 'High-Retention Engine',
  },
];

export function JewelleryWatchOutletsPage() {
  const [activePillar, setActivePillar] = useState(0);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [storeName, setStoreName] = useState('');
  const [phone, setPhone] = useState('');
  const [storeType, setStoreType] = useState('Gold & Diamond Jewellery Showroom');

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you! Our jewellery retail solutions specialist will reach out on WhatsApp within 15 minutes.');
    setDemoModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-emerald-500 selection:text-white">
      {/* ══════════════════════════════════════════════════════════
          1. HERO SECTION (Jewellery & Watch Editorial)
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
            JEWELLERY SHOWROOMS &amp; WATCH OUTLETS RETAIL OS
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-4xl font-black tracking-tight text-slate-950 sm:text-6xl max-w-4xl mx-auto leading-[1.08]"
          >
            Gram-Precise Weighing. Live Bullion Rates.{' '}
            <span className="text-emerald-600">Zero Melting Discrepancies.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 max-w-3xl mx-auto text-base text-slate-600 sm:text-lg leading-relaxed font-normal"
          >
            The specialized enterprise platform built for gold showrooms, diamond boutiques, and luxury watch outlets — engineered for automated purity calculations, making-charge matrices, hallmark certification, and zero-leakage vault inventory.
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
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-7 py-3.5 text-sm font-bold text-slate-800 transition hover:bg-slate-50 no-underline cursor-pointer shadow-xs"
            >
              <Zap size={16} className="text-emerald-600" />
              See Jewellery Billing Speed
            </a>
          </motion.div>

          {/* Live Simulated Counter Mockup (3-Panel Card Grid) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-14 overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200 bg-white shadow-2xl text-left"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between bg-slate-950 px-5 py-3 text-xs font-semibold text-white">
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                <span>LIVE COUNTER #01 • JEWELLERY &amp; BULLION BILLING</span>
                <span className="hidden sm:inline rounded bg-slate-800 px-2 py-0.5 text-[11px] font-mono text-emerald-300">
                  SCALE SYNCED (0.001g)
                </span>
                <span className="hidden sm:inline rounded bg-slate-800 px-2 py-0.5 text-[11px] font-mono text-emerald-300">
                  BIS HUID VERIFIED
                </span>
              </div>
              <div className="text-slate-400">Vault Session: #VLT-9024</div>
            </div>

            {/* Dashboard Grid (3 Columns) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 bg-slate-50">
              {/* Col 1: Rapid Jewellery Barcode & Tag Feed (5 cols) */}
              <div className="lg:col-span-5 p-5 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200">
                    <span className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                      <Scale size={14} className="text-amber-600" /> Rapid Jewellery Barcode &amp; Tag Feed
                    </span>
                    <span className="rounded bg-emerald-100 px-2 py-0.5 text-[11px] font-bold text-emerald-800">
                      Sub-Second Scan
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="rounded-xl border border-amber-300 bg-amber-50/50 p-3 shadow-xs">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-bold text-sm text-slate-900">22K Floral Gold Necklace</div>
                          <div className="text-xs font-mono text-slate-600 mt-0.5">Gross: 24.620g | Stone: 1.150g | Net: 23.470g</div>
                          <div className="mt-1 flex gap-1.5 flex-wrap">
                            <span className="rounded bg-amber-200 px-1.5 py-0.2 text-[10px] font-bold text-amber-900">HUID: AH8976</span>
                            <span className="rounded bg-emerald-100 px-1.5 py-0.2 text-[10px] font-bold text-emerald-800">22K (916 Purity)</span>
                          </div>
                        </div>
                        <div className="font-black text-sm text-slate-900">₹1,53,610.00</div>
                      </div>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-2xs">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-bold text-sm text-slate-900">Tissot PRX Powermatic 80</div>
                          <div className="text-xs font-mono text-slate-600 mt-0.5">Serial: W7654312 | 2-Yr International Warranty</div>
                          <div className="mt-1 flex gap-1.5">
                            <span className="rounded bg-blue-100 px-1.5 py-0.2 text-[10px] font-bold text-blue-800">Swiss Automatic</span>
                          </div>
                        </div>
                        <div className="font-black text-sm text-slate-900">₹58,500.00</div>
                      </div>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-2xs">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-bold text-sm text-slate-900">18K Diamond Solitaire Ring</div>
                          <div className="text-xs font-mono text-slate-600 mt-0.5">0.75ct VVS1 | IGI Certified #IGI-89102</div>
                        </div>
                        <div className="font-black text-sm text-slate-900">₹34,870.00</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span>3 Items Scanned</span>
                  <strong className="text-slate-900">Gross Metal: 24.620g</strong>
                </div>
              </div>

              {/* Col 2: Live Bullion Rate & Making Charges Ticker (4 cols) */}
              <div className="lg:col-span-4 p-5 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col justify-between bg-white/70">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200">
                    <span className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                      <Coins size={14} className="text-amber-500" /> Live Bullion Rate &amp; Making Ticker
                    </span>
                    <span className="rounded bg-amber-100 px-2 py-0.5 text-[11px] font-bold text-amber-800">
                      Synced Live
                    </span>
                  </div>

                  <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-3.5 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-700">Gold 24K (999 Purity):</span>
                      <strong className="text-amber-900 font-mono font-black text-sm">₹7,140 / gram</strong>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-700">Gold 22K (916 Purity):</span>
                      <strong className="text-amber-900 font-mono font-black text-sm">₹6,545 / gram</strong>
                    </div>
                    <div className="flex justify-between items-center text-xs border-t border-amber-200/60 pt-1.5">
                      <span className="text-slate-600">Making Charges Applied:</span>
                      <strong className="text-slate-900">₹480 / gram</strong>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-600">Hallmarking Fee (BIS):</span>
                      <strong className="text-emerald-700">₹45.00</strong>
                    </div>
                  </div>

                  <div className="mt-3 rounded-xl border border-dashed border-emerald-300 bg-emerald-50/50 p-3 text-xs">
                    <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                      <ShieldCheck size={14} className="text-emerald-700" />
                      Zero Melting Discrepancy Guarantee
                    </div>
                    <div className="text-slate-600 mt-1 text-[11px]">
                      Karatmeter tested purity: 91.6% exact match on inner ring hallmark stamp.
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span>Silver 999: ₹86.50/g</span>
                  <span className="font-bold text-emerald-600">✓ Bullion API Connected</span>
                </div>
              </div>

              {/* Col 3: 1-Tap Settlement & Old Gold Exchange (3 cols) */}
              <div className="lg:col-span-3 p-5 flex flex-col justify-between bg-white">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200">
                    <span className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                      <RotateCcw size={14} className="text-emerald-600" /> 1-Tap Settlement &amp; Exchange
                    </span>
                    <span className="rounded bg-emerald-100 px-2 py-0.5 text-[11px] font-bold text-emerald-800">
                      1-Tap Bill
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-600">
                    <div className="flex justify-between">
                      <span>Subtotal (Selected Items):</span>
                      <span className="font-bold text-slate-900">₹1,68,900.00</span>
                    </div>
                    <div className="flex justify-between text-emerald-700 font-semibold bg-emerald-50/80 p-1.5 rounded-lg border border-emerald-100">
                      <div>
                        <div>Old Gold 22K Exchange:</div>
                        <div className="text-[10px] text-emerald-800 font-mono">(12.200g @ ₹6,400/g)</div>
                      </div>
                      <span className="font-bold self-center">-₹78,080.00</span>
                    </div>
                    <div className="flex justify-between border-t border-slate-200 pt-2 text-base font-black text-slate-900">
                      <span>Final Payable Total:</span>
                      <span className="text-emerald-600">₹90,820.00</span>
                    </div>
                  </div>

                  <div className="my-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-2.5 text-center">
                    <div className="text-[10.5px] font-bold uppercase tracking-wider text-blue-700">
                      Multi-Tender Split Ready
                    </div>
                    <div className="mt-0.5 text-xs font-black text-slate-900">
                      ₹50,000 Card + ₹40,820 Dynamic UPI
                    </div>
                    <div className="mt-1 text-[10.5px] font-bold text-emerald-600">
                      ✓ Instant Soundbox Voice Confirmation
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setDemoModalOpen(true)}
                  className="w-full rounded-xl bg-slate-900 py-3 text-xs font-bold text-white shadow-sm transition hover:bg-slate-800"
                >
                  Auto-Print Legal Hallmarked GST Invoice ↵
                </button>
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
              The 4 Pillars of Modern Jewellery Retail
            </span>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl text-slate-950">
              Engineered for Gold Showrooms, Diamond Boutiques &amp; Watch Salons
            </h2>
            <p className="mt-4 text-base text-slate-600 sm:text-lg">
              Eliminate melting loss disputes, automate HUID hallmarking compliance, and maintain zero-leakage vault stock visibility with milligram precision.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Sticky Media Showcase */}
            <div className="lg:col-span-6 lg:sticky lg:top-28">
              <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-900 shadow-2xl">
                <div className="relative h-[380px] sm:h-[460px] w-full overflow-hidden">
                  <motion.img
                    key={activePillar}
                    src={pillarsData[activePillar].image}
                    alt={pillarsData[activePillar].alt}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                  {/* Top Status Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="rounded-full bg-slate-900/85 backdrop-blur-md px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-widest text-emerald-400 border border-white/20">
                      PILLAR {pillarsData[activePillar].num} • {pillarsData[activePillar].badge}
                    </span>
                  </div>

                  {/* Bottom Metric Pill */}
                  <div className="absolute bottom-4 left-4 right-4 z-10">
                    <div className="inline-flex items-center gap-2 rounded-xl bg-slate-900/90 backdrop-blur-md px-4 py-2 text-xs font-bold text-white border border-white/10 shadow-lg">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                      {pillarsData[activePillar].metric}
                    </div>
                  </div>
                </div>

                {/* 4-Tab Interactive Switcher */}
                <div className="grid grid-cols-4 border-t border-white/10 bg-slate-950/95 p-1.5">
                  {pillarsData.map((p, idx) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        setActivePillar(idx);
                        const el = document.getElementById(p.id);
                        if (el) {
                          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                      }}
                      className={`rounded-xl py-2.5 px-1 text-center text-xs font-bold transition-all ${
                        activePillar === idx
                          ? 'bg-emerald-500 text-white shadow-md'
                          : 'text-slate-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span className="block text-[10px] opacity-75">{p.num}</span>
                      <span className="truncate block font-extrabold">
                        {idx === 0 && 'Smart POS'}
                        {idx === 1 && 'Bullion & Vault'}
                        {idx === 2 && 'Digital Catalog'}
                        {idx === 3 && 'Gold Scheme'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: 4 Concise Points with Sleek Line Icons */}
            <div className="lg:col-span-6 space-y-16">
              {pillarsData.map((pillar, pIdx) => (
                <div
                  key={pillar.id}
                  id={pillar.id}
                  onMouseEnter={() => setActivePillar(pIdx)}
                  className="rounded-3xl border border-slate-200 bg-slate-50/50 p-6 sm:p-8 transition-colors hover:border-emerald-300"
                >
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-emerald-100 px-3 py-1 font-mono text-xs font-black text-emerald-800">
                      {pillar.num}
                    </span>
                    <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="mt-3 text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                    {pillar.title}
                  </h3>

                  <div className="mt-6 space-y-4">
                    {pillar.points.map((pt, ptIdx) => {
                      const IconComp = pt.icon;
                      return (
                        <div key={ptIdx} className="flex items-start gap-3.5">
                          <div className="mt-0.5 rounded-lg bg-emerald-100 p-1.5 text-emerald-700 shrink-0">
                            <IconComp size={16} />
                          </div>
                          <p className="text-sm font-medium text-slate-700 leading-relaxed">
                            {pt.text}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-700">
                      {pillar.metric}
                    </span>
                    <button
                      onClick={() => setDemoModalOpen(true)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-slate-900 hover:text-emerald-600 transition"
                    >
                      See {pillar.badge} in action →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          3. HARDWARE INTEGRATION BAR (4 Columns)
      ══════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-slate-50 border-b border-slate-200" id="hardware">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block rounded-full bg-emerald-100/70 border border-emerald-300 px-3 py-0.5 text-xs font-bold uppercase tracking-wider text-emerald-900">
              Hardware Compatibility
            </span>
            <h2 className="mt-3 text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
              Plug &amp; Play Jewellery Hardware Integration
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              Certified zero-driver connection for precision balances, RFID wands, dumbbell tag printers, and heavy-duty cash drawers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hardwareList.map((hw, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block rounded bg-slate-100 px-2.5 py-1 text-[11px] font-extrabold text-slate-700 mb-3">
                    {hw.tag}
                  </span>
                  <h4 className="font-extrabold text-base text-slate-900">{hw.title}</h4>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">{hw.desc}</p>
                </div>
                <div className="mt-5 pt-3 border-t border-slate-100 text-[11px] font-mono text-slate-500">
                  {hw.models}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          4. SECTOR MATRIX (6 Clean Cards)
      ══════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-white border-b border-slate-200" id="features">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-800">
              Showroom Infrastructure
            </span>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl text-slate-950">
              Complete Jewellery &amp; Watch Operations Matrix
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Everything required to run multi-branch gold showrooms, bridal diamond studios, and luxury horology outlets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sectorMatrix.map((item, idx) => (
              <div
                key={idx}
                className="group rounded-3xl border border-slate-200 bg-slate-50/40 p-7 transition hover:border-emerald-300 hover:bg-white hover:shadow-md"
              >
                <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-extrabold text-emerald-800">
                  {item.badge}
                </span>
                <h4 className="mt-4 text-lg font-black text-slate-900 group-hover:text-emerald-700 transition">
                  {item.title}
                </h4>
                <p className="mt-2.5 text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          5. BOTTOM CONVERSION BANNER (Dark Modern Container)
      ══════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white" id="contact">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="rounded-3xl bg-slate-950 p-8 sm:p-14 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-radial from-emerald-600/10 via-transparent to-transparent pointer-events-none" />
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white max-w-2xl mx-auto">
              Ready to run your jewellery showroom with milligram accuracy?
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto">
              Powering heritage jewellers, diamond boutiques, and luxury watch retailers across India.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => setDemoModalOpen(true)}
                className="rounded-xl bg-emerald-500 px-8 py-3.5 text-sm font-extrabold text-white shadow-lg transition hover:bg-emerald-400"
              >
                Schedule a 15-Minute Jewellery Demo →
              </button>
              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-slate-700 bg-slate-900 px-8 py-3.5 text-sm font-bold text-slate-200 transition hover:bg-slate-800"
              >
                Chat with a Retail Specialist
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Modal */}
      {demoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl text-left"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-lg text-slate-900">Book Jewellery OS Demo</h3>
              <button
                onClick={() => setDemoModalOpen(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleDemoSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700">Showroom Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Gold &amp; Diamonds"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700">Mobile Number</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700">Showroom Format</label>
                <select
                  value={storeType}
                  onChange={(e) => setStoreType(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm outline-none focus:border-emerald-500"
                >
                  <option>Gold &amp; Diamond Jewellery Showroom</option>
                  <option>Exclusive Diamond &amp; Solitaire Studio</option>
                  <option>Luxury Swiss Watch Boutique</option>
                  <option>Silver Articles &amp; Bullion Outlet</option>
                  <option>Multi-Branch Jewellery Chain</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full rounded-xl bg-slate-900 py-3 text-sm font-bold text-white shadow-md transition hover:bg-slate-800"
              >
                Confirm 15-Min Live Demo
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
