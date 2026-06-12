import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config.js';
import { createUser, findUserByEmail, findUserById } from '../db.js';
import { requireAuth } from '../middleware.js';

export const authRouter = Router();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Generate a short, human-friendly client ID like MUC-48213.
function makeClientId(seed) {
  let n = 0;
  for (const ch of String(seed)) n = (n * 31 + ch.charCodeAt(0)) >>> 0;
  return 'MUC-' + String(10000 + (n % 90000));
}

function signToken(user) {
  return jwt.sign({ sub: user.id, email: user.email }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  });
}

// Never leak the password hash back to the client.
function publicUser(user) {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    clientId: user.clientId,
    phone: user.phone || '',
    service: user.service || '',
  };
}

// POST /api/auth/signup — create an account, return a token.
authRouter.post('/signup', async (req, res) => {
  try {
    const { email, password, phone, service, clientId } = req.body || {};

    if (!email || !EMAIL_RE.test(email)) {
      return res.status(400).json({ error: 'A valid email is required.' });
    }
    if (!password || String(password).length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters.' });
    }

    const normalized = String(email).trim().toLowerCase();
    if (await findUserByEmail(normalized)) {
      return res.status(409).json({ error: 'An account with that email already exists.' });
    }

    const passwordHash = await bcrypt.hash(String(password), 10);
    const id = 'usr_' + makeClientId(normalized + passwordHash).slice(4) + normalized.length;
    const name = normalized.split('@')[0].replace(/[._]/g, ' ');

    const user = {
      id,
      email: normalized,
      name,
      passwordHash,
      phone: phone || '',
      service: service || '',
      clientId: clientId || makeClientId(normalized),
      createdAt: new Date().toISOString(),
    };

    await createUser(user);
    return res.status(201).json({ token: signToken(user), user: publicUser(user) });
  } catch (err) {
    console.error('[signup]', err);
    return res.status(500).json({ error: 'Could not create account.' });
  }
});

// POST /api/auth/login — verify credentials, return a token.
authRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const user = await findUserByEmail(email);
    // Compare even when the user is missing to keep timing roughly constant.
    const ok = user
      ? await bcrypt.compare(String(password), user.passwordHash)
      : await bcrypt.compare(String(password), '$2a$10$invalidinvalidinvalidinvalidinvalidinvalidinv');

    if (!user || !ok) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    return res.json({ token: signToken(user), user: publicUser(user) });
  } catch (err) {
    console.error('[login]', err);
    return res.status(500).json({ error: 'Could not sign in.' });
  }
});

// GET /api/auth/me — return the current user for a valid token.
authRouter.get('/me', requireAuth, async (req, res) => {
  const user = await findUserById(req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found.' });
  return res.json({ user: publicUser(user) });
});
