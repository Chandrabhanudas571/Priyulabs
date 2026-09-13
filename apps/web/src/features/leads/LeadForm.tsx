import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Check, ShieldCheck, Send } from 'lucide-react';

const schema = z
  .object({
    name: z.string().min(2, 'Enter your full name'),
    businessType: z.string().min(1, 'Please select your business type'),
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
      businessType: '',
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
        storeName: values.businessType || (values.service === 'Custom' ? `Custom: ${values.customRequirement?.slice(0, 60)}` : values.service),
      }),
    }).catch(() => undefined);
    setSent(true);
  };

    return (
      <div className="rounded-2xl bg-white p-7 font-bold text-slate-900 shadow-xl dark:bg-slate-900 dark:text-white flex items-center gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <Check size={18} strokeWidth={2.5} />
        </span>
        <span>Thank you! Your request has been submitted. Our team will contact you within 15 minutes.</span>
      </div>
    );

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
        {errors.name && <small className="text-xs text-rose-600">{errors.name?.message}</small>}
      </label>

            <label className="grid gap-1 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
        Select Your Business Type *
        <select
          className="rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-600 focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          {...register('businessType')}
          defaultValue=""
        >
          <option value="" disabled>Select Your Business Type</option>
          <optgroup label="Food &amp; Beverage / Dining">
            <option value="Restaurants &amp; Fine Dining">Restaurants &amp; Fine Dining</option>
            <option value="Cafes &amp; Chai Bars">Cafes &amp; Chai Bars</option>
            <option value="QSR &amp; Fast Food">QSR &amp; Fast Food</option>
            <option value="Bakeries &amp; Patisseries">Bakeries &amp; Patisseries</option>
            <option value="Cloud Kitchens &amp; Catering">Cloud Kitchens &amp; Catering</option>
            <option value="Bars, Pubs &amp; Breweries">Bars, Pubs &amp; Breweries</option>
          </optgroup>
          <optgroup label="Retail &amp; Supermarkets">
            <option value="Grocery, Supermarkets &amp; Kirana">Grocery, Supermarkets &amp; Kirana</option>
            <option value="Electronics &amp; Mobile Shops">Electronics &amp; Mobile Shops</option>
            <option value="Footwear &amp; Leather Stores">Footwear &amp; Leather Stores</option>
            <option value="Jewellery Showrooms">Jewellery Showrooms</option>
            <option value="Watch Stores &amp; Horology">Watch Stores &amp; Horology</option>
            <option value="Bookstores &amp; Stationery">Bookstores &amp; Stationery</option>
          </optgroup>
          <optgroup label="Beauty &amp; Fashion">
            <option value="Clothing Brands &amp; Apparel Boutiques">Clothing Brands &amp; Apparel Boutiques</option>
            <option value="Salons, Spas &amp; Beauty Parlours">Salons, Spas &amp; Beauty Parlours</option>
            <option value="Cosmetics &amp; Skincare Stores">Cosmetics &amp; Skincare Stores</option>
          </optgroup>
          <optgroup label="Services &amp; Fitness">
            <option value="Gyms, Fitness Studios &amp; Yoga Centers">Gyms, Fitness Studios &amp; Yoga Centers</option>
            <option value="Dry Cleaners &amp; Laundry Shops">Dry Cleaners &amp; Laundry Shops</option>
          </optgroup>
          <option value="Other Retail / Commercial Business">Other Retail / Commercial Business</option>
        </select>
        {errors.businessType && <small className="text-xs text-rose-600">{errors.businessType?.message}</small>}
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
        {errors.service && <small className="text-xs text-rose-600">{errors.service?.message}</small>}
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
            <small className="text-xs text-rose-600">{errors.customRequirement?.message}</small>
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
        {errors.mobile && <small className="text-xs text-rose-600">{errors.mobile?.message}</small>}
      </label>

      <button
        disabled={isSubmitting}
        type="submit"
        className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white shadow-md shadow-indigo-600/20 transition hover:bg-indigo-700 disabled:opacity-50 cursor-pointer"
      >
        <span>{isSubmitting ? 'Submitting…' : 'Submit & Get Early Access'}</span>
        {!isSubmitting && <Send size={15} strokeWidth={2} />}
      </button>

      <p className="flex items-center justify-center gap-1.5 text-center text-[11px] text-slate-400">
        <ShieldCheck size={13} className="text-slate-400 shrink-0" />
        <span>Your inquiry is securely received. Our team will contact you within 15 minutes.</span>
      </p>
    </form>
  );
}
