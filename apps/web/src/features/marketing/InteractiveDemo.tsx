import { AnimatePresence, motion } from 'framer-motion';
import { CreditCard, Mic, ScanLine, X } from 'lucide-react';
import { useState } from 'react';

type DemoTab = 'voice' | 'payment' | 'vision';
const tabs: { id: DemoTab; label: string; icon: typeof Mic }[] = [
  { id: 'voice', label: 'Voice POS', icon: Mic }, { id: 'payment', label: 'Payment', icon: CreditCard }, { id: 'vision', label: 'Vision AI', icon: ScanLine },
];

export function InteractiveDemo({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [tab, setTab] = useState<DemoTab>('voice'); const [complete, setComplete] = useState(false);
  const run = () => { setComplete(false); window.setTimeout(() => setComplete(true), 850); };
  return <AnimatePresence>{open && <motion.div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/65 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={onClose}>
    <motion.section role="dialog" aria-modal="true" aria-labelledby="demo-title" onMouseDown={event => event.stopPropagation()} initial={{ scale: .96, y: 14 }} animate={{ scale: 1, y: 0 }} exit={{ scale: .96, y: 14 }} className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-slate-900">
      <div className="flex items-start justify-between bg-indigo-950 p-6 text-white"><div><p className="eyebrow !text-indigo-200">Prototype interaction</p><h2 id="demo-title" className="mt-1 text-2xl font-black">Priyulabs Interactive Demo</h2></div><button className="rounded-lg p-2 hover:bg-white/10" aria-label="Close demo" onClick={onClose}><X /></button></div>
      <div className="flex gap-1 border-b border-slate-200 p-3 dark:border-slate-700">{tabs.map(({ id, label, icon: Icon }) => <button key={id} onClick={() => { setTab(id); setComplete(false); }} className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold ${tab === id ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-300'}`}><Icon size={16}/>{label}</button>)}</div>
      <div className="p-6"><DemoPanel tab={tab} complete={complete} /><button onClick={run} className="mt-6 rounded-xl bg-indigo-600 px-5 py-3 font-bold text-white hover:bg-indigo-700">Run simulated action</button><p className="mt-3 text-xs text-slate-500">This is a UI prototype; no voice, payment, or OCR service is called.</p></div>
    </motion.section>
  </motion.div>}</AnimatePresence>;
}
function DemoPanel({ tab, complete }: { tab: DemoTab; complete: boolean }) {
  const copy = { voice: ['Voice POS', 'Say “two masala chai and one croissant” to add demo items.'], payment: ['Payment terminal', 'Send the current total to a simulated payment terminal.'], vision: ['Invoice scan', 'Process a sample invoice with a simulated Vision AI result.'] }[tab];
  return <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-800"><h3 className="text-xl font-black">{copy[0]}</h3><p className="mt-2 text-slate-600 dark:text-slate-300">{copy[1]}</p><AnimatePresence mode="wait">{complete ? <motion.div key="done" initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} className="mt-5 rounded-xl bg-emerald-100 p-4 font-bold text-emerald-800">{tab === 'voice' ? 'Added 3 items · Total ₹245' : tab === 'payment' ? 'Payment approved · Reference PL-DEMO-238' : '47 items detected · Stock draft created'}</motion.div> : <motion.div key="idle" initial={{opacity:0}} animate={{opacity:1}} className="mt-5 rounded-xl border border-dashed border-slate-300 p-4 text-sm text-slate-500 dark:border-slate-600">Ready for a simulated action.</motion.div>}</AnimatePresence></div>;
}
