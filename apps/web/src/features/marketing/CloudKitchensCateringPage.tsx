import {
  ArrowRight,
  MessageCircle, motion } from 'framer-motion';
import {
  Boxes,
  CheckCircle2,
  ChevronRight,
  Clock,
  Layers,
  LayoutDashboard,
  Percent,
  Play,
  Receipt,
  Scale,
  Send,
  Share2,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Truck,
  Users,
  UtensilsCrossed,
  Zap,
} from 'lucide-react';
import { useState } from 'react';

const fadeAnim = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
};

export function CloudKitchensCateringPage() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleDemoSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('kitchenName') as string;
    const brandsCount = formData.get('brandsCount') as string;
    const model = formData.get('kitchenModel') as string;
    const phone = formData.get('phone') as string;
    const city = formData.get('city') as string;

    setSubmitted(true);
    const msg = `Hello Priyulabs! I would like to schedule a 15-minute Cloud Kitchen & Catering walkthrough for ${name} (${brandsCount} brands, Model: ${model}, ${city}). My phone is ${phone}.`;
    setTimeout(() => {
      window.open(`https://wa.me/917849074050?text=${encodeURIComponent(msg)}`, '_blank');
      setDemoModalOpen(false);
      setSubmitted(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-slate-900 selection:text-white">
      {/* ──────────────────────────────────────────────────────────
          1. HERO SECTION (Commercial Production Line Editorial)
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
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
              CLOUD KITCHENS, GHOST KITCHENS &amp; CATERING
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-6 text-4xl font-extrabold tracking-tight text-[#0f172a] sm:text-6xl sm:leading-[1.12] lg:text-7xl"
            >
              Multi-Brand Kitchens. Bulk Catering.{' '}
              <span className="block text-indigo-600 font-bold">Zero Delivery Friction.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#475569] sm:text-xl sm:leading-relaxed"
            >
              The production operating system built to manage multiple virtual brands from one kitchen line, dispatch bulk catering batches on time, and maximize margin per square foot.
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
              <button
                onClick={() => setVideoModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-300 bg-white px-7 py-3.5 text-sm font-semibold text-[#0f172a] shadow-xs transition-all duration-300 hover:border-neutral-400 hover:bg-neutral-50 hover:scale-[1.02] active:scale-[0.99] cursor-pointer"
              >
                <Play size={15} className="text-[#0f172a] fill-[#0f172a]" />
                View Kitchen Operations Demo
              </button>
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
                  src="/assets/cloud_kitchen_hero.jpg"
                  alt="Authentic commercial cloud kitchen production line with chefs plating multi-brand boxes and dual-screen KDS"
                  className="h-full w-full object-cover opacity-95 transition-transform duration-700 hover:scale-105"
                />

                {/* Floating Multi-Brand Dispatch Overlay */}
                <div className="absolute top-4 left-4 sm:top-6 sm:left-6 max-w-xs sm:max-w-sm rounded-xl bg-white/95 p-3.5 sm:p-4 shadow-lg backdrop-blur-md border border-neutral-200/80 text-left">
                  <div className="flex items-center justify-between border-b border-neutral-100 pb-2 mb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-indigo-600 animate-pulse" />
                      <span className="text-xs font-extrabold text-slate-900 tracking-wider">DISPATCH #CK-890</span>
                    </div>
                    <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-700">MULTI-BRAND</span>
                  </div>
                  <div className="space-y-1.5 text-xs text-slate-600">
                    <div className="flex justify-between items-center font-medium">
                      <span className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-amber-500" />
                        <strong>Brand 1: Burger Hub</strong> (Swiggy)
                      </span>
                      <strong className="text-slate-900">₹540</strong>
                    </div>
                    <div className="flex justify-between items-center font-medium">
                      <span className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-rose-500" />
                        <strong>Brand 2: Spicy Wok</strong> (Zomato)
                      </span>
                      <strong className="text-slate-900">₹680</strong>
                    </div>
                    <div className="flex justify-between items-center font-medium">
                      <span className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        <strong>Brand 3: Fresh Box</strong> (Direct Web)
                      </span>
                      <strong className="text-slate-900">₹1,250</strong>
                    </div>
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-neutral-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span>Central KDS Station: Line 01</span>
                    <span className="font-bold text-emerald-600">⚡ Dispatched in 4.2m</span>
                  </div>
                </div>

                {/* Direct Channel Margin Pill */}
                <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 rounded-xl bg-[#0f172a]/95 text-white px-4 py-2.5 shadow-xl backdrop-blur-md border border-slate-700 text-left flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400 font-bold text-sm">
                    📦
                  </div>
                  <div>
                    <div className="text-xs font-bold">Direct Corporate Catering</div>
                    <div className="text-[10.5px] text-emerald-400 font-semibold">100% Zero Aggregator Commission</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          2. THE 4 PILLARS — HOW OUR SOFTWARE EMPOWERS CLOUD KITCHENS & CATERING
      ────────────────────────────────────────────────────────── */}
      <section id="pillars" className="py-24 sm:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-2xl text-center mb-20 sm:mb-24">
            <span className="text-xs font-bold tracking-widest text-slate-500 uppercase">
              The 4 Pillars of Production Efficiency
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#0f172a] sm:text-5xl">
              How Our Software Empowers Cloud Kitchens &amp; Catering
            </h2>
            <p className="mt-4 text-base text-[#475569]">
              Four dedicated operating pillars addressing the unique bottlenecks of multi-brand cooking, central prep yields, and direct high-ticket catering sales.
            </p>
          </div>

          <div className="space-y-24 sm:space-y-32">
            {/* Pillar 1 */}
            <motion.div {...fadeAnim} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-6 space-y-5 text-left">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800">
                  <Zap size={13} />
                  1 Screen for All Brands &amp; Channels
                </div>

                <h3 className="text-2xl font-bold tracking-tight text-[#0f172a] sm:text-3xl lg:text-4xl">
                  Pillar 1: Smart POS — Multi-Brand Hub on One Touch Screen
                </h3>

                <div className="space-y-3 text-sm sm:text-base leading-relaxed text-[#475569]">
                  <div className="rounded-xl bg-[#f8fafc] border border-neutral-200/80 p-4">
                    <strong className="text-[#0f172a] block font-semibold mb-1">The Problem Solved:</strong>
                    Managing 4–5 separate delivery tablets (Swiggy, Zomato, direct orders) causing order drop-offs and dispatch errors.
                  </div>
                  <div>
                    <strong className="text-[#0f172a] block font-semibold mb-1">How It Works:</strong>
                    One unified screen receives, accepts, and routes tickets for all your virtual food brands simultaneously. Automatic item 86-ing (marking out of stock) across all aggregators in a single tap.
                  </div>
                </div>

                <ul className="pt-2 space-y-2.5 text-sm font-medium text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600" />
                    Unified multi-brand ticket stream from Swiggy, Zomato &amp; Direct Web
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600" />
                    1-Tap universal item 86-ing instantly across all food delivery platforms
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600" />
                    Color-coded brand routing directly to line stations (Grill, Fry, Packing)
                  </li>
                </ul>
              </div>

              <div className="lg:col-span-6">
                <div className="group overflow-hidden rounded-2xl border border-neutral-200/80 bg-[#f8fafc] p-2 sm:p-2.5 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.015]">
                  <img
                    src="/assets/cloud_kitchen_pos.jpg"
                    alt="Unified multi-brand touchscreen POS terminal in a commercial cloud kitchen"
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
                    src="/assets/cloud_kitchen_catering.jpg"
                    alt="Commercial central kitchen batch catering prep, raw ingredients, and branded box inventory"
                    className="h-80 sm:h-96 w-full rounded-xl object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>

              <div className="lg:col-span-6 order-1 lg:order-2 space-y-5 text-left">
                <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-800">
                  <Scale size={13} />
                  Real-Time Yield vs. Portion Costing
                </div>

                <h3 className="text-2xl font-bold tracking-tight text-[#0f172a] sm:text-3xl lg:text-4xl">
                  Pillar 2: Complete Management System — Central Prep, Batch Yield &amp; Packaging Stock
                </h3>

                <div className="space-y-3 text-sm sm:text-base leading-relaxed text-[#475569]">
                  <div className="rounded-xl bg-[#f8fafc] border border-neutral-200/80 p-4">
                    <strong className="text-[#0f172a] block font-semibold mb-1">The Problem Solved:</strong>
                    Running out of custom-branded packaging boxes and miscalculating raw gravy/base prep yields for high-demand dinner slots.
                  </div>
                  <div>
                    <strong className="text-[#0f172a] block font-semibold mb-1">How It Works:</strong>
                    Smart central kitchen prep lists based on forecasted hourly demand. Granular deduction of raw produce, meat cuts, and distinct branded containers for every brand.
                  </div>
                </div>

                <ul className="pt-2 space-y-2.5 text-sm font-medium text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-indigo-600" />
                    Hourly prep batch forecast based on historical lunch &amp; dinner surges
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-indigo-600" />
                    Automatic packaging deduction per order prevents stockout surprises
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-indigo-600" />
                    Central commissary transfer tracking with inter-kitchen dispatch logs
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Pillar 3 */}
            <motion.div {...fadeAnim} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-6 space-y-5 text-left">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800">
                  <Percent size={13} />
                  Save Thousands in 3rd-Party Fees
                </div>

                <h3 className="text-2xl font-bold tracking-tight text-[#0f172a] sm:text-3xl lg:text-4xl">
                  Pillar 3: Custom Website &amp; B2B Catering Engine — Direct Bulk Orders
                </h3>

                <div className="space-y-3 text-sm sm:text-base leading-relaxed text-[#475569]">
                  <div className="rounded-xl bg-[#f8fafc] border border-neutral-200/80 p-4">
                    <strong className="text-[#0f172a] block font-semibold mb-1">The Problem Solved:</strong>
                    Losing 25–30% delivery commission on high-ticket party, corporate, and catering orders.
                  </div>
                  <div>
                    <strong className="text-[#0f172a] block font-semibold mb-1">How It Works:</strong>
                    Branded direct web ordering for family meal subscriptions, pre-scheduled corporate lunch drops, and an interactive catering menu builder with guest-count price estimators.
                  </div>
                </div>

                <ul className="pt-2 space-y-2.5 text-sm font-medium text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600" />
                    Custom catering quote generator with guest count &amp; per-plate pricing
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600" />
                    Pre-scheduled corporate recurring lunch subscriptions with advance invoicing
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600" />
                    Zero aggregator commission on direct customers — protect 30% bottom line
                  </li>
                </ul>
              </div>

              <div className="lg:col-span-6">
                <div className="group overflow-hidden rounded-2xl border border-neutral-200/80 bg-[#f8fafc] p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.015] text-left">
                  {/* Interactive Catering Quotation Builder UI Card */}
                  <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-xs space-y-4">
                    <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                      <div>
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-600">B2B CATERING ESTIMATOR</span>
                        <h4 className="text-base font-bold text-slate-900">Tech Park Corporate Lunch (80 Pax)</h4>
                      </div>
                      <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">0% Commission</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                        <span className="text-slate-500 block">Guest Count</span>
                        <strong className="text-slate-900 text-sm">80 Guests</strong>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                        <span className="text-slate-500 block">Per Person Plate</span>
                        <strong className="text-slate-900 text-sm">₹350 / head</strong>
                      </div>
                    </div>

                    <div className="border-t border-dashed border-neutral-200 pt-3 space-y-1.5 text-xs text-slate-600">
                      <div className="flex justify-between">
                        <span>Total Catering Value</span>
                        <strong className="text-slate-900 font-bold">₹28,000</strong>
                      </div>
                      <div className="flex justify-between text-emerald-600 font-semibold">
                        <span>Direct Savings (vs. 28% Aggregator)</span>
                        <strong>+₹7,840 Saved</strong>
                      </div>
                      <div className="flex justify-between text-slate-500">
                        <span>Advance Deposit (50%)</span>
                        <span className="font-semibold text-slate-900">₹14,000 Received (UPI)</span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <div className="w-full rounded-lg bg-indigo-600 py-2 text-center text-xs font-bold text-white shadow-xs">
                        Automated Kitchen Prep Sheet Generated &rarr;
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Pillar 4 */}
            <motion.div {...fadeAnim} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-6 order-2 lg:order-1">
                <div className="group overflow-hidden rounded-2xl border border-neutral-200/80 bg-[#f8fafc] p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.015] text-left">
                  {/* Targeted Delivery Funnel Mock */}
                  <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-xs space-y-4">
                    <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                      <div>
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-600">HYPER-LOCAL GEO FUNNEL</span>
                        <h4 className="text-base font-bold text-slate-900">3.5 km Delivery Radius Ads</h4>
                      </div>
                      <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700">ROAS 3.8x</span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                        <span className="text-slate-600">Target Segment</span>
                        <strong className="text-slate-900">IT Park Clusters &amp; Late Night 9PM-2AM</strong>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                        <span className="text-slate-600">Cost per Acquisition (CAC)</span>
                        <strong className="text-emerald-600 font-bold">₹38 / Customer</strong>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                        <span className="text-slate-600">Direct Order Re-order Rate</span>
                        <strong className="text-slate-900">42% in 30 Days</strong>
                      </div>
                    </div>

                    <div className="border-t border-neutral-100 pt-3 flex items-center justify-between text-xs text-slate-500">
                      <span>Ad Spend: ₹12,000/mo</span>
                      <span className="font-bold text-emerald-600">Generated: ₹45,600 Revenue</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 order-1 lg:order-2 space-y-5 text-left">
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-bold text-amber-800">
                  <TrendingUp size={13} />
                  3.8x Higher Return on Ad Spend (ROAS)
                </div>

                <h3 className="text-2xl font-bold tracking-tight text-[#0f172a] sm:text-3xl lg:text-4xl">
                  Pillar 4: Targeted Digital Marketing &amp; Ads — Hyper-Local Delivery Radius Dominance
                </h3>

                <div className="space-y-3 text-sm sm:text-base leading-relaxed text-[#475569]">
                  <div className="rounded-xl bg-[#f8fafc] border border-neutral-200/80 p-4">
                    <strong className="text-[#0f172a] block font-semibold mb-1">The Problem Solved:</strong>
                    Virtual brands remain invisible to nearby customers without steep in-app discounting.
                  </div>
                  <div>
                    <strong className="text-[#0f172a] block font-semibold mb-1">How It Works:</strong>
                    Geo-fenced 3–5 km radius Meta and Google performance ad funnels targeting hungry office clusters and late-night residential zones, driving them straight to your zero-commission ordering portal.
                  </div>
                </div>

                <ul className="pt-2 space-y-2.5 text-sm font-medium text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-amber-600" />
                    Laser-targeted 3–5 km radius delivery polygon geo-fencing
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-amber-600" />
                    Automated peak-hour ad scheduling (Lunch 11:30AM–2PM &amp; Late Night)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-amber-600" />
                    First-party customer data ownership (phone, address, repeat order history)
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          3. CORE PRODUCTION GRID (6 Minimalist White Cards)
      ────────────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 bg-[#f8fafc] border-y border-neutral-200/80">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16 sm:mb-20">
            <span className="text-xs font-bold tracking-widest text-slate-500 uppercase">
              Core Production Architecture
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#0f172a] sm:text-4xl">
              Engineered for high-throughput multi-brand kitchens.
            </h2>
            <p className="mt-4 text-base text-[#475569]">
              Every module built to prevent station logjams, track ingredients across brands, and ensure on-time delivery dispatch.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Card 1 */}
            <motion.div
              {...fadeAnim}
              className="group flex flex-col justify-between rounded-2xl border border-neutral-200/80 bg-white p-7 shadow-xs transition-all duration-300 hover:shadow-lg hover:border-neutral-300 hover:scale-[1.02] text-left"
            >
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700 transition-colors group-hover:bg-[#0f172a] group-hover:text-white">
                  <Layers size={24} />
                </div>
                <h3 className="mt-5 text-lg font-bold text-[#0f172a]">
                  Unified Multi-Brand KDS
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#475569]">
                  Color-coded dispatch display separating brands, prep stations (Fry, Grill, Packing), and runner handoffs.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center text-xs font-semibold text-indigo-700">
                Zero Station Bottlenecks &rarr;
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              {...fadeAnim}
              className="group flex flex-col justify-between rounded-2xl border border-neutral-200/80 bg-white p-7 shadow-xs transition-all duration-300 hover:shadow-lg hover:border-neutral-300 hover:scale-[1.02] text-left"
            >
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 transition-colors group-hover:bg-[#0f172a] group-hover:text-white">
                  <Truck size={24} />
                </div>
                <h3 className="mt-5 text-lg font-bold text-[#0f172a]">
                  Rider &amp; Courier Dispatch Board
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#475569]">
                  Real-time rider assignment tracking with token alerts to minimize driver wait times at pickup counters.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center text-xs font-semibold text-emerald-700">
                Faster Hand-Offs &rarr;
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              {...fadeAnim}
              className="group flex flex-col justify-between rounded-2xl border border-neutral-200/80 bg-white p-7 shadow-xs transition-all duration-300 hover:shadow-lg hover:border-neutral-300 hover:scale-[1.02] text-left"
            >
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-700 transition-colors group-hover:bg-[#0f172a] group-hover:text-white">
                  <Receipt size={24} />
                </div>
                <h3 className="mt-5 text-lg font-bold text-[#0f172a]">
                  Catering Quotation &amp; Contract Mode
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#475569]">
                  Generate itemized event catering quotes, advance deposit invoices, and prep schedules instantly.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center text-xs font-semibold text-amber-700">
                B2B Contracts in 1 Tap &rarr;
              </div>
            </motion.div>

            {/* Card 4 */}
            <motion.div
              {...fadeAnim}
              className="group flex flex-col justify-between rounded-2xl border border-neutral-200/80 bg-white p-7 shadow-xs transition-all duration-300 hover:shadow-lg hover:border-neutral-300 hover:scale-[1.02] text-left"
            >
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-700 transition-colors group-hover:bg-[#0f172a] group-hover:text-white">
                  <Scale size={24} />
                </div>
                <h3 className="mt-5 text-lg font-bold text-[#0f172a]">
                  Yield &amp; Recipe Cost Control
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#475569]">
                  Track standard recipes across shared ingredients (onions, oils, proteins) across all sub-brands.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center text-xs font-semibold text-purple-700">
                Accurate Portion Costing &rarr;
              </div>
            </motion.div>

            {/* Card 5 */}
            <motion.div
              {...fadeAnim}
              className="group flex flex-col justify-between rounded-2xl border border-neutral-200/80 bg-white p-7 shadow-xs transition-all duration-300 hover:shadow-lg hover:border-neutral-300 hover:scale-[1.02] text-left"
            >
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700 transition-colors group-hover:bg-[#0f172a] group-hover:text-white">
                  <Clock size={24} />
                </div>
                <h3 className="mt-5 text-lg font-bold text-[#0f172a]">
                  Bulk Meal Subscription Billing
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#475569]">
                  Automated recurring billing and scheduled dispatch sheets for weekly tiffin or corporate catering.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center text-xs font-semibold text-blue-700">
                Predictable Monthly Revenue &rarr;
              </div>
            </motion.div>

            {/* Card 6 */}
            <motion.div
              {...fadeAnim}
              className="group flex flex-col justify-between rounded-2xl border border-neutral-200/80 bg-white p-7 shadow-xs transition-all duration-300 hover:shadow-lg hover:border-neutral-300 hover:scale-[1.02] text-left"
            >
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50 text-rose-700 transition-colors group-hover:bg-[#0f172a] group-hover:text-white">
                  <LayoutDashboard size={24} />
                </div>
                <h3 className="mt-5 text-lg font-bold text-[#0f172a]">
                  Central Master Dashboard
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#475569]">
                  Live consolidated gross margin, outlet comparison, and vendor payout tracking across all cloud hubs.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center text-xs font-semibold text-rose-700">
                Total Multi-Hub Control &rarr;
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          4. METRICS THAT MATTER STRIP
      ────────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-white border-b border-neutral-200/80">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 text-center">
            {/* Metric 1 */}
            <motion.div {...fadeAnim} className="space-y-2">
              <div className="text-3xl font-bold text-indigo-600 sm:text-4xl lg:text-5xl">
                5-in-1
              </div>
              <div className="text-sm font-semibold text-slate-700">
                Virtual Brands on Single Terminal
              </div>
            </motion.div>

            {/* Metric 2 */}
            <motion.div {...fadeAnim} className="space-y-2">
              <div className="text-3xl font-bold text-emerald-600 sm:text-4xl lg:text-5xl">
                100%
              </div>
              <div className="text-sm font-semibold text-slate-700">
                Automated Multi-Aggregator Sync
              </div>
            </motion.div>

            {/* Metric 3 */}
            <motion.div {...fadeAnim} className="space-y-2">
              <div className="text-3xl font-bold text-indigo-600 sm:text-4xl lg:text-5xl">
                0
              </div>
              <div className="text-sm font-semibold text-slate-700">
                Packaging Stockouts During Peak Rush
              </div>
            </motion.div>

            {/* Metric 4 */}
            <motion.div {...fadeAnim} className="space-y-2">
              <div className="text-3xl font-bold text-amber-600 sm:text-4xl lg:text-5xl">
                30%
              </div>
              <div className="text-sm font-semibold text-slate-700">
                Margin Protection via Direct Web Orders
              </div>
            </motion.div>
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
              Ready to Upgrade Your Cloud Kitchen &amp; Catering Operations?
            </h2>
            <p className="mt-4 max-w-xl mx-auto text-base text-slate-400">
              Centralize orders from Swiggy, Zomato, and direct web channels into a single KDS, automate raw material batch prep, and run multiple virtual brands from one kitchen.
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
                href="https://wa.me/917849074050?text=Hello%20Priyulabs!%20I%20run%20a%20cloud%20kitchen%20and%20want%20to%20see%20a%20live%20POS%20demo."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-transparent px-7 py-3.5 text-sm font-bold text-white transition hover:bg-slate-850 hover:border-slate-600"
              >
                <MessageCircle size={18} />
                Chat with a Cloud Kitchen Specialist
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          INTERACTIVE DEMO MODAL
      ────────────────────────────────────────────────────────── */}
      {demoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 sm:p-8 shadow-2xl border border-neutral-200">
            <button
              onClick={() => setDemoModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 font-bold text-xl cursor-pointer"
            >
              &times;
            </button>
            <div className="text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                PRIYULABS CLOUD SUITE
              </span>
              <h3 className="mt-1 text-2xl font-extrabold text-slate-900">
                Book a 15-Min Cloud Kitchen Walkthrough
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Get a personalized demonstration on unifying multi-brand orders and managing bulk catering production.
              </p>

              <form onSubmit={handleDemoSubmit} className="mt-6 space-y-4 text-left">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Kitchen / Business Name
                  </label>
                  <input
                    name="kitchenName"
                    required
                    placeholder="e.g. Ghost Crafters / Urban Cloud Hub"
                    className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-indigo-600 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Number of Brands
                    </label>
                    <select
                      name="brandsCount"
                      className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-indigo-600 focus:outline-none"
                    >
                      <option value="1 Brand">1 Virtual Brand</option>
                      <option value="2-3 Brands">2 - 3 Virtual Brands</option>
                      <option value="4-6 Brands">4 - 6 Virtual Brands</option>
                      <option value="7+ Brands">7+ Brands (Multi-Hub)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Operating Model
                    </label>
                    <select
                      name="kitchenModel"
                      className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-indigo-600 focus:outline-none"
                    >
                      <option value="Cloud Kitchen Only">Cloud Kitchen Only</option>
                      <option value="Catering & Bulk Orders">Catering &amp; Bulk Orders</option>
                      <option value="Hybrid (Delivery + Catering)">Hybrid (Both)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      City
                    </label>
                    <input
                      name="city"
                      required
                      placeholder="e.g. Mumbai, Bengaluru"
                      className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-indigo-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Phone Number
                    </label>
                    <input
                      name="phone"
                      required
                      placeholder="+91 98765 43210"
                      className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-indigo-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitted}
                    className="w-full rounded-xl bg-indigo-600 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-indigo-700 cursor-pointer"
                  >
                    {submitted ? 'Connecting on WhatsApp...' : 'Confirm Walkthrough on WhatsApp →'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────
          VIDEO WALKTHROUGH MODAL
      ────────────────────────────────────────────────────────── */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-black shadow-2xl border border-slate-800">
            <button
              onClick={() => setVideoModalOpen(false)}
              className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-slate-800/80 text-white hover:bg-slate-700"
            >
              &times;
            </button>
            <div className="aspect-16/9 w-full">
              <video
                src="/assets/pos-checkout.mp4"
                autoPlay
                controls
                className="h-full w-full object-cover"
              />
            </div>
            <div className="bg-slate-900 p-4 text-left">
              <h4 className="text-sm font-bold text-white">Priyulabs Cloud Kitchen &amp; Catering Engine Overview</h4>
              <p className="text-xs text-slate-400 mt-1">
                Showing multi-brand KDS routing, raw batch inventory yield tracking, and direct zero-commission catering orders.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
