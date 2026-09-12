import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  Scale,
  Sparkles,
  ShieldCheck,
  RotateCcw,
  Boxes,
  Store,
  CreditCard,
  CheckCircle2,
  ArrowRight,
  Zap,
  Tag,
  Layers,
  Printer,
  QrCode,
  X,
  Smartphone,
  Gem,
  Coins,
  Receipt,
  Calendar,
  Award,
  Monitor
} from 'lucide-react';

const pillarsData = [
  {
    id: 'pillar-pos',
    num: '01',
    badge: 'Milligram Precision',
    metric: '100% BIS Hallmarking & HUID Compliant',
    image: '/assets/jewellery_pos_scale.jpg',
    alt: 'Certified high-precision electronic scale weighing gold necklace at jewellery showroom counter',
    title: 'Smart POS — Milligram Precision, Dynamic Making Charges & HUID Invoicing',
    points: [
      {
        icon: Monitor,
        text: 'Dual-Display Live Trust Screen: Real-time sync showing exact milligram weight and price breakdown directly to the customer.',
      },
      {
        icon: RotateCcw,
        text: '10-Second Old Gold Exchange Slip: Instant transparent calculation for purity deduction and melting loss without disputes.',
      },
      {
        icon: Smartphone,
        text: '1-Tap WhatsApp Quotation & Digital Purity Card: Send instant estimates and design previews straight to customer phones.',
      },
      {
        icon: Boxes,
        text: 'Rapid Vault-to-Tray Counter Audits: Scan full display trays in seconds at open and close to eliminate stock pilferage.',
      },
    ],
  },
  {
    id: 'pillar-inventory',
    num: '02',
    badge: 'Vault & Artisan Ledger',
    metric: '60-Second Daily Vault Tray Reconciliation',
    image: '/assets/jewellery_vault_audit.jpg',
    alt: 'Jeweller auditing display trays and vaults with micro barcode scanner',
    title: 'Complete Management System — Tray-Level Audits & Karigar (Artisan) Ledger',
    points: [
      {
        icon: Boxes,
        text: 'Scan and audit entire display trays with high-density barcode/RFID scanners in under 60 seconds at opening and closing.',
      },
      {
        icon: Layers,
        text: 'Complete Karigar (goldsmith) ledger: track raw bullion gold issued, finished ornaments received, and allowable wastage (Ghat).',
      },
      {
        icon: RotateCcw,
        text: 'Old gold exchange calculator: record purity (Karatometer value), gross weight, melting loss deduction, and buyback valuation vouchers.',
      },
      {
        icon: ShieldCheck,
        text: 'Central multi-vault security and inter-branch insured stock transfer dispatches.',
      },
    ],
  },
  {
    id: 'pillar-storefront',
    num: '03',
    badge: 'Private VIP Previews',
    metric: 'Zero-Commission VIP Bridal Appointments',
    image: '/assets/jewellery_digital_catalog.jpg',
    alt: 'Bridal gold and diamond jewellery digital lookbook on tablet in boutique',
    title: 'Custom Website & Digital Lookbook — Private VIP Previews',
    points: [
      {
        icon: Store,
        text: 'High-definition online jewellery catalog with multi-angle zoom and purity certificates (BIS, IGI, GIA).',
      },
      {
        icon: Calendar,
        text: '"Book an In-Showroom VIP Appointment" feature to reserve bridal collections for private viewing.',
      },
      {
        icon: Smartphone,
        text: 'WhatsApp catalog integration allowing customers to request custom necklace weights or live video viewing.',
      },
      {
        icon: Gem,
        text: 'Direct digital gold gifting and festive gold voucher purchases.',
      },
    ],
  },
  {
    id: 'pillar-loyalty',
    num: '04',
    badge: 'Gold Schemes & Ads',
    metric: '4x Growth in Monthly Gold Scheme Enrollment',
    image: '/assets/jewellery_gold_scheme.jpg',
    alt: 'Gold coins and monthly gold savings passbook with festive accents',
    title: 'Digital Marketing & Customer Retention — Gold Schemes (Chit Funds) & Festive Ads',
    points: [
      {
        icon: Coins,
        text: 'Automated monthly installment collection and WhatsApp reminders for 11-Month Gold Savings Schemes (Swarna Yojana).',
      },
      {
        icon: Sparkles,
        text: 'Hyper-local Meta and Google ads targeting affluent shoppers for Dhanteras, Akshaya Tritiya, and wedding seasons.',
      },
      {
        icon: Tag,
        text: 'Automated anniversary and birthday reminder campaigns with personalized making-charge discount vouchers.',
      },
      {
        icon: Award,
        text: 'High-net-worth (HNI) customer loyalty points redeemable on diamond value additions and coin purchases.',
      },
    ],
  },
];

const hardwareStack = [
  {
    icon: Scale,
    title: 'Micro-Precision Carat Scales',
    desc: 'Certified 3-decimal (0.001g) digital gold scales with continuous live serial sync (Essae, Sartorius, Ohaus).',
  },
  {
    icon: Printer,
    title: 'Specialized Jewellery Tag Printers',
    desc: 'Ultra-fine thermal transfer printers for heat-resistant, tear-proof jewellery dumbell tags (Argox, TSC, Zebra).',
  },
  {
    icon: QrCode,
    title: 'High-Density 2D/RFID Scanners',
    desc: 'Fast reading of high-density micro-barcodes on tiny ring and earring tags (Honeywell, Zebra, Datalogic).',
  },
  {
    icon: CreditCard,
    title: 'Touch POS & Customer Displays',
    desc: 'Sleek, premium all-in-one counter terminals with dual screens showing real-time weight to the customer.',
  },
];

const specializedFeatures = [
  {
    icon: Coins,
    title: 'Daily Live Metal Rate Master',
    desc: 'Update 24K, 22K, 18K gold and silver rates once, auto-refreshing prices across all tags and screens.',
  },
  {
    icon: Gem,
    title: 'Stone & Diamond Attribute Engine',
    desc: 'Detailed tracking of stone weight, cut, color, clarity, certificate number, and separate stone valuations.',
  },
  {
    icon: Layers,
    title: 'Karigar & Raw Bullion Accounts',
    desc: 'Manage gold issue, wastage percentage, making charges payable, and worker balance ledgers.',
  },
  {
    icon: RotateCcw,
    title: 'Old Gold Exchange & Melting Slip',
    desc: 'Generate systematic exchange vouchers with Karat purity breakdown and customer identity proofs.',
  },
  {
    icon: Sparkles,
    title: 'Gold Scheme (Kitty) Management',
    desc: 'Manage customer recurring deposits, lucky draw rounds, installment passbooks, and maturity bonuses.',
  },
  {
    icon: Receipt,
    title: '1-Click 3% Jewellery GST Invoicing',
    desc: 'Auto-compute 3% gold GST, TCS over ₹2 Lakhs, and export HUID-matched tax returns effortlessly.',
  },
];

export function JewelleryShopsPage() {
  const [activePillar, setActivePillar] = useState(0);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [storeName, setStoreName] = useState('');
  const [phone, setPhone] = useState('');
  const [storeType, setStoreType] = useState('Gold & Diamond Showroom');

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you! Our jewellery retail specialist will reach out on WhatsApp within 15 minutes.');
    setDemoModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-amber-500 selection:text-white">
      {/* ══════════════════════════════════════════════════════════
          1. HERO SECTION (Jewellery Editorial & Simulated Mockup)
      ══════════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-5 pt-16 pb-14 sm:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50/80 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-amber-800 shadow-xs"
          >
            <span className="h-2 w-2 rounded-full bg-amber-600 animate-pulse" />
            JEWELLERY SHOWROOMS, BULLION &amp; GEM OUTLETS
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-4xl font-black tracking-tight text-slate-950 sm:text-6xl max-w-4xl mx-auto leading-[1.08]"
          >
            Live Metal Rates. 6-Digit HUID Tracking.{' '}
            <span className="text-amber-600">Zero Melting Errors.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 max-w-3xl mx-auto text-base text-slate-600 sm:text-lg leading-relaxed font-normal"
          >
            The specialized jewellery retail operating system built for gold merchants, diamond houses, and silver showrooms — engineered for milligram-precision weight billing, dynamic making charges, and BIS hallmark compliance.
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
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-7 py-3.5 text-sm font-bold text-slate-800 transition hover:bg-slate-50 no-underline cursor-pointer shadow-xs"
            >
              <Zap size={16} className="text-amber-600" />
              See Jewellery Billing Speed
            </a>
          </motion.div>

          {/* Square-Style 3-Panel Hero Triptych (Product | Customer | Counter) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-14 overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200 bg-slate-950 shadow-2xl grid grid-cols-1 md:grid-cols-3 h-auto md:h-[480px] lg:h-[500px]"
          >
            {/* Panel 1: The Product */}
            <div
              onClick={() => setDemoModalOpen(true)}
              className="group relative h-[320px] md:h-full overflow-hidden border-b-2 md:border-b-0 md:border-r-2 border-white cursor-pointer"
            >
              <img
                src="/assets/jewellery_showroom_display.jpg"
                alt="Luxury gold and diamond necklace, jhumkas, and rings displayed in illuminated jewellery showroom glass vitrine"
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
                src="/assets/jewellery_customer_experience.jpg"
                alt="Indian customer trying on handcrafted gold necklace in showroom mirror with attentive jewellery consultant"
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
                src="/assets/jewellery_checkout_counter.jpg"
                alt="Indian jewellery showroom billing and cashier counter with staff in formal attire attending to customers, operating billing computers and POS terminals"
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
            <span className="inline-block rounded-full bg-amber-50 border border-amber-200 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-800">
              The 4 Pillars of Modern Jewellery Retail
            </span>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl text-slate-950">
              Engineered for Gold Merchants, Diamond Houses &amp; Silver Showrooms
            </h2>
            <p className="mt-4 text-base text-slate-600 sm:text-lg">
              Milligram-precision carat scales, automatic gross-to-net weight calculation, Karigar wastage accounting, and 100% BIS hallmarking compliance.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Sticky Media Showcase */}
            <div className="lg:col-span-6 lg:sticky lg:top-28">
              <div className="relative aspect-4/3 overflow-hidden rounded-3xl border border-slate-200 bg-slate-900 shadow-2xl">
                <img
                  src={pillarsData[activePillar].image}
                  alt={pillarsData[activePillar].alt}
                  className="h-full w-full object-cover transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/20" />

                {/* Top Badge */}
                <div className="absolute top-5 left-5 rounded-full bg-slate-900/80 backdrop-blur-md px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white border border-white/20">
                  PILLAR {pillarsData[activePillar].num} • {pillarsData[activePillar].badge}
                </div>

                {/* Bottom Metric Pill */}
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
                  <div className="rounded-xl bg-white/95 backdrop-blur-md px-4 py-2 text-xs font-extrabold text-slate-900 shadow-lg border-l-4 border-amber-600">
                    {pillarsData[activePillar].metric}
                  </div>
                </div>
              </div>

              {/* 4-Tab Quick Switcher */}
              <div className="mt-4 grid grid-cols-4 gap-2">
                {pillarsData.map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => setActivePillar(idx)}
                    className={'rounded-xl py-2.5 px-2 text-xs font-bold transition ' + (
                      activePillar === idx
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    )}
                  >
                    {idx === 0 && '01 Smart POS'}
                    {idx === 1 && '02 Bullion & Stock'}
                    {idx === 2 && '03 Digital Lookbook'}
                    {idx === 3 && '04 Scheme & Ads'}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Scrollable Content */}
            <div className="lg:col-span-6 space-y-20 py-4">
              {pillarsData.map((pillar, idx) => (
                <motion.div
                  key={pillar.id}
                  onViewportEnter={() => setActivePillar(idx)}
                  viewport={{ margin: '-40% 0px -40% 0px' }}
                  className="space-y-6"
                >
                  <div>
                    <span className="text-xs font-extrabold uppercase tracking-widest text-amber-700">
                      Pillar {pillar.num}
                    </span>
                    <h3 className="mt-1 text-2xl sm:text-3xl font-black text-slate-950 tracking-tight leading-snug">
                      {pillar.title}
                    </h3>
                    <div className="mt-3 h-1 w-12 rounded-full bg-amber-600" />
                  </div>

                  <div className="space-y-4">
                    {pillar.points.map((pt, pIdx) => {
                      const IconComp = pt.icon;
                      return (
                        <div key={pIdx} className="flex items-start gap-3 text-sm text-slate-700 leading-relaxed">
                          <IconComp className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                          <span>{pt.text}</span>
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
          3. HARDWARE INTEGRATION BAR (4-Column Layout)
      ══════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-slate-50 border-b border-slate-200" id="hardware">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block rounded-full bg-amber-100 border border-amber-200 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-800">
              Certified Hardware Stack
            </span>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl text-slate-950">
              Plug-and-Play Showroom Equipment
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Seamless serial, USB, and Ethernet integration with leading certified weighing instruments and micro-tag barcode printers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {hardwareStack.map((hw, i) => {
              const IconComp = hw.icon;
              return (
                <div
                  key={i}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:shadow-md transition hover:-translate-y-1"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-700 mb-5">
                    <IconComp size={24} />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">{hw.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{hw.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          4. SECTOR MATRIX (6 Clean Cards)
      ══════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-white border-b border-slate-200" id="features">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block rounded-full bg-amber-50 border border-amber-200 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-800">
              Specialized Capabilities
            </span>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl text-slate-950">
              Built for Gold Bullion &amp; Jewellery Outlets
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Every workflow fine-tuned for high-value gold and diamond retailing across single boutiques and multi-branch networks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specializedFeatures.map((feat, i) => {
              const IconComp = feat.icon;
              return (
                <div
                  key={i}
                  className="rounded-2xl border border-slate-200 bg-white p-7 shadow-xs hover:shadow-md transition hover:-translate-y-1 hover:border-amber-200"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-700 mb-6">
                    <IconComp size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">{feat.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          5. BOTTOM CONVERSION BANNER
      ══════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white" id="contact">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-slate-950 px-8 py-16 text-center text-white shadow-2xl sm:px-16">
            <div className="relative z-10 max-w-3xl mx-auto">
              <span className="inline-block rounded-full bg-amber-900/50 border border-amber-600/40 px-4 py-1 text-xs font-bold uppercase tracking-wider text-amber-300 mb-6">
                Experience Priyulabs Jewellery OS
              </span>
              <h2 className="text-3xl font-black tracking-tight sm:text-5xl leading-tight">
                Ready to run your jewellery showroom with milligram precision?
              </h2>
              <p className="mt-4 text-base text-slate-300 sm:text-lg">
                Powering traditional family jewellers, modern diamond boutiques, and multi-store gold chains across India.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={() => setDemoModalOpen(true)}
                  className="rounded-xl bg-amber-600 px-8 py-4 text-sm font-bold text-white shadow-lg transition hover:bg-amber-500 hover:-translate-y-0.5"
                >
                  Schedule a 15-Minute Jewellery Demo →
                </button>
                <a
                  href="https://wa.me/919999999999?text=Hello%20Priyulabs%20Team%2C%20I%20want%20a%20demo%20for%20Jewellery%20POS"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-slate-700 bg-slate-900 px-8 py-4 text-sm font-bold text-white transition hover:bg-slate-800"
                >
                  Chat with a Jewellery Retail Specialist
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Modal */}
      {demoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
            <button
              onClick={() => setDemoModalOpen(false)}
              className="absolute top-5 right-5 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            >
              <X size={18} />
            </button>

            <h3 className="text-xl font-black text-slate-950">See Jewellery Billing in Action</h3>
            <p className="mt-1 text-xs text-slate-600">
              Experience real-time scale sync, HUID barcode generation, and live bullion rate computation.
            </p>

            <form onSubmit={handleDemoSubmit} className="mt-6 space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Showroom / Business Name</label>
                <input
                  type="text"
                  required
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  placeholder="e.g. Navratna Jewellers"
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-amber-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp / Phone Number</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +91 98765 43210"
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-amber-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Showroom Category</label>
                <select
                  value={storeType}
                  onChange={(e) => setStoreType(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-amber-600 focus:outline-none"
                >
                  <option>Gold &amp; Diamond Showroom</option>
                  <option>Traditional Gold Bullion Merchant</option>
                  <option>Multi-Store Jewellery Chain</option>
                  <option>Silver &amp; Custom Artisan Studio</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full mt-2 rounded-xl bg-amber-600 py-3 text-sm font-bold text-white shadow-sm hover:bg-amber-500 transition"
              >
                Request Live Showroom Walkthrough
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
