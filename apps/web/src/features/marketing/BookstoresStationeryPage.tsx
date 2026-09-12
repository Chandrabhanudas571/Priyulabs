import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  BookOpen,
  BookMarked,
  GraduationCap,
  School,
  Library,
  Receipt,
  QrCode,
  Boxes,
  Store,
  CreditCard,
  ArrowRight,
  Zap,
  Tag,
  Layers,
  Printer,
  X,
  Smartphone,
  Calendar,
  Award,
  Monitor,
  CheckCircle2,
  Sparkles,
  History,
  RotateCcw,
  FileText,
  PackageCheck
} from 'lucide-react';

const pillarsData = [
  {
    id: 'pillar-pos',
    num: '01',
    badge: 'Lightning ISBN Lookups',
    metric: 'Sub-1.5s ISBN Checkout Speed',
    image: '/assets/bookstore_pos_isbn_scan.jpg',
    alt: 'Fast 2D barcode scanner scanning 13-digit ISBN barcode on book jacket at modern billing counter',
    title: 'Smart POS — Lightning ISBN Lookups & Mixed-GST Line Items',
    points: [
      {
        icon: QrCode,
        text: 'Scan standard 13-digit ISBN barcodes to instantly fetch book title, author, edition, and publisher automatically.',
      },
      {
        icon: Receipt,
        text: 'Seamlessly handle mixed invoices with 0% GST (tax-exempt printed books) and 12%/18% GST (stationery, art supplies, school bags) without tax errors.',
      },
      {
        icon: Zap,
        text: '1-click bundle selling: punch a predefined school syllabus code to bill 20+ books and notebooks in under 2 seconds.',
      },
      {
        icon: CheckCircle2,
        text: '100% offline-ready billing engine ensuring uninterrupted checkouts during school opening month crowds.',
      },
    ],
  },
  {
    id: 'pillar-inventory',
    num: '02',
    badge: 'Publisher Catalog & SOR',
    metric: '100% Publisher SOR & Return Accuracy',
    image: '/assets/bookstore_inventory_unboxing.jpg',
    alt: 'Bookstore staff unpacking publisher book cartons and sorting books onto categorized shelves',
    title: 'Complete Management System — Publisher Catalog & Loose Pack Breakdown',
    points: [
      {
        icon: Library,
        text: 'Automatic master catalog search across thousands of publishers (Penguin, HarperCollins, Oxford, NCERT).',
      },
      {
        icon: Boxes,
        text: 'Unbundle wholesale cartons (e.g., box of 50 gel pens) into individual retail units with auto-generated barcode stickers.',
      },
      {
        icon: RotateCcw,
        text: 'Supplier purchase orders with SOR (Sale-or-Return) tracking to return unsold copies to publishers effortlessly.',
      },
      {
        icon: Tag,
        text: 'Shelf-and-rack location tags to help floor staff locate any title in seconds.',
      },
    ],
  },
  {
    id: 'pillar-storefront',
    num: '03',
    badge: 'School Kit Storefront',
    metric: 'Direct Campus & Parent Pre-Booking',
    image: '/assets/bookstore_digital_catalog.jpg',
    alt: 'Organized tables of books and academic kits ready for student pickup in contemporary bookstore',
    title: 'Custom Website & School Kit Storefront — Neighborhood Pre-Orders',
    points: [
      {
        icon: Store,
        text: 'Branded online bookstore with search filters by Genre, Author, Exam/Board (CBSE, ICSE, State), and Class.',
      },
      {
        icon: School,
        text: 'Dedicated school kit ordering portal where parents enter their child\'s school and grade to buy pre-packed book bundles.',
      },
      {
        icon: Smartphone,
        text: 'WhatsApp catalog integration for customer book requests and out-of-print title sourcing alerts.',
      },
      {
        icon: PackageCheck,
        text: 'Click-and-collect in-store pickup to cut down counter lines during the academic term start.',
      },
    ],
  },
  {
    id: 'pillar-loyalty',
    num: '04',
    badge: 'Exam Cycles & Book Clubs',
    metric: '3.8x Repeat Stationery & Study Basket Spend',
    image: '/assets/bookstore_stationery_crm.jpg',
    alt: 'Colorful stationery items, notebooks, and artist pencils arranged neatly for student study and exam preparation',
    title: 'Digital Marketing & Customer Retention — Exam Cycles & Book Clubs',
    points: [
      {
        icon: Calendar,
        text: 'Automated WhatsApp alerts for board exam guides, competitive test series, and annual back-to-school book deliveries.',
      },
      {
        icon: Sparkles,
        text: 'Hyper-local Meta and Google ads targeting parents and college students within a 5 km radius during admission months.',
      },
      {
        icon: Award,
        text: 'Automated reading club loyalty perks rewarding frequent fiction readers with points on classic bestsellers.',
      },
      {
        icon: FileText,
        text: 'Bulk institutional quotation funnels for libraries, coaching centers, and corporate office stationery supplies.',
      },
    ],
  },
];

const hardwareStack = [
  {
    icon: QrCode,
    title: 'Omnidirectional & Handheld 2D Scanners',
    desc: 'Fast reading of reflective book jackets, plastic covers, and tiny pencil barcodes (Honeywell, Zebra, TVS).',
  },
  {
    icon: Monitor,
    title: 'Touch Terminals & Secondary Screens',
    desc: 'Dual-display billing counters giving students clear visibility of book titles and total discounts (Posiflex, Sunmi).',
  },
  {
    icon: Printer,
    title: 'Barcode & Price Sticker Printers',
    desc: 'High-speed thermal printers to label unbranded stationery, chart papers, and craft items (TVS, TSC, Zebra).',
  },
  {
    icon: Receipt,
    title: 'High-Speed Receipt & A4 Printers',
    desc: 'Fast 80mm thermal receipt printers and dual A4 laser printers for institutional school quotes (Epson, HP, NGX).',
  },
];

const specializedFeatures = [
  {
    icon: BookMarked,
    title: 'Global ISBN Auto-Metadata',
    desc: 'Scan any book barcode to automatically populate title, author, edition, and category details.',
  },
  {
    icon: GraduationCap,
    title: 'School Syllabus Kit Configurator',
    desc: 'Pre-assemble complete grade packages (books, exercise copies, covers) billed via a single code.',
  },
  {
    icon: Boxes,
    title: 'Loose-to-Pack Inventory Conversion',
    desc: 'Automatically deduct parent box quantities when selling loose individual pens or brushes.',
  },
  {
    icon: RotateCcw,
    title: 'Publisher SOR & Return Desk',
    desc: 'Track consignment books, credit notes, and return deadlines for non-selling titles.',
  },
  {
    icon: Receipt,
    title: 'Composite GST Invoicing',
    desc: 'Auto-split tax rates (0% GST books, 12% notebooks, 18% stationery) for fully compliant GSTR-1 filings.',
  },
  {
    icon: Library,
    title: 'Coaching & Library Corporate Ledger',
    desc: 'Issue formal B2B GST tax invoices, delivery challans, and credit ledgers for bulk institutional clients.',
  },
];

export function BookstoresStationeryPage() {
  const [activePillar, setActivePillar] = useState(0);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [storeName, setStoreName] = useState('');
  const [phone, setPhone] = useState('');
  const [storeType, setStoreType] = useState('Independent Bookshop & Stationery');

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you! Our bookstore & stationery retail specialist will reach out on WhatsApp within 15 minutes.');
    setDemoModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-emerald-600 selection:text-white">
      {/* 1. HERO SECTION */}
      <section className="mx-auto max-w-7xl px-5 pt-16 pb-14 sm:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/80 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-emerald-800 shadow-xs"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
            BOOKSTORES, ACADEMIC HUBS &amp; STATIONERY RETAIL
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-4xl font-black tracking-tight text-slate-950 sm:text-6xl max-w-4xl mx-auto leading-[1.08]"
          >
            Instant ISBN Scans. Dual-Tax GST Billing.{' '}
            <span className="text-emerald-600">Zero Academic Rush Delays.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 max-w-3xl mx-auto text-base text-slate-600 sm:text-lg leading-relaxed font-normal"
          >
            The modern retail operating system built for independent bookshops, campus stores, and mega stationery marts — engineered for 13-digit ISBN auto-fetching, 1-click school book-set bundling, and loose-item barcode breakdown.
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
              See Bookstore Billing Speed
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
                  src="/assets/bookstore_showroom_display.jpg"
                  alt="Modern bookstore interior with organized wooden bookshelves packed with books and bestsellers"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-white">
                    <BookOpen size={13} className="text-emerald-400" />
                    Literary Vitrine
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">Aisle &amp; Shelf Master</p>
                  <p className="text-sm font-bold mt-0.5 leading-snug">Organized Genre Shelves</p>
                </div>
              </div>
              <div className="p-4 bg-slate-50/70 border-t border-slate-100">
                <p className="text-xs text-slate-600 line-clamp-2">
                  Atomic Habits (ISBN: 978-1847941831), Classmate Spiral Notebooks, and Parker Vector pen sets.
                </p>
              </div>
            </div>

            {/* Panel 2 */}
            <div className="group relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm transition hover:shadow-md">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                <img
                  src="/assets/bookstore_customer_experience.jpg"
                  alt="Students and parents browsing educational syllabus kits in a vibrant campus bookstore"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-white">
                    <School size={13} className="text-teal-400" />
                    School Kit Portal
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-xs font-semibold text-teal-300 uppercase tracking-wider">Academic Kits</p>
                  <p className="text-sm font-bold mt-0.5 leading-snug">CBSE Class 10 Pre-Pack</p>
                </div>
              </div>
              <div className="p-4 bg-slate-50/70 border-t border-slate-100">
                <p className="text-xs text-slate-600 line-clamp-2">
                  14 Textbooks + 12 Notebooks + Geometry Box bundled and auto-deducted from Rack B-2 in 1 click.
                </p>
              </div>
            </div>

            {/* Panel 3 */}
            <div className="group relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm transition hover:shadow-md">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                <img
                  src="/assets/bookstore_checkout_counter.jpg"
                  alt="Fast book billing counter with cashier scanning book barcode and printing dual-tax invoice"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600/90 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-white">
                    <Zap size={13} className="text-amber-300" />
                    Dual-Tax Invoicing
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">Split GST Engine</p>
                  <p className="text-sm font-bold mt-0.5 leading-snug">0% Books + 18% Stationery</p>
                </div>
              </div>
              <div className="p-4 bg-slate-50/70 border-t border-slate-100">
                <p className="text-xs text-slate-600 line-clamp-2">
                  Total ₹3,240 (Exempt Books ₹1,850 + Taxable Stationery ₹1,390) with instant dynamic UPI QR scan.
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
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-emerald-700">
              Complete Bookstore Operating System
            </h2>
            <p className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Everything Needed for Campus Bookshops &amp; Mega Stationery Outlets
            </p>
            <p className="mt-4 text-slate-600 text-base">
              Explore the four core pillars that make Priyulabs the preferred choice for independent bookshops, school suppliers, and academic stationers.
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
                      active ? 'bg-emerald-400 text-slate-950' : 'bg-slate-200 text-slate-700'
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
                  <p className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-400">
                    Pillar {pillarsData[activePillar].num} Highlight
                  </p>
                  <p className="text-sm font-bold mt-0.5">{pillarsData[activePillar].metric}</p>
                </div>
              </div>
            </div>

            {/* Right Feature Points */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="inline-block text-xs font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200 mb-2">
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
                      className="flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs transition hover:border-emerald-200 hover:bg-emerald-50/30"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100/80 text-emerald-800">
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
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-emerald-700">
              Hardware Architecture
            </h2>
            <p className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Plug-and-Play Hardware Integration Bar
            </p>
            <p className="mt-4 text-slate-600 text-base">
              Engineered to withstand heavy footfalls during academic admission rushes with lightning-fast peripheral responses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hardwareStack.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 transition hover:bg-white hover:shadow-md hover:border-emerald-200"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800 mb-5">
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
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-emerald-700">
              Specialized Capabilities
            </h2>
            <p className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Tailored for Every Academic &amp; Commercial Bookstore Format
            </p>
            <p className="mt-4 text-slate-600 text-base">
              From school syllabus kits and ISBN registries to publisher SOR credit reconciliations and corporate bulk ledgers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specializedFeatures.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs transition hover:shadow-md hover:border-emerald-200"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 mb-4">
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
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="relative mx-auto max-w-5xl px-5 text-center">
          <span className="inline-block rounded-full bg-emerald-500/20 border border-emerald-500/30 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-300 mb-4">
            Zero Academic Rush Delays
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Ready to turn academic rush hours into smooth, profitable shifts?
          </h2>
          <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Powering independent bookstores, university outlets, and stationery superstores across India. Get started in less than 24 hours.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => setDemoModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-8 py-4 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-400 hover:-translate-y-0.5"
            >
              Schedule a 15-Minute Bookstore Demo →
              <ArrowRight size={16} />
            </button>
            <a
              href="https://wa.me/919999999999?text=Hello%20Priyulabs%2C%20I%20want%20to%20chat%20with%20a%20bookstore%20retail%20specialist"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-8 py-4 text-sm font-bold text-white transition hover:bg-slate-700"
            >
              <Smartphone size={16} className="text-emerald-400" />
              Chat with a Retail Specialist
            </a>
          </div>
          <p className="mt-4 text-xs text-slate-400">
            No credit card required • Complete master publisher ISBN catalog migration included
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
              <div className="h-10 w-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-700">
                <BookOpen size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-950">
                  Experience Bookstore Billing Speed
                </h3>
                <p className="text-xs text-slate-500">
                  Simulate 13-digit ISBN auto-lookup &amp; dual-tax GST splitting
                </p>
              </div>
            </div>

            {/* Simulated Live Ticket Card */}
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4 mb-6 text-xs text-slate-700 space-y-2 font-mono">
              <div className="flex justify-between border-b border-emerald-200/60 pb-1.5 font-bold text-slate-900">
                <span>ITEM / CODE / TAX</span>
                <span>AMOUNT</span>
              </div>
              <div className="flex justify-between">
                <span>Atomic Habits by James Clear (ISBN: 978-1847941831 | 0% GST)</span>
                <span className="font-bold">₹599</span>
              </div>
              <div className="flex justify-between">
                <span>Classmate Pulse Spiral Notebook 300p (12% GST)</span>
                <span className="font-bold">₹160</span>
              </div>
              <div className="flex justify-between">
                <span>Parker Vector Matte Black Pen (18% GST)</span>
                <span className="font-bold">₹450</span>
              </div>
              <div className="flex justify-between">
                <span>Class 10 CBSE Complete Kit (14 Books + 12 Notebooks)</span>
                <span className="font-bold">₹2,031</span>
              </div>
              <div className="flex justify-between border-t border-emerald-200/60 pt-1.5 text-[11px] text-emerald-900">
                <span>Exempt / 0% Tax (Books): ₹1,850 • Taxable (Stationery): ₹1,390</span>
              </div>
              <div className="flex justify-between border-t border-emerald-200/60 pt-1.5 font-bold text-slate-950 text-sm">
                <span>Total Payable (Dual-GST Calculated)</span>
                <span className="text-emerald-900">₹3,240</span>
              </div>
              <p className="text-[10px] text-emerald-800 font-sans pt-1">
                ✓ Auto-Print Itemized Dual-GST Tax Invoice • Dynamic UPI QR Ready • Auto-Deducted from Rack B-2
              </p>
            </div>

            <form onSubmit={handleDemoSubmit} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Bookstore or Stationery Outlet Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Oxford Book Gallery &amp; Stationery"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
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
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Retail Format
                </label>
                <select
                  value={storeType}
                  onChange={(e) => setStoreType(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                >
                  <option value="Independent Bookshop &amp; Stationery">Independent Bookshop &amp; Stationery</option>
                  <option value="School &amp; Academic Syllabus Supplier">School &amp; Academic Syllabus Supplier</option>
                  <option value="Mega Stationery &amp; Office Mart">Mega Stationery &amp; Office Mart</option>
                  <option value="University &amp; College Campus Store">University &amp; College Campus Store</option>
                  <option value="Artist &amp; Fine Stationery Boutique">Artist &amp; Fine Stationery Boutique</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-slate-950 py-3 text-xs font-bold text-white transition hover:bg-slate-800"
              >
                Schedule 15-Minute Demo via WhatsApp
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
