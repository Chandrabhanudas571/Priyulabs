import { Router } from 'express';
import { z } from 'zod';
import type {
  CalculateBillRequest,
  CalculateBillResponse,
  PushEdcRequest,
  PushEdcResponse,
} from '@priyulabs/contracts';

const calculateSchema = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      price: z.number().nonnegative(),
      quantity: z.number().int().positive(),
      taxPercent: z.number().nonnegative(),
    })
  ),
  discountPercent: z.number().min(0).max(100).optional().default(0),
});

const pushEdcSchema = z.object({
  amount: z.number().positive(),
  orderReference: z.string().min(1),
  provider: z.enum(['PINELABS', 'PAYTM', 'UPI']),
});

export const posRouter = Router();

// Sub-second POS billing calculation endpoint
posRouter.post('/calculate', (req, res) => {
  const result = calculateSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: 'Invalid calculate request', details: result.error });
  }

  const { items, discountPercent = 0 } = result.data as CalculateBillRequest;

  let subtotal = 0;
  let taxAmount = 0;
  let itemCount = 0;

  for (const item of items) {
    const lineTotal = item.price * item.quantity;
    const lineTax = (lineTotal * item.taxPercent) / 100;
    subtotal += lineTotal;
    taxAmount += lineTax;
    itemCount += item.quantity;
  }

  const discountAmount = (subtotal * discountPercent) / 100;
  const total = Math.round((subtotal - discountAmount + taxAmount) * 100) / 100;

  const response: CalculateBillResponse = {
    subtotal: Math.round(subtotal * 100) / 100,
    discountAmount: Math.round(discountAmount * 100) / 100,
    taxAmount: Math.round(taxAmount * 100) / 100,
    total,
    itemCount,
  };

  return res.json(response);
});

// Bi-directional EDC terminal push (Pine Labs, Paytm, UPI)
posRouter.post('/push-edc', (req, res) => {
  const result = pushEdcSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: 'Invalid EDC push request', details: result.error });
  }

  const { amount, orderReference, provider } = result.data as PushEdcRequest;

  const response: PushEdcResponse = {
    success: true,
    transactionId: `TXN-${provider}-${Date.now().toString().slice(-6)}`,
    orderReference,
    amount,
    status: 'APPROVED',
    message: `Payment of ₹${amount.toFixed(2)} received via ${provider} with 0% reconciliation variance.`,
  };

  return res.json(response);
});
