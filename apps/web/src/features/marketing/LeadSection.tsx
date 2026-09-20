import { Check } from 'lucide-react';
import { LeadForm } from '../leads/LeadForm';

export function LeadSection({ title = 'Transform your business in 10 minutes.' }: { title?: string }) {
  return (
    <section className="overflow-hidden rounded-3xl bg-indigo-950 py-16 text-white sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 sm:px-8 lg:grid-cols-12 items-center">
        <div className="lg:col-span-6 space-y-4">
          <span className="text-xs font-bold tracking-widest text-indigo-300 uppercase">
            Let’s Connect
          </span>
          <h2 className="text-3xl font-black sm:text-4xl">{title}</h2>
          <p className="text-base text-indigo-100 leading-relaxed">
            Tell us about your store or restaurant. Our regional engineering team will arrange a free 14-day trial and
            on-site hardware synchronization.
          </p>
          <div className="pt-2 text-xs text-indigo-200 space-y-2">
            <p className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                <Check size={12} strokeWidth={2.5} />
              </span>
              <span>100% Free 14-day trial with full feature access</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                <Check size={12} strokeWidth={2.5} />
              </span>
              <span>Zero hardware lock-in • Setup in under 10 minutes</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                <Check size={12} strokeWidth={2.5} />
              </span>
              <span>Dedicated regional support (+91 78738 44050)</span>
            </p>
          </div>
        </div>

        <div className="lg:col-span-6">
          <LeadForm />
        </div>
      </div>
    </section>
  );
}
