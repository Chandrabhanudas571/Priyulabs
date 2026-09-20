import { useState } from 'react';
import { Bell, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export function HospitalityPage() {
  const [contact, setContact] = useState('');
  const [joined, setJoined] = useState(false);

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contact.trim()) {
      setJoined(true);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-80px)] flex-col justify-between">
      {/* Hospitality Hero Section */}
      <section className="flex flex-1 items-center justify-center bg-gradient-to-b from-slate-50 via-white to-slate-50 py-16 text-center dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 sm:py-24">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100/60 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400">
            <Bell size={26} />
          </div>

          <span className="inline-block rounded-full bg-[#b76e79]/10 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-[#b76e79]">
            In Active Development • Launching Soon
          </span>

          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl sm:leading-tight">
            The Future of Restaurant, Cafe &amp; Hotel OS —{' '}
            <span className="bg-gradient-to-r from-[#b76e79] to-[#e29b88] bg-clip-text text-transparent">
              Coming Soon.
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
            Hum restaurants, cafes, cloud kitchens, bakeries aur hotels ke liye India ka smartest{' '}
            <strong className="text-slate-900 dark:text-white">All-in-One F&amp;B Operating System</strong> craft kar rahe
            hain. We will offer this service in our upcoming major release!
          </p>

          {/* VIP Waitlist Box */}
          <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-md dark:border-slate-800 dark:bg-slate-900 sm:p-8">
            <div className="mb-4 text-center">
              <h3 className="text-base font-bold text-slate-900 dark:text-white sm:text-lg">
                Join 250+ F&amp;B Owners on the VIP Early Access Waitlist
              </h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
                Get notified on day one + unlock an exclusive{' '}
                <strong className="text-slate-800 dark:text-slate-200">50% Early-Bird Lifetime Discount</strong>.
              </p>
            </div>

            {!joined ? (
              <form onSubmit={handleWaitlistSubmit} className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="Enter your WhatsApp number or Email"
                  required
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-[#b76e79] focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-xl bg-gradient-to-r from-[#b76e79] to-[#c97d88] px-6 py-3 text-sm font-bold text-white shadow-md transition hover:opacity-95"
                >
                  Join VIP Waitlist
                </button>
              </form>
            ) : (
              <div className="flex items-center justify-center gap-2 rounded-xl bg-emerald-50 p-4 text-sm font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
                <CheckCircle2 size={18} />
                <span>You&apos;re on the VIP Waitlist! We will reach out on WhatsApp with exclusive beta access.</span>
              </div>
            )}
          </div>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/"
              className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-900 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              Explore Live Retail OS →
            </Link>
            <a
              href="https://wa.me/917873844050?text=Hi%20Priyulabs!%20Tell%20me%20more%20about%20Hospitality%20Tech%20launch."
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-emerald-300 bg-emerald-50 px-6 py-3 text-sm font-bold text-emerald-800 shadow-sm transition hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-200"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Clean Minimal Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
        <div className="mx-auto max-w-7xl px-4">
          <p>© 2026 Priyulabs Digital. All Rights Reserved. | Hospitality Tech — In Active Development.</p>
        </div>
      </footer>
    </div>
  );
}
