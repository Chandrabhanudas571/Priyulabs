import { motion } from 'framer-motion';
import {
  Calendar,
  Users,
  Clock,
  Sparkles,
  Scissors,
  Check,
  Zap,
  ArrowRight,
  MessageCircle,
  PackageCheck,
  FileText,
  ShieldCheck,
  Camera,
  Receipt,
  Wallet,
  Star
} from 'lucide-react';

const salonFeatures = [
  {
    icon: PackageCheck,
    title: 'Bridal & Multi-Sitting Package Manager',
    description:
      'Manage 5-sitting bridal packages with automated balance tracking and OTP verification at each visit. Prevents service omission disputes and ensures advance payments are reconciled across sittings.',
  },
  {
    icon: FileText,
    title: 'Client Skin & Hair History Cards',
    description:
      'Store past color formulas, patch test records, hair porosity notes, and stylist preferences for every regular guest. Any stylist on the floor can view past formulas and replicate perfect results.',
  },
  {
    icon: Calendar,
    title: 'Smart Chair & Room Allocation',
    description:
      'Prevent bottlenecks by automatically assigning specialized rooms (Spa, Pedicure, Facial, Waxing) and equipment based on service booked. Avoids multiple estheticians fighting over the same laser or steamer.',
  },
  {
    icon: Wallet,
    title: 'Prepaid Wallet & Loyalty Engine',
    description:
      'Offer advance top-up wallets (e.g. "Pay ₹10,000, Get ₹12,000 Value") with automated ledger management and low-balance alerts. Locks in customer retention and upfront working capital for the salon.',
  },
  {
    icon: Camera,
    title: 'Selfie HRMS & Stylist Attendance',
    description:
      'Track stylist shifts, late punch-ins, OT hours, and tips pool distribution directly through the front-desk tablet. Prevents buddy punching with geo-fenced selfie capture and links straight to payroll.',
  },
  {
    icon: Receipt,
    title: '1-Click GST Service Invoicing',
    description:
      'Generate professional tax invoices with split billing (Services @ 18% GST, Retail Haircare Products @ 28% GST) without manual calculation. Ready for instant WhatsApp delivery and GSTR-1 export.',
  },
];

export function SalonsSpasPage() {
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
            className="inline-flex items-center gap-2 rounded-full border border-amber-200/80 bg-amber-50/70 px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-900 dark:border-amber-900/40 dark:bg-amber-950/40 dark:text-amber-300"
          >
            <span className="h-2 w-2 rounded-full bg-amber-500 shadow-xs" />
            PREMIUM SALONS, LUXURY SPAS & UNISEX BEAUTY PARLOURS
          </motion.div>

          {/* Main Title & Subtitle */}
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mt-6 text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl md:text-6xl dark:text-white"
          >
            Chair Scheduling. Stylist Commissions.<br />
            <span className="text-rose-600 dark:text-rose-400">Gram-Level Stock Control.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mx-auto mt-6 max-w-3xl text-base text-neutral-600 leading-relaxed sm:text-lg dark:text-slate-400"
          >
            The modern salon operating system engineered to eliminate double-bookings, automate multi-tier stylist commission payouts, track consumable hair and facial products, and run OTP-secured bridal package memberships.
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
            <a
              href="#chair-features"
              className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-7 py-3.5 text-sm font-bold text-neutral-800 transition hover:bg-neutral-50 hover:-translate-y-0.5 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <Zap size={16} className="text-rose-600 dark:text-rose-400" />
              See Salon Billing Speed
            </a>
          </motion.div>

          {/* 4 Core Solutions Sub-Strip */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-10 mx-auto max-w-4xl flex flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-2xl border border-neutral-200/70 bg-white/80 backdrop-blur-sm px-6 py-3 text-xs md:text-[13px] font-medium text-neutral-600 shadow-xs dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300"
          >
            <span>Android Smart EDC & Chair Checkout</span>
            <span className="text-neutral-300 dark:text-slate-600 select-none">✦</span>
            <span>Bio-metric Staff HRMS & Backbar ERP</span>
            <span className="text-neutral-300 dark:text-slate-600 select-none">✦</span>
            <span>Self-Serve 24/7 Booking Portal</span>
            <span className="text-neutral-300 dark:text-slate-600 select-none">✦</span>
            <span>Automated Local VIP Retention Ads</span>
          </motion.div>

          {/* Hero 3-Photo Gallery Strip */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5 text-left"
          >
            {/* Image 1: Modern Salon Styling Station */}
            <div className="group relative h-64 md:h-80 w-full overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-900 shadow-sm transition hover:border-neutral-300 hover:shadow-md dark:border-slate-800">
              <img
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80"
                alt="Modern luxury salon styling stations with mirrors and chairs"
                onError={(e) => {
                  e.currentTarget.src = '/assets/sector_cosmetics.jpg';
                }}
                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-md w-max mb-1.5">
                  Styling Station
                </span>
                <h4 className="text-base font-bold leading-tight">Luxury Styling Stations</h4>
                <p className="text-xs text-neutral-300">Mirrors, chairs & ambient lighting</p>
              </div>
            </div>

            {/* Image 2: Center Hero Focus (Front Desk Tablet Chair Board) */}
            <div className="group relative h-64 md:h-80 w-full overflow-hidden rounded-2xl border border-neutral-300 bg-neutral-900 shadow-md transition hover:border-neutral-400 hover:shadow-lg dark:border-slate-700">
              <img
                src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80"
                alt="Stylist and receptionist using tablet for salon appointment calendar"
                onError={(e) => {
                  e.currentTarget.src = '/assets/sector_cosmetics.jpg';
                }}
                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-rose-600/80 backdrop-blur-md px-2 py-0.5 rounded-md w-max mb-1.5">
                  Front Desk POS
                </span>
                <h4 className="text-base font-bold leading-tight">Chair Appointment Board</h4>
                <p className="text-xs text-neutral-300">Drag-and-drop stylist schedules</p>
              </div>
            </div>

            {/* Image 3: Spa Treatment Room & Backbar */}
            <div className="group relative h-64 md:h-80 w-full overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-900 shadow-sm transition hover:border-neutral-300 hover:shadow-md dark:border-slate-800">
              <img
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80"
                alt="Serene luxury spa treatment room with facial care products"
                onError={(e) => {
                  e.currentTarget.src = '/assets/sector_cosmetics.jpg';
                }}
                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-md w-max mb-1.5">
                  Spa & Backbar
                </span>
                <h4 className="text-base font-bold leading-tight">Luxury Treatment Suites</h4>
                <p className="text-xs text-neutral-300">Consumable facial & hair care</p>
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
              <div className="text-sm font-bold text-neutral-900 mt-1 dark:text-white">Chair Double-Bookings</div>
              <div className="text-xs text-neutral-500 mt-1 dark:text-slate-400">Sync calendar, WhatsApp requests & walk-ins in real time.</div>
            </div>

            <div className="border-l-2 border-neutral-300 pl-5 text-left dark:border-slate-700">
              <div className="text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">100%</div>
              <div className="text-sm font-bold text-neutral-900 mt-1 dark:text-white">Commission Reconciliation</div>
              <div className="text-xs text-neutral-500 mt-1 dark:text-slate-400">Automated, dispute-free daily service & retail payout sheets.</div>
            </div>

            <div className="border-l-2 border-neutral-300 pl-5 text-left dark:border-slate-700">
              <div className="text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">24%</div>
              <div className="text-sm font-bold text-neutral-900 mt-1 dark:text-white">Consumable Wastage Cut</div>
              <div className="text-xs text-neutral-500 mt-1 dark:text-slate-400">Recipe-based gram depletion per color, facial & spa session.</div>
            </div>

            <div className="border-l-2 border-neutral-300 pl-5 text-left dark:border-slate-700">
              <div className="flex items-center gap-1 text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
                4.9 <Star size={24} className="fill-amber-400 text-amber-400" />
              </div>
              <div className="text-sm font-bold text-neutral-900 mt-1 dark:text-white">WhatsApp Booking Rating</div>
              <div className="text-xs text-neutral-500 mt-1 dark:text-slate-400">Automated reminders with salon directions & stylist details.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          3. INTERACTIVE FEATURE SHOWCASE (Split Live UI Mockups)
      ══════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-white dark:bg-slate-950" id="chair-features">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 space-y-24">
          
          {/* Block 1: Drag-and-Drop Chair & Stylist Appointment Grid (Visual Left, Text Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Visual Mockup Box */}
            <div className="rounded-3xl border border-neutral-200/80 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900">
              {/* Store Interior Image Banner */}
              <div className="group relative h-48 sm:h-52 w-full overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-900 mb-5 dark:border-slate-800">
                <img
                  src="https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1200&q=80"
                  alt="Salon styling stations with chairs, mirrors and equipment"
                  onError={(e) => {
                    e.currentTarget.src = '/assets/sector_cosmetics.jpg';
                  }}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent flex items-end p-3.5">
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-neutral-900/80 backdrop-blur-md px-2.5 py-1 text-[11px] font-bold text-white border border-white/20">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Styling Floor • Real-Time Chair Board
                  </span>
                </div>
              </div>

              {/* Schedule Board UI */}
              <div className="rounded-2xl border border-neutral-100 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/80">
                <div className="flex items-center justify-between border-b border-neutral-100 pb-3 mb-4 dark:border-slate-800">
                  <div>
                    <h4 className="font-bold text-base text-neutral-900 dark:text-white">Live Chair Grid • Today (Saturday Rush)</h4>
                    <span className="text-xs text-neutral-500">12 Chairs Active • 3 Spa Rooms Booked</span>
                  </div>
                  <span className="rounded-md bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
                    Live Sync
                  </span>
                </div>

                {/* Stylist Columns Grid */}
                <div className="grid grid-cols-3 gap-2.5">
                  {/* Column 1: Master Rahul */}
                  <div>
                    <div className="rounded-lg bg-neutral-50 p-2 text-left border border-neutral-100 dark:bg-slate-800/60 dark:border-slate-800">
                      <strong className="block text-xs font-bold text-neutral-900 dark:text-white">Rahul</strong>
                      <span className="text-[10px] text-neutral-500">Chair 1</span>
                    </div>
                    <div className="mt-2 space-y-1.5">
                      <div className="rounded-lg border border-rose-200 bg-rose-50 p-2 text-left text-xs dark:border-rose-900/40 dark:bg-rose-950/30">
                        <div className="text-[10px] font-bold text-rose-700 dark:text-rose-400">11:00 AM • 90m</div>
                        <strong className="block text-neutral-900 dark:text-white font-bold text-[11px]">Balayage</strong>
                        <span className="text-[10px] text-rose-600">Pooja V.</span>
                      </div>
                      <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-2 text-left text-xs dark:border-emerald-900/40 dark:bg-emerald-950/30">
                        <div className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400">12:30 PM • 45m</div>
                        <strong className="block text-neutral-900 dark:text-white font-bold text-[11px]">Root Touch-Up</strong>
                        <span className="text-[10px] text-emerald-600">In Wash Bay</span>
                      </div>
                    </div>
                  </div>

                  {/* Column 2: Colorist Priya */}
                  <div>
                    <div className="rounded-lg bg-neutral-50 p-2 text-left border border-neutral-100 dark:bg-slate-800/60 dark:border-slate-800">
                      <strong className="block text-xs font-bold text-neutral-900 dark:text-white">Priya</strong>
                      <span className="text-[10px] text-neutral-500">Chair 2</span>
                    </div>
                    <div className="mt-2 space-y-1.5">
                      <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-2 text-left text-xs dark:border-emerald-900/40 dark:bg-emerald-950/30">
                        <div className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400">11:00 AM • 120m</div>
                        <strong className="block text-neutral-900 dark:text-white font-bold text-[11px]">Keratin</strong>
                        <span className="text-[10px] text-emerald-600">Processing</span>
                      </div>
                      <div className="rounded-lg border border-dashed border-neutral-300 p-2 text-center text-[11px] font-bold text-neutral-400 dark:border-slate-700">
                        1:00 PM Open
                      </div>
                    </div>
                  </div>

                  {/* Column 3: Esthetician Meera */}
                  <div>
                    <div className="rounded-lg bg-neutral-50 p-2 text-left border border-neutral-100 dark:bg-slate-800/60 dark:border-slate-800">
                      <strong className="block text-xs font-bold text-neutral-900 dark:text-white">Meera</strong>
                      <span className="text-[10px] text-neutral-500">Spa 1</span>
                    </div>
                    <div className="mt-2 space-y-1.5">
                      <div className="rounded-lg border border-blue-200 bg-blue-50 p-2 text-left text-xs dark:border-blue-900/40 dark:bg-blue-950/30">
                        <span className="rounded bg-blue-600 px-1.5 py-0.5 text-[9px] font-extrabold uppercase text-white inline-block mb-1">Walk-In</span>
                        <div className="text-[10px] font-bold text-blue-700 dark:text-blue-400">11:30 AM • 60m</div>
                        <strong className="block text-neutral-900 dark:text-white font-bold text-[11px]">Hydra Facial</strong>
                        <span className="text-[10px] text-blue-600">Wait: 8m</span>
                      </div>
                      <div className="rounded-lg border border-dashed border-neutral-300 p-2 text-center text-[11px] font-bold text-neutral-400 dark:border-slate-700">
                        12:30 PM Open
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Bar */}
                <div className="mt-4 flex items-center justify-between pt-3 border-t border-neutral-100 text-xs dark:border-slate-800">
                  <span className="flex items-center gap-1.5 font-bold text-emerald-600">
                    <Check size={14} />
                    WhatsApp Reminders Sent: 24/24 Guests
                  </span>
                  <span className="rounded-md bg-neutral-100 px-2.5 py-1 text-[11px] font-extrabold text-neutral-700 dark:bg-slate-800 dark:text-slate-300">
                    0 Overlaps
                  </span>
                </div>
              </div>
            </div>

            {/* Text Content Right */}
            <div>
              <span className="inline-block rounded-full border border-rose-200/80 bg-rose-50/60 px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-rose-800 dark:border-rose-900/40 dark:bg-rose-950/40 dark:text-rose-300">
                Pillar 1 • Chair & Stylist Appointment Grid
              </span>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
                Zero Scheduling Clashes. Peak Weekend Rush Solved.
              </h2>
              <div className="mt-4 rounded-xl border border-neutral-200/80 bg-neutral-50 p-4 text-sm text-neutral-700 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300">
                <strong className="block text-neutral-900 dark:text-white mb-1">The Problem Solved:</strong>
                Double-booked chairs during busy Saturday hours cause frustrated clients waiting with foil wraps while walk-ins walk out to competing parlours.
              </div>
              <p className="mt-4 text-base text-neutral-600 leading-relaxed dark:text-slate-400">
                Front-desk receptionists see live drag-and-drop chair boards showing exact service durations, processing downtime, and open wash bays. Walk-in shoppers are queued in one tap, while automated WhatsApp reminders with GPS directions cut no-shows to near zero.
              </p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-start gap-3 text-sm font-semibold text-neutral-800 dark:text-slate-200">
                  <Check size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>Color-coded timeline blocks by service (Cut, Color, Facial, Spa, Keratin)</span>
                </li>
                <li className="flex items-start gap-3 text-sm font-semibold text-neutral-800 dark:text-slate-200">
                  <Check size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>Instant walk-in queueing with accurate live chair wait estimations</span>
                </li>
                <li className="flex items-start gap-3 text-sm font-semibold text-neutral-800 dark:text-slate-200">
                  <Check size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>Automated WhatsApp 2-hour reminder alerts with 1-click confirmation</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Block 2: Gram-Level Backbar Recipe Depletion & Commissions (Text Left, Visual Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text Content Left */}
            <div>
              <span className="inline-block rounded-full border border-emerald-200/80 bg-emerald-50/60 px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-800 dark:border-emerald-900/40 dark:bg-emerald-950/40 dark:text-emerald-300">
                Pillar 2 • Backbar Depletion & Commission Ledger
              </span>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
                Stop Hidden Product Shrinkage. Dispute-Free Daily Stylist Pay.
              </h2>
              <div className="mt-4 rounded-xl border border-neutral-200/80 bg-neutral-50 p-4 text-sm text-neutral-700 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300">
                <strong className="block text-neutral-900 dark:text-white mb-1">The Problem Solved:</strong>
                Expensive hair color tubes, bleach developers, and imported spa serums vanish without usage logs, while stylists dispute manually calculated end-of-month incentives.
              </div>
              <p className="mt-4 text-base text-neutral-600 leading-relaxed dark:text-slate-400">
                Every service invoice automatically triggers gram-level recipe deductions from backbar inventory based on hair length and volume. Commission calculations factor in product usage thresholds and split service vs. retail sales instantly on the stylist’s mobile app.
              </p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-start gap-3 text-sm font-semibold text-neutral-800 dark:text-slate-200">
                  <Check size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>Gram-level recipe deduction linked directly to service billing</span>
                </li>
                <li className="flex items-start gap-3 text-sm font-semibold text-neutral-800 dark:text-slate-200">
                  <Check size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>Multi-tier tiered stylist commission calculations (Service vs Retail)</span>
                </li>
                <li className="flex items-start gap-3 text-sm font-semibold text-neutral-800 dark:text-slate-200">
                  <Check size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>Real-time daily incentive reports visible on stylist mobile login</span>
                </li>
              </ul>
            </div>

            {/* Visual Mockup Right */}
            <div className="rounded-3xl border border-neutral-200/80 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900">
              {/* Store Interior Image Banner: Backbar Station */}
              <div className="group relative h-48 sm:h-52 w-full overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-900 mb-5 dark:border-slate-800">
                <img
                  src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1200&q=80"
                  alt="Salon backbar wash station with shampoos and hair treatment products"
                  onError={(e) => {
                    e.currentTarget.src = '/assets/sector_cosmetics.jpg';
                  }}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent flex items-end p-3.5">
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-neutral-900/80 backdrop-blur-md px-2.5 py-1 text-[11px] font-bold text-white border border-white/20">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Backbar Lab • Recipe & Chemical Dispense
                  </span>
                </div>
              </div>

              {/* Digital Job Sheet & Commission UI */}
              <div className="rounded-2xl border border-neutral-100 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/80">
                <div className="flex items-center justify-between border-b border-neutral-100 pb-3 mb-4 dark:border-slate-800">
                  <div>
                    <h4 className="font-bold text-base text-neutral-900 dark:text-white">Service Slip #SL-8842</h4>
                    <span className="text-xs text-neutral-500">Client: Pooja Verma • Stylist: Master Rahul</span>
                  </div>
                  <span className="rounded-md bg-rose-50 px-2.5 py-1 text-[11px] font-bold text-rose-800 dark:bg-rose-950/40 dark:text-rose-300">
                    Service: ₹4,500
                  </span>
                </div>

                {/* Recipe Consumables Breakdown */}
                <div className="rounded-xl bg-neutral-50 p-3 mb-4 text-xs dark:bg-slate-800/50">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-2">
                    Automated Backbar Recipe Depletion
                  </span>
                  <div className="space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-neutral-600 dark:text-slate-400">• L&apos;Oreal Inoa Tube #7.1</span>
                      <strong className="text-neutral-900 dark:text-white">45g deducted</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600 dark:text-slate-400">• Oxydant Creme Developer 20 Vol</span>
                      <strong className="text-neutral-900 dark:text-white">60ml deducted</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600 dark:text-slate-400">• Olaplex Bond Multiplier No. 1</span>
                      <strong className="text-neutral-900 dark:text-white">15ml deducted</strong>
                    </div>
                  </div>
                </div>

                {/* Commission Ledger */}
                <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-3.5 mb-4 text-xs dark:border-emerald-900/40 dark:bg-emerald-950/20">
                  <div className="flex justify-between mb-1.5">
                    <span className="text-emerald-800 dark:text-emerald-300">Stylist Base Incentive Rate:</span>
                    <strong className="text-neutral-900 dark:text-white">15.0% on Net Service</strong>
                  </div>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-emerald-800 dark:text-emerald-300">Chemical Consumable Allowance:</span>
                    <span className="font-semibold text-emerald-700 dark:text-emerald-400">Standard Recipe Match (Zero Overuse)</span>
                  </div>
                  <div className="flex justify-between border-t border-dashed border-emerald-300 pt-2 text-sm font-bold dark:border-emerald-800">
                    <span className="text-emerald-950 dark:text-emerald-200">Net Rahul Payout for Slip:</span>
                    <span className="text-emerald-700 dark:text-emerald-400">₹675 (Auto-Credited)</span>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-neutral-100 text-xs text-neutral-600 dark:border-slate-800 dark:text-slate-400">
                  <span>
                    Daily Stylist Running Total: <strong className="text-neutral-900 dark:text-white">₹2,420</strong>
                  </span>
                  <span className="flex items-center gap-1 font-bold text-blue-600 dark:text-blue-400">
                    <ShieldCheck size={13} />
                    Stylist App Synced
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Block 3: OTP-Secured Bridal Packages & Multi-Sitting Ledgers (Visual Left, Text Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Visual Mockup Left */}
            <div className="rounded-3xl border border-neutral-200/80 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900">
              {/* Store Interior Image Banner: Bridal Suite */}
              <div className="group relative h-48 sm:h-52 w-full overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-900 mb-5 dark:border-slate-800">
                <img
                  src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80"
                  alt="Luxury bridal aesthetician and spa treatment suite"
                  onError={(e) => {
                    e.currentTarget.src = '/assets/sector_cosmetics.jpg';
                  }}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent flex items-end p-3.5">
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-neutral-900/80 backdrop-blur-md px-2.5 py-1 text-[11px] font-bold text-white border border-white/20">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                    Bridal Suite • Multi-Sitting Treatment Room
                  </span>
                </div>
              </div>

              {/* Bridal Package Card UI */}
              <div className="rounded-2xl border border-neutral-100 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/80">
                <div className="flex items-center justify-between border-b border-neutral-100 pb-3 mb-4 dark:border-slate-800">
                  <div>
                    <h4 className="font-bold text-base text-neutral-900 dark:text-white">Bridal Glow Membership #PKG-7720</h4>
                    <span className="text-xs text-neutral-500">Bride: Sneha Kapoor • Wedding Date: 22 Sep</span>
                  </div>
                  <span className="rounded-md bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-800 dark:bg-amber-950/40 dark:text-amber-300">
                    ₹28,000 (Paid Full)
                  </span>
                </div>

                {/* 5-Sitting Stepper Table */}
                <div className="rounded-xl bg-neutral-50 p-3 mb-4 text-xs dark:bg-slate-800/50">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-2">
                    5-Sitting Journey Ledger
                  </span>

                  <div className="flex items-center justify-between py-1.5 border-b border-dashed border-neutral-200 dark:border-slate-700">
                    <div>
                      <strong className="block text-neutral-900 dark:text-white">Sitting 1: Pre-Bridal Hydra Facial</strong>
                      <span className="text-[11px] text-neutral-500">12 Aug • Completed by Esthetician Meera</span>
                    </div>
                    <span className="rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
                      OTP Verified
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-1.5 border-b border-dashed border-neutral-200 dark:border-slate-700">
                    <div>
                      <strong className="block text-neutral-900 dark:text-white">Sitting 2: Hair Spa & Keratin Infusion</strong>
                      <span className="text-[11px] text-neutral-500">24 Aug • Completed by Priya</span>
                    </div>
                    <span className="rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
                      OTP Verified
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-2 -mx-3 px-3 bg-rose-50/60 border-b border-dashed border-rose-200 dark:bg-rose-950/30 dark:border-rose-900/40">
                    <div>
                      <strong className="block text-rose-900 dark:text-rose-300">Sitting 3: Full Body Polishing & Waxing</strong>
                      <span className="text-[11px] text-rose-700 dark:text-rose-400">Today • In Chair (Station 4)</span>
                    </div>
                    <span className="rounded bg-rose-600 px-2 py-0.5 text-[10px] font-bold text-white shadow-xs">
                      Active Now
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-1.5 pt-2">
                    <div>
                      <strong className="block text-neutral-600 dark:text-slate-400">Sitting 4 & 5: Mehendi Glow + D-Day HD Makeup</strong>
                      <span className="text-[11px] text-neutral-400">18 & 22 Sep • Reserved with Lead Artist</span>
                    </div>
                    <span className="text-[11px] font-bold text-neutral-500">2 Left</span>
                  </div>
                </div>

                {/* Footer Security */}
                <div className="flex items-center justify-between pt-3 border-t border-neutral-100 text-xs text-neutral-600 dark:border-slate-800 dark:text-slate-400">
                  <span className="flex items-center gap-1.5 font-bold text-emerald-600 dark:text-emerald-400">
                    <ShieldCheck size={14} />
                    OTP Authenticated • SMS #4920
                  </span>
                  <span>Balance: <strong className="text-neutral-900 dark:text-white">₹0 Due</strong></span>
                </div>
              </div>
            </div>

            {/* Text Content Right */}
            <div>
              <span className="inline-block rounded-full border border-amber-200/80 bg-amber-50/60 px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-800 dark:border-amber-900/40 dark:bg-amber-950/40 dark:text-amber-300">
                Pillar 3 • Bridal & Membership Engine
              </span>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
                OTP-Secured Bridal Packages & Multi-Sitting Ledgers
              </h2>
              <div className="mt-4 rounded-xl border border-neutral-200/80 bg-neutral-50 p-4 text-sm text-neutral-700 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300">
                <strong className="block text-neutral-900 dark:text-white mb-1">The Problem Solved:</strong>
                High-value bridal packages (₹25,000+) cause disputes when clients claim remaining sittings were unused, or salon staff lose track of advance payments and completed sessions across months.
              </div>
              <p className="mt-4 text-base text-neutral-600 leading-relaxed dark:text-slate-400">
                Track 5 to 10-sitting bridal journeys on a single digital card. Each session requires customer OTP authorization on the counter tablet before service commences, preventing accidental omissions and giving brides real-time transparency over past visits.
              </p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-start gap-3 text-sm font-semibold text-neutral-800 dark:text-slate-200">
                  <Check size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>Multi-sitting package tracking with automated SMS OTP verification at each visit</span>
                </li>
                <li className="flex items-start gap-3 text-sm font-semibold text-neutral-800 dark:text-slate-200">
                  <Check size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>Real-time sitting timeline prevents clients and staff from miscounting past visits</span>
                </li>
                <li className="flex items-start gap-3 text-sm font-semibold text-neutral-800 dark:text-slate-200">
                  <Check size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>Auto-splits revenue and stylist incentives as each individual session is delivered</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Block 4: Prepaid VIP Wallets & Hair/Skin History Vault (Text Left, Visual Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text Content Left */}
            <div>
              <span className="inline-block rounded-full border border-blue-200/80 bg-blue-50/60 px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-blue-800 dark:border-blue-900/40 dark:bg-blue-950/40 dark:text-blue-300">
                Pillar 4 • Prepaid Wallet & Clienteling
              </span>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
                Prepaid VIP Wallets & Color Formula History at Your Fingertips
              </h2>
              <div className="mt-4 rounded-xl border border-neutral-200/80 bg-neutral-50 p-4 text-sm text-neutral-700 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300">
                <strong className="block text-neutral-900 dark:text-white mb-1">The Problem Solved:</strong>
                Regular high-ticket salon clients dislike paying after every single blowout or manicure, while salons struggle with cash flow predictability and retaining clients against neighborhood discount competition.
              </div>
              <p className="mt-4 text-base text-neutral-600 leading-relaxed dark:text-slate-400">
                Lock in upfront revenue with reloadable branded salon wallets (&ldquo;Pay ₹10,000, Get ₹12,000&rdquo;). Stylists access guest skin and hair profile cards with exact color formulas and patch test notes, delivering identical high-end results across any branch.
              </p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-start gap-3 text-sm font-semibold text-neutral-800 dark:text-slate-200">
                  <Check size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>Upfront revenue lock-in with reloadable branded salon wallets</span>
                </li>
                <li className="flex items-start gap-3 text-sm font-semibold text-neutral-800 dark:text-slate-200">
                  <Check size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>Digital skin & hair history cards keep past shade codes and patch tests accessible to all staff</span>
                </li>
                <li className="flex items-start gap-3 text-sm font-semibold text-neutral-800 dark:text-slate-200">
                  <Check size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>Automated low-balance WhatsApp prompts trigger timely top-ups before monthly appointments</span>
                </li>
              </ul>
            </div>

            {/* Visual Mockup Right */}
            <div className="rounded-3xl border border-neutral-200/80 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900">
              {/* Store Interior Image Banner: Front Desk */}
              <div className="group relative h-48 sm:h-52 w-full overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-900 mb-5 dark:border-slate-800">
                <img
                  src="https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=1200&q=80"
                  alt="Luxury salon cosmetics and retail counter with premium products"
                  onError={(e) => {
                    e.currentTarget.src = '/assets/sector_cosmetics.jpg';
                  }}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent flex items-end p-3.5">
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-neutral-900/80 backdrop-blur-md px-2.5 py-1 text-[11px] font-bold text-white border border-white/20">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                    VIP Clienteling • Front Desk Ledger
                  </span>
                </div>
              </div>

              {/* Wallet & Client Vault UI */}
              <div className="rounded-2xl border border-neutral-100 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/80">
                <div className="flex items-center justify-between border-b border-neutral-100 pb-3 mb-4 dark:border-slate-800">
                  <div>
                    <h4 className="font-bold text-base text-neutral-900 dark:text-white">VIP Gold Wallet • Ritu Malhotra</h4>
                    <span className="text-xs text-neutral-500">+91 98102 ••••• • Diamond Tier (34 Visits)</span>
                  </div>
                  <span className="rounded-md bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-blue-800 dark:bg-blue-950/40 dark:text-blue-300">
                    1-Tap Checkout
                  </span>
                </div>

                {/* Wallet Balance Box */}
                <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-3.5 mb-3 flex items-center justify-between dark:border-emerald-900/40 dark:bg-emerald-950/20">
                  <div>
                    <span className="text-[10.5px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 block mb-0.5">
                      Available Wallet Credit
                    </span>
                    <strong className="text-xl font-extrabold text-emerald-700 dark:text-emerald-400">
                      ₹12,650
                    </strong>
                  </div>
                  <div className="text-right text-xs text-emerald-800 dark:text-emerald-300">
                    <div>Debited: <strong className="text-neutral-900 dark:text-white">₹1,850</strong> (Today)</div>
                    <span className="text-[11px] text-neutral-500">Original Top-Up: ₹24,000</span>
                  </div>
                </div>

                {/* Hair Formula Profile Card */}
                <div className="rounded-xl bg-neutral-50 p-3 text-xs dark:bg-slate-800/50">
                  <span className="text-[10.5px] font-bold uppercase tracking-wider text-neutral-400 block mb-2">
                    Recorded Client Profile & Preferences
                  </span>
                  <div className="space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Hair Type:</span>
                      <strong className="text-neutral-900 dark:text-white">High Porosity • Sensitive Scalp</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Saved Color Formula:</span>
                      <strong className="text-neutral-900 dark:text-white">Inoa 6.1 (30g) + 20 Vol (45ml)</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Hospitality Preference:</span>
                      <span className="text-neutral-900 dark:text-white font-semibold">Chamomile Tea • No Sugar</span>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-4 flex items-center justify-between pt-3 border-t border-neutral-100 text-xs text-neutral-600 dark:border-slate-800 dark:text-slate-400">
                  <span className="flex items-center gap-1.5 font-bold text-emerald-600 dark:text-emerald-400">
                    <Check size={14} />
                    WhatsApp Debit Alert Sent
                  </span>
                  <span>No Physical Card Required</span>
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
              COMPLETE SALON SUITE
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
              Engineered Specifically for High-Touch Beauty Businesses
            </h2>
            <p className="mt-4 text-base text-neutral-600 dark:text-slate-400">
              From bridal sittings to split retail invoicing, every workflow is tailored to the exact operational nuances of salons and spas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {salonFeatures.map((feat) => {
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
              style={{ backgroundImage: `url('${'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1600&q=80'}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 lg:via-white/80 to-white/40 lg:to-transparent z-2 dark:from-slate-900 dark:via-slate-900/90 lg:dark:via-slate-900/80 dark:to-slate-900/40" />

            {/* Left Content Column */}
            <div className="lg:col-span-7 z-10 flex flex-col justify-center text-left">
              <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50/90 px-3.5 py-1 text-[11px] font-bold tracking-wider text-orange-800 uppercase w-max mb-4 dark:border-orange-900/40 dark:bg-orange-950/40 dark:text-orange-300">
                ENTERPRISE SALON ARCHITECTURE
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-slate-900 tracking-tight leading-[1.18] dark:text-white">
                Turn Every Salon Chair into a <span className="text-orange-600">Predictable Profit Center</span>
              </h2>
              <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl dark:text-slate-300">
                Eliminate double-booking conflicts, automate stylist tier commissions, and track expensive backbar color inventory to the exact gram with Priyulabs.
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
