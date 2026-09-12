import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  Watch,
  ShieldCheck,
  RotateCcw,
  Boxes,
  Store,
  CreditCard,
  ArrowRight,
  Zap,
  Tag,
  Layers,
  Printer,
  QrCode,
  X,
  Smartphone,
  Calendar,
  Award,
  Monitor,
  Wrench,
  CheckCircle2,
  Sparkles,
  Search,
  Sliders,
  History,
  Activity
} from 'lucide-react';

const pillarsData = [
  {
    id: 'pillar-pos',
    num: '01',
    badge: 'Sub-Second Serial Barcode',
    metric: 'Sub-Second Serial Barcode Lookup & Auto Brand Warranty',
    image: '/assets/watch_pos_scan.jpg',
    alt: 'High precision 2D barcode scanner scanning watch box serial tag and warranty card at luxury counter',
    title: 'Smart POS — Case Serial Barcode Scanning & Instant Warranty Invoicing',
    points: [
      {
        icon: QrCode,
        text: 'Individual Caseback & Movement Serial Tagging: Scan the unique serial number once at checkout to auto-bind watch model, caliber number, and manufacturer warranty.',
      },
      {
        icon: ShieldCheck,
        text: 'Integrated Paperless Digital Warranty: Direct WhatsApp dispatch of official e-warranty card, international service center directory, and purchase authenticity proof.',
      },
      {
        icon: CreditCard,
        text: 'Split-Tender & VIP High-Ticket Processing: Seamless split payments across luxury credit cards, UPI, and store loyalty credits with zero billing lag.',
      },
      {
        icon: Sparkles,
        text: 'Instant Complimentary Service Add-Ons: Add free ultrasonic bracelet cleaning, strap fitting, or engraving directly to the sales invoice in 1 tap.',
      },
    ],
  },
  {
    id: 'pillar-inventory',
    num: '02',
    badge: 'Piece-by-Piece Traceability',
    metric: '100% Traceability per Piece with Zero Stock Leakage',
    image: '/assets/watchmaker_movement.jpg',
    alt: 'Master watchmaker inspecting luxury automatic mechanical movement with loupe and precision diagnostic tools',
    title: 'Complete Management System — Individual Serial Stock & Pre-Owned Trade-In',
    points: [
      {
        icon: Boxes,
        text: 'Piece-by-Piece Serial Number Inventory: Track every single luxury timepiece from consignment to master safe and showroom vitrine with zero discrepancies.',
      },
      {
        icon: Wrench,
        text: 'Master Watchmaker Service Desk: Track in-house movement servicing, overhaul parts, water-resistance testing, and demagnetization with live repair status stages.',
      },
      {
        icon: RotateCcw,
        text: 'Certified Pre-Owned (CPO) & Trade-In Desk: Instant intake valuation, condition grading (Mint, Excellent, Good), authentication paperwork, and refurbishment tracking.',
      },
      {
        icon: ShieldCheck,
        text: 'Vault-to-Vitrine Daily Tray Audits: Lightning-fast opening and closing stock count across display counters and safe vaults via 2D micro-barcode scanners.',
      },
    ],
  },
  {
    id: 'pillar-storefront',
    num: '03',
    badge: 'Private VIP Previews',
    metric: 'Zero-Commission Collector Reservations & Vault Previews',
    image: '/assets/watch_digital_salon.jpg',
    alt: 'VIP luxury horology private consultation lounge with digital salon catalog tablet',
    title: 'Custom Website & Digital Salon — VIP Viewing & Reservation Desk',
    points: [
      {
        icon: Store,
        text: 'High-Definition Horology Catalog: Show interactive multi-angle timepieces, dial specifications, movement calibers, and high-res macro complication zoom.',
      },
      {
        icon: Calendar,
        text: '"Reserve for Private Salon Viewing": Enable collectors to book an in-store private viewing or request bespoke timepieces directly through your branded website.',
      },
      {
        icon: Smartphone,
        text: 'WhatsApp Private Clienteling: One-tap concierge chats allowing horologists to send video tours of rare pieces and accept deposit reserves instantly.',
      },
      {
        icon: Award,
        text: 'Zero Third-Party Marketplace Fees: Keep 100% of your retail margins without paying marketplace commissions on luxury sales.',
      },
    ],
  },
  {
    id: 'pillar-loyalty',
    num: '04',
    badge: 'Collector Retention & Drops',
    metric: '3.8x Repeat Servicing & Limited-Drop Conversion',
    image: '/assets/watch_service_crm.jpg',
    alt: 'Watch repair testing chamber, custom straps, and automated digital WhatsApp service dispatch',
    title: 'Digital Marketing & Customer Retention — Service Reminders & Collector Drops',
    points: [
      {
        icon: History,
        text: 'Automated 2-Year Mechanical Service Reminders: Trigger scheduled WhatsApp alerts for movement lubrication, gasket overhaul, and pressure checkups.',
      },
      {
        icon: Zap,
        text: 'Limited-Edition Drop Announcements: Broadcast VIP launch previews for scarce horology releases exclusively to qualified collector tiers.',
      },
      {
        icon: Tag,
        text: 'Personalized Milestone & Anniversary Campaigns: Re-engage clients on birthdays and gift anniversaries with tailored curated timepieces and strap perks.',
      },
      {
        icon: Award,
        text: 'Automated Review & Authenticity Verification Sharing: Encourage verified collectors to leave 5-star Google reviews with instant one-tap links.',
      },
    ],
  },
];

const hardwareStack = [
  {
    icon: QrCode,
    title: 'High-Density 2D Barcode Scanners',
    desc: 'Rapid reading of micro-barcodes on small watch hangtags, caseback stickers, and warranty cards (Zebra, Honeywell, Datalogic).',
  },
  {
    icon: Monitor,
    title: 'Touch POS Terminals & Dual Displays',
    desc: 'Sleek, responsive counter terminals with customer-facing screens showing serial number verification and e-receipts.',
  },
  {
    icon: Printer,
    title: 'Fine Watch Dumbell & Label Printers',
    desc: 'Ultra-crisp thermal transfer printers for heat-resistant, scratch-proof watch hangtags and serial labels (TSC, Zebra, Citizen).',
  },
  {
    icon: CreditCard,
    title: 'Thermal & A4 Invoice Printers',
    desc: 'Dual receipt capabilities: instant 3-inch thermal checkout slips and comprehensive GST tax invoices on elegant A4 stationery.',
  },
];

const specializedFeatures = [
  {
    icon: Watch,
    title: 'Multi-Brand Luxury Boutiques',
    desc: 'Centralized serial catalog for Swiss, Japanese, and German horology brands with brand-specific warranty terms.',
  },
  {
    icon: Award,
    title: 'Horology Salons & Authorized Dealers',
    desc: 'Strict serial compliance, authorized dealer portal synchronization, and private consultation room billing.',
  },
  {
    icon: History,
    title: 'Certified Pre-Owned (CPO) & Vintage',
    desc: 'Comprehensive intake grading, provenance documentation, serial history verification, and buyback valuation.',
  },
  {
    icon: Activity,
    title: 'Smartwatch & Wearable Tech Outlets',
    desc: 'Manage IMEI and Bluetooth MAC addresses, quick accessory upsells (charging docks, bands), and tech warranties.',
  },
  {
    icon: Wrench,
    title: 'Watch Repair & Master Service Centers',
    desc: 'Digital job card ticketing, spare part inventory (crowns, crystals, gaskets, batteries), and live repair SMS tracking.',
  },
  {
    icon: Sparkles,
    title: 'Fashion & Lifestyle Timepiece Stores',
    desc: 'High-volume seasonal collection launches, fast multi-pack billing, and rapid barcode label creation.',
  },
];

export function WatchStoresPage() {
  const [activePillar, setActivePillar] = useState(0);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [storeName, setStoreName] = useState('');
  const [phone, setPhone] = useState('');
  const [storeType, setStoreType] = useState('Multi-Brand Luxury Boutique');

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you! Our horology retail specialist will reach out on WhatsApp within 15 minutes.');
    setDemoModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-teal-600 selection:text-white">
      {/* 1. HERO SECTION */}
      <section className="mx-auto max-w-7xl px-5 pt-16 pb-14 sm:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50/80 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-teal-800 shadow-xs"
          >
            <span className="h-2 w-2 rounded-full bg-teal-600 animate-pulse" />
            LUXURY HOROLOGY, TIMEPIECES &amp; SMARTWATCH RETAIL
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-4xl font-black tracking-tight text-slate-950 sm:text-6xl max-w-4xl mx-auto leading-[1.08]"
          >
            Every Serial Number Logged. Certified Service Job Sheets.{' '}
            <span className="text-emerald-600">Zero Warranty Disputes.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 max-w-3xl mx-auto text-base text-slate-600 sm:text-lg leading-relaxed font-normal"
          >
            The purpose-built retail engine for multi-brand watch boutiques, luxury horology salons, and service centers — engineered for sub-second serial scanning, paperless digital job sheets, and brand warranty auto-registration.
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
              <Zap size={16} className="text-emerald-600" />
              See Watch Billing Speed
            </a>
          </motion.div>
        </div>

        {/* Hero Visual: 3-Panel Editorial Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-14"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left">
            {/* Panel 1 */}
            <div className="group relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm transition hover:shadow-md">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                <img
                  src="/assets/watch_showroom_display.jpg"
                  alt="Luxury automatic chronograph display case in upscale horology boutique"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-white">
                    <Watch size={13} className="text-teal-400" />
                    Boutique Vitrine
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-xs font-semibold text-teal-300 uppercase tracking-wider">Showcase Excellence</p>
                  <p className="text-sm font-bold mt-0.5 leading-snug">Luxury Mechanical Vitrine</p>
                </div>
              </div>
              <div className="p-4 bg-slate-50/70 border-t border-slate-100">
                <p className="text-xs text-slate-600 line-clamp-2">
                  Multi-brand luxury showcases with unique caseback serial tags and individual tray RFID tracking.
                </p
              </div>
            </div>

            {/* Panel 2 */}
            <div className="group relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm transition hover:shadow-md">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                <img
                  src="/assets/watch_customer_experience.jpg"
                  alt="Customer trying on luxury chronograph timepiece assisted by horologist wearing white gloves"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-white">
                    <ShieldCheck size={13} className="text-emerald-400" />
                    Private Consultation
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">Collector Experience</p>
                  <p className="text-sm font-bold mt-0.5 leading-snug">White-Glove VIP Fitting</p>
                </div>
              </div>
              <div className="p-4 bg-slate-50/70 border-t border-slate-100">
                <p className="text-xs text-slate-600 line-clamp-2">
                  Personalized wrist fitting, micro-adjustment clasp sizing, and collector clienteling ledger.
                </p>
              </div>
            </div>

            {/* Panel 3 */}
            <div className="group relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm transition hover:shadow-md">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                <img
                  src="/assets/watch_checkout_counter.jpg"
                  alt="Modern horology boutique billing counter with cashier scanning watch box serial tag"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600/90 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-white">
                    <Zap size={13} className="text-amber-300" />
                    Sub-Second Serial Scan
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">Fast Invoicing</p>
                  <p className="text-sm font-bold mt-0.5 leading-snug">Paperless Warranty Checkout</p>
                </div>
              </div>
              <div className="p-4 bg-slate-50/70 border-t border-slate-100">
                <p className="text-xs text-slate-600 line-clamp-2">
                  Instant serial validation against brand server, GST tax invoice, and paperless e-warranty via WhatsApp.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 2. THE 4 PILLARS */}
      <section id="pillars" className="bg-slate-50 py-20 border-y border-slate-200/80">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-teal-700">
              Complete Watch Operating System
            </h2>
            <p className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Everything Needed to Run a High-Precision Horology Business
            </p>
            <p className="mt-4 text-slate-600 text-base">
              Explore the four core pillars that make Priyulabs the choice of leading timepiece boutiques and certified horologists.
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
            {pillarsData.map((pillar, idx) => {
              const active = activePillar === idx;
              return (
                <button
                  key={pillar.id}
                  onClick={() => setActivePillar(idx)}
                  className={`flex items-center gap-2.5 rounded-xl px-5 py-3 text-xs sm:text-sm font-bold transition-all duration-200 ${
                    active
                      ? 'bg-slate-900 text-white shadow-md'
                      : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/80'
                  }`}
                >
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-black ${
                      active ? 'bg-teal-400 text-slate-950' : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {pillar.num}
                  </span>
                  <span>{pillar.badge}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content Display */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Image Showcase */}
            <div className="lg:col-span-6">
              <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
                <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  <img
                    src={pillarsData[activePillar].image}
                    alt={pillarsData[activePillar].alt}
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-slate-900/90 backdrop-blur-md p-4 text-white">
                  <p className="text-[11px] font-extrabold uppercase tracking-wider text-teal-400">
                    Pillar {pillarsData[activePillar].num} Highlight
                  </p>
                  <p className="text-sm font-bold mt-0.5">{pillarsData[activePillar].metric}</p>
                </div>
              </div>
            </div>

            {/* Right Feature Points */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="inline-block text-xs font-black uppercase tracking-widest text-teal-700 bg-teal-50 px-3 py-1 rounded-md border border-teal-200 mb-2">
                  Pillar {pillarsData[activePillar].num}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950">
                  {pillarsData[activePillar].title}
                </h3>
              </div>

              <div className="space-y-4 pt-2">
                {pillarsData[activePillar].points.map((pt, i) => {
                  const Icon = pt.icon;
                  return (
                    <div
                      key={i}
                      className="flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs transition hover:border-teal-200 hover:bg-teal-50/30"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-100/80 text-teal-800">
                        <Icon size={20} />
                      </div>
                      <p className="text-sm text-slate-700 leading-relaxed font-medium pt-1">
                        {pt.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HARDWARE COMPATIBILITY STACK */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-teal-700">
              Hardware Architecture
            </h2>
            <p className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Plug &amp; Play with Modern Horology Hardware
            </p>
            <p className="mt-4 text-slate-600 text-base">
              Zero complicated drivers or lock-ins. Works flawlessly with standard scanners, label printers, and touchscreen terminals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hardwareStack.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 transition hover:bg-white hover:shadow-md hover:border-teal-200"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100 text-teal-800 mb-5">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. SECTOR MATRIX */}
      <section className="py-20 bg-slate-50 border-t border-slate-200/80">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-teal-700">
              Specialized Formats
            </h2>
            <p className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Engineered for Every Timepiece Retail &amp; Service Format
            </p>
            <p className="mt-4 text-slate-600 text-base">
              From authorized luxury Swiss brand dealers to fast-moving smartwatch outlets and master watchmaker repair benches.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specializedFeatures.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs transition hover:shadow-md hover:border-teal-200"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-700 mb-4">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. CONVERSION BANNER */}
      <section id="cta" className="py-20 bg-[#0b1320] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#14b8a6_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="relative mx-auto max-w-5xl px-5 text-center">
          <span className="inline-block rounded-full bg-teal-500/20 border border-teal-500/30 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-teal-300 mb-4">
            Zero-Dispute Horology Operations
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Ready to Upgrade Your Watch Boutique to Priyulabs?
          </h2>
          <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Join premier watch boutiques, authorized dealers, and independent master horologists across the country. Get started in less than 48 hours.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => setDemoModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-teal-500 px-8 py-4 text-sm font-bold text-slate-950 shadow-lg shadow-teal-500/20 transition hover:bg-teal-400 hover:-translate-y-0.5"
            >
              Book a 1-on-1 Horology Demo
              <ArrowRight size={16} />
            </button>
            <a
              href="https://wa.me/919999999999?text=Hello%20Priyulabs%2C%20I%20want%20a%20demo%20of%20Watch%20Retail%20OS"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-8 py-4 text-sm font-bold text-white transition hover:bg-slate-700"
            >
              <Smartphone size={16} className="text-emerald-400" />
              Chat on WhatsApp
            </a>
          </div>
          <p className="mt-4 text-xs text-slate-400">
            No credit card required • Complete master catalog migration support included
          </p>
        </div>
      </section>

      {/* DEMO MODAL */}
      {demoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xl">
            <button
              type="button"
              onClick={() => setDemoModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="h-10 w-10 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-700">
                <Watch size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-950">
                  Experience Watch Billing Speed
                </h3>
                <p className="text-xs text-slate-500">
                  Simulate individual serial scan &amp; paperless warranty generation
                </p>
              </div>
            </div>

            {/* Simulated Live Ticket Card */}
            <div className="rounded-2xl border border-teal-100 bg-teal-50/50 p-4 mb-6 text-xs text-slate-700 space-y-2 font-mono">
              <div className="flex justify-between border-b border-teal-200/60 pb-1.5 font-bold text-slate-900">
                <span>ITEM / SERIAL NUMBER</span>
                <span>AMOUNT</span>
              </div>
              <div className="flex justify-between">
                <span>Tissot PRX Powermatic 80 (#TS-98421098)</span>
                <span className="font-bold">₹68,500</span>
              </div>
              <div className="flex justify-between">
                <span>Alligator Leather Strap 20mm (#STRAP-AL-20BL)</span>
                <span className="font-bold">₹3,200</span>
              </div>
              <div className="flex justify-between text-teal-800 font-semibold">
                <span>Ultrasonic Case Clean &amp; Waterproof Test</span>
                <span>COMPLIMENTARY</span>
              </div>
              <div className="flex justify-between border-t border-teal-200/60 pt-1.5 font-bold text-slate-950 text-sm">
                <span>Total (GST 18% Included)</span>
                <span className="text-teal-900">₹71,700</span>
              </div>
              <p className="text-[10px] text-teal-800 font-sans pt-1">
                ✓ Case serial validated against official brand database • Auto e-warranty dispatched to customer phone
              </p>
            </div>

            <form onSubmit={handleDemoSubmit} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Boutique or Service Center Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Chrono Luxe Salons"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none focus:ring-1 focus:ring-teal-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  WhatsApp Number
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none focus:ring-1 focus:ring-teal-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Retail Format
                </label>
                <select
                  value={storeType}
                  onChange={(e) => setStoreType(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none focus:ring-1 focus:ring-teal-600"
                >
                  <option value="Multi-Brand Luxury Boutique">Multi-Brand Luxury Boutique</option>
                  <option value="Horology Salon &amp; Authorized Dealer">Horology Salon &amp; Authorized Dealer</option>
                  <option value="Certified Pre-Owned &amp; Vintage">Certified Pre-Owned &amp; Vintage</option>
                  <option value="Smartwatch &amp; Wearable Tech Outlet">Smartwatch &amp; Wearable Tech Outlet</option>
                  <option value="Master Watchmaker &amp; Repair Center">Master Watchmaker &amp; Repair Center</option>
                  <option value="Lifestyle &amp; Fashion Watch Store">Lifestyle &amp; Fashion Watch Store</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-slate-950 py-3 text-xs font-bold text-white transition hover:bg-slate-800"
              >
                Schedule Watch Demo via WhatsApp
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
