import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { leadRouter } from './modules/leads/lead.router.js';
import { posRouter } from './modules/pos/pos.router.js';
import { inventoryRouter } from './modules/inventory/inventory.router.js';
import { tenantsRouter } from './modules/tenants/tenants.router.js';

const app = express();

const allowedOrigins = process.env.WEB_ORIGIN?.split(',') ?? [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, server-to-server)
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

app.use(express.json({ limit: '64kb' }));

// Friendly API root info to guide any browser visits directly to the frontend
app.get('/', (_req, res) => {
  res.json({
    service: 'Priyulabs Digital Modular Monolith API',
    version: '0.1.0',
    status: 'online',
    frontendUrl: 'http://localhost:3000',
    message: 'Welcome to Priyulabs API. To view the user interface, please open http://localhost:3000 in your browser.',
    modules: {
      health: '/health',
      leads: '/api/leads',
      pos: '/api/pos',
      inventory: '/api/inventory',
      tenants: '/api/tenants',
    },
  });
});

app.get('/health', (_req, res) =>
  res.json({
    status: 'ok',
    service: 'priyulabs-api',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  })
);

// Bounded Feature Modules
app.use('/api/leads', leadRouter);
app.use('/api/pos', posRouter);
app.use('/api/inventory', inventoryRouter);
app.use('/api/tenants', tenantsRouter);

// 404 handler for API routes
app.use((_req, res) => {
  res.status(404).json({
    error: 'API endpoint not found',
    hint: 'If you are looking for the web UI, visit http://localhost:5173',
  });
});

const port = Number(process.env.PORT ?? 4000);
app.listen(port, '0.0.0.0', () => {
  console.log(`[Priyulabs Monolith API] listening on port ${port}`);
  console.log(`[Priyulabs Web UI] available at http://localhost:3000`);
});
