import { motion } from 'framer-motion';
import {
  ShieldAlert,
  Sparkles,
  Layers,
  HeartHandshake,
  Gift,
  Receipt,
  ArrowRight,
  Zap,
  Check,
  MessageCircle,
  Clock,
  Tag,
  ShieldCheck,
  TrendingUp,
  FileSpreadsheet
} from 'lucide-react';

const cosmeticFeatures = [
  {
    icon: ShieldAlert,
    title: 'Tester & Promotional Stock Quarantine',
    description:
      'Maintain distinct, non-saleable inventory ledgers for counter testers and free samples with strict shrinkage audits. Prevents testers from being accidentally sold at checkout.',
  },
  {
    icon: FileSpreadsheet,
    title: 'Multi-Brand Vendor Settlement & RTV',
    description:
      'Automatically log and settle vendor margins (e.g. L\'Oréal, Maybelline, Minimalist) and generate Return-to-Vendor (RTV) claims for damaged goods or near-expiry returns.',
  },
  {
    icon: HeartHandshake,
    title: 'Brand Promoter & BA Commission Desk',
    description:
      'Track counter sales by individual Beauty Advisors (BAs) to calculate incentive splits and vendor-sponsored sales bonuses with zero manual commission spreadsheets.',
  },
  {
    icon: Sparkles,
    title: 'Customer Skin Profile & Sensitivity Log',
    description:
      'Record customer patch test reactions, allergy history, and preferred formulation types (Fragrance-Free, Non-Comedogenic) for personalized counter recommendations.',
  },
  {
    icon: Gift,
    title: 'Combo Kits & Hamper Bundling',
    description:
      'Sell dynamic gift hampers and holiday beauty boxes with automated component-level inventory depletion and custom festive promotional pricing rules.',
  },
  {
    icon: Receipt,
    title: '1-Click 18% / 28% GST Multi-Slab Invoicing',
    description:
      'Manage mixed cosmetic tax rates (skincare @ 18% vs premium perfumes @ 28% GST) with compliant HSN code lookups and instant digital WhatsApp receipts.',
  },
];

export function CosmeticsSkincarePage() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 selection:bg-rose-100 selection:text-rose-900 dark:bg-slate-950 dark:text-white">
      
      {/* ══════════════════════════════════════════════════════════
          1. HERO SECTION & 3-PHOTO GALLERY STRIP
      ══════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-16 md:pb-28">
        {/* Soft Radial Ambient Glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(225,29,72,0.05),transparent_60%)]" />

        <div className="relative mx-auto max-w-6xl px-5 text-center sm:px-8">
          {/* Hero Category Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center gap-2 rounded-full border border-rose-200/80 bg-rose-50/70 px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-rose-900 dark:border-rose-900/40 dark:bg-rose-950/40 dark:text-rose-300"
          >
            <span className="h-2 w-2 rounded-full bg-rose-600 shadow-xs" />
            BEAUTY OUTLETS, DERMA COUNTERS &amp; MULTI-BRAND COSMETIC STORES
          </motion.div>

          {/* Main Title & Subtitle */}
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mt-6 text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl md:text-6xl dark:text-white"
          >
            FEFO Batch Invoicing. Shade-Matrix POS.<br />
            <span className="text-rose-600 dark:text-rose-400">Zero Shelf Expiry.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mx-auto mt-6 max-w-3xl text-base text-neutral-600 leading-relaxed sm:text-lg dark:text-slate-400"
          >
            The specialized retail operating system engineered for beauty and skincare merchants — intelligent First-Expiry-First-Out barcode billing, tester stock quarantine, brand promoter margin splits, and cross-sell ingredient triggers.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <a href="/#free-trial"
              className="inline-flex items-center gap-2 rounded-xl bg-neutral-900 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-neutral-900/10 transition hover:bg-neutral-800 hover:-translate-y-0.5 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
            >
              Get Started Today
              <ArrowRight size={16} />
            </a>
            <a href="#fefo-features"
              className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-7 py-3.5 text-sm font-bold text-neutral-800 transition hover:bg-neutral-50 hover:-translate-y-0.5 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
             onClick={(e) => { e.preventDefault(); (document.querySelector('#fefo-features') || document.getElementById('fefo-features') || document.getElementById('pillars') || document.querySelector('.clean-pillars-sec, .pillars-sec, .triptych-sec, .pillars-grid'))?.scrollIntoView({ behavior: 'smooth' }); }}>
              <Zap size={16} className="text-rose-600 dark:text-rose-400" />
              See Cosmetics Billing Speed
            </a>
          </motion.div>

          {/* 4 Core Solutions Sub-Strip */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-10 mx-auto max-w-4xl flex flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-2xl border border-neutral-200/70 bg-white/80 backdrop-blur-sm px-6 py-3 text-xs md:text-[13px] font-medium text-neutral-600 shadow-xs dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300"
          >
            <span>FEFO Smart Counter Checkout</span>
            <span className="text-neutral-300 dark:text-slate-600 select-none">✦</span>
            <span>Tester Stock & BA Commission Ledger</span>
            <span className="text-neutral-300 dark:text-slate-600 select-none">✦</span>
            <span>Interactive Routine Builder Storefront</span>
            <span className="text-neutral-300 dark:text-slate-600 select-none">✦</span>
            <span>Hyper-Local Google & Meta Ad Automation</span>
          </motion.div>

          {/* Hero 3-Photo Gallery Strip */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5 text-left"
          >
            {/* Image 1: Luxury Cosmetics Store Display */}
            <div className="group relative h-64 md:h-80 w-full overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-900 shadow-sm transition hover:border-neutral-300 hover:shadow-md dark:border-slate-800">
              <img
                src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=80"
                alt="Luxury cosmetics store displaying orderly rows of serums, foundations, and skincare bottles"
                onError={(e) => {
                  e.currentTarget.src = '/assets/sector_cosmetics.jpg';
                }}
                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-md w-max mb-1.5">
                  Showroom Floor
                </span>
                <h4 className="text-base font-bold leading-tight">Luxury Skincare Racks</h4>
                <p className="text-xs text-neutral-300">Organized serums &amp; derma jars</p>
              </div>
            </div>

            {/* Image 2: Center Hero Focus (Retail Counter POS Screen) */}
            <div className="group relative h-64 md:h-80 w-full overflow-hidden rounded-2xl border border-neutral-300 bg-neutral-900 shadow-md transition hover:border-neutral-400 hover:shadow-lg dark:border-slate-700">
              <img
                src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80"
                alt="Retail counter POS screen showing batch expiry countdown alerts and shade selector chips"
                onError={(e) => {
                  e.currentTarget.src = '/assets/sector_cosmetics.jpg';
                }}
                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-rose-600/80 backdrop-blur-md px-2 py-0.5 rounded-md w-max mb-1.5">
                  Counter POS
                </span>
                <h4 className="text-base font-bold leading-tight">FEFO Smart Billing Screen</h4>
                <p className="text-xs text-neutral-300">Expiry countdown &amp; shade chips</p>
              </div>
            </div>

            {/* Image 3: Beauty Consultant at Skincare Counter */}
            <div className="group relative h-64 md:h-80 w-full overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-900 shadow-sm transition hover:border-neutral-300 hover:shadow-md dark:border-slate-800">
              <img
                src="https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1200&q=80"
                alt="Beauty consultant assisting a customer at a skincare counter with tester bottles"
                onError={(e) => {
                  e.currentTarget.src = '/assets/sector_cosmetics.jpg';
                }}
                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-md w-max mb-1.5">
                  Derma Counter
                </span>
                <h4 className="text-base font-bold leading-tight">Consultant Tester Bay</h4>
                <p className="text-xs text-neutral-300">Tester tracking &amp; barcode audit</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          2. METRICS COUNTER RIBBON
      ══════════════════════════════════════════════════════════ */}
      <section className="border-t border-b border-neutral-200/80 bg-white py-14 dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="border-l-2 border-neutral-300 pl-5 text-left dark:border-slate-700">
              <div className="text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">0%</div>
              <div className="text-sm font-bold text-neutral-900 mt-1 dark:text-white">Expired Stock Invoiced</div>
              <div className="text-xs text-neutral-500 mt-1 dark:text-slate-400">FEFO system auto-locks expired batches from cashier scanning.</div>
            </div>

            <div className="border-l-2 border-neutral-300 pl-5 text-left dark:border-slate-700">
              <div className="text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">1.4s</div>
              <div className="text-sm font-bold text-neutral-900 mt-1 dark:text-white">Batch Barcode Scan Speed</div>
              <div className="text-xs text-neutral-500 mt-1 dark:text-slate-400">Sub-second 2D scanner recognition across MRP, HSN &amp; lot codes.</div>
            </div>

            <div className="border-l-2 border-neutral-300 pl-5 text-left dark:border-slate-700">
              <div className="text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">100%</div>
              <div className="text-sm font-bold text-neutral-900 mt-1 dark:text-white">Brand Promoter Settlement</div>
              <div className="text-xs text-neutral-500 mt-1 dark:text-slate-400">Daily commission reconciliation per beauty advisor &amp; vendor brand.</div>
            </div>

            <div className="border-l-2 border-neutral-300 pl-5 text-left dark:border-slate-700">
              <div className="text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">28%</div>
              <div className="text-sm font-bold text-neutral-900 mt-1 dark:text-white">Cross-Sell Basket Growth</div>
              <div className="text-xs text-neutral-500 mt-1 dark:text-slate-400">Automated ingredient combos (Cleanser + Toner + SPF) at checkout.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          3. INTERACTIVE FEATURE SHOWCASE (4 Split Live UI Mockups)
      ══════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-white dark:bg-slate-950" id="fefo-features">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 space-y-24">
          
          {/* Block 1: Intelligent FEFO Billing Shield (Visual Left, Text Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Visual Mockup Box */}
            <div className="rounded-3xl border border-neutral-200/80 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900">
              {/* Store Interior Image Banner */}
              <div className="group relative h-48 sm:h-52 w-full overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-900 mb-5 dark:border-slate-800">
                <img
                  src="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80"
                  alt="Skincare serums and cream jars neatly aligned with batch tags"
                  onError={(e) => {
                    e.currentTarget.src = '/assets/sector_cosmetics.jpg';
                  }}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent flex items-end p-3.5">
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-neutral-900/80 backdrop-blur-md px-2.5 py-1 text-[11px] font-bold text-white border border-white/20">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Derma Counter • Batch-Expiry Scanner
                  </span>
                </div>
              </div>

              {/* FEFO POS UI Card */}
              <div className="rounded-2xl border border-neutral-100 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/80">
                <div className="flex items-center justify-between border-b border-neutral-100 pb-3 mb-4 dark:border-slate-800">
                  <div>
                    <h4 className="font-bold text-base text-neutral-900 dark:text-white">Glow C-20 Face Serum (30ml)</h4>
                    <span className="text-xs text-neutral-500">SKU: GCS-30 • HSN: 3304 • MRP: ₹899</span>
                  </div>
                  <span className="rounded-md bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
                    FEFO Active
                  </span>
                </div>

                {/* Batch Cards Grid */}
                <div className="space-y-2.5">
                  {/* Recommended Batch #B104 */}
                  <div className="rounded-xl border border-emerald-500 bg-emerald-50/60 p-3 dark:bg-emerald-950/30 dark:border-emerald-700">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-emerald-600 px-1.5 py-0.5 text-[9px] font-extrabold uppercase text-white">Recommended</span>
                        <strong className="text-xs font-bold text-neutral-900 dark:text-white">Batch #B104</strong>
                      </div>
                      <span className="rounded-md bg-amber-100 px-2 py-0.5 text-[11px] font-bold text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                        Exp: 45 Days
                      </span>
                    </div>
                    <div className="flex justify-between text-xs text-emerald-900 dark:text-emerald-200">
                      <span>Location: Counter Shelf A-2</span>
                      <strong>Stock: 6 units (Liquidate First)</strong>
                    </div>
                  </div>

                  {/* Stock Held Batch #B109 */}
                  <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-3 dark:border-slate-800 dark:bg-slate-800/50">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-neutral-500 px-1.5 py-0.5 text-[9px] font-extrabold uppercase text-white">Held</span>
                        <strong className="text-xs font-bold text-neutral-900 dark:text-white">Batch #B109</strong>
                      </div>
                      <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                        Exp: 18 Months
                      </span>
                    </div>
                    <div className="flex justify-between text-xs text-neutral-500 dark:text-slate-400">
                      <span>Location: Main Godown Box 14</span>
                      <span>Stock: 48 units</span>
                    </div>
                  </div>
                </div>

                {/* Footer Bar */}
                <div className="mt-4 flex items-center justify-between pt-3 border-t border-neutral-100 text-xs dark:border-slate-800">
                  <span className="flex items-center gap-1.5 font-bold text-emerald-600">
                    <Check size={14} />
                    Auto-Selected Oldest Valid Batch
                  </span>
                  <span className="rounded-md bg-neutral-100 px-2.5 py-1 text-[11px] font-extrabold text-neutral-700 dark:bg-slate-800 dark:text-slate-300">
                    Zero Expiry Waste
                  </span>
                </div>
              </div>
            </div>

            {/* Text Content Right */}
            <div>
              <span className="inline-block rounded-full border border-rose-200/80 bg-rose-50/60 px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-rose-800 dark:border-rose-900/40 dark:bg-rose-950/40 dark:text-rose-300">
                Pillar 1 • FEFO Batch Expiry Shield
              </span>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
                Intelligent First-Expiry-First-Out Billing Shield
              </h2>
              <div className="mt-4 rounded-xl border border-neutral-200/80 bg-neutral-50 p-4 text-sm text-neutral-700 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300">
                <strong className="block text-neutral-900 dark:text-white mb-1">The Problem Solved:</strong>
                Counter staff accidentally bill fresh stock from the front shelf, leaving older batches of active serums and face creams to expire hidden at the back of the rack.
              </div>
              <p className="mt-4 text-base text-neutral-600 leading-relaxed dark:text-slate-400">
                When cashiers scan an item, Priyulabs FEFO algorithm automatically directs them to liquidate the earliest expiring lot first. Any expired barcode is instantly hard-locked with an audible warning tone, completely eliminating embarrassing customer returns.
              </p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-start gap-3 text-sm font-semibold text-neutral-800 dark:text-slate-200">
                  <Check size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>Automated cashier prompting to sell near-expiry lots without manual date checks</span>
                </li>
                <li className="flex items-start gap-3 text-sm font-semibold text-neutral-800 dark:text-slate-200">
                  <Check size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>Hard lock prevents billing of expired cosmetic batches at counter</span>
                </li>
                <li className="flex items-start gap-3 text-sm font-semibold text-neutral-800 dark:text-slate-200">
                  <Check size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>60/30-Day expiry alerts for vendor return-to-vendor (RTV) claims</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Block 2: Shade Matrix & Routine Upsell Trigger (Text Left, Visual Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text Content Left */}
            <div>
              <span className="inline-block rounded-full border border-emerald-200/80 bg-emerald-50/60 px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-800 dark:border-emerald-900/40 dark:bg-emerald-950/40 dark:text-emerald-300">
                Pillar 2 • Shade Matrix &amp; Routine Bundling
              </span>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
                Shade-Matrix Quick-Pick &amp; Algorithmic Routine Upsell
              </h2>
              <div className="mt-4 rounded-xl border border-neutral-200/80 bg-neutral-50 p-4 text-sm text-neutral-700 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300">
                <strong className="block text-neutral-900 dark:text-white mb-1">The Problem Solved:</strong>
                Beauty shoppers struggle with shade matching across foundations, while counter consultants miss cross-selling complementary primers, brushes, and setting mists.
              </div>
              <p className="mt-4 text-base text-neutral-600 leading-relaxed dark:text-slate-400">
                Staff pick foundation shades by undertone (Warm, Neutral, Cool) on an interactive touch matrix displaying real-time counter tester and sealed inventory. The POS automatically suggests high-affinity routine add-ons, increasing average transaction value by 28%.
              </p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-start gap-3 text-sm font-semibold text-neutral-800 dark:text-slate-200">
                  <Check size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>Color swatch selector by undertone with live sealed vs tester unit counts</span>
                </li>
                <li className="flex items-start gap-3 text-sm font-semibold text-neutral-800 dark:text-slate-200">
                  <Check size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>1-Tap routine bundling (Foundation + Primer + Kabuki Brush combo discount)</span>
                </li>
                <li className="flex items-start gap-3 text-sm font-semibold text-neutral-800 dark:text-slate-200">
                  <Check size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>Ingredient compatibility cross-checks prevent clashing active formulations</span>
                </li>
              </ul>
            </div>

            {/* Visual Mockup Right */}
            <div className="rounded-3xl border border-neutral-200/80 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900">
              {/* Store Interior Image Banner: Foundation Display */}
              <div className="group relative h-48 sm:h-52 w-full overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-900 mb-5 dark:border-slate-800">
                <img
                  src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1200&q=80"
                  alt="Luxury cosmetic store foundation and makeup shade display"
                  onError={(e) => {
                    e.currentTarget.src = '/assets/sector_cosmetics.jpg';
                  }}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent flex items-end p-3.5">
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-neutral-900/80 backdrop-blur-md px-2.5 py-1 text-[11px] font-bold text-white border border-white/20">
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
                    Cosmetics Floor • Shade &amp; Undertone Hub
                  </span>
                </div>
              </div>

              {/* Shade Matrix UI Card */}
              <div className="rounded-2xl border border-neutral-100 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/80">
                <div className="flex items-center justify-between border-b border-neutral-100 pb-3 mb-4 dark:border-slate-800">
                  <div>
                    <h4 className="font-bold text-base text-neutral-900 dark:text-white">Matte Velvet Foundation 30ml</h4>
                    <span className="text-xs text-neutral-500">Formula: Non-Comedogenic • SPF 25 • ₹1,450</span>
                  </div>
                  <span className="rounded-md bg-rose-50 px-2.5 py-1 text-[11px] font-bold text-rose-800 dark:bg-rose-950/40 dark:text-rose-300">
                    18 Shades
                  </span>
                </div>

                {/* Shade Chips Grid */}
                <div className="grid grid-cols-3 gap-2.5 mb-4">
                  <div className="rounded-xl border border-neutral-900 bg-white p-2.5 text-center dark:border-white dark:bg-slate-800">
                    <div className="mx-auto h-5 w-5 rounded-full bg-[#f3d7b5] mb-1.5" />
                    <strong className="block text-xs font-bold text-neutral-900 dark:text-white">Warm Ivory</strong>
                    <span className="text-[10px] font-bold text-emerald-600">8 In Stock</span>
                  </div>
                  <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-2.5 text-center dark:border-slate-800 dark:bg-slate-800/60">
                    <div className="mx-auto h-5 w-5 rounded-full bg-[#d8a571] mb-1.5" />
                    <strong className="block text-xs font-bold text-neutral-900 dark:text-white">Golden Honey</strong>
                    <span className="text-[10px] font-bold text-amber-600">2 Left</span>
                  </div>
                  <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-2.5 text-center dark:border-slate-800 dark:bg-slate-800/60">
                    <div className="mx-auto h-5 w-5 rounded-full bg-[#794b28] mb-1.5" />
                    <strong className="block text-xs font-bold text-neutral-900 dark:text-white">Espresso</strong>
                    <span className="text-[10px] font-bold text-emerald-600">5 In Stock</span>
                  </div>
                </div>

                {/* Smart Routine Bundle Box */}
                <div className="rounded-xl border border-dashed border-rose-200 bg-rose-50/60 p-3 text-xs dark:border-rose-900/40 dark:bg-rose-950/20">
                  <div className="flex items-center justify-between mb-1">
                    <strong className="text-rose-950 dark:text-rose-200">Pairs with: Hyaluronic Primer + Kabuki Brush</strong>
                    <span className="rounded bg-rose-600 px-1.5 py-0.5 text-[9px] font-extrabold text-white">Save ₹250</span>
                  </div>
                  <span className="text-rose-700 dark:text-rose-300">Routine Combo: ₹2,150 (Reg: ₹2,400) • 1-Click Cashier Add</span>
                </div>

                {/* Footer */}
                <div className="mt-4 flex items-center justify-between pt-3 border-t border-neutral-100 text-xs text-neutral-600 dark:border-slate-800 dark:text-slate-400">
                  <span>Tester Shelf Unit #T-04 Verified</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">+₹700 Basket Lift</span>
                </div>
              </div>
            </div>
          </div>

          {/* Block 3: Tester & Promotional Stock Quarantine Ledger (Visual Left, Text Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Visual Mockup Left */}
            <div className="rounded-3xl border border-neutral-200/80 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900">
              {/* Store Interior Image Banner */}
              <div className="group relative h-48 sm:h-52 w-full overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-900 mb-5 dark:border-slate-800">
                <img
                  src="https://images.unsplash.com/photo-1583209814683-c023dd293cc6?auto=format&fit=crop&w=1200&q=80"
                  alt="Beauty retail counter with tester bottles and sample trays"
                  onError={(e) => {
                    e.currentTarget.src = '/assets/sector_cosmetics.jpg';
                  }}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent flex items-end p-3.5">
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-neutral-900/80 backdrop-blur-md px-2.5 py-1 text-[11px] font-bold text-white border border-white/20">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                    Tester Bay • Quarantine &amp; Sample Control
                  </span>
                </div>
              </div>

              {/* Tester Quarantine UI Card */}
              <div className="rounded-2xl border border-neutral-100 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/80">
                <div className="flex items-center justify-between border-b border-neutral-100 pb-3 mb-4 dark:border-slate-800">
                  <div>
                    <h4 className="font-bold text-base text-neutral-900 dark:text-white">Tester &amp; Sample Quarantine Vault</h4>
                    <span className="text-xs text-neutral-500">Counter Display Units • Non-Saleable Ledger</span>
                  </div>
                  <span className="rounded-md bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-800 dark:bg-amber-950/40 dark:text-amber-300">
                    Audit Mode
                  </span>
                </div>

                {/* Tester Items List */}
                <div className="rounded-xl bg-neutral-50 p-3 space-y-2 mb-3 text-xs dark:bg-slate-800/50">
                  <div className="flex items-center justify-between pb-2 border-b border-dashed border-neutral-200 dark:border-slate-700">
                    <div>
                      <strong className="block text-neutral-900 dark:text-white">Luxe Hydrating Mist (Tester #T-09)</strong>
                      <span className="text-[11px] text-neutral-500">Counter 01 • Allocated from Inward Batch</span>
                    </div>
                    <span className="rounded bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-700 dark:bg-red-950/40 dark:text-red-300">
                      Not For Sale
                    </span>
                  </div>

                  <div className="flex items-center justify-between pb-2 border-b border-dashed border-neutral-200 dark:border-slate-700">
                    <div>
                      <strong className="block text-neutral-900 dark:text-white">Miniature SPF 50 Samples (10ml)</strong>
                      <span className="text-[11px] text-neutral-500">Gift With Purchase (GWP) Pool</span>
                    </div>
                    <span className="rounded bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-700 dark:bg-blue-950/40 dark:text-blue-300">
                      84 Units
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div>
                      <strong className="block text-neutral-900 dark:text-white">Tester Bottle Shrinkage Variance</strong>
                      <span className="text-[11px] text-neutral-500">Audit vs Counter Footfall Expectation</span>
                    </div>
                    <strong className="text-emerald-600 dark:text-emerald-400">0.0% Shrinkage</strong>
                  </div>
                </div>

                {/* Cashier Barcode Lock Badge */}
                <div className="flex items-center justify-between pt-3 border-t border-neutral-100 text-xs text-neutral-600 dark:border-slate-800 dark:text-slate-400">
                  <span className="flex items-center gap-1.5 font-bold text-red-600 dark:text-red-400">
                    <ShieldAlert size={14} />
                    Cashier Lock: Tester Barcodes Hard-Blocked
                  </span>
                  <span>0 Leakage</span>
                </div>
              </div>
            </div>

            {/* Text Content Right */}
            <div>
              <span className="inline-block rounded-full border border-amber-200/80 bg-amber-50/60 px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-800 dark:border-amber-900/40 dark:bg-amber-950/40 dark:text-amber-300">
                Pillar 3 • Tester Stock Quarantine
              </span>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
                Strict Tester Quarantine &amp; Promotional Stock Control
              </h2>
              <div className="mt-4 rounded-xl border border-neutral-200/80 bg-neutral-50 p-4 text-sm text-neutral-700 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300">
                <strong className="block text-neutral-900 dark:text-white mb-1">The Problem Solved:</strong>
                Tester bottles and promotional free-gift samples get accidentally scanned as commercial inventory, or stolen by staff without audit accountability.
              </div>
              <p className="mt-4 text-base text-neutral-600 leading-relaxed dark:text-slate-400">
                Maintain a ring-fenced, non-saleable inventory ledger for showroom tester units and vendor promotional samples. Tester barcodes are blocked from checkout invoices, while usage levels are audited against counter footfalls to stop pilferage.
              </p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-start gap-3 text-sm font-semibold text-neutral-800 dark:text-slate-200">
                  <Check size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>Segregated tester inventory balances distinct from retail sellable units</span>
                </li>
                <li className="flex items-start gap-3 text-sm font-semibold text-neutral-800 dark:text-slate-200">
                  <Check size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>Instant cashier lock prevents testers from ever being billed as customer items</span>
                </li>
                <li className="flex items-start gap-3 text-sm font-semibold text-neutral-800 dark:text-slate-200">
                  <Check size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>GWP (Gift With Purchase) sample entitlement auto-triggered by basket value</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Block 4: Multi-Brand Vendor Settlement & BA Commission Desk (Text Left, Visual Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text Content Left */}
            <div>
              <span className="inline-block rounded-full border border-blue-200/80 bg-blue-50/60 px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-blue-800 dark:border-blue-900/40 dark:bg-blue-950/40 dark:text-blue-300">
                Pillar 4 • Multi-Brand &amp; BA Commissions
              </span>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
                Brand Promoter Settlements &amp; Automated Vendor RTV Claims
              </h2>
              <div className="mt-4 rounded-xl border border-neutral-200/80 bg-neutral-50 p-4 text-sm text-neutral-700 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300">
                <strong className="block text-neutral-900 dark:text-white mb-1">The Problem Solved:</strong>
                Beauty stores carry dozens of brands (L\'Oréal, Maybelline, Minimalist) with conflicting promoter commissions, complex margin tiers, and messy damaged bottle return reconciliations.
              </div>
              <p className="mt-4 text-base text-neutral-600 leading-relaxed dark:text-slate-400">
                Priyulabs tracks sales by assigned brand promoter (Beauty Advisor), automatically computing vendor-sponsored sales bonuses and margins. Damaged goods are batched into Return-to-Vendor (RTV) debit notes with 1-click vendor credit adjustments.
              </p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-start gap-3 text-sm font-semibold text-neutral-800 dark:text-slate-200">
                  <Check size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>Multi-brand vendor margin accounting across concessionaires and direct supply</span>
                </li>
                <li className="flex items-start gap-3 text-sm font-semibold text-neutral-800 dark:text-slate-200">
                  <Check size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>Beauty Advisor (BA) incentive logs calculated per brand counter daily</span>
                </li>
                <li className="flex items-start gap-3 text-sm font-semibold text-neutral-800 dark:text-slate-200">
                  <Check size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>Instant RTV debit note generation for damaged packaging and leaking seals</span>
                </li>
              </ul>
            </div>

            {/* Visual Mockup Right */}
            <div className="rounded-3xl border border-neutral-200/80 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900">
              {/* Store Interior Image Banner: Multi-Brand Counter */}
              <div className="group relative h-48 sm:h-52 w-full overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-900 mb-5 dark:border-slate-800">
                <img
                  src="https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1200&q=80"
                  alt="Multi-brand beauty store counter and checkout desk"
                  onError={(e) => {
                    e.currentTarget.src = '/assets/sector_cosmetics.jpg';
                  }}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent flex items-end p-3.5">
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-neutral-900/80 backdrop-blur-md px-2.5 py-1 text-[11px] font-bold text-white border border-white/20">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                    Multi-Brand Counters • BA Sales Desk
                  </span>
                </div>
              </div>

              {/* Vendor Settlement & BA Desk UI Card */}
              <div className="rounded-2xl border border-neutral-100 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/80">
                <div className="flex items-center justify-between border-b border-neutral-100 pb-3 mb-4 dark:border-slate-800">
                  <div>
                    <h4 className="font-bold text-base text-neutral-900 dark:text-white">Vendor Settlement &amp; BA Desk</h4>
                    <span className="text-xs text-neutral-500">Daily Counter Reconciliation • Store 01</span>
                  </div>
                  <span className="rounded-md bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-blue-800 dark:bg-blue-950/40 dark:text-blue-300">
                    3 Brands Synced
                  </span>
                </div>

                {/* Brand Margins Table */}
                <div className="rounded-xl bg-neutral-50 p-3 space-y-2 mb-3 text-xs dark:bg-slate-800/50">
                  <div className="flex justify-between pb-1.5 border-b border-dashed border-neutral-200 dark:border-slate-700">
                    <span>L\'Oréal Paris (BA: Pooja K.)</span>
                    <strong className="text-neutral-900 dark:text-white">Sales: ₹14,200 • Margin 28%</strong>
                  </div>
                  <div className="flex justify-between pb-1.5 border-b border-dashed border-neutral-200 dark:border-slate-700">
                    <span>Maybelline New York (BA: Reema)</span>
                    <strong className="text-neutral-900 dark:text-white">Sales: ₹9,800 • Margin 32%</strong>
                  </div>
                  <div className="flex justify-between pt-0.5">
                    <span>Minimalist Derma (Direct Brand)</span>
                    <strong className="text-neutral-900 dark:text-white">Sales: ₹11,500 • Margin 25%</strong>
                  </div>
                </div>

                {/* RTV Claim Box */}
                <div className="rounded-xl border border-red-200 bg-red-50/60 p-3 text-xs mb-3 flex items-center justify-between dark:border-red-900/40 dark:bg-red-950/20">
                  <div>
                    <strong className="block text-red-900 dark:text-red-300">RTV Claim #RTV-4019 Generated</strong>
                    <span className="text-[11px] text-red-700 dark:text-red-400">2 Leaking Foundation Bottles • Credit: ₹2,900</span>
                  </div>
                  <span className="rounded bg-red-600 px-2 py-0.5 text-[10px] font-bold text-white shadow-xs">
                    Vendor Signed
                  </span>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-neutral-100 text-xs text-neutral-600 dark:border-slate-800 dark:text-slate-400">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">BA Incentive Payouts Auto-Credited</span>
                  <span>GSTR-1 Reconciled</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          4. 6-CARD FEATURE MATRIX (Clean Cards, No Bottom Links)
      ══════════════════════════════════════════════════════════ */}
      <section className="border-t border-b border-neutral-200/80 bg-neutral-50/60 py-24 dark:border-slate-800 dark:bg-slate-900/40">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400">
              COMPLETE BEAUTY RETAIL SUITE
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
              Engineered Specifically for High-Velocity Cosmetic Merchants
            </h2>
            <p className="mt-4 text-base text-neutral-600 dark:text-slate-400">
              From batch-level FEFO protections to multi-brand concessionaire settlements, every feature eliminates retail margin leakage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cosmeticFeatures.map((feat) => {
              const IconComponent = feat.icon;
              return (
                <div
                  key={feat.title}
                  className="rounded-2xl border border-neutral-200/80 bg-white p-7 shadow-xs transition hover:border-neutral-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-neutral-200/60 bg-neutral-50 text-neutral-800 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200">
                    <IconComponent size={20} className="text-rose-600 dark:text-rose-400" />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                    {feat.title}
                  </h3>
                  <p className="mt-2.5 text-sm text-neutral-600 leading-relaxed dark:text-slate-400">
                    {feat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          5. HIGH-CONTRAST CTA BANNER
      ══════════════════════════════════════════════════════════ */}
            {/* ──────────────────────────────────────────────────────────
          WHITE EDITORIAL TRUST BOTTOM CTA
      ────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-slate-50/60 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex justify-center">
          <div className="max-w-[1180px] w-full min-h-[500px] rounded-[28px] overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-center gap-10 p-8 md:p-14 bg-white border border-slate-200 shadow-sm relative dark:bg-slate-900 dark:border-slate-800">
            {/* Background Visual Layers */}
            <div
              className="absolute inset-0 bg-cover bg-right opacity-100 z-1"
              style={{ backgroundImage: `url('${'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1600&q=80'}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 lg:via-white/80 to-white/40 lg:to-transparent z-2 dark:from-slate-900 dark:via-slate-900/90 lg:dark:via-slate-900/80 dark:to-slate-900/40" />

            {/* Left Content Column */}
            <div className="lg:col-span-7 z-10 flex flex-col justify-center text-left">
              <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50/90 px-3.5 py-1 text-[11px] font-bold tracking-wider text-orange-800 uppercase w-max mb-4 dark:border-orange-900/40 dark:bg-orange-950/40 dark:text-orange-300">
                BEAUTY & DERMA COUNTER OS
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-slate-900 tracking-tight leading-[1.18] dark:text-white">
                Liquidate Batches Faster. <span className="text-orange-600">Zero Shelf Expiry.</span>
              </h2>
              <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl dark:text-slate-300">
                Enforce intelligent FEFO barcode billing, manage tester stock shrinkage ledgers, and automate beauty advisor vendor commissions without manual paperwork.
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
                  <svg width="15" height="15" fill="none" stroke="#ea580c" stroke-width="2.5" viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Complete Setup
                </span>
                <span className="inline-flex items-center gap-2">
                  <svg width="15" height="15" fill="none" stroke="#ea580c" stroke-width="2.5" viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Easy to access
                </span>
                <span className="inline-flex items-center gap-2">
                  <svg width="15" height="15" fill="none" stroke="#ea580c" stroke-width="2.5" viewBox="0 0 24 24">
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
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="8" r="6" />
                      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white">Made in India</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Engineered for Indian Businesses</div>
                  </div>
                </div>
                <span className="rounded-full px-2.5 py-0.5 text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-wider shrink-0 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800">
                  National
                </span>
              </div>

              {/* Card 2 (Verified) */}
              <div className="rounded-2xl border border-slate-200/90 bg-white/95 backdrop-blur-md p-4 sm:p-5 shadow-xs flex items-center justify-between gap-4 dark:border-slate-800 dark:bg-slate-900/95">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#059669] text-white flex items-center justify-center shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#059669] dark:text-emerald-400">SECURE</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">SSL 256-Bit Bank Encryption</div>
                  </div>
                </div>
                <span className="rounded-full px-2.5 py-0.5 text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase tracking-wider shrink-0 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800">
                  Verified
                </span>
              </div>

              {/* Card 3 (Certified) */}
              <div className="rounded-2xl border border-slate-200/90 bg-white/95 backdrop-blur-md p-4 sm:p-5 shadow-xs flex items-center justify-between gap-4 dark:border-slate-800 dark:bg-slate-900/95">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#2563eb] text-white flex items-center justify-center shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white">Trusted by MSME's</div>
                    <div className="text-xs font-mono tracking-tight text-slate-600 dark:text-slate-400">Udyam: UDYAM-OD-19-0177979</div>
                  </div>
                </div>
                <span className="rounded-full px-2.5 py-0.5 text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200 uppercase tracking-wider shrink-0 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800">
                  Certified
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
