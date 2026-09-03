import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  CreditCard,
  Mic,
  ScanLine,
  Sparkles,
  Users,
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { sectorsList } from './sectorsData';
import { LeadSection } from './LeadSection';

const fadeAnim = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.4 },
};

const platformFeatures = [
  {
    icon: CreditCard,
    title: 'Sub-Second POS Billing',
    text: 'Engineered for busy Indian counters. Barcode scanning, weigh scales, and EDC card terminals connected in real time.',
  },
  {
    icon: ScanLine,
    title: 'Vision AI Stock Detection',
    text: 'Turn paper wholesale invoices into structured inventory records in under 2 seconds with zero manual typing.',
  },
  {
    icon: Users,
    title: 'Biometric HRMS & Attendance',
    text: 'Selfie clock-in with geo-fencing, automated shift management, and 1-click staff salary calculation.',
  },
  {
    icon: BarChart3,
    title: '1-Click GST & Payment Sync',
    text: 'Bi-directional Pine Labs & UPI sync with zero cashier theft. Generate GSTR-1 and GSTR-3B JSON exports in 1 tap.',
  },
];

export function HomePage() {
  const [simulatedVoiceText, setSimulatedVoiceText] = useState('2 Masala Chai, 1 Paneer Croissant');
  const [voiceCalculated, setVoiceCalculated] = useState(true);

  const handleSimulateVoice = (sample: string) => {
    setSimulatedVoiceText(sample);
    setVoiceCalculated(false);
    setTimeout(() => {
      setVoiceCalculated(true);
    }, 400);
  };

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section with Interactive Voice POS Simulation */}
      <section className="relative overflow-hidden bg-radial-[at_80%_25%] from-indigo-100/60 via-slate-50 to-white pt-16 pb-20 dark:from-indigo-950/40 dark:via-slate-950 dark:to-slate-950 sm:pt-24 sm:pb-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <motion.div {...fadeAnim} className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50/80 px-4 py-1.5 text-xs font-bold tracking-wide text-indigo-700 uppercase dark:border-indigo-800 dark:bg-indigo-950/50 dark:text-indigo-300">
                <Sparkles size={14} /> AI Operating System for Modern Retail & Hospitality
              </div>

              <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-900 dark:text-white sm:text-6xl sm:leading-[1.08]">
                Run your business <br />
                <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                  on smart autopilot.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                Next-generation billing, Vision AI stock detection, staff biometric attendance, and zero-theft payment
                sync—built around the way ambitious Indian businesses actually operate.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  to="/pos"
                  className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 font-bold text-white shadow-xl shadow-indigo-600/25 transition hover:bg-indigo-700 hover:scale-[1.02]"
                >
                  Explore POS Engine
                  <ArrowRight size={18} />
                </Link>
                <Link
                  to="/solutions"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 font-bold text-slate-800 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                >
                  Find Your Industry
                </Link>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-slate-200/80 pt-6 text-xs font-bold text-slate-500 dark:border-slate-800 dark:text-slate-400">
                <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 size={16} /> 100% Offline-First
                </span>
                <span className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400">
                  <CheckCircle2 size={16} /> Sub-Second Billing
                </span>
                <span className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400">
                  <CheckCircle2 size={16} /> Bi-Directional EDC
                </span>
              </div>
            </motion.div>

            {/* Interactive Live Voice & Counter Simulator */}
            <motion.div
              {...fadeAnim}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="relative lg:col-span-5"
            >
              <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-2xl backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/90 sm:p-8">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500"></span>
                    </span>
                    <span className="text-xs font-bold tracking-wider text-slate-600 uppercase dark:text-slate-300">
                      Live Voice POS Engine
                    </span>
                  </div>
                  <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-[11px] font-bold text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
                    ⚡ 0.2s Response
                  </span>
                </div>

                <div className="mt-5 space-y-4">
                  <div className="rounded-2xl border border-indigo-100 bg-indigo-50/50 p-4 dark:border-indigo-950 dark:bg-indigo-950/20">
                    <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400">
                      <Mic size={16} className="animate-pulse" />
                      Voice Input Recognized:
                    </div>
                    <p className="mt-1 text-base font-black text-slate-900 dark:text-white">
                      “{simulatedVoiceText}”
                    </p>
                  </div>

                  <div className="space-y-1 text-xs font-semibold text-slate-500">
                    <p>Click sample voice triggers to simulate instant billing:</p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {[
                        '2 Masala Chai, 1 Paneer Croissant',
                        '1kg Basmati Rice, 500g Amul Butter',
                        '1 Blue Polo T-Shirt (Size L)',
                      ].map((item) => (
                        <button
                          key={item}
                          onClick={() => handleSimulateVoice(item)}
                          className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-bold text-slate-700 transition hover:border-indigo-500 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                        >
                          + {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    {voiceCalculated ? (
                      <motion.div
                        key={simulatedVoiceText}
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="rounded-2xl bg-slate-900 p-5 text-white dark:bg-slate-950 border border-slate-800"
                      >
                        <div className="flex items-center justify-between text-xs text-slate-400">
                          <span>Sub-Second Bill Auto-Generated</span>
                          <span className="font-mono text-emerald-400 font-bold">READY TO CHARGE</span>
                        </div>
                        <div className="mt-3 flex items-baseline justify-between">
                          <div>
                            <p className="text-2xl font-black text-white">
                              {simulatedVoiceText.includes('Chai')
                                ? '₹140.00'
                                : simulatedVoiceText.includes('Rice')
                                ? '₹385.00'
                                : '₹899.00'}
                            </p>
                            <p className="text-xs text-slate-400">Includes 5% GST • Zero theft EDC sync</p>
                          </div>
                          <span className="rounded-xl bg-emerald-500/20 px-3 py-1.5 text-xs font-bold text-emerald-300 border border-emerald-500/30">
                            Sent to Pine Labs ✓
                          </span>
                        </div>
                      </motion.div>
                    ) : (
                      <div className="flex h-24 items-center justify-center rounded-2xl border border-dashed border-slate-200 text-xs text-slate-400 dark:border-slate-700">
                        Parsing voice items...
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4 Core Pillars */}
      <section className="mx-auto max-w-7xl px-6 sm:px-8">
        <motion.div {...fadeAnim} className="text-center">
          <span className="text-xs font-bold tracking-widest text-indigo-600 uppercase dark:text-indigo-400">
            Unifying Fragmented Retail Workflows
          </span>
          <h2 className="mt-2 text-3xl font-black text-slate-900 dark:text-white sm:text-5xl">
            Four powerful pillars. One operating layer.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 dark:text-slate-300">
            Say goodbye to clunky disconnected tools. Run point-of-sale, stock, team attendance, and tax compliance
            from a single unified screen.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {platformFeatures.map(({ icon: Icon, title, text }) => (
            <motion.article
              {...fadeAnim}
              key={title}
              className="flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white p-7 shadow-sm transition hover:shadow-md hover:-translate-y-1 dark:border-slate-800 dark:bg-slate-900"
            >
              <div>
                <div className="inline-flex rounded-2xl bg-indigo-50 p-3.5 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
                  <Icon size={24} />
                </div>
                <h3 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{text}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Business Types Grid */}
      <section className="mx-auto max-w-7xl px-6 sm:px-8">
        <motion.div {...fadeAnim} className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-bold tracking-widest text-indigo-600 uppercase dark:text-indigo-400">
              Sector-Specific Operating Systems
            </span>
            <h2 className="mt-2 text-3xl font-black text-slate-900 dark:text-white sm:text-4xl">
              Built for businesses like yours
            </h2>
          </div>
          <Link
            to="/solutions"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
          >
            View all sector solutions <ArrowRight size={16} />
          </Link>
        </motion.div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {sectorsList.map((sector) => (
            <Link
              key={sector.id}
              to={`/solutions?sector=${sector.id}`}
              className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                  src={`/assets/${sector.image}`}
                  alt={sector.title}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <span className="absolute top-3 left-3 rounded-full bg-slate-950/70 px-3 py-1 text-xs font-bold text-white backdrop-blur-md">
                  {sector.badge}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">
                  {sector.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {sector.desc}
                </p>
                <div className="mt-4 flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400">
                  <span>Explore features</span>
                  <ArrowRight size={14} className="transition group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bakery Video Showcase */}
      <section className="bg-slate-900 py-20 text-white dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div {...fadeAnim}>
              <span className="text-xs font-bold tracking-widest text-indigo-400 uppercase">
                Real Bakery & Confectionery In Action
              </span>
              <h2 className="mt-3 text-3xl font-black sm:text-4xl">
                See Priyulabs live in high-volume bakery operations.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-300">
                Watch how advance custom cake bookings, auto weigh-scale sync, and thermal batch expiry labels work
                together to accelerate checkout lanes by 45%.
              </p>

              <div className="mt-8 space-y-3">
                {[
                  'Instant digital weigh scale sync direct to bill',
                  'Advance custom cake orders logged with delivery photo notes',
                  'Raw material recipe consumption auto-deducted per batch',
                ].map((highlight) => (
                  <div key={highlight} className="flex items-center gap-3 text-sm font-semibold text-slate-200">
                    <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Link
                  to="/solutions?sector=bakery"
                  className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-bold text-white transition hover:bg-indigo-700"
                >
                  View Bakery Solution Deep-Dive
                  <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>

            <motion.div {...fadeAnim} className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-800/80 shadow-2xl">
              <video
                controls
                className="h-full w-full object-cover"
                poster="/assets/hero_retail.jpg"
              >
                <source src="/assets/bakery-demo.mp4" type="video/mp4" />
                Your browser does not support the video element.
              </video>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Lead Section */}
      <section id="contact">
        <LeadSection title="Transform your business in 10 minutes." />
      </section>
    </div>
  );
}
