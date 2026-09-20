import { motion } from 'framer-motion';
import {
  ArrowRight,
  MessageCircle,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  Clock,
  Coffee,
  CupSoda,
  Flame,
  Globe,
  HeartHandshake,
  Layers,
  LayoutDashboard,
  Play,
  QrCode,
  Receipt,
  Sparkles,
  TrendingUp,
  Truck,
  Zap,
  X,
} from 'lucide-react';
import { useState } from 'react';

const fadeAnim = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.4 },
};

export function CafesChaiBarsPage() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleDemoSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('outletName') as string;
    const phone = formData.get('phone') as string;
    const dailyCups = formData.get('dailyCups') as string;
    const city = formData.get('city') as string;

    setSubmitted(true);
    const msg = `Hello Priyulabs! I would like to schedule a 15-minute Cafe & Chai Bar walkthrough for ${name} (${dailyCups} cups/day, ${city}). My phone is ${phone}.`;
    setTimeout(() => {
      window.open(`https://wa.me/917873844050?text=${encodeURIComponent(msg)}`, '_blank');
      setDemoModalOpen(false);
      setSubmitted(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-slate-900 selection:text-white">
      {/* ──────────────────────────────────────────────────────────
          1. HERO SECTION (Artisanal Coffee & Chai Bar Editorial)
      ────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28 lg:pt-40 lg:pb-32 bg-gradient-to-b from-[#f8fafc] via-white to-white border-b border-neutral-200/70">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-3xl text-center">
            {/* Badge Pill */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 rounded-full border border-neutral-300/80 bg-neutral-100/90 px-3.5 py-1.5 text-xs font-semibold tracking-wider text-slate-700 uppercase shadow-xs"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-amber-600" />
              CAFES, ROASTERIES &amp; CHAI BARS
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-6 text-4xl font-extrabold tracking-tight text-[#0f172a] sm:text-6xl sm:leading-[1.12] lg:text-7xl"
            >
              Brewing Culture. Fast Billing.{' '}
              <span className="block text-slate-500 font-bold">Unmatched Loyalty.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#475569] sm:text-xl sm:leading-relaxed"
            >
              From split-second morning chai rushes to specialty coffee customizations and community loyalty — an all-in-one operating platform engineered for modern beverage brands.
            </motion.p>

            {/* CTA Actions */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-9 flex flex-wrap items-center justify-center gap-4"
            >
              <a href="/#free-trial"
                className="inline-flex items-center justify-center rounded-xl bg-[#0f172a] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-slate-800 hover:shadow-md hover:scale-[1.02] active:scale-[0.99] cursor-pointer no-underline"
              >
                Get Started Today
              </a>
              <a href="#pillars"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-300 bg-white px-7 py-3.5 text-sm font-semibold text-[#0f172a] shadow-xs transition-all duration-300 hover:border-neutral-400 hover:bg-neutral-50 hover:scale-[1.02] active:scale-[0.99] cursor-pointer no-underline"
               onClick={(e) => { e.preventDefault(); (document.querySelector('#pillars') || document.getElementById('pillars') || document.getElementById('pillars') || document.querySelector('.clean-pillars-sec, .pillars-sec, .triptych-sec, .pillars-grid'))?.scrollIntoView({ behavior: 'smooth' }); }}>
                See Cafe Features ↓
              </a>
            </motion.div>

          {/* 4 Core Solutions Sub-Strip */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-10 mx-auto max-w-4xl flex flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-2xl border border-neutral-200/70 bg-white/80 backdrop-blur-sm px-6 py-3 text-xs md:text-[13px] font-medium text-neutral-600 shadow-xs dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300"
          >
            <span>Split-Bill Barista Terminal</span>
            <span className="text-neutral-300 dark:text-slate-600 select-none">✦</span>
            <span>Milk & Syrup Depletion Inventory</span>
            <span className="text-neutral-300 dark:text-slate-600 select-none">✦</span>
            <span>Loyalty Wallet Web-App</span>
            <span className="text-neutral-300 dark:text-slate-600 select-none">✦</span>
            <span>College & Workspace Footfall Boosters</span>
          </motion.div>
          </div>

          {/* Hero Visual Frame */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-14 sm:mt-18 lg:mt-20 mx-auto max-w-5xl"
          >
            <div className="relative overflow-hidden rounded-2xl border border-neutral-200/90 bg-[#f8fafc] p-2 sm:p-3 shadow-xl backdrop-blur-xs transition-all duration-500 hover:shadow-2xl hover:border-neutral-300">
              <div className="relative overflow-hidden rounded-xl bg-slate-900 aspect-16/10 sm:aspect-16/9">
                <img
                  src="/assets/cafe_hero_barista.jpg"
                  alt="Modern artisanal coffee roastery and cozy cafe barista bar"
                  className="h-full w-full object-cover opacity-95 transition-transform duration-700 hover:scale-105"
                />

                {/* Floating Token & Counter UI Overlay */}
                <div className="absolute top-4 left-4 sm:top-6 sm:left-6 max-w-xs rounded-xl bg-white/95 p-3.5 sm:p-4 shadow-lg backdrop-blur-md border border-neutral-200/80 text-left">
                  <div className="flex items-center justify-between border-b border-neutral-100 pb-2 mb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                      <span className="text-xs font-extrabold text-slate-900 tracking-wider">ORDER #C-42</span>
                    </div>
                    <span className="rounded-md bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700">BREWING</span>
                  </div>
                  <div className="space-y-1 text-xs text-slate-600">
                    <div className="flex justify-between font-medium">
                      <span>1x Oat Milk Cortado + Warm Croissant</span>
                      <strong className="text-slate-900">₹320</strong>
                    </div>
                    <div className="text-[11px] text-slate-400">• Double Ristretto Shot + Cinnamon Dust</div>
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-neutral-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span>Barista Station: Bar 01</span>
                    <span className="font-bold text-emerald-600">Tagged in 1.8s</span>
                  </div>
                </div>

                {/* Digital Loyalty Pill */}
                <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 rounded-xl bg-[#0f172a]/95 text-white px-4 py-2.5 shadow-xl backdrop-blur-md border border-slate-700 text-left flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400 font-bold text-sm">
                    
                  </div>
                  <div>
                    <div className="text-xs font-bold">Stamp 6 of 7 Collected</div>
                    <div className="text-[10.5px] text-slate-400">Next Specialty Brew on Us!</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          2. THE 4 PILLARS — HOW OUR SOFTWARE EMPOWERS CAFES & CHAI BARS
      ────────────────────────────────────────────────────────── */}
      <section id="pillars" className="py-24 sm:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-2xl text-center mb-20 sm:mb-24">
            <span className="text-xs font-bold tracking-widest text-slate-500 uppercase">
              The 4 Pillars of Cafe Intelligence
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#0f172a] sm:text-5xl">
              How Our Software Empowers Cafes &amp; Chai Bars
            </h2>
            <p className="mt-4 text-base text-[#475569]">
              Engineered to master morning rushes, eliminate dairy and pastry shrinkage, and build an obsessive community of regulars.
            </p>
          </div>

          <div className="space-y-24 sm:space-y-32">
            {/* Pillar 1 */}
            <motion.div {...fadeAnim} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-6 space-y-5 text-left">
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-bold text-amber-800">
                  <Zap size={13} />
                  Instant Custom Drink Ticketing
                </div>

                <h3 className="text-2xl font-bold tracking-tight text-[#0f172a] sm:text-3xl lg:text-4xl">
                  Pillar 1: Smart POS — Custom Brews &amp; Split-Second Rush Hours
                </h3>

                <div className="space-y-3 text-sm sm:text-base leading-relaxed text-[#475569]">
                  <div className="rounded-xl bg-[#f8fafc] border border-neutral-200/80 p-4">
                    <strong className="text-[#0f172a] block font-semibold mb-1">The Problem Solved:</strong>
                    Slow ordering caused by complex milk choices, sweetness levels, size variants, and morning peak rush lines.
                  </div>
                  <div>
                    <strong className="text-[#0f172a] block font-semibold mb-1">How It Works:</strong>
                    1-tap modifier popups (Oat/Almond milk, syrup pumps, extra shot, sugarless), instant kitchen/barista ticket printing, barcode scanner support for packaged snacks, and lightning-fast UPI tap billing.
                  </div>
                </div>

                <ul className="pt-2 space-y-2.5 text-sm font-medium text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-amber-600" />
                    1-tap milk switches, sweetness levels &amp; temperature preferences
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-amber-600" />
                    Automated cup sticker tags with exact customization notes
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-amber-600" />
                    Split-second UPI tap-to-pay &amp; 100% offline local billing mode
                  </li>
                </ul>
              </div>

              <div className="lg:col-span-6">
                <div className="group overflow-hidden rounded-2xl border border-neutral-200/80 bg-[#f8fafc] p-2 sm:p-2.5 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.015]">
                  <img
                    src="/assets/cafe_pos_modifiers.jpg"
                    alt="Touchscreen tablet POS terminal with coffee modifiers and barista ticket printer"
                    className="h-80 sm:h-96 w-full rounded-xl object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
            </motion.div>

            {/* Pillar 2 */}
            <motion.div {...fadeAnim} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-6 order-2 lg:order-1">
                <div className="group overflow-hidden rounded-2xl border border-neutral-200/80 bg-[#f8fafc] p-2 sm:p-2.5 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.015]">
                  <img
                    src="/assets/cafe_beans_bakery.jpg"
                    alt="Artisanal cafe bakery display case and digital inventory batch expiry tracking"
                    className="h-80 sm:h-96 w-full rounded-xl object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>

              <div className="lg:col-span-6 order-1 lg:order-2 space-y-5 text-left">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800">
                  <Flame size={13} />
                  Up to 20% Reduction in Dairy &amp; Food Wastage
                </div>

                <h3 className="text-2xl font-bold tracking-tight text-[#0f172a] sm:text-3xl lg:text-4xl">
                  Pillar 2: Complete Management System — Milk, Beans &amp; Bakery Wastage Control
                </h3>

                <div className="space-y-3 text-sm sm:text-base leading-relaxed text-[#475569]">
                  <div className="rounded-xl bg-[#f8fafc] border border-neutral-200/80 p-4">
                    <strong className="text-[#0f172a] block font-semibold mb-1">The Problem Solved:</strong>
                    High perishable loss (milk, bakery items) and uncontrolled espresso bean wastage during daily grinder calibration.
                  </div>
                  <div>
                    <strong className="text-[#0f172a] block font-semibold mb-1">How It Works:</strong>
                    Daily batch tracking for short-shelf-life dairy and fresh bakery goods, auto-depletion of beans and syrups per cup, and daily end-of-shift consumption vs. sales variance reports.
                  </div>
                </div>

                <ul className="pt-2 space-y-2.5 text-sm font-medium text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600" />
                    Gram-accurate espresso bean depletion &amp; grinder dial-in tracking
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600" />
                    Batch expiry alerts for dairy, oat/almond milks &amp; baked pastries
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600" />
                    End-of-shift shrinkage &amp; staff tasting reconciliation audits
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Pillar 3 */}
            <motion.div {...fadeAnim} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-6 space-y-5 text-left">
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-800">
                  <Globe size={13} />
                  Zero Queue Drop-Offs with Web Pre-Orders
                </div>

                <h3 className="text-2xl font-bold tracking-tight text-[#0f172a] sm:text-3xl lg:text-4xl">
                  Pillar 3: Custom Website &amp; QR Pre-Orders — Skip-the-Line Ordering
                </h3>

                <div className="space-y-3 text-sm sm:text-base leading-relaxed text-[#475569]">
                  <div className="rounded-xl bg-[#f8fafc] border border-neutral-200/80 p-4">
                    <strong className="text-[#0f172a] block font-semibold mb-1">The Problem Solved:</strong>
                    Busy office commuters and hurried customers walking away due to long in-store morning queues.
                  </div>
                  <div>
                    <strong className="text-[#0f172a] block font-semibold mb-1">How It Works:</strong>
                    Branded web ordering for scheduled morning pickup orders, table QR ordering for dine-in guests working on laptops, and automated status SMS when the cup is ready.
                  </div>
                </div>

                <ul className="pt-2 space-y-2.5 text-sm font-medium text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-blue-600" />
                    Scheduled morning pickup orders with 1-tap express re-ordering
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-blue-600" />
                    Table QR ordering mode for guests working on laptops without standing up
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-blue-600" />
                    Zero commission payouts on regular customers — save 20-30% every month
                  </li>
                </ul>
              </div>

              <div className="lg:col-span-6">
                <div className="group overflow-hidden rounded-2xl border border-neutral-200/80 bg-[#f8fafc] p-2 sm:p-2.5 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.015]">
                  <img
                    src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80"
                    alt="Direct mobile QR pre-ordering for morning coffee pickups"
                    className="h-80 sm:h-96 w-full rounded-xl object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
            </motion.div>

            {/* Pillar 4 */}
            <motion.div {...fadeAnim} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-6 order-2 lg:order-1">
                <div className="group overflow-hidden rounded-2xl border border-neutral-200/80 bg-[#f8fafc] p-2 sm:p-2.5 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.015]">
                  <img
                    src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80"
                    alt="Digital coffee stamp card and WhatsApp loyalty notifications"
                    className="h-80 sm:h-96 w-full rounded-xl object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>

              <div className="lg:col-span-6 order-1 lg:order-2 space-y-5 text-left">
                <div className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-xs font-bold text-purple-800">
                  <TrendingUp size={13} />
                  3.5x More Repeat Visits via Phone Loyalty
                </div>

                <h3 className="text-2xl font-bold tracking-tight text-[#0f172a] sm:text-3xl lg:text-4xl">
                  Pillar 4: Targeted Digital Marketing &amp; Ads — Daily Habit &amp; Digital Stamp Cards
                </h3>

                <div className="space-y-3 text-sm sm:text-base leading-relaxed text-[#475569]">
                  <div className="rounded-xl bg-[#f8fafc] border border-neutral-200/80 p-4">
                    <strong className="text-[#0f172a] block font-semibold mb-1">The Problem Solved:</strong>
                    Low return frequency and reliance on easy-to-lose physical paper stamp cards.
                  </div>
                  <div>
                    <strong className="text-[#0f172a] block font-semibold mb-1">How It Works:</strong>
                    Built-in digital loyalty ("Buy 7 brews, get the 8th free") linked automatically to phone numbers, local afternoon slump discount notifications, and automated WhatsApp re-engagement.
                  </div>
                </div>

                <ul className="pt-2 space-y-2.5 text-sm font-medium text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-purple-600" />
                    100% paperless digital stamp card tied to customer mobile numbers
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-purple-600" />
                    Automated afternoon 2-5 PM WhatsApp perk prompts to fill slow hours
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-purple-600" />
                    Automated 'We miss you' re-activation discounts after 10 days of absence
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          3. CORE FEATURE GRID (6 Minimalist White Cards)
      ────────────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 bg-[#f8fafc] border-y border-neutral-200/80">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16 sm:mb-20">
            <span className="text-xs font-bold tracking-widest text-slate-500 uppercase">
              Complete Operational Suite
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#0f172a] sm:text-4xl">
              Engineered specifically for specialty beverage brands.
            </h2>
            <p className="mt-4 text-base text-[#475569]">
              Every tool your baristas and managers need to operate smoothly from opening prep to closing cleanup.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Card 1 */}
            <motion.div
              {...fadeAnim}
              className="group flex flex-col justify-between rounded-2xl border border-neutral-200/80 bg-white p-7 shadow-xs transition-all duration-300 hover:shadow-lg hover:border-neutral-300 hover:scale-[1.02] text-left"
            >
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-700 transition-colors group-hover:bg-[#0f172a] group-hover:text-white">
                  <Coffee size={24} />
                </div>
                <h3 className="mt-5 text-lg font-bold text-[#0f172a]">
                  Barista-Friendly Touch Interface
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#475569]">
                  Fast category filters, color-coded drink variants, and zero clutter — built for speedy order punches during morning commuter peaks.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center text-xs font-semibold text-amber-700">
                Zero Learning Curve &rarr;
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              {...fadeAnim}
              className="group flex flex-col justify-between rounded-2xl border border-neutral-200/80 bg-white p-7 shadow-xs transition-all duration-300 hover:shadow-lg hover:border-neutral-300 hover:scale-[1.02] text-left"
            >
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700 transition-colors group-hover:bg-[#0f172a] group-hover:text-white">
                  <Receipt size={24} />
                </div>
                <h3 className="mt-5 text-lg font-bold text-[#0f172a]">
                  Barista Ticket Printer &amp; KDS
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#475569]">
                  Clear, easy-to-read ticket tags showing precise milk, ice, and syrup customizations, preventing drink remake disputes and barista stress.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center text-xs font-semibold text-blue-700">
                100% Accuracy Every Cup &rarr;
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              {...fadeAnim}
              className="group flex flex-col justify-between rounded-2xl border border-neutral-200/80 bg-white p-7 shadow-xs transition-all duration-300 hover:shadow-lg hover:border-neutral-300 hover:scale-[1.02] text-left"
            >
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-700 transition-colors group-hover:bg-[#0f172a] group-hover:text-white">
                  <HeartHandshake size={24} />
                </div>
                <h3 className="mt-5 text-lg font-bold text-[#0f172a]">
                  Digital Loyalty &amp; Wallet
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#475569]">
                  Frictionless phone-number-based points and digital stamp system that rewards daily repeat visits without requiring app downloads.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center text-xs font-semibold text-purple-700">
                Turn Visitors into Regulars &rarr;
              </div>
            </motion.div>

            {/* Card 4 */}
            <motion.div
              {...fadeAnim}
              className="group flex flex-col justify-between rounded-2xl border border-neutral-200/80 bg-white p-7 shadow-xs transition-all duration-300 hover:shadow-lg hover:border-neutral-300 hover:scale-[1.02] text-left"
            >
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 transition-colors group-hover:bg-[#0f172a] group-hover:text-white">
                  <Layers size={24} />
                </div>
                <h3 className="mt-5 text-lg font-bold text-[#0f172a]">
                  Perishable Batch Tracking
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#475569]">
                  Track shelf-life expiry for specialty milks, artisanal breads, and desserts with automated notifications before stock spoils.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center text-xs font-semibold text-emerald-700">
                Zero Spoilage Surprises &rarr;
              </div>
            </motion.div>

            {/* Card 5 */}
            <motion.div
              {...fadeAnim}
              className="group flex flex-col justify-between rounded-2xl border border-neutral-200/80 bg-white p-7 shadow-xs transition-all duration-300 hover:shadow-lg hover:border-neutral-300 hover:scale-[1.02] text-left"
            >
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50 text-rose-700 transition-colors group-hover:bg-[#0f172a] group-hover:text-white">
                  <QrCode size={24} />
                </div>
                <h3 className="mt-5 text-lg font-bold text-[#0f172a]">
                  Table QR &amp; Remote Working Mode
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#475569]">
                  Let laptop guests order snacks and re-fill coffees directly from their tables without standing up or interrupting their work calls.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center text-xs font-semibold text-rose-700">
                Boost Guest Spend per Hour &rarr;
              </div>
            </motion.div>

            {/* Card 6 */}
            <motion.div
              {...fadeAnim}
              className="group flex flex-col justify-between rounded-2xl border border-neutral-200/80 bg-white p-7 shadow-xs transition-all duration-300 hover:shadow-lg hover:border-neutral-300 hover:scale-[1.02] text-left"
            >
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700 transition-colors group-hover:bg-[#0f172a] group-hover:text-white">
                  <LayoutDashboard size={24} />
                </div>
                <h3 className="mt-5 text-lg font-bold text-[#0f172a]">
                  Multi-Outlet Recipe Consistency
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#475569]">
                  Centralize bean-to-cup recipes, brew temperature guidelines, and standard operating procedures across all your cafe locations.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center text-xs font-semibold text-cyan-700">
                Unified Flavor Everywhere &rarr;
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          4. METRICS THAT MATTER STRIP
      ────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white border-b border-neutral-200/80">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-8 grid-cols-2 lg:grid-cols-4 text-center">
            <div className="space-y-1.5 p-4">
              <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#0f172a]">
                &lt; 4s
              </div>
              <div className="text-xs sm:text-sm font-semibold text-[#475569]">
                Average Drink Order Punch Time
              </div>
            </div>
            <div className="space-y-1.5 p-4">
              <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-amber-600">
                40%+
              </div>
              <div className="text-xs sm:text-sm font-semibold text-[#475569]">
                Higher Customer Repeat Rate with Digital Loyalty
              </div>
            </div>
            <div className="space-y-1.5 p-4">
              <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#0f172a]">
                100%
              </div>
              <div className="text-xs sm:text-sm font-semibold text-[#475569]">
                Accurate Drink Customization Delivery
              </div>
            </div>
            <div className="space-y-1.5 p-4">
              <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-emerald-600">
                Zero
              </div>
              <div className="text-xs sm:text-sm font-semibold text-[#475569]">
                Paper Loyalty Card Friction
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          5. BOTTOM CONVERSION BANNER
      ────────────────────────────────────────────────────────── */}
            {/* ──────────────────────────────────────────────────────────
          WHITE EDITORIAL TRUST BOTTOM CTA
      ────────────────────────────────────────────────────────── */}
            {/* ──────────────────────────────────────────────────────────
          WHITE EDITORIAL TRUST BOTTOM CTA (CAFES & CHAI BARS)
      ────────────────────────────────────────────────────────── */}
      <section className="py-16 px-4 md:px-8 bg-neutral-50 flex justify-center">
        <div className="clean-cta-container relative max-w-[1180px] w-full min-h-[500px] rounded-[28px] overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-center gap-10 p-8 md:p-14 bg-white border border-slate-200 shadow-sm">
          
          {/* Background Photography (Artisanal Coffee & Chai Counter) */}
          <div
            className="bg-image-layer absolute inset-0 bg-cover bg-right opacity-100 z-1"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1600&q=80')" }}
          />
          
          {/* Directional White Fade Overlay */}
          <div
            className="bg-overlay-layer absolute inset-0 z-2 pointer-events-none"
            style={{ background: 'linear-gradient(90deg, #ffffff 0%, #ffffff 44%, rgba(255, 255, 255, 0.75) 58%, rgba(255, 255, 255, 0.12) 80%, rgba(255, 255, 255, 0) 100%)' }}
          />

          {/* Left Content Column (7 cols) */}
          <div className="content-left relative z-10 lg:col-span-7 flex flex-col items-start">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-wider text-slate-600 uppercase mb-5">
              HIGH-VELOCITY CAFE & CHAI SYSTEM
            </div>

            {/* Heading */}
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-[1.18] tracking-tight mb-4">
              Serve More Cups Faster with <span className="text-orange-600">Zero Billing Lag</span>
            </h2>

            {/* Description */}
            <p className="text-slate-600 text-sm md:text-[15px] leading-relaxed max-w-[500px] mb-8">
              Speed through peak morning rushes with rapid counter checkout, track milk, tea leaves, and syrup batch depletion automatically, and turn casual sippers into daily regulars with built-in digital loyalty wallets.
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

            {/* Mandatory Bottom Trust Strip */}
            <div className="flex flex-wrap gap-5 text-[13px] font-semibold text-slate-700">
              <span className="inline-flex items-center gap-2">
                <svg width="15" height="15" fill="none" stroke="#ea580c" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>
                Complete Setup
              </span>
              <span className="inline-flex items-center gap-2">
                <svg width="15" height="15" fill="none" stroke="#ea580c" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>
                Easy to access
              </span>
              <span className="inline-flex items-center gap-2">
                <svg width="15" height="15" fill="none" stroke="#ea580c" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>
                24/7 Service
              </span>
            </div>
          </div>

          {/* Right Trust Stack (5 cols) */}
          <div className="content-right relative z-10 lg:col-span-5 flex flex-col gap-3.5">
            
            {/* Card 1: Made in India */}
            <div className="bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl p-4 md:px-5 flex items-center justify-between shadow-xs transition hover:border-slate-300">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-[14px] bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="6"/>
                    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
                  </svg>
                </div>
                <div>
                  <div className="text-[15px] font-bold text-slate-900">Made in India</div>
                  <div className="text-xs text-slate-500 font-medium">Engineered for Indian Businesses</div>
                </div>
              </div>
              <span className="bg-blue-50 border border-blue-200 text-blue-700 text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">National</span>
            </div>

            {/* Card 2: SECURE SSL Encryption */}
            <div className="bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl p-4 md:px-5 flex items-center justify-between shadow-xs transition hover:border-slate-300">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-[14px] bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-[15px] font-bold text-emerald-600">SECURE</div>
                  <div className="text-xs text-slate-500 font-medium">SSL 256-Bit Bank Encryption</div>
                </div>
              </div>
              <span className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">Verified</span>
            </div>

            {/* Card 3: Trusted by MSME's */}
            <div className="bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl p-4 md:px-5 flex items-center justify-between shadow-xs transition hover:border-slate-300">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-[14px] bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </div>
                <div>
                  <div className="text-[15px] font-bold text-slate-900">Trusted by MSME's</div>
                  <div className="text-xs text-slate-500 font-mono tracking-tight">Udyam: UDYAM-OD-19-0177979</div>
                </div>
              </div>
              <span className="bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">Certified</span>
            </div>

          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          INTERACTIVE DEMO MODAL (WHATSAPP CONNECT)
      ────────────────────────────────────────────────────────── */}
      {demoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-slate-100 text-left animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setDemoModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            ><X size={18} /></button>
            <h3 className="text-xl font-bold text-slate-900">
              Schedule a 15-Minute Cafe Walkthrough
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              See how Priyulabs streamlines modifier billing, barista tags, and digital loyalty for your beverage brand.
            </p>

            <form onSubmit={handleDemoSubmit} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700">
                  Cafe / Brand Name
                </label>
                <input
                  name="outletName"
                  required
                  placeholder="e.g. Roasteria Coffee Bar"
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm focus:border-amber-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">
                  Phone / WhatsApp Number
                </label>
                <input
                  name="phone"
                  required
                  placeholder="+91 98765 43210"
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm focus:border-amber-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Estimated Daily Cups
                  </label>
                  <select
                    name="dailyCups"
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:border-amber-600 focus:outline-none bg-white"
                  >
                    <option>50 - 150 cups</option>
                    <option>150 - 350 cups</option>
                    <option>350 - 800+ cups</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    City / Location
                  </label>
                  <input
                    name="city"
                    required
                    placeholder="e.g. Bengaluru, Mumbai"
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:border-amber-600 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitted}
                className="w-full rounded-xl bg-[#0f172a] py-3 text-sm font-bold text-white shadow-md transition hover:bg-slate-800 disabled:opacity-50 cursor-pointer"
              >
                {submitted ? 'Connecting to WhatsApp...' : 'Confirm Cafe Walkthrough &rarr;'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
