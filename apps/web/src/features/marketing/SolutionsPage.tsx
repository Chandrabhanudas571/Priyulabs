import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { Cpu, Monitor, Server, Code2 } from 'lucide-react';
import { sectorsList } from './sectorsData';
import { LeadSection } from './LeadSection';


// Modern Linear / Vercel style hardware & software upgrade mapping
const getSectorUpgrades = (sectorId: string, sectorTitle: string) => {
  const catalog: Record<string, Array<{ type: 'cpu' | 'monitor' | 'server' | 'code2'; category: string; title: string; desc: string; spec: string }>> = {
    pos: [
      {
        type: 'cpu',
        category: 'Hardware / Processing',
        title: 'Industrial Quad-Core POS Edge Unit',
        desc: 'Offline-first transaction processor with sub-second barcode, weighing scale, and cash drawer handshaking under 50ms.',
        spec: 'Zero-latency edge cache'
      },
      {
        type: 'monitor',
        category: 'Display / Workstation',
        title: 'Dual-Screen Customer Facing Display',
        desc: 'High-contrast 10.1" IPS screen showing itemized bills, promotional banners, and dynamic UPI QR payment push.',
        spec: '1080p anti-glare panel'
      },
      {
        type: 'server',
        category: 'Infrastructure / Cloud / Storage',
        title: 'High-Concurrency Cloud Database',
        desc: 'Real-time master stock synchronization across counters with automatic background conflict resolution.',
        spec: '99.99% uptime SLA'
      },
      {
        type: 'code2',
        category: 'Software / Engineering',
        title: 'Bi-Directional EDC & UPI Push API',
        desc: 'Automated webhook drivers linking Pine Labs and Paytm swipe terminals with instant GSTR-1 audit export.',
        spec: 'End-to-end encrypted API'
      }
    ],
    supermarket: [
      {
        type: 'cpu',
        category: 'Hardware / Processing',
        title: 'AI Optical Scanner & Scale Interface',
        desc: 'Direct RS232 scale sync with high-speed multi-line 2D barcode decoder for uninterrupted checkout queues.',
        spec: 'Sub-200ms scale sync'
      },
      {
        type: 'monitor',
        category: 'Display / Workstation',
        title: 'High-Throughput Cashier Workstation',
        desc: 'Touch-optimized wide console featuring rapid PLU matrix and split-view inventory lookup.',
        spec: 'Ergonomic cashier layout'
      },
      {
        type: 'server',
        category: 'Infrastructure / Cloud / Storage',
        title: 'Vision AI Wholesale Invoice OCR',
        desc: 'Instant photo parsing of distributor bills to auto-extract line items, batch codes, and MRP into database.',
        spec: 'Under 2s OCR extraction'
      },
      {
        type: 'code2',
        category: 'Software / Engineering',
        title: 'Expiry Shield & FEFO Dispatch Logic',
        desc: 'Automated First-Expiry-First-Out dispensing alerts and supplier return workflows 30 days prior to expiry.',
        spec: 'Zero dead-stock loss'
      }
    ],
    cafe: [
      {
        type: 'cpu',
        category: 'Hardware / Processing',
        title: 'Kitchen Routing & Thermal Controller',
        desc: 'Fail-safe hardware hub routing order tickets across kitchen prep stations and barista bar counters without packet loss.',
        spec: 'Zero-drop print queue'
      },
      {
        type: 'monitor',
        category: 'Display / Workstation',
        title: 'Interactive Self-Order Kiosk & KDS',
        desc: 'Anti-reflective chef display system with bump-bar inputs and sleek customer self-ordering stations.',
        spec: 'Heat & steam resistant'
      },
      {
        type: 'server',
        category: 'Infrastructure / Cloud / Storage',
        title: 'Recipe Ingredient ERP Ledger',
        desc: 'Automated fractional deduction of dairy, syrups, and roasted coffee beans for each beverage prepared.',
        spec: 'Gram-level precision'
      },
      {
        type: 'code2',
        category: 'Software / Engineering',
        title: 'Dynamic QR Menu & Table Engine',
        desc: 'Contactless digital ordering webhooks with live table occupancy tracking and split-bill payment routing.',
        spec: 'Instant payment webhooks'
      }
    ],
    bakery: [
      {
        type: 'cpu',
        category: 'Hardware / Processing',
        title: 'Precision Scale & Label Processor',
        desc: 'Auto-calibrated scale sync with instantaneous thermal label generation for loose sweets and pastries.',
        spec: 'Automatic tare deduction'
      },
      {
        type: 'monitor',
        category: 'Display / Workstation',
        title: 'Custom Cake Booking Station',
        desc: 'Dedicated workflow screen capturing custom cake reference photos, advance deposits, and delivery time slots.',
        spec: 'Multi-stage order tracker'
      },
      {
        type: 'server',
        category: 'Infrastructure / Cloud / Storage',
        title: 'Perishable Batch Inventory Vault',
        desc: 'Cloud ingredient tracking monitoring raw cream, butter, and flour batch shelf-lives in real time.',
        spec: 'Automated spoilage audit'
      },
      {
        type: 'code2',
        category: 'Software / Engineering',
        title: 'FSSAI Expiry & Barcode Pipeline',
        desc: 'Automated compliance generation of batch numbers, nutritional metrics, and packaging date labels.',
        spec: 'FSSAI compliant format'
      }
    ]
  };

  return (
    catalog[sectorId] ?? [
      {
        type: 'cpu',
        category: 'Hardware / Processing',
        title: 'Industrial POS Edge Controller',
        desc: `Hardened edge processing unit engineered for continuous barcode scanning, scale sync, and offline checkout for ${sectorTitle}.`,
        spec: 'High-concurrency edge'
      },
      {
        type: 'monitor',
        category: 'Display / Workstation',
        title: 'High-Contrast Operator Workstation',
        desc: 'Ergonomic wide-view touch terminal designed for rapid cashier input and real-time customer transparency.',
        spec: 'Low-glare touch console'
      },
      {
        type: 'server',
        category: 'Infrastructure / Cloud / Storage',
        title: 'Real-Time Cloud Inventory Ledger',
        desc: 'High-availability data pipeline maintaining real-time stock levels, purchase orders, and multi-location reconciliations.',
        spec: 'Continuous cloud sync'
      },
      {
        type: 'code2',
        category: 'Software / Engineering',
        title: 'Custom API & ERP Integrations',
        desc: 'Extensible webhook pipelines connecting EDC swipe machines, UPI soundboxes, and automated GST reporting.',
        spec: 'REST & Webhook drivers'
      }
    ]
  );
};

const fadeAnim = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.4 },
};

export function SolutionsPage() {
  const [params, setParams] = useSearchParams();
  const sectorKey = params.get('sector') ?? 'supermarket';
  const currentSector = sectorsList.find((s) => s.id === sectorKey) ?? sectorsList[0];

  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState<'all' | 'fnb' | 'retail' | 'beauty' | 'services'>(
    currentSector.category || 'all'
  );

  // Sync category tab and smooth scroll to content when sector param changes
  useEffect(() => {
    if (currentSector.category) {
      setActiveCategory(currentSector.category);
    }
    const elem = document.getElementById('sectorContentHero');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [sectorKey, location.key]);

  const filteredSectors =
    activeCategory === 'all'
      ? sectorsList
      : sectorsList.filter((s) => s.category === activeCategory);

  return (
    <div className="space-y-20 pb-20">
      <section className="bg-indigo-950 py-20 text-white">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <span className="text-xs font-bold tracking-widest text-indigo-300 uppercase">
            Industry Sector OS
          </span>
          <h1 className="mt-3 text-4xl font-black sm:text-5xl">
            Retail & Hospitality AI Transformations
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-indigo-100 leading-relaxed">
            Select your exact business format to see how Priyulabs eliminates manual errors, speeds checkout, and
            boosts net margins.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 sm:px-8" id="sectorContentHero">
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-4 dark:border-slate-800">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-2">Filter:</span>
          {[
            { id: 'all', label: 'All Industries' },
            { id: 'fnb', label: '☕ Food & Beverage' },
            { id: 'retail', label: '🛒 Retail & Grocery' },
            { id: 'beauty', label: '👗 Fashion & Beauty' },
            { id: 'services', label: '💊 Pharmacy & Services' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`rounded-full px-4 py-1.5 text-xs font-bold transition ${
                activeCategory === cat.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {filteredSectors.map((sector) => {
            const isSelected = sector.id === currentSector.id;
            return (
              <button
                key={sector.id}
                onClick={() => setParams({ sector: sector.id })}
                className={`rounded-xl px-4 py-2.5 text-sm font-bold transition ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'border border-slate-200 bg-white text-slate-700 hover:border-indigo-400 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200'
                }`}
              >
                {sector.title}
              </button>
            );
          })}
        </div>

        <motion.div
          key={currentSector.id}
          {...fadeAnim}
          className="mt-12 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="grid lg:grid-cols-12">
            <div className="relative bg-slate-100 lg:col-span-5 dark:bg-slate-800">
              {currentSector.videoUrl ? (
                <video
                  controls
                  className="h-full min-h-[380px] w-full object-cover"
                  poster={`/assets/${currentSector.image}`}
                >
                  <source src={`/assets/${currentSector.videoUrl}`} type="video/mp4" />
                </video>
              ) : (
                <img
                  src={`/assets/${currentSector.image}`}
                  alt={currentSector.title}
                  className="h-full min-h-[380px] w-full object-cover"
                />
              )}
              <div className="absolute top-4 left-4 rounded-full bg-slate-950/75 px-3 py-1 text-xs font-bold text-white backdrop-blur-md">
                {currentSector.badge}
              </div>
            </div>

            <div className="p-8 lg:col-span-7 sm:p-12">
              <span className="text-xs font-bold tracking-widest text-indigo-600 uppercase dark:text-indigo-400">
                {currentSector.eyebrow}
              </span>
              <h2 className="mt-2 text-3xl font-black text-slate-900 dark:text-white sm:text-4xl">
                {currentSector.headline}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">
                {currentSector.desc}
              </p>

              <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50/80 p-4 text-sm font-bold text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300">
                🚀 {currentSector.roi}
              </div>

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <div className="rounded-2xl border border-rose-200 bg-rose-50/50 p-5 dark:border-rose-950 dark:bg-rose-950/20">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400">
                    Legacy Disadvantages
                  </h4>
                  <ul className="mt-3 space-y-2.5 text-xs font-semibold text-rose-950 dark:text-rose-200">
                    {currentSector.before.map((b, idx) => (
                      <li key={idx} className="flex gap-2">
                        <span className="text-rose-500 shrink-0">✕</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-indigo-200 bg-indigo-50/50 p-5 dark:border-indigo-950 dark:bg-indigo-950/20">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">
                    With Priyulabs OS
                  </h4>
                  <ul className="mt-3 space-y-2.5 text-xs font-semibold text-indigo-950 dark:text-indigo-200">
                    {currentSector.after.map((a, idx) => (
                      <li key={idx} className="flex gap-2">
                        <span className="text-emerald-600 shrink-0">✓</span>
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Key Hardware & Software Upgrades Grid */}
              <div className="mt-12 border-t border-neutral-200/70 pt-10 dark:border-neutral-800/70">
                <div className="mb-8">
                  <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-100/70 px-3 py-1 text-[11px] font-semibold tracking-wider text-neutral-600 uppercase dark:border-neutral-800 dark:bg-neutral-800/60 dark:text-neutral-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                    System Architecture &amp; Extensions
                  </div>
                  <h3 className="mt-3 text-xl font-semibold tracking-tight text-neutral-900 sm:text-2xl dark:text-neutral-100">
                    Key Hardware &amp; Software Upgrades Available for This Sector
                  </h3>
                  <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                    Modular industrial peripherals, real-time edge processing, and high-concurrency cloud engines engineered for zero downtime.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {getSectorUpgrades(currentSector.id, currentSector.name).map((card) => (
                    <div
                      key={card.title}
                      className="group relative flex flex-col items-start justify-between rounded-2xl border border-neutral-200 bg-white p-5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-lg hover:shadow-neutral-200/50 dark:border-neutral-800 dark:bg-neutral-900/90 dark:hover:border-neutral-700 dark:hover:shadow-none"
                    >
                      <div>
                        {/* Modern Badge Container */}
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-neutral-200/60 bg-neutral-100 text-neutral-900 transition-colors group-hover:border-rose-200 group-hover:bg-rose-50/50 group-hover:text-rose-600 dark:border-neutral-700/60 dark:bg-neutral-800 dark:text-neutral-100 dark:group-hover:border-neutral-700 dark:group-hover:bg-neutral-800/80 dark:group-hover:text-white">
                          {card.type === 'cpu' && <Cpu className="h-6 w-6" strokeWidth={1.75} />}
                          {card.type === 'monitor' && <Monitor className="h-6 w-6" strokeWidth={1.75} />}
                          {card.type === 'server' && <Server className="h-6 w-6" strokeWidth={1.75} />}
                          {card.type === 'code2' && <Code2 className="h-6 w-6" strokeWidth={1.75} />}
                        </div>

                        <span className="block text-[11px] font-semibold tracking-wider text-rose-600 uppercase dark:text-rose-400">
                          {card.category}
                        </span>

                        <h4 className="mt-1.5 text-sm font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
                          {card.title}
                        </h4>

                        <p className="mt-2 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
                          {card.desc}
                        </p>
                      </div>

                      <div className="mt-4 inline-flex items-center gap-1.5 rounded-md border border-neutral-200/60 bg-neutral-50 px-2.5 py-1 text-[11px] font-medium text-neutral-600 dark:border-neutral-800 dark:bg-neutral-800/50 dark:text-neutral-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        <span>{card.spec}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex items-center gap-4">
                <Link
                  to="/pos"
                  className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-indigo-700"
                >
                  View POS Hardware Integration
                </Link>
                <a
                  href="#contact"
                  className="rounded-xl border border-slate-300 px-6 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200"
                >
                  Book 10-Min Demo
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section id="contact">
        <LeadSection title="Get your business set up in 10 minutes." />
      </section>
    </div>
  );
}
