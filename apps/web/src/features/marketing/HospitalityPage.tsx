import { CheckCircle2 } from 'lucide-react';
import { LeadSection } from './LeadSection';

export function HospitalityPage() {
  return (
    <div className="space-y-24 pb-20">
      {/* Hospitality Hero */}
      <section className="bg-radial-[at_50%_20%] from-orange-100/50 via-slate-50 to-white pt-16 pb-20 dark:from-orange-950/20 dark:via-slate-950 dark:to-slate-950 sm:pt-24 sm:pb-28 text-center">
        <div className="mx-auto max-w-4xl px-6 sm:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-xs font-bold tracking-wide text-orange-700 uppercase dark:border-orange-900 dark:bg-orange-950/40 dark:text-orange-300">
            🛎️ PRIYULABS HOSPITALITY TECH
          </span>

          <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-900 dark:text-white sm:text-6xl sm:leading-tight">
            Next-Generation AI Operating System for Restaurants, Cafes & Hotels
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
            Streamline counter billing, kitchen KDS order printing, self-order QR table menus, custom bakery cake
            bookings & multi-outlet inventory in one fast OS.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="#pricing"
              className="rounded-xl bg-indigo-600 px-6 py-3.5 font-bold text-white shadow-lg shadow-indigo-600/25 transition hover:bg-indigo-700"
            >
              View Transparent Pricing Plans
            </a>
            <a
              href="#contact"
              className="rounded-xl border border-slate-300 bg-white px-6 py-3.5 font-bold text-slate-800 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            >
              Book 10-Min Demo
            </a>
          </div>
        </div>
      </section>

      {/* Section 1: Hospitality Product Overview */}
      <section id="product" className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="text-center">
          <span className="text-xs font-bold tracking-widest text-indigo-600 uppercase dark:text-indigo-400">
            Comprehensive F&B Workflow
          </span>
          <h2 className="mt-2 text-3xl font-black sm:text-4xl">Engineered for busy food & beverage service teams</h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: '🍽️',
              title: 'Table & Counter POS',
              desc: 'Split bills, merge tables, handle Captain ordering tablets, and dispatch instant thermal kitchen KOTs.',
            },
            {
              icon: '🖥️',
              title: 'Kitchen Display System (KDS)',
              desc: 'Live order queue on chef screens with color-coded prep timers to eliminate kitchen bottlenecks.',
            },
            {
              icon: '📲',
              title: 'QR Self-Order Menus',
              desc: 'Guests scan table QR code to browse photos, order directly, and pay via UPI with zero waiter delays.',
            },
            {
              icon: '📦',
              title: 'Recipe Ingredient ERP',
              desc: 'Every plate sold automatically deducts exact raw cheese, milk, chicken & spice stock in real-time.',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="text-3xl">{item.icon}</div>
              <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Pricing Plans */}
      <section id="pricing" className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="text-center">
          <span className="text-xs font-bold tracking-widest text-indigo-600 uppercase dark:text-indigo-400">
            Transparent Indian Pricing
          </span>
          <h2 className="mt-2 text-3xl font-black sm:text-4xl">Simple, honest pricing with zero hidden fees</h2>
          <p className="mt-2 text-sm text-slate-500">14-day free trial • No credit card required • On-site setup assistance</p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {/* Starter */}
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Starter Cafe</span>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-black">₹1,499</span>
                <span className="text-xs text-slate-500">/ month</span>
              </div>
              <p className="mt-3 text-xs text-slate-500">Perfect for single-counter cafes, bakeries & kiosks.</p>
              <ul className="mt-6 space-y-3 text-sm">
                {['1 POS Billing Terminal', 'Thermal KOT Printing', 'Offline Billing Continuity', 'UPI & Card Terminal Sync', 'Basic Inventory Alerts'].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <a href="#contact" className="mt-8 block rounded-xl border border-slate-300 py-3 text-center text-sm font-bold transition hover:bg-slate-50 dark:border-slate-700">
              Start Free Trial
            </a>
          </div>

          {/* Pro Restaurant (Featured) */}
          <div className="relative rounded-3xl border-2 border-indigo-600 bg-white p-8 shadow-xl dark:bg-slate-900 flex flex-col justify-between">
            <span className="absolute -top-3.5 right-8 rounded-full bg-indigo-600 px-3 py-1 text-xs font-bold text-white uppercase tracking-wider">
              Most Popular
            </span>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Pro Restaurant
              </span>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-black">₹2,999</span>
                <span className="text-xs text-slate-500">/ month</span>
              </div>
              <p className="mt-3 text-xs text-slate-500">For busy fine-dine restaurants, QSRs & multi-floor outlets.</p>
              <ul className="mt-6 space-y-3 text-sm">
                {[
                  'Up to 3 Billing & Captain Tablets',
                  'Kitchen Display System (KDS)',
                  'QR Table Ordering & UPI Pay',
                  'Recipe Ingredient ERP Deduction',
                  'Staff Biometric Attendance & Payroll',
                  '24/7 Dedicated WhatsApp Support',
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                    <span className="font-semibold">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <a href="#contact" className="mt-8 block rounded-xl bg-indigo-600 py-3 text-center text-sm font-bold text-white shadow-md shadow-indigo-600/25 transition hover:bg-indigo-700">
              Get Started with Pro
            </a>
          </div>

          {/* Enterprise */}
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Enterprise Chains</span>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-black">Custom</span>
              </div>
              <p className="mt-3 text-xs text-slate-500">For hotel properties, franchises & multi-city cloud kitchens.</p>
              <ul className="mt-6 space-y-3 text-sm">
                {[
                  'Unlimited Outlets & POS Terminals',
                  'Central Commissary Raw Material ERP',
                  'Hotel PMS & Room Billing Integration',
                  'Custom ERP API & Franchise Royalties',
                  'Dedicated Account Manager & SLA',
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <a href="#contact" className="mt-8 block rounded-xl border border-slate-300 py-3 text-center text-sm font-bold transition hover:bg-slate-50 dark:border-slate-700">
              Talk to Enterprise Team
            </a>
          </div>
        </div>
      </section>

      {/* Section 3: Customer Success Stories */}
      <section id="success-stories" className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="text-center">
          <span className="text-xs font-bold tracking-widest text-indigo-600 uppercase dark:text-indigo-400">
            Real Results
          </span>
          <h2 className="mt-2 text-3xl font-black sm:text-4xl">Proven impact across Indian food businesses</h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <span className="text-2xl font-black text-indigo-600">35% Faster</span>
            <h4 className="mt-2 text-lg font-bold">Cafe Mocha, Bhubaneswar</h4>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              “Table QR ordering and kitchen KDS order printing eliminated order mistakes completely. Our weekend table
              turnover jumped by 35% in month one.”
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <span className="text-2xl font-black text-indigo-600">100% Accuracy</span>
            <h4 className="mt-2 text-lg font-bold">Sweet Delights Bakery & Confectionery</h4>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              “We used to lose custom cake order slips during rush hours. Priyulabs logs delivery photos, dates, and
              weights right on the POS bill.”
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <span className="text-2xl font-black text-indigo-600">0% Recipe Waste</span>
            <h4 className="mt-2 text-lg font-bold">Urban Spice Fine Dine</h4>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              “Recipe ERP deduction showed us where raw materials were slipping. We saved over ₹45,000 every month on
              dairy and meat stock shrinkage alone.”
            </p>
          </div>
        </div>
      </section>

      {/* Section 4: Contact & Trial Form */}
      <section id="contact">
        <LeadSection title="Upgrade your hospitality operations today." />
      </section>
    </div>
  );
}
