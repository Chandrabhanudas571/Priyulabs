import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Zap,
  Cake,
  Flame,
  Scale,
  Sparkles,
  Truck,
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

export function BakeriesSweetShopsPage() {
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-amber-500 selection:text-white">
      {/* ══════════════════════════════════════════════════════════
          1. HERO SECTION (Artisan Bakery & Patisserie Editorial)
      ══════════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-6 pt-16 pb-12 sm:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50/80 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-amber-700 shadow-sm"
        >
          <span className="h-2 w-2 rounded-full bg-amber-500" />
          ARTISAN BAKERIES, PATISSERIES &amp; CAKE STUDIOS
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-6 text-4xl font-black tracking-tight text-slate-900 sm:text-6xl max-w-4xl mx-auto leading-[1.1]"
        >
          Fresh Ovens. Split-Second Billing.{' '}
          <span className="text-amber-600">Zero Batch Spoilage.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 max-w-2xl mx-auto text-lg text-slate-600 leading-relaxed font-normal"
        >
          From morning sourdough drops and rapid pastry counter queues to bespoke multi-tier celebration cakes and ingredient recipe costing — an all-in-one operating platform engineered for modern artisan bakeries.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="/#cta"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-7 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-slate-800 hover:-translate-y-0.5"
          >
            Get Started Today
            <ArrowRight size={16} />
          </a>
          <button
            onClick={() => setVideoModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-7 py-3.5 text-sm font-bold text-slate-900 shadow-sm transition hover:border-slate-400 hover:bg-slate-50"
          >
            <Play size={16} className="text-slate-900 fill-slate-900" />
            View Bakery OS Demo
          </button>
        </motion.div>

        {/* Hero Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-14 overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-2xl"
        >
          <img
            src="/assets/bakery_hero.jpg"
            alt="Artisan bakery counter with fresh croissants, sourdough breads, tarts and modern touch POS register"
            className="h-[340px] sm:h-[520px] w-full object-cover transition-transform duration-700 hover:scale-[1.015]"
          />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          2. THE 4 PILLARS — HOW OUR SOFTWARE POWERS MODERN BAKERIES
      ══════════════════════════════════════════════════════════ */}
      <section className="border-t border-b border-slate-100 bg-white py-24" id="pillars">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 space-y-24">

          {/* Pillar 1: High-Speed Counter Billing */}
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div {...fadeAnim} className="space-y-5">
              <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-amber-600">
                <span>PILLAR 01</span> • <span>SPEED &amp; CHECKOUT</span>
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                High-Speed Counter Billing &amp; Quick-Touch Modifiers
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                Morning pastry rushes cannot afford clunky multi-step screens. Priyulabs gives cashiers instant 1-tap grid buttons for hot baguettes, croissants, morning buns, and coffee pairings with sub-second contactless tap-to-pay.
              </p>
              <ul className="space-y-3 pt-2">
                {[
                  'Sub-0.8s checkout with visual bakery grid & dual-screen customer facing display.',
                  '1-tap modifier options for warming, slicing, custom box packaging, and beverage add-ons.',
                  'Automatic tare & scale sync for artisanal loaves sold by variable weight.',
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
                src="/assets/bakery_scale_pos.jpg"
                alt="Modern dual-screen touch POS register with pastry checkout"
                className="h-[380px] w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </motion.div>
          </div>

          {/* Pillar 2: Custom Cake Booking */}
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div {...fadeAnim} className="order-2 lg:order-1 overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-lg">
              <img
                src="/assets/bakery_cake_chef.jpg"
                alt="Artisan baker checking fresh batch inventory and pastry showcase"
                className="h-[380px] w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </motion.div>

            <motion.div {...fadeAnim} className="order-1 lg:order-2 space-y-5">
              <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-rose-600">
                <span>PILLAR 02</span> • <span>CAKE STUDIO &amp; ADVANCE ORDERS</span>
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Custom Cake Booking, Deposits &amp; Kitchen Dispatch
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                Never misplace a birthday message or custom cake delivery date again. Capture reference sketches, tier sizes, sponge flavors, fillings, and advance deposits directly on the POS with automated kitchen KDS tokens.
              </p>
              <ul className="space-y-3 pt-2">
                {[
                  'Attach customer reference photos and piping inscriptions to the digital production ticket.',
                  'Automated advance deposit collection with balance reminder notifications via WhatsApp.',
                  'Live cake decorator KDS timeline sorted by promised delivery and pickup hour.',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm font-semibold text-slate-700">
                    <CheckCircle2 size={18} className="mt-0.5 text-emerald-600 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Pillar 3: Deck Oven Schedules & Recipe Costing */}
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div {...fadeAnim} className="space-y-5">
              <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-emerald-600">
                <span>PILLAR 03</span> • <span>PRODUCTION &amp; FRESHNESS</span>
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Deck Oven Batch Schedules &amp; Ingredient Margin Costing
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                Bake exact batch quantities based on historical weekday demand. Automatically deduct organic flour, French butter, yeast, and premium chocolate from stock while monitoring real-time food cost per loaf.
              </p>
              <ul className="space-y-3 pt-2">
                {[
                  'Automated deck oven bake schedules for 6:00 AM, 11:30 AM, and 4:00 PM hot drops.',
                  'Gram-level recipe explosion deducting butter, eggs, vanilla, and flours upon production entry.',
                  'Automated end-of-day markdown pricing to sell remaining day-bakes with zero waste.',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm font-semibold text-slate-700">
                    <CheckCircle2 size={18} className="mt-0.5 text-emerald-600 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div {...fadeAnim} className="rounded-3xl border border-slate-200 bg-slate-50 p-6 space-y-4 shadow-lg">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600">
                    LIVE OVEN PRODUCTION SCHEDULE
                  </span>
                  <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-700">
                    Batch #B-104
                  </span>
                </div>
                <div className="mt-2 text-base font-extrabold text-slate-900">
                  Artisan Sourdough Country Loaves (36 Units)
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Fermentation complete • Proofed 14 hrs • Deck Oven #2 @ 245°C
                </div>
                <div className="mt-3 flex justify-between border-t border-slate-100 pt-3 text-xs font-semibold text-slate-600">
                  <span>Organic T65 Flour: 18.2 kg</span>
                  <span>Hydration: 78%</span>
                  <span className="text-emerald-600">Food Cost: ₹42 / loaf</span>
                </div>
              </div>

              <div className="rounded-2xl border-l-4 border-amber-500 border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-900">Pain au Chocolat &amp; Almond Croissants</span>
                  <span className="text-xs font-bold text-amber-600">Baking: 12 min left</span>
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  48 pieces scheduled for 11:30 AM warm counter display
                </div>
              </div>
            </motion.div>
          </div>

          {/* Pillar 4: Central Bakehouse & B2B Wholesale */}
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div {...fadeAnim} className="order-2 lg:order-1 rounded-3xl border border-slate-200 bg-slate-50 p-6 space-y-4 shadow-lg">
              <div className="rounded-2xl border-l-4 border-indigo-500 border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-600">
                    B2B WHOLESALE MANIFEST
                  </span>
                  <span className="text-xs font-bold text-slate-500">Route: Downtown Morning</span>
                </div>
                <div className="mt-2 text-base font-extrabold text-slate-900">
                  Blue Tokai &amp; Roastery Coffee Dispatch
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  45 Butter Croissants • 20 Sourdough Batards • 30 Danish Pastries
                </div>
                <div className="mt-3 flex justify-between border-t border-slate-100 pt-3 text-xs font-bold text-emerald-600">
                  <span>Status: Packed &amp; Dispatched (06:15 AM)</span>
                  <span>E-Invoice: #INV-9204</span>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-slate-900">Retail Outlet Transfer #4 (Mall Kiosk)</div>
                  <div className="text-xs text-slate-500">Tray count: 8 chilled pastry crates</div>
                </div>
                <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-bold text-slate-600">
                  Transit Synced
                </span>
              </div>
            </motion.div>

            <motion.div {...fadeAnim} className="order-1 lg:order-2 space-y-5">
              <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-indigo-600">
                <span>PILLAR 04</span> • <span>SCALE &amp; B2B WHOLESALE</span>
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Central Commissary &amp; Wholesale Cafe Distribution
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                Supply local specialty cafes, fine hotels, and retail outlets from your central bakehouse. Generate automated wholesale delivery challans, GST e-invoices, and packing slips per route with one click.
              </p>
              <ul className="space-y-3 pt-2">
                {[
                  'Standing recurring B2B orders for daily morning delivery to partner coffee shops.',
                  'Consolidated bulk production sheet aggregating orders across all retail counters & wholesale accounts.',
                  'Integrated driver dispatch manifest and digital signature proof-of-delivery.',
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
          3. 6 MINIMALIST WHITE FEATURE CARDS
      ══════════════════════════════════════════════════════════ */}
      <section className="bg-slate-50/70 py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block rounded-full bg-slate-200 px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-widest text-slate-800">
              BAKERY OS SUITE
            </span>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              Engineered for Every Aspect of Bakery Operations
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Eliminate pen-and-paper booking books, guesswork dough prep, and counter congestion with purpose-built tools.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Zap,
                title: '1-Tap Fast-Counter POS',
                desc: 'Visual item photo matrix, fast combo bundling for coffee + pastry, barcode scanner sync, and instant UPI soundbox/card terminal handshaking.',
                tag: 'Under 0.8s Checkout',
              },
              {
                icon: Cake,
                title: 'Custom Cake KDS & Deposits',
                desc: 'Dedicated pastry chef production board with customer reference photos, piping text, sponge flavor, delivery time slot, and deposit tracking.',
                tag: 'Zero Order Mistakes',
              },
              {
                icon: Flame,
                title: 'Oven Timers & Batch Yields',
                desc: 'Track daily dough batches from bulk fermentation to oven exit. Real-time yield tracking calculates exact finished units vs. raw dough weight.',
                tag: 'Deck & Convection Sync',
              },
              {
                icon: Scale,
                title: 'Ingredient Margin Costing',
                desc: 'Dynamic cost-per-gram calculation for butter, Belgian chocolate, flour, and eggs. Automatically update unit cost when supplier commodity prices fluctuate.',
                tag: 'Live Gross Margin %',
              },
              {
                icon: Sparkles,
                title: 'Freshness & Markdown Pricing',
                desc: 'Print automated shelf-life expiration labels with barcode and batch date. Trigger scheduled "Happy Hour" discounts on fresh bakes after 7:00 PM.',
                tag: '-35% Daily Waste',
              },
              {
                icon: Truck,
                title: 'Wholesale B2B & Multi-Outlet',
                desc: 'Central commissary supply management, automated standing orders for cafes and bistros, consolidated packing lists, and GST B2B e-invoicing.',
                tag: 'Automated Route Manifest',
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
          4. METRICS STRIP
      ══════════════════════════════════════════════════════════ */}
      <section className="border-t border-b border-slate-100 bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 text-center">
            <div>
              <div className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900">0.8s</div>
              <div className="mt-2 text-xs sm:text-sm font-semibold text-slate-500">
                Avg Counter Checkout Speed
              </div>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900">100%</div>
              <div className="mt-2 text-xs sm:text-sm font-semibold text-slate-500">
                Custom Cake Order Accuracy
              </div>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900">99.8%</div>
              <div className="mt-2 text-xs sm:text-sm font-semibold text-slate-500">
                On-Time Morning Bake Dispatch
              </div>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900">-35%</div>
              <div className="mt-2 text-xs sm:text-sm font-semibold text-slate-500">
                End-of-Day Batch Spoilage
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          5. BOTTOM CONVERSION BANNER
      ══════════════════════════════════════════════════════════ */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-5xl px-6 sm:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-slate-950 px-8 py-16 text-center text-white sm:px-14">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Ready to Upgrade Your Bakery Operations?
            </h2>
            <p className="mt-4 max-w-xl mx-auto text-base text-slate-400">
              Join hundreds of artisan bakeries, sourdough workshops, and boutique patisseries using Priyulabs Digital to increase checkout throughput, eliminate cake order errors, and maximize daily gross margins.
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
                href="https://wa.me/917849074050?text=Hello%20Priyulabs!%20I%20run%20a%20bakery%20and%20want%20to%20see%20a%20live%20POS%20demo."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-transparent px-7 py-3.5 text-sm font-bold text-white transition hover:bg-slate-850 hover:border-slate-600"
              >
                <MessageCircle size={18} />
                Chat with a Bakery Specialist
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Video Demo Modal */}
      {videoModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm"
          onClick={() => setVideoModalOpen(false)}
        >
          <div
            className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-black shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setVideoModalOpen(false)}
              className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white transition hover:bg-white/40"
            >
              <X size={20} />
            </button>
            <div className="aspect-video w-full">
              <video
                controls
                autoPlay
                className="h-full w-full object-cover"
                poster="/assets/bakery_hero.jpg"
              >
                <source src="/assets/bakery-demo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
