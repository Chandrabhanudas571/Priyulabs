import { motion } from 'framer-motion';
import {
  Layers,
  Scissors,
  TrendingDown,
  RefreshCw,
  Printer,
  Calendar,
  Users,
  Clock,
  Sparkles,
  Receipt,
  ArrowRight,
  Zap,
  MessageCircle,
  Check,
  ShieldCheck
} from 'lucide-react';

const featureMatrix = [
  {
    icon: Printer,
    title: 'Custom Barcode & Care Tag Printing',
    description:
      'Design and print customized apparel tags with care icons, wash instructions, MRP, and size-color matrix barcodes directly from new shipment manifests.',
  },
  {
    icon: Calendar,
    title: 'Seasonal Split & Collection Planner',
    description:
      'Categorize inventory by Summer/Festive/Winter lines with auto-archival for previous season SKUs and structured multi-year collection tracking.',
  },
  {
    icon: Users,
    title: 'Designer Consignment & Margin Splits',
    description:
      'Handle multi-designer inventory splits, commission accounting, and weekly vendor payouts without manual spreadsheets or reconciliation disputes.',
  },
  {
    icon: Clock,
    title: 'Trial-Room & Fitting Hold System',
    description:
      'Place items on customer fitting hold directly on tablet POS with 30-minute auto-release triggers to prevent stock locking during busy evening hours.',
  },
  {
    icon: Sparkles,
    title: 'VIP Clienteling & Wardrobe History',
    description:
      'View customer size profiles, purchase timelines, and tailored style preferences for personalized WhatsApp upselling and new collection lookbooks.',
  },
  {
    icon: Receipt,
    title: '1-Click 5% / 12% Slab GST Invoicing',
    description:
      'Auto-apply garment price-dependent GST tax slabs (HSN 6109/6204) with compliant e-invoicing, automatic credit note generation, and zero manual calculation errors.',
  },
];

export function ApparelBoutiquesPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-pink-500 selection:text-white dark:bg-slate-950 dark:text-slate-100">
      {/* ══════════════════════════════════════════════════════════
          1. HERO SECTION & 3-PHOTO GALLERY STRIP
      ══════════════════════════════════════════════════════════ */}
      <section className="relative border-b border-neutral-200/80 bg-gradient-to-b from-[#fbfcfe] to-white pt-16 pb-12 text-center dark:border-slate-800 dark:from-slate-950 dark:to-slate-900">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-pink-200/80 bg-pink-50/60 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-pink-900 shadow-xs dark:border-pink-900/40 dark:bg-pink-950/40 dark:text-pink-300"
          >
            <span className="h-2 w-2 rounded-full bg-pink-600 animate-pulse" />
            APPAREL BOUTIQUES, DESIGNER STUDIOS &amp; HIGH-STREET LABELS
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-6xl max-w-4xl mx-auto leading-[1.1] dark:text-white"
          >
            Size-Color Matrix POS. In-House Alteration Desk.{' '}
            <span className="text-pink-600 dark:text-pink-400">Zero Dead Stock.</span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 max-w-3xl mx-auto text-base text-neutral-600 sm:text-lg leading-relaxed font-normal dark:text-slate-400"
          >
            The omnichannel retail operating system engineered for garment brands — lightning-fast variant billing, tailor workflow slips, automated EOSS discounts, and live Instagram catalog sync.
          </motion.p>

          {/* Dual CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <a href="/#free-trial"
              className="inline-flex items-center gap-2 rounded-xl bg-neutral-900 px-7 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-neutral-800 hover:-translate-y-0.5 dark:bg-white dark:text-neutral-900 dark:hover:bg-slate-100"
            >
              Get Started Today
              <ArrowRight size={16} />
            </a>
            <a
              href="#matrix-features"
              className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-7 py-3.5 text-sm font-bold text-neutral-800 transition hover:bg-neutral-50 hover:-translate-y-0.5 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <Zap size={16} className="text-pink-600 dark:text-pink-400" />
              See Apparel Billing Speed
            </a>
          </motion.div>

          {/* 4 Core Solutions Sub-Strip */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-10 mx-auto max-w-4xl flex flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-2xl border border-neutral-200/70 bg-white/80 backdrop-blur-sm px-6 py-3 text-xs md:text-[13px] font-medium text-neutral-600 shadow-xs dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300"
          >
            <span>Dual-Screen Matrix Billing POS</span>
            <span className="text-neutral-300 dark:text-slate-600 select-none">✦</span>
            <span>Multi-Store Inventory & Alteration Tracker</span>
            <span className="text-neutral-300 dark:text-slate-600 select-none">✦</span>
            <span>Live WhatsApp Web Catalog & Lookbook</span>
            <span className="text-neutral-300 dark:text-slate-600 select-none">✦</span>
            <span>Targeted Instagram Footfall Campaigns</span>
          </motion.div>

          {/* Hero 3-Photo Gallery Strip */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5 text-left"
          >
            {/* Image 1: Boutique Interior */}
            <div className="group relative h-64 md:h-80 w-full overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-900 shadow-sm transition hover:border-neutral-300 hover:shadow-md dark:border-slate-800">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80"
                alt="Luxury boutique store interior with organized apparel racks"
                onError={(e) => {
                  e.currentTarget.src = '/assets/sector_fashion.jpg';
                }}
                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-md w-max mb-1.5">
                  Showroom Floor
                </span>
                <h4 className="text-base font-bold leading-tight">Luxury Boutique Layout</h4>
                <p className="text-xs text-neutral-300">Multi-rack variant organization</p>
              </div>
            </div>

            {/* Image 2: Center Hero Focus (Boutique Counter POS - Local Asset Guaranteed) */}
            <div className="group relative h-64 md:h-80 w-full overflow-hidden rounded-2xl border border-neutral-300 bg-neutral-900 shadow-md transition hover:border-neutral-400 hover:shadow-lg dark:border-slate-700">
              <img
                src="/assets/sector_fashion.jpg"
                alt="Modern boutique checkout counter with touch POS screen and card terminal"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=80';
                }}
                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-pink-500/80 backdrop-blur-md px-2 py-0.5 rounded-md w-max mb-1.5">
                  1.8s Matrix Checkout
                </span>
                <h4 className="text-base font-bold leading-tight">Boutique Smart POS Counter</h4>
                <p className="text-xs text-neutral-300">Size-color grid &amp; EDC sync</p>
              </div>
            </div>

            {/* Image 3: Tailoring / Alteration Workspace */}
            <div className="group relative h-64 md:h-80 w-full overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-900 shadow-sm transition hover:border-neutral-300 hover:shadow-md dark:border-slate-800">
              <img
                src="https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=1200&q=80"
                alt="In-house tailoring workspace with fabrics and measuring tape"
                onError={(e) => {
                  e.currentTarget.src = '/assets/sector_fashion.jpg';
                }}
                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-md w-max mb-1.5">
                  In-House Desk
                </span>
                <h4 className="text-base font-bold leading-tight">Digital Alteration Workspace</h4>
                <p className="text-xs text-neutral-300">SMS job slips &amp; fitting logs</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          2. INTERACTIVE FEATURE SHOWCASE (Split Live UI Mockups)
      ══════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-white dark:bg-slate-950" id="pillars">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 space-y-24">
          
          {/* Block 1: Variant Matrix Billing Grid (Visual Left, Text Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Visual Mockup Box */}
            <div className="rounded-3xl border border-neutral-200/80 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900">
              {/* Store Interior Image Banner */}
              <div className="group relative h-48 sm:h-52 w-full overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-900 mb-5 dark:border-slate-800">
                <img
                  src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=1200&q=80"
                  alt="Apparel boutique showroom interior with organized clothing racks"
                  onError={(e) => {
                    e.currentTarget.src = '/assets/sector_fashion.jpg';
                  }}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent flex items-end p-3.5">
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-neutral-900/80 backdrop-blur-md px-2.5 py-1 text-[11px] font-bold text-white border border-white/20">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Showroom Floor • Variant Racks
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-neutral-100 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/80">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-neutral-100 pb-3 mb-4 dark:border-slate-800">
                  <div>
                    <h4 className="font-bold text-base text-neutral-900 dark:text-white">Linen Relaxed Shirt</h4>
                    <span className="text-xs text-neutral-500">SKU: LRS-2026 • HSN 6205</span>
                  </div>
                  <span className="text-lg font-extrabold text-neutral-900 dark:text-white">₹2,499</span>
                </div>

                {/* Sizes Grid */}
                <div className="mb-4">
                  <span className="text-[10.5px] font-bold uppercase tracking-wider text-neutral-400 block mb-2">
                    Select Size Variant
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {['XS', 'S'].map((sz) => (
                      <span key={sz} className="rounded-lg border border-neutral-200 px-3.5 py-1.5 text-xs font-bold text-neutral-700 dark:border-slate-700 dark:text-slate-300">
                        {sz}
                      </span>
                    ))}
                    <span className="rounded-lg bg-neutral-900 px-3.5 py-1.5 text-xs font-bold text-white dark:bg-white dark:text-neutral-900 shadow-xs">
                      M
                    </span>
                    {['L', 'XL', 'XXL'].map((sz) => (
                      <span key={sz} className="rounded-lg border border-neutral-200 px-3.5 py-1.5 text-xs font-bold text-neutral-700 dark:border-slate-700 dark:text-slate-300">
                        {sz}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Colors Grid */}
                <div className="mb-4">
                  <span className="text-[10.5px] font-bold uppercase tracking-wider text-neutral-400 block mb-2">
                    Select Colorway
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-2 rounded-lg border border-neutral-900 bg-white px-3 py-1.5 text-xs font-bold text-neutral-900 dark:border-white dark:bg-slate-800 dark:text-white">
                      <span className="h-3 w-3 rounded-full bg-blue-900" />
                      Midnight Navy
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-xs font-semibold text-neutral-700 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-300">
                      <span className="h-3 w-3 rounded-full bg-[#d4b996]" />
                      Sand Beige
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-xs font-semibold text-neutral-700 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-300">
                      <span className="h-3 w-3 rounded-full bg-slate-700" />
                      Charcoal
                    </span>
                  </div>
                </div>

                {/* Stock Table */}
                <div className="mt-4 overflow-hidden rounded-xl border border-neutral-100 dark:border-slate-800">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-neutral-50 text-[10px] font-bold uppercase tracking-wider text-neutral-500 dark:bg-slate-800/60 dark:text-slate-400">
                      <tr>
                        <th className="p-2.5">Variant</th>
                        <th className="p-2.5">Godown</th>
                        <th className="p-2.5">Rack / Shelf</th>
                        <th className="p-2.5">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100 dark:divide-slate-800">
                      <tr>
                        <td className="p-2.5 font-bold text-neutral-900 dark:text-white">Navy / S</td>
                        <td className="p-2.5 text-neutral-600 dark:text-slate-400">8 pcs</td>
                        <td className="p-2.5 text-neutral-600 dark:text-slate-400">Rack A-04</td>
                        <td className="p-2.5">
                          <span className="rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
                            12 In Stock
                          </span>
                        </td>
                      </tr>
                      <tr className="bg-neutral-50/50 dark:bg-slate-800/30">
                        <td className="p-2.5 font-bold text-neutral-900 dark:text-white">Navy / M</td>
                        <td className="p-2.5 text-neutral-600 dark:text-slate-400">2 pcs</td>
                        <td className="p-2.5 text-neutral-600 dark:text-slate-400">Display Shelf</td>
                        <td className="p-2.5">
                          <span className="rounded bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700 dark:bg-amber-950/40 dark:text-amber-300">
                            4 Left
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold text-neutral-900 dark:text-white">Navy / L</td>
                        <td className="p-2.5 text-neutral-600 dark:text-slate-400">6 pcs</td>
                        <td className="p-2.5 text-neutral-600 dark:text-slate-400">Rack A-05</td>
                        <td className="p-2.5">
                          <span className="rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
                            8 In Stock
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold text-neutral-900 dark:text-white">Navy / XL</td>
                        <td className="p-2.5 text-neutral-600 dark:text-slate-400">0 pcs</td>
                        <td className="p-2.5 text-neutral-600 dark:text-slate-400">—</td>
                        <td className="p-2.5">
                          <span className="rounded bg-red-50 px-2 py-0.5 text-[10px] font-bold text-red-700 dark:bg-red-950/40 dark:text-red-300">
                            0 (Backorder)
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Footer Bar */}
                <div className="mt-4 flex items-center justify-between pt-3 border-t border-neutral-100 text-xs dark:border-slate-800">
                  <span className="flex items-center gap-1.5 font-bold text-emerald-600">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    Scan Confirmed • Barcode #89012443
                  </span>
                  <span className="rounded-md bg-neutral-100 px-2.5 py-1 text-[11px] font-extrabold text-neutral-700 dark:bg-slate-800 dark:text-slate-300">
                    1.8s Matrix Checkout
                  </span>
                </div>
              </div>
            </div>

            {/* Text Content Right */}
            <div>
              <span className="inline-block rounded-full border border-pink-200/80 bg-pink-50/60 px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-pink-800 dark:border-pink-900/40 dark:bg-pink-950/40 dark:text-pink-300">
                Size-Color-Fit Matrix
              </span>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
                Ring Up Multi-Variant Garments in 1.8 Seconds
              </h2>
              <div className="mt-4 rounded-xl border border-neutral-200/80 bg-neutral-50 p-4 text-sm text-neutral-700 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300">
                <strong className="block text-neutral-900 dark:text-white mb-1">The Problem Solved:</strong>
                Apparel cashiers lose 40+ seconds per shopper scrolling through hundreds of single-item SKUs or deciphering handwritten paper price tags.
              </div>
              <p className="mt-4 text-base text-neutral-600 leading-relaxed dark:text-slate-400">
                Staff simply tap the parent design SKU and instantly view every size, fit, and color combination on an interactive matrix grid. Scan barcode or tap the matrix — the POS automatically applies the appropriate size-level HSN code and pulls real-time rack availability.
              </p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-start gap-3 text-sm font-semibold text-neutral-800 dark:text-slate-200">
                  <Check size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>Instant size &amp; color picker with live shelf stock indicators</span>
                </li>
                <li className="flex items-start gap-3 text-sm font-semibold text-neutral-800 dark:text-slate-200">
                  <Check size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>Prevents counter staff from billing out-of-stock sizes</span>
                </li>
                <li className="flex items-start gap-3 text-sm font-semibold text-neutral-800 dark:text-slate-200">
                  <Check size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>1-Click size exchange on counter without invoice deletion</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Block 2: Tailor & Alteration Workflow Engine (Text Left, Visual Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text Content Left */}
            <div>
              <span className="inline-block rounded-full border border-emerald-200/80 bg-emerald-50/60 px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-800 dark:border-emerald-900/40 dark:bg-emerald-950/40 dark:text-emerald-300">
                Digital Alteration Desk
              </span>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
                Zero Misplaced Garments. In-House Tailoring on Autopilot.
              </h2>
              <div className="mt-4 rounded-xl border border-neutral-200/80 bg-neutral-50 p-4 text-sm text-neutral-700 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300">
                <strong className="block text-neutral-900 dark:text-white mb-1">The Problem Solved:</strong>
                Paper fitting slips get lost, customer measurements are scribbled illegibly, and tailors get blamed for wrong fittings during trial pickups.
              </div>
              <p className="mt-4 text-base text-neutral-600 leading-relaxed dark:text-slate-400">
                Stylists log customer fitting adjustments right on the counter tablet during checkout. The job slip is assigned to the master tailor's queue, tracks piece-rate labor costs, and sends an automated WhatsApp message with a trial pickup time as soon as the garment is finished.
              </p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-start gap-3 text-sm font-semibold text-neutral-800 dark:text-slate-200">
                  <Check size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>Digital customer measurement vault saved across repeat visits</span>
                </li>
                <li className="flex items-start gap-3 text-sm font-semibold text-neutral-800 dark:text-slate-200">
                  <Check size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>Live alteration queue tracking between boutique floor &amp; tailor desk</span>
                </li>
                <li className="flex items-start gap-3 text-sm font-semibold text-neutral-800 dark:text-slate-200">
                  <Check size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>Automated WhatsApp pickup alerts sent when garment is pressed &amp; hung</span>
                </li>
              </ul>
            </div>

            {/* Visual Mockup Right */}
            <div className="rounded-3xl border border-neutral-200/80 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900">
              {/* Store Interior Image Banner: Tailor Studio */}
              <div className="group relative h-48 sm:h-52 w-full overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-900 mb-5 dark:border-slate-800">
                <img
                  src="https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=1200&q=80"
                  alt="Master tailor measuring fabrics and garment patterns in studio workshop"
                  onError={(e) => {
                    e.currentTarget.src = '/assets/sector_fashion.jpg';
                  }}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent flex items-end p-3.5">
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-neutral-900/80 backdrop-blur-md px-2.5 py-1 text-[11px] font-bold text-white border border-white/20">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    In-House Tailoring Studio • Fitting Bay
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-neutral-100 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/80">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-neutral-100 pb-3 mb-4 dark:border-slate-800">
                  <div>
                    <h4 className="font-bold text-base text-neutral-900 dark:text-white">Job Slip #8921</h4>
                    <span className="text-xs text-neutral-500">Invoice #PL-2026-904 • Order Date: Today</span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-bold text-emerald-800 dark:border-emerald-900/40 dark:bg-emerald-950/40 dark:text-emerald-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                    In Alteration
                  </span>
                </div>

                {/* Profile Grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="rounded-xl bg-neutral-50 p-3 dark:bg-slate-800/50">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-0.5">Customer Profile</span>
                    <strong className="text-xs text-neutral-900 dark:text-white block">Ananya Sharma</strong>
                    <span className="text-[11px] text-neutral-500">+91 98201 •••••</span>
                  </div>
                  <div className="rounded-xl bg-neutral-50 p-3 dark:bg-slate-800/50">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-0.5">Assigned Tailor</span>
                    <strong className="text-xs text-neutral-900 dark:text-white block">Master Rafiq</strong>
                    <span className="text-[11px] text-neutral-500">Station 2 • Tailor Bay</span>
                  </div>
                  <div className="rounded-xl bg-neutral-50 p-3 dark:bg-slate-800/50">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-0.5">Garment Style</span>
                    <strong className="text-xs text-neutral-900 dark:text-white block">Wool Tailored Blazer</strong>
                    <span className="text-[11px] text-neutral-500">Charcoal • Size M</span>
                  </div>
                  <div className="rounded-xl bg-neutral-50 p-3 dark:bg-slate-800/50">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-0.5">Target Trial Time</span>
                    <strong className="text-xs text-neutral-900 dark:text-white block">Today, 6:30 PM</strong>
                    <span className="text-[11px] font-bold text-emerald-600">On Schedule</span>
                  </div>
                </div>

                {/* Measurements Box */}
                <div className="rounded-xl border border-dashed border-neutral-300 bg-neutral-50/50 p-3.5 mb-4 text-xs text-neutral-700 dark:border-slate-700 dark:bg-slate-800/30 dark:text-slate-300">
                  <span className="text-[10.5px] font-bold uppercase tracking-wider text-neutral-400 block mb-2">
                    Recorded Alteration Adjustments
                  </span>
                  <div className="flex justify-between mb-1.5">
                    <span>• Waist: Taper contour</span>
                    <strong className="text-neutral-900 dark:text-white">-1.0 inch</strong>
                  </div>
                  <div className="flex justify-between mb-1.5">
                    <span>• Sleeve Length: Hem cuff</span>
                    <strong className="text-neutral-900 dark:text-white">-0.5 inch</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>• Shoulder: Balance check</span>
                    <span className="text-neutral-400">No Change</span>
                  </div>
                </div>

                {/* Footer Wage & Alert */}
                <div className="flex items-center justify-between pt-3 border-t border-neutral-100 text-xs text-neutral-600 dark:border-slate-800 dark:text-slate-400">
                  <span>
                    Piece-Rate Wage: <strong className="text-neutral-900 dark:text-white">₹220</strong> (Auto-credited)
                  </span>
                  <span className="flex items-center gap-1 font-bold text-blue-600 dark:text-blue-400">
                    <MessageCircle size={13} />
                    SMS Alert: Armed
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Block 3: Smart Dead-Stock Liquidation & Aging Inventory Engine (Visual Left, Text Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Visual Mockup Left */}
            <div className="rounded-3xl border border-neutral-200/80 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900">
              {/* Store Interior Image Banner: Seasonal Collection */}
              <div className="group relative h-48 sm:h-52 w-full overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-900 mb-5 dark:border-slate-800">
                <img
                  src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=80"
                  alt="Curated boutique apparel racks and hangers with seasonal clothes"
                  onError={(e) => {
                    e.currentTarget.src = '/assets/sector_fashion.jpg';
                  }}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent flex items-end p-3.5">
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-neutral-900/80 backdrop-blur-md px-2.5 py-1 text-[11px] font-bold text-white border border-white/20">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                    Curated Showroom • Seasonal Collection
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-neutral-100 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/80">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-neutral-100 pb-3 mb-4 dark:border-slate-800">
                  <div>
                    <h4 className="font-bold text-base text-neutral-900 dark:text-white">Seasonal Stock Aging Report</h4>
                    <span className="text-xs text-neutral-500">Summer &apos;26 Collection • 1,420 Active Units</span>
                  </div>
                  <span className="rounded-md bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-800 dark:bg-amber-950/40 dark:text-amber-300">
                    Pre-EOSS Scan
                  </span>
                </div>

                {/* Stacked Aging Bar */}
                <span className="text-[10.5px] font-bold uppercase tracking-wider text-neutral-400 block mb-2">
                  Stock Aging Distribution
                </span>
                <div className="h-3 w-full overflow-hidden rounded-full bg-neutral-100 flex mb-4 dark:bg-slate-800">
                  <div className="bg-emerald-500 h-full" style={{ width: '58%' }} title="0-30 Days: 58%" />
                  <div className="bg-blue-500 h-full" style={{ width: '24%' }} title="31-60 Days: 24%" />
                  <div className="bg-amber-500 h-full" style={{ width: '11%' }} title="61-90 Days: 11%" />
                  <div className="bg-red-500 h-full" style={{ width: '7%' }} title=">90 Days: 7%" />
                </div>

                {/* Aging Legend Grid */}
                <div className="grid grid-cols-2 gap-2.5 mb-4 text-xs">
                  <div className="flex items-center gap-2 rounded-lg bg-neutral-50 p-2 dark:bg-slate-800/50">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shrink-0" />
                    <span className="text-neutral-700 dark:text-slate-300">0–30d: <strong className="text-neutral-900 dark:text-white">820 SKUs</strong> (Fresh)</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-neutral-50 p-2 dark:bg-slate-800/50">
                    <span className="h-2.5 w-2.5 rounded-full bg-blue-500 shrink-0" />
                    <span className="text-neutral-700 dark:text-slate-300">31–60d: <strong className="text-neutral-900 dark:text-white">350 SKUs</strong> (Core)</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-neutral-50 p-2 dark:bg-slate-800/50">
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500 shrink-0" />
                    <span className="text-neutral-700 dark:text-slate-300">61–90d: <strong className="text-neutral-900 dark:text-white">160 SKUs</strong> (Watch)</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-neutral-50 p-2 dark:bg-slate-800/50">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500 shrink-0" />
                    <span className="text-neutral-700 dark:text-slate-300">&gt;90d: <strong className="text-neutral-900 dark:text-white">90 SKUs</strong> (Action)</span>
                  </div>
                </div>

                {/* AI Bundle Recommendation Box */}
                <div className="rounded-xl border border-dashed border-amber-300 bg-amber-50/50 p-3.5 mb-4 text-xs text-neutral-700 dark:border-amber-900/40 dark:bg-amber-950/20 dark:text-slate-300">
                  <strong className="text-neutral-900 dark:text-white block mb-1">
                    Recommended Bundle: Liquidate 90 Stagnant Tops
                  </strong>
                  Pair &apos;Linen Cardigan&apos; with &apos;Slim Stretch Chino&apos; for <strong className="text-neutral-900 dark:text-white">Flat 25% Off</strong>. Projected clearance: 84% stock recovered before End of Season Sale.
                </div>

                {/* Footer Bar */}
                <div className="flex items-center justify-between pt-3 border-t border-neutral-100 text-xs text-neutral-600 dark:border-slate-800 dark:text-slate-400">
                  <span>
                    Target Audience: <strong className="text-neutral-900 dark:text-white">340 VIP Buyers</strong>
                  </span>
                  <span className="flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400">
                    <MessageCircle size={13} />
                    1-Click WhatsApp Campaign
                  </span>
                </div>
              </div>
            </div>

            {/* Text Content Right */}
            <div>
              <span className="inline-block rounded-full border border-amber-200/80 bg-amber-50/60 px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-800 dark:border-amber-900/40 dark:bg-amber-950/40 dark:text-amber-300">
                Pillar 3 • Dead-Stock Engine
              </span>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
                Automated Season Aging &amp; Dynamic Markdown Engine
              </h2>
              <div className="mt-4 rounded-xl border border-neutral-200/80 bg-neutral-50 p-4 text-sm text-neutral-700 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300">
                <strong className="block text-neutral-900 dark:text-white mb-1">The Problem Solved:</strong>
                Apparel boutiques lock 20–35% of working capital in off-season sizes and slow-moving colorways that sit on hangers until forced clearance.
              </div>
              <p className="mt-4 text-base text-neutral-600 leading-relaxed dark:text-slate-400">
                Automated inventory aging reports identify stagnating SKUs weeks before end-of-season sales. Priyulabs suggests smart bundle discounts and WhatsApp flash promotions, converting trapped shelf capital into liquid cash before fashion lines turn obsolete.
              </p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-start gap-3 text-sm font-semibold text-neutral-800 dark:text-slate-200">
                  <Check size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>60/90-Day SKU aging alerts flag slow-moving sizes before dead-stock accumulates</span>
                </li>
                <li className="flex items-start gap-3 text-sm font-semibold text-neutral-800 dark:text-slate-200">
                  <Check size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>AI bundle builder pairs slow-moving tops with high-velocity bottoms</span>
                </li>
                <li className="flex items-start gap-3 text-sm font-semibold text-neutral-800 dark:text-slate-200">
                  <Check size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>Pre-EOSS VIP flash sales target discount seekers via WhatsApp campaigns</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Block 4: Omnichannel Store-to-Catalog Live Sync (Text Left, Visual Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text Content Left */}
            <div>
              <span className="inline-block rounded-full border border-blue-200/80 bg-blue-50/60 px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-blue-800 dark:border-blue-900/40 dark:bg-blue-950/40 dark:text-blue-300">
                Pillar 4 • Omnichannel Sync
              </span>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
                One Real-Time Ledger Across Boutique Floor, WhatsApp &amp; Web
              </h2>
              <div className="mt-4 rounded-xl border border-neutral-200/80 bg-neutral-50 p-4 text-sm text-neutral-700 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300">
                <strong className="block text-neutral-900 dark:text-white mb-1">The Problem Solved:</strong>
                Garment stores suffer embarrassing double-selling when an online customer orders the exact same single dress that a walk-in shopper just carried to the counter.
              </div>
              <p className="mt-4 text-base text-neutral-600 leading-relaxed dark:text-slate-400">
                Every physical billing transaction instantly updates your online boutique showroom and WhatsApp product catalog. If the last medium size sells on the floor, it vanishes from online checkout within 300 milliseconds — eliminating awkward order cancellations and refund disputes.
              </p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-start gap-3 text-sm font-semibold text-neutral-800 dark:text-slate-200">
                  <Check size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>300ms multi-channel lock prevents walk-in and online shoppers from double-ordering</span>
                </li>
                <li className="flex items-start gap-3 text-sm font-semibold text-neutral-800 dark:text-slate-200">
                  <Check size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>Direct WhatsApp catalog orders allow shoppers to browse and hold garments</span>
                </li>
                <li className="flex items-start gap-3 text-sm font-semibold text-neutral-800 dark:text-slate-200">
                  <Check size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>Centralized multi-store transfers balance stock between branches in real time</span>
                </li>
              </ul>
            </div>

            {/* Visual Mockup Right */}
            <div className="rounded-3xl border border-neutral-200/80 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900">
              {/* Store Interior Image Banner: Omnichannel Hub */}
              <div className="group relative h-48 sm:h-52 w-full overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-900 mb-5 dark:border-slate-800">
                <img
                  src="https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=80"
                  alt="Contemporary fashion boutique storefront and checkout counter"
                  onError={(e) => {
                    e.currentTarget.src = '/assets/sector_fashion.jpg';
                  }}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent flex items-end p-3.5">
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-neutral-900/80 backdrop-blur-md px-2.5 py-1 text-[11px] font-bold text-white border border-white/20">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                    Flagship Store • Omnichannel Dispatch Floor
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-neutral-100 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/80">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-neutral-100 pb-3 mb-4 dark:border-slate-800">
                  <div>
                    <h4 className="font-bold text-base text-neutral-900 dark:text-white">Omnichannel Ledger Status</h4>
                    <span className="text-xs text-neutral-500">Central Cloud Inventory Hub • Active 24/7</span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-bold text-emerald-800 dark:border-emerald-900/40 dark:bg-emerald-950/40 dark:text-emerald-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
                    0.2s Sync
                  </span>
                </div>

                {/* Channel Status Bar */}
                <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
                  <div className="rounded-xl bg-neutral-50 p-2.5 dark:bg-slate-800/50">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-0.5">Floor POS</span>
                    <strong className="text-xs text-neutral-900 dark:text-white block">Terminal 01</strong>
                  </div>
                  <div className="rounded-xl bg-neutral-50 p-2.5 dark:bg-slate-800/50">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-0.5">WhatsApp</span>
                    <strong className="text-xs text-emerald-600 dark:text-emerald-400 block">Synced</strong>
                  </div>
                  <div className="rounded-xl bg-neutral-50 p-2.5 dark:bg-slate-800/50">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-0.5">Web Store</span>
                    <strong className="text-xs text-blue-600 dark:text-blue-400 block">Live</strong>
                  </div>
                </div>

                {/* Live Event Log */}
                <span className="text-[10.5px] font-bold uppercase tracking-wider text-neutral-400 block mb-2">
                  Live Transaction Stream
                </span>
                <div className="space-y-2 mb-4">
                  <div className="flex items-start gap-2.5 rounded-xl border border-neutral-100 bg-neutral-50/50 p-2.5 text-xs dark:border-slate-800 dark:bg-slate-800/30">
                    <Check size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <strong className="text-neutral-900 dark:text-white block">Counter Billing: Silk Anarkali Dress</strong>
                      <span className="text-neutral-500">Emerald • Size M • Store stock: 1 → 0 units</span>
                    </div>
                    <span className="text-[10px] font-bold text-neutral-400">Just Now</span>
                  </div>

                  <div className="flex items-start gap-2.5 rounded-xl border border-blue-100 bg-blue-50/30 p-2.5 text-xs dark:border-blue-900/30 dark:bg-blue-950/20">
                    <Zap size={14} className="text-blue-600 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <strong className="text-neutral-900 dark:text-white block">WhatsApp Catalog Lock</strong>
                      <span className="text-neutral-500">Size M auto-switched to &apos;Sold Out&apos; on digital store</span>
                    </div>
                    <span className="text-[10px] font-bold text-neutral-400">0.2s ago</span>
                  </div>

                  <div className="flex items-start gap-2.5 rounded-xl border border-purple-100 bg-purple-50/30 p-2.5 text-xs dark:border-purple-900/30 dark:bg-purple-950/20">
                    <ShieldCheck size={14} className="text-purple-600 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <strong className="text-neutral-900 dark:text-white block">Double-Sell Defense Triggered</strong>
                      <span className="text-neutral-500">Online web cart checkout disabled for Size M (Zero conflicts)</span>
                    </div>
                    <span className="text-[10px] font-bold text-neutral-400">0.3s ago</span>
                  </div>
                </div>

                {/* Footer Status */}
                <div className="flex items-center justify-between pt-3 border-t border-neutral-100 text-xs text-neutral-600 dark:border-slate-800 dark:text-slate-400">
                  <span>
                    Double-Sell Protection: <strong className="text-emerald-600 dark:text-emerald-400">100% Active</strong>
                  </span>
                  <span className="rounded-md bg-neutral-100 px-2.5 py-1 text-[11px] font-extrabold text-neutral-700 dark:bg-slate-800 dark:text-slate-300">
                    Zero Order Conflicts
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          3. METRICS COUNTER RIBBON
      ══════════════════════════════════════════════════════════ */}
      <section className="border-t border-b border-neutral-200/80 bg-white py-14 dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="border-l-2 border-neutral-300 pl-5 text-left dark:border-slate-700">
              <div className="text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">1.8s</div>
              <div className="text-sm font-bold text-neutral-900 mt-1 dark:text-white">Fastest Matrix Checkout Speed</div>
              <div className="text-xs text-neutral-500 mt-1 dark:text-slate-400">Sub-second size, fit, and color lookup per line item.</div>
            </div>

            <div className="border-l-2 border-neutral-300 pl-5 text-left dark:border-slate-700">
              <div className="text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">0%</div>
              <div className="text-sm font-bold text-neutral-900 mt-1 dark:text-white">Alteration Fitting Disputes</div>
              <div className="text-xs text-neutral-500 mt-1 dark:text-slate-400">Digital measurement logs saved directly to customer profiles.</div>
            </div>

            <div className="border-l-2 border-neutral-300 pl-5 text-left dark:border-slate-700">
              <div className="text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">32%</div>
              <div className="text-sm font-bold text-neutral-900 mt-1 dark:text-white">Reduction in Dead Seasonal Stock</div>
              <div className="text-xs text-neutral-500 mt-1 dark:text-slate-400">Automated inventory aging reports &amp; dynamic pre-EOSS bundles.</div>
            </div>

            <div className="border-l-2 border-neutral-300 pl-5 text-left dark:border-slate-700">
              <div className="text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">100%</div>
              <div className="text-sm font-bold text-neutral-900 mt-1 dark:text-white">Multi-Store Barcode Accuracy</div>
              <div className="text-xs text-neutral-500 mt-1 dark:text-slate-400">Single central ledger synced with WhatsApp store &amp; website.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          4. 6-CARD FEATURE MATRIX (No Action Links at Bottom)
      ══════════════════════════════════════════════════════════ */}
      <section className="border-b border-neutral-200/80 py-24 bg-neutral-50/50 dark:border-slate-800 dark:bg-slate-900/40" id="matrix-features">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block rounded-full border border-pink-200/60 bg-pink-50/60 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-pink-800 dark:border-pink-900/40 dark:bg-pink-950/40 dark:text-pink-300">
              Modular Apparel Suite
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl text-neutral-900 dark:text-white">
              Core Features Built for Modern Garment Retail
            </h2>
            <p className="mt-3 text-base text-neutral-600 dark:text-slate-400">
              Precision tools designed to manage custom hangtags, designer margin splits, fitting room holds, and compliant GST invoices.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featureMatrix.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-neutral-200/80 bg-white p-7 transition-all duration-200 hover:border-neutral-300 hover:shadow-md hover:-translate-y-0.5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700 flex flex-col gap-3.5"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-50 border border-neutral-200/60 text-neutral-800 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200">
                    <Icon size={20} />
                  </div>
                  <h4 className="text-base font-bold text-neutral-900 leading-snug dark:text-white">
                    {feat.title}
                  </h4>
                  <p className="text-xs text-neutral-600 leading-relaxed dark:text-slate-400 m-0">
                    {feat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          5. BOTTOM CONVERSION SECTION
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
              style={{ backgroundImage: `url('${'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80'}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 lg:via-white/80 to-white/40 lg:to-transparent z-2 dark:from-slate-900 dark:via-slate-900/90 lg:dark:via-slate-900/80 dark:to-slate-900/40" />

            {/* Left Content Column */}
            <div className="lg:col-span-7 z-10 flex flex-col justify-center text-left">
              <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50/90 px-3.5 py-1 text-[11px] font-bold tracking-wider text-orange-800 uppercase w-max mb-4 dark:border-orange-900/40 dark:bg-orange-950/40 dark:text-orange-300">
                APPAREL & FASHION RETAIL OS
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-slate-900 tracking-tight leading-[1.18] dark:text-white">
                Scale From Boutique Floor to <span className="text-orange-600">Omnichannel Brand</span>
              </h2>
              <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl dark:text-slate-300">
                Unify size-color barcode grids, alterations desk tracking, and WhatsApp lookbook pre-orders with real-time multi-branch stock reconciliation.
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

              {/* Chat on WhatsApp (Official Number: 7849074050) */}
              <a
                href="https://wa.me/917849074050?text=Hi%20Priyulabs%2C%20I%20want%20to%20get%20started%20with%20a%20free%20trial"
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
