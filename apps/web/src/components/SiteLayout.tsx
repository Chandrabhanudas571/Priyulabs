import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight, Menu, MessageCircle, Moon, Sun, X, ArrowLeft } from 'lucide-react';
import { useEffect, useState, type PropsWithChildren } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { InteractiveDemo } from '../features/marketing/InteractiveDemo';
import { PolicyModal, type PolicyType } from './PolicyModal';

const navLinks = [
  { label: 'Platform', to: '/' },
  { label: 'Business types', to: '/solutions' },
  { label: 'POS', to: '/pos' },
  { label: 'Hospitality Tech', to: '/hospitality' },
];

const mobileCategoryGroups = [
  {
    category: 'Food & Beverage',
    icon: '☕',
    items: [
      { label: 'Coffee shops & Cafes', sector: 'cafe' },
      { label: 'Bakeries & Confectionery', sector: 'bakery' },
      { label: 'Quick Service & Fast Food', sector: 'cafe' },
      { label: 'Full service & Fine dining', sector: 'cafe' },
    ],
  },
  {
    category: 'Retail & Grocery',
    icon: '🛒',
    items: [
      { label: 'Supermarkets & Kirana', sector: 'supermarket' },
      { label: 'Grain & Mandi Wholesale', sector: 'supermarket' },
      { label: 'Meat & Fish Outlets', sector: 'supermarket' },
    ],
  },
  {
    category: 'Fashion & Beauty',
    icon: '👗',
    items: [
      { label: 'Apparel & Fashion Stores', sector: 'apparel' },
      { label: 'Footwear & Shoe Outlets', sector: 'apparel' },
      { label: 'Cosmetics & Beauty Salons', sector: 'specialty' },
    ],
  },
  {
    category: 'Specialty & Services',
    icon: '💊',
    items: [
      { label: 'Pharmacies & Chemists', sector: 'pharmacy' },
      { label: 'Electronics & Mobile Shops', sector: 'electronics' },
      { label: 'Auto Parts & Hardware', sector: 'electronics' },
    ],
  },
];

export function SiteLayout({ children }: PropsWithChildren) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const [demoOpen, setDemoOpen] = useState(false);
  const [activePolicy, setActivePolicy] = useState<PolicyType | null>(null);
  const [dark, setDark] = useState(() => {
    try {
      return localStorage.getItem('priyulabs_theme') === 'dark';
    } catch {
      return false;
    }
  });

  const location = useLocation();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    try {
      localStorage.setItem('priyulabs_theme', dark ? 'dark' : 'light');
    } catch {
      // Ignore storage errors
    }
    setMobileOpen(false);
    setActiveSubMenu(null);
  }, [dark, location]);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 selection:bg-indigo-500 selection:text-white dark:bg-slate-950 dark:text-slate-100">
      {/* Sticky Global Navigation Bar */}
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/90">
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link to="/" className="flex items-center gap-3 font-black tracking-tight" aria-label="Priyulabs Home">
            <img src="/assets/logo.svg" className="h-9 w-9" alt="Priyulabs Logo" />
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
                PRIYULABS <span className="text-indigo-600 dark:text-indigo-400">DIGITAL</span>
              </span>
              <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">AI Retail OS</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden items-center gap-6 md:flex">
            {navLinks.map(({ label, to }) => {
              const isActive = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className={`text-sm font-semibold transition ${
                    isActive
                      ? 'text-indigo-600 dark:text-indigo-400'
                      : 'text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400'
                  }`}
                >
                  {label}
                </Link>
              );
            })}

            <button
              onClick={() => setDemoOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50/80 px-4 py-2 text-sm font-bold text-indigo-700 shadow-sm transition hover:bg-indigo-100 dark:border-indigo-800/80 dark:bg-indigo-950/50 dark:text-indigo-300 dark:hover:bg-indigo-900/50"
            >
              ✨ Interactive Demo
            </button>

            <ThemeToggle dark={dark} toggle={() => setDark(!dark)} />

            <Link
              to="/#contact"
              className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-indigo-600/20 transition hover:bg-indigo-700"
            >
              Start Free Trial
            </Link>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle dark={dark} toggle={() => setDark(!dark)} />
            <button
              aria-label="Open Navigation Menu"
              className="rounded-xl border border-slate-200 p-2.5 text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-900"
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={22} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Multi-level Drilldown Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm md:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              onClick={(e) => e.stopPropagation()}
              className="ml-auto flex h-full w-full max-w-sm flex-col bg-white p-6 shadow-2xl dark:bg-slate-900 overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-800">
                {activeSubMenu ? (
                  <button
                    onClick={() => setActiveSubMenu(null)}
                    className="flex items-center gap-1 text-sm font-bold text-indigo-600 dark:text-indigo-400"
                  >
                    <ArrowLeft size={16} /> Back
                  </button>
                ) : (
                  <span className="font-bold text-slate-900 dark:text-white">Navigation</span>
                )}
                <button
                  aria-label="Close menu"
                  className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                  onClick={() => setMobileOpen(false)}
                >
                  <X size={20} />
                </button>
              </div>

              {!activeSubMenu ? (
                <div className="mt-6 flex flex-col gap-3">
                  {navLinks.map(({ label, to }) => (
                    <Link
                      key={to}
                      to={to}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between rounded-xl px-4 py-3 text-base font-bold text-slate-800 hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-slate-800"
                    >
                      {label}
                      <ChevronRight size={18} className="text-slate-400" />
                    </Link>
                  ))}

                  <div className="my-2 border-t border-slate-200 dark:border-slate-800" />
                  <p className="px-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                    Explore Industry Sectors
                  </p>

                  {mobileCategoryGroups.map((group) => (
                    <button
                      key={group.category}
                      onClick={() => setActiveSubMenu(group.category)}
                      className="flex items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-bold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                      <span>
                        {group.icon} {group.category}
                      </span>
                      <ChevronRight size={16} className="text-slate-400" />
                    </button>
                  ))}

                  <div className="mt-4 flex flex-col gap-2">
                    <button
                      onClick={() => {
                        setMobileOpen(false);
                        setDemoOpen(true);
                      }}
                      className="w-full rounded-xl border border-indigo-300 bg-indigo-50 py-3 text-sm font-bold text-indigo-700 dark:border-indigo-800 dark:bg-indigo-950 dark:text-indigo-300"
                    >
                      ✨ Try Interactive Demo
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-6 flex flex-col gap-2">
                  <h4 className="px-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                    {activeSubMenu}
                  </h4>
                  {mobileCategoryGroups
                    .find((g) => g.category === activeSubMenu)
                    ?.items.map((item) => (
                      <Link
                        key={item.label}
                        to={`/solutions?sector=${item.sector}`}
                        onClick={() => setMobileOpen(false)}
                        className="rounded-xl px-4 py-3 text-sm font-bold text-slate-800 hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-slate-800"
                      >
                        {item.label}
                      </Link>
                    ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Page Body */}
      <main className="flex-1">{children}</main>

      {/* Global Footer */}
      <footer className="border-t border-slate-200 bg-white text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
        <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8">
          <div className="grid gap-10 md:grid-cols-4">
            <div className="md:col-span-2 space-y-4">
              <Link to="/" className="flex items-center gap-3">
                <img src="/assets/logo.svg" className="h-8 w-8" alt="Priyulabs" />
                <span className="text-lg font-black text-slate-900 dark:text-white">PRIYULABS DIGITAL</span>
              </Link>
              <p className="max-w-md text-sm leading-relaxed">
                India’s smartest AI-driven operating system for local supermarkets, cafes, restaurants, bakeries, and
                apparel boutiques. Unifying Voice POS billing, inventory OCR, staff biometric attendance, and 1-Click
                GST.
              </p>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                🇮🇳 DPIIT & Startup India Recognized Enterprise
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold tracking-wider text-slate-900 uppercase dark:text-white">Platform</h4>
              <ul className="mt-4 space-y-2 text-sm">
                <li><Link to="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">Platform Overview</Link></li>
                <li><Link to="/pos" className="hover:text-indigo-600 dark:hover:text-indigo-400">Next-Gen POS Engine</Link></li>
                <li><Link to="/solutions" className="hover:text-indigo-600 dark:hover:text-indigo-400">Business Sector Solutions</Link></li>
                <li><Link to="/hospitality" className="hover:text-indigo-600 dark:hover:text-indigo-400">Hospitality Tech</Link></li>
                <li><button onClick={() => setDemoOpen(true)} className="hover:text-indigo-600 dark:hover:text-indigo-400">Live Interactive Demo</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold tracking-wider text-slate-900 uppercase dark:text-white">Legal & Compliance</h4>
              <ul className="mt-4 space-y-2 text-sm">
                <li><button onClick={() => setActivePolicy('about')} className="hover:text-indigo-600 dark:hover:text-indigo-400">About Us</button></li>
                <li><button onClick={() => setActivePolicy('privacy')} className="hover:text-indigo-600 dark:hover:text-indigo-400">Privacy Policy</button></li>
                <li><button onClick={() => setActivePolicy('terms')} className="hover:text-indigo-600 dark:hover:text-indigo-400">Terms & Conditions</button></li>
                <li><button onClick={() => setActivePolicy('refund')} className="hover:text-indigo-600 dark:hover:text-indigo-400">Refund & 30-Day Policy</button></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between border-t border-slate-200 pt-8 text-xs sm:flex-row dark:border-slate-800">
            <p>© {new Date().getFullYear()} Priyulabs Digital (PriyuLabs Technologies Pvt. Ltd.). All Rights Reserved.</p>
            <p className="mt-2 sm:mt-0">Registered Office: Bhubaneswar, Odisha 751002, India.</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Action Button */}
      <a
        href="https://wa.me/917849074050?text=Hello%20Priyulabs!%20I%20want%20to%20know%20more%20about%20Priyulabs%20AI%20Retail%20OS."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-3 font-bold text-white shadow-xl shadow-emerald-600/30 transition hover:bg-emerald-700 hover:scale-105"
        aria-label="Chat with Priyulabs on WhatsApp"
      >
        <MessageCircle size={20} />
        <span className="hidden sm:inline">WhatsApp Us</span>
      </a>

      {/* Interactive Demo Modal */}
      <InteractiveDemo open={demoOpen} onClose={() => setDemoOpen(false)} />

      {/* Legal Policies Modal */}
      <PolicyModal policy={activePolicy} onClose={() => setActivePolicy(null)} />
    </div>
  );
}

function ThemeToggle({ dark, toggle }: { dark: boolean; toggle: () => void }) {
  return (
    <button
      aria-label="Toggle colour theme"
      className="rounded-xl border border-slate-200 p-2.5 text-slate-600 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
      onClick={toggle}
    >
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
