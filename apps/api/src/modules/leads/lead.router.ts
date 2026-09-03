import { Router } from 'express';
import { z } from 'zod';
import type { LeadDto } from '@priyulabs/contracts';

const leadSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(120),
  storeName: z.string().min(2, 'Business name must be at least 2 characters').max(160),
  mobile: z.string().regex(/^[0-9+\- ()]{7,20}$/, 'Invalid phone number format'),
  sector: z.string().optional(),
  source: z.string().optional(),
});

// In-memory leads repository (modular monolith persistence boundary)
const inMemoryLeads: LeadDto[] = [
  {
    id: 'lead-001',
    name: 'Rohit Sharma',
    storeName: 'Sharma Supermarket',
    mobile: '+91 98765 43210',
    sector: 'supermarket',
    source: 'web-landing',
    createdAt: new Date().toISOString(),
  },
];

export const leadRouter = Router();

leadRouter.get('/', (_req, res) => {
  res.json({ count: inMemoryLeads.length, leads: inMemoryLeads });
});

leadRouter.post('/', (req, res) => {
  const result = leadSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(422).json({
      error: 'Invalid lead data',
      details: result.error.flatten().fieldErrors,
    });
  }

  const newLead: LeadDto = {
    id: `lead-${Date.now()}`,
    name: result.data.name,
    storeName: result.data.storeName,
    mobile: result.data.mobile,
    sector: result.data.sector ?? 'general',
    source: result.data.source ?? 'web',
    createdAt: new Date().toISOString(),
  };

  inMemoryLeads.unshift(newLead);
  return res.status(201).json({
    success: true,
    message: 'Lead captured successfully. Our team will get in touch shortly.',
    lead: newLead,
  });
});
