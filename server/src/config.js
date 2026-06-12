import 'dotenv/config';

// Central place for environment-driven settings, with sane dev defaults so the
// server still boots from a fresh clone before anyone creates a .env file.
export const config = {
  port: Number(process.env.PORT) || 4000,
  jwtSecret: process.env.JWT_SECRET || 'dev-only-insecure-secret-change-me',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  corsOrigins: (process.env.CORS_ORIGIN || 'http://localhost:5173')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean),
};

if (config.jwtSecret === 'dev-only-insecure-secret-change-me') {
  console.warn('[config] Using insecure default JWT secret. Set JWT_SECRET in .env before deploying.');
}
