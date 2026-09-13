import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export function PharmaciesChemistPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Sub-Navigation */}
      <nav className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <a href="/solutions" className="text-xs font-semibold text-slate-500 hover:text-slate-900">
              Overview
            </a>
            <span className="text-xs font-bold text-slate-900">HEALTHCARE & PHARMACY OS</span>
          </div>
          <a
            href="https://wa.me/917849074050?text=Hi%20Priyulabs%20Team%2C%20I%20want%20to%20see%20a%20demo"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-slate-900 px-3.5 py-1.5 text-xs font-bold text-white transition hover:bg-slate-800"
          >
            Talk to Specialist
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 text-center">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-1 text-xs font-bold uppercase tracking-wider text-orange-800">
            HEALTHCARE & PHARMACY OS
          </span>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Complete Dispensing & Expiry Shield for Chemists
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-600 leading-relaxed">
            Never face expired strip losses or drug audit fines. Automatic batch quarantine, substitute chemical search, and doctor prescription digitization in one smart POS.
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

              {/* Chat on WhatsApp (Official Number: 7849074050) */}
              <a
                href="https://wa.me/917849074050?text=Hi%20Priyulabs%2C%20I%20want%20to%20get%20started%20with%20a%20free%20trial"
                target="_blank"
                rel="noopener noreferrer"
                style={{ background: '#ffffff', color: '#0f172a', fontWeight: 600, fontSize: '14px', padding: '12px 22px', borderRadius: '14px', textDecoration: 'none', border: '1px solid #cbd5e1', display: 'inline-flex', alignItems: 'center', gap: '8px', boxShadow: '0 2px 6px rgba(0, 0, 0, 0.03)', transition: 'all 0.2s ease' }}
              >
                <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
                Chat on WhatsApp
              </a>
            </div>

          {/* Standardized 4-Pillar Hero Sub-Strip */}
          <div className="mx-auto mt-12 flex max-w-4xl flex-wrap items-center justify-center gap-3 rounded-2xl border border-slate-200/80 bg-white/80 px-6 py-3 text-xs font-medium text-slate-600 shadow-xs backdrop-blur-sm sm:text-[13px]">
            <span>Schedule H/H1 Prescription Billing POS</span>
            <span className="text-slate-300">✦</span>
            <span>Automated FEFO & Salt Substitute ERP</span>
            <span className="text-slate-300">✦</span>
            <span>WhatsApp Chronic Re-Order Portal</span>
            <span className="text-slate-300">✦</span>
            <span>Neighborhood Patient Retention Ads</span>
          </div>
        </div>
      </section>

      {/* Metrics Ribbon */}
      <section className="border-y border-slate-200 bg-slate-50/70 py-12">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 text-center sm:grid-cols-4 sm:px-6 lg:px-8">
          
            <div>
              <div className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">0%</div>
              <div className="mt-1 text-xs font-semibold text-slate-500">Expired Strip Inadvertently Dispensed</div>
            </div>
          
            <div>
              <div className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">100%</div>
              <div className="mt-1 text-xs font-semibold text-slate-500">Schedule H / H1 Audit Regulatory Compliance</div>
            </div>
          
            <div>
              <div className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">&lt; 2s</div>
              <div className="mt-1 text-xs font-semibold text-slate-500">Substitute Salt Molecule Search Speed</div>
            </div>
          
            <div>
              <div className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">99.8%</div>
              <div className="mt-1 text-xs font-semibold text-slate-500">Batch & Strip Inventory Reconciliation</div>
            </div>
          
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600">Core Capabilities</span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Engineered for Counter Speed & Zero Errors
            </h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            
              <div className="rounded-2xl border border-slate-200 p-8 shadow-xs transition hover:border-slate-300">
                <h3 className="text-lg font-bold text-slate-900">Intelligent FEFO Expiry Shield</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">Barcode scans automatically prioritize earliest expiry batches and lock expired units from counter billing.</p>
              </div>
            
              <div className="rounded-2xl border border-slate-200 p-8 shadow-xs transition hover:border-slate-300">
                <h3 className="text-lg font-bold text-slate-900">Schedule H & H1 Digital Register</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">Mandatory patient name, doctor registration number, and prescription capture with 1-click audit reporting.</p>
              </div>
            
              <div className="rounded-2xl border border-slate-200 p-8 shadow-xs transition hover:border-slate-300">
                <h3 className="text-lg font-bold text-slate-900">Substitute Salt & Molecule Finder</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">Instant generic and alternative brand suggestions matching exact chemical strength when primary stock is low.</p>
              </div>
            
              <div className="rounded-2xl border border-slate-200 p-8 shadow-xs transition hover:border-slate-300">
                <h3 className="text-lg font-bold text-slate-900">Automated Distributor RTV Ledgers</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">Generate debit notes and return manifests for 90-day near-expiry medicines before stock becomes non-refundable.</p>
              </div>
            
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          WHITE EDITORIAL TRUST BOTTOM CTA
      ────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-slate-50/60 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex justify-center">
          <div className="max-w-[1180px] w-full min-h-[500px] rounded-[28px] overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-center gap-10 p-8 md:p-14 bg-white border border-slate-200 shadow-sm relative dark:bg-slate-900 dark:border-slate-800">
            {/* Background Visual Layers */}
            <div
              className="absolute inset-0 bg-cover bg-right opacity-100 z-1"
              style={{ backgroundImage: `url('${'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1600&q=80'}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 lg:via-white/80 to-white/40 lg:to-transparent z-2 dark:from-slate-900 dark:via-slate-900/90 lg:dark:via-slate-900/80 dark:to-slate-900/40" />

            {/* Left Content Column */}
            <div className="lg:col-span-7 z-10 flex flex-col justify-center text-left">
              <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50/90 px-3.5 py-1 text-[11px] font-bold tracking-wider text-orange-800 uppercase w-max mb-4 dark:border-orange-900/40 dark:bg-orange-950/40 dark:text-orange-300">
                PHARMACY & CHEMIST DISPENSING OS
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-slate-900 tracking-tight leading-[1.18] dark:text-white">
                Prevent Expired Drug Audits with <span className="text-orange-600">Automated FEFO Compliance</span>
              </h2>
              <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl dark:text-slate-300">
                Doctor prescription record keeping, Schedule H/H1 restricted sale logs, substitute salt search, and distributor return-to-vendor ledgers.
              </p>

              {/* CTA Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="/#cta"
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold px-7 py-3.5 text-sm shadow-sm transition-all hover:-translate-y-0.5 no-underline dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
                >
                  Start Free Trial &rarr;
                </a>
                <a
                  href="https://wa.me/917849074050?text=Hi%20Priyulabs%20Team%2C%20I%20want%20to%20see%20a%20demo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-bold px-6 py-3.5 text-sm shadow-xs transition-all hover:-translate-y-0.5 no-underline dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                  Chat on WhatsApp
                </a>
              </div>

              {/* Left Bottom Trust Strip */}
              <div className="flex flex-wrap gap-5 text-[13px] font-semibold text-slate-700 mt-6 dark:text-slate-300">
                <span className="inline-flex items-center gap-2">
                  <svg width="15" height="15" fill="none" stroke="#ea580c" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Complete Setup
                </span>
                <span className="inline-flex items-center gap-2">
                  <svg width="15" height="15" fill="none" stroke="#ea580c" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Easy to access
                </span>
                <span className="inline-flex items-center gap-2">
                  <svg width="15" height="15" fill="none" stroke="#ea580c" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  24/7 Service
                </span>
              </div>
            </div>

            {/* Right Trust Stack (3-Card Verified Column) */}
            <div className="lg:col-span-5 flex flex-col gap-3.5 z-10 text-left">
              {/* Card 1 (National) */}
              <div className="rounded-2xl border border-slate-200/90 bg-white/95 backdrop-blur-md p-4 sm:p-5 shadow-xs flex items-center justify-between gap-4 dark:border-slate-800 dark:bg-slate-900/95">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#1e293b] text-white flex items-center justify-center shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="8" r="6" />
                      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white">Made in India</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Engineered for Indian Businesses</div>
                  </div>
                </div>
                <span className="rounded-full px-2.5 py-0.5 text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-wider shrink-0 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800">
                  National
                </span>
              </div>

              {/* Card 2 (Verified) */}
              <div className="rounded-2xl border border-slate-200/90 bg-white/95 backdrop-blur-md p-4 sm:p-5 shadow-xs flex items-center justify-between gap-4 dark:border-slate-800 dark:bg-slate-900/95">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#059669] text-white flex items-center justify-center shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#059669] dark:text-emerald-400">SECURE</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">SSL 256-Bit Bank Encryption</div>
                  </div>
                </div>
                <span className="rounded-full px-2.5 py-0.5 text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase tracking-wider shrink-0 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800">
                  Verified
                </span>
              </div>

              {/* Card 3 (Certified) */}
              <div className="rounded-2xl border border-slate-200/90 bg-white/95 backdrop-blur-md p-4 sm:p-5 shadow-xs flex items-center justify-between gap-4 dark:border-slate-800 dark:bg-slate-900/95">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#2563eb] text-white flex items-center justify-center shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white">Trusted by MSME's</div>
                    <div className="text-xs font-mono tracking-tight text-slate-600 dark:text-slate-400">Udyam: UDYAM-OD-19-0177979</div>
                  </div>
                </div>
                <span className="rounded-full px-2.5 py-0.5 text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200 uppercase tracking-wider shrink-0 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800">
                  Certified
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
