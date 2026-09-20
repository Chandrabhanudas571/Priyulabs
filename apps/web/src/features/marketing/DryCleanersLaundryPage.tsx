import React from 'react';
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Tag,
  Layers,
  Truck,
  Building2,
  CheckCircle2,
  Lock,
  Award,
} from 'lucide-react';

export function DryCleanersLaundryPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {/* ─── Hero Section ───────────────────────────────────── */}
      <section className="relative overflow-hidden pt-12 pb-16 text-center bg-[radial-gradient(circle_at_50%_10%,rgba(234,88,12,0.04)_0%,transparent_60%)]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-orange-800 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-600 ring-2 ring-orange-400/30"></span>
            SERVICES OS · GARMENT CARE &amp; DRY CLEANING
          </div>

          {/* H1 Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.12] max-w-4xl mx-auto mb-6">
            Track Every Garment from Tagging to Pickup with{' '}
            <span className="text-orange-600">Zero Lost Clothes</span>
          </h1>

          {/* Sub-headline */}
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Waterproof barcode tags, defect/stain documentation at drop-off counter, live washing-to-pressing stages, automated pickup ready WhatsApp alerts, and route-wise home delivery.
          </p>

          {/* Standardized 4-Pillar Solution Strip (Names only, no descriptions) */}
          <div className="mx-auto mt-8 mb-12 flex max-w-4xl flex-wrap items-center justify-center gap-3.5 rounded-2xl border border-slate-200/80 bg-white/80 px-6 py-3.5 text-xs font-semibold text-slate-700 shadow-xs backdrop-blur-sm sm:text-[13.5px]">
            <span>Drop-off Counter POS</span>
            <span className="text-slate-300">✦</span>
            <span>Factory &amp; Plant Workflow</span>
            <span className="text-slate-300">✦</span>
            <span>Customer WhatsApp Tracking</span>
            <span className="text-slate-300">✦</span>
            <span>Home Delivery Route OS</span>
          </div>

          {/* Hero 4-Photo Visual Gallery Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-left">
            <div className="group relative h-80 sm:h-96 rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 shadow-md transition-all hover:shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=1200&q=80"
                alt="Modern dry cleaning plant conveyor rack"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="group relative h-80 sm:h-96 rounded-2xl overflow-hidden border-2 border-orange-500/40 bg-slate-50 shadow-lg transition-all hover:shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=1200&q=80"
                alt="Front-desk counter garment inspection and tagging"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="group relative h-80 sm:h-96 rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 shadow-md transition-all hover:shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1489274495757-95c7c837b101?auto=format&fit=crop&w=1200&q=80"
                alt="Professional garment steam pressing and finishing station"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="group relative h-80 sm:h-96 rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 shadow-md transition-all hover:shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=1200&q=80"
                alt="Neatly packaged clean garments ready for delivery dispatch"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Metrics Ribbon ─────────────────────────────────── */}
      <section className="border-y border-slate-200 bg-slate-50/50 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-black tracking-tight text-slate-900">0</div>
              <div className="text-sm font-bold text-orange-600 mt-1">Lost Garment Claims</div>
              <div className="text-xs text-slate-500 mt-1">Chemical-proof tags survive solvents &amp; wash cycles</div>
            </div>
            <div>
              <div className="text-4xl font-black tracking-tight text-slate-900">3x</div>
              <div className="text-sm font-bold text-orange-600 mt-1">Faster Counter Intake</div>
              <div className="text-xs text-slate-500 mt-1">Preset garment catalog &amp; instant thermal tag print</div>
            </div>
            <div>
              <div className="text-4xl font-black tracking-tight text-slate-900">99.4%</div>
              <div className="text-sm font-bold text-orange-600 mt-1">On-Time Processing</div>
              <div className="text-xs text-slate-500 mt-1">Live wash, press &amp; slot rack progress monitor</div>
            </div>
            <div>
              <div className="text-4xl font-black tracking-tight text-slate-900">₹0</div>
              <div className="text-sm font-bold text-orange-600 mt-1">Unpaid Pickup Leakage</div>
              <div className="text-xs text-slate-500 mt-1">Automated WhatsApp UPI payment link before handoff</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3 Core Operational Pillars ─────────────────────── */}
      <section className="py-20 bg-white" id="laundry-features">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-24">
          {/* Pillar 1: Thermal Waterproof Barcode Tagging */}
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12">
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden">
                <div className="relative h-44 bg-slate-900 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=1200&q=80"
                    alt="Thermal waterproof barcode tagging"
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent flex items-end p-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-900/80 backdrop-blur-md px-3 py-1 text-xs font-bold text-white border border-white/20">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                      Thermal Hydrophobic Barcode &bull; Chem-Proof
                    </span>
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                    <div>
                      <strong className="text-sm font-bold text-slate-900 block">Order #DC-90412 &bull; Counter Intake</strong>
                      <span className="text-xs text-slate-500">Customer: Rajesh Khanna &bull; +91 98450 XXXXX</span>
                    </div>
                    <span className="text-[11px] font-bold bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-md border border-emerald-200">
                      Tagged &amp; Dispatched
                    </span>
                  </div>
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-3">
                    <div className="flex justify-between items-center text-xs font-bold text-slate-900 mb-1">
                      <span className="bg-emerald-600 text-white text-[10px] px-1.5 py-0.5 rounded">TAG #90412-A</span>
                      <span>Raymond 2-Piece Suit (Navy)</span>
                      <span className="text-emerald-700 font-bold">Dry Clean &bull; ₹380</span>
                    </div>
                    <div className="flex justify-between text-[11px] text-emerald-800">
                      <span>Sub-pieces: 1 Blazer, 1 Trouser (Linked)</span>
                      <strong>Slot: Rack C-14</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-6 order-1 lg:order-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wide text-orange-800 mb-4">
                Pillar 1 &bull; Thermal Waterproof Barcode Tagging
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-4">
                Thermal Waterproof Barcode Tagging
              </h2>
              <div className="rounded-r-xl border-l-4 border-orange-600 bg-orange-50 p-4 text-xs sm:text-sm text-orange-950 font-medium mb-5">
                <strong>The Problem Solved:</strong> Paper tags dissolve and tear off in high-heat wash drums, leading to lost garments, split suit pieces, and painful customer disputes.
              </div>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                Generate heat-resistant, chemical-proof tags at drop-off that stay intact through harsh washing and dry cleaning solvents without fading.
              </p>
              <ul className="space-y-3 text-sm text-slate-700 font-medium">
                <li className="flex items-start gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600 font-bold text-xs">✓</span>
                  <span>Waterproof polymer thermal tags survive 90°C hot water washes, perchloroethylene solvents, and intense steam presses.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600 font-bold text-xs">✓</span>
                  <span>Parent-child barcode linking: 3-piece suits and matching dupattas are indexed together to guarantee complete assembly.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600 font-bold text-xs">✓</span>
                  <span>1-second thermal printing at front desk with instant automatic customer WhatsApp acknowledgment.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Pillar 2: Pre-Wash Stain & Defect Photo Audit */}
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12">
            <div className="lg:col-span-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wide text-emerald-800 mb-4">
                Pillar 2 &bull; Pre-Wash Defect Camera Audit
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-4">
                Pre-Wash Stain &amp; Defect Photo Audit
              </h2>
              <div className="rounded-r-xl border-l-4 border-emerald-600 bg-emerald-50 p-4 text-xs sm:text-sm text-emerald-950 font-medium mb-5">
                <strong>The Problem Solved:</strong> Clients accusing cleaners of causing torn hems, color fades, or missing luxury buttons that were already damaged prior to drop-off.
              </div>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                Capture existing tears, color bleeds, or missing buttons right at the counter to protect against unjust client damage claims.
              </p>
              <ul className="space-y-3 text-sm text-slate-700 font-medium">
                <li className="flex items-start gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 font-bold text-xs">✓</span>
                  <span>Counter webcam / mobile camera snap captures existing garment defects directly onto the digital job card.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 font-bold text-xs">✓</span>
                  <span>Pre-intake defect marking: Tag collar fraying, fabric thinning, or stubborn oil stains with one tap.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 font-bold text-xs">✓</span>
                  <span>Digital customer consent: Timestamped photos sent immediately to customer WhatsApp for indisputable verification.</span>
                </li>
              </ul>
            </div>
            <div className="lg:col-span-6">
              <div className="rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden">
                <div className="relative h-44 bg-slate-900 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1489274495757-95c7c837b101?auto=format&fit=crop&w=1200&q=80"
                    alt="Defect inspection station"
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent flex items-end p-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-900/80 backdrop-blur-md px-3 py-1 text-xs font-bold text-white border border-white/20">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-400"></span>
                      Intake Audit Camera &bull; Defect Logged
                    </span>
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                    <div>
                      <strong className="text-sm font-bold text-slate-900 block">Counter Inspection &bull; Pre-Existing Damage</strong>
                      <span className="text-xs text-slate-500">Item: Armani Silk Shirt &bull; Customer Approved</span>
                    </div>
                    <span className="text-[11px] font-bold bg-amber-50 text-amber-700 px-2.5 py-1 rounded-md border border-amber-200">
                      Defect Acknowledged
                    </span>
                  </div>
                  <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-3 flex gap-3 items-center">
                    <div className="h-12 w-12 rounded-lg bg-amber-200 border border-amber-300 flex items-center justify-center text-xl shrink-0">
                      📸
                    </div>
                    <div className="text-xs text-amber-950">
                      <strong>Location:</strong> Right Lapel near 2nd button<br />
                      <strong>Note:</strong> Stubborn turmeric oil stain; customer notified of color fading risk.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pillar 3: Rack Slot & Bag Assembly Verification */}
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12">
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden">
                <div className="relative h-44 bg-slate-900 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=1200&q=80"
                    alt="Conveyor rack slot assembly"
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent flex items-end p-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-900/80 backdrop-blur-md px-3 py-1 text-xs font-bold text-white border border-white/20">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-400"></span>
                      Conveyor Rack Bay #B-24 • 100% Assembled
                    </span>
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                    <div>
                      <strong className="text-sm font-bold text-slate-900 block">Conveyor Slot Bay #B-24</strong>
                      <span className="text-xs text-slate-500">Order #DC-90380 &bull; Ready for Customer Collection</span>
                    </div>
                    <span className="text-[11px] font-bold bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-md border border-emerald-200">
                      3 / 3 Items Racked
                    </span>
                  </div>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between items-center p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 font-medium">
                      <span>1. Blazer (Black Tuxedo) &bull; Tag #380-A</span>
                      <span className="text-emerald-600 font-bold">✓ In Slot B-24</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 font-medium">
                      <span>2. Trouser (Black Tuxedo) &bull; Tag #380-B</span>
                      <span className="text-emerald-600 font-bold">✓ In Slot B-24</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 font-medium">
                      <span>3. Silk Waistcoat &bull; Tag #380-C</span>
                      <span className="text-emerald-600 font-bold">✓ In Slot B-24</span>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl border border-emerald-200 bg-emerald-50/50 flex justify-between items-center text-xs text-emerald-900 font-semibold">
                    <span>Automated WhatsApp Alert &amp; UPI Link dispatched.</span>
                    <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">OTP Ready</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-6 order-1 lg:order-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wide text-blue-800 mb-4">
                Pillar 3 &bull; Rack Slot &amp; Bag Assembly
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-4">
                Rack Slot &amp; Bag Assembly Verification
              </h2>
              <div className="rounded-r-xl border-l-4 border-blue-600 bg-blue-50 p-4 text-xs sm:text-sm text-blue-950 font-medium mb-5">
                <strong>The Problem Solved:</strong> Split orders (blazer ready, trousers in pressing) handed over partially, forcing customers to return again or leave angry with incomplete wardrobes.
              </div>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                Scan garments to auto-assemble split orders into one single rack slot, preventing partial pickups and missing suit pieces.
              </p>
              <ul className="space-y-3 text-sm text-slate-700 font-medium">
                <li className="flex items-start gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold text-xs">✓</span>
                  <span>Intelligent conveyor slot indexing: Scan any finished garment to instantly reveal its designated rack bay.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold text-xs">✓</span>
                  <span>Anti-partial handover safeguard: POS warns the cashier if an order is missing a piece before marking delivery complete.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold text-xs">✓</span>
                  <span>Automatic WhatsApp trigger fires only when 100% of garments in the ticket have been scanned into the final bag.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Secondary 6 Flat Feature Cards ─────────────────── */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wide text-orange-800 mb-3">
              COMPLETE DRY CLEANING &amp; LAUNDRY SUITE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              Built for High-Volume Counter Speed &amp; Workshop Accuracy
            </h2>
            <p className="text-slate-600 text-base">
              Everything you need to eliminate mix-ups, speed up drop-offs, and offer an upscale customer experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-xs hover:border-slate-300 hover:shadow-md transition">
              <div className="h-11 w-11 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-orange-600 mb-5">
                <Tag size={20} />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Piece &amp; Kilo Rate Lists</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Switch effortlessly between per-piece dry cleaning (suits, sherwanis, sarees) and bulk per-kg wash &amp; fold rates with digital weighing scale sync.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-xs hover:border-slate-300 hover:shadow-md transition">
              <div className="h-11 w-11 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-emerald-600 mb-5">
                <Layers size={20} />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Conveyor Slot Rack Indexing</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Assign numerical or color-coded rack slots (e.g. Rack B-12) to finished orders so staff can retrieve any garment bag in under 5 seconds.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-xs hover:border-slate-300 hover:shadow-md transition">
              <div className="h-11 w-11 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-blue-600 mb-5">
                <Zap size={20} />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">WhatsApp Ready Alerts</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Automated WhatsApp notification with garment item count, total balance due, and 1-click UPI QR link as soon as orders are bagged.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-xs hover:border-slate-300 hover:shadow-md transition">
              <div className="h-11 w-11 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-purple-600 mb-5">
                <Truck size={20} />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Doorstep Route Dispatch</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Schedule driver pickup and delivery runs, verify bag barcodes at the customer door, and record digital cash or UPI payment on delivery.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-xs hover:border-slate-300 hover:shadow-md transition">
              <div className="h-11 w-11 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-orange-600 mb-5">
                <Building2 size={20} />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">B2B Hotel &amp; Institutional Ledger</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Manage contract billing for boutique hotels, hospitals, and spas with automated linen piece counts, delivery challans, and monthly GST invoicing.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-xs hover:border-slate-300 hover:shadow-md transition">
              <div className="h-11 w-11 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-900 mb-5">
                <Lock size={20} />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Secure OTP Pickup Handover</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Prevent accidental delivery to the wrong person by validating a 4-digit WhatsApp OTP sent to the registered customer before unlocking handoff.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Standardized Bottom CTA Card (White Editorial Trust with 4 Cards) ── */}
      <section className="py-16 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1180px] w-full min-h-[520px] rounded-[28px] overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-center gap-10 p-8 md:p-14 bg-white border border-slate-200 shadow-sm relative mx-auto">
          {/* Background Layer 1 (Photo) */}
          <div
            className="absolute inset-0 bg-cover bg-right opacity-100 z-1"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=1600&q=80')" }}
          ></div>

          {/* Background Layer 2 (Fade Gradient) */}
          <div
            className="absolute inset-0 z-2"
            style={{
              background: 'linear-gradient(90deg, #ffffff 0%, #ffffff 44%, rgba(255, 255, 255, 0.75) 58%, rgba(255, 255, 255, 0.12) 80%, rgba(255, 255, 255, 0) 100%)',
            }}
          ></div>

          {/* Left Column Content (7 cols) */}
          <div className="relative z-10 lg:col-span-7 text-left">
            <span className="inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-orange-800 mb-4">
              ENTERPRISE LAUNDRY ARCHITECTURE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
              Turn Your Laundry Counter into a <span className="text-orange-600">Zero-Mixup Operation</span>
            </h2>
            <p className="text-base text-slate-600 leading-relaxed max-w-xl mb-7">
              Stop garment losses, speed up counter drop-offs with rapid barcode tagging, and cut customer call volume with automated ready-for-pickup WhatsApp messages.
            </p>

            {/* Action Buttons with Working Routing */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center', marginBottom: '28px' }}>
              {/* Start Free Trial (Redirects to Home page trial section) */}
              <a
                href="/#free-trial"
                style={{ background: '#ea580c', color: '#ffffff', fontWeight: 600, fontSize: '14px', padding: '13px 26px', borderRadius: '14px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 12px rgba(234, 88, 12, 0.25)', transition: 'all 0.2s ease' }}
              >
                Start Free Trial
                <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </a>

              {/* Chat on WhatsApp (Official Number: 7873844050) */}
              <a
                href="https://wa.me/917873844050?text=Hi%20Priyulabs%2C%20I%20want%20to%20get%20started%20with%20a%20free%20trial"
                target="_blank"
                rel="noopener noreferrer"
                style={{ background: '#ffffff', color: '#0f172a', fontWeight: 600, fontSize: '14px', padding: '12px 22px', borderRadius: '14px', textDecoration: 'none', border: '1px solid #cbd5e1', display: 'inline-flex', alignItems: 'center', gap: '8px', boxShadow: '0 2px 6px rgba(0, 0, 0, 0.03)', transition: 'all 0.2s ease' }}
              >
                <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
                Chat on WhatsApp
              </a>
            </div>

            {/* Bottom Trust Strip (Exact Match) */}
            <div className="flex flex-wrap gap-5 text-[13px] font-semibold text-slate-700 mt-6">
              <span className="inline-flex items-center gap-2">
                <svg width="15" height="15" fill="none" stroke="#ea580c" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>
                Complete Setup
              </span>
              <span className="inline-flex items-center gap-2">
                <svg width="15" height="15" fill="none" stroke="#ea580c" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>
                Easy to access
              </span>
              <span className="inline-flex items-center gap-2">
                <svg width="15" height="15" fill="none" stroke="#ea580c" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>
                24/7 Service
              </span>
            </div>
          </div>

          {/* Right Column Trust Stack (5 cols — 4 Cards Total) */}
          <div className="relative z-10 lg:col-span-5 flex flex-col gap-3 text-left">
            {/* Card 1: Made in India */}
            <div className="flex items-center justify-between gap-3.5 rounded-2xl border border-slate-200/90 bg-white/95 backdrop-blur-md p-3.5 sm:p-4 shadow-xs">
              <div className="flex items-center gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1e293b] text-white">
                  <Award size={18} />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">Made in India</div>
                  <div className="text-xs text-slate-500">Engineered for Indian Businesses</div>
                </div>
              </div>
              <span className="shrink-0 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-blue-700">
                National
              </span>
            </div>

            {/* Card 2: SECURE SSL */}
            <div className="flex items-center justify-between gap-3.5 rounded-2xl border border-slate-200/90 bg-white/95 backdrop-blur-md p-3.5 sm:p-4 shadow-xs">
              <div className="flex items-center gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#059669] text-white">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <div className="text-sm font-bold text-emerald-600">SECURE</div>
                  <div className="text-xs text-slate-500">SSL 256-Bit Bank Encryption</div>
                </div>
              </div>
              <span className="shrink-0 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                Verified
              </span>
            </div>

            {/* Card 3: OTP Pickup Security */}
            <div className="flex items-center justify-between gap-3.5 rounded-2xl border border-slate-200/90 bg-white/95 backdrop-blur-md p-3.5 sm:p-4 shadow-xs">
              <div className="flex items-center gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#7c3aed] text-white">
                  <Lock size={18} />
                </div>
                <div>
                  <div className="text-sm font-bold text-purple-600">OTP Delivery Shield</div>
                  <div className="text-xs text-slate-500">Zero Wrong-Customer Handover</div>
                </div>
              </div>
              <span className="shrink-0 rounded-full border border-purple-200 bg-purple-50 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-purple-700">
                Protected
              </span>
            </div>

            {/* Card 4: Trusted by MSME's */}
            <div className="flex items-center justify-between gap-3.5 rounded-2xl border border-slate-200/90 bg-white/95 backdrop-blur-md p-3.5 sm:p-4 shadow-xs">
              <div className="flex items-center gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#2563eb] text-white">
                  <CheckCircle2 size={18} />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">Trusted by MSME's</div>
                  <div className="text-xs font-mono text-slate-600">Udyam: UDYAM-OD-19-0177979</div>
                </div>
              </div>
              <span className="shrink-0 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-amber-800">
                Certified
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
