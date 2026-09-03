import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { sectorsList } from './sectorsData';
import { LeadSection } from './LeadSection';

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

  const [activeCategory, setActiveCategory] = useState<'all' | 'fnb' | 'retail' | 'beauty' | 'services'>('all');

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

      <section className="mx-auto max-w-7xl px-6 sm:px-8">
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

              <div className="mt-8 flex flex-wrap gap-2">
                {currentSector.techUpgrades.map((upgrade) => (
                  <span
                    key={upgrade}
                    className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                  >
                    ⚡ {upgrade}
                  </span>
                ))}
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
