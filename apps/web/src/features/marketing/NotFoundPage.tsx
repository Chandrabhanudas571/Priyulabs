import { Link } from 'react-router-dom';
import { ArrowLeft, Home, Compass } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 py-24 text-center">
      <div className="rounded-2xl bg-indigo-50 p-4 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400">
        <Compass size={48} className="animate-spin-slow" />
      </div>
      <p className="mt-6 text-sm font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
        404 Page Not Found
      </p>
      <h1 className="mt-2 text-4xl font-black text-slate-900 dark:text-white sm:text-5xl">
        Looking for a Priyulabs page?
      </h1>
      <p className="mt-4 max-w-md text-base text-slate-600 dark:text-slate-300">
        The URL you requested does not exist or may have moved. Use one of our quick links below to get right back on
        track.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-bold text-white shadow-lg shadow-indigo-600/25 transition hover:bg-indigo-700"
        >
          <Home size={18} />
          Go to Platform Home
        </Link>
        <Link
          to="/solutions"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 font-bold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
        >
          <ArrowLeft size={18} />
          Explore Business Solutions
        </Link>
      </div>
    </div>
  );
}
