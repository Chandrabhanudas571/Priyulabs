import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CreditCard,
  Clock,
  Beer,
  Monitor,
  QrCode,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Play,
  X,
  MessageCircle,
} from 'lucide-react';

const fadeAnim = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.4 },
};

export function BarsPubsBreweriesPage() {

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-amber-500 selection:text-white">
      {/* ══════════════════════════════════════════════════════════
          1. HERO SECTION (Bars, Pubs & Breweries Editorial)
      ══════════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-6 pt-16 pb-12 sm:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50/80 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-amber-700 shadow-sm"
        >
          <span className="h-2 w-2 rounded-full bg-amber-600" />
          BARS, PUBS, COCKTAIL LOUNGES &amp; CRAFT BREWERIES
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-6 text-4xl font-black tracking-tight text-slate-900 sm:text-6xl max-w-4xl mx-auto leading-[1.1]"
        >
          Pour Fast. Open Tabs.{' '}
          <span className="text-amber-600">Zero Unaccounted Spills.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 max-w-2xl mx-auto text-lg text-slate-600 leading-relaxed font-normal"
        >
          From lightning-fast bar tab management and keg yield tracking to automated happy hours and table-side checks — an all-in-one operating platform engineered for high-volume nightlife and craft beverage venues.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <a href="/#free-trial"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-7 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-slate-800 hover:-translate-y-0.5"
          >
            Get Started Today
            <ArrowRight size={16} />
          </a>
          <a
            href="#pillars"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-7 py-3.5 text-sm font-bold text-slate-900 shadow-sm transition hover:border-slate-400 hover:bg-slate-50 no-underline cursor-pointer"
          >
            Explore Bar OS Features ↓
          </a>
        </motion.div>

          {/* 4 Core Solutions Sub-Strip */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-10 mx-auto max-w-4xl flex flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-2xl border border-neutral-200/70 bg-white/80 backdrop-blur-sm px-6 py-3 text-xs md:text-[13px] font-medium text-neutral-600 shadow-xs dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300"
          >
            <span>Tap-Level Keg & Nip Dispense POS</span>
            <span className="text-neutral-300 dark:text-slate-600 select-none">✦</span>
            <span>Excise Bottle Ledger & Stock Control</span>
            <span className="text-neutral-300 dark:text-slate-600 select-none">✦</span>
            <span>Events & Guest-List VIP Portal</span>
            <span className="text-neutral-300 dark:text-slate-600 select-none">✦</span>
            <span>Nightlife Weekend Target Campaigns</span>
          </motion.div>

        {/* Hero Visual with Active Bar POS Interface Overlay */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="relative mt-14 overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-2xl"
        >
          <img
            src="/assets/bar_hero.jpg"
            alt="Modern lively craft brewery bar counter with draft beer taps"
            className="h-[340px] sm:h-[520px] w-full object-cover transition-transform duration-700 hover:scale-[1.015]"
          />

          <div className="hidden sm:block absolute bottom-6 right-6 max-w-sm rounded-2xl border border-slate-200/80 bg-white/95 p-5 text-left shadow-2xl backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span className="text-xs font-black uppercase tracking-wider text-slate-900">
                  Tab #42 • High-Top 8
                </span>
              </div>
              <span className="rounded-md bg-amber-50 px-2 py-0.5 text-[11px] font-bold text-amber-700">
                Pre-Auth Active
              </span>
            </div>
            <div className="mt-3 space-y-1.5 text-xs text-slate-600 font-medium">
              <div className="flex justify-between">
                <span>4x Hazy IPA Draft (Pints)</span>
                <strong className="text-slate-900">₹1,800</strong>
              </div>
              <div className="flex justify-between">
                <span>2x Smoked Old Fashioned</span>
                <strong className="text-slate-900">₹1,400</strong>
              </div>
              <div className="flex justify-between">
                <span>1x Truffle Fries &amp; Bar Nachos</span>
                <strong className="text-slate-900">₹650</strong>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2.5 text-[11px]">
              <span className="text-slate-500 font-medium">Bartender: Marcus</span>
              <span className="font-bold text-emerald-600">Sub-3s Punch • KOT Dispensed</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          2. THE 4 PILLARS — HOW OUR SOFTWARE DIRECTLY ELEVATES BAR & PUB OPERATIONS
      ══════════════════════════════════════════════════════════ */}
      <section className="border-t border-b border-slate-100 bg-white py-24" id="pillars">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 space-y-24">

          {/* Pillar 1: Smart POS */}
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div {...fadeAnim} className="space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-amber-700">
                Sub-3-Second Bar Order Ticketing
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Smart POS — Open Tabs, Fast Swipes &amp; Split-Second Rush
              </h2>
              <div className="rounded-xl border-l-4 border-slate-300 bg-slate-50 p-4 text-sm text-slate-700">
                <strong className="text-slate-900">The Problem Solved:</strong> Bar counter bottlenecks, forgotten running tabs, and chaotic delays when splitting large party bills late at night.
              </div>
              <p className="text-base text-slate-600 leading-relaxed">
                <strong>How It Works:</strong> 1-tap open tab pre-authorization, quick-reorder shortcuts for popular drafts and cocktails, instant bill splitting by seat or item, and contactless tap-to-pay at crowded standing bars.
              </p>
              <ul className="space-y-3 pt-2">
                {[
                  '1-tap card pre-authorization keeps running tabs secure with zero walk-out loss.',
                  '"Another Round" quick-fire button reorders drinks in a single tap without re-entering modifiers.',
                  'Seat-wise or equal multi-way bill splitting handled in under 5 seconds.',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm font-semibold text-slate-700">
                    <CheckCircle2 size={18} className="mt-0.5 text-emerald-600 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div {...fadeAnim} className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-lg">
              <img
                src="/assets/bar_pos_tabs.jpg"
                alt="Bartender operating modern touchscreen POS behind glowing craft cocktail bar counter"
                className="h-[380px] w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </motion.div>
          </div>

          {/* Pillar 2: Complete Management System */}
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div {...fadeAnim} className="order-2 lg:order-1 overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-lg">
              <img
                src="/assets/bar_draft_tap.jpg"
                alt="Draft craft beer pouring from taps into cold pint glasses"
                className="h-[380px] w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </motion.div>

            <motion.div {...fadeAnim} className="order-1 lg:order-2 space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-emerald-700">
                Up to 18% Savings on Liquor Variance
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Complete Management System — Keg Yields &amp; Liquor Stock
              </h2>
              <div className="rounded-xl border-l-4 border-slate-300 bg-slate-50 p-4 text-sm text-slate-700">
                <strong className="text-slate-900">The Problem Solved:</strong> Over-pouring, unregistered free drinks, and keg foaming leading to heavy liquor inventory shrinkages and lost margins.
              </div>
              <p className="text-base text-slate-600 leading-relaxed">
                <strong>How It Works:</strong> Real-time pour depletion by standard pour sizes (30ml, 60ml, pints, pitchers). Live draft keg volume tracking comparing dispensed liters against billed revenue, with instant low-keg change alerts.
              </p>
              <ul className="space-y-3 pt-2">
                {[
                  'Ounce and peg-level depletion automatically synchronized with every drink ring.',
                  'Keg flow meter integration compares actual dispensed beer against billed pints.',
                  'Instant mobile alerts when premium spirits or high-demand kegs drop below 15% capacity.',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm font-semibold text-slate-700">
                    <CheckCircle2 size={18} className="mt-0.5 text-emerald-600 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Pillar 3: Custom Website & VIP Event Ticketing */}
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div {...fadeAnim} className="space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-indigo-700">
                Zero Commission on Direct VIP Bookings
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Custom Website &amp; VIP Event Ticketing — Direct Guest Bookings
              </h2>
              <div className="rounded-xl border-l-4 border-slate-300 bg-slate-50 p-4 text-sm text-slate-700">
                <strong className="text-slate-900">The Problem Solved:</strong> Underbooked private lounge booths, missed weekend table reservations, and 3rd-party event aggregators taking steep 15-20% cuts.
              </div>
              <p className="text-base text-slate-600 leading-relaxed">
                <strong>How It Works:</strong> Branded responsive web portal for VIP table/booth reservations, live event ticket sales (DJ nights, tap takeovers, trivia nights), and bottle service minimum-spend pre-authorizations.
              </p>
              <ul className="space-y-3 pt-2">
                {[
                  'Interactive floor plan booking for premium booths, rooftop tables, and VIP lounges.',
                  'Direct ticketing with QR gate-pass check-in for ticketed events, live bands, and tastings.',
                  'Automated minimum-spend bottle service deposit collection credited directly to the bar tab.',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm font-semibold text-slate-700">
                    <CheckCircle2 size={18} className="mt-0.5 text-emerald-600 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div {...fadeAnim} className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-lg">
              <img
                src="/assets/bar_cocktail_mixologist.jpg"
                alt="Artisan craft cocktails and VIP table setup in modern lounge"
                className="h-[380px] w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </motion.div>
          </div>

          {/* Pillar 4: Targeted Digital Marketing & Ads */}
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div {...fadeAnim} className="order-2 lg:order-1 overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-lg">
              <img
                src="/assets/bar_keg_inventory.jpg"
                alt="Crowd of friends socializing and toasting craft beer at lively gastro-pub"
                className="h-[380px] w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </motion.div>

            <motion.div {...fadeAnim} className="order-1 lg:order-2 space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-amber-700">
                35% Lift in Weekday Taproom Footfall
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Targeted Digital Marketing &amp; Ads — Pack Weeknight Slumps
              </h2>
              <div className="rounded-xl border-l-4 border-slate-300 bg-slate-50 p-4 text-sm text-slate-700">
                <strong className="text-slate-900">The Problem Solved:</strong> Slow Tuesday-to-Thursday shifts, empty happy hours, and relying solely on unpredictable weekend walk-in crowds.
              </div>
              <p className="text-base text-slate-600 leading-relaxed">
                <strong>How It Works:</strong> Automated Happy Hour geo-fenced Instagram and Meta ad triggers targeting corporate offices within 3 km, plus automated WhatsApp notifications for live sports screenings and craft brew releases.
              </p>
              <ul className="space-y-3 pt-2">
                {[
                  'Automated geo-fenced Meta ads launch automatically 2 hours before Happy Hour starts.',
                  '1-click WhatsApp broadcasts for cricket & football match screenings and DJ nights.',
                  'Loyalty perks trigger automated free craft beer tokens for returning weekday regulars.',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm font-semibold text-slate-700">
                    <CheckCircle2 size={18} className="mt-0.5 text-emerald-600 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          3. NIGHTLIFE & TAPROOM FEATURE GRID (6 Minimalist White Cards)
      ══════════════════════════════════════════════════════════ */}
      <section className="bg-slate-50/70 py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block rounded-full bg-slate-200 px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-widest text-slate-800">
              NIGHTLIFE OS SUITE
            </span>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              Engineered for High-Pressure Bar Counters
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Eliminate lost drink rings, messy handwritten tabs, and liquor shrinkage with tools purpose-built for speed.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: CreditCard,
                title: 'Rapid Bar-Tab Manager',
                desc: 'Search open tabs by guest name, seat number, or card token with one tap. Pre-authorize cards to eliminate walk-out risk during peak rush hours.',
                tag: '1-Tap Pre-Auth & Split',
              },
              {
                icon: Clock,
                title: 'Automated Happy Hour Engine',
                desc: 'Schedule automated time-based pricing, BOGO deals, and beer-pitcher combos that switch on and off automatically without manual cashier intervention.',
                tag: 'Scheduled Dynamic Pricing',
              },
              {
                icon: Beer,
                title: 'Keg & Bottle Inventory Depletion',
                desc: 'Track liquor inventory down to milliliters, peg counts, and draft keg weight variances. Catch over-pouring and unauthorized comp pours instantly.',
                tag: 'Ounce-Level Accuracy',
              },
              {
                icon: Monitor,
                title: 'Bar Station Kitchen Display (KDS)',
                desc: 'Distinct display screens for dispense bartenders, service bars, and cocktail mixologists to balance preparation loads and eliminate paper ticket mess.',
                tag: 'Multi-Station Route Sync',
              },
              {
                icon: QrCode,
                title: 'Table QR Re-Ordering',
                desc: 'Allow seated guests to re-order another round of beers and bar bites straight from their phones without flagging down busy servers during peak hours.',
                tag: '+24% Average Spend',
              },
              {
                icon: TrendingUp,
                title: 'Live Pour & Revenue Analytics',
                desc: 'Monitor real-time gross pour costs, top-selling mixologists, fast-moving taps, and automated tip distributions across daytime and night shifts.',
                tag: 'Shift & Tip Reconciliations',
              },
            ].map((feat, idx) => {
              const IconComp = feat.icon;
              return (
                <motion.div
                  key={idx}
                  {...fadeAnim}
                  className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:border-slate-300 hover:shadow-md hover:-translate-y-0.5"
                >
                  <div>
                    <div className="mb-4 inline-flex rounded-xl bg-slate-100 p-3 text-slate-900 border border-slate-200">
                      <IconComp size={22} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">{feat.title}</h3>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">{feat.desc}</p>
                  </div>
                  <div className="mt-6">
                    <span className="inline-block rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                      {feat.tag}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          4. METRICS THAT MATTER STRIP
      ══════════════════════════════════════════════════════════ */}
      <section className="border-t border-b border-slate-100 bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 text-center">
            <div>
              <div className="text-4xl sm:text-5xl font-black tracking-tight text-amber-600">&lt; 3s</div>
              <div className="mt-2 text-xs sm:text-sm font-semibold text-slate-500">
                Average Drink Punch Time
              </div>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-black tracking-tight text-emerald-700">99.5%</div>
              <div className="mt-2 text-xs sm:text-sm font-semibold text-slate-500">
                Keg-to-Bill Inventory Accuracy
              </div>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-black tracking-tight text-indigo-600">0</div>
              <div className="mt-2 text-xs sm:text-sm font-semibold text-slate-500">
                Lost or Forgotten Running Tabs
              </div>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-black tracking-tight text-amber-600">35%+</div>
              <div className="mt-2 text-xs sm:text-sm font-semibold text-slate-500">
                Weekday Footfall Surge with Targeted Ads
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          5. BOTTOM CONVERSION BANNER
      ══════════════════════════════════════════════════════════ */}
            {/* ──────────────────────────────────────────────────────────
          WHITE EDITORIAL TRUST BOTTOM CTA
      ────────────────────────────────────────────────────────── */}
            {/* ──────────────────────────────────────────────────────────
          WHITE EDITORIAL TRUST BOTTOM CTA
      ────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-slate-50/60 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex justify-center">
          <div className="max-w-[1180px] w-full min-h-[500px] rounded-[28px] overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-center gap-10 p-8 md:p-14 bg-white border border-slate-200 shadow-sm relative dark:bg-slate-900 dark:border-slate-800">
            {/* Background Visual Layers */}
            <div
              className="absolute inset-0 bg-cover bg-right opacity-100 z-1"
              style={{ backgroundImage: `url('${'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1600&q=80'}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 lg:via-white/80 to-white/40 lg:to-transparent z-2 dark:from-slate-900 dark:via-slate-900/90 lg:dark:via-slate-900/80 dark:to-slate-900/40" />

            {/* Left Content Column */}
            <div className="lg:col-span-7 z-10 flex flex-col justify-center text-left">
              <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50/90 px-3.5 py-1 text-[11px] font-bold tracking-wider text-orange-800 uppercase w-max mb-4 dark:border-orange-900/40 dark:bg-orange-950/40 dark:text-orange-300">
                NIGHTLIFE & BEVERAGE DISPENSE OS
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-slate-900 tracking-tight leading-[1.18] dark:text-white">
                Stop Pour and Keg Liquor Leakage with <span className="text-orange-600">Real-Time Peg Tracking</span>
              </h2>
              <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl dark:text-slate-300">
                Maintain state excise-compliant bottle ledgers, auto-deplete alcohol per cocktail recipe, split checks instantly during peak floor rushes, and securely manage VIP bottle locker memberships with Priyulabs.
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
                  <svg width="15" height="15" fill="none" stroke="#ea580c" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Complete Setup
                </span>
                <span className="inline-flex items-center gap-2">
                  <svg width="15" height="15" fill="none" stroke="#ea580c" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Easy to access
                </span>
                <span className="inline-flex items-center gap-2">
                  <svg width="15" height="15" fill="none" stroke="#ea580c" strokeWidth="2.5" viewBox="0 0 24 24">
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
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
