import { motion } from 'framer-motion';
import {
  ArrowRight,
  MessageCircle,
  BarChart3,
  Calendar,
  CheckCircle2,
  ChefHat,
  ChevronRight,
  Clock,
  Compass,
  CreditCard,
  Flame,
  Globe,
  Layers,
  LayoutDashboard,
  Lock,
  MapPin,
  Megaphone,
  Monitor,
  Phone,
  Play,
  Printer,
  Receipt,
  RotateCcw,
  ShieldCheck,
  Smartphone,
  Sparkles,
  TrendingUp,
  Users,
  UtensilsCrossed,
  Wine,
  Zap,
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const fadeAnim = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
};

export function RestaurantsFineDiningPage() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleDemoSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('restaurantName') as string;
    const phone = formData.get('phone') as string;
    const tables = formData.get('tables') as string;
    const city = formData.get('city') as string;

    setSubmitted(true);
    const msg = `Hello Priyulabs! I would like to schedule a 1-on-1 walkthrough of the Fine Dining OS for ${name} (${tables} tables, ${city}). My phone is ${phone}.`;
    setTimeout(() => {
      window.open(`https://wa.me/917849074050?text=${encodeURIComponent(msg)}`, '_blank');
      setDemoModalOpen(false);
      setSubmitted(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-slate-900 selection:text-white">
      {/* ──────────────────────────────────────────────────────────
          1. HERO SECTION (Clean Minimalist Editorial)
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
              RESTAURANTS &amp; FINE DINING
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-6 text-4xl font-extrabold tracking-tight text-[#0f172a] sm:text-6xl sm:leading-[1.12] lg:text-7xl"
            >
              Hospitality at its finest.{' '}
              <span className="block text-slate-500 font-bold">Operations at full speed.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#475569] sm:text-xl sm:leading-relaxed"
            >
              From split-second table-side billing to intelligent kitchen automation and automated diner growth — an
              all-in-one platform built to elevate every dining service.
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
                Start Your Free Trial
              </a>
              <button
                onClick={() => setVideoModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 shadow-xs transition-all duration-300 hover:border-neutral-400 hover:bg-neutral-50 hover:scale-[1.02] cursor-pointer"
              >
                <Play size={15} className="fill-slate-800 text-slate-800" />
                Watch 2-Min Demo
              </button>
            </motion.div>
          </div>

          {/* Hero Visual Frame */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-14 sm:mt-18 relative mx-auto max-w-5xl rounded-2xl border border-neutral-200 bg-white p-2 sm:p-3 shadow-md overflow-hidden"
          >
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-neutral-100">
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=80"
                alt="Modern fine dining restaurant interior and service"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

              {/* Tablet POS Overlay Mockup Card */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-md rounded-xl border border-white/20 bg-white/95 backdrop-blur-md p-4 sm:p-5 shadow-xl text-left">
                <div className="flex items-center justify-between border-b border-neutral-200 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
                      Table 12 • Mains in Progress
                    </span>
                  </div>
                  <span className="rounded-md bg-neutral-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
                    4 Guests
                  </span>
                </div>

                <div className="mt-3 space-y-1.5 text-xs text-slate-700">
                  <div className="flex justify-between font-medium">
                    <span>2x Pan-Seared Chilean Sea Bass</span>
                    <span className="text-slate-900 font-bold">₹2,800</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>1x Truffle Wild Mushroom Risotto</span>
                    <span className="text-slate-900 font-bold">₹950</span>
                  </div>
                  <div className="flex justify-between font-medium text-slate-500 text-[11px]">
                    <span>• Modifiers: Extra Shaved Black Truffle</span>
                    <span>Kitchen Line 1</span>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-neutral-200 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Captain: Vikramaditya</span>
                  <span className="font-bold text-emerald-600">KOT Routed • 0.2s</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          2. THE 4 PILLARS — HOW OUR SOFTWARE DIRECTLY IMPROVES FINE DINING
      ────────────────────────────────────────────────────────── */}
      <section id="pillars" className="py-24 sm:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-2xl text-center mb-20 sm:mb-24">
            <span className="text-xs font-bold tracking-widest text-slate-500 uppercase">
              The 4 Pillars of Operational Excellence
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#0f172a] sm:text-5xl">
              Software engineered for fine dining perfection.
            </h2>
            <p className="mt-4 text-base text-[#475569]">
              Solving core hospitality pain points across the front-of-house, kitchen line, guest reservations, and
              revenue growth.
            </p>
          </div>

          <div className="space-y-24 sm:space-y-32">
            {/* Pillar 1 */}
            <motion.div {...fadeAnim} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-6 space-y-5 text-left">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                  <Zap size={13} />
                  35% Faster Table Turnover
                </div>

                <h3 className="text-2xl font-bold tracking-tight text-[#0f172a] sm:text-3xl lg:text-4xl">
                  Pillar 1: Smart POS — Zero Delays at the Table & Front Counter
                </h3>

                <div className="space-y-3 text-sm sm:text-base leading-relaxed text-[#475569]">
                  <div className="rounded-xl bg-[#f8fafc] border border-neutral-200/80 p-4">
                    <strong className="text-[#0f172a] block font-semibold mb-1">The Problem Solved:</strong>
                    Eliminates long bill processing delays and messy payment splits during peak rush hours, freeing
                    servers to focus on attentive guest care.
                  </div>
                  <div>
                    <strong className="text-[#0f172a] block font-semibold mb-1">How It Works:</strong>
                    Table-side wireless captain ordering, 1-tap KOT transfer to kitchen and bar printers, seamless
                    item-wise or seat-wise split billing, and instant contactless card and UPI tap payments.
                  </div>
                </div>

                <ul className="pt-2 space-y-2.5 text-sm font-medium text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600" />
                    <span>Seat-by-seat bill splitting with dual currency and split tender support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600" />
                    <span>Instant EDC card machine push — zero manual amount re-entry</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600" />
                    <span>100% offline continuity — never halt service during Wi-Fi drops</span>
                  </li>
                </ul>
              </div>

              <div className="lg:col-span-6">
                <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-[#f8fafc] p-2 sm:p-3 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.01]">
                  <img
                    src="https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=1200&q=80"
                    alt="Fast table-side POS payment"
                    className="aspect-[4/3] w-full rounded-xl object-cover"
                  />
                </div>
              </div>
            </motion.div>

            {/* Pillar 2 (Alternating visual left) */}
            <motion.div {...fadeAnim} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-6 order-2 lg:order-1">
                <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-[#f8fafc] p-2 sm:p-3 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.01]">
                  <img
                    src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1200&q=80"
                    alt="Chefs in professional kitchen using KDS"
                    className="aspect-[4/3] w-full rounded-xl object-cover"
                  />
                </div>
              </div>

              <div className="lg:col-span-6 order-1 lg:order-2 space-y-5 text-left">
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                  <ChefHat size={13} />
                  Zero KOT Lost &amp; Controlled Food Shrinkage
                </div>

                <h3 className="text-2xl font-bold tracking-tight text-[#0f172a] sm:text-3xl lg:text-4xl">
                  Pillar 2: Complete Management System — Total Control Over Food Cost & Kitchen
                </h3>

                <div className="space-y-3 text-sm sm:text-base leading-relaxed text-[#475569]">
                  <div className="rounded-xl bg-[#f8fafc] border border-neutral-200/80 p-4">
                    <strong className="text-[#0f172a] block font-semibold mb-1">The Problem Solved:</strong>
                    Stops inventory pilferage, recipe inconsistencies, and communication breakdowns between front staff
                    and kitchen cooks.
                  </div>
                  <div>
                    <strong className="text-[#0f172a] block font-semibold mb-1">How It Works:</strong>
                    Live Kitchen Display System (KDS), automated ingredient deduction based on recipe yield, low-stock
                    alerts before items run out, and multi-station routing for starters, mains, and bar.
                  </div>
                </div>

                <ul className="pt-2 space-y-2.5 text-sm font-medium text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600" />
                    <span>Real-time gram-level inventory depletion on every KOT punch</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600" />
                    <span>Prep timing warnings and bump-bar course sequencing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600" />
                    <span>Wastage log tracking and daily variance audit reports</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Pillar 3 */}
            <motion.div {...fadeAnim} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-6 space-y-5 text-left">
                <div className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-xs font-bold text-purple-700">
                  <Globe size={13} />
                  100% Commission-Free Direct Bookings
                </div>

                <h3 className="text-2xl font-bold tracking-tight text-[#0f172a] sm:text-3xl lg:text-4xl">
                  Pillar 3: Custom Website & Reservation Engine — Own Your Guests, Zero Commissions
                </h3>

                <div className="space-y-3 text-sm sm:text-base leading-relaxed text-[#475569]">
                  <div className="rounded-xl bg-[#f8fafc] border border-neutral-200/80 p-4">
                    <strong className="text-[#0f172a] block font-semibold mb-1">The Problem Solved:</strong>
                    Reduces dependence on expensive third-party booking aggregators and high commission cuts, letting
                    you keep 100% of guest revenue.
                  </div>
                  <div>
                    <strong className="text-[#0f172a] block font-semibold mb-1">How It Works:</strong>
                    A bespoke, fast-loading restaurant website with 24/7 direct table reservations, interactive digital
                    wine and food menus, and guest dietary preference capture.
                  </div>
                </div>

                <ul className="pt-2 space-y-2.5 text-sm font-medium text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600" />
                    <span>Zero per-cover commissions; retain full guest contact records</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600" />
                    <span>Interactive visual menus with wine pairing notes and food photography</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600" />
                    <span>Private dining room and corporate banquet lead capture forms</span>
                  </li>
                </ul>
              </div>

              <div className="lg:col-span-6">
                <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-[#f8fafc] p-2 sm:p-3 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.01]">
                  <img
                    src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80"
                    alt="Fine dining presentation and direct digital menu"
                    className="aspect-[4/3] w-full rounded-xl object-cover"
                  />
                </div>
              </div>
            </motion.div>

            {/* Pillar 4 (Alternating visual left) */}
            <motion.div {...fadeAnim} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-6 order-2 lg:order-1">
                <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-[#f8fafc] p-2 sm:p-3 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.01]">
                  <img
                    src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80"
                    alt="Busy restaurant dining room with happy guests"
                    className="aspect-[4/3] w-full rounded-xl object-cover"
                  />
                </div>
              </div>

              <div className="lg:col-span-6 order-1 lg:order-2 space-y-5 text-left">
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-bold text-amber-800">
                  <TrendingUp size={13} />
                  Consistent Weekday Footfall Boost
                </div>

                <h3 className="text-2xl font-bold tracking-tight text-[#0f172a] sm:text-3xl lg:text-4xl">
                  Pillar 4: Targeted Digital Marketing & Ads — Fill Tables on Slow Days
                </h3>

                <div className="space-y-3 text-sm sm:text-base leading-relaxed text-[#475569]">
                  <div className="rounded-xl bg-[#f8fafc] border border-neutral-200/80 p-4">
                    <strong className="text-[#0f172a] block font-semibold mb-1">The Problem Solved:</strong>
                    Fixes the frustrating gap between empty weekday tables and chaotic weekend rushes with predictable
                    guest acquisition.
                  </div>
                  <div>
                    <strong className="text-[#0f172a] block font-semibold mb-1">How It Works:</strong>
                    Hyper-local geo-targeted Meta and Google ad funnels, automated WhatsApp and SMS campaigns for
                    birthdays, anniversaries, and VIP dining privileges.
                  </div>
                </div>

                <ul className="pt-2 space-y-2.5 text-sm font-medium text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600" />
                    <span>Geo-fenced Meta reels reaching high-spending diners within 7 km</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600" />
                    <span>Google Maps rank optimization for &quot;best fine dining near me&quot;</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600" />
                    <span>Automated WhatsApp CRM triggered on customer milestones and visits</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          3. INTERACTIVE FEATURE MATRIX / GRID (Minimalist Cards)
      ────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#f8fafc] border-y border-neutral-200/80">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <span className="text-xs font-bold tracking-widest text-slate-500 uppercase">
              Built for Front &amp; Back of House
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#0f172a] sm:text-4xl">
              Feature matrix for high-performing dining rooms
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#475569]">
              Every tool and workflow designed to maintain rhythm, elegance, and accountability.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: LayoutDashboard,
                title: 'Interactive Floor & Table Plan',
                desc: 'Visual real-time table statuses (Occupied, Reserved, Billed, Vacant) with drag-and-drop table joins and section captain assignments.',
              },
              {
                icon: Smartphone,
                title: 'Captain App for Waitstaff',
                desc: 'Handheld mobility for taking orders right beside guests with modifier choices, seat-tagging, and instant wireless print triggers.',
              },
              {
                icon: Monitor,
                title: 'Multi-Station KDS',
                desc: 'Distinct station views for hot kitchen, cold pantry, and bar dispatch with color-coded ticket timers and audible bump alerts.',
              },
              {
                icon: ChefHat,
                title: 'Recipe Costing & Central Purchasing',
                desc: 'Track raw material expenses down to each gram/portion, automate reorder alerts, and monitor vendor price fluctuations.',
              },
              {
                icon: Lock,
                title: 'Dynamic Staff Permissions',
                desc: 'Role-based access control for cashiers, floor captains, and managers to protect discounts, bill edits, and voided tickets.',
              },
              {
                icon: Layers,
                title: 'Multi-Outlet Master Sync',
                desc: 'Real-time revenue, tax, and inventory consolidation across branches with central menu updates pushed in seconds.',
              },
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  {...fadeAnim}
                  transition={{ duration: 0.4, delay: idx * 0.06 }}
                  className="rounded-xl border border-neutral-200 bg-white p-6 sm:p-7 shadow-xs transition-all duration-300 hover:border-neutral-400 hover:shadow-lg hover:scale-[1.02] text-left flex flex-col justify-between"
                >
                  <div>
                    <div className="inline-flex rounded-lg bg-neutral-100 p-3 text-slate-900 mb-5">
                      <Icon size={22} />
                    </div>
                    <h4 className="text-lg font-bold text-[#0f172a]">{feature.title}</h4>
                    <p className="mt-2.5 text-sm leading-relaxed text-[#475569]">{feature.desc}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center text-xs font-semibold text-slate-800">
                    <span>Explore workflow</span>
                    <ChevronRight size={14} className="ml-1" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          4. METRICS THAT MATTER (Minimalist Numbers Strip)
      ────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white border-b border-neutral-200/80">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-12">
            <motion.div {...fadeAnim} className="border-l-2 border-neutral-300 pl-5 text-left">
              <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#0f172a]">+30%</div>
              <div className="mt-2 text-sm font-bold text-slate-900">+30% Faster Table Turn Rate</div>
              <p className="mt-1 text-xs text-[#475569]">Eliminating billing queues and handoff friction.</p>
            </motion.div>

            <motion.div {...fadeAnim} className="border-l-2 border-neutral-300 pl-5 text-left">
              <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#0f172a]">0%</div>
              <div className="mt-2 text-sm font-bold text-slate-900">0% Aggregator Commissions on Direct Bookings</div>
              <p className="mt-1 text-xs text-[#475569]">On direct website and reservation bookings.</p>
            </motion.div>

            <motion.div {...fadeAnim} className="border-l-2 border-neutral-300 pl-5 text-left">
              <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#0f172a]">100%</div>
              <div className="mt-2 text-sm font-bold text-slate-900">100% Real-time Recipe & Inventory Sync</div>
              <p className="mt-1 text-xs text-[#475569]">Automatic gram-level deduction per plate.</p>
            </motion.div>

            <motion.div {...fadeAnim} className="border-l-2 border-neutral-300 pl-5 text-left">
              <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#0f172a]">99.9%</div>
              <div className="mt-2 text-sm font-bold text-slate-900">99.9% Offline-Ready Billing Uptime</div>
              <p className="mt-1 text-xs text-[#475569]">Never drop a transaction during network cuts.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          5. BOTTOM CONVERSION SECTION
      ────────────────────────────────────────────────────────── */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-5xl px-6 sm:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-slate-950 px-8 py-16 text-center text-white sm:px-14">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Ready to Upgrade Your Restaurant Operations?
            </h2>
            <p className="mt-4 max-w-xl mx-auto text-base text-slate-400">
              Elevate guest dining experiences, streamline dynamic floor plans, empower staff with instant handheld KOTs, and eliminate table wait times with Priyulabs Digital.
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
                href="https://wa.me/917849074050?text=Hello%20Priyulabs!%20I%20run%20a%20restaurant%20and%20want%20to%20see%20a%20live%20POS%20demo."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-transparent px-7 py-3.5 text-sm font-bold text-white transition hover:bg-slate-850 hover:border-slate-600"
              >
                <MessageCircle size={18} />
                Chat with a Restaurant Specialist
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          INTERACTIVE DEMO MODAL
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
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Priyulabs Hospitality</span>
                <h3 className="text-xl font-extrabold text-[#0f172a]">Book a Live 1-on-1 Walkthrough</h3>
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
                  Restaurant / Lounge Name
                </label>
                <input
                  type="text"
                  name="restaurantName"
                  required
                  placeholder="e.g. Saffron Table &amp; Wine Bar"
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
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Total Tables</label>
                  <select
                    name="tables"
                    className="mt-1 w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-slate-900 focus:outline-none"
                  >
                    <option value="10-25">10 – 25 Tables</option>
                    <option value="25-50">25 – 50 Tables</option>
                    <option value="50+">50+ Tables (Multi-Floor)</option>
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
                  placeholder="e.g. Mumbai, Bengaluru, Delhi NCR"
                  className="mt-1 w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder-neutral-400 focus:border-slate-900 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="mt-2 w-full rounded-xl bg-[#0f172a] py-3.5 text-sm font-bold text-white shadow-sm hover:bg-slate-800 transition cursor-pointer"
              >
                Confirm &amp; Schedule Walkthrough →
              </button>
            </form>

            {submitted && (
              <div className="mt-4 rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-800 text-center font-medium">
                ✅ Opening WhatsApp with your walkthrough details...
              </div>
            )}
          </motion.div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────
          VIDEO MODAL
      ────────────────────────────────────────────────────────── */}
      {videoModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setVideoModalOpen(false);
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="w-full max-w-3xl rounded-2xl border border-neutral-200 bg-black p-2 shadow-2xl overflow-hidden relative"
          >
            <button
              onClick={() => setVideoModalOpen(false)}
              className="absolute top-4 right-4 z-10 rounded-full bg-black/60 p-2 text-white hover:bg-black cursor-pointer"
            >
              ✕
            </button>
            <video
              src="/assets/pos-checkout.mp4"
              controls
              autoPlay
              className="aspect-[16/9] w-full rounded-xl object-cover"
            />
          </motion.div>
        </div>
      )}
    </div>
  );
}
