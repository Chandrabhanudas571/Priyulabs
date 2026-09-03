import { Router } from 'express';
import type { InvoiceScanResponse, ExpiryAlertItemDto } from '@priyulabs/contracts';

export const inventoryRouter = Router();

// Simulated Vision AI Invoice OCR scanning endpoint
inventoryRouter.post('/scan-invoice', (_req, res) => {
  const simulatedResponse: InvoiceScanResponse = {
    invoiceNumber: `INV-${Date.now().toString().slice(-5)}`,
    vendorName: 'Metro Cash & Carry Wholesale Ltd.',
    scannedAt: new Date().toISOString(),
    confidenceScore: 0.984,
    itemsDetected: [
      {
        itemCode: '8901234567890',
        name: 'Amul Butter 500g',
        batchNumber: 'B-24089',
        mrp: 275,
        purchaseRate: 242,
        quantity: 24,
        expiryDate: '2026-12-15',
      },
      {
        itemCode: '8909876543210',
        name: 'Fortune Sunlite Sunflower Oil 1L',
        batchNumber: 'B-77120',
        mrp: 145,
        purchaseRate: 122,
        quantity: 48,
        expiryDate: '2027-02-28',
      },
      {
        itemCode: '8901058852331',
        name: 'Maggi 2-Minute Masala Noodles 70g (Pack of 24)',
        batchNumber: 'B-99321',
        mrp: 336,
        purchaseRate: 290,
        quantity: 12,
        expiryDate: '2026-11-30',
      },
      {
        itemCode: '8901030928372',
        name: 'Aashirvaad Shudh Chakki Atta 5kg',
        batchNumber: 'B-11402',
        mrp: 260,
        purchaseRate: 228,
        quantity: 30,
        expiryDate: '2026-10-20',
      },
    ],
    totalValue: 21972,
  };

  return res.json(simulatedResponse);
});

// FEFO Expiry Shield Alerts
inventoryRouter.get('/expiry-alerts', (_req, res) => {
  const alerts: ExpiryAlertItemDto[] = [
    {
      id: 'exp-1',
      productName: 'Mother Dairy Toned Milk 500ml',
      category: 'Dairy',
      batchNumber: 'MD-883',
      quantityInStock: 14,
      daysRemaining: 2,
      status: 'CRITICAL',
    },
    {
      id: 'exp-2',
      productName: 'Britannia Good Day Butter Cookies 200g',
      category: 'FMCG',
      batchNumber: 'GD-1092',
      quantityInStock: 42,
      daysRemaining: 9,
      status: 'WARNING',
    },
    {
      id: 'exp-3',
      productName: 'Tata Sampann Toor Dal 1kg',
      category: 'Grocery',
      batchNumber: 'TS-4412',
      quantityInStock: 80,
      daysRemaining: 45,
      status: 'SAFE',
    },
  ];

  return res.json({ count: alerts.length, alerts });
});
