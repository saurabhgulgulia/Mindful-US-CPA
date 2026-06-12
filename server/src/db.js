import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { mkdir, readFile, writeFile } from 'node:fs/promises';

// A deliberately tiny persistence layer: users live in a single JSON file.
// This keeps the "simple backend" simple — no database to install — while still
// being durable across restarts. Swap this module for a real DB later and the
// rest of the app is unaffected.

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, '..', 'data');
const USERS_FILE = join(DATA_DIR, 'users.json');

// Serialize writes so concurrent requests can't clobber the file.
let writeChain = Promise.resolve();

async function readUsers() {
  try {
    const raw = await readFile(USERS_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    if (err.code === 'ENOENT') return [];
    throw err;
  }
}

async function persist(users) {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(USERS_FILE, JSON.stringify(users, null, 2), 'utf8');
}

export async function findUserByEmail(email) {
  const users = await readUsers();
  const normalized = String(email).trim().toLowerCase();
  return users.find((u) => u.email === normalized) || null;
}

export async function findUserById(id) {
  const users = await readUsers();
  return users.find((u) => u.id === id) || null;
}

export async function createUser(user) {
  // Chain the read-modify-write so simultaneous signups don't race.
  const result = (writeChain = writeChain.then(async () => {
    const users = await readUsers();
    users.push(user);
    await persist(users);
    return user;
  }));
  return result;
}
