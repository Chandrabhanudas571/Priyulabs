import { motion } from 'framer-motion';
import { BarChart3, CloudOff, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LeadSection } from './LeadSection';

const fadeAnim = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.4 },
};

export function PosPage() {
  return (
    <div className="space-y-24 pb-20">
      <section className="bg-radial-[at_80%_25%] from-indigo-100/60 via-slate-50 to-white pt-16 pb-20 dark:from-indigo-950/40 dark:via-slate-950 dark:to-slate-950 sm:pt-24 sm:pb-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <motion.div {...fadeAnim} className="lg:col-span-6">
              <span className="text-xs font-bold tracking-widest text-indigo-600 uppercase dark:text-indigo-400">
                Priyulabs POS Engine
              </span>
              <h1 className="mt-3 text-4xl font-black text-slate-900 dark:text-white sm:text-5xl sm:leading-tight">
                Bill customers before they finish asking the price.
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                Lightning-fast sub-second checkout, 100% offline-first continuity, dual customer screens, and
                bi-directional Pine Labs EDC integration for zero cashier variance.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#lead-form"
                  className="rounded-xl bg-indigo-600 px-6 py-3.5 font-bold text-white shadow-xl shadow-indigo-600/25 transition hover:bg-indigo-700"
                >
                  Request POS Hardware Kit
                </a>
                <Link
                  to="/solutions"
                  className="rounded-xl border border-slate-300 bg-white px-6 py-3.5 font-bold text-slate-800 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                >
                  See All Sectors
                </Link>
              </div>
            </motion.div>

            <motion.div {...fadeAnim} className="lg:col-span-6">
              <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-2xl dark:border-slate-800">
                <img
                  src="/assets/pos_ui_hero.jpg"
                  alt="Priyulabs POS Interface"
                  className="h-full w-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="text-center">
          <span className="text-xs font-bold tracking-widest text-indigo-600 uppercase dark:text-indigo-400">
            Hardware & Network Resilience
          </span>
          <h2 className="mt-2 text-3xl font-black sm:text-4xl">Everything your counter needs to run smoothly</h2>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="inline-flex rounded-2xl bg-indigo-50 p-3 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
              <CreditCard size={24} />
            </div>
            <h3 className="mt-5 text-xl font-bold">Bi-Directional EDC & UPI Push</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              Push invoice amounts directly to Pine Labs, Paytm terminals, and dynamic UPI QR stands. Eliminates
              re-typing mistakes and cashier fraud.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="inline-flex rounded-2xl bg-indigo-50 p-3 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
              <CloudOff size={24} />
            </div>
            <h3 className="mt-5 text-xl font-bold">100% Offline-First Engine</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              Never halt billing when your Wi-Fi or broadband drops. Local transactions queue safely on disk and sync
              silently when network returns.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="inline-flex rounded-2xl bg-indigo-50 p-3 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
              <BarChart3 size={24} />
            </div>
            <h3 className="mt-5 text-xl font-bold">Direct Weigh-Scale Sync</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              Connect USB/RS-232 digital weighing scales. The exact weight transfers immediately to the cart item in 0.1
              seconds.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 p-8 dark:border-slate-800 dark:bg-slate-900 lg:p-14">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="text-xs font-bold tracking-widest text-indigo-600 uppercase dark:text-indigo-400">
                Seamless Counter Ecosystem
              </span>
              <h3 className="mt-2 text-3xl font-black">Supports All Standard Indian Retail Hardware</h3>
              <p className="mt-4 text-base text-slate-600 dark:text-slate-300">
                Plug and play with your existing thermal printers, laser barcode scanners, cash drawers, and customer
                facing pole displays without expensive proprietary lock-in.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {['EPSON & TVS Thermal Printers', 'Honeywell 2D Scanners', 'Pine Labs Android EDC', 'Paytm Soundbox', 'Essae Weighing Scales'].map(
                  (hw) => (
                    <span
                      key={hw}
                      className="rounded-full bg-white px-3.5 py-1.5 text-xs font-bold text-slate-800 shadow-sm dark:bg-slate-800 dark:text-slate-200"
                    >
                      ✓ {hw}
                    </span>
                  )
                )}
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl shadow-xl">
              <img
                src="/assets/pos_offline_counter.jpg"
                alt="POS Hardware Counter"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="lead-form">
        <LeadSection title="Ready to upgrade your billing counter?" />
      </section>
    </div>
  );
}
