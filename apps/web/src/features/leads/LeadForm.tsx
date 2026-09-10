import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z
  .object({
    name: z.string().min(2, 'Enter your full name'),
    service: z.string().min(1, 'Please select a service'),
    customRequirement: z.string().optional(),
    mobile: z.string().regex(/^[0-9+\- ()]{7,20}$/, 'Enter a valid mobile number'),
  })
  .refine(
    (data) => {
      if (data.service === 'Custom') {
        const words = data.customRequirement?.trim() ? data.customRequirement.trim().split(/\s+/) : [];
        return words.length >= 1 && words.length <= 100;
      }
      return true;
    },
    {
      message: 'Please describe what you need (maximum 100 words allowed)',
      path: ['customRequirement'],
    }
  );

type Values = z.infer<typeof schema>;

export function LeadForm() {
  const [sent, setSent] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      service: 'POS',
      customRequirement: '',
      mobile: '',
    },
  });

  const selectedService = watch('service');

  const handleCustomInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    const words = text.trim() ? text.trim().split(/\s+/) : [];
    if (words.length > 100) {
      const truncated = words.slice(0, 100).join(' ');
      setValue('customRequirement', truncated, { shouldValidate: true });
      setWordCount(100);
    } else {
      setValue('customRequirement', text, { shouldValidate: true });
      setWordCount(words.length);
    }
  };

  const submit = async (values: Values) => {
    await fetch(`${import.meta.env.VITE_API_URL ?? 'http://localhost:4000'}/api/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...values,
        storeName: values.service === 'Custom' ? `Custom: ${values.customRequirement?.slice(0, 60)}` : values.service,
      }),
    }).catch(() => undefined);
    setSent(true);
  };

  if (sent) {
    return (
      <div className="rounded-2xl bg-white p-7 font-bold text-slate-900 shadow-xl dark:bg-slate-900 dark:text-white">
        ✨ Thank you! Your request has been submitted. Our team will contact you within 15 minutes.
      </div>
    );
  }

  return (
    <form
      className="grid gap-3.5 rounded-2xl bg-white p-6 text-slate-900 shadow-xl dark:bg-slate-900 dark:text-slate-100"
      onSubmit={handleSubmit(submit)}
      noValidate
    >
      <label className="grid gap-1 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
        Your Name *
        <input
          placeholder="Enter your full name (e.g. Ramesh Kumar)"
          className="rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-600 focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          {...register('name')}
        />
        {errors.name && <small className="text-xs text-rose-600">{errors.name.message}</small>}
      </label>

      <label className="grid gap-1 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
        Choose Service / Category *
        <select
          className="rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-600 focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          {...register('service')}
        >
          <option value="POS">POS (Smart POS &amp; Billing)</option>
          <option value="Website Building">Website Building</option>
          <option value="Digital Marketing">Digital Marketing</option>
          <option value="Complete Management System">Complete Management System</option>
          <option value="Custom">Custom</option>
        </select>
        {errors.service && <small className="text-xs text-rose-600">{errors.service.message}</small>}
      </label>

      {selectedService === 'Custom' && (
        <div className="grid gap-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              What do you need? (Custom Requirements) *
            </span>
            <span
              className={`text-[11px] font-bold ${
                wordCount >= 100 ? 'text-rose-600' : wordCount >= 90 ? 'text-amber-500' : 'text-slate-400'
              }`}
            >
              {wordCount} / 100 words
            </span>
          </div>
          <textarea
            rows={3}
            placeholder="Describe what you need in detail (maximum 100 words)..."
            className="rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-600 focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-white resize-y min-h-[75px]"
            onChange={handleCustomInput}
          />
          {wordCount >= 100 && (
            <small className="text-xs text-rose-600 font-semibold">Word limit reached (Max 100 words allowed).</small>
          )}
          {errors.customRequirement && (
            <small className="text-xs text-rose-600">{errors.customRequirement.message}</small>
          )}
        </div>
      )}

      <label className="grid gap-1 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
        Phone / WhatsApp Number *
        <input
          type="tel"
          placeholder="WhatsApp Number (+91 7788899994)"
          className="rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-600 focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          {...register('mobile')}
        />
        {errors.mobile && <small className="text-xs text-rose-600">{errors.mobile.message}</small>}
      </label>

      <button
        disabled={isSubmitting}
        type="submit"
        className="mt-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white shadow-md shadow-indigo-600/20 transition hover:bg-indigo-700 disabled:opacity-50 cursor-pointer"
      >
        {isSubmitting ? 'Submitting…' : 'Submit & Get Early Access 🚀'}
      </button>

      <p className="text-center text-[11px] text-slate-400">
        🔒 Your inquiry is securely received. Our team will contact you within 15 minutes.
      </p>
    </form>
  );
}
