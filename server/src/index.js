import express from 'express';
import cors from 'cors';
import { config } from './config.js';
import { authRouter } from './routes/auth.js';

const app = express();

app.use(express.json());
app.use(
  cors({
    origin(origin, cb) {
      // Allow same-origin / tools with no Origin header (curl, server-to-server).
      if (!origin || config.corsOrigins.includes(origin)) return cb(null, true);
      return cb(new Error('Origin not allowed by CORS: ' + origin));
    },
  })
);

app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.use('/api/auth', authRouter);

// Fallback 404 for unknown API routes.
app.use('/api', (_req, res) => res.status(404).json({ error: 'Not found.' }));

app.listen(config.port, () => {
  console.log(`Mindful CPA auth API listening on http://localhost:${config.port}`);
});
