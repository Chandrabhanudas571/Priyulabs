import { AnimatePresence, motion } from 'framer-motion';
import { ShieldCheck, X } from 'lucide-react';

export type PolicyType = 'about' | 'privacy' | 'terms' | 'refund';

interface PolicyModalProps {
  policy: PolicyType | null;
  onClose: () => void;
}

const policyData: Record<PolicyType, { title: string; subtitle: string; content: React.ReactNode }> = {
  about: {
    title: 'About Priyulabs Digital',
    subtitle: 'Startup India & DPIIT Recognized SaaS Enterprise',
    content: (
      <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
        <h4 className="font-bold text-slate-900 dark:text-white">Our Mission</h4>
        <p>
          <strong>Priyulabs</strong> (PriyuLabs Technologies Pvt. Ltd.) is an Indian SaaS startup recognized under the{' '}
          <strong>Startup India & DPIIT initiative</strong>. Our goal is to empower 1.2+ Crore local retail merchants,
          supermarkets, cafes, and apparel stores with AI-powered retail operating systems.
        </p>
        <h4 className="font-bold text-slate-900 dark:text-white">What We Solve</h4>
        <p>
          We eliminate fragmented retail workflows by unifying Voice POS billing, ERP inventory, staff selfie
          attendance, 1-Click GST filing, and zero-fraud payments into one single, offline-first dashboard.
        </p>
        <h4 className="font-bold text-slate-900 dark:text-white">Company & Contact Info</h4>
        <div className="rounded-xl bg-slate-100 p-4 dark:bg-slate-800">
          <p><strong>Brand:</strong> Priyulabs (PriyuLabs Technologies Pvt. Ltd.)</p>
          <p><strong>Registered Office:</strong> 279, Kapileshwar - Sundarpada Rd, Basisthanagar, Old Town, Bhubaneswar, Odisha 751002.</p>
          <p><strong>Phone:</strong> <a className="text-indigo-600 dark:text-indigo-400" href="tel:+917849074050">+91 78490 74050</a></p>
          <p><strong>Email:</strong> <a className="text-indigo-600 dark:text-indigo-400" href="mailto:priylabspos@gmail.com">priylabspos@gmail.com</a></p>
        </div>
      </div>
    ),
  },
  privacy: {
    title: 'Privacy Policy',
    subtitle: 'Strict Indian Data Protection & Sovereignty',
    content: (
      <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
        <h4 className="font-bold text-slate-900 dark:text-white">1. Data Protection & Sovereignty</h4>
        <p>
          Your store’s financial data, customer numbers, billing history, and stock records are 100% encrypted using
          256-bit AES encryption. Priyulabs stores all database records strictly on Tier-4 data centers located within
          the Republic of India.
        </p>
        <h4 className="font-bold text-slate-900 dark:text-white">2. Information We Collect</h4>
        <p>
          When you register for a free trial or contact us, we collect your Name, Shop Name, and Phone Number for account
          provisioning, on-site setup assistance, and billing invoice generation.
        </p>
        <h4 className="font-bold text-slate-900 dark:text-white">3. Zero Third-Party Sale</h4>
        <p>
          Priyulabs strictly does NOT sell or monetize your store data, customer transaction histories, or inventory
          figures to any third-party advertisers or competitors.
        </p>
      </div>
    ),
  },
  terms: {
    title: 'Terms & Conditions',
    subtitle: 'Transparent Service Terms & SLA Commitments',
    content: (
      <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
        <h4 className="font-bold text-slate-900 dark:text-white">1. Free Trial & Subscriptions</h4>
        <p>
          New users are entitled to a 14-day full feature trial without credit card requirements. Setup and on-site
          hardware sync are provided free of cost during the trial phase.
        </p>
        <h4 className="font-bold text-slate-900 dark:text-white">2. Offline Billing & Data Sync</h4>
        <p>
          Priyulabs functions locally on your device in offline mode. When internet connection is restored, changes
          automatically sync with cloud backups with zero data loss.
        </p>
        <h4 className="font-bold text-slate-900 dark:text-white">3. Support SLA</h4>
        <p>
          All business tier users receive dedicated 24/7 WhatsApp and phone support (Call: +91 78490 74050, Email:
          priylabspos@gmail.com) with a guaranteed response window under 15 minutes.
        </p>
      </div>
    ),
  },
  refund: {
    title: 'Refund & Cancellation Policy',
    subtitle: '30-Day Money-Back Guarantee',
    content: (
      <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
        <h4 className="font-bold text-slate-900 dark:text-white">1. 30-Day Money-Back Guarantee</h4>
        <p>
          If you choose a paid annual subscription after your free trial and find that Priyulabs does not fit your store
          requirements, you can request a 100% full refund within 30 days of purchase.
        </p>
        <h4 className="font-bold text-slate-900 dark:text-white">2. Cancellation Anytime</h4>
        <p>
          You can cancel your subscription at any time with 1-click from your billing dashboard with zero penalty or exit
          lock-in.
        </p>
      </div>
    ),
  },
};

export function PolicyModal({ policy, onClose }: PolicyModalProps) {
  if (!policy) return null;
  const data = policyData[policy];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 grid place-items-center bg-slate-950/70 p-4 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          role="dialog"
          aria-modal="true"
          className="relative max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl dark:bg-slate-900 sm:p-8"
          initial={{ scale: 0.95, y: 15 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 15 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start justify-between border-b border-slate-200 pb-4 dark:border-slate-800">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400">
                <ShieldCheck size={16} />
                {data.subtitle}
              </div>
              <h3 className="mt-1 text-2xl font-black text-slate-900 dark:text-white">{data.title}</h3>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
              aria-label="Close dialog"
            >
              <X size={20} />
            </button>
          </div>

          <div className="py-6">{data.content}</div>

          <div className="flex justify-end border-t border-slate-200 pt-4 dark:border-slate-800">
            <button
              onClick={onClose}
              className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-indigo-700"
            >
              I Understand & Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
