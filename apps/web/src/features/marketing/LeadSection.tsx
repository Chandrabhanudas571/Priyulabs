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
          <div className="pt-2 text-xs text-indigo-200 space-y-1">
            <p>✓ 100% Free 14-day trial with full feature access</p>
            <p>✓ Zero hardware lock-in • Setup in under 10 minutes</p>
            <p>✓ Dedicated regional support (+91 78490 74050)</p>
          </div>
        </div>

        <div className="lg:col-span-6">
          <LeadForm />
        </div>
      </div>
    </section>
  );
}
