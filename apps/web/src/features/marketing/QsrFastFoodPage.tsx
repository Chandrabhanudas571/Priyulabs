import {
  ArrowRight,
  MessageCircle, motion } from 'framer-motion';
import {
  BarChart3,
  CheckCircle2,
  ChevronRight,
  Clock,
  Flame,
  Globe,
  Layers,
  LayoutDashboard,
  Play,
  QrCode,
  Receipt,
  TrendingUp,
  Truck,
  Zap,
} from 'lucide-react';
import { useState } from 'react';

const fadeAnim = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
};

export function QsrFastFoodPage() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleDemoSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('outletName') as string;
    const phone = formData.get('phone') as string;
    const dailyOrders = formData.get('dailyOrders') as string;
    const city = formData.get('city') as string;

    setSubmitted(true);
    const msg = `Hello Priyulabs! I would like to schedule a 15-minute QSR walkthrough for ${name} (${dailyOrders} orders/day, ${city}). My phone is ${phone}.`;
    setTimeout(() => {
      window.open(`https://wa.me/917849074050?text=${encodeURIComponent(msg)}`, '_blank');
      setDemoModalOpen(false);
      setSubmitted(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-slate-900 selection:text-white">
      {/* ──────────────────────────────────────────────────────────
          1. HERO SECTION (High Volume, Split-Second Counter Editorial)
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
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              QSR &amp; QUICK BITES
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-6 text-4xl font-extrabold tracking-tight text-[#0f172a] sm:text-6xl sm:leading-[1.12] lg:text-7xl"
            >
              High Volume. Split-Second Ordering.{' '}
              <span className="block text-slate-500 font-bold">Zero Bottlenecks.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#475569] sm:text-xl sm:leading-relaxed"
            >
              The ultra-fast retail operating system built for burger joints, pizza outlets, chai points, and takeaway counters — built to turn queues into revenue with zero counter lag.
            </motion.p>

            {/* CTA Actions */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-9 flex flex-wrap items-center justify-center gap-4"
            >
              <a
                href="/#contact"
                className="inline-flex items-center justify-center rounded-xl bg-[#0f172a] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-slate-800 hover:shadow-md hover:scale-[1.02] active:scale-[0.99] cursor-pointer no-underline"
              >
                Get Started Today
              </a>
              <a
                href="#pillars"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 shadow-xs transition-all duration-300 hover:border-neutral-400 hover:bg-neutral-50 hover:scale-[1.02] cursor-pointer no-underline"
              >
                See QSR Features ↓
              </a>
            </motion.div>
          </div>

          {/* Hero Visual Frame */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-14 sm:mt-20 relative mx-auto max-w-5xl rounded-2xl border border-neutral-200/80 bg-neutral-100 p-2 sm:p-3 shadow-xl lg:rounded-3xl"
          >
            <div className="relative overflow-hidden rounded-xl bg-slate-900 aspect-16/10 sm:aspect-16/9">
              <img
                src="/assets/qsr_hero_counter.jpg"
                alt="Modern fast-food QSR ordering counter and digital menu displays"
                className="h-full w-full object-cover opacity-95 transition-transform duration-700 hover:scale-105"
              />

              {/* Floating Token & Counter UI Overlay */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 max-w-xs rounded-xl bg-white/95 p-3.5 sm:p-4 shadow-lg backdrop-blur-md border border-neutral-200/80 text-left">
                <div className="flex items-center justify-between border-b border-neutral-100 pb-2 mb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-extrabold text-slate-900 tracking-wider">TOKEN #A-108</span>
                  </div>
                  <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">READY</span>
                </div>
                <div className="space-y-1 text-xs text-slate-600">
                  <div className="flex justify-between font-medium">
                    <span>2x Smash Crispy Chicken Combo</span>
                    <strong className="text-slate-900">₹440</strong>
                  </div>
                  <div className="text-[11px] text-slate-400">• Extra Peri Peri Dip + Coke Zero</div>
                </div>
                <div className="mt-2.5 pt-2 border-t border-neutral-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Counter: Lane 01</span>
                  <span className="font-bold text-emerald-600">⚡ Billed in 2.1s</span>
                </div>
              </div>

              {/* Dual KDS Station Pill */}
              <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 rounded-xl bg-[#0f172a]/95 text-white px-4 py-2.5 shadow-xl backdrop-blur-md border border-slate-700 text-left flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 font-bold text-sm">
                  ⚡
                </div>
                <div>
                  <div className="text-xs font-bold">Kitchen Queue: 3 Tickets</div>
                  <div className="text-[10.5px] text-slate-400">Swiggy • Zomato • Counter Synced</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          2. THE 4 PILLARS — HOW OUR SOFTWARE DIRECTLY IMPROVES FAST FOOD & TAKEAWAY
      ────────────────────────────────────────────────────────── */}
      <section id="pillars" className="py-24 sm:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-2xl text-center mb-20 sm:mb-24">
            <span className="text-xs font-bold tracking-widest text-slate-500 uppercase">
              The 4 Pillars of Operational Speed
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#0f172a] sm:text-5xl">
              Software engineered for maximum rush-hour velocity.
            </h2>
            <p className="mt-4 text-base text-[#475569]">
              Solving the four biggest bottlenecks in quick service: long counter queues, delivery app chaos, commission leaks, and afternoon lulls.
            </p>
          </div>

          <div className="space-y-24 sm:space-y-32">
            {/* Pillar 1 */}
            <motion.div {...fadeAnim} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-6 space-y-5 text-left">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                  <Zap size={13} />
                  Under 3-Second Average Checkout
                </div>

                <h3 className="text-2xl font-bold tracking-tight text-[#0f172a] sm:text-3xl lg:text-4xl">
                  Pillar 1: Smart POS — 2-Second Counter Billing &amp; Token Generation
                </h3>

                <div className="space-y-3 text-sm sm:text-base leading-relaxed text-[#475569]">
                  <div className="rounded-xl bg-[#f8fafc] border border-neutral-200/80 p-4">
                    <strong className="text-[#0f172a] block font-semibold mb-1">The Problem Solved:</strong>
                    Long queues at peak lunch/dinner rush leading to abandoned orders, customer frustration, and walkaways.
                  </div>
                  <div>
                    <strong className="text-[#0f172a] block font-semibold mb-1">How It Works:</strong>
                    Touch-first rapid menu grid, instant modifier combos (add cheese, extra dip), auto-generated order tokens, and 1-tap UPI/contactless payments. Works 100% offline during network drops.
                  </div>
                </div>

                <ul className="pt-2 space-y-2.5 text-sm font-medium text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600" />
                    Rapid numeric shortcut keys &amp; combo bundling
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600" />
                    Auto-trigger thermal token receipts &amp; customer-facing screens
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600" />
                    Zero cloud latency — bills generated locally in 0.2s
                  </li>
                </ul>
              </div>

              <div className="lg:col-span-6">
                <div className="group overflow-hidden rounded-2xl border border-neutral-200/80 bg-[#f8fafc] p-2 sm:p-2.5 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.015]">
                  <img
                    src="/assets/qsr_pos_billing.jpg"
                    alt="Touchscreen fast-food POS terminal and meal combo billing counter"
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
                    src="/assets/qsr_kitchen_kds.jpg"
                    alt="Live Kitchen Display System KDS and fast-food burger prep assembly line"
                    className="h-80 sm:h-96 w-full rounded-xl object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>

              <div className="lg:col-span-6 order-1 lg:order-2 space-y-5 text-left">
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                  <Flame size={13} />
                  Zero Missed Orders &amp; Instant Kitchen Routing
                </div>

                <h3 className="text-2xl font-bold tracking-tight text-[#0f172a] sm:text-3xl lg:text-4xl">
                  Pillar 2: Complete Management System — Live KDS &amp; Aggregator Integration
                </h3>

                <div className="space-y-3 text-sm sm:text-base leading-relaxed text-[#475569]">
                  <div className="rounded-xl bg-[#f8fafc] border border-neutral-200/80 p-4">
                    <strong className="text-[#0f172a] block font-semibold mb-1">The Problem Solved:</strong>
                    Chaos between online food delivery apps (Swiggy/Zomato) and in-store counter orders with delayed tickets and rider disputes.
                  </div>
                  <div>
                    <strong className="text-[#0f172a] block font-semibold mb-1">How It Works:</strong>
                    Unified Kitchen Display System (KDS) combining online orders and counter takeaways on one screen. Automated item status ("86"/Out of stock) sync across all platforms in real-time.
                  </div>
                </div>

                <ul className="pt-2 space-y-2.5 text-sm font-medium text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600" />
                    Color-coded timers (Green: On time, Yellow: Prep, Red: Delayed)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600" />
                    1-click rider pickup verification via token sound alert
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600" />
                    Auto-sync out-of-stock items across Swiggy and Zomato instantly
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Pillar 3 */}
            <motion.div {...fadeAnim} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-6 space-y-5 text-left">
                <div className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-xs font-bold text-purple-700">
                  <Globe size={13} />
                  Save Up To 30% Delivery Commissions
                </div>

                <h3 className="text-2xl font-bold tracking-tight text-[#0f172a] sm:text-3xl lg:text-4xl">
                  Pillar 3: Custom Website &amp; QR Ordering — Direct Takeaway &amp; Pickup Web Store
                </h3>

                <div className="space-y-3 text-sm sm:text-base leading-relaxed text-[#475569]">
                  <div className="rounded-xl bg-[#f8fafc] border border-neutral-200/80 p-4">
                    <strong className="text-[#0f172a] block font-semibold mb-1">The Problem Solved:</strong>
                    Losing 20–30% margins on aggregator commissions for loyal, recurring local customers.
                  </div>
                  <div>
                    <strong className="text-[#0f172a] block font-semibold mb-1">How It Works:</strong>
                    A lightweight, lightning-fast mobile web ordering app for direct curb-side pickups, scheduled pre-orders, and table QR ordering without downloading an app.
                  </div>
                </div>

                <ul className="pt-2 space-y-2.5 text-sm font-medium text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600" />
                    0% commission direct online ordering with instant UPI payments
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600" />
                    Schedule pickup orders so food is packed before the customer arrives
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600" />
                    Automatic customer database capture for repeat marketing
                  </li>
                </ul>
              </div>

              <div className="lg:col-span-6">
                <div className="group overflow-hidden rounded-2xl border border-neutral-200/80 bg-[#f8fafc] p-2 sm:p-2.5 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.015]">
                  <img
                    src="https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=1200&q=80"
                    alt="Direct mobile pickup ordering for burgers and quick bites"
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
                    src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80"
                    alt="Hyper-local fast food marketing and repeat combos"
                    className="h-80 sm:h-96 w-full rounded-xl object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>

              <div className="lg:col-span-6 order-1 lg:order-2 space-y-5 text-left">
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-bold text-amber-800">
                  <TrendingUp size={13} />
                  4x Higher Repeat Order Frequency
                </div>

                <h3 className="text-2xl font-bold tracking-tight text-[#0f172a] sm:text-3xl lg:text-4xl">
                  Pillar 4: Targeted Digital Marketing &amp; Ads — Hyper-Local Footfall &amp; Re-Orders
                </h3>

                <div className="space-y-3 text-sm sm:text-base leading-relaxed text-[#475569]">
                  <div className="rounded-xl bg-[#f8fafc] border border-neutral-200/80 p-4">
                    <strong className="text-[#0f172a] block font-semibold mb-1">The Problem Solved:</strong>
                    Unpredictable afternoon lulls and low customer retention during off-peak hours.
                  </div>
                  <div>
                    <strong className="text-[#0f172a] block font-semibold mb-1">How It Works:</strong>
                    Geo-fenced 2 km radius Instagram &amp; Meta ads targeting nearby colleges, offices, and residential hubs, plus automated WhatsApp promo triggers for combo offers.
                  </div>
                </div>

                <ul className="pt-2 space-y-2.5 text-sm font-medium text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600" />
                    Automated "Happy Hour" WhatsApp deals triggered between 3 PM – 6 PM
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600" />
                    Targeted Meta ads reaching office lunch clusters within 15 minutes
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600" />
                    1-click loyalty points redemption at the billing counter
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          3. INTERACTIVE FEATURE MATRIX (Minimalist White Cards)
      ────────────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 bg-[#f8fafc] border-y border-neutral-200/70">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16 sm:mb-20">
            <span className="text-xs font-bold tracking-widest text-slate-500 uppercase">
              High-Velocity Fast Food Engine
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#0f172a] sm:text-4xl">
              Everything required to run a high-volume food counter.
            </h2>
            <p className="mt-4 text-base text-[#475569]">
              Engineered specifically for peak order speeds, raw material accuracy, and frictionless takeaway handoffs.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Card 1 */}
            <motion.div
              {...fadeAnim}
              className="rounded-2xl border border-neutral-200/80 bg-white p-7 text-left shadow-xs transition-all duration-300 hover:border-neutral-400 hover:shadow-md hover:scale-[1.02]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-900 mb-5">
                <Receipt size={20} />
              </div>
              <h3 className="text-lg font-bold text-[#0f172a] mb-2">Speed-Optimized Counter POS</h3>
              <p className="text-sm leading-relaxed text-[#475569]">
                Fast product search, category barcodes, instant add-ons, and custom combo bundling built for peak rush speed.
              </p>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              {...fadeAnim}
              className="rounded-2xl border border-neutral-200/80 bg-white p-7 text-left shadow-xs transition-all duration-300 hover:border-neutral-400 hover:shadow-md hover:scale-[1.02]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-900 mb-5">
                <Clock size={20} />
              </div>
              <h3 className="text-lg font-bold text-[#0f172a] mb-2">Kitchen Display (KDS) &amp; Token Screen</h3>
              <p className="text-sm leading-relaxed text-[#475569]">
                Visual color-coded order staging (Preparing, Ready, Picked up) with customer-facing token displays and audio buzzers.
              </p>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              {...fadeAnim}
              className="rounded-2xl border border-neutral-200/80 bg-white p-7 text-left shadow-xs transition-all duration-300 hover:border-neutral-400 hover:shadow-md hover:scale-[1.02]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-900 mb-5">
                <Truck size={20} />
              </div>
              <h3 className="text-lg font-bold text-[#0f172a] mb-2">Dynamic Online Aggregator Sync</h3>
              <p className="text-sm leading-relaxed text-[#475569]">
                Single central menu control that pushes dynamic pricing, new combos, and 86 status to third-party delivery apps instantly.
              </p>
            </motion.div>

            {/* Card 4 */}
            <motion.div
              {...fadeAnim}
              className="rounded-2xl border border-neutral-200/80 bg-white p-7 text-left shadow-xs transition-all duration-300 hover:border-neutral-400 hover:shadow-md hover:scale-[1.02]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-900 mb-5">
                <Layers size={20} />
              </div>
              <h3 className="text-lg font-bold text-[#0f172a] mb-2">Portion &amp; Raw Material Tracking</h3>
              <p className="text-sm leading-relaxed text-[#475569]">
                Real-time consumption tracking for patties, buns, cheese slices, packaging boxes, and dips with low-stock alerts.
              </p>
            </motion.div>

            {/* Card 5 */}
            <motion.div
              {...fadeAnim}
              className="rounded-2xl border border-neutral-200/80 bg-white p-7 text-left shadow-xs transition-all duration-300 hover:border-neutral-400 hover:shadow-md hover:scale-[1.02]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-900 mb-5">
                <QrCode size={20} />
              </div>
              <h3 className="text-lg font-bold text-[#0f172a] mb-2">Self-Ordering Kiosk Mode</h3>
              <p className="text-sm leading-relaxed text-[#475569]">
                Switch any tablet into a self-service customer ordering kiosk with integrated UPI QR payments to cut queues in half.
              </p>
            </motion.div>

            {/* Card 6 */}
            <motion.div
              {...fadeAnim}
              className="rounded-2xl border border-neutral-200/80 bg-white p-7 text-left shadow-xs transition-all duration-300 hover:border-neutral-400 hover:shadow-md hover:scale-[1.02]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-900 mb-5">
                <LayoutDashboard size={20} />
              </div>
              <h3 className="text-lg font-bold text-[#0f172a] mb-2">Multi-Outlet Central Control</h3>
              <p className="text-sm leading-relaxed text-[#475569]">
                Update combo prices, monitor daily sales, and transfer stock across city branches instantly from one central dashboard.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          4. METRICS THAT MATTER STRIP
      ────────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-white border-b border-neutral-200/70">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            <div className="border-l-2 border-slate-300 pl-5 text-left">
              <div className="text-4xl font-black tracking-tight text-[#0f172a] sm:text-5xl">&lt; 3s</div>
              <div className="mt-2 text-sm font-bold text-[#0f172a]">Average Checkout Time</div>
              <div className="text-xs text-slate-500 mt-1">Instant modifier taps and barcode billing.</div>
            </div>

            <div className="border-l-2 border-slate-300 pl-5 text-left">
              <div className="text-4xl font-black tracking-tight text-[#0f172a] sm:text-5xl">100%</div>
              <div className="mt-2 text-sm font-bold text-[#0f172a]">Centralized Delivery App Sync</div>
              <div className="text-xs text-slate-500 mt-1">Swiggy &amp; Zomato orders on 1 live KDS.</div>
            </div>

            <div className="border-l-2 border-slate-300 pl-5 text-left">
              <div className="text-4xl font-black tracking-tight text-[#0f172a] sm:text-5xl">25%+</div>
              <div className="mt-2 text-sm font-bold text-[#0f172a]">Growth in Direct Online Pickups</div>
              <div className="text-xs text-slate-500 mt-1">Zero commissions on direct QR &amp; web store.</div>
            </div>

            <div className="border-l-2 border-slate-300 pl-5 text-left">
              <div className="text-4xl font-black tracking-tight text-[#0f172a] sm:text-5xl">0</div>
              <div className="mt-2 text-sm font-bold text-[#0f172a]">Lost KOTs During Rush Hours</div>
              <div className="text-xs text-slate-500 mt-1">Dual offline fallback with thermal backup.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          5. BOTTOM CONVERSION BANNER
      ────────────────────────────────────────────────────────── */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-5xl px-6 sm:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-slate-950 px-8 py-16 text-center text-white sm:px-14">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Ready to Upgrade Your QSR &amp; Fast Food Operations?
            </h2>
            <p className="mt-4 max-w-xl mx-auto text-base text-slate-400">
              Accelerate high-velocity peak hour lines, sync self-ordering kiosks, optimize kitchen display timers, and turn first-time diners into loyal regulars.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="/#cta"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-slate-950 shadow-md transition hover:bg-slate-100 hover:-translate-y-0.5"
              >
                Get Started Today
                <ArrowRight size={16} />
              </a>
              <a
                href="https://wa.me/917849074050?text=Hello%20Priyulabs!%20I%20run%20a%20QSR%20and%20want%20to%20see%20a%20live%20POS%20demo."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-transparent px-7 py-3.5 text-sm font-bold text-white transition hover:bg-slate-850 hover:border-slate-600"
              >
                <MessageCircle size={18} />
                Chat with a QSR Specialist
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          WALKTHROUGH MODAL
      ────────────────────────────────────────────────────────── */}
      {demoModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setDemoModalOpen(false);
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="w-full max-w-lg rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-2xl text-left"
          >
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3 mb-5">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Priyulabs QSR OS</span>
                <h3 className="text-xl font-extrabold text-[#0f172a]">Schedule a 15-Minute QSR Walkthrough</h3>
              </div>
              <button
                onClick={() => setDemoModalOpen(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-neutral-100 hover:text-slate-700 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleDemoSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  QSR / Brand / Outlet Name
                </label>
                <input
                  type="text"
                  name="outletName"
                  required
                  placeholder="e.g. Burger Shack, Chai Adda"
                  className="mt-1 w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder-neutral-400 focus:border-slate-900 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="e.g. 9876543210"
                    className="mt-1 w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder-neutral-400 focus:border-slate-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Daily Orders</label>
                  <select
                    name="dailyOrders"
                    className="mt-1 w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-slate-900 focus:outline-none"
                  >
                    <option value="50-150">50 – 150 Orders / Day</option>
                    <option value="150-300">150 – 300 Orders / Day</option>
                    <option value="300+">300+ High Rush Orders</option>
                    <option value="Multi-Outlet">Multi-Outlet Chain</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">City</label>
                <input
                  type="text"
                  name="city"
                  required
                  placeholder="e.g. Mumbai, Delhi NCR, Bengaluru"
                  className="mt-1 w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder-neutral-400 focus:border-slate-900 focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitted}
                  className="w-full rounded-xl bg-[#0f172a] py-3 text-sm font-bold text-white shadow-sm transition-all hover:bg-slate-800 cursor-pointer disabled:opacity-75"
                >
                  {submitted ? 'Opening WhatsApp...' : 'Confirm Walkthrough on WhatsApp →'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}