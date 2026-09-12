import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  Scan,
  Boxes,
  Store,
  CreditCard,
  CheckCircle2,
  ArrowRight,
  Zap,
  Tag,
  ShieldCheck,
  FileSpreadsheet,
  Layers,
  Sparkles,
  RotateCcw,
  Printer,
  QrCode,
  X,
  Footprints,
  Smartphone,
  Truck,
  Bookmark,
  Percent,
  SlidersHorizontal
} from 'lucide-react';

const pillarsData = [
  {
    id: 'pillar-pos',
    num: '01',
    badge: 'Rapid Barcode Billing',
    metric: 'Instant 1-Click Size & Style Exchanges',
    image: '/assets/footwear_pos_scan.jpg',
    alt: 'Cashier using wireless barcode scanner on shoe box at footwear billing counter',
    title: 'Smart POS — Rapid Barcode Scanning & Hassle-Free Size Exchanges',
    points: [
      {
        icon: Scan,
        text: 'Scan shoe box barcodes in sub-seconds and automatically confirm matching left-right sizes.',
      },
      {
        icon: RotateCcw,
        text: 'Process instant size exchanges or style swaps without deleting the original invoice or breaking GSTR compliance.',
      },
      {
        icon: Sparkles,
        text: 'Automatic bundle prompt at counter: shoe care polish, waterproof spray, leather conditioner, and socks.',
      },
      {
        icon: Zap,
        text: 'Full offline functionality ensuring zero billing interruptions during network drops.',
      },
    ],
  },
  {
    id: 'pillar-inventory',
    num: '02',
    badge: 'Size-Color Matrix',
    metric: '100% Variant-Level Stock Traceability',
    image: '/assets/footwear_inventory_matrix.jpg',
    alt: 'Footwear store manager conducting stock audit in shoe warehouse backroom with digital tablet',
    title: 'Complete Management System — Variant-Level Matrix & Godown Sync',
    points: [
      {
        icon: Boxes,
        text: 'Manage complete multi-variant trees (Brand → Style/Article No → Color → Size: 6, 7, 8, 9, 10, 11) in a single SKU umbrella.',
      },
      {
        icon: ShieldCheck,
        text: 'Stop odd-shoe losses and display-sample misplacement with regular barcode shelf audit audits.',
      },
      {
        icon: Tag,
        text: 'Identify slow-moving sizes or off-season styles with automated aging alerts to trigger markdown sales.',
      },
      {
        icon: Truck,
        text: 'Real-time stock transfer dispatch notes between godown racks and display shelves.',
      },
    ],
  },
  {
    id: 'pillar-storefront',
    num: '03',
    badge: 'Local Storefront',
    metric: "3x Walk-ins via 'Reserve My Size' Feature",
    image: '/assets/footwear_storefront_trial.jpg',
    alt: 'Customer trying on handcrafted leather shoes with smartphone online catalog in boutique',
    title: 'Custom Website & Local Storefront — Live Storefront Size Checker',
    points: [
      {
        icon: Store,
        text: 'Branded online showroom showing live local shelf inventory with active size-availability filters.',
      },
      {
        icon: Bookmark,
        text: '"Reserve My Size in Store" feature allowing customers to hold pairs for a 2-hour physical trial walk-in.',
      },
      {
        icon: Smartphone,
        text: 'Digital lookbook for leather bags, jackets, wallets, and seasonal footwear drops with instant WhatsApp inquiries.',
      },
      {
        icon: Truck,
        text: 'Seamless home delivery setup for neighborhood customers with doorstep size-swap options.',
      },
    ],
  },
  {
    id: 'pillar-loyalty',
    num: '04',
    badge: 'Retention & Loyalty',
    metric: '38% Increase in Repeat Customer Spend',
    image: '/assets/footwear_leather_loyalty.jpg',
    alt: 'Premium leather wallet, belt, and shoe care kit on counter with VIP WhatsApp loyalty reward message',
    title: 'Digital Marketing & Retention — Seasonal Clearance & Repeat Footfall',
    points: [
      {
        icon: Sparkles,
        text: 'Automated WhatsApp reminders for seasonal collection launches (Monsoon water-resistant, Festive ethnic juttis, Winter boots).',
      },
      {
        icon: Tag,
        text: 'Hyper-local Meta & Google ads targeting shoppers within a 5 km radius seeking branded sneakers and formal shoes.',
      },
      {
        icon: Percent,
        text: 'Birthday and anniversary celebration discounts with personalized SMS voucher triggers.',
      },
      {
        icon: ShieldCheck,
        text: 'Loyalty wallet system rewarding points redeemable on shoe care kits and leather accessories.',
      },
    ],
  },
];

export function FootwearLeatherStoresPage() {
  const [activePillar, setActivePillar] = useState(0);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [storeName, setStoreName] = useState('');
  const [phone, setPhone] = useState('');
  const [storeType, setStoreType] = useState('Multi-Brand Footwear Showroom');

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you! Our footwear retail specialist will reach out on WhatsApp within 15 minutes.');
    setDemoModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-emerald-500 selection:text-white">
      {/* ══════════════════════════════════════════════════════════
          1. HERO SECTION (Footwear & Leather Editorial)
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
            FOOTWEAR, LEATHER GOODS &amp; APPAREL RETAIL OS
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-4xl font-black tracking-tight text-slate-950 sm:text-6xl max-w-4xl mx-auto leading-[1.08]"
          >
            Every Size &amp; Color Matrix Tracked. Instant Pairs Checkout.{' '}
            <span className="text-emerald-600">Zero Odd-Shoe Losses.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 max-w-3xl mx-auto text-base text-slate-600 sm:text-lg leading-relaxed font-normal"
          >
            The modern retail platform built for shoe boutiques, multi-brand footwear stores, and premium leather outlets — engineered for multi-variant size-color matrices, fast barcode sticker tagging, and seamless exchange management.
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
              See Footwear Billing Speed
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
                src="/assets/footwear_showroom_display.jpg"
                alt="Handcrafted leather shoes, boots, sneakers, belts, and wallets displayed on luxury boutique shelves"
                style={{ objectPosition: '50% 50%' }}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Panel 2: The Customer Experience */}
            <div
              onClick={() => setDemoModalOpen(true)}
              className="group relative h-[320px] md:h-full overflow-hidden border-b-2 md:border-b-0 md:border-r-2 border-white cursor-pointer"
            >
              <img
                src="/assets/footwear_customer_experience.jpg"
                alt="Indian customer trying on leather shoes on trial bench in front of mirror with attentive store assistant in boutique"
                style={{ objectPosition: '50% 30%' }}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Panel 3: The Billing Counter & Payment */}
            <div
              onClick={() => setDemoModalOpen(true)}
              className="group relative h-[320px] md:h-full overflow-hidden cursor-pointer"
            >
              <img
                src="/assets/footwear_checkout_counter.jpg"
                alt="Customer tapping contactless payment card on POS terminal at footwear showroom checkout counter"
                style={{ objectPosition: '50% 50%' }}
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
              The 4 Pillars of Modern Footwear Retail
            </span>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl text-slate-950">
              Engineered for Shoe Boutiques, Chains &amp; Leather Stores
            </h2>
            <p className="mt-4 text-base text-slate-600 sm:text-lg">
              Eliminate odd-shoe shrinkage, streamline fast size exchanges, and maintain full size-color matrix stock visibility across display shelves and backroom godowns.
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
                    {p.num} {idx === 0 ? 'Smart POS' : idx === 1 ? 'Size Matrix' : idx === 2 ? 'Digital Catalog' : 'Loyalty & Ads'}
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
          3. DEDICATED HARDWARE INTEGRATION BAR (4-Column)
      ══════════════════════════════════════════════════════════ */}
      <section className="bg-slate-50 py-20 border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-600">
              Zero Hardware Lock-In
            </span>
            <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-4xl text-slate-950">
              Plug-and-Play Footwear Counter Hardware
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              Seamless driver-free compatibility with your existing handheld barcode guns, label printers, and counter billing machines.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-900 mb-4">
                <Scan size={22} />
              </div>
              <h4 className="font-bold text-base text-slate-950 mb-2">1D/2D Handheld Barcode Guns</h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Fast scanning of curved shoe box edges and small hangtags without mistyping article codes or left-right mismatches.
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">Honeywell</span>
                <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">Zebra</span>
                <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">TVS</span>
                <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">Datalogic</span>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-900 mb-4">
                <Store size={22} />
              </div>
              <h4 className="font-bold text-base text-slate-950 mb-2">Touch POS &amp; Counter Terminals</h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Fully compatible with touch desktops, compact Windows counters, and mobile tablets for sales staff roaming the floor.
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">Posiflex</span>
                <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">Sunmi</span>
                <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">Essae</span>
                <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">Windows PCs</span>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-900 mb-4">
                <Printer size={22} />
              </div>
              <h4 className="font-bold text-base text-slate-950 mb-2">Shoe Box Label Printers</h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                High-speed thermal printers for custom adhesive shoe box labels and tamper-evident hangtags with size &amp; MRP barcodes.
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">TSC</span>
                <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">TVS LP 46</span>
                <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">Zebra ZD220</span>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-900 mb-4">
                <CreditCard size={22} />
              </div>
              <h4 className="font-bold text-base text-slate-950 mb-2">Cash Drawers &amp; Thermal Receipts</h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Seamless auto-kick cash registers and 3-inch high-speed thermal printers with customized return &amp; exchange policy footers.
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">Epson</span>
                <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">NGX</span>
                <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">Sewoo</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          4. SECTOR MATRIX (6 Clean Bordered Cards with Green Links)
      ══════════════════════════════════════════════════════════ */}
      <section className="py-24 border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-600">
              Purpose-Built Footwear Suite
            </span>
            <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl text-slate-950">
              Engineered Specifically for Modern Shoe Retail
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Six specialized retail engines built to handle size matrices, fast exchanges, barcode box labels, and seasonal clearance sales.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-xs hover:border-slate-300 hover:shadow-md transition">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 mb-5">
                <Layers size={22} />
              </div>
              <h4 className="font-bold text-lg text-slate-950 mb-2">Size-Color Matrix Grid</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Add 20 size/color variants in a single 10-second master product setup without creating tedious duplicate catalog listings.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-xs hover:border-slate-300 hover:shadow-md transition">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 mb-5">
                <Printer size={22} />
              </div>
              <h4 className="font-bold text-lg text-slate-950 mb-2">Box &amp; Hangtag Barcode Printing</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Print customized barcode stickers with Article No, Color, Size, and MRP in bulk for newly arrived shoe cartons.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-xs hover:border-slate-300 hover:shadow-md transition">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 mb-5">
                <Boxes size={22} />
              </div>
              <h4 className="font-bold text-lg text-slate-950 mb-2">Display vs. Godown Split</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Track which shoe is on the display shelf and which pair is in back-storage to eliminate lost display pairs and odd-shoe mismatch.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-xs hover:border-slate-300 hover:shadow-md transition">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 mb-5">
                <RotateCcw size={22} />
              </div>
              <h4 className="font-bold text-lg text-slate-950 mb-2">Hassle-Free Exchange Desk</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Track return reasons (Fit/Size, Defect, Style swap) with automated credit notes and instant adjustment against new purchases.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-xs hover:border-slate-300 hover:shadow-md transition">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 mb-5">
                <Percent size={22} />
              </div>
              <h4 className="font-bold text-lg text-slate-950 mb-2">BOGO &amp; Clearance Sale Engine</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Schedule flat 40% off, 'Buy 1 Get 1 on Selected Sizes', and bundle pricing schemes to liquidate off-season footwear fast.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-xs hover:border-slate-300 hover:shadow-md transition">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 mb-5">
                <FileSpreadsheet size={22} />
              </div>
              <h4 className="font-bold text-lg text-slate-950 mb-2">1-Click GST &amp; HSN Invoicing</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Auto-apply correct GST slabs (&lt;₹1,000 at 5% vs &gt;₹1,000 at 12% footwear rules) with automated GSTR reports and HSN compliance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          5. BOTTOM CONVERSION BANNER
      ══════════════════════════════════════════════════════════ */}
      <section className="bg-slate-950 py-20 text-white relative overflow-hidden">
        <div className="mx-auto max-w-5xl px-5 sm:px-8 text-center relative z-10">
          <h2 className="text-3xl font-black tracking-tight sm:text-5xl">
            Ready to eliminate size stockouts and accelerate shoe sales?
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
            Powering independent footwear boutiques, sneaker stores, and leather goods retailers across India.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="/#cta"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-sm font-black text-slate-950 shadow-lg hover:bg-slate-100 transition"
            >
              Schedule a 15-Minute Footwear Demo →
              <ArrowRight size={16} />
            </a>
            <button
              onClick={() => setDemoModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-8 py-4 text-sm font-bold text-white hover:bg-slate-800 transition"
            >
              Chat with a Retail Specialist
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
                Priyulabs Footwear OS Demo
              </span>
              <h3 className="mt-2 text-2xl font-black text-slate-950">
                Request an In-Store Walkthrough
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-slate-600">
                Our retail specialist will demonstrate size-color matrix tracking, odd-shoe checks, and 1-click exchange billing on your hardware.
              </p>
            </div>

            <form onSubmit={handleDemoSubmit} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Store / Boutique Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Footwear &amp; Leather Boutique"
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
                  <option>Multi-Brand Footwear Showroom</option>
                  <option>Exclusive Shoe Boutique &amp; Leather Goods</option>
                  <option>Sneaker &amp; Sports Footwear Store</option>
                  <option>Multi-Store Footwear Chain</option>
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

export default FootwearLeatherStoresPage;
