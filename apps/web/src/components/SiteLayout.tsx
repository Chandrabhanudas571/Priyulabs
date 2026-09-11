import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight, Menu, MessageCircle, Moon, Sun, X, ArrowLeft } from 'lucide-react';
import { useEffect, useRef, useState, type PropsWithChildren } from 'react';
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
      { label: 'Restaurants & Fine Dining', sector: 'restaurants', to: '/food-beverage/restaurants-fine-dining' },
      { label: 'QSR, Fast Food & Takeaway', sector: 'qsr', to: '/food-beverage/qsr-fast-food' },
      { label: 'Cafes & Chai Bars', sector: 'cafe', to: '/food-beverage/cafes-chai-bars' },
      { label: 'Cloud Kitchens & Catering', sector: 'cloudkitchen', to: '/food-beverage/cloud-kitchens-catering' },
      { label: 'Bakeries & Patisseries', sector: 'bakery', to: '/food-beverage/bakeries-shops' },
      { label: 'Bars, Pubs & Breweries', sector: 'bars', to: '/food-beverage/bars-pubs-breweries' },
    ],
  },
  {
    category: 'Retail & Grocery',
    icon: '🛒',
    items: [
      { label: 'Grocery, Supermarkets & Kirana Stores', sector: 'supermarket', to: '/retail/grocery-supermarkets-kirana' },
      { label: 'Electronics & Mobile Shops', sector: 'electronics', to: '/retail/electronics-mobile-shops' },
      { label: 'Footwear & Leather Stores', sector: 'apparel', to: '/retail/footwear-leather-stores' },
      { label: 'Jewellery Showrooms & Bullion', sector: 'specialty', to: '/retail/jewellery-shops' },
      { label: 'Watch Stores & Horology Boutiques', sector: 'specialty', to: '/retail/watch-stores' },
      { label: 'Bookstores & Stationery Outlets', sector: 'specialty', to: '/retail/bookstores-stationery' },
    ],
  },
  {
    category: 'Fashion & Beauty',
    icon: '👗',
    items: [
      { label: 'Clothing Brands & Apparel Boutiques', sector: 'apparel' },
      { label: 'Salons, Spas & Beauty Parlors', sector: 'specialty' },
      { label: 'Cosmetics & Skincare Stores', sector: 'specialty' },
      { label: 'Eyewear & Optical Stores', sector: 'specialty' },
      { label: 'Tailoring & Custom Designer Studios', sector: 'apparel' },
    ],
  },
  {
    category: 'Services & Professional Businesses',
    icon: '💼',
    items: [
      { label: 'Gyms, Fitness Studios & Yoga Centers', sector: 'specialty' },
      { label: 'Auto Garages, Car Wash & Bike Service Centers', sector: 'pos' },
      { label: 'Dry Cleaners & Laundry Shops', sector: 'apparel' },
      { label: 'Repair Centers (Mobile, Laptop, Appliances)', sector: 'electronics' },
      { label: 'Co-working Spaces & Shared Offices', sector: 'pos' },
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

  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [typesDropdownOpen, setTypesDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('Food & Beverage');
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const typesDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target as Node)) {
        setMegaMenuOpen(false);
      }
      if (typesDropdownRef.current && !typesDropdownRef.current.contains(event.target as Node)) {
        setTypesDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMegaMenuOpen(false);
    setTypesDropdownOpen(false);
  }, [location.pathname, location.search]);

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

  const isBookstore =
    location.pathname === '/retail/bookstores-stationery' ||
    location.pathname === '/bookstores-stationery';
  const isWatch =
    location.pathname === '/retail/watch-stores' ||
    location.pathname === '/watch-stores';
  const isJewellery =
    location.pathname === '/retail/jewellery-shops' ||
    location.pathname === '/jewellery-shops';
  const isFootwear =
    location.pathname === '/retail/footwear-leather-stores' ||
    location.pathname === '/footwear-leather-stores';
  const isElectronics =
    location.pathname === '/retail/electronics-mobile-shops' ||
    location.pathname === '/electronics-mobile-shops';
  const isGrocery =
    location.pathname === '/retail/grocery-supermarkets-kirana' ||
    location.pathname === '/grocery-supermarkets-kirana';

  const isRetail =
    location.pathname.startsWith('/retail') ||
    isBookstore ||
    isWatch ||
    isJewellery ||
    isFootwear ||
    isElectronics ||
    isGrocery ||
    (location.pathname === '/solutions' &&
      (location.search.includes('sector=hardware') ||
        location.search.includes('sector=pharmacy')));

  const isFnb =
    location.pathname.startsWith('/food-beverage') ||
    location.pathname.startsWith('/fnb') ||
    [
      '/restaurants-fine-dining',
      '/qsr-fast-food',
      '/cafes-chai-bars',
      '/cloud-kitchens-catering',
      '/bakeries-shops',
      '/bakeries-sweet-shops',
      '/bars-pubs-breweries',
    ].includes(location.pathname);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 selection:bg-indigo-500 selection:text-white dark:bg-slate-950 dark:text-slate-100">
      {/* Sticky Global Navigation Bar */}
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-neutral-200 py-3.5 px-6 sm:px-12 flex items-center justify-between dark:border-slate-800 dark:bg-slate-950/95">
        {/* Left Branding */}
        <Link to="/" className="flex items-center gap-3 no-underline group" aria-label="Priyulabs Home">
          {/* Squircle Logo Container */}
          <div className="h-10 w-10 rounded-2xl bg-[#0f1422] p-2 flex items-center justify-center shadow-sm">
            <img src="/assets/logo.svg" alt="Priyulabs" className="h-full w-full object-contain" />
          </div>

          {/* 2-Line Text Stack */}
          <div className="flex flex-col leading-tight text-left">
            <span className="text-base font-bold text-[#0f172a] dark:text-white tracking-tight">
              PRIYULABS
            </span>
            {isBookstore ? (
              <span className="text-xs font-semibold text-[#059669] tracking-wider uppercase">
                BOOKSTORE RETAIL OS
              </span>
            ) : isWatch ? (
              <span className="text-xs font-semibold text-[#0f766e] tracking-wider uppercase">
                WATCH RETAIL OS
              </span>
            ) : isJewellery ? (
              <span className="text-xs font-semibold text-[#d97706] tracking-wider uppercase">
                JEWELLERY OS
              </span>
            ) : isFootwear ? (
              <span className="text-xs font-semibold text-[#059669] tracking-wider uppercase">
                FOOTWEAR &amp; LEATHER OS
              </span>
            ) : isElectronics ? (
              <span className="text-xs font-semibold text-[#0284c7] tracking-wider uppercase">
                ELECTRONICS OS
              </span>
            ) : isGrocery ? (
              <span className="text-xs font-semibold text-[#16a34a] tracking-wider uppercase">
                RETAIL &amp; GROCERY OS
              </span>
            ) : (
              <span className="text-[10px] font-bold tracking-wider text-[#64748b] uppercase leading-none mt-0.5">
                DIGITAL
              </span>
            )}
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        {isRetail || isFnb ? (
          <>
            {/* Center / Navigation Links */}
            <div className="hidden md:flex items-center gap-8 lg:gap-10">
              <a
                href="#"
                className="text-sm font-semibold text-[#0f172a] dark:text-white cursor-pointer"
              >
                Overview
              </a>

              {/* Types Dropdown (Context-Aware: Retail or Food & Beverage) */}
              <div className="relative group" ref={typesDropdownRef}>
                <button
                  type="button"
                  onClick={() => setTypesDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-1 text-sm font-medium text-[#475569] hover:text-[#0f172a] dark:text-slate-300 dark:hover:text-white transition-colors cursor-pointer"
                >
                  <span>Types</span>
                  <span className="text-[10px] text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-transform">▾</span>
                </button>

                <div
                  className={`absolute left-1/2 -translate-x-1/2 top-full pt-3 z-50 transition-all duration-150 ${
                    typesDropdownOpen
                      ? 'visible opacity-100'
                      : 'invisible opacity-0 group-hover:visible group-hover:opacity-100'
                  }`}
                >
                  <div className="w-72 rounded-2xl border border-neutral-200 bg-white p-2 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
                    {isRetail ? (
                      <>
                        <div className="px-3 py-1.5 text-[10.5px] font-extrabold uppercase tracking-widest text-slate-400 border-b border-slate-100 dark:border-slate-800 mb-1">
                          RETAIL BUSINESS TYPES
                        </div>
                        {[
                          {
                            label: '🛒 Grocery, Supermarkets & Kirana',
                            to: '/retail/grocery-supermarkets-kirana',
                            isActive:
                              location.pathname === '/retail/grocery-supermarkets-kirana' ||
                              location.pathname === '/grocery-supermarkets-kirana',
                          },
                          {
                            label: '📱 Electronics & Mobile Shops',
                            to: '/retail/electronics-mobile-shops',
                            isActive:
                              location.pathname === '/retail/electronics-mobile-shops' ||
                              location.pathname === '/electronics-mobile-shops',
                          },
                          {
                            label: '👞 Footwear & Leather Stores',
                            to: '/retail/footwear-leather-stores',
                            isActive:
                              location.pathname === '/retail/footwear-leather-stores' ||
                              location.pathname === '/footwear-leather-stores',
                          },
                          {
                            label: '💍 Jewellery Showrooms',
                            to: '/retail/jewellery-shops',
                            isActive:
                              location.pathname === '/retail/jewellery-shops' ||
                              location.pathname === '/jewellery-shops',
                          },
                          {
                            label: '⌚ Watch Stores & Horology',
                            to: '/retail/watch-stores',
                            isActive:
                              location.pathname === '/retail/watch-stores' ||
                              location.pathname === '/watch-stores',
                          },
                          {
                            label: '🔧 Hardware, Sanitary & Paint',
                            to: '/solutions?sector=hardware',
                            isActive:
                              location.pathname === '/solutions' &&
                              location.search.includes('sector=hardware'),
                          },
                          {
                            label: '📚 Bookstores & Stationery',
                            to: '/retail/bookstores-stationery',
                            isActive:
                              location.pathname === '/retail/bookstores-stationery' ||
                              location.pathname === '/bookstores-stationery',
                          },
                        ].map((item) => (
                          <Link
                            key={item.to}
                            to={item.to}
                            onClick={() => setTypesDropdownOpen(false)}
                            className={`flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold ${
                              item.isActive
                                ? 'bg-slate-100 text-slate-900 font-bold dark:bg-slate-800 dark:text-white'
                                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'
                            }`}
                          >
                            <span>{item.label}</span>
                            {item.isActive && (
                              <span className="rounded-full bg-[#0f172a] px-2 py-0.5 text-[10px] text-white dark:bg-slate-100 dark:text-slate-900">
                                Current
                              </span>
                            )}
                          </Link>
                        ))}
                      </>
                    ) : (
                      <>
                        <div className="px-3 py-1.5 text-[10.5px] font-extrabold uppercase tracking-widest text-slate-400 border-b border-slate-100 dark:border-slate-800 mb-1">
                          FOOD &amp; BEVERAGE TYPES
                        </div>
                        {[
                          {
                            label: '🍽️ Restaurants & Fine Dining',
                            to: '/food-beverage/restaurants-fine-dining',
                            isActive:
                              location.pathname === '/food-beverage/restaurants-fine-dining' ||
                              location.pathname === '/restaurants-fine-dining',
                          },
                          {
                            label: '⚡ QSR, Fast Food & Takeaway',
                            to: '/food-beverage/qsr-fast-food',
                            isActive:
                              location.pathname === '/food-beverage/qsr-fast-food' ||
                              location.pathname === '/qsr-fast-food',
                          },
                          {
                            label: '☕ Cafes & Chai Bars',
                            to: '/food-beverage/cafes-chai-bars',
                            isActive:
                              location.pathname === '/food-beverage/cafes-chai-bars' ||
                              location.pathname === '/cafes-chai-bars',
                          },
                          {
                            label: '📦 Cloud Kitchens & Catering',
                            to: '/food-beverage/cloud-kitchens-catering',
                            isActive:
                              location.pathname === '/food-beverage/cloud-kitchens-catering' ||
                              location.pathname === '/cloud-kitchens-catering',
                          },
                          {
                            label: '🥐 Bakeries & Sweet Shops',
                            to: '/food-beverage/bakeries-shops',
                            isActive: [
                              '/food-beverage/bakeries-shops',
                              '/bakeries-shops',
                              '/food-beverage/bakeries-sweet-shops',
                              '/bakeries-sweet-shops',
                            ].includes(location.pathname),
                          },
                          {
                            label: '🍷 Bars, Pubs & Breweries',
                            to: '/food-beverage/bars-pubs-breweries',
                            isActive:
                              location.pathname === '/food-beverage/bars-pubs-breweries' ||
                              location.pathname === '/bars-pubs-breweries',
                          },
                        ].map((item) => (
                          <Link
                            key={item.to}
                            to={item.to}
                            onClick={() => setTypesDropdownOpen(false)}
                            className={`flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold ${
                              item.isActive
                                ? 'bg-slate-100 text-slate-900 font-bold dark:bg-slate-800 dark:text-white'
                                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'
                            }`}
                          >
                            <span>{item.label}</span>
                            {item.isActive && (
                              <span className="rounded-full bg-[#0f172a] px-2 py-0.5 text-[10px] text-white dark:bg-slate-100 dark:text-slate-900">
                                Current
                              </span>
                            )}
                          </Link>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              </div>

              <a
                href="#pillars"
                className="text-sm font-medium text-[#475569] hover:text-[#0f172a] dark:text-slate-300 dark:hover:text-white transition-colors"
              >
                Switch Priyulabs
              </a>
            </div>

            {/* Right CTA Action */}
            <div className="hidden md:flex items-center gap-4">
              <ThemeToggle dark={dark} toggle={() => setDark(!dark)} />
              <a
                href="/#contact"
                className="rounded-xl bg-[#0f172a] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-neutral-800 dark:bg-white dark:text-[#0f172a] dark:hover:bg-slate-100"
              >
                Get Started
              </a>
            </div>
          </>
        ) : (
          <div className="hidden items-center gap-6 md:flex">
            {navLinks.map(({ label, to }) => {
              if (label === 'Business types') {
                return (
                  <div key={to} className="relative" ref={megaMenuRef}>
                    <button
                      onClick={() => setMegaMenuOpen((prev) => !prev)}
                      className={`flex items-center gap-1.5 text-sm font-semibold transition ${
                        location.pathname === '/solutions' || megaMenuOpen
                          ? 'text-indigo-600 dark:text-indigo-400'
                          : 'text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400'
                      }`}
                      aria-expanded={megaMenuOpen}
                    >
                      {label}
                      <ChevronRight
                        size={14}
                        className={`transition-transform duration-200 ${megaMenuOpen ? 'rotate-90' : 'rotate-0'}`}
                      />
                    </button>

                    <AnimatePresence>
                      {megaMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.15 }}
                          className="absolute left-1/2 top-full z-50 mt-3 w-[720px] -translate-x-1/2 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900"
                        >
                          <div className="grid grid-cols-12 gap-5">
                            {/* Category Selector Tabs */}
                            <div className="col-span-5 space-y-1.5 border-r border-slate-100 pr-3 dark:border-slate-800">
                              <div className="px-3 pb-2 text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                                Categories
                              </div>
                              {mobileCategoryGroups.map((cat) => (
                                <button
                                  key={cat.category}
                                  type="button"
                                  onMouseEnter={() => setSelectedCategory(cat.category)}
                                  onClick={() => setSelectedCategory(cat.category)}
                                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-xs font-bold transition ${
                                    selectedCategory === cat.category
                                      ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
                                      : 'text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800/60'
                                  }`}
                                >
                                  <span className="flex items-center gap-2">
                                    <span>{cat.icon}</span>
                                    <span>{cat.category}</span>
                                  </span>
                                  <ChevronRight size={14} className="opacity-50" />
                                </button>
                              ))}

                              <div className="pt-2">
                                <Link
                                  to="/solutions"
                                  onClick={() => setMegaMenuOpen(false)}
                                  className="block rounded-xl border border-dashed border-indigo-200 p-2.5 text-center text-xs font-bold text-indigo-600 hover:bg-indigo-50/50 dark:border-indigo-900/60 dark:text-indigo-400 dark:hover:bg-indigo-950/30"
                                >
                                  View All 23 Industries →
                                </Link>
                              </div>
                            </div>

                            {/* DISCOVER Column */}
                            <div className="col-span-7 pl-1">
                              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 mb-2">
                                <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                                  Discover • {selectedCategory}
                                </span>
                                <span className="text-[10px] text-slate-400">
                                  Click to open &amp; sync tabs
                                </span>
                              </div>

                              <div className="max-h-[300px] space-y-1 overflow-y-auto pr-1">
                                {mobileCategoryGroups
                                  .find((c) => c.category === selectedCategory)
                                  ?.items.map((item) => (
                                    <Link
                                      key={item.label}
                                      to={item.to || `/solutions?sector=${item.sector}`}
                                      onClick={() => {
                                        // 1. Immediately close dropdown on select
                                        setMegaMenuOpen(false);
                                      }}
                                      className="group flex flex-col rounded-xl px-3 py-2 transition hover:bg-indigo-50/80 dark:hover:bg-indigo-950/50"
                                    >
                                      <span className="text-xs font-bold text-slate-800 group-hover:text-indigo-600 dark:text-slate-200 dark:group-hover:text-indigo-400">
                                        {item.label}
                                      </span>
                                      <span className="text-[11px] text-slate-400 dark:text-slate-500">
                                        Priyulabs OS Solution &amp; Billing
                                      </span>
                                    </Link>
                                  ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

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
        )}

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
                        to={item.to || `/solutions?sector=${item.sector}`}
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
                🇮🇳 MSME Certified (UDYAM-OD-19-0177979) Enterprise
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
